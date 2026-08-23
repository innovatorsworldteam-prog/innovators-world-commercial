import { calculateIWDAResult } from "./iwda/scoring";
import { IWDA_QUESTIONS } from "./iwda/questions";
import {
  createVerificationToken,
  hashToken,
  isValidEmail,
  normalizeEmail,
  verificationEmailHtml,
  verificationEmailText,
  verificationExpiry,
  verificationUrl,
  MAX_ATTEMPTS,
} from "./identity";

type ParticipantType = "adult" | "minor";

type WorkerEnv = {
  DB: D1Database;
  EMAIL?: { send(message: EmailMessage): Promise<void> };
  ASSETS?: Fetcher;
};

type ParticipantRow = {
  id: string;
  participant_type: ParticipantType;
  full_name: string;
  email: string;
  phone: string;
  status: string;
  email_verified_at: string | null;
  phone_verified_at: string | null;
  guardian_authorized_at: string | null;
};

type AttemptRow = {
  id: string;
  user_id: string | null;
  participant_id: string | null;
  status: string;
};

type ResultRow = {
  id: string;
  attempt_id: string;
  user_id: string | null;
  innovation_readiness_index: number | null;
  traits: string | null;
  result_data: string | null;
  created_at: string;
};

type JsonObject = Record<string, unknown>;

function json(data: unknown, status = 200): Response {
  return Response.json(data, { status });
}

function errorResponse(message: string, status: number, details?: unknown): Response {
  console.error(message, details ?? "");
  return json({ error: message }, status);
}

async function readJson(request: Request): Promise<JsonObject> {
  try {
    const value: unknown = await request.json();
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      throw new Error("Body must be a JSON object");
    }
    return value as JsonObject;
  } catch {
    throw new Error("Invalid JSON request body");
  }
}

function stringValue(body: JsonObject, key: string): string {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

function publicParticipant(row: ParticipantRow) {
  return {
    id: row.id,
    participant_type: row.participant_type,
    full_name: row.full_name,
    email: row.email,
    status: row.status,
    email_verified: Boolean(row.email_verified_at),
    guardian_authorized: Boolean(row.guardian_authorized_at),
  };
}

function publicResult(row: ResultRow) {
  let resultData: unknown = null;
  let traits: unknown[] = [];

  if (row.result_data) {
    try {
      resultData = JSON.parse(row.result_data);
    } catch {
      resultData = null;
    }
  }

  if (row.traits) {
    try {
      const parsed = JSON.parse(row.traits);
      traits = Array.isArray(parsed) ? parsed : [];
    } catch {
      traits = [];
    }
  }

  return {
    id: row.id,
    attempt_id: row.attempt_id,
    user_id: row.user_id,
    innovation_readiness_index: row.innovation_readiness_index,
    traits,
    result_data: resultData,
    created_at: row.created_at,
  };
}

function buildVerificationMessage(
  from: string,
  to: string,
  subject: string,
  html: string,
  text: string,
): EmailMessage {
  const boundary = `iwda-${crypto.randomUUID()}`;
  const cleanHeader = (value: string) => value.replace(/[\r\n]/g, "");

  const raw = [
    `From: ${cleanHeader(from)}`,
    `To: ${cleanHeader(to)}`,
    `Subject: ${cleanHeader(subject)}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    text,
    "",
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    html,
    "",
    `--${boundary}--`,
    "",
  ].join("\r\n");

  return new EmailMessage(from, to, raw);
}

async function createAndSendChallenge(
  env: WorkerEnv,
  request: Request,
  participantId: string,
  participantName: string,
  participantType: ParticipantType,
  destination: string,
): Promise<string> {
  if (!env.EMAIL) {
    throw new Error("Cloudflare EMAIL binding is not configured");
  }

  const token = createVerificationToken();
  const now = new Date().toISOString();
  const expiresAt = verificationExpiry();
  const challengeId = crypto.randomUUID();
  const channel = participantType === "minor" ? "guardian_email" : "email";
  const verifyUrl = verificationUrl(request, token);

  await env.DB.prepare(
    `INSERT INTO identity_verification_challenges
      (id, participant_id, channel, destination, code_hash, expires_at, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      challengeId,
      participantId,
      channel,
      destination,
      await hashToken(token),
      expiresAt,
      now,
    )
    .run();

  const message = buildVerificationMessage(
    "Innovators World <verify@innovatorsworld.org>",
    destination,
    "Verify your Innovators World email",
    verificationEmailHtml(participantName, verifyUrl),
    verificationEmailText(participantName, verifyUrl),
  );

  try {
    await env.EMAIL.send(message);
  } catch (sendError) {
    console.error("Cloudflare Email send failed", sendError);
    throw new Error("Verification email could not be sent");
  }

  return expiresAt;
}

async function handleParticipantRegistration(
  request: Request,
  env: WorkerEnv,
): Promise<Response> {
  try {
    const body = await readJson(request);
    const rawType = stringValue(body, "participant_type");
    const participantType: ParticipantType | "" =
      rawType === "minor" || rawType === "adult" ? rawType : "";
    const fullName = stringValue(body, "full_name");
    const email = normalizeEmail(body.email);
    const guardianEmail = normalizeEmail(body.parent_guardian_email);
    const guardianName = stringValue(body, "parent_guardian_name");
    const consentVersion = stringValue(body, "consent_version");

    if (!participantType) {
      return errorResponse("Please select Adult / 18+ or Under 18.", 400);
    }
    if (!fullName) {
      return errorResponse("Full name is required.", 400);
    }
    if (!consentVersion) {
      return errorResponse("Assessment terms must be accepted.", 400);
    }

    const destination = participantType === "minor" ? guardianEmail : email;
    if (!destination || !isValidEmail(destination)) {
      return errorResponse("A valid email address is required.", 400);
    }

    if (participantType === "minor" && !guardianName) {
      return errorResponse("Parent or guardian name is required for participants under 18.", 400);
    }

    if (!env.EMAIL) {
      return errorResponse("Email verification is not configured yet.", 503);
    }

    const existing = await env.DB.prepare(
      `SELECT id, participant_type, full_name, email, phone, status,
              email_verified_at, phone_verified_at, guardian_authorized_at
       FROM participants
       WHERE lower(email) = ?
       LIMIT 1`,
    )
      .bind(destination)
      .first<ParticipantRow>();

    let participantId: string;
    let storedType: ParticipantType = participantType;
    let storedName = fullName;

    if (existing) {
      participantId = existing.id;
      const alreadyVerified =
        Boolean(existing.email_verified_at) &&
        (existing.participant_type !== "minor" || Boolean(existing.guardian_authorized_at));

      if (alreadyVerified && existing.status === "active") {
        return json({
          status: "ok",
          participant: publicParticipant(existing),
          participant_id: existing.id,
          verification_required: false,
          verified: true,
          existing: true,
        });
      }

      const now = new Date().toISOString();
      await env.DB.prepare(
        `UPDATE participants
         SET participant_type = ?, full_name = ?,
             parent_guardian_name = ?, parent_guardian_email = ?,
             consent_version = ?, consent_at = ?,
             email_verified_at = NULL, guardian_authorized_at = NULL,
             status = 'pending_verification', updated_at = ?
         WHERE id = ?`,
      )
        .bind(
          participantType,
          fullName,
          participantType === "minor" ? guardianName : null,
          participantType === "minor" ? destination : null,
          consentVersion,
          now,
          now,
          participantId,
        )
        .run();

      storedType = participantType;
      storedName = fullName;
    } else {
      participantId = crypto.randomUUID();
      const now = new Date().toISOString();

      await env.DB.prepare(
        `INSERT INTO participants
          (id, participant_type, full_name, email, phone, date_of_birth, age_band,
           parent_guardian_name, parent_guardian_email, parent_guardian_phone,
           consent_version, consent_at, status, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
        .bind(
          participantId,
          participantType,
          fullName,
          destination,
          "",
          typeof body.date_of_birth === "string" ? body.date_of_birth.trim() : null,
          typeof body.age_band === "string" ? body.age_band.trim() : null,
          participantType === "minor" ? guardianName : null,
          participantType === "minor" ? destination : null,
          "",
          consentVersion,
          now,
          "pending_verification",
          now,
          now,
        )
        .run();

      await env.DB.prepare(
        `INSERT INTO participant_consents
          (id, participant_id, consent_type, version, granted_at)
         VALUES (?, ?, ?, ?, ?)`,
      )
        .bind(
          crypto.randomUUID(),
          participantId,
          participantType === "minor" ? "guardian_authorization" : "assessment",
          consentVersion,
          now,
        )
        .run();
    }

    const expiresAt = await createAndSendChallenge(
      env,
      request,
      participantId,
      storedName,
      storedType,
      destination,
    );

    return json(
      {
        status: "ok",
        participant_id: participantId,
        verification_required: true,
        expires_at: expiresAt,
        existing: Boolean(existing),
      },
      existing ? 200 : 201,
    );
  } catch (error) {
    console.error("Participant registration error", error);
    return errorResponse("Unable to register participant", 500);
  }
}

async function handleVerification(request: Request, env: WorkerEnv): Promise<Response> {
  const url = new URL(request.url);
  const token = (url.searchParams.get("token") || "").trim();

  if (!token) return new Response("Invalid verification link.", { status: 400 });

  try {
    const tokenHash = await hashToken(token);
    const challenge = await env.DB.prepare(
      `SELECT id, participant_id, channel, expires_at, verified_at, attempts
       FROM identity_verification_challenges
       WHERE code_hash = ?
       ORDER BY created_at DESC
       LIMIT 1`,
    )
      .bind(tokenHash)
      .first<{
        id: string;
        participant_id: string;
        channel: string;
        expires_at: string;
        verified_at: string | null;
        attempts: number;
      }>();

    if (!challenge) return new Response("This verification link is invalid.", { status: 400 });
    if (challenge.verified_at) return new Response("This verification link has already been used.", { status: 409 });
    if (challenge.attempts >= MAX_ATTEMPTS) return new Response("Verification is temporarily locked.", { status: 429 });
    if (new Date(challenge.expires_at).getTime() < Date.now()) {
      return new Response("This verification link has expired. Please register again.", { status: 410 });
    }

    const now = new Date().toISOString();
    await env.DB.prepare(
      `UPDATE identity_verification_challenges
       SET verified_at = ?, attempts = attempts + 1
       WHERE id = ?`,
    )
      .bind(now, challenge.id)
      .run();

    if (challenge.channel === "guardian_email") {
      await env.DB.prepare(
        `UPDATE participants
         SET email_verified_at = ?, guardian_authorized_at = ?, status = 'active', updated_at = ?
         WHERE id = ?`,
      )
        .bind(now, now, now, challenge.participant_id)
        .run();
    } else {
      await env.DB.prepare(
        `UPDATE participants
         SET email_verified_at = ?, status = 'active', updated_at = ?
         WHERE id = ?`,
      )
        .bind(now, now, now, challenge.participant_id)
        .run();
    }

    return new Response(
      "Email verified. You may now return to Innovators World and start IWDA.",
      { status: 200, headers: { "content-type": "text/plain; charset=UTF-8" } },
    );
  } catch (error) {
    console.error("Email verification error", error);
    return new Response("Unable to verify this email right now.", { status: 500 });
  }
}

async function handleParticipantStatus(request: Request, env: WorkerEnv): Promise<Response> {
  const id = new URL(request.url).searchParams.get("participant_id")?.trim() || "";
  if (!id) return errorResponse("participant_id is required.", 400);

  try {
    const participant = await env.DB.prepare(
      `SELECT id, participant_type, full_name, email, phone, status,
              email_verified_at, phone_verified_at, guardian_authorized_at
       FROM participants WHERE id = ? LIMIT 1`,
    )
      .bind(id)
      .first<ParticipantRow>();

    if (!participant) return errorResponse("Participant not found.", 404);
    return json({ status: "ok", participant: publicParticipant(participant) });
  } catch (error) {
    return errorResponse("Unable to retrieve participant status.", 500, error);
  }
}

async function handleStartIWDA(request: Request, env: WorkerEnv): Promise<Response> {
  try {
    const body = await readJson(request);
    const participantId = stringValue(body, "participant_id");
    if (!participantId) return errorResponse("A verified participant_id is required to start IWDA.", 401);

    const participant = await env.DB.prepare(
      `SELECT id, status, email_verified_at, participant_type, guardian_authorized_at
       FROM participants WHERE id = ? LIMIT 1`,
    )
      .bind(participantId)
      .first<{
        id: string;
        status: string;
        email_verified_at: string | null;
        participant_type: ParticipantType;
        guardian_authorized_at: string | null;
      }>();

    if (!participant) return errorResponse("Participant not found.", 404);

    const verified =
      Boolean(participant.email_verified_at) &&
      (participant.participant_type !== "minor" || Boolean(participant.guardian_authorized_at));

    if (!verified || participant.status !== "active") {
      return errorResponse("Participant email verification is incomplete.", 403);
    }

    const existing = await env.DB.prepare(
      `SELECT id FROM iwda_attempts
       WHERE participant_id = ? AND status = 'started'
       ORDER BY started_at DESC LIMIT 1`,
    )
      .bind(participantId)
      .first<{ id: string }>();

    if (existing) {
      return json({ status: "ok", attempt_id: existing.id, assessment: "IWDA", resumed: true });
    }

    const attemptId = crypto.randomUUID();
    await env.DB.prepare(
      `INSERT INTO iwda_attempts
        (id, user_id, anonymous_session_id, participant_id, status, started_at)
       VALUES (?, NULL, NULL, ?, 'started', datetime('now'))`,
    )
      .bind(attemptId, participantId)
      .run();

    return json({ status: "ok", attempt_id: attemptId, assessment: "IWDA", resumed: false });
  } catch (error) {
    return errorResponse("Unable to start IWDA.", 500, error);
  }
}

async function handleAnswer(request: Request, env: WorkerEnv): Promise<Response> {
  try {
    const body = await readJson(request);
    const attemptId = stringValue(body, "attempt_id");
    const questionId = stringValue(body, "question_id");
    const answer = stringValue(body, "answer").toUpperCase();

    if (!attemptId || !questionId || !answer) {
      return errorResponse("attempt_id, question_id and answer are required.", 400);
    }
    if (!IWDA_QUESTIONS.some((question) => question.id === questionId)) {
      return errorResponse("Invalid question_id.", 400);
    }
    if (!["A", "B", "C", "D"].includes(answer)) {
      return errorResponse("answer must be A, B, C or D.", 400);
    }

    const attempt = await env.DB.prepare(
      `SELECT id, status FROM iwda_attempts WHERE id = ? LIMIT 1`,
    )
      .bind(attemptId)
      .first<{ id: string; status: string }>();

    if (!attempt) return errorResponse("IWDA attempt not found.", 404);
    if (attempt.status !== "started") return errorResponse("IWDA attempt is not active.", 409);

    await env.DB.prepare(
      `DELETE FROM iwda_answers WHERE attempt_id = ? AND question_id = ?`,
    )
      .bind(attemptId, questionId)
      .run();

    const answerId = crypto.randomUUID();
    await env.DB.prepare(
      `INSERT INTO iwda_answers (id, attempt_id, question_id, answer, created_at)
       VALUES (?, ?, ?, ?, datetime('now'))`,
    )
      .bind(answerId, attemptId, questionId, answer)
      .run();

    return json({
      status: "ok",
      recorded: true,
      answer_id: answerId,
      attempt_id: attemptId,
      question_id: questionId,
    });
  } catch (error) {
    return errorResponse("Unable to record answer.", 500, error);
  }
}

async function handleComplete(request: Request, env: WorkerEnv): Promise<Response> {
  try {
    const body = await readJson(request);
    const attemptId = stringValue(body, "attempt_id");
    if (!attemptId) return errorResponse("attempt_id is required.", 400);

    const existing = await env.DB.prepare(
      `SELECT id, attempt_id, user_id, innovation_readiness_index,
              traits, result_data, created_at
       FROM iwda_results WHERE attempt_id = ? LIMIT 1`,
    )
      .bind(attemptId)
      .first<ResultRow>();

    if (existing) {
      return json({
        status: "ok",
        completed: true,
        scoring_status: "complete",
        result: publicResult(existing),
      });
    }

    const attempt = await env.DB.prepare(
      `SELECT id, user_id, participant_id, status
       FROM iwda_attempts WHERE id = ? LIMIT 1`,
    )
      .bind(attemptId)
      .first<AttemptRow>();

    if (!attempt) return errorResponse("IWDA attempt not found.", 404);
    if (attempt.status !== "started") return errorResponse("IWDA attempt is not active.", 409);
    if (!attempt.participant_id) return errorResponse("This IWDA attempt is not linked to a participant.", 409);

    const answers = await env.DB.prepare(
      `SELECT question_id, answer FROM iwda_answers WHERE attempt_id = ? ORDER BY created_at`,
    )
      .bind(attemptId)
      .all<{ question_id: string; answer: string }>();

    const answerRows = answers.results ?? [];
    const uniqueQuestionIds = new Set(answerRows.map((row) => row.question_id));

    if (uniqueQuestionIds.size !== IWDA_QUESTIONS.length) {
      return errorResponse(
        `IWDA requires all ${IWDA_QUESTIONS.length} questions to be answered before completion.`,
        400,
      );
    }

    const result = calculateIWDAResult(
      answerRows.map((row) => ({ question_id: row.question_id, answer: row.answer })),
    );

    const resultId = crypto.randomUUID();
    const now = new Date().toISOString();

    await env.DB.prepare(
      `INSERT INTO iwda_results
        (id, attempt_id, user_id, innovation_readiness_index, traits, result_data, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        resultId,
        attemptId,
        attempt.user_id,
        result.innovation_readiness_index,
        JSON.stringify(result.traits),
        JSON.stringify(result.result_data),
        now,
      )
      .run();

    await env.DB.prepare(
      `UPDATE iwda_attempts SET status = 'completed', completed_at = ? WHERE id = ?`,
    )
      .bind(now, attemptId)
      .run();

    const saved: ResultRow = {
      id: resultId,
      attempt_id: attemptId,
      user_id: attempt.user_id,
      innovation_readiness_index: result.innovation_readiness_index,
      traits: JSON.stringify(result.traits),
      result_data: JSON.stringify(result.result_data),
      created_at: now,
    };

    return json({
      status: "ok",
      completed: true,
      scoring_status: "complete",
      result: publicResult(saved),
    });
  } catch (error) {
    return errorResponse("Unable to complete IWDA.", 500, error);
  }
}

async function handleHealth(env: WorkerEnv): Promise<Response> {
  try {
    const row = await env.DB.prepare("SELECT 1 AS ok").first<{ ok: number }>();
    return json({
      status: "ok",
      database: row?.ok === 1,
      email_configured: Boolean(env.EMAIL),
      service: "innovators-world-commercial",
    });
  } catch (error) {
    return errorResponse("Database unavailable.", 503, error);
  }
}

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/health" && request.method === "GET") {
      return handleHealth(env);
    }

    if (url.pathname === "/api/participants" && request.method === "POST") {
      return handleParticipantRegistration(request, env);
    }

    if (url.pathname === "/api/participants/status" && request.method === "GET") {
      return handleParticipantStatus(request, env);
    }

    if (url.pathname === "/api/iwda/questions" && request.method === "GET") {
      return json({
        status: "ok",
        assessment: "IWDA",
        version: "1.0",
        question_count: IWDA_QUESTIONS.length,
        questions: IWDA_QUESTIONS.map(({ id, prompt }) => ({
          id,
          prompt,
          options: ["A", "B", "C", "D"],
        })),
      });
    }

    if (url.pathname === "/api/iwda/start" && request.method === "POST") {
      return handleStartIWDA(request, env);
    }

    if (url.pathname === "/api/iwda/answer" && request.method === "POST") {
      return handleAnswer(request, env);
    }

    if (url.pathname === "/api/iwda/complete" && request.method === "POST") {
      return handleComplete(request, env);
    }

    if (url.pathname === "/verify-email" && request.method === "GET") {
      return handleVerification(request, env);
    }

    if (url.pathname === "/api/events" && request.method === "POST") {
      try {
        const body = await readJson(request);
        const eventType = stringValue(body, "event_type");
        if (!eventType) return errorResponse("event_type is required.", 400);

        const metadata =
          body.metadata && typeof body.metadata === "object" && !Array.isArray(body.metadata)
            ? JSON.stringify(body.metadata)
            : null;

        await env.DB.prepare(
          `INSERT INTO events
            (id, user_id, anonymous_session_id, event_type, page, metadata, created_at)
           VALUES (?, ?, ?, ?, ?, ?, datetime('now'))`,
        )
          .bind(
            crypto.randomUUID(),
            stringValue(body, "user_id") || null,
            stringValue(body, "anonymous_session_id") || null,
            eventType,
            stringValue(body, "page") || null,
            metadata,
          )
          .run();

        return json({ status: "ok", recorded: true });
      } catch (error) {
        return errorResponse("Unable to record event.", 500, error);
      }
    }

    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not found", { status: 404 });
  },
};

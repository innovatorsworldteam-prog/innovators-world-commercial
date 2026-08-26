import {
  AssessmentAnswer,
  AssessmentDimension,
  AssessmentOption,
  AssessmentQuestion,
  AssessmentVersion,
  createAttempt,
  getActiveAssessmentVersion,
  getAssessment,
  getAttempt,
  listAnswers,
  listDimensions,
  listQuestionOptions,
  listQuestions,
  saveDimensionScores,
  saveResult,
  upsertAnswer,
} from "../db/assessment";

export const CAREER_DISCOVERY_CODE = "CAREER_DISCOVERY";
export const CAREER_DISCOVERY_ALGORITHM = "CD_SCORING_1.0";
export const CAREER_DISCOVERY_FREE_TIER = "free";
export const CAREER_DISCOVERY_DEEP_TIER = "deep";

type JsonObject = Record<string, unknown>;

type ScoredOption = AssessmentOption & {
  score: number;
  dimension: string;
  careerWorldSignals: string[];
};

function parseJson(value: string | null): JsonObject {
  if (!value) return {};
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as JsonObject : {};
  } catch {
    return {};
  }
}

function number(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function questionDimension(question: AssessmentQuestion): string | null {
  return typeof parseJson(question.scoring_config_json).dimension === "string"
    ? String(parseJson(question.scoring_config_json).dimension)
    : null;
}

function optionScore(option: AssessmentOption, expectedDimension: string): ScoredOption | null {
  const scoring = parseJson(option.scoring_json);
  const raw = number(scoring[expectedDimension]);
  if (raw === null || raw < 1 || raw > 4) return null;
  const metadata = parseJson(option.metadata_json);
  const signals = Array.isArray(metadata.career_world_signals)
    ? metadata.career_world_signals.filter((item): item is string => typeof item === "string")
    : [];
  return { ...option, score: raw, dimension: expectedDimension, careerWorldSignals: signals };
}

export async function careerDiscoveryQuestions(
  db: D1Database,
  age: number
): Promise<{ version: AssessmentVersion; questions: Array<AssessmentQuestion & { options: AssessmentOption[] }> }> {
  if (!Number.isInteger(age) || age < 8 || age > 19) throw new Error("AGE_OUT_OF_RANGE");
  const version = await getActiveAssessmentVersion(db, CAREER_DISCOVERY_CODE);
  if (!version) throw new Error("CAREER_DISCOVERY_NOT_ACTIVE");
  const questions = await listQuestions(db, version.id, age);
  const hydrated = await Promise.all(questions.map(async (question) => ({
    ...question,
    options: await listQuestionOptions(db, question.id),
  })));
  return { version, questions: hydrated };
}

export async function startCareerDiscovery(
  db: D1Database,
  input: {
    age: number;
    participantId?: string | null;
    userId?: string | null;
    anonymousSessionId?: string | null;
    tier?: string | null;
  }
) {
  if (!Number.isInteger(input.age) || input.age < 8 || input.age > 19) throw new Error("AGE_OUT_OF_RANGE");
  const version = await getActiveAssessmentVersion(db, CAREER_DISCOVERY_CODE);
  const assessment = await getAssessment(db, CAREER_DISCOVERY_CODE);
  if (!version || !assessment) throw new Error("CAREER_DISCOVERY_NOT_ACTIVE");
  const tier = input.tier || CAREER_DISCOVERY_FREE_TIER;
  if (tier !== CAREER_DISCOVERY_FREE_TIER && tier !== CAREER_DISCOVERY_DEEP_TIER) throw new Error("INVALID_ASSESSMENT_TIER");

  const ownerColumn = input.participantId ? "participant_id" : "anonymous_session_id";
  const owner = input.participantId || input.anonymousSessionId;
  if (!owner) throw new Error("ASSESSMENT_OWNER_REQUIRED");

  const existing = await db.prepare(
    `SELECT id FROM assessment_attempts
     WHERE assessment_id = ? AND ${ownerColumn} = ? AND status = 'started'
     ORDER BY started_at DESC LIMIT 1`
  ).bind(assessment.id, owner).first<{ id: string }>();
  if (existing) return { attempt: await getAttempt(db, existing.id), resumed: true, tier };

  const attempt = await createAttempt(db, {
    id: crypto.randomUUID(),
    assessmentId: assessment.id,
    assessmentVersionId: version.id,
    participantId: input.participantId ?? null,
    userId: input.userId ?? null,
    anonymousSessionId: input.anonymousSessionId ?? null,
    metadata: {
      product: CAREER_DISCOVERY_CODE,
      tier,
      age,
      algorithm_version: CAREER_DISCOVERY_ALGORITHM,
    },
  });
  return { attempt, resumed: false, tier };
}

export async function recordCareerDiscoveryAnswer(
  db: D1Database,
  input: { attemptId: string; questionId: string; optionId: string; answerValue?: string | null }
): Promise<void> {
  const attempt = await getAttempt(db, input.attemptId);
  if (!attempt) throw new Error("ASSESSMENT_ATTEMPT_NOT_FOUND");
  if (attempt.status !== "started") throw new Error("ASSESSMENT_ATTEMPT_NOT_ACTIVE");

  const question = await db.prepare(
    `SELECT * FROM assessment_questions WHERE id = ? AND assessment_version_id = ? LIMIT 1`
  ).bind(input.questionId, attempt.assessment_version_id).first<AssessmentQuestion>();
  if (!question) throw new Error("INVALID_QUESTION");
  const options = await listQuestionOptions(db, question.id);
  const selected = options.find((option) => option.id === input.optionId);
  if (!selected) throw new Error("INVALID_OPTION");

  await upsertAnswer(db, {
    id: crypto.randomUUID(),
    attemptId: input.attemptId,
    questionId: input.questionId,
    optionId: input.optionId,
    answerValue: input.answerValue ?? selected.code,
  });
}

export async function calculateCareerDiscoveryResult(
  db: D1Database,
  attemptId: string
) {
  const attempt = await getAttempt(db, attemptId);
  if (!attempt) throw new Error("ASSESSMENT_ATTEMPT_NOT_FOUND");
  const questions = await listQuestions(db, attempt.assessment_version_id);
  const dimensions = await listDimensions(db, attempt.assessment_version_id);
  const answers = await listAnswers(db, attemptId);
  const answerByQuestion = new Map(answers.map((answer) => [answer.question_id, answer]));

  const requiredQuestions = questions.filter((question) => question.required === 1);
  const missing = requiredQuestions.filter((question) => !answerByQuestion.has(question.id));
  if (missing.length) throw new Error(`INCOMPLETE_ASSESSMENT:${missing.length}`);

  const dimensionScores = new Map<string, { total: number; max: number; count: number }>();
  const careerSignals = new Map<string, number>();
  const evidence: Array<{ question: string; dimension: string; score: number }> = [];

  for (const question of questions) {
    const answer = answerByQuestion.get(question.id);
    if (!answer?.option_id) continue;
    const dimension = questionDimension(question);
    if (!dimension) throw new Error("QUESTION_DIMENSION_MISSING");
    const options = await listQuestionOptions(db, question.id);
    const selected = options.find((option) => option.id === answer.option_id);
    if (!selected) throw new Error("ANSWER_OPTION_MISSING");
    const scored = optionScore(selected, dimension);
    if (!scored) throw new Error("OPTION_SCORING_INVALID");

    const current = dimensionScores.get(dimension) || { total: 0, max: 0, count: 0 };
    current.total += scored.score;
    current.max += 4;
    current.count += 1;
    dimensionScores.set(dimension, current);
    for (const signal of scored.careerWorldSignals) careerSignals.set(signal, (careerSignals.get(signal) || 0) + scored.score);
    evidence.push({ question: question.code, dimension, score: scored.score });
  }

  const resultDimensions = dimensions.map((dimension: AssessmentDimension) => {
    const data = dimensionScores.get(dimension.code) || { total: 0, max: 0, count: 0 };
    const normalized = data.max ? Math.round(((data.total - data.count) / (data.max - data.count)) * 10000) / 100 : 0;
    return {
      dimension_id: dimension.id,
      code: dimension.code,
      name: dimension.name,
      raw_score: data.total,
      max_score: data.max,
      normalized_score: Math.max(0, Math.min(100, normalized)),
      weight: dimension.scoring_weight,
      interpretation_band: normalized >= 75 ? "strong" : normalized >= 50 ? "moderate" : "emerging",
    };
  });

  const overall = Math.round(resultDimensions.reduce((sum, item) => sum + item.normalized_score * item.weight, 0) * 100) / 100;
  const topSignals = [...careerSignals.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([code, signalScore]) => ({ code, signal_score: signalScore }));

  return {
    algorithm_version: CAREER_DISCOVERY_ALGORITHM,
    assessment: CAREER_DISCOVERY_CODE,
    version_id: attempt.assessment_version_id,
    overall_score: overall,
    dimensions: resultDimensions,
    career_world_signals: topSignals,
    evidence,
    interpretation_notice: "Career Discovery identifies exploration signals and does not prescribe or guarantee a career outcome.",
  };
}

export async function completeCareerDiscovery(db: D1Database, attemptId: string) {
  const existing = await db.prepare(
    `SELECT * FROM assessment_results WHERE attempt_id = ? AND result_status = 'complete' LIMIT 1`
  ).bind(attemptId).first<{
    id: string; attempt_id: string; assessment_id: string; assessment_version_id: string;
    participant_id: string | null; user_id: string | null; result_status: "complete" | "invalidated";
    overall_score: number | null; result_json: string; algorithm_version: string | null; generated_at: string;
  }>();
  if (existing) return { result: existing, reused: true };

  const attempt = await getAttempt(db, attemptId);
  if (!attempt) throw new Error("ASSESSMENT_ATTEMPT_NOT_FOUND");
  if (attempt.status !== "started") throw new Error("ASSESSMENT_ATTEMPT_NOT_ACTIVE");

  const calculated = await calculateCareerDiscoveryResult(db, attemptId);
  const resultId = crypto.randomUUID();
  const result = await saveResult(db, {
    id: resultId,
    attemptId,
    assessmentId: attempt.assessment_id,
    assessmentVersionId: attempt.assessment_version_id,
    participantId: attempt.participant_id,
    userId: attempt.user_id,
    overallScore: calculated.overall_score,
    result: calculated,
    algorithmVersion: CAREER_DISCOVERY_ALGORITHM,
  });

  await saveDimensionScores(db, result.id, calculated.dimensions.map((dimension) => ({
    id: crypto.randomUUID(),
    dimensionId: dimension.dimension_id,
    rawScore: dimension.raw_score,
    normalizedScore: dimension.normalized_score,
    maxScore: dimension.max_score,
    interpretation: dimension.interpretation_band,
    metadata: { weight: dimension.weight },
  })));

  await db.prepare(
    `UPDATE assessment_attempts SET status='completed', completed_at=? WHERE id=? AND status='started'`
  ).bind(new Date().toISOString(), attemptId).run();

  return { result, reused: false };
}

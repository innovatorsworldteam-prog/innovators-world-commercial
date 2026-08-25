export type AssessmentStatus = "draft" | "active" | "retired";
export type AttemptStatus = "started" | "completed" | "abandoned" | "expired";

export type Assessment = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  status: AssessmentStatus;
  created_at: string;
  updated_at: string;
};

export type AssessmentVersion = {
  id: string;
  assessment_id: string;
  version: string;
  status: AssessmentStatus;
  age_min: number | null;
  age_max: number | null;
  methodology_version: string | null;
  scoring_version: string | null;
  matching_version: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type AssessmentDimension = {
  id: string;
  assessment_version_id: string;
  code: string;
  name: string;
  description: string | null;
  display_order: number;
  scoring_weight: number;
  created_at: string;
  updated_at: string;
};

export type AssessmentQuestion = {
  id: string;
  assessment_version_id: string;
  code: string;
  age_min: number | null;
  age_max: number | null;
  question_type: string;
  prompt: string;
  helper_text: string | null;
  required: number;
  display_order: number;
  scoring_config_json: string | null;
  created_at: string;
  updated_at: string;
};

export type AssessmentOption = {
  id: string;
  question_id: string;
  code: string;
  label: string;
  display_order: number;
  scoring_json: string | null;
  metadata_json: string | null;
  created_at: string;
  updated_at: string;
};

export type AssessmentAttempt = {
  id: string;
  assessment_id: string;
  assessment_version_id: string;
  participant_id: string | null;
  user_id: string | null;
  anonymous_session_id: string | null;
  status: AttemptStatus;
  started_at: string;
  completed_at: string | null;
  expires_at: string | null;
  metadata_json: string | null;
};

export type AssessmentAnswer = {
  id: string;
  attempt_id: string;
  question_id: string;
  option_id: string | null;
  answer_value: string | null;
  answered_at: string;
};

export type AssessmentResult = {
  id: string;
  attempt_id: string;
  assessment_id: string;
  assessment_version_id: string;
  participant_id: string | null;
  user_id: string | null;
  result_status: "complete" | "invalidated";
  overall_score: number | null;
  result_json: string;
  algorithm_version: string | null;
  generated_at: string;
};

export type AssessmentDimensionScore = {
  id: string;
  result_id: string;
  dimension_id: string;
  raw_score: number | null;
  normalized_score: number | null;
  max_score: number | null;
  percentile: number | null;
  interpretation: string | null;
  metadata_json: string | null;
};

const now = () => new Date().toISOString();

export async function getAssessment(db: D1Database, code: string): Promise<Assessment | null> {
  return db.prepare("SELECT * FROM assessments WHERE code = ? LIMIT 1").bind(code).first<Assessment>();
}

export async function getAssessmentVersion(
  db: D1Database,
  assessmentCode: string,
  version: string
): Promise<AssessmentVersion | null> {
  return db.prepare(
    `SELECT av.* FROM assessment_versions av
     JOIN assessments a ON a.id = av.assessment_id
     WHERE a.code = ? AND av.version = ? LIMIT 1`
  ).bind(assessmentCode, version).first<AssessmentVersion>();
}

export async function getActiveAssessmentVersion(
  db: D1Database,
  assessmentCode: string
): Promise<AssessmentVersion | null> {
  return db.prepare(
    `SELECT av.* FROM assessment_versions av
     JOIN assessments a ON a.id = av.assessment_id
     WHERE a.code = ? AND av.status = 'active'
     ORDER BY av.published_at DESC, av.created_at DESC LIMIT 1`
  ).bind(assessmentCode).first<AssessmentVersion>();
}

export async function listDimensions(
  db: D1Database,
  assessmentVersionId: string
): Promise<AssessmentDimension[]> {
  const result = await db.prepare(
    `SELECT * FROM assessment_dimensions
     WHERE assessment_version_id = ? ORDER BY display_order ASC`
  ).bind(assessmentVersionId).all<AssessmentDimension>();
  return result.results ?? [];
}

export async function listQuestions(
  db: D1Database,
  assessmentVersionId: string,
  age?: number
): Promise<AssessmentQuestion[]> {
  if (typeof age === "number" && Number.isFinite(age)) {
    const result = await db.prepare(
      `SELECT * FROM assessment_questions
       WHERE assessment_version_id = ?
         AND (age_min IS NULL OR age_min <= ?)
         AND (age_max IS NULL OR age_max >= ?)
       ORDER BY display_order ASC`
    ).bind(assessmentVersionId, age, age).all<AssessmentQuestion>();
    return result.results ?? [];
  }

  const result = await db.prepare(
    `SELECT * FROM assessment_questions
     WHERE assessment_version_id = ? ORDER BY display_order ASC`
  ).bind(assessmentVersionId).all<AssessmentQuestion>();
  return result.results ?? [];
}

export async function listQuestionOptions(
  db: D1Database,
  questionId: string
): Promise<AssessmentOption[]> {
  const result = await db.prepare(
    `SELECT * FROM assessment_options WHERE question_id = ? ORDER BY display_order ASC`
  ).bind(questionId).all<AssessmentOption>();
  return result.results ?? [];
}

export async function getAttempt(
  db: D1Database,
  attemptId: string
): Promise<AssessmentAttempt | null> {
  return db.prepare("SELECT * FROM assessment_attempts WHERE id = ? LIMIT 1").bind(attemptId).first<AssessmentAttempt>();
}

export async function createAttempt(
  db: D1Database,
  input: {
    id: string;
    assessmentId: string;
    assessmentVersionId: string;
    participantId?: string | null;
    userId?: string | null;
    anonymousSessionId?: string | null;
    expiresAt?: string | null;
    metadata?: unknown;
  }
): Promise<AssessmentAttempt> {
  const timestamp = now();
  await db.prepare(
    `INSERT INTO assessment_attempts
      (id, assessment_id, assessment_version_id, participant_id, user_id,
       anonymous_session_id, status, started_at, expires_at, metadata_json)
     VALUES (?, ?, ?, ?, ?, ?, 'started', ?, ?, ?)`
  ).bind(
    input.id,
    input.assessmentId,
    input.assessmentVersionId,
    input.participantId ?? null,
    input.userId ?? null,
    input.anonymousSessionId ?? null,
    timestamp,
    input.expiresAt ?? null,
    input.metadata === undefined ? null : JSON.stringify(input.metadata)
  ).run();

  const attempt = await getAttempt(db, input.id);
  if (!attempt) throw new Error("ASSESSMENT_ATTEMPT_CREATE_FAILED");
  return attempt;
}

export async function upsertAnswer(
  db: D1Database,
  input: {
    id: string;
    attemptId: string;
    questionId: string;
    optionId?: string | null;
    answerValue?: string | null;
  }
): Promise<void> {
  await db.prepare(
    `INSERT INTO assessment_answers
      (id, attempt_id, question_id, option_id, answer_value, answered_at)
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(attempt_id, question_id) DO UPDATE SET
       option_id = excluded.option_id,
       answer_value = excluded.answer_value,
       answered_at = excluded.answered_at`
  ).bind(
    input.id,
    input.attemptId,
    input.questionId,
    input.optionId ?? null,
    input.answerValue ?? null,
    now()
  ).run();
}

export async function listAnswers(
  db: D1Database,
  attemptId: string
): Promise<AssessmentAnswer[]> {
  const result = await db.prepare(
    `SELECT * FROM assessment_answers WHERE attempt_id = ? ORDER BY answered_at ASC`
  ).bind(attemptId).all<AssessmentAnswer>();
  return result.results ?? [];
}

export async function completeAttempt(
  db: D1Database,
  attemptId: string,
  completedAt = now()
): Promise<void> {
  await db.prepare(
    `UPDATE assessment_attempts SET status = 'completed', completed_at = ?
     WHERE id = ? AND status = 'started'`
  ).bind(completedAt, attemptId).run();
}

export async function saveResult(
  db: D1Database,
  input: {
    id: string;
    attemptId: string;
    assessmentId: string;
    assessmentVersionId: string;
    participantId?: string | null;
    userId?: string | null;
    overallScore?: number | null;
    result: unknown;
    algorithmVersion?: string | null;
  }
): Promise<AssessmentResult> {
  const generatedAt = now();
  await db.prepare(
    `INSERT INTO assessment_results
      (id, attempt_id, assessment_id, assessment_version_id, participant_id,
       user_id, result_status, overall_score, result_json, algorithm_version, generated_at)
     VALUES (?, ?, ?, ?, ?, ?, 'complete', ?, ?, ?, ?)`
  ).bind(
    input.id,
    input.attemptId,
    input.assessmentId,
    input.assessmentVersionId,
    input.participantId ?? null,
    input.userId ?? null,
    input.overallScore ?? null,
    JSON.stringify(input.result),
    input.algorithmVersion ?? null,
    generatedAt
  ).run();

  const result = await db.prepare(
    "SELECT * FROM assessment_results WHERE id = ? LIMIT 1"
  ).bind(input.id).first<AssessmentResult>();
  if (!result) throw new Error("ASSESSMENT_RESULT_SAVE_FAILED");
  return result;
}

export async function saveDimensionScores(
  db: D1Database,
  resultId: string,
  scores: Array<{
    id: string;
    dimensionId: string;
    rawScore?: number | null;
    normalizedScore?: number | null;
    maxScore?: number | null;
    percentile?: number | null;
    interpretation?: string | null;
    metadata?: unknown;
  }>
): Promise<void> {
  if (!scores.length) return;
  const statements = scores.map((score) =>
    db.prepare(
      `INSERT INTO assessment_dimension_scores
        (id, result_id, dimension_id, raw_score, normalized_score, max_score,
         percentile, interpretation, metadata_json)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(result_id, dimension_id) DO UPDATE SET
         raw_score = excluded.raw_score,
         normalized_score = excluded.normalized_score,
         max_score = excluded.max_score,
         percentile = excluded.percentile,
         interpretation = excluded.interpretation,
         metadata_json = excluded.metadata_json`
    ).bind(
      score.id,
      resultId,
      score.dimensionId,
      score.rawScore ?? null,
      score.normalizedScore ?? null,
      score.maxScore ?? null,
      score.percentile ?? null,
      score.interpretation ?? null,
      score.metadata === undefined ? null : JSON.stringify(score.metadata)
    )
  );
  await db.batch(statements);
}

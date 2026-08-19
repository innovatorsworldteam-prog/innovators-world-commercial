CREATE TABLE iwda_attempts (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  anonymous_session_id TEXT,
  status TEXT NOT NULL DEFAULT 'started',
  started_at TEXT NOT NULL,
  completed_at TEXT
);

CREATE TABLE iwda_answers (
  id TEXT PRIMARY KEY,
  attempt_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (attempt_id) REFERENCES iwda_attempts(id)
);

CREATE TABLE iwda_results (
  id TEXT PRIMARY KEY,
  attempt_id TEXT NOT NULL UNIQUE,
  user_id TEXT,
  innovation_readiness_index REAL,
  traits TEXT,
  result_data TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (attempt_id) REFERENCES iwda_attempts(id)
);

CREATE TABLE iwda_insights (
  id TEXT PRIMARY KEY,
  result_id TEXT NOT NULL,
  insight_type TEXT NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (result_id) REFERENCES iwda_results(id)
);

CREATE INDEX idx_iwda_attempts_user
  ON iwda_attempts(user_id);

CREATE INDEX idx_iwda_attempts_session
  ON iwda_attempts(anonymous_session_id);

CREATE INDEX idx_iwda_answers_attempt
  ON iwda_answers(attempt_id);

CREATE INDEX idx_iwda_results_user
  ON iwda_results(user_id);

CREATE INDEX idx_iwda_insights_result
  ON iwda_insights(result_id);
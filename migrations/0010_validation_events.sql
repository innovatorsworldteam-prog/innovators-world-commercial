-- Innovators World International Validation Funnel
-- Migration 0010: minimal validation-event ledger. Additive only.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS validation_events (
  id TEXT PRIMARY KEY,
  event_name TEXT NOT NULL,
  attempt_id TEXT,
  participant_id TEXT,
  metadata_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_validation_events_name_created
  ON validation_events(event_name, created_at);
CREATE INDEX IF NOT EXISTS idx_validation_events_attempt
  ON validation_events(attempt_id, created_at);
CREATE INDEX IF NOT EXISTS idx_validation_events_participant
  ON validation_events(participant_id, created_at);

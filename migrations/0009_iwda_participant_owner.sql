-- Innovators World Discovery Assessment — participant ownership extension
-- Migration 0009: align the legacy IWDA runtime with the canonical participant model.
-- Additive only. Existing attempts and results are preserved.

PRAGMA foreign_keys = ON;

ALTER TABLE iwda_attempts ADD COLUMN participant_id TEXT;

CREATE INDEX IF NOT EXISTS idx_iwda_attempts_participant
  ON iwda_attempts(participant_id);

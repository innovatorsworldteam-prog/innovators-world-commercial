-- Innovators World Discovery Assessment — participant ownership extension
-- Migration 0009: compatibility index.
--
-- participant_id is already introduced by the canonical participant
-- foundation migration 0002_participants_and_identity.sql. The original
-- 0009 migration attempted to add the same column again and failed on fresh
-- databases. Keep migration numbering intact, but make this migration a
-- valid, idempotent schema operation that benefits both fresh and existing
-- databases.

CREATE INDEX IF NOT EXISTS idx_iwda_attempts_participant
ON iwda_attempts(participant_id);

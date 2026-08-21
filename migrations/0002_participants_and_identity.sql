-- IWDA verified participant foundation.
-- Delivery of email/SMS verification is intentionally provider-agnostic; the
-- participant remains unverified until an approved verification provider
-- confirms the relevant contact channel.

CREATE TABLE IF NOT EXISTS participants (
  id TEXT PRIMARY KEY,
  participant_type TEXT NOT NULL CHECK (participant_type IN ('adult','minor')),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth TEXT,
  age_band TEXT,
  parent_guardian_name TEXT,
  parent_guardian_email TEXT,
  parent_guardian_phone TEXT,
  email_verified_at TEXT,
  phone_verified_at TEXT,
  guardian_authorized_at TEXT,
  consent_version TEXT NOT NULL,
  consent_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_verification' CHECK (status IN ('pending_verification','active','suspended','deleted')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_participants_email ON participants(lower(email));
CREATE INDEX IF NOT EXISTS idx_participants_phone ON participants(phone);
CREATE INDEX IF NOT EXISTS idx_participants_status ON participants(status);

CREATE TABLE IF NOT EXISTS identity_verification_challenges (
  id TEXT PRIMARY KEY,
  participant_id TEXT NOT NULL,
  channel TEXT NOT NULL CHECK (channel IN ('email','phone','guardian_email','guardian_phone')),
  destination TEXT NOT NULL,
  code_hash TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  verified_at TEXT,
  attempts INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  FOREIGN KEY (participant_id) REFERENCES participants(id)
);

CREATE INDEX IF NOT EXISTS idx_identity_challenges_participant ON identity_verification_challenges(participant_id);
CREATE INDEX IF NOT EXISTS idx_identity_challenges_expiry ON identity_verification_challenges(expires_at);

CREATE TABLE IF NOT EXISTS participant_consents (
  id TEXT PRIMARY KEY,
  participant_id TEXT NOT NULL,
  consent_type TEXT NOT NULL CHECK (consent_type IN ('assessment','journey','communications','guardian_authorization')),
  version TEXT NOT NULL,
  granted_at TEXT NOT NULL,
  withdrawn_at TEXT,
  FOREIGN KEY (participant_id) REFERENCES participants(id)
);

CREATE INDEX IF NOT EXISTS idx_participant_consents_participant ON participant_consents(participant_id);

-- Link existing IWDA attempts to a verified participant without changing the
-- existing answer/result tables or scoring model.
ALTER TABLE iwda_attempts ADD COLUMN participant_id TEXT;
CREATE INDEX IF NOT EXISTS idx_iwda_attempts_participant ON iwda_attempts(participant_id);

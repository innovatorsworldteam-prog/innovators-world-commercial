CREATE TABLE IF NOT EXISTS innovation_profile_entitlements (
  id TEXT PRIMARY KEY,
  attempt_id TEXT NOT NULL UNIQUE,
  payment_order_id TEXT NOT NULL UNIQUE,
  payment_id TEXT NOT NULL UNIQUE,
  participant_id TEXT,
  product_code TEXT NOT NULL DEFAULT 'complete_innovation_profile',
  amount_paise INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'paid',
  access_token_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (attempt_id) REFERENCES iwda_attempts(id)
);

CREATE TABLE IF NOT EXISTS complete_innovation_profiles (
  id TEXT PRIMARY KEY,
  attempt_id TEXT NOT NULL UNIQUE,
  entitlement_id TEXT NOT NULL UNIQUE,
  participant_id TEXT,
  profile_data TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (attempt_id) REFERENCES iwda_attempts(id),
  FOREIGN KEY (entitlement_id) REFERENCES innovation_profile_entitlements(id)
);

CREATE INDEX IF NOT EXISTS idx_iip_entitlement_attempt ON innovation_profile_entitlements(attempt_id);
CREATE INDEX IF NOT EXISTS idx_iip_profile_attempt ON complete_innovation_profiles(attempt_id);

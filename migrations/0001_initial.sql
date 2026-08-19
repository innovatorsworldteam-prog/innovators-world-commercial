CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TEXT NOT NULL,
  last_seen TEXT,
  consent_status TEXT
);

CREATE TABLE events (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  anonymous_session_id TEXT,
  event_type TEXT NOT NULL,
  page TEXT,
  metadata TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE leads (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  institution_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  requirements TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL
);

CREATE TABLE programmes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  audience TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  price REAL DEFAULT 0,
  metadata TEXT
);

CREATE TABLE merchandise (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  price REAL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  metadata TEXT
);

CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  item_type TEXT NOT NULL,
  item_id TEXT NOT NULL,
  amount REAL NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL
);

CREATE TABLE payments (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  provider TEXT NOT NULL,
  provider_reference TEXT,
  amount REAL NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL
);

CREATE INDEX idx_events_type ON events(event_type);
CREATE INDEX idx_events_user ON events(user_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_payments_order ON payments(order_id);
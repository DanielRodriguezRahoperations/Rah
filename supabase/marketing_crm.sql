-- Marketing CRM Tables for RAH Operations
-- Run this entire script in the Supabase SQL editor
-- Dashboard → SQL Editor → New query → paste → Run

-- ─────────────────────────────────────────────────────────
-- 1. marketing_clients
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS marketing_clients (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  phone         TEXT,
  business_name TEXT        NOT NULL,
  business_type TEXT,
  website_url   TEXT,
  location      TEXT,                          -- "Scottsdale, AZ" etc.
  instagram_handle    TEXT,
  facebook_handle     TEXT,
  tiktok_handle       TEXT,
  google_business_url TEXT,
  services_requested  TEXT[]  DEFAULT '{}',   -- array of service names
  budget        TEXT,                          -- "$597/mo", "$3500 one-time", etc.
  goals         TEXT,
  timeline      TEXT,
  status        TEXT        NOT NULL DEFAULT 'lead'
                CHECK (status IN ('lead','active','paused','complete')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- 2. marketing_projects
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS marketing_projects (
  id           UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id    UUID  NOT NULL REFERENCES marketing_clients(id) ON DELETE CASCADE,
  project_type TEXT  NOT NULL DEFAULT 'social'
               CHECK (project_type IN ('social','website','seo','video','full-service')),
  status       TEXT  NOT NULL DEFAULT 'planning',
  start_date   DATE,
  due_date     DATE,
  notes        TEXT,
  github_repo_url TEXT,
  vercel_url      TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- 3. generated_assets
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS generated_assets (
  id            UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id     UUID  NOT NULL REFERENCES marketing_clients(id) ON DELETE CASCADE,
  project_id    UUID  REFERENCES marketing_projects(id) ON DELETE SET NULL,
  asset_type    TEXT  NOT NULL
                CHECK (asset_type IN ('image','video','caption','carousel','reel','blog','email','ad_copy')),
  content_text  TEXT,
  file_url      TEXT,
  platform      TEXT
                CHECK (platform IN ('instagram','facebook','google','website','tiktok','email')),
  approved      BOOLEAN NOT NULL DEFAULT FALSE,
  rejected      BOOLEAN NOT NULL DEFAULT FALSE,
  rejection_notes TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- 4. post_schedule
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS post_schedule (
  id           UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id    UUID  NOT NULL REFERENCES marketing_clients(id) ON DELETE CASCADE,
  asset_id     UUID  REFERENCES generated_assets(id) ON DELETE SET NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  platform     TEXT  NOT NULL,
  posted       BOOLEAN NOT NULL DEFAULT FALSE,
  post_url     TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- 5. invoices
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS invoices (
  id                UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id         UUID    NOT NULL REFERENCES marketing_clients(id) ON DELETE CASCADE,
  amount            NUMERIC(10,2) NOT NULL,
  type              TEXT    NOT NULL CHECK (type IN ('retainer','one-time')),
  status            TEXT    NOT NULL DEFAULT 'draft'
                    CHECK (status IN ('draft','sent','paid')),
  description       TEXT,
  due_date          DATE,
  stripe_payment_id TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- 6. marketing_portal_sessions  (mirrors portal_sessions pattern)
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS marketing_portal_sessions (
  id                UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id         UUID  NOT NULL REFERENCES marketing_clients(id) ON DELETE CASCADE,
  email             TEXT  NOT NULL,
  code              TEXT,
  code_expires_at   TIMESTAMPTZ,
  session_token     TEXT,
  session_expires_at TIMESTAMPTZ,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────
-- Indexes for common query patterns
-- ─────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_mktg_projects_client   ON marketing_projects(client_id);
CREATE INDEX IF NOT EXISTS idx_mktg_assets_client     ON generated_assets(client_id);
CREATE INDEX IF NOT EXISTS idx_mktg_schedule_client   ON post_schedule(client_id);
CREATE INDEX IF NOT EXISTS idx_mktg_invoices_client   ON invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_mktg_portal_email      ON marketing_portal_sessions(email);
CREATE INDEX IF NOT EXISTS idx_mktg_portal_token      ON marketing_portal_sessions(session_token);

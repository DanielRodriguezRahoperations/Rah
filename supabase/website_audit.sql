CREATE TABLE IF NOT EXISTS audit_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  audit_score INTEGER,
  audit_results JSONB,
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new','contacted','converted','closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_leads_email
  ON audit_leads(email);
CREATE INDEX IF NOT EXISTS idx_audit_leads_status
  ON audit_leads(status);

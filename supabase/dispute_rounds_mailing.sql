-- Dispute round tracking
ALTER TABLE credit_repair_clients
  ADD COLUMN IF NOT EXISTS dispute_round INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS round_notes TEXT;

-- Multiple FTC reports support
ALTER TABLE credit_repair_clients
  ADD COLUMN IF NOT EXISTS doc_ftc_reports JSONB DEFAULT '[]'::jsonb;

-- Police report metadata
ALTER TABLE credit_repair_clients
  ADD COLUMN IF NOT EXISTS police_report_number TEXT,
  ADD COLUMN IF NOT EXISTS police_agency TEXT,
  ADD COLUMN IF NOT EXISTS police_officer TEXT,
  ADD COLUMN IF NOT EXISTS police_report_date TEXT;

-- Additional supporting documents
ALTER TABLE credit_repair_clients
  ADD COLUMN IF NOT EXISTS doc_additional_files JSONB DEFAULT '[]'::jsonb;

-- E-signature tracking on dispute_letters
ALTER TABLE dispute_letters
  ADD COLUMN IF NOT EXISTS signed_by TEXT,
  ADD COLUMN IF NOT EXISTS signed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS signature_ip TEXT;

-- Mailing tracking on dispute_letters
ALTER TABLE dispute_letters
  ADD COLUMN IF NOT EXISTS lob_letter_id TEXT,
  ADD COLUMN IF NOT EXISTS lob_tracking_number TEXT,
  ADD COLUMN IF NOT EXISTS mailed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS mail_status TEXT DEFAULT 'pending';

-- Website Intake Table for RAH Operations
-- Run this entire script in the Supabase SQL editor
-- Dashboard → SQL Editor → New query → paste → Run

CREATE TABLE IF NOT EXISTS website_clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  business_name TEXT NOT NULL,
  industry TEXT,
  target_customer TEXT,
  site_feeling TEXT,
  brands_they_love TEXT,
  brands_they_hate TEXT,
  has_logo BOOLEAN DEFAULT FALSE,
  has_photos BOOLEAN DEFAULT FALSE,
  has_copy BOOLEAN DEFAULT FALSE,
  primary_goal TEXT,
  budget TEXT,
  timeline TEXT,
  additional_notes TEXT,
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new','in_progress','complete','cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_website_clients_status
  ON website_clients(status);
CREATE INDEX IF NOT EXISTS idx_website_clients_email
  ON website_clients(email);

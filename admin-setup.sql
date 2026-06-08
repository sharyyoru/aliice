-- Run this in your Supabase SQL Editor to set up the clients table for the admin panel
-- https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql

-- Create clients table for sales funnel tracking
CREATE TABLE IF NOT EXISTS clients (
  id SERIAL PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  industry VARCHAR(100),
  company_size VARCHAR(50),
  funnel_stage VARCHAR(50) DEFAULT 'lead',
  deal_value DECIMAL(12, 2),
  notes TEXT,
  source VARCHAR(50) DEFAULT 'manual',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);

-- Add status column to registrations table if it exists and doesn't have the column
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'registrations'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'registrations' AND column_name = 'status'
  ) THEN
    ALTER TABLE registrations ADD COLUMN status VARCHAR(50) DEFAULT 'new';
  END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Allow service role full access to clients table
CREATE POLICY "Service role can manage clients" ON clients
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Create index for funnel_stage for faster queries
CREATE INDEX IF NOT EXISTS idx_clients_funnel_stage ON clients(funnel_stage);

-- Create index for created_at for sorting
CREATE INDEX IF NOT EXISTS idx_clients_created_at ON clients(created_at DESC);

-- Update policy for registrations table to allow updates (only if table exists)
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'registrations') THEN
    EXECUTE 'DROP POLICY IF EXISTS "Service role can update" ON registrations';
    EXECUTE 'CREATE POLICY "Service role can update" ON registrations FOR UPDATE TO service_role USING (true) WITH CHECK (true)';
  END IF;
END $$;

-- Funnel stages reference (for documentation):
-- 'lead'           - Initial lead, not yet contacted
-- 'contacted'      - Initial contact made
-- 'demo_scheduled' - Demo or meeting scheduled
-- 'proposal_sent'  - Proposal/quote sent to client
-- 'negotiation'    - In negotiation phase
-- 'closed_won'     - Deal closed successfully
-- 'closed_lost'    - Deal lost

-- Source options reference:
-- 'manual'         - Manually entered by admin
-- 'registration'   - Converted from platform registration
-- 'referral'       - Referred by existing client
-- 'website'        - Website inquiry
-- 'social'         - Social media
-- 'event'          - Event/conference
-- 'cold_outreach'  - Cold outreach campaign

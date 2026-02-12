-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/npvohdynptkzmaetvrni/sql)

CREATE TABLE IF NOT EXISTS registrations (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  clinic_name VARCHAR(255) NOT NULL,
  clinic_size VARCHAR(50),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Allow service role to insert (for API)
CREATE POLICY "Service role can insert" ON registrations
  FOR INSERT TO service_role
  WITH CHECK (true);

-- Allow service role to select (for viewing registrations)
CREATE POLICY "Service role can select" ON registrations
  FOR SELECT TO service_role
  USING (true);

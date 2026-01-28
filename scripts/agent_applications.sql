-- =============================================
-- AGENT APPLICATIONS TABLE
-- Run this in Supabase SQL Editor
-- =============================================

-- Create table for agent recruitment applications
CREATE TABLE IF NOT EXISTS agent_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT NOT NULL,
    experience TEXT,
    referral_code_used TEXT,
    parent_agent_id UUID REFERENCES agents(id),
    generated_referral_code TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    rejection_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES profiles(id)
);

-- Create index for efficient queries
CREATE INDEX IF NOT EXISTS idx_agent_applications_status ON agent_applications(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_agent_applications_email ON agent_applications(email);

-- Enable Row Level Security
ALTER TABLE agent_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies:
-- 1. Anyone can submit an application (public insert)
DROP POLICY IF EXISTS "Anyone can apply" ON agent_applications;
CREATE POLICY "Anyone can apply" ON agent_applications
    FOR INSERT WITH CHECK (true);

-- 2. Only admins can view applications
DROP POLICY IF EXISTS "Admins can view applications" ON agent_applications;
CREATE POLICY "Admins can view applications" ON agent_applications
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- 3. Only admins can update applications (approve/reject)
DROP POLICY IF EXISTS "Admins can update applications" ON agent_applications;
CREATE POLICY "Admins can update applications" ON agent_applications
    FOR UPDATE USING (
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
    );

-- =============================================
-- ALSO: Add policy for public order insertion
-- (Orders from website before login)
-- =============================================

-- Allow anonymous users to insert orders
DROP POLICY IF EXISTS "Anyone can place orders" ON orders;
CREATE POLICY "Anyone can place orders" ON orders
    FOR INSERT WITH CHECK (true);

-- =============================================
-- DONE! 
-- Tables: agent_applications
-- Policies: Public insert for applications and orders
-- =============================================

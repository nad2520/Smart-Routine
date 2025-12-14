-- ============================================
-- SmartRoutine Database Initialization Script
-- ============================================
-- This script creates all tables, types, functions, and RLS policies
-- 
-- USAGE:
-- 1. Run this script in your Supabase SQL Editor (Dashboard > SQL Editor)
-- 2. This script is idempotent - safe to run multiple times
-- 3. After running, your frontend can immediately use Supabase client
--
-- FRONTEND INTEGRATION:
-- - Uses @supabase/supabase-js for client-side queries
-- - Uses @supabase/ssr for Next.js server-side rendering
-- - All tables have RLS enabled for security
-- - Auto-creates user profiles on signup via trigger
--
-- Run this script first to set up the database

-- ============================================
-- 1. ENUM TYPES
-- ============================================

-- Create role enum type for user roles
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('user', 'admin', 'psychiatrist');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- 2. TABLES
-- ============================================

-- Profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Routines table for daily tasks
CREATE TABLE IF NOT EXISTS public.routines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  time TEXT NOT NULL,
  category TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Mood logs table for tracking emotional states
CREATE TABLE IF NOT EXISTS public.mood_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mood TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics data table for productivity tracking
CREATE TABLE IF NOT EXISTS public.analytics_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  planned_hours NUMERIC NOT NULL DEFAULT 0,
  completed_hours NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Psychology reports table for general articles
CREATE TABLE IF NOT EXISTS public.psychology_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  psychiatrist_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  author_credentials TEXT NOT NULL,
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT NOT NULL,
  read_time INTEGER NOT NULL,
  published_date DATE NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User reports table for psychiatrist-authored reports specific to users
CREATE TABLE IF NOT EXISTS public.user_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  psychiatrist_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  diagnosis TEXT,
  recommendations TEXT,
  session_date DATE NOT NULL,
  follow_up_date DATE,
  is_private BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_routines_user_id ON public.routines(user_id);
CREATE INDEX IF NOT EXISTS idx_mood_logs_user_id ON public.mood_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON public.analytics_data(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_date ON public.analytics_data(date);
CREATE INDEX IF NOT EXISTS idx_user_reports_user_id ON public.user_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_user_reports_psychiatrist_id ON public.user_reports(psychiatrist_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- ============================================
-- 4. ENABLE ROW LEVEL SECURITY
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.psychology_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_reports ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 5. HELPER FUNCTIONS (SECURITY DEFINER)
-- ============================================
-- These functions bypass RLS to prevent infinite recursion

-- Drop existing functions if they exist
DROP FUNCTION IF EXISTS public.get_user_role(uuid);
DROP FUNCTION IF EXISTS public.is_admin();
DROP FUNCTION IF EXISTS public.is_psychiatrist();

-- Get user role without triggering RLS
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid uuid)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(role::text, 'user') 
  FROM public.profiles 
  WHERE id = user_uuid
  LIMIT 1;
$$;

-- Check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.get_user_role(auth.uid()) = 'admin';
$$;

-- Check if current user is psychiatrist or admin
CREATE OR REPLACE FUNCTION public.is_psychiatrist()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.get_user_role(auth.uid()) IN ('psychiatrist', 'admin');
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.get_user_role(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_psychiatrist() TO authenticated;

-- ============================================
-- 6. AUTO-CREATE PROFILE TRIGGER
-- ============================================

-- Function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data ->> 'full_name', null),
    COALESCE((new.raw_user_meta_data ->> 'role')::user_role, 'user')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger for auto profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 7. RLS POLICIES - PROFILES
-- ============================================

DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_admin" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_admin" ON public.profiles;

CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_select_admin" ON public.profiles
  FOR SELECT USING (public.is_admin());

CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "profiles_update_admin" ON public.profiles
  FOR UPDATE USING (public.is_admin());

-- ============================================
-- 8. RLS POLICIES - ROUTINES
-- ============================================

DROP POLICY IF EXISTS "routines_select_own" ON public.routines;
DROP POLICY IF EXISTS "routines_select_admin" ON public.routines;
DROP POLICY IF EXISTS "routines_insert_own" ON public.routines;
DROP POLICY IF EXISTS "routines_update_own" ON public.routines;
DROP POLICY IF EXISTS "routines_delete_own" ON public.routines;

CREATE POLICY "routines_select_own" ON public.routines
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "routines_select_admin" ON public.routines
  FOR SELECT USING (public.is_admin());

CREATE POLICY "routines_insert_own" ON public.routines
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "routines_update_own" ON public.routines
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "routines_delete_own" ON public.routines
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- 9. RLS POLICIES - MOOD LOGS
-- ============================================

DROP POLICY IF EXISTS "mood_logs_select_own" ON public.mood_logs;
DROP POLICY IF EXISTS "mood_logs_select_admin" ON public.mood_logs;
DROP POLICY IF EXISTS "mood_logs_select_psychiatrist" ON public.mood_logs;
DROP POLICY IF EXISTS "mood_logs_insert_own" ON public.mood_logs;
DROP POLICY IF EXISTS "mood_logs_update_own" ON public.mood_logs;
DROP POLICY IF EXISTS "mood_logs_delete_own" ON public.mood_logs;

CREATE POLICY "mood_logs_select_own" ON public.mood_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "mood_logs_select_admin" ON public.mood_logs
  FOR SELECT USING (public.is_admin());

CREATE POLICY "mood_logs_select_psychiatrist" ON public.mood_logs
  FOR SELECT USING (public.is_psychiatrist());

CREATE POLICY "mood_logs_insert_own" ON public.mood_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "mood_logs_update_own" ON public.mood_logs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "mood_logs_delete_own" ON public.mood_logs
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- 10. RLS POLICIES - ANALYTICS DATA
-- ============================================

DROP POLICY IF EXISTS "analytics_select_own" ON public.analytics_data;
DROP POLICY IF EXISTS "analytics_select_admin" ON public.analytics_data;
DROP POLICY IF EXISTS "analytics_insert_own" ON public.analytics_data;
DROP POLICY IF EXISTS "analytics_update_own" ON public.analytics_data;

CREATE POLICY "analytics_select_own" ON public.analytics_data
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "analytics_select_admin" ON public.analytics_data
  FOR SELECT USING (public.is_admin());

CREATE POLICY "analytics_insert_own" ON public.analytics_data
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "analytics_update_own" ON public.analytics_data
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- 11. RLS POLICIES - PSYCHOLOGY REPORTS
-- ============================================

DROP POLICY IF EXISTS "psychology_reports_select_all" ON public.psychology_reports;
DROP POLICY IF EXISTS "psychology_reports_insert" ON public.psychology_reports;
DROP POLICY IF EXISTS "psychology_reports_update_author" ON public.psychology_reports;
DROP POLICY IF EXISTS "psychology_reports_update_admin" ON public.psychology_reports;
DROP POLICY IF EXISTS "psychology_reports_delete_author" ON public.psychology_reports;
DROP POLICY IF EXISTS "psychology_reports_delete_admin" ON public.psychology_reports;

CREATE POLICY "psychology_reports_select_all" ON public.psychology_reports
  FOR SELECT USING (true);

CREATE POLICY "psychology_reports_insert" ON public.psychology_reports
  FOR INSERT WITH CHECK (public.is_psychiatrist());

CREATE POLICY "psychology_reports_update_author" ON public.psychology_reports
  FOR UPDATE USING (auth.uid() = psychiatrist_id);

CREATE POLICY "psychology_reports_update_admin" ON public.psychology_reports
  FOR UPDATE USING (public.is_admin());

CREATE POLICY "psychology_reports_delete_author" ON public.psychology_reports
  FOR DELETE USING (auth.uid() = psychiatrist_id);

CREATE POLICY "psychology_reports_delete_admin" ON public.psychology_reports
  FOR DELETE USING (public.is_admin());

-- ============================================
-- 12. RLS POLICIES - USER REPORTS
-- ============================================

DROP POLICY IF EXISTS "user_reports_select_own" ON public.user_reports;
DROP POLICY IF EXISTS "user_reports_select_author" ON public.user_reports;
DROP POLICY IF EXISTS "user_reports_select_admin" ON public.user_reports;
DROP POLICY IF EXISTS "user_reports_insert" ON public.user_reports;
DROP POLICY IF EXISTS "user_reports_update_author" ON public.user_reports;
DROP POLICY IF EXISTS "user_reports_update_admin" ON public.user_reports;
DROP POLICY IF EXISTS "user_reports_delete_author" ON public.user_reports;
DROP POLICY IF EXISTS "user_reports_delete_admin" ON public.user_reports;

CREATE POLICY "user_reports_select_own" ON public.user_reports
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "user_reports_select_author" ON public.user_reports
  FOR SELECT USING (auth.uid() = psychiatrist_id);

CREATE POLICY "user_reports_select_admin" ON public.user_reports
  FOR SELECT USING (public.is_admin());

CREATE POLICY "user_reports_insert" ON public.user_reports
  FOR INSERT WITH CHECK (public.is_psychiatrist());

CREATE POLICY "user_reports_update_author" ON public.user_reports
  FOR UPDATE USING (auth.uid() = psychiatrist_id);

CREATE POLICY "user_reports_update_admin" ON public.user_reports
  FOR UPDATE USING (public.is_admin());

CREATE POLICY "user_reports_delete_author" ON public.user_reports
  FOR DELETE USING (auth.uid() = psychiatrist_id);

CREATE POLICY "user_reports_delete_admin" ON public.user_reports
  FOR DELETE USING (public.is_admin());

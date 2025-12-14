
-- ============================================
-- Fix RLS Policies for Psychiatrist Access
-- ============================================

-- 1. Allow Psychiatrists to view Profiles (to see patient names/emails)
DROP POLICY IF EXISTS "profiles_select_psychiatrist" ON public.profiles;

CREATE POLICY "profiles_select_psychiatrist" ON public.profiles
  FOR SELECT
  USING (public.is_psychiatrist());

-- 2. Allow Psychiatrists to view Routines
DROP POLICY IF EXISTS "routines_select_psychiatrist" ON public.routines;

CREATE POLICY "routines_select_psychiatrist" ON public.routines
  FOR SELECT
  USING (public.is_psychiatrist());

-- 3. Allow Psychiatrists to view Analytics Data
DROP POLICY IF EXISTS "analytics_select_psychiatrist" ON public.analytics_data;

CREATE POLICY "analytics_select_psychiatrist" ON public.analytics_data
  FOR SELECT
  USING (public.is_psychiatrist());

-- 4. Verify Mood Logs access (already should be there, but ensuring)
DROP POLICY IF EXISTS "mood_logs_select_psychiatrist" ON public.mood_logs;

CREATE POLICY "mood_logs_select_psychiatrist" ON public.mood_logs
  FOR SELECT
  USING (public.is_psychiatrist());

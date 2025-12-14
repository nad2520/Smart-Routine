
-- ============================================
-- Fix Missing Profiles
-- ============================================

-- 1. Insert missing profiles from auth.users
INSERT INTO public.profiles (id, email, full_name, role)
SELECT 
  id, 
  email, 
  COALESCE(raw_user_meta_data->>'full_name', email) as full_name,
  'user' as role -- default to user
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles)
ON CONFLICT (id) DO NOTHING;

-- 2. Explicitly set the psychiatrist role for the specific user
UPDATE public.profiles
SET role = 'psychiatrist'
WHERE id = '8adda3d9-a621-4d2c-974e-40230304e5fc';

-- 3. Explicitly set the user role for the patient (just in case)
UPDATE public.profiles
SET role = 'user'
WHERE id = '3a93e96a-cfc8-4a14-afcb-3bbe67133ad2';

-- 4. Verify results
SELECT id, email, role, full_name FROM public.profiles;

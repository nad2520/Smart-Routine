-- ============================================
-- Seed Data: Sample Patient Data for Psychiatrist View
-- ============================================
-- This script creates sample patient data to test the psychiatrist dashboard
-- Run this AFTER 001-init-database.sql

-- ============================================
-- CONFIGURE YOUR IDs HERE:
-- ============================================
-- 1. Get your user ID: SELECT id FROM auth.users WHERE email = 'your-email@example.com';
-- 2. Get your psychiatrist ID: SELECT id FROM profiles WHERE role = 'psychiatrist';
-- 3. Replace the UUIDs below with your actual IDs

-- ============================================
-- 0. PRE-REQUISITE: CREATE RELATIONSHIP TABLE
-- ============================================
-- Ensure the table exists before trying to insert into it
CREATE TABLE IF NOT EXISTS public.psychiatrist_patients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  psychiatrist_id UUID NOT NULL,  -- using simple UUID for compatibility if auth.users is strict
  patient_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(psychiatrist_id, patient_id)
);

-- Enable RLS if not already enabled
DO $$ 
BEGIN
  ALTER TABLE public.psychiatrist_patients ENABLE ROW LEVEL SECURITY;
EXCEPTION 
  WHEN OTHERS THEN NULL;
END $$;

-- ============================================
-- SEED DATA SCRIPT STARTS HERE
-- ============================================
DO $$
DECLARE
  -- CHANGE THESE TWO IDs:
  user_uuid UUID := '3a93e96a-cfc8-4a14-afcb-3bbe67133ad2';  -- Your user ID (patient)
  psychiatrist_uuid UUID := '8adda3d9-a621-4d2c-974e-40230304e5fc';  -- Your psychiatrist ID
BEGIN

  -- ============================================
  -- 1. CREATE ROUTINES FOR PATIENT
  -- ============================================
  
  INSERT INTO public.routines (user_id, title, description, time, category, icon, color, completed, created_at) VALUES
    (user_uuid, 'Morning Meditation', 'Start the day with 10 minutes of mindfulness', '07:00', 'Wellness', 'brain', 'blue', true, NOW() - INTERVAL '5 days'),
    (user_uuid, 'Exercise', '30 minutes cardio workout', '08:00', 'Health', 'activity', 'green', true, NOW() - INTERVAL '5 days'),
    (user_uuid, 'Work Session', 'Focus on main project tasks', '09:00', 'Work', 'briefcase', 'purple', true, NOW() - INTERVAL '5 days'),
    (user_uuid, 'Lunch Break', 'Healthy meal and rest', '12:00', 'Health', 'utensils', 'orange', true, NOW() - INTERVAL '5 days'),
    (user_uuid, 'Reading Time', 'Read for personal development', '20:00', 'Learning', 'book', 'indigo', false, NOW() - INTERVAL '5 days'),
    (user_uuid, 'Yoga Practice', 'Morning yoga routine', '06:30', 'Wellness', 'heart', 'pink', true, NOW() - INTERVAL '3 days'),
    (user_uuid, 'Journaling', 'Reflect on thoughts and feelings', '07:30', 'Wellness', 'pen-tool', 'purple', true, NOW() - INTERVAL '3 days'),
    (user_uuid, 'Evening Walk', 'Relaxing walk in nature', '18:00', 'Health', 'footprints', 'green', true, NOW() - INTERVAL '3 days');

  -- ============================================
  -- 2. CREATE MOOD LOGS FOR PATIENT
  -- ============================================
  
  INSERT INTO public.mood_logs (user_id, mood, note, created_at) VALUES
    (user_uuid, 'Happy', 'Had a great productive day at work!', NOW() - INTERVAL '1 day'),
    (user_uuid, 'Neutral', 'Feeling okay, nothing special', NOW() - INTERVAL '2 days'),
    (user_uuid, 'Excellent', 'Completed all my goals today!', NOW() - INTERVAL '3 days'),
    (user_uuid, 'Sad', 'Feeling a bit overwhelmed with work', NOW() - INTERVAL '4 days'),
    (user_uuid, 'Happy', 'Good exercise session lifted my mood', NOW() - INTERVAL '5 days'),
    (user_uuid, 'Great', 'Yoga practice was amazing today', NOW() - INTERVAL '6 days'),
    (user_uuid, 'Happy', 'Journaling helped me process my thoughts', NOW() - INTERVAL '7 days'),
    (user_uuid, 'Excellent', 'Feeling very balanced and centered', NOW() - INTERVAL '8 days'),
    (user_uuid, 'Neutral', 'Just a regular day', NOW() - INTERVAL '9 days'),
    (user_uuid, 'Great', 'Evening walk was peaceful', NOW() - INTERVAL '10 days');

  -- ============================================
  -- 3. CREATE ANALYTICS DATA FOR PATIENT
  -- ============================================
  
  INSERT INTO public.analytics_data (user_id, date, planned_hours, completed_hours) VALUES
    (user_uuid, CURRENT_DATE - INTERVAL '13 days', 8, 7),
    (user_uuid, CURRENT_DATE - INTERVAL '12 days', 8, 8),
    (user_uuid, CURRENT_DATE - INTERVAL '11 days', 8, 6),
    (user_uuid, CURRENT_DATE - INTERVAL '10 days', 8, 7.5),
    (user_uuid, CURRENT_DATE - INTERVAL '9 days', 8, 8),
    (user_uuid, CURRENT_DATE - INTERVAL '8 days', 8, 7),
    (user_uuid, CURRENT_DATE - INTERVAL '7 days', 8, 5),
    (user_uuid, CURRENT_DATE - INTERVAL '6 days', 7, 7),
    (user_uuid, CURRENT_DATE - INTERVAL '5 days', 7, 6.5),
    (user_uuid, CURRENT_DATE - INTERVAL '4 days', 7, 7),
    (user_uuid, CURRENT_DATE - INTERVAL '3 days', 7, 7),
    (user_uuid, CURRENT_DATE - INTERVAL '2 days', 7, 6),
    (user_uuid, CURRENT_DATE - INTERVAL '1 day', 7, 7),
    (user_uuid, CURRENT_DATE, 7, 6);

  -- ============================================
  -- 4. CREATE PSYCHIATRIST REPORTS FOR PATIENT
  -- ============================================
  
  INSERT INTO public.user_reports (user_id, psychiatrist_id, title, content, diagnosis, recommendations, session_date, follow_up_date, is_private) VALUES
    (user_uuid, psychiatrist_uuid, 'Initial Assessment', 
     'Patient presents with good overall mental health. Shows strong commitment to daily routines and self-care practices. Reports occasional work-related stress but manages it well through exercise and meditation. Regular mood logging indicates generally positive emotional state with occasional dips related to work pressure.',
     'No significant concerns. Mild work-related stress. Good coping mechanisms in place.',
     'Continue current routine practices including meditation and exercise. Consider stress management techniques for work deadlines. Maintain journaling practice for emotional awareness. Follow up in 4 weeks to monitor progress.',
     CURRENT_DATE - INTERVAL '30 days', CURRENT_DATE + INTERVAL '14 days', true),
    
    (user_uuid, psychiatrist_uuid, 'Follow-up Session',
     'Patient reports improvement in work-life balance. Meditation practice has been particularly helpful in managing stress. Productivity remains high with good completion rates on daily tasks. Mood logs show consistent positive trend with better emotional regulation.',
     'Continued progress. No new concerns. Effective stress management.',
     'Maintain current practices. Explore advanced meditation techniques if interested. Consider group activities for social connection. Continue monitoring mood patterns.',
     CURRENT_DATE - INTERVAL '15 days', CURRENT_DATE + INTERVAL '30 days', true),
    
    (user_uuid, psychiatrist_uuid, 'Progress Review',
     'Excellent progress noted. Patient demonstrates strong self-awareness and commitment to wellness practices. Analytics show consistent productivity with healthy work-rest balance. Mood tracking reveals predominantly positive emotional state with effective management of occasional stress.',
     'Excellent mental health. Strong self-care practices established.',
     'Continue all current practices. Patient is doing exceptionally well. Encourage sharing wellness strategies with others. Schedule check-in in 6 weeks.',
     CURRENT_DATE - INTERVAL '5 days', CURRENT_DATE + INTERVAL '42 days', true);

  -- ============================================
  -- 5. ASSIGN PATIENT TO PSYCHIATRIST
  -- ============================================

  INSERT INTO public.psychiatrist_patients (psychiatrist_id, patient_id)
  VALUES (psychiatrist_uuid, user_uuid)
  ON CONFLICT (psychiatrist_id, patient_id) DO NOTHING;

  RAISE NOTICE 'Sample patient data created successfully!';
  RAISE NOTICE 'User ID: %', user_uuid;
  RAISE NOTICE 'Psychiatrist ID: %', psychiatrist_uuid;
  RAISE NOTICE 'Created: 8 routines, 10 mood logs, 14 analytics entries, 3 reports, 1 patient assignment';

END $$;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Run these to verify the data was created:

-- Check routines:
-- SELECT COUNT(*) as routine_count FROM routines WHERE user_id = 'YOUR_USER_ID';

-- Check mood logs:
-- SELECT COUNT(*) as mood_count FROM mood_logs WHERE user_id = 'YOUR_USER_ID';

-- Check analytics:
-- SELECT COUNT(*) as analytics_count FROM analytics_data WHERE user_id = 'YOUR_USER_ID';

-- Check reports:
-- SELECT COUNT(*) as report_count FROM user_reports WHERE user_id = 'YOUR_USER_ID';

-- ============================================
-- NOTES:
-- ============================================
-- 1. This script uses a DO block so you can define variables once at the top
-- 2. Change BOTH user_uuid and psychiatrist_uuid at the top of the script
-- 3. The script is idempotent - safe to run multiple times (will create duplicates though)
-- 4. All data uses relative dates (NOW() - INTERVAL) so it's always current
-- 5. To delete and re-run, first delete the data:
--    DELETE FROM routines WHERE user_id = 'YOUR_USER_ID';
--    DELETE FROM mood_logs WHERE user_id = 'YOUR_USER_ID';
--    DELETE FROM analytics_data WHERE user_id = 'YOUR_USER_ID';
--    DELETE FROM user_reports WHERE user_id = 'YOUR_USER_ID';

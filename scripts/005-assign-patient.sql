
-- ============================================
-- Seed Data: Assign Patient to Psychiatrist
-- ============================================
-- This script assigns the specific patient to the specific psychiatrist
-- Run this AFTER 004-create-psychiatrist-patients-table.sql

INSERT INTO public.psychiatrist_patients (psychiatrist_id, patient_id)
VALUES (
  '8adda3d9-a621-4d2c-974e-40230304e5fc',  -- Psychiatrist ID
  '3a93e96a-cfc8-4a14-afcb-3bbe67133ad2'   -- Patient ID
)
ON CONFLICT (psychiatrist_id, patient_id) DO NOTHING;

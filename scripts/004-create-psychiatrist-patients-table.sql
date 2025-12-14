
-- Create a table to link psychiatrists and patients
CREATE TABLE IF NOT EXISTS psychiatrist_patients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  psychiatrist_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(psychiatrist_id, patient_id)
);

-- Enable RLS
ALTER TABLE psychiatrist_patients ENABLE ROW LEVEL SECURITY;

-- Policies
-- Psychiatrists can view their assignments
CREATE POLICY "Psychiatrists can view their patients" ON psychiatrist_patients
  FOR SELECT
  USING (auth.uid() = psychiatrist_id);

-- Psychiatrists can add patients (optional, depending on workflow)
CREATE POLICY "Psychiatrists can add patients" ON psychiatrist_patients
  FOR INSERT
  WITH CHECK (auth.uid() = psychiatrist_id);

-- Psychiatrists can remove patients
CREATE POLICY "Psychiatrists can remove patients" ON psychiatrist_patients
  FOR DELETE
  USING (auth.uid() = psychiatrist_id);

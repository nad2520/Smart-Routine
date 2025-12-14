
-- Force update the role for the psychiatrist user
UPDATE public.profiles
SET role = 'psychiatrist'
WHERE id = '8adda3d9-a621-4d2c-974e-40230304e5fc';

-- Verify the update
SELECT * FROM public.profiles WHERE id = '8adda3d9-a621-4d2c-974e-40230304e5fc';

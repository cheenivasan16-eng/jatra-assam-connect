-- Create the admin user account
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@jatra.com',
  crypt('admin@123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Create the corresponding profile with admin role
INSERT INTO public.profiles (user_id, name, role)
SELECT 
  id,
  'Admin User',
  'admin'::user_role
FROM auth.users 
WHERE email = 'admin@jatra.com';
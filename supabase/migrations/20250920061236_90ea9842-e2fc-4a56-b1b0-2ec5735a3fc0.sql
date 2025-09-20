-- Confirm the admin user's email to allow login
UPDATE auth.users 
SET email_confirmed_at = now()
WHERE email = 'admin@jatra.com' AND email_confirmed_at IS NULL;
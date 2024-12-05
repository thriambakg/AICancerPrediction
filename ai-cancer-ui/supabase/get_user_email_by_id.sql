CREATE OR REPLACE FUNCTION get_user_email_by_id(user_id UUID)
RETURNS TEXT
SECURITY DEFINER
AS $$
BEGIN
  RETURN (
    SELECT au.email
    FROM auth.users au
    WHERE au.id = $1
  );
END;
$$ LANGUAGE plpgsql;

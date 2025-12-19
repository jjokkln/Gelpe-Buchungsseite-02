-- 1. Create Helper Function to avoid Recursion
-- SECURITY DEFINER allows this function to read 'profiles' bypassing RLS
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  );
$$;

-- 2. Enable RLS (Ensure it's on)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;

-- -----------------
-- PROFILES POLICIES
-- -----------------

DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (is_admin());

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);


-- -----------------
-- BOOKINGS POLICIES
-- -----------------

DROP POLICY IF EXISTS "Users can view own bookings" ON bookings;
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all bookings" ON bookings;
CREATE POLICY "Admins can view all bookings" ON bookings
  FOR SELECT USING (is_admin());

DROP POLICY IF EXISTS "Users can insert own bookings" ON bookings;
CREATE POLICY "Users can insert own bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own bookings" ON bookings;
CREATE POLICY "Users can update own bookings" ON bookings
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can update all bookings" ON bookings;
CREATE POLICY "Admins can update all bookings" ON bookings
  FOR UPDATE USING (is_admin());


-- ---------------------
-- BLOCKED DATES POLICIES
-- ---------------------

DROP POLICY IF EXISTS "Public can view blocked dates" ON blocked_dates;
CREATE POLICY "Public can view blocked dates" ON blocked_dates
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage blocked dates" ON blocked_dates;
CREATE POLICY "Admins can manage blocked dates" ON blocked_dates
  FOR ALL USING (is_admin());

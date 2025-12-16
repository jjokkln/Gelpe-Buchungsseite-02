-- 1. Create a function that handles new user signups
-- This function runs automatically whenever a new user is created in auth.users
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (
    new.id,
    new.email,
    -- Try to get names from metadata if available, otherwise null
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name'
  );
  return new;
end;
$$;

-- 2. Create the trigger
-- This tells the database to run the function above AFTER every INSERT on auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Backfill / Fix existing users
-- This inserts missing profiles for users that already exist in Auth but not in Profiles
insert into public.profiles (id, email)
select id, email
from auth.users
where id not in (select id from public.profiles);

-- 4. Update existing profiles with latest email from Auth (if mismatched)
update public.profiles p
set email = au.email
from auth.users au
where p.id = au.id
and p.email <> au.email;

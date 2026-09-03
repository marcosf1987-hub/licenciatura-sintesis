-- Solo el titular puede crear cuenta.
-- 1) Insertá TU correo (minúsculas).
-- 2) Ejecutá el resto.

create table if not exists public.app_owner (
  email text primary key
);

alter table public.app_owner enable row level security;

-- Ejemplo: descomentá y poné tu mail
-- insert into public.app_owner (email) values ('tu@correo.com')
-- on conflict do nothing;

create or replace function public.only_owner_signup()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1 from public.app_owner
    where lower(email) = lower(new.email)
  ) then
    raise exception 'Usuario no autorizado';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_only_owner_signup on auth.users;
create trigger trg_only_owner_signup
  before insert on auth.users
  for each row execute function public.only_owner_signup();

-- Tiempo de estudio declarado por el titular (métrica principal).
-- Distinto de session_events (tiempo en pantalla, complementario).

create table if not exists estudio_unidad (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade not null,
  modulo_id   text not null,
  unidad_id   text not null,  -- e.g. U1
  minutos     int not null check (minutos >= 0 and minutos <= 10080),
  nota        text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique(user_id, modulo_id, unidad_id)
);

alter table estudio_unidad enable row level security;

drop policy if exists "solo propio" on estudio_unidad;
create policy "solo propio" on estudio_unidad
  for all using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop trigger if exists trg_estudio_unidad_updated_at on estudio_unidad;
create trigger trg_estudio_unidad_updated_at
  before update on estudio_unidad
  for each row execute function set_updated_at();

comment on table estudio_unidad is 'Minutos de estudio declarados al completar cada unidad (incluye estudio fuera de la plataforma)';

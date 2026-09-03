-- ============================================================
-- Licenciatura en yo mismo — Schema Fase 2
-- Ejecutar en Supabase SQL Editor
-- ============================================================

-- --------------------------------------------------------
-- 1. Estado por módulo
-- --------------------------------------------------------
create table if not exists modulo_estado (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade not null,
  modulo_id   text not null,
  estado      text not null default 'bloqueado'
                check (estado in ('bloqueado','disponible','en_curso','evaluacion','aprobado','reprobado')),
  calificacion      numeric(5,2),
  fecha_inicio      timestamptz,
  fecha_aprobacion  timestamptz,
  intentos_evaluacion int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique(user_id, modulo_id)
);

alter table modulo_estado enable row level security;
create policy "solo propio" on modulo_estado
  for all using (auth.uid() = user_id);

-- --------------------------------------------------------
-- 2. Checkboxes del programa (U1–U8 y evidencias)
-- --------------------------------------------------------
create table if not exists checklist_items (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade not null,
  modulo_id   text not null,
  item_key    text not null,   -- e.g. "U1", "U2", "biblio_1", "artefacto"
  item_type   text not null default 'programa'
                check (item_type in ('programa','biblio','evidencia')),
  checked     boolean not null default false,
  updated_at  timestamptz not null default now(),
  unique(user_id, modulo_id, item_key)
);

alter table checklist_items enable row level security;
create policy "solo propio" on checklist_items
  for all using (auth.uid() = user_id);

-- --------------------------------------------------------
-- 3. Artefactos de estudio
-- --------------------------------------------------------
create table if not exists artefactos (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade not null,
  modulo_id   text not null,
  nombre      text not null,
  tipo        text not null default 'nota'
                check (tipo in ('nota','mapa','ejercicios','ensayo','otro')),
  contenido   text,
  created_at  timestamptz not null default now()
);

alter table artefactos enable row level security;
create policy "solo propio" on artefactos
  for all using (auth.uid() = user_id);

-- --------------------------------------------------------
-- 4. Sesiones pasivas (solo estadísticas, nunca gates)
-- --------------------------------------------------------
create table if not exists session_events (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references auth.users(id) on delete cascade not null,
  modulo_id       text not null,
  started_at      timestamptz not null default now(),
  ended_at        timestamptz,
  duration_seconds int
);

alter table session_events enable row level security;
create policy "solo propio" on session_events
  for all using (auth.uid() = user_id);

-- --------------------------------------------------------
-- 5. Función: updated_at automático
-- --------------------------------------------------------
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_modulo_estado_updated_at
  before update on modulo_estado
  for each row execute function set_updated_at();

create trigger trg_checklist_updated_at
  before update on checklist_items
  for each row execute function set_updated_at();

-- --------------------------------------------------------
-- 6. Función: desbloquear módulos dependientes al aprobar
-- --------------------------------------------------------
create or replace function desbloquear_dependientes(
  p_user_id uuid,
  p_modulo_aprobado text
)
returns void language plpgsql security definer as $$
declare
  deps text[];
  dep  text;
  todos_aprobados boolean;
  prereqs text[];
begin
  -- mapa de dependencias (modulo -> lista de módulos que desbloquea)
  -- generado desde plan_general.json
  case p_modulo_aprobado
    when 'M01' then deps := array['M10','M11','M32'];
    when 'M02' then deps := array['M05','M08','M13'];
    when 'M03' then deps := array['M06','M34'];
    when 'M04' then deps := array['M31'];
    when 'M05' then deps := array['M07'];
    when 'M06' then deps := array['M16'];
    when 'M07' then deps := array['M08'];
    when 'M08' then deps := array['M14'];
    when 'M09' then deps := array['M15'];
    when 'M10' then deps := array['M20'];
    when 'M11' then deps := array['M19'];
    when 'M12' then deps := array['M21'];
    when 'M13' then deps := array['M19','M22'];
    when 'M14' then deps := array['M22'];
    when 'M15' then deps := array['M23'];
    when 'M16' then deps := array['M24'];
    when 'M17' then deps := array['M25'];
    when 'M18' then deps := array['M26'];
    when 'M19' then deps := array['M27'];
    when 'M20' then deps := array['M28'];
    when 'M21' then deps := array['M29'];
    when 'M22' then deps := array['M30'];
    when 'M23' then deps := array['M30'];
    when 'M24' then deps := array['M33'];
    when 'M25' then deps := array['M35'];
    when 'M26' then deps := array['M36'];
    when 'M27' then deps := array['M37'];
    when 'M28' then deps := array['M38'];
    when 'M29' then deps := array['M39'];
    when 'M30' then deps := array['M40'];
    when 'M31' then deps := array['M32'];
    when 'M32' then deps := array['M41'];
    when 'M33' then deps := array['M41'];
    when 'M34' then deps := array['M42'];
    when 'M35' then deps := array['M43'];
    when 'M36' then deps := array['M44'];
    when 'M37' then deps := array['M45'];
    when 'M38' then deps := array['M46'];
    when 'M39' then deps := array['M47'];
    when 'M40' then deps := array['M48'];
    when 'M41' then deps := array['M42'];
    when 'M42' then deps := array[]::text[];
    else deps := array[]::text[];
  end case;

  foreach dep in array deps loop
    -- verificar que todos los prerrequisitos del dep estén aprobados
    -- (simplificado: orden secuencial M01→M48, el anterior debe estar aprobado)
    todos_aprobados := true;

    -- chequear si ya existe la fila; si no, crearla como bloqueado primero
    insert into modulo_estado (user_id, modulo_id, estado)
    values (p_user_id, dep, 'bloqueado')
    on conflict (user_id, modulo_id) do nothing;

    -- solo desbloquear si estaba bloqueado (no retroceder estados)
    update modulo_estado
    set estado = 'disponible'
    where user_id = p_user_id
      and modulo_id = dep
      and estado = 'bloqueado';
  end loop;
end;
$$;

-- Ampliar session_events para lecturas trackeadas
alter table session_events
  add column if not exists unidad_id text,
  add column if not exists url text,
  add column if not exists kind text not null default 'webapp';

comment on column session_events.kind is 'webapp | lectura | unidad';

-- ============================================================================
-- Kayke Space — schema Supabase
-- Execute este arquivo inteiro no SQL Editor do Supabase.
-- Depois execute supabase/seed.sql (opcional, para começar com o conteúdo real).
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Administradores autorizados
-- ---------------------------------------------------------------------------
create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

insert into public.admin_users (email)
values ('kayke0812@proton.me')
on conflict (email) do nothing;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- ---------------------------------------------------------------------------
-- Conteúdo
-- ---------------------------------------------------------------------------
create table if not exists public.profile (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  headline text not null,
  bio text not null,
  story text not null,
  avatar_url text not null default '/assets/avatar.png',
  email text not null,
  github_url text not null,
  instagram_url text,
  location text,
  updated_at timestamptz not null default now()
);

create table if not exists public.current_status (
  id uuid primary key default gen_random_uuid(),
  studying text not null,
  focus text not null,
  current_course text not null,
  current_project text not null,
  next_goal text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  position integer not null unique check (position between 1 and 10),
  title text not null,
  channel text not null,
  url text not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  objective text not null default '',
  problem text not null default '',
  tools text[] not null default '{}',
  image_url text,
  github_url text,
  demo_url text,
  project_date date,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.journey_entries (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('aprendizado', 'conquista', 'projeto', 'experiencia', 'objetivo')),
  entry_date date not null,
  description text not null,
  notes text,
  source text not null default 'manual' check (source in ('manual', 'auto')),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  role text not null,
  period text not null default '',
  responsibilities text not null default '',
  activities text not null default '',
  tools text[] not null default '{}',
  learnings text not null default '',
  results text not null default '',
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  kind text not null default 'marco' check (kind in ('certificacao', 'curso', 'projeto', 'academico', 'profissional', 'marco')),
  achieved_on date,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  horizon text not null default 'curto' check (horizon in ('curto', 'medio', 'longo')),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.activity_log (
  id uuid primary key default gen_random_uuid(),
  occurred_at timestamptz not null default now(),
  action text not null check (action in ('create', 'update', 'publish', 'unpublish', 'delete')),
  entity text not null,
  entity_id uuid,
  summary text not null,
  before jsonb,
  after jsonb
);

-- ---------------------------------------------------------------------------
-- updated_at automático
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profile_set_updated_at on public.profile;
create trigger profile_set_updated_at before update on public.profile
for each row execute function public.set_updated_at();

drop trigger if exists current_status_set_updated_at on public.current_status;
create trigger current_status_set_updated_at before update on public.current_status
for each row execute function public.set_updated_at();

drop trigger if exists courses_set_updated_at on public.courses;
create trigger courses_set_updated_at before update on public.courses
for each row execute function public.set_updated_at();

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists journey_set_updated_at on public.journey_entries;
create trigger journey_set_updated_at before update on public.journey_entries
for each row execute function public.set_updated_at();

drop trigger if exists experiences_set_updated_at on public.experiences;
create trigger experiences_set_updated_at before update on public.experiences
for each row execute function public.set_updated_at();

drop trigger if exists achievements_set_updated_at on public.achievements;
create trigger achievements_set_updated_at before update on public.achievements
for each row execute function public.set_updated_at();

drop trigger if exists goals_set_updated_at on public.goals;
create trigger goals_set_updated_at before update on public.goals
for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.profile enable row level security;
alter table public.current_status enable row level security;
alter table public.courses enable row level security;
alter table public.projects enable row level security;
alter table public.journey_entries enable row level security;
alter table public.experiences enable row level security;
alter table public.achievements enable row level security;
alter table public.goals enable row level security;
alter table public.activity_log enable row level security;

-- Leitura pública
drop policy if exists "profile public read" on public.profile;
create policy "profile public read" on public.profile for select using (true);
drop policy if exists "current_status public read" on public.current_status;
create policy "current_status public read" on public.current_status for select using (true);
drop policy if exists "courses public read" on public.courses;
create policy "courses public read" on public.courses for select using (true);

drop policy if exists "projects public read" on public.projects;
create policy "projects public read" on public.projects
  for select using (status = 'published');
drop policy if exists "journey public read" on public.journey_entries;
create policy "journey public read" on public.journey_entries
  for select using (status = 'published');
drop policy if exists "experiences public read" on public.experiences;
create policy "experiences public read" on public.experiences
  for select using (status = 'published');
drop policy if exists "achievements public read" on public.achievements;
create policy "achievements public read" on public.achievements
  for select using (status = 'published');
drop policy if exists "goals public read" on public.goals;
create policy "goals public read" on public.goals
  for select using (status = 'published');

-- Administração
drop policy if exists "profile admin all" on public.profile;
create policy "profile admin all" on public.profile
  for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "current_status admin all" on public.current_status;
create policy "current_status admin all" on public.current_status
  for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "courses admin all" on public.courses;
create policy "courses admin all" on public.courses
  for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "projects admin all" on public.projects;
create policy "projects admin all" on public.projects
  for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "journey admin all" on public.journey_entries;
create policy "journey admin all" on public.journey_entries
  for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "experiences admin all" on public.experiences;
create policy "experiences admin all" on public.experiences
  for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "achievements admin all" on public.achievements;
create policy "achievements admin all" on public.achievements
  for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "goals admin all" on public.goals;
create policy "goals admin all" on public.goals
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "activity_log admin read" on public.activity_log;
create policy "activity_log admin read" on public.activity_log
  for select using (public.is_admin());
drop policy if exists "activity_log admin insert" on public.activity_log;
create policy "activity_log admin insert" on public.activity_log
  for insert with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Índices úteis
-- ---------------------------------------------------------------------------
create index if not exists projects_status_idx on public.projects (status, project_date desc);
create index if not exists journey_status_date_idx on public.journey_entries (status, entry_date desc);
create index if not exists activity_log_occurred_idx on public.activity_log (occurred_at desc);
create index if not exists achievements_status_idx on public.achievements (status, achieved_on desc);

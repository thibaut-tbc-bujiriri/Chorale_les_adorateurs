-- 00_schema.sql
-- Schéma complet pour l'application chorale (frontend actuel + future intégration Supabase)

create extension if not exists pgcrypto;

create type public.app_role as enum (
  'super_admin',
  'maitre_chant',
  'discipline_admin',
  'choriste'
);

create type public.choir_voice as enum (
  'Soprano',
  'Alto',
  'Ténor',
  'Basse'
);

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text not null,
  role public.app_role not null default 'choriste',
  choir_voice public.choir_voice not null default 'Soprano',
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  joined_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.songs (
  id uuid primary key default gen_random_uuid(),
  number text not null unique,
  title text not null,
  author text not null,
  category_id uuid not null references public.categories (id) on update cascade on delete restrict,
  lyrics text not null,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  song_id uuid not null references public.songs (id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint favorites_user_song_unique unique (user_id, song_id)
);

create index if not exists idx_profiles_role on public.profiles (role);
create index if not exists idx_songs_category_id on public.songs (category_id);
create index if not exists idx_songs_number on public.songs (number);
create index if not exists idx_songs_title on public.songs using gin (to_tsvector('simple', title));
create index if not exists idx_songs_author on public.songs using gin (to_tsvector('simple', author));
create index if not exists idx_songs_lyrics on public.songs using gin (to_tsvector('simple', lyrics));
create index if not exists idx_favorites_user_id on public.favorites (user_id);
create index if not exists idx_favorites_song_id on public.favorites (song_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();

create trigger trg_categories_updated_at
before update on public.categories
for each row execute procedure public.set_updated_at();

create trigger trg_songs_updated_at
before update on public.songs
for each row execute procedure public.set_updated_at();

create or replace function public.current_user_role()
returns public.app_role
language sql
stable
security definer
set search_path = public
as $$
  select p.role
  from public.profiles p
  where p.id = auth.uid();
$$;

create or replace function public.has_min_role(required_role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  with me as (
    select public.current_user_role() as role
  )
  select case
    when (select role from me) is null then false
    when (select role from me) = 'super_admin' then true
    when required_role = 'super_admin' then false
    when (select role from me) = 'maitre_chant' and required_role in ('maitre_chant', 'discipline_admin', 'choriste') then true
    when (select role from me) = 'discipline_admin' and required_role in ('discipline_admin', 'choriste') then true
    when (select role from me) = 'choriste' and required_role = 'choriste' then true
    else false
  end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  meta_role public.app_role;
  meta_voice public.choir_voice;
begin
  select e into meta_role
  from unnest(enum_range(null::public.app_role)) e
  where e::text = coalesce(new.raw_user_meta_data ->> 'role', '')
  limit 1;

  select e into meta_voice
  from unnest(enum_range(null::public.choir_voice)) e
  where e::text = coalesce(new.raw_user_meta_data ->> 'choir_voice', '')
  limit 1;

  insert into public.profiles (id, email, full_name, role, choir_voice, phone)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    coalesce(meta_role, 'choriste'::public.app_role),
    coalesce(meta_voice, 'Soprano'::public.choir_voice),
    nullif(new.raw_user_meta_data ->> 'phone', '')
  )
  on conflict (id) do update
  set
    email = excluded.email,
    full_name = excluded.full_name,
    phone = excluded.phone;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace view public.songs_view as
select
  s.id,
  s.number,
  s.title,
  s.author,
  c.name as category,
  s.lyrics,
  s.created_at,
  s.updated_at,
  s.created_by
from public.songs s
join public.categories c on c.id = s.category_id;

grant usage on schema public to anon, authenticated;
grant select on public.categories, public.songs, public.songs_view to anon, authenticated;
grant select, insert, update, delete on public.profiles, public.categories, public.songs, public.favorites to authenticated;

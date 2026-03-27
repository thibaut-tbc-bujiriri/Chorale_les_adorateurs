-- 01_rls_policies.sql
-- Active RLS + politiques d'accès par rôle

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.songs enable row level security;
alter table public.favorites enable row level security;

drop policy if exists "profiles_select_own_or_super_admin" on public.profiles;
drop policy if exists "profiles_insert_self" on public.profiles;
drop policy if exists "profiles_update_own_or_super_admin" on public.profiles;
drop policy if exists "profiles_delete_super_admin" on public.profiles;
drop policy if exists "categories_public_read" on public.categories;
drop policy if exists "categories_manage_maitre_or_super_admin" on public.categories;
drop policy if exists "songs_public_read" on public.songs;
drop policy if exists "songs_manage_discipline_plus" on public.songs;
drop policy if exists "favorites_select_own_or_super_admin" on public.favorites;
drop policy if exists "favorites_insert_own" on public.favorites;
drop policy if exists "favorites_delete_own_or_super_admin" on public.favorites;

-- PROFILES
create policy "profiles_select_own_or_super_admin"
on public.profiles
for select
using (id = auth.uid() or public.has_min_role('super_admin'));

create policy "profiles_insert_self"
on public.profiles
for insert
with check (id = auth.uid() or public.has_min_role('super_admin'));

create policy "profiles_update_own_or_super_admin"
on public.profiles
for update
using (id = auth.uid() or public.has_min_role('super_admin'))
with check (id = auth.uid() or public.has_min_role('super_admin'));

create policy "profiles_delete_super_admin"
on public.profiles
for delete
using (public.has_min_role('super_admin'));

-- CATEGORIES
create policy "categories_public_read"
on public.categories
for select
using (true);

create policy "categories_manage_maitre_or_super_admin"
on public.categories
for all
to authenticated
using (public.has_min_role('maitre_chant'))
with check (public.has_min_role('maitre_chant'));

-- SONGS
create policy "songs_public_read"
on public.songs
for select
using (true);

create policy "songs_manage_discipline_plus"
on public.songs
for all
to authenticated
using (public.has_min_role('discipline_admin'))
with check (public.has_min_role('discipline_admin'));

-- FAVORITES
create policy "favorites_select_own_or_super_admin"
on public.favorites
for select
to authenticated
using (user_id = auth.uid() or public.has_min_role('super_admin'));

create policy "favorites_insert_own"
on public.favorites
for insert
to authenticated
with check (user_id = auth.uid());

create policy "favorites_delete_own_or_super_admin"
on public.favorites
for delete
to authenticated
using (user_id = auth.uid() or public.has_min_role('super_admin'));

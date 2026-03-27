-- 03_seed_roles_from_existing_users.sql
-- Optionnel: aligne les rôles selon les emails de démo déjà créés dans auth.users
-- Exécute ce script APRÈS que les comptes auth existent.

update public.profiles
set role = 'super_admin'
where email = 'president@chorale.local';

update public.profiles
set role = 'maitre_chant'
where email = 'maitre@chorale.local';

update public.profiles
set role = 'discipline_admin'
where email = 'discipline@chorale.local';

update public.profiles
set role = 'choriste'
where email in ('choriste@chorale.local', 'nathan@chorale.local');

-- Vérification rapide
select id, email, role, choir_voice from public.profiles order by email;

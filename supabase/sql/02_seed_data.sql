-- 02_seed_data.sql
-- Données initiales (catégories + chants)

insert into public.categories (name, description)
values
  ('Adoration', 'Chants de révérence et de contemplation'),
  ('Louange', 'Chants dynamiques de joie et célébration'),
  ('Action de grâce', 'Chants de remerciement et témoignage'),
  ('Prière', 'Moments de supplication et intercession')
on conflict (name) do update set
  description = excluded.description,
  updated_at = now();

with c as (
  select id, name from public.categories
)
insert into public.songs (number, title, author, category_id, lyrics)
values
  ('001', 'Saint, Saint, Saint', 'Reginald Heber', (select id from c where name = 'Adoration'), 'Saint, Saint, Saint est l''Éternel.' || E'\n' || 'Toute la terre proclame sa majesté.' || E'\n' || 'Nous élevons nos voix pour glorifier son nom.'),
  ('012', 'Nous Te Louons', 'Jean Mukendi', (select id from c where name = 'Louange'), 'Nous te louons Seigneur, Roi des siècles.' || E'\n' || 'Ta bonté demeure à jamais.' || E'\n' || 'Ton peuple chante avec reconnaissance.'),
  ('018', 'Merci pour Ta Grâce', 'Martha Nzambe', (select id from c where name = 'Action de grâce'), 'Merci pour ta grâce, merci pour ta paix.' || E'\n' || 'Tu relèves nos coeurs et tu renouvelles nos forces.' || E'\n' || 'Nous marchons par la foi dans ta lumière.'),
  ('027', 'Dans Le Secret', 'Samuel Kanku', (select id from c where name = 'Prière'), 'Dans le secret de ta présence, nous trouvons la paix.' || E'\n' || 'Entends nos prières, O Dieu fidèle.' || E'\n' || 'Guide ta chorale dans l''unité.'),
  ('033', 'Joie Dans La Maison', 'Nadine Kiala', (select id from c where name = 'Louange'), 'Il y a de la joie dans la maison du Seigneur.' || E'\n' || 'Nos mains s''élèvent, nos coeurs s''ouvrent.' || E'\n' || 'Nous célébrons son amour.'),
  ('041', 'Tu Es Digne', 'David Kalenga', (select id from c where name = 'Adoration'), 'Tu es digne de recevoir honneur et gloire.' || E'\n' || 'Nos voix s''unissent comme une seule offrande.' || E'\n' || 'Que ton nom soit élevé à jamais.'),
  ('052', 'Reconnaissance', 'Rachel Mbuyi', (select id from c where name = 'Action de grâce'), 'Nous venons avec reconnaissance.' || E'\n' || 'Tu as fait de grandes choses dans nos vies.' || E'\n' || 'Ta fidélité traverse les générations.'),
  ('067', 'Souffle de Vie', 'Patrick Ilunga', (select id from c where name = 'Prière'), 'Souffle de vie, viens ranimer ton peuple.' || E'\n' || 'Nous voulons marcher dans ta volonté.' || E'\n' || 'Fais de nous des témoins fidèles.')
on conflict (number) do update set
  title = excluded.title,
  author = excluded.author,
  category_id = excluded.category_id,
  lyrics = excluded.lyrics,
  updated_at = now();

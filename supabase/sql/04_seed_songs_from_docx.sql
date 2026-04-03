-- 04_seed_songs_from_docx.sql
-- Genere automatiquement depuis c:\Users\Thibaut\OneDrive\Desktop\LES ADORATEURS. OK OK.docx

insert into public.categories (name, description)
values ('Adoration', 'Chants importes depuis le recueil Word')
on conflict (name) do update set
  description = excluded.description,
  updated_at = now();

with c as (
  select id, name from public.categories
)
insert into public.songs (number, title, author, category_id, lyrics)
values
  ('001', 'DANS TON SACTUAIRE', 'Alain MOLOTO', (select id from c where name = 'Adoration'), 'Et dans ton sanctuaire, devant ta majesté,
Je vis le vrai bonheur dans ton intimité,
Ta sainteté comble mon cœur de la joie du ressuscité,
Seigneur, je te dis� :� «� Merci� ».
1. Et l� dans ta présente, j’exalte ta puissance,
Ta gloire est mon partage, toi le rocher des âges,
Mes faibles mots te sanctifient et mon esprit te magnifie,
Seigneur, je te dis� :� «� Merci� ».

2. Et si les mots me manquent, mon cœur ne peut se taire,
Mais si mon cœur se tait, alors mon silence t’odore.
Car tout dans ton glorieux décor annonce que tu agis encore,
Seigneur, je te dis� :� «� Merci� ».

3. Tout mon bonheur se passe l� devant ta face,
N’y pas meilleur endroit qu’� l’ombre de ta droite,
Qui me relève de mes faiblesses et qui me remplir d’allégresse.
Seigneur, je te dis� :� «� Merci� ».

4. Devant ton trône de gloire, j’ecrit ma petit histoire,
A l’encre de mes larmes, dans la joie de mon âme,
Tu me révèles ton plan seigneur, dans le conseil de ta grandeur,
Seigneur, je te dis� :� «� Merci� ».

5. Ton amour en moi déborde et nos deux esprits s’accordent,
Dans un élan de tendresse, je me réjouis sans cesse,
Je viens savourer l’amour que mon cœur contient pour toujours et partout,
Seigneur, je te dis� :� «� Merci� ».
Ⓒ 2001 Gael Music'),
  ('002', '2. DANS TES PORTES', 'Alain MOLOTO', (select id from c where name = 'Adoration'), '1. Entre les colonnes j’avance dans tes parvis,
Le refrain du cœur céleste me ravit charge
De louange au milieu des anges devant l’ancien
Des âges, dans les couloirs de la gloire, je m’engage.

2. Rien n’est aussi merveilleux que t’approcher,
Et m’abreuve au milieu de tes rochers,
Je viens m’accrocher loin de tout péché devant
La manne cachée où le torrent de vie ne peut sécher.

3. Je voudrais célébrer ta magnificence,
Et venir combler mon cœur dans ta présence,
Ô� ! C’est plus qu’un rêve que tu réserves � tous ceux
Qui te servent, je viens Seigneur puiser dans ta réserve.

4. Qui, je sens couler la vie dans tes parvis,
Et mon âme ne peut que dire� :(«� Je suis servis� »),
Je viens t’adore, dans ce lieu doré, je vieux mes restaurer,
Te dire un mot est un bonheur pour moi.

5. La rosée de ta présence me rassure,
Et ton amour mes libère de mes blessures.
Je me sens renaitre, et tout mon être voudrait reconnaître
Et toi Seigneur Jésus, le divin maître.

6. Dans le parvis du Dieu vivant brille le soleil levant,
Qui nous remplit de joie devant
Les merveilles du tout puissant,
Je sens couler la gloire, je vois tomber tous mes déboires,
Je sens renaître mes espoirs, je me réponds de devant mon
Je suis au cœur de ma victoire.
Ⓒ 2001 Gael Music'),
  ('003', '3. DANS SES PORTES', 'franc MULAJA', (select id from c where name = 'Adoration'), '1. Venez chantons pour le Roi des rois,
Acclamons-le, notre Sauveur
Entrons dans ses portes avec des cris de joie
Des danses au Roi des rois.

2. Le Sauveur de l’umanité, le Roi qui mérite nos louanges,
Unis dans la fraternité, nous venons lui rendre hommage.
Coda� : adorons l’Eternel, adorons l’Eternel,
Ⓒ 2001 Gael Music'),
  ('004', 'SANS PAREIL', 'Alain MOLOTO', (select id from c where name = 'Adoration'), 'Jésus, le gardien de mon âme,
C’est lui le seul Dieu qui me calme,
Il chasse le lien qui me réclame,
Il me soutient, essuie mes larmes,
Je fais mon plein avec sa flamme.

Il est la source de mes grâces,
Je me ressource sur ces pas,
Jésus secourt ceux de sa race
Qui accourent devant sa face,
Car son recours est efficace.

Alors � qui pourrais-je te comparer,
Le prince de vie, Jésus et sans pareil,
Personne et rien ne peut nous séparer de lui,
Jésus-Christ est sans pareil.

Le seul ami qui me comprend,
Surtout quand l’ennemi me surprend,
Le seul qui peut me dire� :� «� Je t’aime� »,
Quand près de moi on crie� :� «� Blasphème� »
Sa parole me rend ferme.
Quant devant l’epruve je succombe,
Pendant que les preuves creusent la tombe,
Jésus me tend ses mains d’amour,
Il me dit� : «� Prends le vrai secours� ».
Sans pareil dans son apport.

Jésus la merveille que j’adore,
Lui ne sommeille ni ne dort,
Il ensoleille tout mon décor,
Et me réveille quand je m’endors,
Sans pareil � son apport.'),
  ('005', 'BENI SOIT LE PAS', 'Exo', (select id from c where name = 'Adoration'), 'Béni soit le pas de ceux aui parlent
De celui qui les a sauvés.

Il est le Roi des rois (écho)
Le seigneur de seigneurs (écho)
Il n’est pas d’autre nom sur terre et dans les cieux
Que le nom de Jésus, fils de Dieu,
Jésus, fils de Dieu.
Ⓒ 2000 Christensen/Thierry Ostrini.'),
  ('006', 'AU DESSUS DE TOUT', 'fa L.Le BLANC & Paul BALOCHE (above All)', (select id from c where name = 'Adoration'), 'Au-dessus des puissances, au dessus des rois,
Au-dessus de la nature et des choses créées,
Au-dessus de la sagesse et toutes les voies de l’homme,
Tu fus l� avant que le monde soit.

Au-dessus des royaumes, au-dessus des trônes,
Au-dessus de toute merveille connue par les hommes,
Au-dessus des richesses et les trésors de la terre.
Qui peut mesurer la dignité� ?

Crucifié, abandonné de tous,
Ne pou mourir, rejeté et tout seul,
Comme un rosé écrasé sous le pied
Tu pris ma honte, tu pensais � moi, par-dessus tout
Ⓒ 1999 Integrity’s Hosannal Music.'),
  ('007', 'SOUFFLE, ESPRIT DE DIEU', 'fa Frank MULAJA.', (select id from c where name = 'Adoration'), 'Comme un torrent d’eau qui déborde ses rivages,
Souffle, Esprit de Dieu
Comme une force nouvelle qui nous conduit d’âge en âge,
Souffle, Esprit de Dieu
Sur cette assemblée réunie en prière,
Souffle, Esprit de Dieu
Répand ton onction et répands ta lumière,
Souffle, Esprit de Dieu

Saint Esprit consolateur, Saint-Esprit, révélateur,
Comme une nouvelle vague qui nous conduit vers le ciel,
Souffle, Esprit de Dieu.

Le Saint-Esprit, esprit de feu, de clarté,
Souffle, Esprit de Dieu.
Nous voulons marcher dans la victoire et sans crainte,
Souffle, Esprit de Dieu,
Sur un chemin de vérité, de sainteté,
Souffle, Esprit de Dieu
Conduit-nous, ô Père, l� haut dans la cité sainte,
Souffle, Esprit de Dieu
Ⓒ GAEL (Groupe Adorons l’Eternel).'),
  ('008', 'EL SHADDAI, ADONAI', 'Ré Gael Music.', (select id from c where name = 'Adoration'), 'El shaddai, Adonai
Le Dieu tout-puissant, le Roi compatissant,
Lui que le ciel révèle, que la terre préfère,
Et tout l’un vers le vénère.
El shaddai, le Dieu sans faille,
Je lui dois ma délivrance, il est ma puissance,
Le Dieu de mes espoirs, il me fait voir,
Ses exploits, en lui, je crois.

Pont� : Je trouve une place devant sa face,
El shaddai trouve sa demeure, dans mon cœur
Laisse-moi-t’ecrire un chat d’amour,
Restons ensemble pour toujours.
Jésus, laisse-moi t’écrire un chant d’amour,
Restons ensemble pour toujours.

Il a mis fin règne de mes souffrances,
Ainsi qu’� mes errances.
Dans les mauvais jours et dans tous mes défis,
En lui, je me confie.
Et quand je crie� :� «� El Shaddai� », il me répond,
De lui ma vie dépend,
Je l’aime, je l’aime, je l’adore (3x)
Tu as mis fin au règne…
Je t’aime, je t’aime, je t’adore (3x)

Tu contrôles tout ce qui me frôle,
El shaddai, devant tes yeux, je suis précieux,
Car je vaux le prix de ton salut,
La vie de Jésus-Christ, mon seul abri.
Tu changes mes pleurs en cris de joie,
L’artisan de mon bonheur, l’auteur de ma gloire
Et l’ombre de ta main sur mon chemin
Vient rassurer mes lendemains.
Coda� : je t’aime, je t’aime, je t’adore (3x)
Je t’aime, Seigneur, je t’aime, je t’adore.
Ⓒ Gael Music


JEHEVAH EST SON NOM (fa) Mélodie Afrique de l’Ouest
Jéhovah est son nom, Jéhovah est son nom (2x)
Puissant guerrier pendant les combats, Jéhovah est son nom.

Jésus-Christ est son nom, (4x)
Ⓒ 1999Schekina.'),
  ('009', 'DIEU VA FAIRE DES MIRACLES', 'Fa Mélodie Ouest Afrique.', (select id from c where name = 'Adoration'), 'Dieu va faire encore (2x) Alléluia
Il guérit les malades, il ressuscite les morts,
Il est vivant pour toujours, il ne change pas,
Dieu va faire, des miracles, des miracles,
Dieu va faire encore.

Dis seulement un mot (2x) Alléluia
Tu soutiens toutes choses par ta parole puissante,
Aussi efficace qu’une épée � deux tranchants,
Dis seulement, Seigneur un mot, Seigneur un mot
Je serai béni.

EH, YAWE, UMAMA (sol) Mélodie Congolaise.
Eh Yawe, eh yawe, kumama, eh yawe. Eh
Yawe. Kumama
Tongo etane, butu eyinda, kumama
Nzambe mosusu akokani nayo,
Kumama na yo.

Babengaka yo eh, nkosi na Yuda eh,
Libanga na ntalo, mopesi na nionso,
Kumama na yo.

Oyo butani ngai, wapi nzambe na yo eh,
Asalaki lola asali mokili
Kumama yawe.
Coda Eh yawe (Kumama) Eh yawe (Kumama)
Nzambe na nguya, Nzambe nelonga……'),
  ('010', 'CAR TA BONTE', 'PSAUME 63:4-5 (Mi) Hugh', (select id from c where name = 'Adoration'), 'MITCHEL (Thy loving kidness)
Car ta bonté vaut mieux que la vie (2x)
Mes lèvres célèbrent tes louanges
Car ta bonté vaut mieux que la Vie,

J’élèverai mes mains en ton nom
Mes lèvres célèbrent tes louanges.
Car la bonté vaut mieux que la vie
Ⓒ 1962 Singspiration

I WILL SING
Lord you sem so far away a million miles are more it feels to day
And thought I haven’t lost my faith I must, confers right now that it’s
Hard for me to pray
But I don’t know what to say
And I don’t know where to start
But as you give the grace
With all that’s my heart.
Be cause your ward is true.
I will sing
“Lord is hard for me to see
All the thoughts and plans you have for me
But I will put my trust in you knowing that you died to set me free
But I don’t know what to start
But as you give the grace
I will sing. I will praise
Even in my darkest time thought the sorrow and the pain
I will sing. I will praise lift my hands
To honor you because you ward is true I will (2times)'),
  ('011', 'ARISE', 'DON MOEN', (select id from c where name = 'Adoration'), 'One thing we as of you
One thing that we desire
And as we worship you
God comes and changes our live

Arise! Arise! Arise! Arise!
Arise!
Take your place
Be enthroned on our praise
Arise!
King of king, holy God
Has we sing Arise.

NOUS DESIRONS SEIGNEUR
Nous desirons Seigneur
Une seule chose aujourd’hui
Alors que nous chatons
Viens transformer nos vies
Elève-toi� ! Elève-toi� ! Elève-toi� !
Elève-toi� !
Oui viens dans ta gloire
Couronner nos louanges
Oui, viens
Roi de rois
Dieu très saint
Tout puissant
Oui viens.'),
  ('012', 'LA VOIX DU SEIGNEUR M’APPELLE', 'Fa', (select id from c where name = 'Adoration'), 'La voix du Seigneur m’appelle
«� Prends ta croix et viens, suis-moi� !� »
Je réponds sauveur fidèle, me voici, je suis � toi

Jusqu’au bout je veux te suivre
Dans les bons et les mauvais jours
A toi pour mourir et vivre, � toi Jésus pour toujours

Mais le chemin du Calvaire est étroit et périlleux,
C’est un chemin solitaire difficile et rocailleux.

S’il faut quitter ceux que j’aime, savoir être mal jugé
Endurer l’injure même, du monde être méprise

Plus je perds ma propre vie plus je reçois de tes biens
De ta richesse infinie, toi, Jésus tu m’appartiens.

Tu me donnes grâce et gloire pour te suivre pas � pas
Avec toi, bonheur, victoire, joie et paix dès ici-bas.'),
  ('013', 'GUERIS MOI, O DIEU', 'jer.17� : 14 (Mib)', (select id from c where name = 'Adoration'), 'MOEN (heal me, O lord)
Guéris moi, Ô Dieu je serai guéri,
Sauve-moi et je serai sauvé
Guéris moi, ô Dieu je serai guéri,
Ca tu es celui que je sers
Tu es celui que j’adore.
Ⓒ1995 Intergrity’is Hosanna� ! Music
LIGHT OF THE WORD
Light of the ward you stepped down into darkness
Open my eyes let me see
Beauty that made! This heart adore
You hape of a life! Spend with you
King of all days. So highly exalted.
Glories in heaven above
Humbly you came to the earth
You give greeted
All for love sake became poor.

CHORUS: Here I am to warship
Here I am to bow down
Here I am to say that you’re my lord
All tongother lovely
All togother worthy
All togother wonderful for me
Bridge: I’ll never know haw much il cost to see my sins up on that cross.'),
  ('014', 'QUAND LA BIBLE ICI BAS', 'fa Inconnu', (select id from c where name = 'Adoration'), '(Trust and obey)

Quand la Bible ici bas illumine nos pas
De sa gloire, Dieu vient nous remplir
Quand je veux ce qu’il veux, en son nom, je le peux
Simplement, il faut croire, obéir
CHORUS� : Croire et obéir, pour que Dieu puisse ouvrir
Les écluses célestes, il faut croire et obéir.

Veux-tu la liberté, le bonheur, la santé� ?
Que ton seul but soit de le servir� ?
Car l’Esprit est donné avec la joie, la paix
Qu’� celui qui veut croire, obéir.

Les fardeaux, les labeurs, les chagrins et les pleurs,
A mon bien, Dieu les concourir
Ils deviendront, au ciel, des trésors éternels
Simplement, il faut croire et obéir.

Nous pouvons dépasser nos incapacités
Aux desseins éternels nous ouvrir
De nouveaux horizons, une vaste moisson
Simplement, il faut croire, obéir.

A ses ordres soumis sans aucun compromis
Alors le tout puissant peut agir
Il nous ouvre les flots, fait tomber Jéricho
Simplement, il faut croire, obéir.'),
  ('015', 'SUR CES EPOUX, PERE', 'mi BERSIER', (select id from c where name = 'Adoration'), 'Sur ces époux, Père Eternel
Jette en cet instant solennel, un regard favorable
Protège-les dans ta bonté
Fais briller sur eux ta bonté
Qu’en toi, grand Roi, leur prière trouve un Père Doux et tendre
Toujours prêt � les entendre� !

Ils ont imploré ton saint nom
Comble, Seigneur, leur union de ta faveur céleste,
Sur leur maison verse ta paix
Que ta grâce, en mille bienfaits, sur eux se manifeste� !
Amen� ! Amen� ! Sois leur égide, sanctifie
Chacun des jours de leur vie.'),
  ('016', 'CAMBATTONS LE BON COMBAT', 'SOL', (select id from c where name = 'Adoration'), '(Cantique spirituelle)
Combattons le bon combat en gardant bien notre foi
Et une bonne conscience que quelques uns ont perdue.

Chorus� : celui qui vaincra sera vêtu de blanc, son nom restera dans le temple du Seigneur et nous n’en sortirons plus.

Si nous sommes vainqueurs, nous colonne dans le temple du Seigneur et nous n’en sortirons plus.'),
  ('017', 'DIEU M’OUVRE UN CHEMIN', 'fa Don', (select id from c where name = 'Adoration'), 'MOEN (God will make a wan)
Dieu m’ouvre un chemin même l� où il n’y en a point
Toutes ses voies sont insondables� ;
Oui, Dieu l’ouvrira pour moi.
Il sera mon guide, me gardant tout prés de lui
Avec un amour renouvelé
Oui, Dieu m’ouvrira un chemin pour moi
Par un sentir dans le désert il me guidera
Et j’y trouverai des fleuves en tout temps
Ce monde passera, mais sa parole demeura
Il renouvelle sa grâce sur moi.'),
  ('018', 'EN MON CŒUR, J’AI CHOISI', 'Mi sadou', (select id from c where name = 'Adoration'), 'Sudar SING (I have decided to follw Jesus)
En mon Cœur, j’ai choisi de suivre Jésus-Christ
En mon cour, j’ai choisi de suivre Jésus
En mon cœur, j’ai choisi de suivre Jésus-Christ
Oui pour toujours oui pour toujours

Si mes amis s’en vont, qu’importe, moi j’irai
Si mes amis s’en vont qu’importe, j’irai
Si mes amis s’en vont, qu’importe, moi j’irai
Oui pour toujours oui pour toujours

Au monde je dis� : Non� ! Joyeux, je prends ma croix
Au monde je dit� : Non� ! J’accepte la croix
Au monde je dit� : Non� ! Joyeux, je prends ma croix
Oui pour toujours oui pour toujours'),
  ('019', 'TOUT UNIS DANS L’ESPRIT', 'P SHOLTES', (select id from c where name = 'Adoration'), 'Tous unis dans l’Esprit, tous unis en Jésus (bis)
Nous prions que bientôt ce qui divise ne soit plus.

Chorus� : Et le monde saura que nous sommes chrétiens,
Par l’amour dont nos actes sont empreints.

D’un seul cœur, nous voulons travailler pour Jésus (bis)
Proclamer � tout homme, qu’il nous offre le salut.

Nous marchons côte a côte et la main dans la main (bis)
A la table du Roi, nous partageons le même pain.

Gloire au Dieu, createur de la terre et des cieux (bis)
Gloire au fils Eternel, Rédempteur glorieux� !
Gloire, gloire � l’Esprit qui verse en l’Amour de Dieu.'),
  ('020', 'NOUS VOISI', 'Mi steve HAMPTION', (select id from c where name = 'Adoration'), '(Famoly song)
Nous voici rassemblées devant toi comme une famille,
Tous unis, nous élevons nos voix vers le Roi des rois.
Crions� : Abba� ! Père� ! Digne est ton saint nom
Abba! Père! Digne est ton saint nom'),
  ('021', 'TU ES GRAND, TU ES GLORIEUX', 'sol', (select id from c where name = 'Adoration'), '(How grat, haw glorieux)
Tu es grand, tu es glorieux
Et tes voies sont merveilleuses
Tu règnes victorieux, élevé dans nos louanges
Tu sièges au milieu des louanges de ton peuple,
Dieu avec nous, tu t’appelles Emmanuel
Dieu, notre force et notre refuge
Tu es toujours l� quand nous sommes en détresse.

Tu es grand, tu es glorieux
Et règne victorieux, élevé dans nos louanges
Tu es grand et digne d’être loué (3x)'),
  ('022', 'TU ES LA AU CŒUR DES NOS VIES', 'sol', (select id from c where name = 'Adoration'), 'Tu es l� au cœur de nos vies et c’est toi qui nous fais vivre
Tu es l� au cœur de nos vies, bien vivant, ô Jésus Christ.

Dans les secrets de nos tendresses� : tu es l�
Dans les matins de nos promesses� : tu es l�

Dans nos cœurs tout remplis d’orage� : Tu es l�
Dans tout le ciel de nos voyages� : tu es l�

En plein milieu de nos tempêtes� : tu es l�
Dans la Musique de nos fêtes� : tu es l� .'),
  ('023', 'INNONDE MON CŒUR', 'SOL', (select id from c where name = 'Adoration'), 'Inonde mon Cœur, inonde mon Cœur
Esprit Saint, inonde mon cœur
Et toi j’ai trouve la paix, le bonheur
Esprit saint inonde mon cœur.

METS DANS MON CŒUR
Mets dans mon cœur, Seigneur, quelque chose de nouveau
Mets dans mon cœur, seigneur, un renouveau.
Je t’ouvre grand mon cœur, je ne veux rien cacher
Cédant ma volonté � la tienne � jamais

Je dépose � tes pieds chacun de mes projets
Et que toute ma vie soit soumise � l’Esprit

Je veux dès maintenant, avoir un cœur d’enfant.
Et ma chair � chaque heure comme tu veux, Seigneur.'),
  ('024', 'QUE TA GLOIRE VIENNE', 'SOL DON MOEN (let your Glory fall)', (select id from c where name = 'Adoration'), 'Que ta gloire vienne, nos cœurs te désirent
Vers toi, nous crions� «� Remplis-nous)
Que ta gloire vienne, que ta gloire vienne
Que ta gloire vienne� !

Toutes les nations autour de ton trône
Viennent � l’unisson� : «� Saint Seigneur� »
Toutes les nations, toutes les nations
Toutes les nations� !

Gloire � l’Agneau, l’Agneau sur le trône
Tous les saints proclament� : «� Jésus règne� »
«� Jésus règne, Jésus règnes, Jésus règne� »
Gloire � l’Agneau (3x)'),
  ('025', 'REGNE EN MOI', 'SOL CHRISTEN & OSTRINI (LIBRES DE NOS CHAINES)', (select id from c where name = 'Adoration'), 'Libres de nos chaînes, nous marchons vers toi
Ta main souveraine affermit nos pas
Armée de lumière couronnée d’éclat
Soyons sur terre, messagers de joie
Chorus� : Allélua� ! Que ton règne vienne
Maranatha� ! Viens, Jésus règnes en moi.
Proclamons sa grâce, au creux de la nuit
Recherchons sa face au cœur de sa vie
Célébrons sa gloire, bannissons la peur
Chantons sa victoire, Jésus est vainqueur� !'),
  ('026', 'CELEBREZ', 'fa CHRISTEN SEN & SENS & OSTRINI', (select id from c where name = 'Adoration'), 'Célébrez sa victoire et la joie de son règne
Célébrez, célébrez� !
Célébrez dans l’espoir que sa gloire nous revienne
Célébrez, célébrez� !
Célébrez, yeah, célébrez, yeah, célébrez, yeah,
Célébrez, célébrez Jésus� !

Célébrez son Esprit, exaltez sa présence
Célébrez, célébrez
Célébrez aujourd’hui notre sainte espérance,
Célébrez, célébrez
Tant que tout en moi chant
Et loue son saint nom (je vivrai)'),
  ('027', 'CHANTER', 'Do CHRISTEN SEN &OSTRINI', (select id from c where name = 'Adoration'), 'Chantez ce que Dieu a fait
Chantez la beauté de sa grâce
Dansez, écoutez son cœur
Son amour est la source de vie
Chantez ce que Dieu a fait
Chantez, honorez sa présence
Dansez, écoutez son cœur
Le seigneur est la source de vie (2x)

Saint, saint, saint, est le Seigneur
Son armée remplit les cieux
Tous les anges, � l’unisson
Louent sa gloire et son saint nom� !

Son esprit répand sur nous
Les torrents de ses bontés
L’univers � son éclat
Retentit en cris de joie'),
  ('028', 'DE MON SEIGNEUR', 'fa Thierry OSTRINI', (select id from c where name = 'Adoration'), 'De mon Seigneur, j’aurai la grâce
De marcher encore sur le même chemin
De mon Seigneur, j’aurai la force
De cherche encore ce vaste dessein.

De mon Jésus, j’aurai l’amour la nuit
Le jour et jusqu’au bout du matin
De mon Jésus, j’aurai toujours
Le doux secours de sa tendre main'),
  ('029', 'DIEU EST LA SOURCE DE MA JOIE', 'fa CHRISTEN SEN & OSTRINI', (select id from c where name = 'Adoration'), 'Dieu est la source de ma joie (4x)
Je chanterai en tout temps sa bonté
Je chanterai en tout temps sa sainteté
Je chanterai en tout temps sa bonté
Je chanterai en tout sa majesté

Je chanterai ses bienfaits � jamais
Sa bienveillance et sa paix � tout jamais
Je chanterai ses bienfaits � jamais
Sa bienveillance et sa paix � tout jamais

Dieu est la (3x) source de ma joie (2x)'),
  ('030', 'HOSANNA', 'OUVRONS LES PORTES (fa) CHRISTEN SEN &OSTRINI', (select id from c where name = 'Adoration'), '(Hosanna opens the gates)
Hosanna, hosanna (4x)
Ouvrons les portes au Roi, au Dieu de gloire
Lançons des cris de joie
Laissons jaillir un chant de victoire
Hosanna� !hosanna! Hosanna!

Marchons ensemble (écho) ennemi tremble (écho)
Dieu est avec nous (écho) chassons les ténèbres� !

Qui pourra taire (écho) Notre prière (écho)
Dieu est avec nous (écho) levons sa bannière� !(écho)
Dansons devant lui (écho) remplis de sa vie
Dieu est avec nous (écho) chantons sa louange� ! (écho)'),
  ('031', 'JE JUBILE ET JE RIS', 'Mi CHRISTEN SEN & OSTRINI', (select id from c where name = 'Adoration'), 'Je jubile et je ris quand sa parole est prise en moi
Je jubile et je ris quand quand j’y pense
Je jubile et je ris quand tout s’allume autour de moi
Dans les vagues et le vent de sa joie
Je jubile et je ris quand son armée danse avec moi
Je jubile et je ris quand j’y pense
Je jubile et je ris quand tout s’anime autour de moi
Dans les vagues et le vent de sa joie

Et même si les gens se moquent de moi quand
Mon cœur et ma vie se valancent
Se balancent au gré de sa toute puissance
Au cœur de l’enfance je suis

Et même si d’autres se font les apôtres
Du règne de l’ordre établi
Mon règne est tout autre, je danse et je saute
Au nom du Seigneur de la vie.

MERCI (fa) henry SMITH (Give Thanks)
Merci d’un Coeur reconnaissant
Merci au seigneur, trios fois, saint
Merci car il nous a donné Jésus-Christ, son fils
Maintenant, le faible dit� :� «� Je suis fort� »
Le pauvre dit «� je suis riche� »
Dieu a fait de grandes choses pour nous
Merci� !'),
  ('032', 'JE VEUX N’ETTRE QU’A TOI', 'CHRISTEN SEN &OSTRINI', (select id from c where name = 'Adoration'), 'Reçois de moi le parfum qui t’es du
La bonté de ton nom est mon âme éperdue
Je veux n’être qu’� toi, Jésus je t’aime
Reçois du peu que je trouve � donner,
Tout l’amour que mes yeux n’ont pas su te montrer,
Je veux n’être qu’� toi, Jésus je t’aime.

Rien n’est plus bon que ton nom,
Rien n’est plus saint que le sang du pardon
Je veux n’être qu’� toi, Jésus, mon Roi

Je ne veux rien que vouloir te louer,
Adorer ton saint nom et ta fidélité
Je veux n’être qu’� toi Jésus, je t’aime
Je veux porter et laver � ta croix
Les pensées de mon cœur dans le cœur de tes voies,
Je veux n’être qu’au toi, Jésus je t’aime.'),
  ('033', 'EMMANUEL', 'sib CHRISTEN SEN & OSTRINI', (select id from c where name = 'Adoration'), 'Reçois l’adoration, tu es le Roi de gloire
Notre victoire, digne es-tu seigneur
Emmanuel� !
Dieu de lumière, élevé dans les cieux
Rempli de grâce et de paix
Environné de louange et de paix
Gardien de l’Eternité
Pourquoi quitter ce palais de bonheur,
Pour un sentir de misère
Par quel amour les chemins de ton cœur
Ont su trouver nos prières.

De cette foi que ton Cœur a montrée,
Je veux puiser mon secours
Sur le chemin que ta vie a tracé
Je marcherai chaque jour
Garde mes yeux des attraits de ce monde
Garde-moi près de ta croix.
En ce lieu saint où mon âme est féconde
D’humilité et de joie.
Coda� : Emmanuel (4x)'),
  ('034', 'JE VEUX DEMEURER', 'fi DON MOEN', (select id from c where name = 'Adoration'), '( I want to be where…)

Je veux demeure où tu es,
Rester toujours dans ta présence
Je ne veux pas t’adorer de loin
Conduit-moi plus près de toi.

Je veux demeure près de toi
Rester dans ta présence,
Manger � ta table, environné de ta gloire
Dans ta présence, rester toujours plus près de toi
Toujours près de toi, toujours près de toi
Mon Dieu

Je veux demeurer où tu es,
Pour toujours en présence
Emmène-moi l� où tu es,
Conduis-moi plus près de toi

Pont� : Oh mon Dieu, tu es ma force et mon chant
Et quand je suis dans ta présence
Quoique faible, je deviens fort.
Coda� : Toujours près de toi,
Toujours près de toi, mon Dieu.'),
  ('035', 'TU ES MERVEILLEUX', 'Mib H.L VAUCHER', (select id from c where name = 'Adoration'), 'Chorus� : Tu es merveilleux� ; Seigneur, tu es merveilleux� !
Je ne veux que toi, Seigneur, tu es merveilleux
Ton feu brûle dans mon âme, tu es merveilleux
Ton Esprit en moi proclame, tu es merveilleux� !(chorus)

A tout instant tu es mien, tu es merveilleux
Et ta parole est mon pain, tu es merveilleux� ! ( Chorus)

Ta gloire me rassasie, tu es merveilleux
Dans tes desseins j’ai la vie, tu es merveilleux� ! ( Chorus)

Sur ton trône dans le ciel, tu es merveilleux� !
Ton conseil est éternel, tu es merveilleux� ! ( Chorus)

Ton peuple éblouis s’incline, tu es merveilleux� !
Dans ta sainteté divine, tu es merveilleux� ! ( Chorus)'),
  ('036', 'IL EST LE MEME', 'sol', (select id from c where name = 'Adoration'), 'Il est le même, il est le même hier aujourd’hui
Il est même éternellement
Jésus-Christ, il est le même
Il est le même éternellement.'),
  ('037', 'IL M’A SAUVE, IL M’A SAUVE', 'sol', (select id from c where name = 'Adoration'), 'Il m’a sauvé, il m’a sauvé,� Béni soit son nom
Mon sauveur, soit loué � perpétuité.

Dans son amour, dans son amour, il m’a racheté (3x)
Mon sauveur, soit loué � perpétuité

Je le suivrai, je le suivrai, je le suivrai toujours avec joie (3x)
Mon sauveur, soit loué � perpétuité

Alléluia, Alléluia, Béni soit son nom (3x)
Mon sauveur, soit loué a perpétuité'),
  ('038', 'J’AI L’ASSURANCE', 'ré J.F CROSBY', (select id from c where name = 'Adoration'), 'J’ai l’assurance de mon salut
Par la présence du Seigneur Jésus
Son sang du péché ma racheté
Son sait-esprit ma régénéré

C’est mon histoire, c’est l� mon chant
Louer mon Sauveur le jour durant
C’est mon histoire, c’est l� mon chant
Louer mon sauveur � chaque instant

Parfait repos et parfait bonheur
En toi mon sauveur, j’ai la paix du cœur
Je veille en attendant ton retour
Je suis comblé, sûr de ton amour.'),
  ('039', 'JESUS M’A LIBERE', 'sol (MELODIE AFRICAINE)', (select id from c where name = 'Adoration'), 'Jésus m’a libéré, Alléluia� !
Je suis dans la joie, Alléluia� !

Jésus m’a pardonné, Alléluia� !
Je suis dans la joie, Alléluia� !

Chantez, chantez pour lui
Il est Roi des rois
Et Seigneur des Seigneur
(Dansez, sautez, criez, …)'),
  ('040', 'JESUS REVIENT', 'sol', (select id from c where name = 'Adoration'), 'Jésus revient, Alléluia (2x)
Seras-tu prêt quand il viendra� ?
Alléluia� ! Alléluia� !

Seras-tu prêt quand il viendra� ? (2x)
Si tu es prêt, il te prendra
Alléluia� ! Alléluia� !
Si tu es prêt, il te prendra (2x)
Et avec lui tu règneras
Alléluia� ! Alléluia� !

Et avec lui tu règneras (2x)
Et � ses pieds tu te tiendras
Alléluia� ! Alléluia� !

Et � ses pieds tu te tiendras (2x)
En lui tu te réjouiras
Alléluia� ! Alléluia� !

En lui tu te réjouiras (2x)
En entonnant� : Alléluia�
Alléluia� ! Alléluia� !'),
  ('041', 'L’AFRIQUE SERA SAUVE', 'la', (select id from c where name = 'Adoration'), 'Si vous croyez et que je crois,
Et qu’ensemble nous prions
Nous verrons descendre l’Esprit
Et l’Afrique sera sauvée.

Et l’Afrique sera sauvée (2x)
Oui, le Saint-Esprit descendra
Et l’Afrique sera sauvée

Dieu qui nous aime, nous donna
Le salut par Jésus.
Acceptons Christ de tout notre cœur
Et l’Afrique sera sauvée.

Jésus qui m’aime, t’aime aussi,
N’en doute pas mon frère
Accepte-le et rend témoignage
Et l’Afrique sera sauvée.'),
  ('042', 'IL N’Y A QUE TOI, SEIGNEUR', 'fa', (select id from c where name = 'Adoration'), 'Il n’y a que toi, Seigneur, il n’ya que toi (2x)
Ni wewe tu Bwana, ni Wewe tu (2x) (Swahili)
Bobele yo , Yawe, Bobole yo (2x) (Lingala)'),
  ('043', 'TON MON EST SI MERVEILLEUX', 'fa', (select id from c where name = 'Adoration'), 'Ton nom est si merveilleux, Jésus (2x)
Ton nom est si merveilleux (2x)
Ton nom est si merveilleux, Jésus.

Ton nom me donne le salut, Jesus (2x)
Ton nom me donne la vie, Jésus (2x)
Nkombo na yo elonga, Yesu
Nkombo nayo elonga(2x)
Nkombo na elonga, Yesu
Nkombo ne elikya, Yesu (2x)'),
  ('044', 'HAKUNA MUNGU KAMA WEWE', 'sol', (select id from c where name = 'Adoration'), 'Akuna Mungu kama wewe(3x)
Ewe Mungu wetu

Wewe ni Alpha na Omega (3x)
Ewe Mungu wetu

Y’ozali Nzambe ne Elonga (3x)
Yonde Nzambe na ngai

Moko te aokani nayo (3x)
Yonde� Nzambe na ngai

Na pesi matondi(3x)
Nayo nzambe na ngai.'),
  ('045', 'NDIYE MWAMBA NI SALAMA', 'SOL', (select id from c where name = 'Adoration'), 'Ndiye mwamba ni salama (4x)
Ndiye Mungu wa uwezo (4x)
ndiye Mungu wa ushindi (4x)
Kwake Yesu na shimama (4x)
Y’oza nzambe na bolingo (4x)
Nzambe na tutelaa tolo (4x)'),
  ('046', 'NZAMBE Y’OZALI NZAMBE', 'SOL', (select id from c where name = 'Adoration'), 'Nzambe y’ozali nzambe, nkolo na ngai solo
Nazali kokumbamela yo,
Molimo na ngai ezali na mposa nayo

Mpo ete, y’ozali Nzambe
Y’oleki likolo na nionso,
Nazali okumbamela Yo,
Lokumu, nkembo nayo.

Kiti na bokonzi na Yo, Nzambe,
Ewumela seko.
Y’okokamba mokili nayo, Nzambe
Mpo Y’oleki boyengebeni.'),
  ('047', 'IL N’Y A POINT UN DIEU COMME TOI', 'There’is no a god like you', (select id from c where name = 'Adoration'), 'Il n’ya point un Dieu comme toi (4x)
Akuna Mungu kama wewe (4x)
Moko te akoani nayo (4x)
Mosi ve mefuanana nange (4x)
Kakwena Munga amu wewa (4x)
There’s no a God like you (4)'),
  ('048', 'NKEMBO , HALELUYA, OZANA', 'Ré Mélodie Congolaise', (select id from c where name = 'Adoration'), 'Nkembo Haleluya, Ozana na Yawe (echo)
Nembo, Haleluya ozana na Papa
Totomboli maboko pona kokumisa Yawe.
Oh� ! oh� ! oh� !'),
  ('049', 'NZAMBE, Y’OZALI NZAMBE', 'SOL Mélodie Congolaise', (select id from c where name = 'Adoration'), 'Nzambe y’ozali Nzambe ya tango nionso
Nzambe y’ozali Nzambe ya Tango nionso

Nzambe y’ozali Nzambe ozali kosala
Nzambe y’ozali Nzambe osali bikamwa
Nzambe y’ozali Nzambe otonda bolingo.'),
  ('050', 'OZALI MBEKA', 'SOL Franc MULAJA', (select id from c where name = 'Adoration'), 'Ozali mbeka tobonzeli Nzambe
Ozali libonza oyo nzambe andima,
Bomoto nayo Yesu ekokisama,
Ozali mbeka ya libela.

Bolingo nayo Yesu esimba mokili
Na yo Yesu nde biso tozui bonsomi,
Oya motuya, ewutaka nse nayo
Ozali mbeka ya libela

Mwana na mpate olongolaka masumu
Nganga na Nzambe oyo yawzh andima
Makila na Yo epetolaka mitema
Ozali mbeka ya libela'),
  ('051', 'PAPA TELEMA OSALA', 'Ré Kool MATOPE', (select id from c where name = 'Adoration'), 'Papa telema osala
Bikamwa atina bomoyi na ngai
Lisungi, kimia mpe lobiko na ngai
Eoweta kaa epiyi nayo.

Papa kozela lisusu te,
Ngai awa makasi nionso esili
Ba mpasi mpe minioko eleie
Nandimi, Papa, Yo elonga na ngai .

Kondima na ngai, elikya na ngai,
Nionso epayi na yo.'),
  ('052', 'YAWE TOBELEMI', 'SOL Alain MOLOTO', (select id from c where name = 'Adoration'), 'Yawe tobelemi, pembeni na Yo eh,
Yamba masanjoli tobonjeli yo eh
Bomoyi topesa na Y o eh, mitema posa
Na yo eh, Eh Yawe kumama!

Nkolo obongi na lokumu, Yon de Mosantu,
Ozali Nkolo na nionso, Linbaga na talo.
Bomoyi topesa na yo eh, mitema posa
Na yo eh, Eh Yawe umama� !

Papa, telema na nkembo, kati na biso,
Yaka, mosungi na bato, tobelemi yo eh
Bomoyi topesa na Yo eh, mitema posa
Na Yo eh, Eh Yawe kumama!

Loboko nay o ya Nguya, eh Yawe
Esala kati na bison a Nkombo na Yesu
Babeli babika, bakangami bakanguama,
Eh Yawe, kumama!'),
  ('053', 'YESU, NKOMBO NA YO MOKANGOLI', 'SOL', (select id from c where name = 'Adoration'), '(Jésusn ton nom est si merveilleux)
Yesu, nkombo na YO mokangoli ,
Yesu, oyokaka mabondeli (na ngai)
Yesu, otombolaka mokueyi,
Nkombo na Yo eleki nionso.

Yaka, kota na motema na ngai
Yaka, vandal na motema na ngai,
Yesu, sala na motema na ngai
Nkombo nayo eleki nionso.'),
  ('054', 'YESU AZALI AWA', 'SOL', (select id from c where name = 'Adoration'), 'Yesu azali awa, Yesu azali awa, Yesu azali na biso(2x)
(Ya solo) haleluya ahah, Haleluya� !
Halaluya na Yesu (Yesu mwana Nzambe)
Haleluya ah ah Haleluya!
Haleluya na Yesu.

Yesu azali nzela, Yesu azali nzela mpe bomoyi(2x)
Biso tokosepela, Biso tokosepela, Biso tokosepela na Yesu, (2x)
Biso tokomona ye, Biso toomona Ye, Biso tokomona ye na lola (2x)
itisa nguya na Yo, Kitisa nguya na Yo, kitisa nguya nay o n’esik’oyo. (2x)

YESU NI WANGU (SOL) Mélodie Congolaise

Yesu ni wangu wa uzima wa milele (echo)
Yesu ni Bwana wa uzima wa milele (echo)
Anashinda shetani wa uzma wa milele(echo)
O wa uzima wa milele, wa milele eh wa milele
eh wa milele, eh wa milele.

SI TU VEUX LE LOUER (la) Christen Sen & Ostrini

Si tu veux le louer sache,
Qu’il faut que tu le fasses avec le cœur
Si tu veux le louer, lâche
Les pensées qui t’attachent te font peur
Si tu veux le louer, aime
Ton âme celle aussi de ton voisin
Si tu veux le louer, semer,
Le vent que tu récolteras demain.
Pas besoin diplôme, pas besoin latin,
Juste aimer son nom et son Esprit saint,
Et l’on devient fou, fou de ce Dieu l�
Ce bon Dieu d’amour, bon Dieu tout en moi.

Pas Besoin diplôme, pas besoin latin
Pas besoin cripsé, louer c’est facile.
Qui dit qu’on se saoul� ? Alors qu’on ne l’est pas,
Nous, on sait qu’en nous c’est Dieu qui fait ça.

Coda� : je veux te louer………W oh oh oh� ! (6x)

ATTIRE-MOI A TOI ( Kekky carpenter)
(Draw Me close to you)
Attire-moi � toi, ne me laisse pas
Je veux tout abandonner
Pour restaurer notre amitié

Tu es mon désire, je ne veux que toi
Car rien ne peut Te remplacer
Dans tes bras je suis rassuré
Montre-moi la voie qui me ramène � Toi.

Tu es tout pour moi sans toi je ne peu vivre x2
Garde-moi auprès de toi.'),
  ('055', 'J’ENTENDS TA DOUCE VOIX', 'Mib L. Hartsough.', (select id from c where name = 'Adoration'), 'J’entends ta douce voix, Jésus, je viens � toi
Je viens, ô Sauveur, lave-moi
Dans le sang de ta croix

Jésus, roi des rois qui mourus pour moi,
Je veux mourir avec toi, avec sur la croix.

J’entends ta douce voix, qui me dit� : crois en moi� !
Je crois, Seigneur, soutiens ma foi,
Tiens-moi près de ta croix� !

J’entends ta douce voix, elle pénètre en moi
Et me dit d’aimer comme toi
Toi, de l’amour de la croix� !

J’entends ta douce voix, Toi qui mourus pour moi,
Seigneur, que je m’unisse � toi
Ta mort par la foi.'),
  ('056', 'ET JE CHANTE', 'DON MOEN', (select id from c where name = 'Adoration'), '(I will sing)

Seigneur tu sembles être
A des milliers Kilomètres, aujourd’hui
Mais je n’ai pas perdu la foi,
Je dois le confesser prier n’est pas facile
Je ne sais comment le dire ni par où commencer
Tu m’as donné la grâce.
Chorus� : Et je chante, je te loue
Même malgré ma sombre nuit
Dans la peine et la souffrance
Et je chante, je te loue
Je lève mes mains pour l’honorer
Car ta parole est vraie.

C’est difficile pour moi de voir
Tout les projets que tu as pour moi
Mais je mets ma confiance en toi,
Car tu es mort pour me délivrer
Je sais comment le dire ni par où commencer
Tu m’as donné la grâce
C’est tout ce qu’il y a dans mon cœur……

DIEU TOUT- PUISSANT

Dieu tout-puissant, quand mon cœur considère
Tout l’univers crée par ton pouvoir
Le ciel d’Azur, les éclaires, le tonnerre,
Le clair matin où les ombres du soir.
De tout mon être, alors s’élève un chant
«� Dieu tout-puissant, que tu es grand� !� »

Quand par les bois ou la forêt profonde
J’erre et j’entends tous les oiseaux chanter
Quand sur les monts, la source avec son onde
Livre au zéphyr son chant doux et léger
Mon cœur heureux, s’écrie � chaque instant
«� O Dieu d’amour, que tu es grand� !

Mais quand je songe, ô sublime mystère,
Qu’un Dieu si grand a pu penser � moi,
Que son cher Fils est devenu mon frère
Et que je suis l’héritier du grand Roi
Alors mon cœur redit la nuit le jour� :
Que tu es bon, ô Dieu d’amour� !

Quand le Seigneur éclatant de lumière,
Se lèvera de son trône éternel,
Et que laissant les douleurs de la terre
Je pourrais voir les splendeurs de son ciel
Je redirai dans son divin séjour� :
Rien n’est plus grand que ton amour.'),
  ('057', 'ENTRE TES MAINS', 'MIB W.S. WEEDEN (I Surrender All)', (select id from c where name = 'Adoration'), 'Entre tes mains j’abandonne tout ce que j’appelle mien
Oh� ! ne permets � permets � personne, Seigneur d’en reprendre rien� !
Oui, prends tout, Seigneur� ! (2x)
Entre tes mains j’abandonne tout ave bonheur.

Je n’ai pas peur de te suivre sur le chemin de la croix.
C’est pour toi que je veux vivre, je connais j’aime ta voix.
Oui, prend tout, Seigneur� ! (2x)
Entre tes mains, j’abandonne tout avec bonheur.

Tu connais mieux que moi-même tous les besoins de mon cœur� ;
Et, pour mon bonheur suprême, tu veux me rendre vainqueur.
Oui, prend tout, Seigneur� ! (2x)
Entre tes mains j’abandonne tout avec bonheur.

Prends mon corps et prends mon âme, que tout en moi soit � Toi
Que par ta divine flamme, tout mal soit détruit en moi� !
Oui, prends tout, Seigneur� !(2x)
Entre tes mains, j’abandonne tout avec bonheur.

A TOI LA GLOIRE (Thine il the Glory).

A toi la gloire, ô Ressuscité� !
A toi la victoire pour l’Eternité.
Brillant de lumière, l’ange est descendu
Il roule la pierre de tombeau vaincu.

A toi la gloire, ô ressuscité� !
A to la victoire pour l’éternité� !

Vois-le paraître� ! c’est lui, c’est jésus,
Ton sauveur, ton maitre, oh� ! ne doute plus� !
Sois dans l’allégresse peuple du Seigneur,
En redis sans cesse que christ est vainqueur.

Craindrais-je encore� ? il vit � jamais,
Celui que j’adore, le prince de paix
Il est ma victoire, mon puissant soutien
Ma vie et ma gloire� ; non, je ne crains rien!'),
  ('058', 'J’AI SOF DE TA PRESENCE', 'LAB R.LORRY (I need the Every hour)', (select id from c where name = 'Adoration'), 'Je soif de ta présence, Divin chef de ma foi;
Dans ma faiblesse immense, que ferai-je sans toi� ?

Chaque jour. � chaque heure, oh� ! j’ai besoin de toi� ;
Viens, Jésus et demeure auprès de moi.

Des ennemis dans l’ombre, rôdent autour de moi
Accablé par le nombre, que ferais-je sans toi� ?

pendant les jours d’Orage, d’obscurité, d’effroi,
Quand faiblit mon courage, que faires-je sans to� ?

O Jésus� ! ta présence, c’est la vie et la paix� ;
La paix dans la souffrance, et la vie � jamais.

VOICI NOEL(sib) Fraz GRUBER (silent Night, Holy Night)

Voici Noël, ô douce nuit!
L’étoile est l� , qui nous conduit,
Allons donc tous avec les mages
Porter � Jésus nos hommages.
Car l’enfant nous est né, le Fils nous est donné.

Voici Noel, oh quel beau jour� !
Jésus est né� : quel grand amour� !
C’est pour nous qu’il vient sur la terre,
Qu’il prend sur lui notre misère.
Un sauveur nous est né, le fils nous est donné.
Voici Noel, ah� ! d’un seul cœur,
Joignons nos voix au divin chœur
Qui proclame au ciel les louanges,
De celui qu’annoncent les anges.
Oui, l’enfant nous est né, le fils nous est donné

Voici Noel, ne craignons pas� !
Car Dieu nous dit� : «� paix ici-bas� !�
Bienveillance envers tous les hommes� !� »
Pour nous aussi, tel que nous sommes.
Un sauveur nous est né, le Fils nous est donné.'),
  ('059', 'MON DIEU PLUS PRES DE TOI', 'SOL MASON (Near to thee, My god)', (select id from c where name = 'Adoration'), 'Mon Dieu plus près de toi, plus près de toi� !
C’est le mot de ma foi, plus près de toi.
Dans le jour où l’épreuve déborde comme un fleuve
Garde-moi près de toi, plus près de toi.

Plus près, seigneur, plus près de toi� !
Tiens-moi dans ma douleur, tous près de toi.
Alors que la souffrance fait son œuvre en silence
Toujours plus près de toi, seigneur tiens-moi.

Plus près de toi, toujours, plus près de toi� !
Donne-moi ton secours, soutiens ma foi� !
Que satan se déchaîne, Ton amour me ramène,
Toujours plus près de toi, plus près de toi.

Mon Dieu, plus près de toi� ! dans le désert
J’ai vu plus près de toi, ton iel ouvert,
Pèlerin, bon courage� ! ton chant brave l’orage,
Mon Dieu plus près de toi, plus près de toi.




DIEU EST BON

Entrez dans ses portes avec des louanges,
Et de la harpe
Que toutes les créactures dans les cieux et sur la terre,
Elèvent leurs louanges et chantent de tout cœur

Le Seigneur est bon (ého)
Le Seigneur est bon (écho)
Le seigneur est bon, sa miséricorde
Dure � jamais.

Jésus, le Fils est exalté,
Créateur de toutes choses
Venez, prosternez-vous devant lui,
Elevez vos mains et célébres-le

A jamais eh� ! Eh� ! Eh� ! Eh� ! Eh� ! Eh� ! Eh� !

SEIGNEUR TU ES BON

Seigneur tu est bon, ta bonté dure � jamais (2x)
De toute langue, de toutes les nations
Des générations en générations
Nous t’adorons
Alléluia, Alléluia
Nous t’aodorons car tu es Dieu
Tu es bon.

A JAMAIS

Offrons au Seigneur, reconnaissance
Son amour dure � jamais
Car il est bon, il est au dessus de tout
Son amour dure � jamais
Chantons, chantons(2x)

D’une main puissante et d’un bras tendu
Son amour dure � jamais
Il nous donne une vie nouvelle
Son amour dure � jamais
Chantons, chantons(2x)

A jamais, Dieu est fidèle
A jamais, Dieu est grand
A jamais, Dieu est avec nous
A jamais, � jamais, � jamais.

Du lever du soleil jusqu’� son ouchant
Son amour dure � jamais
Par la grâce de Dieu, nous persévérons
Son amour dure � jamais
Chantons, chantons (2x)
Son amour dure � jamais (8x)

A jamais, tu es fidèle
A jamais, tu es grand
A jamais, tu es avec nous
A jamais, � jamais, � jamais.'),
  ('060', 'GLOIRE A TOI SEIGNEUR', 'sol Bob FITIS', (select id from c where name = 'Adoration'), 'Gloire � Toi, Seigneur� ! nous le rendons la gloire� !
Gloire � toi, Seigneur, tu es le Dieu puissant� !
Tu es le Dieu puissant� !

Vous qui voguez sur la mer,
Vous qui habitez les îles,
Si vous vivez dans les cités,
Elevez vos voix, chantez� !

Chantez au Seigneur un chant nouveau
Portez sa gloire jusqu’aux confins de la terre
Que toutes les nations l’annoncent
Et que tout homme l’entende� !

sifa kwako O Bwana(swahili)
Tuna kusifu Mungu� !
Sifa kwako O Bwana
Wewe Mungu wa uwezo.

Nkembo, Nkembo na Nzambe! (Lingala)
Topesi nkembo na Nzambe.
Nkembo nayo, ozali Nzambe na nguya.

Butumbi mbweba, tudi Nzambi(Kikongo)
Butumbi mbweba, udi Nzambi wakukola.

Nkembo, nkembo kwa Nzambi(Kikongo)
Tuveni nkembo kwa Mfumu
Nkembo, nkembo kwa ngen mfumu,
Ngeye Nzambi ya tulendo.

Coda: Tue s le Dieu vivant, tu es le seul vrai Dieu
Tu es le Dieu puissant� !
Ⓒ 1990 Scripture in song/ Thank you Music
Cette traduction : Ⓒ 1998 Défi Music.

ÇA C’EST L’EVANGILE DU CHRIST

Pour détruire les œuvres de l’ennemi
Et les ténèbres par la lumière,
Pour saveur les hommes de la loi du péché
Car c’est l’Evangile de Christ.

Proclamez la bonne nouvelle aux pauvres
Et donnez la vie aux cœurs brisés,
Dire � ceux qui pleurent qu’un fils nous est né
Car ‘est l’Evangile de christ.

Et � Dieu soit la gloire (3x)
Car c’est l’Evangile de christ

Racheter un peuple qui lui appartient,
Sorti de le sang versé par amour
Ça c’est l’Evangile de christ.

Pour ressusciter et pour vaincre la mort
Il vient comme un voleur dans la nuit
Pour règne l� -haut avec son Eglise.
Car c’est l’Evangile de christ.

LOUAEZ DIEU, O NATIONS

Africa (écho)
Africa vient louer le seigneur (écho)
Africa vient le loue (écho)
Louez Dieu, ô nations (écho)
Son amour pour nous est grand,
Sa fidélité pour toujours

Nous sommes gardés par sa bonté,
Entourés par son amour
Il ya un refuge dans sa présence
Venez-le, Roi de gloire, louez-le.'),
  ('061', 'LA FORCE EST EN CHRIST', 'SIB L.E.JONES', (select id from c where name = 'Adoration'), '(There is power the Blood)

Veux-tu briser péché le pouvoir?
La force est en Christ� ! La force est en Christ
Si dans ton cœur tu veux le recevoir� !

Je suis fort, fort Oui plus que vainqueur,
Par le sang de Jésus� !(Mon sauveur)
Je suis fort, fort� ! Oui plus que vainqueur,
Par le sang de Jésus, mon sauveur.

Veux-tu braver et la mort et l’enfer� ?
Le force est en Christ� ! la force est en Christ� !
Jésus, d’un mot fait tomber tout tes fers� :
La force est dans le sang du Christ� !

Veux-tu marcher toujours pur triomphant� ?
La force est en Christ� ! La force est en Christ� !
Pour te garder, Jésus est tout-puissant
La force est dans le sang du Christ� !

Veux-tu du ciel t’approcher chaque jour
La force est en Christ� ! La force est en Christ� !
Avec Jésus, demeurer pour toujours� ?
La force est dans le sang du Christ� !'),
  ('062', 'LE CIEL S’ABAT, LA GLOIRE…', 'FAB J.W', (select id from c where name = 'Adoration'), 'PERTSON (Heaven came down and Glory filled)

Oh! Qu’il est merveilleux, merveilleux jour, cet inoubliable jour!
Dans la sombre nuit longtemps égarée,
J’ai rencontré mon sauveur.
Oh� ! Qu’il est tendre cet ami précieux, merveilleux par amour.
Et la joie remplit mon cœur, les chargrins sont chassés
Par Jésus, mon Sauveur.

Le ciel s’abat, la gloire est dans mon cœur� !
Car sur la croix, le seigneur m’a sauvé� !
Mon cœur, rempli de joie, ma vie est transformée.
Le ciel s’abat, la gloire est dans mon cœur� !

Né de l’Esprit de vie, enfant de Dieu et frère de Jésus-Christ� ;
Je suis entièrement justifier par son amour sur la croix� !
Pour ce jour merveilleux, je dois chanter
Car de sa main j’avais pris.
Bénédiction suprême, richesse éternelle de Jésus, mon Roi.

Et maintenant, j’ai espoir dans mon cœur,
Que j’ai ma demeure au ciel
Sûrement, j’ai un meilleur avenir dans le château du seigneur.
Je suis arraché du grand jugement qui attend le monde entier.
Loué soit ce nom que mon âme implore,
C’est celui de mon sauveur.'),
  ('063', 'NE CRAINS RIEN, JE T’AIME', 'Do Mélodie', (select id from c where name = 'Adoration'), 'Anglaise (Never Alone)

Ne crains rien, je t’aime� ! je suis avec toi� !
Promesse suprême qui soutien ma foi.
La sombre vallée n’a plus de terreur,
L’âme consolée, je marche avec le Sauveur.

Non, jamais tout seul (bi) Jésus mon saveur me garde,
Jamais ne me laisse seul.
Non, jamais tout seul (bi) Jésus mon sauveur me garde,
Je ne suis jamais tout seul.

L’aube matinale ne lui qu’aux beaux jours
Jésus, ma lumière, m’éclaire toujours� !
Quand je perds de vue l’astre radieux,
A travers la nue, Jésus me montre les cieux.

Les dangers accourent, subtils inconnus� :
De près ils m’entourent, plus près est Jésus,
Qui dans le voyage, me redit� :� «� c’est moi� »� !
Ne crains rien, courage� ! je suis toujours avec toi� !'),
  ('064', 'O JOUR HEUREUX� !', 'SOL', (select id from c where name = 'Adoration'), '(O happy Day)

O jour heureux, jour de bonheur, lumière, paix, joie ineffable� !
Au fils de Dieu, saint, adorable, � Jésus, j’ai donné mon cœur.

Quel beau jours� ! quels beau jour� !
Où d’un sauveur, j’ai su l’amour.
Oui, dans ma nouvelle partie,
Jésus m’attend et pour moi prie,
Que beau jour� ! Que beau jour
Où d’un sauveur, j’ai su l’amour.

Oh� ! Comprenez mon heureux sort� :
C’est en Jésus que Dieu pardonne� ;
La vie éternelle il la donne� ;
Pourquoi donc te craindrais-je, ô mort� !

Au ciel des chants ont retenti� : Alléluia� ! Disent les anges,
Entonnons des saintes louanges, car un pécheur s’est converti.� »

C’en est fait, tout est accompli, le fils de Dieu m’appelle frère� ;
Son sang coula sur le calvaire� ; il est � moi, je suis � lui.'),
  ('065', 'QUEL AMI FIDELE ET TENDRE', 'sol C.C', (select id from c where name = 'Adoration'), 'Converse (What a Friend we have in Jesus!)

Quel ami fidèle et tender, nous avons en Jésus-Christ,
Toujours prêt � nous entendre, � répondre � notre cri� !
Il connait nos défaillances, nos chutes de chaque jour.
Sévère en ses exigences, il est riche son amour.

Quel ami fidèle et tendre, nous avons en Jésus-Christ,
Toujours prêt � nous comprendre quand nous sommes en souci
Disons-lui toutes nos craintes, ouvrons-lui tout notre cœur.
Bientôt ses paroles saintes nous rendrons le vrai bonheur.

Quel ami fidèle et tendre, nous avons en Jésus-Christ,
Toujours prêt nous défendre quand nous presse l’ennemi� !
Il nous suit dans la mêlée, nous entoure de ses bras,
Et c’est lui qui tient l’épée, qui décide des combats.

Quel ami fidèle et tendre, nous avons en Jésus-Christ,
Toujours prêt � nous apprendre � vaincre en comptant sur lui� !
S’il nous voit vrais et sincères � chercher la sainteté
Il écoute nos prières et nous met en liberté.

Quel ami fidèle et tendre, nous avons en Jésus-Christ� !
Bientôt il viendra nous prendre pour être au ciel avec lui.
Suivons donc l’étroite voie en comptant sur son secours.
Bientôt nous aurons la joie de vivre avec lui toujours� !'),
  ('066', 'DEVANT TOI, SEIGNEUR', 'P.S 25 (Fa) charles', (select id from c where name = 'Adoration'), 'MONROIE (Unto thee, Oh Lord)

Devant Toi, Seigneur, je répands mon âme. (2x)

O mon Dieu (O mon Dieu). Je suis � toi (écho)
Je me confie en toi,
Conduit-moi dans la voie de la vérité.

Souviens-toi de moi, car en toi j’espère (2x)
Montre-moi la voie, le chemin � suivre (2x)
L’Eternel est droit, il est bon et Juste (2x)
L’amitié est Dieu est pour ceux qui l’aiment (2x)'),
  ('067', 'QU’IL FAIT BON A TON SERVICE� !', 'MIB RUSSEL', (select id from c where name = 'Adoration'), 'Qu’il fait bon � ton service, Jésus mon sauveur� !
Qu’il est doux le sacrifice, que t’offre mon Cœur� !

Prends, Ô Jésus, prends ma vie, elle est tout � Toi� !
Et dans ta grâce infinie, du mal garde-moi� !

Mon désir, mon vœu suprême, c’est la sainteté� !...
Rien je ne veux et je n’aime que ta volonté� !

Comme l’ange au vol rapide, je veux te servir� !
Les yeux fixés mon guide, toujours obéir� !'),
  ('068', 'TEL QUE JE SUIS, SANS RIEN', 'FAB W.P.', (select id from c where name = 'Adoration'), 'BRADBURY (JUST AS I AM)


Tel que je suis, sans rien � moi, sinon ton sang verse pour moi,
Et ta voix qui m’appelle � toi, Agneau de Dieu, je viens, je viens� !

Tel que je suis, bien vacillant, en proie, au doute � chaque instant
Lutte au dehors, crainte au-dedans, Agneau de Dieu, je viens, je viens� !

Tel que je suis, ton cœur est prêt � prendre le mien tel qu’il est,
Pour tout changer sauveur parfait, Agneau de Dieu, je viens, je viens

Tel que je suis, Ton grand amour, � tout pardonné sans retour,
Je veux être a toi dès ce jour, Agneau de Dieu, je viens je viens� !'),
  ('069', 'JE NE SAIS POURQUOI DANS', 'Mib J.Mac', (select id from c where name = 'Adoration'), 'GRANAHAM (I know whom I have believed)

je ne sais pourquoi dans sa grâce
Jésus m’a tant aimé� ;
Pourquoi, par son sang, il efface
Ma dette et mon péché.

Mais, je sais qu’en lui j’ai la vie
Il m’a sauvé dans son amour� ;
Et gardé par sa main meurtrie,
J’attends t’heure de son retour.

Je ne sais comment la lumière,
Eclaire tout mon cœur� ;
Comment je compris ma misère
Et reçus mon sauveur� !

Je ne sais quelle est la mesure
De joie et de douleur
Que pour moi, faible créature,
Réserve mon sauveur.


Je ne sais quand de la victoire,
L’heure enfin sonnera,
Quand l’agneau, l’Epoux dans sa gloire,
Avec lui me prendra.'),
  ('070', 'OUVRE LES YEUX DE MON CŒUR', 'sol', (select id from c where name = 'Adoration'), 'Inconnu (Open the Eyes of my Heart, Lord)

Ouvre les yeux de mon Cœur, Dieu,
Ouvre les yeux de mon cœur,
Je veux te voir, Dieu je veux te voir.

Te voir sur un trône très élevé,
Brillant dans la lumière de ta gloire.
Déverse puissance et amour,
Nous disons� : saint, saint est l’Eternel.
Je veux te voir.

PERE ( la) Danny DANIES (Father)


Père, oui tu es mon père, je suis ton enfant,
Toujours, demain comme aujourd’hui,
Tu es mon père.

Père, je t’adore, père, je louerai ton nom.
Toujours, demain, comme aujourd’hui,
Tu es mon père.

Abba, Père, je suis � Toi,
Abba, Père demain, comme aujourd’hui,
Tu es mon père.

Père, je t’écoute, ô père, je te servirai,
Toujours, demain, comme aujourd’hui,
Tu es mon Père.

© 1989 Mercy/ Vineyard publishing.'),
  ('071', 'TU ES REVETU D’ECLAT', 'Alpha Kam', (select id from c where name = 'Adoration'), 'Tu es revêtu d’éclat et de gloire. (2x)

Tes œuvres sont en grand nombre.
Tu les as faits avec sagesse.
La terre est remplie de tes bienfaits.

Les oiseaux élèvent leurs voix vers toi seigneur.
Les forets donnent du calme en ton honneur. (2x)
Les villes donnent du bruit pour te louer.

© 2013 M.E.S. Butembo'),
  ('072', 'SEIGNEUR ME VOICI', 'Inconnue', (select id from c where name = 'Adoration'), 'Seigneur me voici assoiffé de ta présence
Père entend mon cri, celui de la délivrance
Je veux ta rivière, je veux ton amour,
Afin de devenir semblable � toi.

Que ma coupe déborde
Que mon cœur soit rempli vient transformer ma vie,
Que ma coupe déborde de joie et de l’Esprit
Vient Jésus change moi, fais-le je te prie.'),
  ('073', 'MA VIE DEPEND DE TOI', 'Elie Hangi', (select id from c where name = 'Adoration'), 'Ma vie dépend de toi mon Dieu.
Tu es le souffle qui me conduit
Tu es le Seigneur le Dieu de mon salut
A toi j’ai mis ma confiance, Mon Dieu.

Tu es le Dieu d’Abraham, d’Isaac
C’est toi qui fis le salut � ton peuple
C’est pourquoi nous crions � toi.


Soutiens-nous Seigneur (4x)
Soutiens nos fois

© 2013 Elie Hangi C.B.C.E./MGL'),
  ('074', 'SEIGNEUR TU ES BON', 'Alpha Kam.', (select id from c where name = 'Adoration'), 'Seigneur tu es bonté dure � jamais
Pour toutes langues, pour toutes les nations, pour toutes les générations
Seigneur tu es bon

Je t’adore car tu es bon
Oui tu es bon (2x)
Et � jamais tu es sera bon (2x)

Ebloui par ta sainte présence Seigneur
Devant ton trône je m’incline
Je lève mes mains pour t’honorer Seigneur
Et t’adoré car tu es bon pour moi.
Et t’adiré car tu es bon pour moi
Tu es bon seigneur.

© 2013 M.E.S Butembo.


CET AIR QUE JE RESPIRE

Cet air que je respire (2x)
C’est ta présence qui vit en moi
Ce pain jour après jour
C’est ta parole donnée pour moi.

Et moi Ah� ! Ah� ! Ah� ! Ah� !
J’ai tant besoins de toi.
Et moi Ah� ! Ah� ! Ah� ! Ah� !
Je suis perdu sans toi.'),
  ('075', 'KUMISAMA', 'SOL Aimé NKANU', (select id from c where name = 'Adoration'), 'Kumisama, sanjolama,
Yo Nzambe na bisa, Yawen Nzambe

Nzambe i Mfumu wasema zalu yen toto
Nzambi ya tulendo, Nzambi ame,
O Nzambi a moyo.

Mabolongo nioso engumbamela Yo,
Mingongo nioso etatola nkombo na Yo,
Y’obongi na nkembo, yawe Nzambe.

Sois loué, soit béni, le Dieu d’amour,
Le tout-puissant, gloire � toi.'),
  ('076', 'JESUS EST AU MILIEU DE NOUS', 'Mi L.E.', (select id from c where name = 'Adoration'), 'JONES (Just as Thou Art)

Jésus est au milieu de nous son regard s’abaisse sur nous,
Sa douce voix, l’entendez-vous� ?
«� je veux vous bénir tous� ! (bis)� »
Sa douce voix, l’entendez-vous� ? «� Je veux vous bénir tous� !� »

Jésus est au milieu de nous, son regard s’abaisse sur nous,
Sa douce voix l’entendez-vous� ?
«� Je veux vous sauver tous� ! (bis)
Sa douce l’entendez-vous� ? «� Je veux vous sauver tous� !� »

Jésus est au milieu de nous, son regard s’abaisse sur nous,
Sa douce voix l’entendez-vous� ?
«� Oh� ! Je vous aime tous� ! (bis)'),
  ('077', 'A DIEU SOIT LA GLOIRE', 'LAB W.H. DOANE', (select id from c where name = 'Adoration'), '(To God be the glory)

A Dieu soit la gloire! Par son grand amour
Dans mon âme noire s’est levé le jour,
Jésus, � ma place, mourut sur ta croix
Il m’offre sa grâce et je la reçois� !

Gloire � Dieu, Gloire � Dieu� ! Terre écoute sa voix� !
Gloire � Dieu, Gloire � Dieu� ! Monde réjouis-toi� !
Oh� ! Venez au père, Jésus est vainqueur� ;
Que toute la terre chante en honneur.

De Jésus la joie, remplit notre cœur� ;
Qu’importe qu’on voie tout notre bonheur,
Selon sa promesse Jésus changera
Deuil en allégresse quand il reviendra.

Céleste patrie, mon cœur pense � toi,
L� , mon âme unie, � Jésus, mon Roi
Bénira sans cesse, le grand Dieu vainqueur
Qui dans sa tendresse sauva le pécheur.'),
  ('078', 'DANS TES BRAS D’AMOUR', 'SOL Craig MUSEAU (Arms of Love)', (select id from c where name = 'Adoration'), 'Je veux chanter un chant d’amour
Pour mon Sauveur, pour Toi, Jésus,
Merci pour ce tu as fait, Tu es précieux,
Jésus, mon Sauveur,
Je suis heureux, Tu m’as donné ton nom.

Je ne veux pas être ailleurs que dans tes bras d’amour,
Dans tes bras d’amour,
Tout près de Toi, près de ton cœur, dans tes bras d’amour.

©1991 Mrcy/Vineyard Publishing'),
  ('079', 'JE DECLARE', 'THIERRY OSTRINI', (select id from c where name = 'Adoration'), 'Je déclare au ciel et � la terre que Dieu est mon Père
Et qu’en Jésus-Christ, son Fils j’ai tout de lui en moi
Je déclare aussi que son Esprit crie en moi� : Abba Père
Et que l’ennemi n’a plus qu’� trembler sous nos pas (bis)

A Dieu soit le règne, la puissance et la gloire aussi.

Je déclare au ciel et � la terre que rien ne peut contenir
A l’amour qu’il m’a donné en mourant sur le bois.
Et qu’il me donne � jamais � chaque fois que mon cœur prie
Et que son Esprit atteste ses désirs en moi.

Je déclare enfin que rien en moi ne peut le contenir
Et que son amour embrasse un feu de tous côtes.
Et que c’est pourquoi je veux aller partout pour le servir
Et pour annoncer au monde un Dieu ressuscité
(Yeh, yeh,yeh)
Ⓒ2000 Thierry OSTRINI/EXO

JE SUIVRAI MON SEIGNEUR () Thierry et OSTRINI

Je suivrai mon seigneur et mon Maitre
Sans jamais m’éloigner de ses pas,
Sans que rien ici-bas ne m’arrête
Et sans rien que le chant de sa voix.

Je vivrai de bonheur et de grâce
De l’amour que son cœur m’a donné
Et que rien ici-bas ne l’efface,
C’est le vœu de mon âme assoiffée.

Un seul instant auprès de toi
Vaut bien les heures et la route
Tout, pour autant que ce soit toi
Qui m’accompagne au parvis de ta joie
Ⓒ 2000 Chris Christensen/ Thierry OSTRINI'),
  ('080', 'DESCENDS SUR NOUS', 'Ré Thierry et OSTRINI', (select id from c where name = 'Adoration'), 'Du sein de notre Dieu, de l’infini des cieux,
Descends de son saint lieu sur nous.
Le flot de son amour que tant de paix entoure
De bienveillance et de grâce envers nous.

Et l� pour l’adorer, nos cœurs émerveillés
Reçoivent en sa bonté la joie,
De vivre en alliance au puits de sa présence
Des sources inépuisables de sa voix.

Viens nous combler de Toi
Viens couronner de foi
Notre espérance, descends sur nous,
O dieu de gloire.

Viens partager ta vie, qu’au chant de ton Esprit,
Nos cœurs répandent aussi ton nom.
Qu’ils parlent et qu’ils s’épanchent,
Qu’ils s’ouvrent et qu’ils se penchent
Sur les eaux immuables du pardon.

Que tous ensemble ainsi devant toi réunis
Nous recevions cette huile sainte,
Bonne et abondante, pure et bienfaisante,
Ordonnance éternelle de ta main.
Ⓒ 2000 Chris Christensen/ Thierry OSTRINI

LOUEZ (Chris Christensen Thierry OSTRINI)

Louez le Dieu de gloire, louez le Roi des rois.
Louez, que le fils de Dieu soit loué, loué.
Louez dans la victoire, louez � pleine voix,
Louez, que le fils de Dieu soit loué.

Célébrez sur les montagnes et chantez dans les vallées,
Louez-le dans les campagnes,
Exalter son saint nom jusqu’aux cieux.

Proclamez sa présence, ses faveurs et ses bontés,
Annoncez avec les danses,
Une année de grâce en notre Dieu
Jésus� ! Jésus� ! Jésus� ! Fils de Dieu� ! Fils de Dieu� !
Jésus� ! Jésus� ! Jésus� ! Roi des cieux� ! Roi des cieux!

Louez-le, Yeh� ! (Louez-le Yeh) louez-le
Que le Fils de dieu soit loué (bis)
Louez-le, Jésus� ! (Louez-le, Jésus)� ! Louez-le.
Que le Fils de Dieu soit loué, loué, Louez-le.
Ⓒ2000 Chris Christensen/Thierry OSTRINI.

PSAUMES

Poussons des cris de joie
Habitants de la terre
Célébrons notre Roi
Que tous ceux qui espèrent
Le servent
Chantons gloire et louange
Oh� ! Quelle joie te servir
Que l� haut tous les anges
Et tout ce qui respire se lèvent
Chantent et proclament.

Nous sommes le troupeau
De ton pâturage
Non rien n’est plus beau
Que notre héritage
Etre � ton image
Refléter ton visage� !!!

Entrons dans ses parvis
Par ses portes en chantant
Adorons Jésus-Christ
Loin des vagues et des vents du monde
Elohim est fidèle, sa bonté � toujours,
Dieu s’est donné du ciel sur la terre,
Son amour abonde sur tous les hommes.'),
  ('081', 'AVEC TOI', 'CHANT DES NOCES', (select id from c where name = 'Adoration'), 'J’aime comme c’est étrange
Comme c’est nouveau
Le ressentir dans mon être
J’aime mon doux, mon ange
Toi mon cadeau, quel beau jour
Je me sens renaître.

Le marié� :
Avec toi, ma vie une histoire d’amour
Belle � contrer au monde entier
Avec je vis et je savoure
D’avoir aimé et être aimé.

La mariée� :
Avec toi je ris de l’avenir
N’est-il pas dit deux valent mieux qu’un
Et puisque Dieu a su nous unir.

Entre ces mains nos lendemains
L’amour est notre foi
Notre devise
Le mot de notre voix
Devant l’église
Le choix d’être avec toi
Plus rien ne divise

J’aime, pour le meilleur
Et pour la vie
Mon âme d’unit � la tienne
J’aime, oh quel bonheur
J’en suis ravi
J’ai trouvé l’âme sœur � la mienne

A L’AGNEAU OMMOLE

Tous les anges louent sa sainteté
L’univers crie sa majesté
Chantons gloire et puissance
Force et louange
A l’Agneau, � l’Agneau immolé

Les ténèbres ont reculé devant l’œuvre de la croix
Devant l’Agneau immolé et le sang versé pour moi,

De la vie qu’il a donnée, � la vie qui brûle en moi,
Tant d’amour et � jamais ma reconnaissance au Roi
Vivant, vivant
Puissant, puissant
Vivant, vivant
Puissant, tout-puissant.'),
  ('082', 'PERE, JE T’ADORE', 'Fab Terrye COELHO', (select id from c where name = 'Adoration'), 'Père, je t’adore, je te donne ma vie
Je t’aime tant

Jésus…….3. Saint-Esprit.

DIEU FIDELE

Dieu fidèle, tu ne change pas,
Eternel, mon Rocher, ma paix,
Dieu puissant, je m’appuie sur Toi,
Et je crie sur toi, car Tu es mon Dieu
Oui, je crie vers Toi, j’ai besoin de toi.

Tu es mon roc au jour de la détresse
Et si je tombe, tu me relèves.
Dans la tempête, ton amour ne ramène au port.
Tu es mon seul espoir, seigneur.

Ⓒ 1989 Mery/ Mineyad Publishing.'),
  ('083', 'IL EST DIEU DE MON SALUT', 'fab Danie HURTREL', (select id from c where name = 'Adoration'), 'Il est Dieu de mon salut
Il est le Dieu de ma délivrance
Un Dieu d’espérance
Alléluia, alléluia (x2)'),
  ('084', 'IL EST UN BEAU SOLEIL', 'sol G.ISTLY', (select id from c where name = 'Adoration'), 'Il est un beau soleil joyeux
Qui scintille dans mon cœur
Et c’est le doux regard de Dieu
Que m’apport mon sauveur.

Le soleil qui brille en mon âme
Et reflète la splendeur des cieux
C’est Dieu qui met en moi sa flamme
Et des lors je suis heureux.

En moi régnait la sombre nuit,
Quand parut u n jour nouveau
Au ciel une aube chaire a lui
Et voici tout est si beau.

Le doute s’est enfui bien loi
Les murmures se sont tus.
Tout est lumière en moi, soudain
Les ténèbres ne sont plus.

Louange � Dieu qui nous fait don
D’un rayon de son amour.
Aux voix du ciel, joyeux mêlons,
Nos cantiques nuit et jour.'),
  ('085', 'JE SUIS HEUBREUX', 'Fab', (select id from c where name = 'Adoration'), 'Je suis heureux car Jésus ma sauvé
Par son amour il m’a tout pardonné
Voil� pourquoi je me mets � chanter
Je suis heureux car Jésus m’a sauvé.

QUI J’AIME JESUS L’HOMME DE GALILEE

Oui j’aime Jésus l’homme de Galilée (x2)
Mon péché est affacé, mon fardeau enlevé
Oui j’aime Jésus l’homme de Galilée.'),
  ('086', 'BENISSEZ SON SAINT NOM', 'Mi Andréa', (select id from c where name = 'Adoration'), 'CROUCH ( bless the lord, O my Soul)

Bénissez! (écho) l’Eternel! (écho) que tout ce qui est en moi
Bénissez son saint Nom.

Il fait des prodiges (x3) béni soit son saint Nom
Il fait des miracles (x3) béni soit son saint Nom.'),
  ('087', 'PAR TON SANG VERS TOI', 'Mi', (select id from c where name = 'Adoration'), 'CHRISTENSEN (By your Blood)

Par ton sang, vers Toi, j’avance ceint de ta puissance
Fort de ta présence � chaque pas.
En ton sang, ma délivrance, le sceau de ton alliance,
Ma vie, ma révérence devant toi.

Ni mes craintes ni mes doutes ne détournerons ma foi,
De ta grâce sur ma route et de ton amour pour moi.

Ⓒ 1994 Intergrity’s Hosanna� ! Music'),
  ('088', 'IL M’A FAIT DU BIEN', 'PS.100� : 4 (fa) L.Von', (select id from c where name = 'Adoration'), 'BRETHORST (He has made me glad)
J’entrerai dans ses portes
Avec des actions de grâces,
Dans ses parvis avec des louanges.
Je dirai� : Voici le jour que le Seigneur a fait.
Je me réjouis car il m’a fait du bien.

Il m’a fait du bien (bis)
Je me réjouis car il m’a fait du bien (2)
Ⓒ 1976 Maranatha� ! Music.'),
  ('089', 'TU ES DIGNE', 'Frank MULAJA', (select id from c where name = 'Adoration'), 'Tu es digne, Seigneur Jésus
Tu es digne d’être adoré
De tout mon cœur je chante � jamais tu es le roi des rois.

Tu es digne, seigneur Jésus
Tu es digne d’être adoré
De tous nos cœurs nous te chantons � jamais tu es le Roi des rois.

Tu es le Roi des rois, Prince de paix
Tu es le Roi de gloire, Tu es digne de louange
Tous nous venons � Toi, pour chanter tu es digne
Tu es digne d’être adoré.

JE LEVE LA VOIX (Christensen & Ostrini)

Longue est la nuit profonde de silence
Des tènèbres en l’absence de lumière et éclat
De l’ombre � l’aubli, de la peine � la faute
De ne croire en rien d’autre qu’� l’effort
Sans foi� !
Chorus� : je lève la voix, je me lève et je crois
A la vie qu’il redonne et le souffle
Et la force aux élans de ma foi
Et je marche et je vois� : un chemin au-del�
Une étoile au matin et la nuit qui
S’en va au cri de ma joie…….

Dans mon cœur, tant des cris que
Mes lèvres se ferment
Sur des mots qui m’enferment dans le sens qu’ils ont pris.
Et la joie qu’elle m’apporte
Je saurai le chemin.

YOU ARE MY WORLD

My father I adore you more
Than any thing my heart could wish for
I just want you
And Jesus my beloved savior
Everything I am I owe to you
I o we it all to you
And angels come and adore you
And we your children worship you

You are my world,
You are my God
And I lay down my
You are my lord, the one I love
No one could ever take your place
And everything I have I give to you
My lord,the one I live for you
I live for you
And all my days are gifts from you
I pray I’d use them as you want me to use them for you.

MY GOD IS GOOD

Hey, my God is good o!
Everything no double, double o!
Promotion no double , double o!
Your money no double, double o!
Your houses double, double o!
Your cars double, double o!

In the morning when I wake up,
I will sing my praise unto you my lord
I will shout I will dance for you
You have been my help forever and ever
Hey, your God is good, o!

BONDISSEZ (Christensen & Ostrini)

Bondissez de joie, louons le Seigneur (2x)
Son amour infini n’a pas de fin
Et son règne éternel dure � jamais (2x)
La-la-la-la-la-la-la.'),
  ('090', 'JE LEVE LES YEUX', 'Mi CHRISTENSEN/OSTRINI', (select id from c where name = 'Adoration'), 'Je lève les yeux vers le Dieu de mon salut,
Du haut les cieux, il voit ma peine
Il étend sa main quand la mienne s’est perdue
Et me remène

Dans ma vie, tant de cris et tant de larmes
Sous les coups du mépris, je n’ai qu’une arme

Par sa grâce infinie, il me libère
Il répond par vie � mes prières

Tu es digne, Seigneur jésus
Tu es digne d’être adoré
Tu es digne, Seigneur Jésus
Tu es digne d’être adoré.
Ⓒ 1996 Christensen/ Ostrini'),
  ('091', 'TU ES LE MAITRE', 'Sol CHRISTENSEN & OSTRINI', (select id from c where name = 'Adoration'), 'Tu es le maitre de tout mon être,
Je bénirai ta sainteté
Je veux renaître, je veux connaître
Ta plénitude et ta beauté

Je veux vivre libre de moi-même
Je veux vivre te joie et tes peines
Tu es le maitre et je veux être
Celui que tu veux que je sois.

Ⓒ 1991 Christensen/Ostrini'),
  ('092', 'ETERNEL', 'Do CHRISTENSEN & OSTRINI', (select id from c where name = 'Adoration'), 'Eternel, notre Seigneur, que ton nom est magnifique
Eternel, notre Seigneur, que ton nom soit glorifié

Par la bouche des petits, tu déploies ta majesté
Tu confonds tes ennemis par ta force et ta bonté

Quand je regarde les cieux, la beauté de l’univers
Qu’est l’homme ô Eternel, pour que tu le considères

Façonnés � ton image, de ta gloire couronnées,
Tu nous donnes en héritage tout ce que as crée.
Ⓒ 1992 Christensen/Ostrini'),
  ('093', 'DU FOND DE L’ABIME', 'Evariste MUGHANDA', (select id from c where name = 'Adoration'), 'Du fond de l’abime
Je t’invoque ô Eternel� !
Soit attentif
A mes supplications� !
Chorus� : J’espère en toi ô eternel
Mon âme compte sur le Seigneur
Je trouve � toi la vie Eternelle
Je veux rester, je veux rester prêt de ta croix.
Ⓒ 2010 M.E.S Butembo.'),
  ('094', 'QUE TOUT GENOU', 'Alain Moloto', (select id from c where name = 'Adoration'), 'Que tout genou flèchisse
Que toute langue confesse,
Que Jesus-Christ est Seigneur� !
Que les nations proclament
La joie de notre Seigneur,
Car il est digne de gloire.

Chorus� : Oui levon tous nos mains vers lui,
Et contemplons sa magnificence,
Jésus le prince glorieux
Oui, acclamons le Roi des Rois
Car tout pouvoir lui � été donné
Jésus le prince glorieux� !

Que tous comme un seul homme
Chantons � l’unisson
Le refrain de sa gloire
Et que nos cœurs s’abreuvent,
De sa sublime splendeur,
Et de sa divine bonté.

Exaltons le Roi,
Et célébrons sa victoire
Et proclamons son royaume� !
Pour qu’� jamais son nom
Sois le refrain e nos chants,
Et la raison de nos vies� !

THERE IS A REDEMEER BY KAITH CREEM

There is a redeemer,
Jesus, God’s own son
Precions lamb of God,messiah
Holy one.
Chorus : thank you oh my father, for giving
Us your son
And leaving your spirit, till the work on earth is done.

Jesus my redeemer,
Name above all names
Precious lamb of God,messiah
Oh,for sinners slain.

When I stand in Glory
I will see his face,
And there I’il serve my king forever,
In that holy place

I SURRENDER ALL

All to Jesus I surrender
All to him I freely give.
I will ever love and trust him
In his presence daily live
Chorus: I surrender all,I surrender all
All to thee my blessed savior
I surrender all.
All to Jesus I surrender
Humby at this feet I bow
Worldly pleasures all for saken
Take me Jesus, take me now
All to jesus I surrender
Lord, I give my self to thee,
Fill me with thy love and power
Truly know that thou art mine

All to Jesus I surrender
Lord, I give my self to thee,
Fill me with thy love and power
Let thy blessing fall on me

All to Jesus,I surrender
Now I fee thee sacred flame
O the joy of fullbsalvataion!
Glory, Glory,to his name.

L’AMOUR DE DIEU

L’amour de Dieu de loin surpasse
Ce qu’en peut dire un cœur humain
Il est plus grand que les espaces,
Même en abime il nous atteint
Pour le pêché de notre monde,
Dieu nous donna Jésus.
Il nous pardonne, ô paix profonde
Il sauver les perdus.
Refrain� : L’amour de Dieu si fort si tendre
Est un amour sans
Tel est chant que font antendre
Les anges et les saints

versez de l’encre dans les ondes
Changez le ciel en parchemin� ;
Tendez la plume � tout le monde
Et que chacun soit écrivain
Vous dire tout l’amour du père
Ferait tarir les eaux
Et remplirait la place entière
Sur ces divins rouleaux.

MON DIEU SI BON

Mon Dieu est si bon, il prend bien soin de moi,
Ce Dieu si fidèle, c’est lui qui pense � toi,
Il voudrait t’aider dans tes difficultés
Il faut que tu viennes � lui tel que tu es.



Refrain� : Dieu sait si bien ce qui te semble lourd.
Qui te fait mal te trouble chaque jour
Il connait tes besoins, ta peur du lendemain
Avec mon Dieu, je sais tout ira bien.

Il vit � jamais, c’est un Dieu tout-puissant
Il te répondra, viens � lui simplement
Quand tout semble noir triste et désespéré
Sais-tu que l� -haut tu n’es pas oublié� ?

Mon t’aidera, il conduira tes pas
Si tu veux marcher te plier � sa loi
Alors ce crains, tu peux compte sur lui,
Il accomplira tout ce qu’il a promis.

OH QU’IL EST BON

Oh� !qu’il est doux pour des frères de demeurer ensemble� !(bis)
Ah� ! Qu’il est doux de demeurer ensemble� !
Ah� !Qu’il est doux de demeurer ensemble� !

JE VEUX MONTER SUR LA MONTANGE

Je veux monter sur la mùontagne
C’est l� que je recontre Dieu
C’est l� que la joie nous inonde
Que pour nous s’ouvrent les cieux
Je veux laisser les joies du monde
Et me tenir tout près de Dieu
Je veux monter sur la montagne,
C’est l� que l’on est heureux.

Si le chemin est rocailleux.
Si les cailloux blessent un peu
Le saint-Espit me guidera
Et Jésus me consolera.

Sur ce chemin, Jésus montra
Et mon sauveur me précéda
Avec lui je veux m’élever
Jusque sur les plus hauts sommets'),
  ('095', 'JE SUIS NE POUR LOUER', 'Fa CHRISTENSEN', (select id from c where name = 'Adoration'), '(I WAS BORN TO PRAISE YOU)
Je suis né pour te louer,
Je suis né pour glorifier ton nom
En toutes circonstances
Apprendre � te dire merci.
Je suis né pour t’aime.
Je suis né pour t’adore, mon Dieu
Obéir � ta voix, je suis fait pour toi.
Ⓒ 1986 Integrit’s Hosanna� ! Music'),
  ('096', 'L’ETERNEL EST MON BERGE', 'Alpha Kam', (select id from c where name = 'Adoration'), 'L’Eternel est mon
Je ne manquerai de rien
Il me fait reposer dans le vert pâturage.

Tu mérite l’adoration
Tu mérite la louange
Toi qui nous guide toute notre vie dans le malheur consolateur

Quand je marche dans la vallée de l’ombre de la mort
Je ne crains aucun mal
Car tu es avec moi.
Ⓒ 2013 M.E.S Butembo.





BENI SOIT LE NOM DU SEIGNEUR
(Mi) Andy PARK (Blessed be the Name)

Je demeure � l’abri de tes ailes
Je me repose auprès de toi
Ta fidélité sera mon bonheur
Chaque jour, je chanterai
Béni soit le nom du Seigneur
Oui, je bénirai ton nom toute ma vie
Béni soit le nom du Seigneur.

Je veux chanter ton nom,, Seigneur,
Chaque jour, tu prends mes fardeaux
Ta fidélité fera mes délices
Chaque jour, je chanterai.
Ⓒ 1995 Mercy/Vineyard Pub/LTC'),
  ('097', 'JE VIS TA LIBERTE', 'Do CHRISTENSEN & OSTRINI', (select id from c where name = 'Adoration'), 'Où sont enfouies mes fautes, où a fuit mon péché,
Quel est le poids qui les couvre� ?
Du soleil levant au ciel couchant
Plus une ombre ne voile ma route
Comment te remercier, je tressaille déj�
Mon âme tremble de joie.
Et je pleure et je ris, je suis ivre de toi
Car je vis ta liberté, (Bis)'),
  ('098', 'QU’IL EN SOIT AINSI', 'LA CHRISTENSEN & OSTRINI', (select id from c where name = 'Adoration'), 'Tu as voulu tes enfants unis, (Qu’il en soit ainsi)
Un jardin de paix pour ta famille, (Qu’il en soit ainsi)
Et nous voil� tous ensemble près � faire ta volonté,
S’il est vrai qu’on te ressemble, donne-nous ta sainteté

Tu as voulu tes enfants heureux, (Qu’il en soit ainsi)
Un amour sincère au fond des yeux, (Qu’il en soit ainsi)
Nous ne sommes pas capables, donne-nous de nous aimer.
Que nos vies soient acceptables, selon tes desseins parfaits.
Et nous serons enfin temple, ce palais où tu demeures.
Où ton cœur de père nous comble de ta grâce.
Et nous serons enfin l’Epouse que ton amour a choisis
Le parfum de ta vie, qu’il en soit ainsi.

Tu es voulu Ton trône établi, (Qu’il en soit ainsi)
Et ton règne sur tout le pays, (Qu’il en soit ainsi)
Nous irons dans ta confiance, enflammés de ton Esprit,
Proclamer dans ta puissance, le salut de Jésus-Christ.
Ⓒ 1997 Christensen/Ostrini.'),
  ('099', 'QU’IL FAUT BON A TON SERVICE', 'Mi RUSSEL', (select id from c where name = 'Adoration'), 'Qu’il fait bon � ton service, Jésus, mon Sauveur� !
Qu’il est doux le sacrifice, que t’offre mon cœur� !

Prends ô Jésus, prends ma vie, elle est tout � Toi� !
Et dans ta grâce infinie, du mal garde-moi� !
Mon désir, mon vœu suprême, c’est la sainteté� !....
Rien je ne veux et je n’aime que ta volonté,

Comme l’ange au vol rapide, je veux te servir� !
Les yeux fixés sur mon guide, toujours obéir.� !'),
  ('100', 'SOLEIL LEVANT', 'ALAIN MOLOTO', (select id from c where name = 'Adoration'), 'Chorus� : O Seigneur Jésus levant
Vient régner au milieu de nous
Nous voulons être un peuple qui t’adore
Vient inscrire ton nom dans les anales
De la République seigneur
Dans la paix qui fera ta gloire
Que mon pays soit ton sanctuaire
Le Sion de ta majesté
Et ta main pour changer l’image du monde
Fais lever l’étendard de ta gloire
Au sommet de toute la nation
Nous voulons te magnifié Jésus
Et que l’hymne de mon peuple soit
Un cantique d’adoration
Pour sceller nos intimités Seigneur.

Ô soleil
Lumière de Dieu répands sur moi� ;
Les rayons de ton éclat
Pour éclairer les ténèbres de ma vie
Ou oh� : Répands la gloire de Dieu
Sur mon âme je veux vivre
Le royaume de Dieu en moi, Ou oh� !Soleil� !

Soleil levant
Viens faire genre ce grain d’amour
Du profond de tout mon être
Imprimer la vie de Dieu en moi soleil
Ou oh pour que je vive le ciel
Sur la terre je veux vivre
Comme un prince qui voit la gloire du Roi, Soleil

Coda� :
O soleil levant mon cœur attend
De toi l’identité royale
Je voudrai briller comme toi, Soleil
Que l’éclat de tes Royan m’embrasse
Au contact de ta majesté
Je n’attends que te ressembler soleil.

O Jésus
Lève-toi au ciel de mon pays
Fais revivre nos esprits
Restaurer l’adoration au cœur de la nation
Oh� !pour que le monde entier
Reconnaisse que tu es Dieu
Toi le vrai restaurateur de nos états.

PURIFIE NOS CŒURS

Entends les cris de mon cœur qui implorent ta bienveillance
Fais tomber mes offenses
Fais-le sûrement devant ta face
Et mes lèvres impures ô mon Roi
O oui, j’ai péché contre ta loi
Et mes crimes et mes fautes, Eternel, je veux les effaces Seigneur

Purifie mon cœur… sanctifie ma vie
O saint d’Israël, je te le prie

Reçois notre prière… fidèle et tendre père
Nous sommes sur ce service, Agrée nos sacrifices
Par le sang de ton fils Jésus
Que nos mains purifient, ô soleil
Pour contempler ta royauté

Purifie nos … nos cœurs…sanctifie os vies
O saint d’Israël, nous te le prions

purifie nos cœurs…nos cœurs … sanctifie nos
O saint d’Israël nous te le prions
Dans ta sainte présence, Ö Seigneur
Nous voici brise et condamnés
Du haut de ton trône de gloire
Répands sur nous ta sainteté

Purifie nos cœurs,… nos cœurs… sanctifient nos vies
O saint d’Israël, nous te le prions
SAINT, SAINT,SAINT EST L’ETERNEL

Chorus� : Saint, saint,saint est l’Eternel
Dieu des armes, tu es saint
L’honneur et la gloire t’appartient
A jamais tu es saint.

Oh Roi vit pour toujours
Et que Jesus le fils de ton amour
Demeure la seul raison de nos louanges
Ensemble avec les anges, dans les merveilles de rachetés
Chantons en l’unissons alléluia�
Yawe biso tombolma kiti nayo ya ngolu
Na mitema to tatoli yozali nzambe
Maboko na likolo na loyembo oyo ya ba santu
Na ba anges took yemba alleluia.
Pont:


Revêtu de gloire et de puissance
Et de magnificence
(A jamais tu es saint)
Dans ton trône tu es si précieux ton trône est dans les cieux
( A jamais tu es saint)

AMIZING LOVE

I’m fogiven, because
You were forsaken
I’m accepted,you were condemned
I’m alive and well
Your spirit lives withim me
Because you died and rose again

Chorus:
Amazing love, haw can it be?
That you’re my king should die for me
Amazing love I know it true
And it my joy to honor you
Il all I do,I honor you
Bridge:
Jes’s you are my king
Jesus you are my lord.


HOLY HOLY

Holy, holy are you lord
The whole earth is with your glory
Let the nations rise to give honor and praise to you name
Let your face shine on us
And the heavens shout your fame
Beautiful is our God
The universe will sing
Alleluia
THIS IS THE AIR BREATH

This is the air I breath
This is the air I breathe
Your holy presence
Living in me

This is the air I breath
This is the air I breathe
Your very word spoken to me
Chorus: and I…
I’m desparate for you
And I,……
I’m lost without you.
LISTE ALPHABETIQUE')
on conflict (number) do update set
  title = excluded.title,
  author = excluded.author,
  category_id = excluded.category_id,
  lyrics = excluded.lyrics,
  updated_at = now();

-- Total chants detectes: 100

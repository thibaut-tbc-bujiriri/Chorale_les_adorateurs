import type { AuthUser } from "@/features/auth/types/auth.types";
import type { Category } from "@/features/categories/types/category.types";
import type { Favorite } from "@/features/favorites/types/favorite.types";
import type { Song } from "@/features/songs/types/song.types";
import type { User } from "@/features/users/types/user.types";
import type { NavItem } from "@/types/global";

export const APP_NAME = "Les adorateurs";
export const DEMO_PASSWORD = "chorale123";

export const publicNavItems: NavItem[] = [
  { label: "Accueil", to: "/" },
  { label: "Chants", to: "/chants" },
];

export const voiceOptions = ["Soprano", "Alto", "Ténor", "Basse"] as const;

export const categoriesMock: Category[] = [
  { id: "cat-adoration", name: "Adoration", description: "Chants de révérence et de contemplation" },
  { id: "cat-louange", name: "Louange", description: "Chants dynamiques de joie et célébration" },
  { id: "cat-grace", name: "Action de grâce", description: "Chants de remerciement et témoignage" },
  { id: "cat-priere", name: "Prière", description: "Moments de supplication et intercession" },
];

export const songsMock: Song[] = [
  {
    id: "song-001",
    number: "001",
    title: "Saint, Saint, Saint",
    author: "Reginald Heber",
    category: "Adoration",
    lyrics: "Saint, Saint, Saint est l'Éternel.\nToute la terre proclame sa majesté.\nNous élevons nos voix pour glorifier son nom.",
    createdAt: "2025-11-03",
  },
  {
    id: "song-012",
    number: "012",
    title: "Nous Te Louons",
    author: "Jean Mukendi",
    category: "Louange",
    lyrics: "Nous te louons Seigneur, Roi des siècles.\nTa bonté demeure à jamais.\nTon peuple chante avec reconnaissance.",
    createdAt: "2025-12-09",
  },
  {
    id: "song-018",
    number: "018",
    title: "Merci pour Ta Grâce",
    author: "Martha Nzambe",
    category: "Action de grâce",
    lyrics: "Merci pour ta grâce, merci pour ta paix.\nTu relèves nos coeurs et tu renouvelles nos forces.\nNous marchons par la foi dans ta lumière.",
    createdAt: "2026-01-05",
  },
  {
    id: "song-027",
    number: "027",
    title: "Dans Le Secret",
    author: "Samuel Kanku",
    category: "Prière",
    lyrics: "Dans le secret de ta présence, nous trouvons la paix.\nEntends nos prières, O Dieu fidèle.\nGuide ta chorale dans l'unité.",
    createdAt: "2026-01-16",
  },
  {
    id: "song-033",
    number: "033",
    title: "Joie Dans La Maison",
    author: "Nadine Kiala",
    category: "Louange",
    lyrics: "Il y a de la joie dans la maison du Seigneur.\nNos mains s'élèvent, nos coeurs s'ouvrent.\nNous célébrons son amour.",
    createdAt: "2026-02-11",
  },
  {
    id: "song-041",
    number: "041",
    title: "Tu Es Digne",
    author: "David Kalenga",
    category: "Adoration",
    lyrics: "Tu es digne de recevoir honneur et gloire.\nNos voix s'unissent comme une seule offrande.\nQue ton nom soit élevé à jamais.",
    createdAt: "2026-02-22",
  },
  {
    id: "song-052",
    number: "052",
    title: "Reconnaissance",
    author: "Rachel Mbuyi",
    category: "Action de grâce",
    lyrics: "Nous venons avec reconnaissance.\nTu as fait de grandes choses dans nos vies.\nTa fidélité traverse les générations.",
    createdAt: "2026-03-01",
  },
  {
    id: "song-067",
    number: "067",
    title: "Souffle de Vie",
    author: "Patrick Ilunga",
    category: "Prière",
    lyrics: "Souffle de vie, viens ranimer ton peuple.\nNous voulons marcher dans ta volonté.\nFais de nous des témoins fidèles.",
    createdAt: "2026-03-10",
  },
];

export const usersMock: User[] = [
  {
    id: "user-president",
    fullName: "Pasteur Emmanuel Kabeya",
    email: "president@chorale.local",
    role: "super_admin",
    choirVoice: "Basse",
    phone: "+243 990 000 101",
    joinedAt: "2024-01-10",
  },
  {
    id: "user-maitre",
    fullName: "Sarah Musafiri",
    email: "maitre@chorale.local",
    role: "maitre_chant",
    choirVoice: "Soprano",
    phone: "+243 990 000 102",
    joinedAt: "2024-02-14",
  },
  {
    id: "user-discipline",
    fullName: "Joseph Muteba",
    email: "discipline@chorale.local",
    role: "discipline_admin",
    choirVoice: "Ténor",
    phone: "+243 990 000 103",
    joinedAt: "2024-03-09",
  },
  {
    id: "user-choriste",
    fullName: "Grace Mumba",
    email: "choriste@chorale.local",
    role: "choriste",
    choirVoice: "Alto",
    phone: "+243 990 000 104",
    joinedAt: "2024-04-21",
  },
  {
    id: "user-choriste-2",
    fullName: "Nathan Kasongo",
    email: "nathan@chorale.local",
    role: "choriste",
    choirVoice: "Ténor",
    phone: "+243 990 000 105",
    joinedAt: "2025-05-06",
  },
];

export const favoritesMock: Favorite[] = [
  { id: "fav-1", userId: "user-president", songId: "song-041", createdAt: "2026-03-11" },
  { id: "fav-2", userId: "user-president", songId: "song-052", createdAt: "2026-03-13" },
  { id: "fav-3", userId: "user-maitre", songId: "song-012", createdAt: "2026-03-14" },
  { id: "fav-4", userId: "user-maitre", songId: "song-033", createdAt: "2026-03-15" },
  { id: "fav-5", userId: "user-discipline", songId: "song-027", createdAt: "2026-03-12" },
  { id: "fav-6", userId: "user-choriste", songId: "song-001", createdAt: "2026-03-09" },
  { id: "fav-7", userId: "user-choriste", songId: "song-067", createdAt: "2026-03-16" },
];

export const demoAccounts: Array<{ label: string; value: string }> = [
  { label: "Président (Super Admin)", value: "president@chorale.local" },
  { label: "Maître de chant", value: "maitre@chorale.local" },
  { label: "Directeur de discipline", value: "discipline@chorale.local" },
  { label: "Choriste", value: "choriste@chorale.local" },
];

export const authUsersMock: AuthUser[] = usersMock.map((user) => ({
  id: user.id,
  fullName: user.fullName,
  email: user.email,
  role: user.role,
  choirVoice: user.choirVoice,
}));

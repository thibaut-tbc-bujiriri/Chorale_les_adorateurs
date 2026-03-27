import { z } from "zod";

export const songSchema = z.object({
  number: z.string().min(1, "Le numéro est requis"),
  title: z.string().min(2, "Le titre est requis"),
  author: z.string().min(2, "L'auteur est requis"),
  category: z.string().min(1, "La catégorie est requise"),
  lyrics: z.string().min(10, "Les paroles doivent contenir au moins 10 caractères"),
});

export type SongSchema = z.infer<typeof songSchema>;

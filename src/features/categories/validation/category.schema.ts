import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  description: z.string().min(4, "La description est requise"),
});

export type CategorySchema = z.infer<typeof categorySchema>;

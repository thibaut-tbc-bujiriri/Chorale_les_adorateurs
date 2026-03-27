import { z } from "zod";

const roleSchema = z.enum(["super_admin", "maitre_chant", "discipline_admin", "choriste"]);
const voiceSchema = z.enum(["Soprano", "Alto", "Ténor", "Basse"]);

export const userSchema = z.object({
  fullName: z.string().min(3, "Le nom complet est requis"),
  email: z.string().email("Email invalide"),
  role: roleSchema,
  choirVoice: voiceSchema,
  phone: z.string().min(8, "Numéro invalide"),
  password: z
    .union([z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"), z.literal("")])
    .optional(),
});

export type UserSchema = z.infer<typeof userSchema>;

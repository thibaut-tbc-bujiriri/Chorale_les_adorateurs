import type { Role } from "@/types/role";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  choirVoice: "Soprano" | "Alto" | "Ténor" | "Basse";
  phone: string;
  joinedAt: string;
}

export interface UserPayload {
  fullName: string;
  email: string;
  role: Role;
  choirVoice: "Soprano" | "Alto" | "Ténor" | "Basse";
  phone: string;
}

export interface CreateUserPayload extends UserPayload {
  password: string;
}

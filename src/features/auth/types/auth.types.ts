import type { Role } from "@/types/role";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  choirVoice: "Soprano" | "Alto" | "Ténor" | "Basse";
  avatar?: string;
}

export interface LoginInput {
  identifier: string;
  password: string;
}

export interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  choirVoice?: "Soprano" | "Alto" | "Ténor" | "Basse";
}

export interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
}

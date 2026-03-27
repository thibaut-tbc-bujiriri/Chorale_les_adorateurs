import { supabase } from "@/lib/supabase";

import type { AuthUser, LoginInput } from "../types/auth.types";

interface ProfileRow {
  id: string;
  email: string;
  full_name: string;
  role: "super_admin" | "maitre_chant" | "discipline_admin" | "choriste";
  choir_voice: "Soprano" | "Alto" | "Ténor" | "Basse";
}

function mapProfileToAuthUser(profile: ProfileRow): AuthUser {
  return {
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name,
    role: profile.role,
    choirVoice: profile.choir_voice,
  };
}

function withTimeout<T>(promise: PromiseLike<T>, timeoutMs = 6000): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Délai de connexion dépassé")), timeoutMs);
    Promise.resolve(promise)
      .then((value) => {
        clearTimeout(timeout);
        resolve(value);
      })
      .catch((error: unknown) => {
        clearTimeout(timeout);
        reject(error);
      });
  });
}

async function getProfile(userId: string): Promise<AuthUser> {
  const response = await withTimeout(
    supabase
      .from("profiles")
      .select("id, email, full_name, role, choir_voice")
      .eq("id", userId)
      .single<ProfileRow>(),
  );

  const { data, error } = response as { data: ProfileRow | null; error: { message: string } | null };

  if (error || !data) {
    throw new Error(error?.message ?? "Profil introuvable");
  }

  return mapProfileToAuthUser(data);
}

async function login(input: LoginInput): Promise<AuthUser> {
  const authClient = supabase.auth as any;
  const response = await withTimeout(
    authClient.signInWithPassword({
      email: input.identifier,
      password: input.password,
    }),
  );

  const { data, error } = response as {
    data: { user: { id: string } | null };
    error: { message: string } | null;
  };

  if (error || !data.user) {
    throw new Error(error?.message ?? "Connexion impossible");
  }

  return getProfile(data.user.id);
}

async function logout() {
  const authClient = supabase.auth as any;
  const response = await withTimeout(authClient.signOut());
  const { error } = response as { error: { message: string } | null };

  if (error) {
    throw new Error(error.message);
  }
}

async function getCurrentUser(): Promise<AuthUser | null> {
  const authClient = supabase.auth as any;
  const response = await withTimeout(authClient.getSession());

  const {
    data: { session },
  } = response as {
    data: { session: { user?: { id: string } } | null };
  };

  if (!session?.user) return null;

  return getProfile(session.user.id);
}

function onAuthStateChange(callback: (user: AuthUser | null) => void) {
  const authClient = supabase.auth as any;
  const {
    data: { subscription },
  } = authClient.onAuthStateChange(async (_event: string, session: { user?: { id: string } } | null) => {
    if (!session?.user) {
      callback(null);
      return;
    }

    try {
      const profile = await getProfile(session.user.id);
      callback(profile);
    } catch {
      callback(null);
    }
  });

  return () => subscription.unsubscribe();
}

export const authService = {
  login,
  logout,
  getCurrentUser,
  onAuthStateChange,
};

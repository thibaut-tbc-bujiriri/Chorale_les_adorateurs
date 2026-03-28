import { supabase } from "@/lib/supabase";

import type { AuthUser, LoginInput, RegisterInput } from "../types/auth.types";

interface ProfileRow {
  id: string;
  email: string;
  full_name: string;
  role: "super_admin" | "maitre_chant" | "discipline_admin" | "choriste";
  choir_voice: "Soprano" | "Alto" | "Ténor" | "Basse";
}

interface AuthErrorLike {
  message?: string;
}

const AUTH_LOCK_STEAL_TEXT = "was released because another request stole it";
const PASSWORD_DIFFERENT_TEXT = "New password should be different from the old password";
const AUTH_USER_CACHE_KEY = "chorale_auth_user_cache_v1";

function mapProfileToAuthUser(profile: ProfileRow): AuthUser {
  return {
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name,
    role: profile.role,
    choirVoice: profile.choir_voice,
  };
}

function cacheAuthUser(user: AuthUser) {
  try {
    localStorage.setItem(AUTH_USER_CACHE_KEY, JSON.stringify(user));
  } catch {
    // Ignore storage errors (private mode, quota, etc.).
  }
}

function clearCachedAuthUser() {
  try {
    localStorage.removeItem(AUTH_USER_CACHE_KEY);
  } catch {
    // Ignore storage errors.
  }
}

function getCachedAuthUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_CACHE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as AuthUser;
    if (!parsed?.id || !parsed?.role || !parsed?.email) return null;

    return parsed;
  } catch {
    return null;
  }
}

function withTimeout<T>(promise: PromiseLike<T>, timeoutMs = 8000): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("TIMEOUT")), timeoutMs);
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

function normalizeAuthError(error: unknown, fallback = "Connexion impossible. Vérifiez vos informations.") {
  const message = (error as AuthErrorLike)?.message ?? "";
  if (message.includes("TIMEOUT")) return "Connexion impossible pour le moment. Réessayez.";
  if (message.includes(AUTH_LOCK_STEAL_TEXT)) return "Requête en cours de traitement. Veuillez réessayer.";
  if (message.includes(PASSWORD_DIFFERENT_TEXT)) return "Ce mot de passe a déjà été appliqué. Essayez d'en choisir un autre.";
  if (message.includes("Invalid login credentials")) return "Email ou mot de passe incorrect.";
  if (message.includes("Email not confirmed")) return "Veuillez confirmer votre email avant de vous connecter.";
  if (message.includes("Password should be at least")) return "Le mot de passe doit contenir au moins 6 caractères.";
  if (message.toLowerCase().includes("email rate limit exceeded")) {
    return "Limite d'envoi d'emails atteinte. Réessayez dans quelques minutes ou désactivez la confirmation email pour la création admin.";
  }
  return message || fallback;
}

function isAuthLockConflict(error: unknown) {
  const message = (error as AuthErrorLike)?.message ?? "";
  return message.includes(AUTH_LOCK_STEAL_TEXT);
}

function isPasswordDifferentError(error: unknown) {
  const message = (error as AuthErrorLike)?.message ?? "";
  return message.includes(PASSWORD_DIFFERENT_TEXT);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runWithAuthRetry<T>(operation: () => Promise<T>, retries = 2, timeoutMs = 8000): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await withTimeout(operation(), timeoutMs);
    } catch (error) {
      lastError = error;

      if (!isAuthLockConflict(error) || attempt === retries) {
        throw error;
      }

      await delay(120 * (attempt + 1));
    }
  }

  throw lastError;
}

async function getProfile(userId: string): Promise<AuthUser> {
  const response = await withTimeout(
    supabase
      .from("profiles")
      .select("id, email, full_name, role, choir_voice")
      .eq("id", userId)
      .limit(1),
  );

  const { data, error } = response as { data: ProfileRow[] | null; error: { message: string } | null };
  const profile = data?.[0] ?? null;

  if (error || !profile) {
    throw new Error(error?.message ?? "Profil introuvable.");
  }

  const mapped = mapProfileToAuthUser(profile);
  cacheAuthUser(mapped);
  return mapped;
}

async function login(input: LoginInput): Promise<AuthUser> {
  const authClient = supabase.auth as any;

  try {
    const response = await runWithAuthRetry(() =>
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
  } catch (error) {
    throw new Error(normalizeAuthError(error));
  }
}

async function register(input: RegisterInput): Promise<void> {
  const authClient = supabase.auth as any;

  try {
    const response = await runWithAuthRetry(() =>
      authClient.signUp({
        email: input.email,
        password: input.password,
        options: {
          data: {
            full_name: input.fullName,
            role: "choriste",
            choir_voice: input.choirVoice ?? "Soprano",
          },
        },
      }),
    );

    const { error } = response as { error: { message: string } | null };

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    const message = normalizeAuthError(error, "Inscription impossible. Réessayez.");
    if (message.includes("User already registered")) {
      throw new Error("Cet email est déjà utilisé.");
    }
    throw new Error(message);
  }
}

async function logout() {
  const authClient = supabase.auth as any;
  const response = await runWithAuthRetry(() => authClient.signOut());
  const { error } = response as { error: { message: string } | null };

  if (error) {
    throw new Error(error.message);
  }

  clearCachedAuthUser();
}

async function requestPasswordReset(email: string) {
  const authClient = supabase.auth as any;
  const redirectTo = `${window.location.origin}/reset-password`;

  try {
    const response = await runWithAuthRetry(
      () => authClient.resetPasswordForEmail(email, { redirectTo }),
      2,
      20000,
    );
    const { error } = response as { error: { message: string } | null };

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    throw new Error(normalizeAuthError(error, "Impossible d'envoyer l'email de réinitialisation."));
  }
}

async function resetPassword(newPassword: string) {
  const authClient = supabase.auth as any;

  try {
    // Password update can be slower on mobile networks; we allow a longer timeout
    // to avoid false negative UI errors when the update actually succeeds.
    const response = await runWithAuthRetry(
      () =>
        authClient.updateUser({
          password: newPassword,
        }),
      2,
      20000,
    );

    const { error } = response as { error: { message: string } | null };
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    // In some race conditions, Supabase can apply the password change and still
    // return this error message on a concurrent follow-up call.
    if (isPasswordDifferentError(error)) {
      return;
    }
    throw new Error(normalizeAuthError(error, "Réinitialisation du mot de passe impossible."));
  }
}

async function getCurrentUser(): Promise<AuthUser | null> {
  const authClient = supabase.auth as any;

  try {
    const response = await runWithAuthRetry(() => authClient.getSession());

    const {
      data: { session },
    } = response as {
      data: { session: { user?: { id: string } } | null };
    };

    if (!session?.user) {
      clearCachedAuthUser();
      return null;
    }

    try {
      return await getProfile(session.user.id);
    } catch {
      const cachedUser = getCachedAuthUser();
      if (cachedUser?.id === session.user.id) {
        return cachedUser;
      }
      return null;
    }
  } catch {
    return getCachedAuthUser();
  }
}

function onAuthStateChange(callback: (user: AuthUser | null) => void) {
  const authClient = supabase.auth as any;
  const {
    data: { subscription },
  } = authClient.onAuthStateChange(async (event: string, session: { user?: { id: string } } | null) => {
    if (!session?.user) {
      clearCachedAuthUser();
      callback(null);
      return;
    }

    try {
      const profile = await getProfile(session.user.id);
      callback(profile);
    } catch {
      const cachedUser = getCachedAuthUser();
      if (cachedUser?.id === session.user.id) {
        callback(cachedUser);
        return;
      }

      if (event === "SIGNED_OUT") {
        callback(null);
      }
    }
  });

  return () => subscription.unsubscribe();
}

export const authService = {
  login,
  register,
  requestPasswordReset,
  resetPassword,
  logout,
  getCurrentUser,
  getCachedAuthUser,
  onAuthStateChange,
};

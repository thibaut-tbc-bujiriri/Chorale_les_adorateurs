import { createIsolatedSupabaseClient, isSupabaseConfigured, supabase } from "@/lib/supabase";

import type { CreateUserPayload, User, UserPayload } from "../types/user.types";

interface UserRow {
  id: string;
  full_name: string;
  email: string;
  role: "super_admin" | "maitre_chant" | "discipline_admin" | "choriste";
  choir_voice: "Soprano" | "Alto" | "Ténor" | "Basse";
  phone: string | null;
  joined_at: string;
}

function mapUser(row: UserRow): User {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    role: row.role,
    choirVoice: row.choir_voice,
    phone: row.phone ?? "",
    joinedAt: row.joined_at,
  };
}

async function getAll() {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, choir_voice, phone, joined_at")
    .order("full_name", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []).map(mapUser);
}

async function getById(id: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, choir_voice, phone, joined_at")
    .eq("id", id)
    .single<UserRow>();

  if (error || !data) throw new Error(error?.message ?? "Utilisateur introuvable");
  return mapUser(data);
}

async function create(payload: CreateUserPayload) {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase non configuré dans .env");
  }

  const isolatedClient = createIsolatedSupabaseClient();
  const isolatedAuth = isolatedClient.auth as any;

  const { data: signUpData, error: signUpError } = await isolatedAuth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        full_name: payload.fullName,
        role: payload.role,
        choir_voice: payload.choirVoice,
        phone: payload.phone,
      },
    },
  });

  if (signUpError) {
    throw new Error(signUpError.message);
  }

  const createdUserId = signUpData.user?.id;

  let userId = createdUserId;
  if (!userId) {
    const { data: profileByEmail, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", payload.email)
      .single<{ id: string }>();

    if (profileError || !profileByEmail) {
      throw new Error("Compte créé mais profil introuvable. Vérifiez le trigger handle_new_user.");
    }

    userId = profileByEmail.id;
  }

  const { data: updatedProfile, error: updateError } = await supabase
    .from("profiles")
    .update({
      full_name: payload.fullName,
      role: payload.role,
      choir_voice: payload.choirVoice,
      phone: payload.phone,
    })
    .eq("id", userId)
    .select("id, full_name, email, role, choir_voice, phone, joined_at")
    .single<UserRow>();

  if (updateError || !updatedProfile) {
    throw new Error(updateError?.message ?? "Compte créé mais mise à jour du profil impossible");
  }

  return mapUser(updatedProfile);
}

async function update(id: string, payload: UserPayload) {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      full_name: payload.fullName,
      email: payload.email,
      role: payload.role,
      choir_voice: payload.choirVoice,
      phone: payload.phone,
    })
    .eq("id", id)
    .select("id, full_name, email, role, choir_voice, phone, joined_at")
    .single<UserRow>();

  if (error || !data) throw new Error(error?.message ?? "Mise à jour impossible");
  return mapUser(data);
}

async function remove(id: string) {
  const { error } = await supabase.from("profiles").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export const usersService = {
  getAll,
  getById,
  create,
  update,
  remove,
};

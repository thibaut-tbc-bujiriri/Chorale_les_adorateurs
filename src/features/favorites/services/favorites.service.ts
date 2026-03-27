import { supabase } from "@/lib/supabase";

import type { Favorite } from "../types/favorite.types";

interface FavoriteRow {
  id: string;
  user_id: string;
  song_id: string;
  created_at: string;
}

function mapFavorite(row: FavoriteRow): Favorite {
  return {
    id: row.id,
    userId: row.user_id,
    songId: row.song_id,
    createdAt: row.created_at,
  };
}

async function getByUser(userId: string) {
  const { data, error } = await supabase
    .from("favorites")
    .select("id, user_id, song_id, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map(mapFavorite);
}

async function toggle(userId: string, songId: string) {
  const { data: existing, error: existingError } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", userId)
    .eq("song_id", songId)
    .maybeSingle<{ id: string }>();

  if (existingError) throw new Error(existingError.message);

  if (existing?.id) {
    const { error } = await supabase.from("favorites").delete().eq("id", existing.id);
    if (error) throw new Error(error.message);
    return { active: false };
  }

  const { error } = await supabase.from("favorites").insert({
    user_id: userId,
    song_id: songId,
  });
  if (error) throw new Error(error.message);

  return { active: true };
}

export const favoritesService = {
  getByUser,
  toggle,
};

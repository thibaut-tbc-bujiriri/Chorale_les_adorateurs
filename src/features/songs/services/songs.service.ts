import { supabase } from "@/lib/supabase";

import type { Song, SongFilters, SongPayload } from "../types/song.types";

interface SongViewRow {
  id: string;
  number: string;
  title: string;
  author: string;
  category: string;
  lyrics: string;
  created_at: string;
}

interface SongTableRow {
  id: string;
  number: string;
  title: string;
  author: string;
  lyrics: string;
  created_at: string;
  categories: { name: string } | { name: string }[] | null;
}

interface CategoryLookupRow {
  id: string;
  name: string;
}

function mapSong(row: SongViewRow): Song {
  return {
    id: row.id,
    number: row.number,
    title: row.title,
    author: row.author,
    category: row.category,
    lyrics: row.lyrics,
    createdAt: row.created_at,
  };
}

function mapSongFromTable(row: SongTableRow): Song {
  const categoryValue = Array.isArray(row.categories) ? row.categories[0] : row.categories;

  return {
    id: row.id,
    number: row.number,
    title: row.title,
    author: row.author,
    category: categoryValue?.name ?? "Sans catégorie",
    lyrics: row.lyrics,
    createdAt: row.created_at,
  };
}

function applySongFilters(songs: Song[], filters?: Partial<SongFilters> & { search?: string }) {
  if (!filters) return songs;

  const normalizedSearch = filters.search?.trim().toLowerCase();

  return songs.filter((song) => {
    if (filters.category && song.category !== filters.category) return false;
    if (filters.author && !song.author.toLowerCase().includes(filters.author.toLowerCase())) return false;
    if (filters.number && !song.number.toLowerCase().includes(filters.number.toLowerCase())) return false;
    if (filters.lyrics && !song.lyrics.toLowerCase().includes(filters.lyrics.toLowerCase())) return false;

    if (!normalizedSearch) return true;

    const haystack = [song.number, song.title, song.author, song.category, song.lyrics].join(" ").toLowerCase();
    return haystack.includes(normalizedSearch);
  });
}

async function getCategoryIdByName(name: string) {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name")
    .eq("name", name)
    .limit(1);

  const category = data?.[0];

  if (error || !category) {
    throw new Error("Catégorie invalide ou introuvable");
  }

  return (category as CategoryLookupRow).id;
}

async function getAll(filters?: Partial<SongFilters> & { search?: string }) {
  let query = supabase
    .from("songs_view")
    .select("id, number, title, author, category, lyrics, created_at")
    .order("number", { ascending: true });

  if (filters?.category) {
    query = query.eq("category", filters.category);
  }
  if (filters?.author) {
    query = query.ilike("author", `%${filters.author}%`);
  }
  if (filters?.number) {
    query = query.ilike("number", `%${filters.number}%`);
  }
  if (filters?.lyrics) {
    query = query.ilike("lyrics", `%${filters.lyrics}%`);
  }
  if (filters?.search) {
    const safe = filters.search.replace(/,/g, " ");
    query = query.or(
      `number.ilike.%${safe}%,title.ilike.%${safe}%,author.ilike.%${safe}%,category.ilike.%${safe}%,lyrics.ilike.%${safe}%`,
    );
  }

  const { data, error } = await query;

  if (!error) {
    return (data ?? []).map(mapSong);
  }

  // Fallback if songs_view is not available or mismatched in current DB schema.
  const { data: fallbackData, error: fallbackError } = await supabase
    .from("songs")
    .select("id, number, title, author, lyrics, created_at, categories(name)")
    .order("number", { ascending: true });

  if (fallbackError) {
    throw new Error(error.message || fallbackError.message);
  }

  const mapped = (fallbackData ?? []).map((row) => mapSongFromTable(row as SongTableRow));
  return applySongFilters(mapped, filters);
}

async function getById(id: string) {
  const { data, error } = await supabase
    .from("songs_view")
    .select("id, number, title, author, category, lyrics, created_at")
    .eq("id", id)
    .limit(1);

  const song = data?.[0];

  if (!error && song) {
    return mapSong(song as SongViewRow);
  }

  const { data: fallbackData, error: fallbackError } = await supabase
    .from("songs")
    .select("id, number, title, author, lyrics, created_at, categories(name)")
    .eq("id", id)
    .limit(1);

  const fallbackSong = fallbackData?.[0];

  if (fallbackError || !fallbackSong) {
    throw new Error(error?.message ?? fallbackError?.message ?? "Chant introuvable");
  }

  return mapSongFromTable(fallbackSong as SongTableRow);
}

async function create(payload: SongPayload) {
  const categoryId = await getCategoryIdByName(payload.category);

  const { data, error } = await supabase
    .from("songs")
    .insert({
      number: payload.number,
      title: payload.title,
      author: payload.author,
      category_id: categoryId,
      lyrics: payload.lyrics,
    })
    .select("id")
    .limit(1);

  const createdSong = data?.[0];

  if (error || !createdSong) throw new Error(error?.message ?? "Création du chant impossible");
  return getById((createdSong as { id: string }).id);
}

async function update(id: string, payload: SongPayload) {
  const categoryId = await getCategoryIdByName(payload.category);

  const { error } = await supabase
    .from("songs")
    .update({
      number: payload.number,
      title: payload.title,
      author: payload.author,
      category_id: categoryId,
      lyrics: payload.lyrics,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  return getById(id);
}

async function remove(id: string) {
  const { error } = await supabase.from("songs").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export const songsService = {
  getAll,
  getById,
  create,
  update,
  remove,
};

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
  if (error) throw new Error(error.message);
  return (data ?? []).map(mapSong);
}

async function getById(id: string) {
  const { data, error } = await supabase
    .from("songs_view")
    .select("id, number, title, author, category, lyrics, created_at")
    .eq("id", id)
    .limit(1);

  const song = data?.[0];

  if (error || !song) throw new Error(error?.message ?? "Chant introuvable");
  return mapSong(song as SongViewRow);
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

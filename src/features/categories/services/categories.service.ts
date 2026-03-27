import { supabase } from "@/lib/supabase";

import type { Category, CategoryPayload } from "../types/category.types";

interface CategoryRow {
  id: string;
  name: string;
  description: string;
}

function mapCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
  };
}

async function getAll() {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, description")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []).map(mapCategory);
}

async function create(payload: CategoryPayload) {
  const { data, error } = await supabase
    .from("categories")
    .insert(payload)
    .select("id, name, description")
    .single<CategoryRow>();

  if (error || !data) throw new Error(error?.message ?? "Création impossible");
  return mapCategory(data);
}

async function update(id: string, payload: CategoryPayload) {
  const { data, error } = await supabase
    .from("categories")
    .update(payload)
    .eq("id", id)
    .select("id, name, description")
    .single<CategoryRow>();

  if (error || !data) throw new Error(error?.message ?? "Mise à jour impossible");
  return mapCategory(data);
}

async function remove(id: string) {
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export const categoriesService = {
  getAll,
  create,
  update,
  remove,
};

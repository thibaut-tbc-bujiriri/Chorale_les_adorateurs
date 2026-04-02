import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { categoriesService } from "../services/categories.service";

const CATEGORIES_CACHE_KEY = "chorale_cache_categories_v1";

function readCategoriesCache() {
  try {
    const raw = localStorage.getItem(CATEGORIES_CACHE_KEY);
    return raw ? (JSON.parse(raw) as Awaited<ReturnType<typeof categoriesService.getAll>>) : undefined;
  } catch {
    return undefined;
  }
}

function writeCategoriesCache(data: Awaited<ReturnType<typeof categoriesService.getAll>>) {
  try {
    localStorage.setItem(CATEGORIES_CACHE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage errors.
  }
}

export function useCategories() {
  const queryClient = useQueryClient();
  const cachedCategories = readCategoriesCache();

  const categoriesQuery = useQuery({
    queryKey: queryKeys.categories,
    queryFn: async () => {
      const data = await categoriesService.getAll();
      writeCategoriesCache(data);
      return data;
    },
    placeholderData: keepPreviousData,
    initialData: cachedCategories,
    initialDataUpdatedAt: cachedCategories ? Date.now() : undefined,
  });

  const createCategory = useMutation({
    mutationFn: categoriesService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.categories }),
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Parameters<typeof categoriesService.update>[1] }) =>
      categoriesService.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.categories }),
  });

  const deleteCategory = useMutation({
    mutationFn: categoriesService.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.categories }),
  });

  return { categoriesQuery, createCategory, updateCategory, deleteCategory };
}

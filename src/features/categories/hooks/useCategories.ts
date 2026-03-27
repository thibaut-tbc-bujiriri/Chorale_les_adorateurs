import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { categoriesService } from "../services/categories.service";

export function useCategories() {
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery({
    queryKey: queryKeys.categories,
    queryFn: categoriesService.getAll,
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

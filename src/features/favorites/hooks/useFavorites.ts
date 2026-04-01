import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { favoritesService } from "../services/favorites.service";

export function useFavorites(userId?: string) {
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery({
    queryKey: queryKeys.favorites(userId),
    queryFn: () => favoritesService.getByUser(userId ?? ""),
    enabled: Boolean(userId),
    placeholderData: keepPreviousData,
  });

  const toggleFavorite = useMutation({
    mutationFn: (songId: string) => favoritesService.toggle(userId ?? "", songId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.favorites(userId) }),
  });

  return { favoritesQuery, toggleFavorite };
}
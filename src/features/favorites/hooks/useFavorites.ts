import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { favoritesService } from "../services/favorites.service";

const FAVORITES_CACHE_PREFIX = "chorale_cache_favorites_v2";

function getFavoritesCacheKey(userId?: string) {
  return `${FAVORITES_CACHE_PREFIX}:${userId ?? "anonymous"}`;
}

function readFavoritesCache(userId?: string) {
  try {
    const raw = localStorage.getItem(getFavoritesCacheKey(userId));
    return raw ? (JSON.parse(raw) as Awaited<ReturnType<typeof favoritesService.getByUser>>) : undefined;
  } catch {
    return undefined;
  }
}

function writeFavoritesCache(userId: string | undefined, data: Awaited<ReturnType<typeof favoritesService.getByUser>>) {
  try {
    localStorage.setItem(getFavoritesCacheKey(userId), JSON.stringify(data));
  } catch {
    // Ignore storage errors.
  }
}

interface UseFavoritesOptions {
  enabled?: boolean;
}

export function useFavorites(userId?: string, options?: UseFavoritesOptions) {
  const queryClient = useQueryClient();
  const cachedFavorites = readFavoritesCache(userId);
  const isEnabled = options?.enabled ?? Boolean(userId);

  const favoritesQuery = useQuery({
    queryKey: queryKeys.favorites(userId),
    queryFn: async () => {
      const data = await favoritesService.getByUser(userId ?? "");
      writeFavoritesCache(userId, data);
      return data;
    },
    enabled: isEnabled,
    placeholderData: keepPreviousData,
    initialData: cachedFavorites,
    initialDataUpdatedAt: cachedFavorites ? Date.now() : undefined,
    refetchOnMount: "always",
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const toggleFavorite = useMutation({
    mutationFn: (songId: string) => favoritesService.toggle(userId ?? "", songId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.favorites(userId) });
    },
  });

  return { favoritesQuery, toggleFavorite };
}

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { songsService } from "../services/songs.service";
import type { SongFilters, SongPayload } from "../types/song.types";

const SONGS_CACHE_PREFIX = "chorale_cache_songs_v1";

function getSongsCacheKey(filters?: Partial<SongFilters> & { search?: string }) {
  return `${SONGS_CACHE_PREFIX}:${JSON.stringify(filters ?? {})}`;
}

function readSongsCache(filters?: Partial<SongFilters> & { search?: string }) {
  try {
    const raw = localStorage.getItem(getSongsCacheKey(filters));
    return raw ? (JSON.parse(raw) as Awaited<ReturnType<typeof songsService.getAll>>) : undefined;
  } catch {
    return undefined;
  }
}

function writeSongsCache(filters: Partial<SongFilters> & { search?: string } | undefined, data: Awaited<ReturnType<typeof songsService.getAll>>) {
  try {
    localStorage.setItem(getSongsCacheKey(filters), JSON.stringify(data));
  } catch {
    // Ignore storage errors.
  }
}

export function useSongs(filters?: Partial<SongFilters> & { search?: string }) {
  const queryClient = useQueryClient();
  const cachedSongs = readSongsCache(filters);

  const songsQuery = useQuery({
    queryKey: [...queryKeys.songs, filters ?? {}],
    queryFn: async () => {
      const data = await songsService.getAll(filters);
      writeSongsCache(filters, data);
      return data;
    },
    placeholderData: keepPreviousData,
    initialData: cachedSongs,
    initialDataUpdatedAt: cachedSongs ? Date.now() : undefined,
  });

  const createSong = useMutation({
    mutationFn: (payload: SongPayload) => songsService.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.songs }),
  });

  const updateSong = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: SongPayload }) => songsService.update(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.songs });
      queryClient.invalidateQueries({ queryKey: queryKeys.song(id) });
    },
  });

  const deleteSong = useMutation({
    mutationFn: (id: string) => songsService.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.songs }),
  });

  return { songsQuery, createSong, updateSong, deleteSong };
}

export function useSong(songId: string) {
  return useQuery({
    queryKey: queryKeys.song(songId),
    queryFn: () => songsService.getById(songId),
    enabled: Boolean(songId),
  });
}

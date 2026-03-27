import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { songsService } from "../services/songs.service";
import type { SongFilters, SongPayload } from "../types/song.types";

export function useSongs(filters?: Partial<SongFilters> & { search?: string }) {
  const queryClient = useQueryClient();

  const songsQuery = useQuery({
    queryKey: [...queryKeys.songs, filters ?? {}],
    queryFn: () => songsService.getAll(filters),
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

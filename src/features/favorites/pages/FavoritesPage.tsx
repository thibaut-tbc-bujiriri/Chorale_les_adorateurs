import { useMemo } from "react";

import { EmptyState } from "@/components/common/EmptyState";
import { Loader } from "@/components/common/Loader";
import { SongList } from "@/components/songs/SongList";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { useSongs } from "@/features/songs/hooks/useSongs";

export default function FavoritesPage() {
  const { user } = useAuth();
  const { favoritesQuery } = useFavorites(user?.id);
  const { songsQuery } = useSongs();

  const favoriteSongs = useMemo(() => {
    if (!favoritesQuery.data || !songsQuery.data) return [];
    const ids = new Set(favoritesQuery.data.map((favorite) => favorite.songId));
    return songsQuery.data.filter((song) => ids.has(song.id));
  }, [favoritesQuery.data, songsQuery.data]);

  if (favoritesQuery.isLoading || songsQuery.isLoading) {
    return <Loader label="Chargement des favoris..." />;
  }

  if (favoriteSongs.length === 0) {
    return (
      <EmptyState
        title="Aucun favori"
        description="Ajoutez des chants à vos favoris depuis la liste ou la page détail."
      />
    );
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Mes favoris</h1>
      <SongList songs={favoriteSongs} />
    </section>
  );
}

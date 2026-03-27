import { EmptyState } from "@/components/common/EmptyState";
import { SongCard } from "@/components/songs/SongCard";
import type { Song } from "@/features/songs/types/song.types";

export function SongList({ songs }: { songs: Song[] }) {
  if (songs.length === 0) {
    return (
      <EmptyState
        title="Aucun chant trouvé"
        description="Essayez d'ajuster votre recherche ou les filtres pour afficher des résultats."
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {songs.map((song) => (
        <SongCard key={song.id} song={song} />
      ))}
    </div>
  );
}

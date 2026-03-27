import { useParams } from "react-router-dom";

import { EmptyState } from "@/components/common/EmptyState";
import { Loader } from "@/components/common/Loader";
import { SongDetail } from "@/components/songs/SongDetail";
import { useSong } from "@/features/songs/hooks/useSongs";

export default function SongDetailPage() {
  const { id = "" } = useParams();
  const songQuery = useSong(id);

  if (songQuery.isLoading) return <Loader label="Chargement du chant..." />;
  if (songQuery.isError || !songQuery.data) {
    return (
      <EmptyState
        title="Chant introuvable"
        description="Le chant demandé n'existe pas ou n'est plus disponible."
      />
    );
  }

  return <SongDetail song={songQuery.data} />;
}

import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/common/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { Loader } from "@/components/common/Loader";
import { SongDetail } from "@/components/songs/SongDetail";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useSong } from "@/features/songs/hooks/useSongs";

export default function SongDetailPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const songQuery = useSong(id);

  if (!user) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Connexion requise</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Connectez-vous pour voir les détails complets de ce chant.
        </p>
        <Button className="mt-4" onClick={() => navigate("/login", { state: { from: { pathname: "/chants" } } })}>
          Se connecter
        </Button>
      </section>
    );
  }

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

import { Sparkles } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/common/Button";
import { Loader } from "@/components/common/Loader";
import { SongFilters } from "@/components/songs/SongFilters";
import { SongList } from "@/components/songs/SongList";
import { SongSearchBar } from "@/components/songs/SongSearchBar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useSongFilters } from "@/features/songs/hooks/useSongFilters";
import { useSongs } from "@/features/songs/hooks/useSongs";
import type { Song } from "@/features/songs/types/song.types";
import { useDebounce } from "@/hooks/useDebounce";

function filterSongsForGuest(songs: Song[], search: string, filters: { category: string; author: string; number: string; lyrics: string }) {
  const normalizedSearch = search.trim().toLowerCase();

  return songs.filter((song) => {
    if (filters.category && song.category !== filters.category) return false;
    if (filters.author && !song.author.toLowerCase().includes(filters.author.toLowerCase())) return false;
    if (filters.number && !song.number.toLowerCase().includes(filters.number.toLowerCase())) return false;
    if (filters.lyrics && !song.lyrics.toLowerCase().includes(filters.lyrics.toLowerCase())) return false;

    if (!normalizedSearch) return true;

    const haystack = [song.number, song.title, song.author, song.category, song.lyrics].join(" ").toLowerCase();
    return haystack.includes(normalizedSearch);
  });
}

export default function SongsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { search, setSearch, filters, updateFilter, payload, clearFilters } = useSongFilters();
  const debouncedSearch = useDebounce(search, 280);
  const isGuest = !user;

  const { categoriesQuery } = useCategories();
  const { songsQuery } = useSongs(isGuest ? undefined : { ...payload, search: debouncedSearch });

  const categories = categoriesQuery.data?.map((category) => category.name) ?? [];
  const songs = songsQuery.data ?? [];

  const visibleSongs = useMemo(() => {
    if (!isGuest) return songs;

    const firstFive = songs.slice(0, 5);
    return filterSongsForGuest(firstFive, debouncedSearch, filters);
  }, [isGuest, songs, debouncedSearch, filters]);

  if ((songsQuery.isPending && !songsQuery.data) || categoriesQuery.isLoading) {
    return <Loader label="Chargement des chants..." />;
  }

  return (
    <section className="space-y-4">
      <div className="rounded-3xl bg-halo p-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Répertoire des chants</h1>
        <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
          Recherchez rapidement un chant par numéro, titre, auteur, catégorie ou contenu des paroles.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-lg bg-white/80 px-3 py-1.5 text-xs text-slate-700 hover:bg-white"
          >
            Réinitialiser les filtres
          </button>
          <span className="inline-flex items-center gap-1 rounded-lg bg-white/80 px-3 py-1.5 text-xs text-slate-700">
            <Sparkles className="h-3.5 w-3.5" /> {visibleSongs.length} résultat(s)
          </span>
        </div>
      </div>

      <SongSearchBar value={search} onChange={setSearch} />
      {songsQuery.isFetching ? <p className="text-xs text-slate-500">Actualisation des résultats...</p> : null}
      <SongFilters filters={filters} categories={categories} onChange={updateFilter} />
      <SongList songs={visibleSongs} />

      {isGuest ? (
        <div className="rounded-2xl border border-brand-100 bg-white p-4 text-center dark:border-brand-900/40 dark:bg-slate-900">
          <p className="text-sm text-slate-700 dark:text-slate-200">
            Vous voyez les 5 premiers chants. Connectez-vous pour accéder à tout le répertoire.
          </p>
          <Button className="mt-3" onClick={() => navigate("/login", { state: { from: { pathname: "/chants" } } })}>
            Voir plus de chansons
          </Button>
        </div>
      ) : null}
    </section>
  );
}

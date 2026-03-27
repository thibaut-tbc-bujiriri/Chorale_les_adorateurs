import { Sparkles } from "lucide-react";

import { Loader } from "@/components/common/Loader";
import { SongFilters } from "@/components/songs/SongFilters";
import { SongList } from "@/components/songs/SongList";
import { SongSearchBar } from "@/components/songs/SongSearchBar";
import { useDebounce } from "@/hooks/useDebounce";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useSongFilters } from "@/features/songs/hooks/useSongFilters";
import { useSongs } from "@/features/songs/hooks/useSongs";

export default function SongsPage() {
  const { search, setSearch, filters, updateFilter, payload, clearFilters } = useSongFilters();
  const debouncedSearch = useDebounce(search, 280);

  const { categoriesQuery } = useCategories();
  const { songsQuery } = useSongs({ ...payload, search: debouncedSearch });

  if ((songsQuery.isPending && !songsQuery.data) || categoriesQuery.isLoading) {
    return <Loader label="Chargement des chants..." />;
  }

  const categories = categoriesQuery.data?.map((category) => category.name) ?? [];

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
            <Sparkles className="h-3.5 w-3.5" /> {songsQuery.data?.length ?? 0} résultat(s)
          </span>
        </div>
      </div>

      <SongSearchBar value={search} onChange={setSearch} />
      {songsQuery.isFetching ? <p className="text-xs text-slate-500">Actualisation des résultats...</p> : null}
      <SongFilters filters={filters} categories={categories} onChange={updateFilter} />
      <SongList songs={songsQuery.data ?? []} />
    </section>
  );
}

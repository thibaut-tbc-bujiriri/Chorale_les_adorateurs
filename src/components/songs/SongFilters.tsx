import type { SongFilters } from "@/features/songs/types/song.types";

interface SongFiltersProps {
  filters: SongFilters;
  categories: string[];
  onChange: <K extends keyof SongFilters>(key: K, value: SongFilters[K]) => void;
}

export function SongFilters({ filters, categories, onChange }: SongFiltersProps) {
  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-2 lg:grid-cols-4">
      <label className="space-y-1">
        <span className="text-xs text-slate-500">Catégorie</span>
        <select
          value={filters.category}
          onChange={(event) => onChange("category", event.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
        >
          <option value="">Toutes</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-1">
        <span className="text-xs text-slate-500">Auteur</span>
        <input
          value={filters.author}
          onChange={(event) => onChange("author", event.target.value)}
          placeholder="Ex: Jean"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
        />
      </label>

      <label className="space-y-1">
        <span className="text-xs text-slate-500">Numéro</span>
        <input
          value={filters.number}
          onChange={(event) => onChange("number", event.target.value)}
          placeholder="Ex: 012"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
        />
      </label>

      <label className="space-y-1">
        <span className="text-xs text-slate-500">Paroles</span>
        <input
          value={filters.lyrics}
          onChange={(event) => onChange("lyrics", event.target.value)}
          placeholder="mot-clé"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
        />
      </label>
    </div>
  );
}

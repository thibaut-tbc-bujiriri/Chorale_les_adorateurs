import { Search } from "lucide-react";

interface SongSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SongSearchBar({ value, onChange }: SongSearchBarProps) {
  return (
    <label className="relative block">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Rechercher par numéro, titre, auteur, catégorie, paroles..."
        className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm shadow-sm focus:border-brand-500 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900"
      />
    </label>
  );
}

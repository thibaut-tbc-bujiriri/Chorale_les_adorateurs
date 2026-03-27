import { useMemo, useState } from "react";

import type { SongFilters } from "../types/song.types";

const defaultFilters: SongFilters = {
  category: "",
  author: "",
  number: "",
  lyrics: "",
};

export function useSongFilters() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<SongFilters>(defaultFilters);

  const payload = useMemo(() => ({ ...filters, search }), [filters, search]);

  return {
    search,
    setSearch,
    filters,
    payload,
    updateFilter: <K extends keyof SongFilters>(key: K, value: SongFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    clearFilters: () => {
      setSearch("");
      setFilters(defaultFilters);
    },
  };
}

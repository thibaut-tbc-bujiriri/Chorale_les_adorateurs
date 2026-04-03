import { BarChart3, BookOpen, PieChart, Search, Star, TrendingUp, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { useSongs } from "@/features/songs/hooks/useSongs";
import { useUsers } from "@/features/users/hooks/useUsers";

const CHART_COLORS = ["#357352", "#4C9F70", "#84CC96", "#D97706", "#0EA5E9", "#8B5CF6"];

export default function AdminDashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { songsQuery } = useSongs();
  const { categoriesQuery } = useCategories();
  const { usersQuery } = useUsers();
  const { favoritesQuery } = useFavorites(user?.id, { enabled: Boolean(user) && !authLoading });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSongId, setSelectedSongId] = useState("");
  const [categorySearch, setCategorySearch] = useState("");

  const songs = songsQuery.data ?? [];
  const categories = categoriesQuery.data ?? [];
  const users = usersQuery.data ?? [];

  const totalFavorites = favoritesQuery.data?.length ?? 0;

  const byCategory = useMemo(
    () =>
      categories
        .map((category) => ({
          category: category.name,
          count: songs.filter((song) => song.category === category.name).length,
        }))
        .sort((a, b) => b.count - a.count),
    [categories, songs],
  );

  const totalSongsByCategory = useMemo(() => byCategory.reduce((sum, item) => sum + item.count, 0), [byCategory]);
  const maxCategoryCount = useMemo(() => Math.max(...byCategory.map((item) => item.count), 1), [byCategory]);

  const donutBackground = useMemo(() => {
    if (!byCategory.length || totalSongsByCategory <= 0) {
      return "conic-gradient(#e2e8f0 0 100%)";
    }

    let cursor = 0;
    const stops = byCategory.map((item, index) => {
      const percent = (item.count / totalSongsByCategory) * 100;
      const start = cursor;
      const end = cursor + percent;
      cursor = end;
      const color = CHART_COLORS[index % CHART_COLORS.length];
      return `${color} ${start}% ${end}%`;
    });

    return `conic-gradient(${stops.join(", ")})`;
  }, [byCategory, totalSongsByCategory]);

  useEffect(() => {
    if (!byCategory.length) {
      if (selectedCategory) setSelectedCategory("");
      return;
    }

    const hasSelectedCategory = byCategory.some((item) => item.category === selectedCategory);
    if (!selectedCategory || !hasSelectedCategory) {
      setSelectedCategory(byCategory[0].category);
    }
  }, [byCategory, selectedCategory]);

  const latestSongs = [...songs].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 4);

  const songsInSelectedCategory = songs.filter((song) => song.category === selectedCategory);
  const filteredSongsInSelectedCategory = useMemo(() => {
    const query = categorySearch.trim().toLowerCase();
    if (!query) return songsInSelectedCategory;

    return songsInSelectedCategory.filter((song) => {
      const haystack = [song.number, song.title, song.author, song.lyrics].join(" ").toLowerCase();
      return haystack.includes(query);
    });
  }, [categorySearch, songsInSelectedCategory]);

  const selectedSongDetails =
    filteredSongsInSelectedCategory.find((song) => song.id === selectedSongId) ?? filteredSongsInSelectedCategory[0] ?? null;

  useEffect(() => {
    if (!filteredSongsInSelectedCategory.length) {
      if (selectedSongId) setSelectedSongId("");
      return;
    }

    const selectedStillExists = filteredSongsInSelectedCategory.some((song) => song.id === selectedSongId);
    if (!selectedSongId || !selectedStillExists) {
      setSelectedSongId(filteredSongsInSelectedCategory[0].id);
    }
  }, [filteredSongsInSelectedCategory, selectedSongId]);

  const cards = [
    {
      label: "Total chants",
      value: songs.length,
      icon: BookOpen,
      accent: "from-emerald-500/15 to-emerald-700/5 border-emerald-200 dark:border-emerald-900/40",
    },
    {
      label: "Total catégories",
      value: categories.length,
      icon: BarChart3,
      accent: "from-sky-500/15 to-sky-700/5 border-sky-200 dark:border-sky-900/40",
    },
    {
      label: "Total utilisateurs",
      value: users.length,
      icon: Users,
      accent: "from-violet-500/15 to-violet-700/5 border-violet-200 dark:border-violet-900/40",
    },
    {
      label: "Total favoris",
      value: totalFavorites,
      icon: Star,
      accent: "from-amber-500/15 to-amber-700/5 border-amber-200 dark:border-amber-900/40",
    },
  ];

  const isRefreshing = songsQuery.isFetching || categoriesQuery.isFetching || usersQuery.isFetching || favoritesQuery.isFetching;
  const loadError =
    (songsQuery.error instanceof Error && songsQuery.error.message) ||
    (categoriesQuery.error instanceof Error && categoriesQuery.error.message) ||
    (usersQuery.error instanceof Error && usersQuery.error.message) ||
    (favoritesQuery.error instanceof Error && favoritesQuery.error.message) ||
    null;

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Dashboard admin</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">Vue globale de l'activité de la chorale.</p>
        {isRefreshing ? <p className="mt-1 text-xs text-slate-500">Actualisation en cours...</p> : null}
        {loadError ? (
          <p className="mt-2 rounded-lg bg-rose-100 px-3 py-2 text-sm text-rose-700 dark:bg-rose-950/30 dark:text-rose-200">
            Impossible de synchroniser les données: {loadError}
          </p>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.label}
              className={`rounded-2xl border bg-gradient-to-br p-5 shadow-sm backdrop-blur dark:bg-slate-900 ${card.accent}`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600 dark:text-slate-300">{card.label}</p>
                <Icon className="h-4 w-4 text-brand-700 dark:text-brand-300" />
              </div>
              <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-slate-100">{card.value}</p>
            </article>
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 xl:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Diagramme de répartition par catégorie</h2>
            <TrendingUp className="h-4 w-4 text-brand-600" />
          </div>
          <div className="mt-4 space-y-3">
            {byCategory.map((item, index) => {
              const widthPercent = Math.max(6, Math.round((item.count / maxCategoryCount) * 100));
              const percent = totalSongsByCategory > 0 ? Math.round((item.count / totalSongsByCategory) * 100) : 0;
              const color = CHART_COLORS[index % CHART_COLORS.length];

              return (
                <div key={item.category} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <p className="font-medium text-slate-700 dark:text-slate-200">{item.category}</p>
                    <p className="text-slate-500">
                      {item.count} chant(s) · {percent}%
                    </p>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-2.5 rounded-full"
                      style={{ width: `${widthPercent}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Diagramme circulaire</h2>
            <PieChart className="h-4 w-4 text-brand-600" />
          </div>
          <div className="mt-4 grid place-items-center">
            <div
              className="relative h-44 w-44 rounded-full"
              style={{ background: donutBackground }}
            >
              <div className="absolute inset-6 grid place-items-center rounded-full bg-white text-center dark:bg-slate-900">
                <p className="text-xs text-slate-500">Total</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{songs.length}</p>
              </div>
            </div>
          </div>
          <ul className="mt-4 grid gap-2">
            {byCategory.map((item, index) => (
              <li key={item.category} className="flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-200">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                  />
                  {item.category}
                </span>
                <span className="text-slate-500">{item.count}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold">Derniers chants ajoutés</h2>
          <ul className="mt-3 space-y-2">
            {latestSongs.map((song) => (
              <li key={song.id} className="rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-slate-800/80">
                <span className="font-medium">{song.title}</span> · {song.author}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold">Catégories de chants</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {byCategory.map((item) => {
              const isActive = item.category === selectedCategory;

              return (
                <button
                  key={item.category}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(item.category);
                    setCategorySearch("");
                  }}
                  className={`rounded-xl border px-4 py-3 text-left transition ${
                    isActive
                      ? "border-brand-400 bg-brand-50 text-brand-800 dark:border-brand-500 dark:bg-brand-900/30 dark:text-brand-100"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:border-brand-300 hover:bg-brand-50/60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  }`}
                >
                  <p className="text-sm font-semibold">{item.category}</p>
                  <p className="mt-1 text-xs">{item.count} chant(s)</p>
                </button>
              );
            })}
          </div>
        </article>
      </div>

      <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold">Chants de la catégorie: {selectedCategory || "-"}</h2>
          <label className="relative block w-full sm:w-80">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={categorySearch}
              onChange={(event) => setCategorySearch(event.target.value)}
              placeholder="Rechercher dans cette catégorie..."
              className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm outline-none ring-brand-300 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-900"
            />
          </label>
        </div>

        {selectedCategory ? (
          filteredSongsInSelectedCategory.length ? (
            <div className="mt-3 grid gap-3 lg:grid-cols-[1.1fr_1fr]">
              <ul className="grid max-h-[30rem] gap-2 overflow-y-auto pr-1">
                {filteredSongsInSelectedCategory.map((song) => {
                  const isActive = selectedSongDetails?.id === song.id;

                  return (
                    <li key={song.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedSongId(song.id)}
                        className={`w-full rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                          isActive
                            ? "border-brand-400 bg-brand-50 shadow-sm dark:border-brand-500 dark:bg-brand-900/30"
                            : "border-transparent bg-slate-50 hover:border-brand-300 hover:bg-brand-50/60 dark:bg-slate-800/80"
                        }`}
                      >
                        <p className="font-medium text-slate-900 dark:text-slate-100">{song.title}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-300">N° {song.number} · {song.author}</p>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {selectedSongDetails ? (
                <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-brand-50/80 to-white p-4 dark:border-slate-700 dark:from-brand-900/20 dark:to-slate-900">
                  <p className="text-xs text-slate-500">Chant N° {selectedSongDetails.number}</p>
                  <h3 className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-100">{selectedSongDetails.title}</h3>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                    {selectedSongDetails.author} · {selectedSongDetails.category}
                  </p>
                  <p className="mt-3 line-clamp-10 whitespace-pre-line text-sm leading-6 text-slate-700 dark:text-slate-200">
                    {selectedSongDetails.lyrics}
                  </p>
                  <Link
                    to={`/chants/${selectedSongDetails.id}`}
                    className="mt-3 inline-block text-sm font-medium text-brand-700 hover:underline dark:text-brand-300"
                  >
                    Voir la fiche complète
                  </Link>
                </div>
              ) : null}
            </div>
          ) : (
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Aucun chant ne correspond à cette recherche.</p>
          )
        ) : (
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Choisissez une catégorie pour afficher ses chants.</p>
        )}
      </article>
    </section>
  );
}

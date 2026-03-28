import { BarChart3, BookOpen, Star, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Loader } from "@/components/common/Loader";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useSongs } from "@/features/songs/hooks/useSongs";
import { useUsers } from "@/features/users/hooks/useUsers";

export default function AdminDashboardPage() {
  const { songsQuery } = useSongs();
  const { categoriesQuery } = useCategories();
  const { usersQuery } = useUsers();
  const [selectedCategory, setSelectedCategory] = useState("");

  const songs = songsQuery.data ?? [];
  const categories = categoriesQuery.data ?? [];
  const users = usersQuery.data ?? [];

  const totalFavorites = useMemo(() => {
    const raw = localStorage.getItem("chorale_favorites");
    if (!raw) return 0;
    return (JSON.parse(raw) as Array<{ id: string }>).length;
  }, []);

  const byCategory = categories
    .map((category) => ({
      category: category.name,
      count: songs.filter((song) => song.category === category.name).length,
    }))
    .sort((a, b) => b.count - a.count);

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

  const cards = [
    { label: "Total chants", value: songs.length, icon: BookOpen },
    { label: "Total catégories", value: categories.length, icon: BarChart3 },
    { label: "Total utilisateurs", value: users.length, icon: Users },
    { label: "Total favoris", value: totalFavorites, icon: Star },
  ];

  if (songsQuery.isLoading || categoriesQuery.isLoading || usersQuery.isLoading) {
    return <Loader label="Chargement du dashboard..." />;
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Dashboard admin</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">Vue globale de l'activité de la chorale.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600 dark:text-slate-300">{card.label}</p>
                <Icon className="h-4 w-4 text-brand-600" />
              </div>
              <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-slate-100">{card.value}</p>
            </article>
          );
        })}
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
                  onClick={() => setSelectedCategory(item.category)}
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
        <h2 className="text-lg font-semibold">Chants de la catégorie: {selectedCategory || "-"}</h2>
        {selectedCategory ? (
          songsInSelectedCategory.length ? (
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {songsInSelectedCategory.map((song) => (
                <li key={song.id} className="rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-slate-800/80">
                  <p className="font-medium text-slate-900 dark:text-slate-100">{song.title}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">N° {song.number} · {song.author}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Aucun chant trouvé dans cette catégorie.</p>
          )
        ) : (
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Choisissez une catégorie pour afficher ses chants.</p>
        )}
      </article>
    </section>
  );
}

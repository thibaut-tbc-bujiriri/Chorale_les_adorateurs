import { BarChart3, BookOpen, Star, Users } from "lucide-react";
import { useMemo } from "react";

import { Loader } from "@/components/common/Loader";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useSongs } from "@/features/songs/hooks/useSongs";
import { useUsers } from "@/features/users/hooks/useUsers";

export default function AdminDashboardPage() {
  const { songsQuery } = useSongs();
  const { categoriesQuery } = useCategories();
  const { usersQuery } = useUsers();

  const totalFavorites = useMemo(() => {
    const raw = localStorage.getItem("chorale_favorites");
    if (!raw) return 0;
    return (JSON.parse(raw) as Array<{ id: string }>).length;
  }, []);

  if (songsQuery.isLoading || categoriesQuery.isLoading || usersQuery.isLoading) {
    return <Loader label="Chargement du dashboard..." />;
  }

  const songs = songsQuery.data ?? [];
  const categories = categoriesQuery.data ?? [];
  const users = usersQuery.data ?? [];

  const byCategory = categories
    .map((category) => ({
      category: category.name,
      count: songs.filter((song) => song.category === category.name).length,
    }))
    .sort((a, b) => b.count - a.count);

  const latestSongs = [...songs].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 4);

  const cards = [
    { label: "Total chants", value: songs.length, icon: BookOpen },
    { label: "Total catégories", value: categories.length, icon: BarChart3 },
    { label: "Total utilisateurs", value: users.length, icon: Users },
    { label: "Total favoris", value: totalFavorites, icon: Star },
  ];

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
          <h2 className="text-lg font-semibold">Répartition par catégories</h2>
          <div className="mt-4 space-y-3">
            {byCategory.map((item) => (
              <div key={item.category}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{item.category}</span>
                  <span>{item.count}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-brand-500"
                    style={{ width: `${songs.length ? (item.count / songs.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

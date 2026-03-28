import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/common/Button";
import { FavoriteButton } from "@/components/songs/FavoriteButton";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { Song } from "@/features/songs/types/song.types";

export function SongCard({ song }: { song: Song }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-lg bg-brand-100 px-2 py-1 text-xs font-medium text-brand-800 dark:bg-brand-900/50 dark:text-brand-100">
          N° {song.number}
        </span>
        <span className="text-xs text-slate-500">{song.category}</span>
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{song.title}</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{song.author}</p>
      <p className="mt-3 line-clamp-3 text-sm text-slate-600 dark:text-slate-400">{song.lyrics}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {user ? (
          <Link
            to={`/chants/${song.id}`}
            className="rounded-xl bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            Voir le détail
          </Link>
        ) : (
          <Button variant="secondary" onClick={() => navigate("/login", { state: { from: { pathname: "/chants" } } })}>
            Se connecter pour voir le détail
          </Button>
        )}
        <FavoriteButton songId={song.id} />
      </div>
    </article>
  );
}

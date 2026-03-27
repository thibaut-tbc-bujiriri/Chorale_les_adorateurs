import { FavoriteButton } from "@/components/songs/FavoriteButton";
import type { Song } from "@/features/songs/types/song.types";

export function SongDetail({ song }: { song: Song }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">Chant N° {song.number}</p>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{song.title}</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {song.author} · {song.category}
          </p>
        </div>
        <FavoriteButton songId={song.id} />
      </div>

      <div className="mt-6 whitespace-pre-line rounded-xl bg-slate-50 p-4 text-[15px] leading-7 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
        {song.lyrics}
      </div>
    </article>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/common/Button";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { EmptyState } from "@/components/common/EmptyState";
import { Loader } from "@/components/common/Loader";
import { useSongs } from "@/features/songs/hooks/useSongs";
import type { Song } from "@/features/songs/types/song.types";

export default function AdminSongsPage() {
  const { songsQuery, deleteSong } = useSongs();
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  if (songsQuery.isLoading) return <Loader label="Chargement des chants..." />;

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Gestion des chants</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">Ajoutez, modifiez ou supprimez les chants disponibles.</p>
        </div>
        <Link to="/admin/chants/new">
          <Button>Nouveau chant</Button>
        </Link>
      </div>

      {songsQuery.data?.length ? (
        <div className="space-y-3">
          <div className="grid gap-3 md:hidden">
            {songsQuery.data.map((song) => (
              <article key={song.id} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-xs text-slate-500">N° {song.number}</p>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{song.title}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{song.author}</p>
                <p className="mt-1 text-xs text-slate-500">{song.category}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link to={`/admin/chants/${song.id}/edit`}>
                    <Button variant="secondary">Modifier</Button>
                  </Link>
                  <Button variant="danger" onClick={() => setSelectedSong(song)}>
                    Supprimer
                  </Button>
                </div>
              </article>
            ))}
          </div>

          <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white md:block dark:border-slate-800 dark:bg-slate-900">
          <table className="min-w-[760px] text-sm">
            <thead className="bg-slate-50 text-left text-slate-600 dark:bg-slate-800/70 dark:text-slate-300">
              <tr>
                <th className="px-4 py-3">Numéro</th>
                <th className="px-4 py-3">Titre</th>
                <th className="px-4 py-3">Auteur</th>
                <th className="px-4 py-3">Catégorie</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {songsQuery.data.map((song) => (
                <tr key={song.id} className="border-t border-slate-200 dark:border-slate-800">
                  <td className="px-4 py-3">{song.number}</td>
                  <td className="px-4 py-3 font-medium">{song.title}</td>
                  <td className="px-4 py-3">{song.author}</td>
                  <td className="px-4 py-3">{song.category}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/chants/${song.id}/edit`}>
                        <Button variant="secondary">Modifier</Button>
                      </Link>
                      <Button variant="danger" onClick={() => setSelectedSong(song)}>
                        Supprimer
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      ) : (
        <EmptyState title="Aucun chant" description="Créez votre premier chant depuis l'espace admin." />
      )}

      <ConfirmDialog
        isOpen={Boolean(selectedSong)}
        title="Supprimer ce chant ?"
        description={`Le chant \"${selectedSong?.title ?? ""}\" sera retiré de la liste.`}
        confirmLabel="Supprimer"
        onCancel={() => setSelectedSong(null)}
        onConfirm={() => {
          if (!selectedSong) return;
          deleteSong.mutate(selectedSong.id);
          setSelectedSong(null);
        }}
      />
    </section>
  );
}

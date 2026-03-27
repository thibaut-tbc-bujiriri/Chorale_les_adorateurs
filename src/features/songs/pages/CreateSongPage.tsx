import { useNavigate } from "react-router-dom";

import { SongForm } from "@/components/songs/SongForm";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useSongs } from "@/features/songs/hooks/useSongs";
import type { SongSchema } from "@/features/songs/validation/song.schema";

export default function CreateSongPage() {
  const navigate = useNavigate();
  const { categoriesQuery } = useCategories();
  const { createSong } = useSongs();

  const categories = categoriesQuery.data?.map((category) => category.name) ?? [];

  const onSubmit = async (values: SongSchema) => {
    await createSong.mutateAsync(values);
    navigate("/admin/chants");
  };

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Créer un chant</h1>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <SongForm categories={categories} onSubmit={onSubmit} isSubmitting={createSong.isPending} />
      </div>
    </section>
  );
}

import { useNavigate, useParams } from "react-router-dom";

import { Loader } from "@/components/common/Loader";
import { SongForm } from "@/components/songs/SongForm";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useSong, useSongs } from "@/features/songs/hooks/useSongs";
import type { SongSchema } from "@/features/songs/validation/song.schema";

export default function EditSongPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const songQuery = useSong(id);
  const { categoriesQuery } = useCategories();
  const { updateSong } = useSongs();

  if (songQuery.isLoading || categoriesQuery.isLoading) return <Loader label="Chargement du formulaire..." />;
  if (!songQuery.data) return null;

  const categories = categoriesQuery.data?.map((category) => category.name) ?? [];

  const onSubmit = async (values: SongSchema) => {
    await updateSong.mutateAsync({ id, payload: values });
    navigate("/admin/chants");
  };

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Modifier un chant</h1>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <SongForm
          categories={categories}
          defaultValues={{
            number: songQuery.data.number,
            title: songQuery.data.title,
            author: songQuery.data.author,
            category: songQuery.data.category,
            lyrics: songQuery.data.lyrics,
          }}
          onSubmit={onSubmit}
          isSubmitting={updateSong.isPending}
        />
      </div>
    </section>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { songSchema, type SongSchema } from "@/features/songs/validation/song.schema";

interface SongFormProps {
  defaultValues?: SongSchema;
  categories: string[];
  onSubmit: (values: SongSchema) => Promise<void> | void;
  isSubmitting?: boolean;
}

export function SongForm({ defaultValues, categories, onSubmit, isSubmitting }: SongFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SongSchema>({
    resolver: zodResolver(songSchema),
    defaultValues: defaultValues ?? {
      number: "",
      title: "",
      author: "",
      category: categories[0] ?? "",
      lyrics: "",
    },
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Numéro" {...register("number")} error={errors.number?.message} />
        <Input label="Titre" {...register("title")} error={errors.title?.message} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Auteur" {...register("author")} error={errors.author?.message} />
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Catégorie</span>
          <select className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900" {...register("category")}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category ? <p className="text-xs text-rose-600">{errors.category.message}</p> : null}
        </label>
      </div>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Paroles</span>
        <textarea
          rows={10}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm leading-7 dark:border-slate-700 dark:bg-slate-900"
          {...register("lyrics")}
        />
        {errors.lyrics ? <p className="text-xs text-rose-600">{errors.lyrics.message}</p> : null}
      </label>

      <Button type="submit" isLoading={isSubmitting}>
        Enregistrer le chant
      </Button>
    </form>
  );
}

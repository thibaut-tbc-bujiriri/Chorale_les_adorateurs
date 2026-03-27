import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { categorySchema, type CategorySchema } from "@/features/categories/validation/category.schema";

interface CategoryFormProps {
  defaultValues?: CategorySchema;
  onSubmit: (values: CategorySchema) => Promise<void> | void;
  isSubmitting?: boolean;
}

export function CategoryForm({ defaultValues, onSubmit, isSubmitting }: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: defaultValues ?? { name: "", description: "" },
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input label="Nom" {...register("name")} error={errors.name?.message} />
      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Description</span>
        <textarea
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
          rows={3}
          {...register("description")}
        />
        {errors.description ? <p className="text-xs text-rose-600">{errors.description.message}</p> : null}
      </label>
      <Button type="submit" isLoading={isSubmitting}>
        Enregistrer
      </Button>
    </form>
  );
}

import { useState } from "react";

import { CategoryForm } from "@/components/categories/CategoryForm";
import { Button } from "@/components/common/Button";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { Loader } from "@/components/common/Loader";
import { Modal } from "@/components/common/Modal";
import { useCategories } from "@/features/categories/hooks/useCategories";
import type { Category } from "@/features/categories/types/category.types";
import type { CategorySchema } from "@/features/categories/validation/category.schema";

export default function CategoriesAdminPage() {
  const { categoriesQuery, createCategory, updateCategory, deleteCategory } = useCategories();
  const [editing, setEditing] = useState<Category | null>(null);
  const [toDelete, setToDelete] = useState<Category | null>(null);
  const [isCreateOpen, setCreateOpen] = useState(false);

  if (categoriesQuery.isLoading) return <Loader label="Chargement des catégories..." />;

  const onCreate = async (values: CategorySchema) => {
    await createCategory.mutateAsync(values);
    setCreateOpen(false);
  };

  const onUpdate = async (values: CategorySchema) => {
    if (!editing) return;
    await updateCategory.mutateAsync({ id: editing.id, payload: values });
    setEditing(null);
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gestion des catégories</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">Organisez les chants par type d'usage liturgique.</p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>Nouvelle catégorie</Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {(categoriesQuery.data ?? []).map((category) => (
          <article key={category.id} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">{category.name}</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{category.description}</p>
            <div className="mt-4 flex gap-2">
              <Button variant="secondary" onClick={() => setEditing(category)}>
                Modifier
              </Button>
              <Button variant="danger" onClick={() => setToDelete(category)}>
                Supprimer
              </Button>
            </div>
          </article>
        ))}
      </div>

      <Modal isOpen={isCreateOpen} onClose={() => setCreateOpen(false)} title="Créer une catégorie">
        <CategoryForm onSubmit={onCreate} isSubmitting={createCategory.isPending} />
      </Modal>

      <Modal isOpen={Boolean(editing)} onClose={() => setEditing(null)} title="Modifier la catégorie">
        {editing ? (
          <CategoryForm
            defaultValues={{ name: editing.name, description: editing.description }}
            onSubmit={onUpdate}
            isSubmitting={updateCategory.isPending}
          />
        ) : null}
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(toDelete)}
        title="Supprimer la catégorie ?"
        description={`La catégorie \"${toDelete?.name ?? ""}\" sera supprimée.`}
        confirmLabel="Supprimer"
        onCancel={() => setToDelete(null)}
        onConfirm={() => {
          if (!toDelete) return;
          deleteCategory.mutate(toDelete.id);
          setToDelete(null);
        }}
      />
    </section>
  );
}

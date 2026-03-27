import { useState } from "react";

import { Button } from "@/components/common/Button";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { Loader } from "@/components/common/Loader";
import { Modal } from "@/components/common/Modal";
import { UserForm } from "@/components/users/UserForm";
import { UserTable } from "@/components/users/UserTable";
import { useUsers } from "@/features/users/hooks/useUsers";
import type { CreateUserPayload, User, UserPayload } from "@/features/users/types/user.types";
import type { UserSchema } from "@/features/users/validation/user.schema";

export default function UsersAdminPage() {
  const { usersQuery, createUser, updateUser, deleteUser } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [toDelete, setToDelete] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isCreateOpen, setCreateOpen] = useState(false);

  if (usersQuery.isLoading) return <Loader label="Chargement des utilisateurs..." />;

  const handleCreate = async (values: UserSchema) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!values.password || values.password.length < 6) {
      setErrorMessage("Le mot de passe initial est requis (min 6 caractères).");
      return;
    }

    const payload: CreateUserPayload = {
      fullName: values.fullName,
      email: values.email,
      role: values.role,
      choirVoice: values.choirVoice,
      phone: values.phone,
      password: values.password,
    };

    try {
      await createUser.mutateAsync(payload);
      setSuccessMessage("Utilisateur créé avec succès.");
      setCreateOpen(false);
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  const handleUpdate = async (values: UserSchema) => {
    if (!selectedUser) return;
    setErrorMessage(null);
    setSuccessMessage(null);

    const payload: UserPayload = {
      fullName: values.fullName,
      email: values.email,
      role: values.role,
      choirVoice: values.choirVoice,
      phone: values.phone,
    };

    try {
      await updateUser.mutateAsync({ id: selectedUser.id, payload });
      setSuccessMessage("Utilisateur mis à jour avec succès.");
      setSelectedUser(null);
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Gestion des utilisateurs</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">Gérez les profils et les rôles de la chorale.</p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>Nouvel utilisateur</Button>
      </div>

      <p className="rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        En tant que super_admin, vous pouvez créer un compte directement ici (email + mot de passe initial).
      </p>

      {successMessage ? (
        <p className="rounded-lg bg-emerald-100 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200">
          {successMessage}
        </p>
      ) : null}

      {errorMessage ? (
        <p className="rounded-lg bg-rose-100 px-3 py-2 text-sm text-rose-700 dark:bg-rose-950/30 dark:text-rose-200">
          {errorMessage}
        </p>
      ) : null}

      <UserTable users={usersQuery.data ?? []} onEdit={setSelectedUser} onDelete={setToDelete} />

      <Modal isOpen={isCreateOpen} onClose={() => setCreateOpen(false)} title="Créer un utilisateur">
        <UserForm mode="create" onSubmit={handleCreate} isSubmitting={createUser.isPending} />
      </Modal>

      <Modal isOpen={Boolean(selectedUser)} onClose={() => setSelectedUser(null)} title="Modifier l'utilisateur">
        {selectedUser ? (
          <UserForm
            mode="edit"
            defaultValues={{
              fullName: selectedUser.fullName,
              email: selectedUser.email,
              role: selectedUser.role,
              choirVoice: selectedUser.choirVoice,
              phone: selectedUser.phone,
              password: "",
            }}
            onSubmit={handleUpdate}
            isSubmitting={updateUser.isPending}
          />
        ) : null}
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(toDelete)}
        title="Supprimer cet utilisateur ?"
        description={`Le profil de ${toDelete?.fullName ?? ""} sera supprimé.`}
        confirmLabel="Supprimer"
        onCancel={() => setToDelete(null)}
        onConfirm={() => {
          if (!toDelete) return;
          deleteUser.mutate(toDelete.id, {
            onSuccess: () => setSuccessMessage("Profil supprimé avec succès."),
            onError: (error) => setErrorMessage((error as Error).message),
          });
          setToDelete(null);
        }}
      />
    </section>
  );
}

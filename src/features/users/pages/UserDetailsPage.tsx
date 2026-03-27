import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import { EmptyState } from "@/components/common/EmptyState";
import { Loader } from "@/components/common/Loader";
import { RoleBadge } from "@/components/users/RoleBadge";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { useUser } from "@/features/users/hooks/useUsers";
import { formatDate } from "@/lib/utils";

export default function UserDetailsPage() {
  const { id = "" } = useParams();
  const userQuery = useUser(id);
  const { favoritesQuery } = useFavorites(id);

  const favoriteCount = useMemo(() => favoritesQuery.data?.length ?? 0, [favoritesQuery.data]);

  if (userQuery.isLoading || favoritesQuery.isLoading) return <Loader label="Chargement du profil..." />;

  if (!userQuery.data) {
    return <EmptyState title="Utilisateur introuvable" description="Aucun utilisateur ne correspond à cet identifiant." />;
  }

  return (
    <section className="space-y-4">
      <Link to="/admin/utilisateurs" className="text-sm text-brand-600 hover:underline">
        ← Retour à la liste
      </Link>
      <article className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{userQuery.data.fullName}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <RoleBadge role={userQuery.data.role} />
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {userQuery.data.choirVoice}
          </span>
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Email</dt>
            <dd className="text-sm text-slate-800 dark:text-slate-100">{userQuery.data.email}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Téléphone</dt>
            <dd className="text-sm text-slate-800 dark:text-slate-100">{userQuery.data.phone}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Date d'inscription</dt>
            <dd className="text-sm text-slate-800 dark:text-slate-100">{formatDate(userQuery.data.joinedAt)}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-500">Favoris enregistrés</dt>
            <dd className="text-sm text-slate-800 dark:text-slate-100">{favoriteCount}</dd>
          </div>
        </dl>
      </article>
    </section>
  );
}

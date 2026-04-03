import { RoleBadge } from "@/components/users/RoleBadge";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const { favoritesQuery } = useFavorites(user?.id, { enabled: Boolean(user) && !loading });

  if (!user) return null;

  return (
    <section className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Mon profil</h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Informations personnelles et activité de chant.</p>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase text-slate-500">Nom complet</dt>
          <dd className="text-sm font-medium text-slate-900 dark:text-slate-100">{user.fullName}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-slate-500">Email</dt>
          <dd className="text-sm font-medium text-slate-900 dark:text-slate-100">{user.email}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-slate-500">Rôle</dt>
          <dd className="pt-1">
            <RoleBadge role={user.role} />
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase text-slate-500">Voix</dt>
          <dd className="text-sm font-medium text-slate-900 dark:text-slate-100">{user.choirVoice}</dd>
        </div>
      </dl>

      <div className="mt-6 rounded-xl bg-brand-50 p-4 text-sm text-brand-700 dark:bg-brand-900/30 dark:text-brand-200">
        Vous avez actuellement <strong>{favoritesQuery.data?.length ?? 0}</strong> chant(s) en favoris.
      </div>
    </section>
  );
}

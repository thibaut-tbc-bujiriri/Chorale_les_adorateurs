import { Link } from "react-router-dom";

import { Button } from "@/components/common/Button";
import { RoleBadge } from "@/components/users/RoleBadge";
import type { User } from "@/features/users/types/user.types";
import { formatDate } from "@/lib/utils";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:hidden">
        {users.map((user) => (
          <article key={user.id} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="font-semibold text-slate-900 dark:text-slate-100">{user.fullName}</p>
            <p className="mt-1 break-all text-sm text-slate-600 dark:text-slate-300">{user.email}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <RoleBadge role={user.role} />
              <span className="text-xs text-slate-500">Inscrit le {formatDate(user.joinedAt)}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link to={`/admin/utilisateurs/${user.id}`}>
                <Button variant="ghost">Détails</Button>
              </Link>
              <Button variant="secondary" onClick={() => onEdit(user)}>
                Modifier
              </Button>
              <Button variant="danger" onClick={() => onDelete(user)}>
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
            <th className="px-4 py-3">Nom</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Rôle</th>
            <th className="px-4 py-3">Inscrit le</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-slate-200 dark:border-slate-800">
              <td className="px-4 py-3">{user.fullName}</td>
              <td className="px-4 py-3 break-all">{user.email}</td>
              <td className="px-4 py-3">
                <RoleBadge role={user.role} />
              </td>
              <td className="px-4 py-3">{formatDate(user.joinedAt)}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Link to={`/admin/utilisateurs/${user.id}`}>
                    <Button variant="ghost">Détails</Button>
                  </Link>
                  <Button variant="secondary" onClick={() => onEdit(user)}>
                    Modifier
                  </Button>
                  <Button variant="danger" onClick={() => onDelete(user)}>
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
  );
}

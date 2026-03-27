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
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <table className="min-w-full text-sm">
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
              <td className="px-4 py-3">{user.email}</td>
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
  );
}

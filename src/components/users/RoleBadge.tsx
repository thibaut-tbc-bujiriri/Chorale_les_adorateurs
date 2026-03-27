import { ROLE_LABELS } from "@/types/role";
import type { Role } from "@/types/role";

const colorMap: Record<Role, string> = {
  super_admin: "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-200",
  maitre_chant: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-200",
  discipline_admin: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-200",
  choriste: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200",
};

export function RoleBadge({ role }: { role: Role }) {
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${colorMap[role]}`}>{ROLE_LABELS[role]}</span>;
}

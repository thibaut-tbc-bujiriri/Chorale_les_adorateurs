import { NavLink } from "react-router-dom";
import { Heart, LayoutDashboard, ListMusic, Tags, Users } from "lucide-react";

import { useRole } from "@/hooks/useRole";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, permission: "canAccessAdmin" as const },
  { to: "/favoris", label: "Favoris", icon: Heart, permission: "canAccessAdmin" as const },
  { to: "/admin/chants", label: "Chants", icon: ListMusic, permission: "canManageSongs" as const },
  { to: "/admin/categories", label: "Catégories", icon: Tags, permission: "canManageCategories" as const },
  { to: "/admin/utilisateurs", label: "Utilisateurs", icon: Users, permission: "canManageUsers" as const },
];

export function Sidebar() {
  const role = useRole();

  return (
    <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-64 shrink-0 border-r border-slate-200 bg-white p-4 lg:block dark:border-slate-800 dark:bg-slate-950">
      <p className="px-2 pb-4 text-xs uppercase tracking-wide text-slate-500">Administration</p>
      <nav className="space-y-1">
        {links
          .filter((link) => role[link.permission])
          .map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${isActive ? "bg-brand-100 font-medium text-brand-800 dark:bg-brand-900/30 dark:text-brand-100" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`
                }
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </NavLink>
            );
          })}
      </nav>
    </aside>
  );
}

import { LogOut, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import { useUiStore } from "@/app/store/ui.store";
import { Button } from "@/components/common/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useRole } from "@/hooks/useRole";

export function MobileNav() {
  const { isMobileNavOpen, closeMobileNav } = useUiStore();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { canAccessAdmin, canManageCategories, canManageSongs, canManageUsers } = useRole();

  if (!isMobileNavOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 md:hidden" onClick={closeMobileNav}>
      <div className="mr-auto h-full w-[85vw] max-w-xs overflow-y-auto bg-white p-4 dark:bg-slate-950" onClick={(event) => event.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <p className="font-semibold text-slate-900 dark:text-slate-100">Menu</p>
          <button type="button" onClick={closeMobileNav}>
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        <div className="space-y-2">
          <div className="mt-2 border-t border-slate-200 pt-2 dark:border-slate-800">
            <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Administration</p>
            <NavLink
              to="/chants"
              onClick={closeMobileNav}
              className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Répertoire
            </NavLink>
            <NavLink
              to="/favoris"
              onClick={closeMobileNav}
              className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Favoris
            </NavLink>
            <NavLink
              to="/profil"
              onClick={closeMobileNav}
              className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Profil
            </NavLink>
            {canAccessAdmin ? (
              <NavLink
                to="/admin/dashboard"
                onClick={closeMobileNav}
                className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Dashboard
              </NavLink>
            ) : null}
            {canManageSongs ? (
              <NavLink
                to="/admin/chants"
                onClick={closeMobileNav}
                className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Chants
              </NavLink>
            ) : null}
            {canManageCategories ? (
              <NavLink
                to="/admin/categories"
                onClick={closeMobileNav}
                className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Catégories
              </NavLink>
            ) : null}
            {canManageUsers ? (
              <NavLink
                to="/admin/utilisateurs"
                onClick={closeMobileNav}
                className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Utilisateurs
              </NavLink>
            ) : null}
          </div>
        </div>

        {user ? (
          <Button
            className="mt-6 w-full"
            variant="ghost"
            onClick={async () => {
              await logout();
              closeMobileNav();
              navigate("/");
            }}
          >
            <LogOut className="h-4 w-4" /> Déconnexion
          </Button>
        ) : null}

        <Button className="mt-2 w-full" onClick={closeMobileNav} variant="secondary">
          Fermer
        </Button>
      </div>
    </div>
  );
}

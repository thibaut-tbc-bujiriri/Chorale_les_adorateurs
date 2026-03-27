import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogIn, LogOut, Moon, Shield, Sun } from "lucide-react";

import { Button } from "@/components/common/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { publicNavItems } from "@/lib/constants";
import { ROLE_LABELS } from "@/types/role";
import { useRole } from "@/hooks/useRole";
import { useUiStore } from "@/app/store/ui.store";

export function Navbar() {
  const { user, logout } = useAuth();
  const { canAccessAdmin } = useRole();
  const navigate = useNavigate();
  const { theme, toggleTheme, openMobileNav } = useUiStore();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="text-lg font-bold tracking-tight text-brand-700 dark:text-brand-200">
          Les aadorateurs
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {publicNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm ${isActive ? "bg-brand-100 text-brand-800 dark:bg-brand-900/40 dark:text-brand-100" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          {canAccessAdmin ? (
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `ml-2 rounded-lg px-3 py-2 text-sm ${isActive ? "bg-accent-100 text-accent-700" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`
              }
            >
              Admin
            </NavLink>
          ) : null}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {user ? (
            <>
              <div className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-slate-100">{user.fullName}</span>
                <span className="mx-1">·</span>
                {ROLE_LABELS[user.role]}
              </div>
              <Button
                variant="ghost"
                onClick={async () => {
                  await logout();
                  navigate("/");
                }}
              >
                <LogOut className="h-4 w-4" /> Déconnexion
              </Button>
            </>
          ) : (
            <Button onClick={() => navigate("/login")}>
              <LogIn className="h-4 w-4" /> Se connecter
            </Button>
          )}
        </div>

        <button
          type="button"
          onClick={openMobileNav}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Shield className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}

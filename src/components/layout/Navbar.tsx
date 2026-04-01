import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogIn, LogOut, Menu, Moon, Sun } from "lucide-react";

import { Button } from "@/components/common/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { APP_NAME, publicNavItems } from "@/lib/constants";
import { ROLE_LABELS } from "@/types/role";
import { useUiStore } from "@/app/store/ui.store";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme, openMobileNav } = useUiStore();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:px-6">
        <div className="flex items-center gap-2">
          {user ? (
            <button
              type="button"
              onClick={openMobileNav}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          ) : null}
          <Link to="/" className="max-w-[150px] truncate text-base font-bold tracking-tight text-brand-700 sm:max-w-none sm:text-lg dark:text-brand-200">
            {APP_NAME}
          </Link>
        </div>

        {!user ? (
          <nav className="hidden items-center gap-1 md:flex">
            {publicNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-lg px-2.5 py-2 text-sm ${isActive ? "bg-brand-100 text-brand-800 dark:bg-brand-900/40 dark:text-brand-100" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        ) : null}

        <div className="hidden items-center gap-1 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {user ? (
            <>
              <div className="hidden rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-600 lg:block dark:bg-slate-800 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-slate-100">{user.fullName}</span>
                <span className="mx-1">·</span>
                {ROLE_LABELS[user.role]}
              </div>
              <Button
                variant="ghost"
                onClick={() => {
                  void logout();
                  navigate("/");
                }}
              >
                <LogOut className="h-4 w-4" /> <span className="hidden lg:inline">Déconnexion</span>
              </Button>
            </>
          ) : (
            <Button onClick={() => navigate("/login")}>
              <LogIn className="h-4 w-4" /> <span className="hidden lg:inline">Se connecter</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

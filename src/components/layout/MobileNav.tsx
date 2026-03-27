import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

import { Button } from "@/components/common/Button";
import { useRole } from "@/hooks/useRole";
import { publicNavItems } from "@/lib/constants";
import { useUiStore } from "@/app/store/ui.store";

export function MobileNav() {
  const { isMobileNavOpen, closeMobileNav } = useUiStore();
  const { canAccessAdmin } = useRole();

  if (!isMobileNavOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 md:hidden" onClick={closeMobileNav}>
      <div
        className="ml-auto h-full w-72 bg-white p-4 dark:bg-slate-950"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="font-semibold text-slate-900 dark:text-slate-100">Navigation</p>
          <button type="button" onClick={closeMobileNav}>
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>
        <div className="space-y-2">
          {publicNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMobileNav}
              className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {item.label}
            </NavLink>
          ))}
          {canAccessAdmin ? (
            <NavLink
              to="/admin/dashboard"
              onClick={closeMobileNav}
              className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Espace admin
            </NavLink>
          ) : null}
        </div>
        <Button className="mt-6 w-full" onClick={closeMobileNav} variant="secondary">
          Fermer
        </Button>
      </div>
    </div>
  );
}

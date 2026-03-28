import { Outlet, useLocation } from "react-router-dom";

import { useUiStore } from "@/app/store/ui.store";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { Navbar } from "@/components/layout/Navbar";
import { UserSidebar } from "@/components/layout/UserSidebar";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function AppLayout() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const hasIntroStarted = useUiStore((state) => state.hasIntroStarted);
  const shouldHideHeader = pathname === "/" && !hasIntroStarted;
  const showUserSidebar = Boolean(user) && !shouldHideHeader;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      {shouldHideHeader ? null : <Navbar />}
      {shouldHideHeader ? null : <MobileNav />}
      <main className={shouldHideHeader ? "flex w-full flex-1 p-0" : "mx-auto w-full max-w-7xl flex-1 px-3 py-4 sm:px-6 sm:py-6"}>
        {showUserSidebar ? (
          <div className="flex w-full">
            <UserSidebar />
            <div className="w-full p-0 lg:p-3">
              <Outlet />
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  );
}

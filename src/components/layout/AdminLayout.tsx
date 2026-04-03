import { Outlet } from "react-router-dom";

import { MobileNav } from "@/components/layout/MobileNav";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

export function AdminLayout() {
  return (
    <div className="h-[100dvh] overflow-hidden bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <MobileNav />
      <div className="mx-auto flex h-[calc(100dvh-4rem)] max-w-7xl overflow-hidden">
        <Sidebar />
        <main className="w-full overflow-y-auto p-3 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

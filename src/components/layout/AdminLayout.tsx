import { Outlet } from "react-router-dom";

import { MobileNav } from "@/components/layout/MobileNav";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <MobileNav />
      <div className="mx-auto flex max-w-7xl">
        <Sidebar />
        <main className="w-full p-3 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

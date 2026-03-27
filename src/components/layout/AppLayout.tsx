import { Outlet } from "react-router-dom";

import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { Navbar } from "@/components/layout/Navbar";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <MobileNav />
      <main className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-6 sm:py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

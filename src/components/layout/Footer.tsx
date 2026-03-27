export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-500 sm:px-6 sm:text-left">
        Les aadorateurs © {new Date().getFullYear()} · Application de gestion et de consultation des chants.
      </div>
    </footer>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-500 sm:px-6 sm:text-left">
        Les adorateurs © 2026 · Application de gestion et de consultation des chants. · Développé par{" "}
        <a
          href="https://tbc-groupe.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-brand-700 hover:underline dark:text-brand-300"
        >
          Tbc-Groupe
        </a>
      </div>
    </footer>
  );
}
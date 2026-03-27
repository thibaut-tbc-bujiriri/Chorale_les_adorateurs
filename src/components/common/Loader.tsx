export function Loader({ label = "Chargement en cours..." }: { label?: string }) {
  return (
    <div className="flex min-h-[220px] items-center justify-center px-4">
      <div className="flex flex-col items-center">
        <div className="relative grid h-24 w-24 place-items-center">
          <span className="absolute inset-0 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600 dark:border-brand-900 dark:border-t-brand-300" />
          <img
            src="/logo_Chorale.jpeg"
            alt="Icône de l'église"
            className="h-14 w-14 rounded-full border-2 border-white object-cover shadow-sm dark:border-slate-900"
          />
        </div>

        <p className="mt-3 text-sm font-semibold text-brand-700 dark:text-brand-300">Les adorateurs</p>
        <p className="mt-1 text-center text-xs text-slate-600 dark:text-slate-300">{label}</p>
      </div>
    </div>
  );
}

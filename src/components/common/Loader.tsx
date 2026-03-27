export function Loader({ label = "Chargement en cours..." }: { label?: string }) {
  return (
    <div className="flex min-h-[160px] items-center justify-center">
      <div className="flex items-center gap-3 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-700 dark:border-brand-800 dark:bg-brand-900/30 dark:text-brand-200">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-brand-500" />
        {label}
      </div>
    </div>
  );
}

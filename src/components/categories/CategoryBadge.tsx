interface CategoryBadgeProps {
  name: string;
}

export function CategoryBadge({ name }: CategoryBadgeProps) {
  return (
    <span className="inline-flex rounded-full bg-brand-100 px-2.5 py-1 text-xs font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-200">
      {name}
    </span>
  );
}

import { useMemo, useState } from "react";

export function usePagination<T>(items: T[], pageSize = 8) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  const goTo = (nextPage: number) => setPage(Math.min(totalPages, Math.max(1, nextPage)));

  return { page, totalPages, paginatedItems, goTo, setPage };
}

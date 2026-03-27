import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren, useMemo } from "react";

export function QueryProvider({ children }: PropsWithChildren) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
    [],
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

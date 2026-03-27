import { createContext, type PropsWithChildren, useEffect, useMemo, useState } from "react";

import { authService } from "@/features/auth/services/auth.service";
import type { AuthContextValue, AuthUser, LoginInput } from "@/features/auth/types/auth.types";

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const safetyTimeout = setTimeout(() => {
      if (!isMounted) return;
      setLoading(false);
    }, 7000);

    authService
      .getCurrentUser()
      .then((currentUser) => {
        if (isMounted) setUser(currentUser);
      })
      .catch(() => {
        if (isMounted) setUser(null);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    const unsubscribe = authService.onAuthStateChange((nextUser) => {
      if (!isMounted) return;
      setUser(nextUser);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      clearTimeout(safetyTimeout);
      unsubscribe();
    };
  }, []);

  const login = async (input: LoginInput) => {
    const loggedUser = await authService.login(input);
    setUser(loggedUser);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, login, logout }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

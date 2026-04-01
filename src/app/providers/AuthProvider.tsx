import { createContext, type PropsWithChildren, useEffect, useMemo, useState } from "react";

import { authService } from "@/features/auth/services/auth.service";
import type { AuthContextValue, AuthUser, LoginInput, RegisterInput } from "@/features/auth/types/auth.types";

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const initialCachedUser = authService.getCachedAuthUser();
  const [user, setUser] = useState<AuthUser | null>(initialCachedUser);
  const [loading, setLoading] = useState(() => !initialCachedUser);

  useEffect(() => {
    let isMounted = true;

    const safetyTimeout = setTimeout(() => {
      if (!isMounted) return;
      setLoading(false);
    }, 4000);

    authService
      .getCurrentUser()
      .then((currentUser) => {
        if (isMounted) setUser(currentUser);
      })
      .catch(() => {
        if (!isMounted) return;
        setUser((previous) => previous ?? authService.getCachedAuthUser());
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

  const register = async (input: RegisterInput) => {
    await authService.register(input);
  };

  const requestPasswordReset = async (email: string) => {
    await authService.requestPasswordReset(email);
  };

  const resetPassword = async (newPassword: string) => {
    await authService.resetPassword(newPassword);
  };

  const logout = async () => {
    setUser(null);
    setLoading(false);
    void authService.logout().catch(() => {
      // UI logout remains immediate even if network sign-out fails.
    });
  };

  const value = useMemo(
    () => ({ user, loading, login, register, requestPasswordReset, resetPassword, logout }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

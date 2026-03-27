import { useMemo } from "react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { canAccessAdminPanel, canManageCategories, canManageSongs, canManageUsers } from "@/lib/permissions";

export function useRole() {
  const { user } = useAuth();

  return useMemo(
    () => ({
      role: user?.role,
      isAuthenticated: Boolean(user),
      canAccessAdmin: user ? canAccessAdminPanel(user.role) : false,
      canManageSongs: user ? canManageSongs(user.role) : false,
      canManageCategories: user ? canManageCategories(user.role) : false,
      canManageUsers: user ? canManageUsers(user.role) : false,
    }),
    [user],
  );
}

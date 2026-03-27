import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/features/auth/hooks/useAuth";
import type { Role } from "@/types/role";

interface RoleGuardProps {
  allowedRoles: Role[];
}

export function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/chants" replace />;
  }

  return <Outlet />;
}

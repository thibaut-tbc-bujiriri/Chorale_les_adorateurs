import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { canAccessAdminPanel } from "@/lib/permissions";

export function AdminRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!canAccessAdminPanel(user.role)) {
    return <Navigate to="/chants" replace />;
  }

  return <Outlet />;
}

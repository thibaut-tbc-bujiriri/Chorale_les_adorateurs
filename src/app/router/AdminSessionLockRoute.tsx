import { Navigate, Outlet, useLocation } from "react-router-dom";

import { Loader } from "@/components/common/Loader";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { canAccessAdminPanel } from "@/lib/permissions";

const ADMIN_LOCKED_PUBLIC_PATHS = new Set(["/", "/login", "/register", "/forgot-password"]);

export function AdminSessionLockRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader label="Vérification de la session..." />;

  if (user && canAccessAdminPanel(user.role) && ADMIN_LOCKED_PUBLIC_PATHS.has(location.pathname)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
}

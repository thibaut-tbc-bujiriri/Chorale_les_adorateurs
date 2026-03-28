import { Navigate, Outlet, useLocation } from "react-router-dom";

import { Loader } from "@/components/common/Loader";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { canAccessAdminPanel } from "@/lib/permissions";

const ADMIN_LOCKED_PUBLIC_PATHS = new Set(["/", "/login", "/register", "/forgot-password"]);

export function AdminSessionLockRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const isPublicPath = ADMIN_LOCKED_PUBLIC_PATHS.has(location.pathname);

  if (loading && !isPublicPath) return <Loader label="Verification de la session..." />;

  if (user && canAccessAdminPanel(user.role) && isPublicPath) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
}

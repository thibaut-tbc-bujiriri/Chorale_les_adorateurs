import { Navigate, Outlet } from "react-router-dom";

import { Loader } from "@/components/common/Loader";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { canAccessAdminPanel } from "@/lib/permissions";

export function GuestRoute() {
  const { user, loading } = useAuth();

  if (loading) return <Loader label="Vérification de la session..." />;

  if (user) {
    if (canAccessAdminPanel(user.role)) {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/chants" replace />;
  }

  return <Outlet />;
}

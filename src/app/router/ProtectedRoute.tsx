import { Navigate, Outlet, useLocation } from "react-router-dom";

import { Loader } from "@/components/common/Loader";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader label="Vérification de la session..." />;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

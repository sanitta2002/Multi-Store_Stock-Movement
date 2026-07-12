import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { FRONT_ROUTES } from "../../constants/frontRoutes";

interface ProtectedRouteProps {
  allowedRoles: ("admin" | "user")[];
}

export const ProtectedRoute = ({
  allowedRoles,
}: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to={FRONT_ROUTES.LOGIN} replace />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={FRONT_ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};
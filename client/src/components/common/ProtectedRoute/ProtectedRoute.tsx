import { Navigate } from "react-router-dom";

import { useAuth } from "../../../context/auth/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { user, token } = useAuth();

  // User is not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check role if allowedRoles is provided
  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
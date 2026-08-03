import { Navigate } from "react-router-dom";

import { useAuth } from "../../../context/auth/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
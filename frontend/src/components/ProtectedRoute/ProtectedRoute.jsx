import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  loggedIn,
  isCheckingToken,
  children,
}) {
  if (isCheckingToken) {
    return <p>Cargando...</p>;
  }

  if (!loggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

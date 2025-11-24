import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isLoggedIn");

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

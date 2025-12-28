import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  // If no token or no user, redirect to login
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // If a role is required, check it
  if (role && user.role !== role) {
    // Redirect if role doesn't match
    return <Navigate to="/dashboard" replace />;
  }

  // Render protected component
  return children;
}

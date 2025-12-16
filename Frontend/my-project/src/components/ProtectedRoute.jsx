import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/" />;
  }

  // If a role is required, check it
  if (role && user.role !== role) {
    // Redirect students/admins who try to access teacher portal
    return <Navigate to="/dashboard" />;
  }

  // Otherwise, render the protected component
  return children;
}

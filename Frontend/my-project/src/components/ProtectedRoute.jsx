import { Navigate } from "react-router-dom";
import { getAuthToken } from "../utils/api";

export default function ProtectedRoute({ children }) {
  const token = getAuthToken();
  return token ? children : <Navigate to="/" />;
}

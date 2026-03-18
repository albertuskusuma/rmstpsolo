import { Navigate } from "react-router-dom";
import { getAccessToken } from "../auth/auth";

export default function ProtectedRoute({ children }: any) {
  const token = getAccessToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
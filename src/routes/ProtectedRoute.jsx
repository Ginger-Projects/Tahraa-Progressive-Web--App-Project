import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.trainee.token);

  if (token) {
    return children;
  }

  return <Navigate to="/login" replace />;
}

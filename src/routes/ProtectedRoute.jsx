import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.trainee.token);
  const location = useLocation();

  if (token) {
    return children;
  }

  // Parse current URL params and pass them to login
  const currentParams = new URLSearchParams(location.search);
  const invite = currentParams.get("invite");
  const packageId = currentParams.get("packageId");

  // Build login URL with query params
  const loginParams = new URLSearchParams();
  if (invite) loginParams.set("invite", invite);
  if (packageId) loginParams.set("packageId", packageId);

  const loginUrl = loginParams.toString()
    ? `/login?${loginParams.toString()}`
    : "/login";

  return (
    <Navigate
      to={loginUrl}
      replace
      state={{
        from: {
          pathname: location.pathname,
          search: location.search,
        }
      }}
    />
  );
}

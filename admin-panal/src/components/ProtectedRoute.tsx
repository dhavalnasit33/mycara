import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface ProtectedRouteProps {
  allowedRoles?: string[]; // 👈 optional, if not provided then any logged-in user can access
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();

  // 🚪 1️⃣ Not logged in → redirect to /login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🛑 2️⃣ Logged in but doesn't have required role → redirect to home
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // ✅ 3️⃣ Authorized → allow access
  return <Outlet />;
};

export default ProtectedRoute;

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store"; 

const ProtectedRoute = () => {
  const token = useSelector((state: RootState) => state.auth.token); 

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; 
};

export default ProtectedRoute;

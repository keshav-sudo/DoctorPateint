import { useRecoilValue } from "recoil";
import { authState } from "../../atom/recoil.auth";
import { Navigate } from "react-router-dom";
import LoadingScreen from "../Loading/Loading";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useRecoilValue(authState);


  if (loading) {
    return <LoadingScreen/>; 
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }


  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/error" />;
  }

  return children;
};

export default ProtectedRoute;

import React from "react";
import { useRecoilValue } from "recoil";
import { Navigate } from "react-router-dom";
import { authState } from "../atom/recoil.atom";

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useRecoilValue(authState);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user?.role)) return <Navigate to="/error" replace />;

  return <>{children}</>;
};

export default ProtectedRoutes;

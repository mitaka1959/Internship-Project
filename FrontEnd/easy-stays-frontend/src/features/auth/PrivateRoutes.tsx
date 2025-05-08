import { Navigate, Outlet } from "react-router-dom";

import type { JSX } from "react";

const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};

const getRole = () => {
  return localStorage.getItem("user_role");
};

interface Props {
  children: JSX.Element;
  allowedRoles?: string[];
}

const PrivateRoutes: React.FC<Props> = ({ allowedRoles, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles?.includes(getRole() || "")) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoutes;

import React from "react";
import { Route, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const ProtectedRoutes = ({ user, children }) => {
  const token = cookies.get("Token");
  // console.log(token);

  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoutes;

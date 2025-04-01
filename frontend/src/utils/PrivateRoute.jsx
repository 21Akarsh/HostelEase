import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { useAuth } from "./Auth";
import { RoutesPathName } from "../constants";

const PrivateRoute = () => {
  const { authToken, headers } = useAuth();
  //const location = useLocation(); // Get current location

  return authToken ? (
    <Dashboard />
  ) : (
    <Navigate to={RoutesPathName.LOGIN_PAGE} />
  );
};

export default PrivateRoute;

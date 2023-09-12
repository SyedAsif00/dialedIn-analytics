import React from "react";
import Login from "./auth/Login";
// import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import PrivateRoute from "../src/auth/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
const routes = [
  { path: "/", element: <Login /> },
  {
    path: "/analytics",
    element: <PrivateRoute component={Dashboard} />,
  },
];

export default routes;

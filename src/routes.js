// routes.js
import React from "react";
import Login from "./auth/Login";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import PrivateRoute from "../src/auth/ProtectedRoutes"; // Import your PrivateRoute component

const routes = [
  { path: "/", element: <Login /> },
  {
    path: "/analytics",
    element: <PrivateRoute component={AnalyticsDashboard} />,
  },
];

export default routes;

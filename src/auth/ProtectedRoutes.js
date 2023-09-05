// PrivateRoute.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Import Navigate
import { auth } from "../firebase/FirebaseSetup";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const currentUser = auth.currentUser;

  return (
    <Routes>
      <Route
        {...rest}
        element={currentUser ? <Component /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default PrivateRoute;

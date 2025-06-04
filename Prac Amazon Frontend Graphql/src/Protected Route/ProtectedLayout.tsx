import React from "react";
import ProtectedRoute from "../Authenticate-JWT/Protected-route";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  return (
    <ProtectedRoute>
      <Header />
      <Outlet /> {/* Nested routes will render here */}
    </ProtectedRoute>
  );
};

export default ProtectedLayout;

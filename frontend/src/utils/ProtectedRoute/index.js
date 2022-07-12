import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);
  if (loading) {
    return <div>Loading</div>;
  }
  if (isAuthenticated) {
    return <Outlet />;
  }
  return <div>Unauthorized</div>;
};

export default ProtectedRoute;

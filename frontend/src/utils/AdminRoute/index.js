import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { loading, isAuthenticated, isAdmin } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [navigate, isAuthenticated]);
  if (loading) {
    return <div>Loading</div>;
  }
  if (isAuthenticated && isAdmin) {
    return <Outlet />;
  }
  return( <div>
    <h2>Please Login As A Admin To Access Admin Dashboard</h2>
    <Link to="/login">Go Login</Link>
  </div>);
};

export default AdminRoute;

import React from "react";
import DashboardLayoutStyles from "./dashboardlayout.module.css";
import { NavLink, Outlet } from "react-router-dom";
import DashboardHeader from "../DashboardHeader/DashboardHeader";

const DashboardLayout = () => {
  return (
    <>
      <DashboardHeader />
      <div className={`${DashboardLayoutStyles.dashboard}`}>
        <div className="row">
          <div className="col-md-2">
            <div className={DashboardLayoutStyles.sidebartab}>
              <NavLink
                to="/admin"
                className={({ isActive }) => {
                  console.log(isActive);
                  return isActive ? DashboardLayoutStyles.activedashboardlink : "";
                }}
              >
                Dasboard
              </NavLink>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  isActive ? DashboardLayoutStyles.activedashboardlink : ""
                }
              >
                Users
              </NavLink>
              <NavLink
                to="/admin/categories"
                className={({ isActive }) =>
                  isActive ? DashboardLayoutStyles.activedashboardlink : ""
                }
              >
                Categories
              </NavLink>
              <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                  isActive ? DashboardLayoutStyles.activedashboardlink : ""
                }
              >
                Products
              </NavLink>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) => {
                  return isActive
                    ? DashboardLayoutStyles.activedashboardlink
                    : "";
                }}
              >
                Orders
              </NavLink>
              <NavLink
                to="/admin/reviews"
                className={({ isActive }) =>
                  isActive ? DashboardLayoutStyles.activedashboardlink : ""
                }
              >
                Reviews
              </NavLink>
              <NavLink
                to="/admin/settings"
                className={({ isActive }) =>
                  isActive ? DashboardLayoutStyles.activedashboardlink : ""
                }
              >
                Settings
              </NavLink>
            </div>
          </div>
          <div className="col-md-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;

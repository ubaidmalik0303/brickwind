import React from "react";
import DashboardHeaderStyles from "./dashboardheader.module.css";
import {Link} from "react-router-dom"

const DashboardHeader = () => {
  return (
    <header className={DashboardHeaderStyles.header}>
      <h2>BrickWind</h2>
      <div>
        <Link to="/">Website</Link>
        <Link to="/my-account">User Account</Link>
      </div>
    </header>
  );
};

export default DashboardHeader;

import React from "react";
import DashboardHeaderStyles from "./dashboardheader.module.css";
import { Link } from "react-router-dom";
import { FiUser, FiMenu } from "react-icons/fi";

const DashboardHeader = () => {
  return (
    <header className={DashboardHeaderStyles.header}>
      <h2>BrickWind</h2>
      <div>
        <FiMenu size={30} className={DashboardHeaderStyles.menuicon} />
        <Link to="/my-account">
          <FiUser size={30} />
        </Link>
      </div>
    </header>
  );
};

export default DashboardHeader;

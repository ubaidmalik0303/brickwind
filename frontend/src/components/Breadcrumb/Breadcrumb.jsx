import React from "react";
import BreadcrumbStyles from "./breadcrumb.module.css";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = ({ breadcrumbpath, name }) => {

  const location = useLocation();

  return (
    <>
      <div
        className="container-fluid border-bottom"
        style={{ height: 80 }}
      ></div>
      <div className={`container-fluid ${BreadcrumbStyles.breadcrumb}`}>
        <span>
          <Link to="/">Home</Link><Link to="/my-account"> {">"} My Account</Link><span>{breadcrumbpath && breadcrumbpath}</span>
        </span>
        <h1>{name && name}</h1>
      </div>
    </>
  );
};

export default Breadcrumb;

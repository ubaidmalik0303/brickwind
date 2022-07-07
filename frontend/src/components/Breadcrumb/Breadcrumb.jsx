import React from "react";
import BreadcrumbStyles from "./breadcrumb.module.css";

const Breadcrumb = ({ breadcrumbpath, name }) => {
  return (
    <>
      <div className="container-fluid border-bottom" style={{ height: 80 }}></div>
      <div className={`container-fluid ${BreadcrumbStyles.breadcrumb}`}>
        <span>
          <b>Home</b> {breadcrumbpath && breadcrumbpath}
        </span>
        <h1>{name && name}</h1>
      </div>
    </>
  );
};

export default Breadcrumb;

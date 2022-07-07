import React from "react";
import BreadcrumbStyles from "./breadcrumb.module.css";

const Breadcrumb = () => {
  return (
    <>
      <div className="container-fluid pt-5 pb-4 border-bottom"></div>
      <div className={`container-fluid ${BreadcrumbStyles.breadcrumb}`}>
        <span><b>Home</b> {">"} Wishlist</span>
        <h1>Wishlist</h1>
      </div>
    </>
  );
};

export default Breadcrumb;

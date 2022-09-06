import React from "react";
import StorePathStyles from "./storepath.module.css";
import { Link, useParams } from "react-router-dom";

const StorePath = () => {
  const { category, subcategory, productid } = useParams();

  return (
    <div className="container-fluid">
      <div className="py-5"></div>
      <span className={StorePathStyles.storepath}>
        <Link to="/">HOME</Link> {" > "} <Link to="/store">STORE</Link>{" "}
        {category && <Link to={`/store/${category}`}>{` > ${category}`}</Link>}
        {subcategory && (
          <Link
            to={`/store/${category}/${subcategory}`}
          >{` > ${subcategory}`}</Link>
        )}
        {productid && " > " + productid}
      </span>
      <hr />
    </div>
  );
};

export default StorePath;

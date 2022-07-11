import React from "react";
import SearchStyle from "./search.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  return (
    <>
      <Breadcrumb name="FIND YOUR PRODUCT" breadcrumbpath="> Search" />
      <div className={`container-fluid ${SearchStyle.search}`}>
        <div className="row justify-content-center align-items-center">
          <div className="col-md-8">
            <form action="">
              <input type="text" placeholder="Search Your Product" />
              <button type="submit"><FaSearch size={30} /></button>
            </form>
            <div className={SearchStyle.blankheight}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;

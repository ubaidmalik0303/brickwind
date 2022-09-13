import React, { useEffect, useState } from "react";
import SearchStyle from "./search.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/SEO/SEO";

const Search = () => {
  let [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    navigate(`/store?keyword=${keyword}`);
  };

  return (
    <>
      <SEO title="Search Product - BrickWind" />
      <Breadcrumb
        name="FIND YOUR PRODUCT"
        auth="no"
        breadcrumbpath=" > Search"
      />
      <div className={`container-fluid ${SearchStyle.search}`}>
        <div className="row justify-content-center align-items-center">
          <div className="col-md-8">
            <form onSubmit={searchHandler}>
              <input
                onChange={(e) => setKeyword(e.target.value)}
                type="text"
                placeholder="Search Your Product"
                required={true}
              />
              <button type="submit">
                <FaSearch size={30} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;

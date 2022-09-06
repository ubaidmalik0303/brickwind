import React, { useEffect, useState } from "react";
import SearchStyle from "./search.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { FaSearch } from "react-icons/fa";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, clearErrors } from "../../store/Actions/ProductActions";
import { useAlert } from "react-alert";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";

const Search = () => {
  let [keyword, setKeyword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.searchproduct
  );

  const alert = useAlert();

  const searchProduct = (e) => {
    e.preventDefault();
    dispatch(getProducts(keyword));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error]);

  return (
    <>
      <Breadcrumb
        name="FIND YOUR PRODUCT"
        auth="no"
        breadcrumbpath=" > Search"
      />
      <div className={`container-fluid ${SearchStyle.search}`}>
        <div className="row justify-content-center align-items-center">
          <div className="col-md-8">
            <form onSubmit={searchProduct} action="">
              <input
                onChange={(e) => setKeyword(e.target.value)}
                type="text"
                placeholder="Search Your Product"
              />
              <button type="submit">
                <FaSearch size={30} />
              </button>
            </form>
          </div>
        </div>

        <div className="row justify-content-center">
          {loading ? (
            <SpinnerLoader />
          ) : (
            products.map((val, i) => {
              return (
                <div key={i} className="col-xl-2 col-md-3 col-sm-4 col-6 py-4">
                  <ProductCard data={val} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Search;

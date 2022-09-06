import React, { useState, useEffect } from "react";
import StoreStyles from "./store.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Accordion } from "react-bootstrap";
import StorePath from "../../components/StorePath/StorePath";
import { Link, useParams } from "react-router-dom";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, clearErrors } from "../../store/Actions/ProductActions";
import {
  allCategories,
  clearErrors as catClearErrors,
} from "../../store/Actions/CategoryActions";
import { useAlert } from "react-alert";
import CategoriesList from "../../components/CategoriesCollapse/CategoriesList";

const Store = () => {
  const dispatch = useDispatch();
  const { error, loading, products, resultPerPage, productCount } = useSelector(
    (state) => state.products
  );
  const {
    error: catError,
    loading: catLoading,
    categories,
  } = useSelector((state) => state.categories);
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (catError) {
      alert.error(catError);
      dispatch(catClearErrors());
    }

    dispatch(getProducts("", currentPage));
    dispatch(allCategories());
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <>
      <StorePath />
      <div className={`container-fluid ${StoreStyles.store}`}>
        <div className="row">
          <div className="col-md-3">
            <div className={`${StoreStyles.shopsidebar}`}>
              <CategoriesList />
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">
              {loading ? (
                <SpinnerLoader />
              ) : !products[0] ? (
                <h3>No Products Found!</h3>
              ) : (
                products.map((val, i) => {
                  return (
                    <div
                      key={i}
                      className="col-lg-3 col-md-4 col-sm-4 col-6 py-4"
                    >
                      <ProductCard data={val} />
                    </div>
                  );
                })
              )}
            </div>
            {resultPerPage < productCount && (
              <div className="container">
                <div className={StoreStyles.paginationcontainer}>
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productCount}
                    onChange={setCurrentPageNo}
                    nextPageText=">"
                    prevPageText="<"
                    firstPageText="<<"
                    lastPageText=">>"
                    itemClass={StoreStyles.paginationitem}
                    linkClass={StoreStyles.paginationlink}
                    activeClass={StoreStyles.paginationitemactive}
                    activeLinkClass={StoreStyles.paginationlinkactive}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;

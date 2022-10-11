import React, { useState, useEffect } from "react";
import StoreStyles from "./store.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import StorePath from "../../components/StorePath/StorePath";
import { useParams, useSearchParams } from "react-router-dom";
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
import SEO from "../../components/SEO/SEO";
import Form from "react-bootstrap/Form";
import { FiBox } from "react-icons/fi";
import MultiRangeSlider from "multi-range-slider-react";

const Store = () => {
  const dispatch = useDispatch();
  const { error, loading, products, resultPerPage, productCount, filteredProductsCount } = useSelector(
    (state) => state.products
  );
  const {
    error: catError,
    loading: catLoading,
    categories,
  } = useSelector((state) => state.categories);
  const alert = useAlert();
  const { category, subcategory } = useParams();
  const [searchParams] = useSearchParams();
  const keyword = !searchParams.get("keyword")
    ? ""
    : searchParams.get("keyword");

  const [currentPage, setCurrentPage] = useState(1);
  const [rating, setrating] = useState(0);
  const [minValue, set_minValue] = useState(0);
  const [maxValue, set_maxValue] = useState(1000);

  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  const priceFilterHandler = () => {
    dispatch(
      getProducts(
        keyword,
        currentPage,
        [minValue, maxValue],
        category,
        subcategory,
        rating
      )
    );
  }

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

    dispatch(
      getProducts(
        keyword,
        currentPage,
        [minValue, maxValue],
        category,
        subcategory,
        rating
      )
    );
    dispatch(allCategories());
  }, [currentPage, category, subcategory, rating, keyword]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <>
      <SEO title="Store - BrickWind" />
      <StorePath />
      <div className={`container-fluid ${StoreStyles.store}`}>
        <div className="row">
          <div className="col-md-3">
            <div className={`${StoreStyles.shopsidebar} shadow`}>
              <CategoriesList defaultOpen={true} />
              <div className="py-4">
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  Price:
                </span>
                <div className="py-2 d-flex flex-column">
                  <MultiRangeSlider
                    min={0}
                    max={1000}
                    step={5}
                    ruler={false}
                    label={true}
                    preventWheel={false}
                    minValue={minValue}
                    maxValue={maxValue}
                    onInput={(e) => {
                      handleInput(e);
                    }}
                  />
                  <button onClick={priceFilterHandler} className={StoreStyles.priceFilterButton}>Filter</button>
                </div>
              </div>
              <div>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                  }}
                >
                  Ratings:
                </span>
                <div className="px-4">
                  <Form.Range
                    defaultValue={0}
                    min={0}
                    max={5}
                    onChange={(e) => setrating(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">
              {loading ? (
                <SpinnerLoader />
              ) : !products[0] ? (
                <div className="container text-center py-5">
                  <FiBox size={100} />
                  <h4 className="my-4">No Products Found!</h4>
                </div>
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
            {resultPerPage < filteredProductsCount && (
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

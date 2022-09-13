import React, { useState, useEffect } from "react";
import CategoriesStyles from "./Categories.module.css";
import CategoriesCollapse from "./CategoriesCollapse";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  allCategories,
  clearErrors,
} from "../../store/Actions/CategoryActions";
import { FaChevronDown } from "react-icons/fa";

const CategoriesList = ({ heading, link, defaultOpen }) => {
  const { loading, categories, error } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();
  const alert = useAlert();

  const [open, setOpen] = useState(defaultOpen);
  const toggleCollapse = () => {
    open ? setOpen(false) : setOpen(true);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(allCategories());
  }, [dispatch, error, alert]);

  return (
    <div className={CategoriesStyles.categories}>
      <div className={CategoriesStyles.head}>
        {link ? (
          <>
            <Link
              style={{
                fontSize: 14,
                fontWeight: 300,
                cursor: "pointer",
                textDecoration: "none",
              }}
              to={link}
            >
              {heading ? heading : "Categories"}
            </Link>
            <FaChevronDown
              onClick={toggleCollapse}
              size={12}
              style={{ cursor: "pointer" }}
            />
          </>
        ) : (
          <span
            onClick={toggleCollapse}
            style={{
              fontSize: 20,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {heading ? heading : "Categories"}
          </span>
        )}
      </div>
      <div
        className={`${CategoriesStyles.collapsebox} ${
          open ? CategoriesStyles.collapseboxshow : ""
        }`}
      >
        {!loading &&
          categories.map((val, i) => {
            return (
              <CategoriesCollapse
                key={i}
                title={val.name}
                link={`/store/${val.name}`}
                cat={val}
                catOpen={open}
              >
                {val.subCategory[0] && (
                  <ul>
                    {val.subCategory.map((sub, index) => {
                      return (
                        <li key={index}>
                          <Link to={`/store/${val.name}/${sub}`}>{sub}</Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </CategoriesCollapse>
            );
          })}
      </div>
    </div>
  );
};

export default CategoriesList;

import React, { useEffect, useState } from "react";
import CategoriesStyles from "./categories.module.css";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  allCategories,
  clearErrors,
} from "../../../store/Actions/CategoryActions";
import SpinnerLoader from "../../../components/SpinnerLoader/SpinnerLoader";

const Categories = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, categories } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(allCategories());
  }, [dispatch, error]);

  return (
    <div className={CategoriesStyles.categories}>
      <h2 className="text-center my-3">All Categories</h2>
      <div className="py-3 text-end">
        <Link to="/admin/categories/add-category">ADD CATEGORY</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Sub-Categories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{cat.name}</td>
                <td>
                  <table>
                    {!cat.subCategory[0] ? "No SubCategory Found!" : cat.subCategory.map((subcat, index) => {
                      return (
                        <tr key={index}>
                          <td>{subcat}</td>
                          <td>Edit</td>
                          <td>Delete</td>
                        </tr>
                      );
                    })}
                  </table>
                </td>
                <td>Cats</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;

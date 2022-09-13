import React, { useEffect } from "react";
import CategoriesStyles from "./categories.module.css";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  allCategories,
  deleteCategory,
  clearErrors,
} from "../../../store/Actions/CategoryActions";
import { DELETE_CATEGORY_RESET } from "../../../store/Constants/CategoryConstant";
import SpinnerLoader from "../../../components/SpinnerLoader/SpinnerLoader";
import SEO from "../../../components/SEO/SEO";

const Categories = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, categories } = useSelector(
    (state) => state.categories
  );
  const {
    loading: deleteLLoading,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.category);

  const deleteCategoryHanlder = (id) => {
    dispatch(deleteCategory(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Category Deleted SuccessFully");
      dispatch({
        type: DELETE_CATEGORY_RESET,
      });
    }

    dispatch(allCategories());
  }, [dispatch, error, deleteError, isDeleted, alert]);

  return (
    <>
      <SEO title="Categories - BrickWind" />
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
          {loading || deleteLLoading ? (
            <SpinnerLoader />
          ) : (
            <tbody>
              {categories.map((cat, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{cat.name}</td>
                    <td>
                      <table>
                        {!cat.subCategory[0]
                          ? "No SubCategory Found!"
                          : cat.subCategory.map((subcat, index) => {
                              return (
                                <tr key={index}>
                                  <td>{subcat}</td>
                                </tr>
                              );
                            })}
                      </table>
                    </td>
                    <td>
                      <Link to={`/admin/categories/update-category/${cat._id}`}>
                        Edit
                      </Link>
                      <button onClick={() => deleteCategoryHanlder(cat._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

export default Categories;

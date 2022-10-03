import React, { useEffect, useState } from "react";
import AddCategoryStyles from "./addcategory.module.css";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  createSubCategory,
  allCategories,
  clearErrors,
} from "../../../store/Actions/CategoryActions";
import {
  CREATE_CATEGORY_RESET,
  CREATE_SUBCATEGORY_RESET,
} from "../../../store/Constants/CategoryConstant";
import SpinnerLoader from "../../../components/SpinnerLoader/SpinnerLoader";
import SEO from "../../../components/SEO/SEO";

const AddCategory = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.createcategory
  );
  const {
    loading: subCatLoading,
    error: subCatError,
    success: subCatSuccess,
  } = useSelector((state) => state.createsubcategory);
  const {
    loading: catLoading,
    error: catError,
    categories,
  } = useSelector((state) => state.categories);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [categoryID, setCategoryID] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const categoryImageHandle = (e) => {
    setImagePreview("");
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
        setImage(e.target.files[0]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const createCategoryHandle = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("image", image);

    dispatch(createCategory(myForm));
  };

  const createSubCategoryHandle = (e) => {
    e.preventDefault();
    if (categoryID === "") {
      alert.error("Please Select Any Category");
    } else {
      dispatch(createSubCategory(subCategory, categoryID));
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (catError) {
      alert.error(catError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Category Created SuccessFully");
      setName("");
      setImagePreview("");
      setSubCategory("");
      dispatch({
        type: CREATE_CATEGORY_RESET,
      });
    }

    if (subCatError) {
      alert.error(subCatError);
      dispatch(clearErrors());
    }

    if (subCatSuccess) {
      alert.success("SubCategory Created SuccessFully");
      dispatch({
        type: CREATE_SUBCATEGORY_RESET,
      });
      setSubCategory("");
      setCategoryID("");
    }

    dispatch(allCategories());
  }, [dispatch, error, success, catError, subCatError, subCatSuccess, alert]);

  return (
    <>
      <SEO title="Add Category - BrickWind" />

      <div className={AddCategoryStyles.addcategory}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7">
              <h2 className="text-center">Add Category</h2>
              {loading || subCatLoading ? (
                <SpinnerLoader />
              ) : (
                <form
                  onSubmit={createCategoryHandle}
                  encType="multipart/form-data"
                >
                  <input
                    type="text"
                    placeholder="Enter Category Name (Don't Use &)"
                    onChange={(e) => setName(e.target.value)}
                    required
                    value={name}
                  />
                  <input onChange={categoryImageHandle} type="file" required />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Category"
                      width={100}
                      height={100}
                    />
                  )}
                  <input type="submit" value="Create Category" />
                </form>
              )}
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-7">
              <h2 className="text-center">Add Sub-Category</h2>
              {catLoading || loading || subCatLoading ? (
                <SpinnerLoader />
              ) : (
                <form onSubmit={createSubCategoryHandle}>
                  <select onChange={(e) => setCategoryID(e.target.value)}>
                    <option value="">Select Any Category</option>
                    {categories.map((cat, i) => {
                      return (
                        <option key={i} value={cat._id}>
                          {cat.name}
                        </option>
                      );
                    })}
                  </select>
                  <input
                    type="text"
                    placeholder="Enter Sub-Category Name (Don't Use &)"
                    required
                    onChange={(e) => setSubCategory(e.target.value)}
                    value={subCategory}
                  />
                  <input type="submit" value="Create Sub-Category" />
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategory;

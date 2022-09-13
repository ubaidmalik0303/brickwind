import React, { useEffect, useState } from "react";
import EditCategoriesStyles from "./EditCategories.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCategory,
  categoryDetails,
  clearErrors,
} from "../../../store/Actions/CategoryActions";
import { UPDATE_CATEGORY_RESET } from "../../../store/Constants/CategoryConstant";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import SpinnerLoader from "../../../components/SpinnerLoader/SpinnerLoader";
import SEO from "../../../components/SEO/SEO";

const EditCategories = () => {
  const { loading, isUpdated, error } = useSelector((state) => state.category);
  const {
    loading: detailsLoading,
    error: detailsError,
    category,
  } = useSelector((state) => state.categorydetails);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  let [subCategories, setSubcategories] = useState([]);

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

  const updateCategoryHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("image", image);
    myForm.set("subCategory", subCategories);

    dispatch(updateCategory(id, myForm));
  };

  const deletesubcatHandler = (e, i) => {
    e.preventDefault();
    const tempSubCat = subCategories;
    tempSubCat.splice(i, 1);
    console.log(tempSubCat);
    setSubcategories([...tempSubCat]);
    console.log(subCategories);
  };

  useEffect(() => {
    if (category && category._id !== id) {
      dispatch(categoryDetails(id));
    } else {
      setName(category.name);
      setImagePreview(category.image.url);
      setSubcategories(category.subCategory);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Category Updated Successfully");
      dispatch(categoryDetails(id));
      navigate("/admin/categories");
      dispatch({
        type: UPDATE_CATEGORY_RESET,
      });
    }

    if (detailsError) {
      alert.error(detailsError);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, isUpdated, navigate, id, detailsError, category]);

  return (
    <>
      <SEO title="Edit Category - BrickWind" />
      <div className={`${EditCategoriesStyles.editcategories} container-fluid`}>
        {loading || detailsLoading ? (
          <SpinnerLoader />
        ) : (
          <>
            <h2>Update Category</h2>
            <div className="row justify-content-center">
              <div className="col-md-6">
                <form
                  onSubmit={updateCategoryHandler}
                  encType="multipart/form-data"
                >
                  <input
                    type="text"
                    placeholder="Enter Category Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                    value={name}
                  />
                  <input onChange={categoryImageHandle} type="file" />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Category"
                      width={100}
                      height={100}
                    />
                  )}
                  <div className={`${EditCategoriesStyles.subcategories}`}>
                    <h3 className="my-5 text-center">Update Sub-Categories</h3>
                    {subCategories[0] &&
                      subCategories.map((subCat, i) => {
                        return (
                          <>
                            <form key={i} onSubmit={deletesubcatHandler}>
                              <input
                                type="text"
                                value={subCat}
                                onChange={(e) => {
                                  subCategories[i] = e.target.value;
                                }}
                              />
                              <input
                                type="submit"
                                value="Delete"
                                onClick={(e) => deletesubcatHandler(e, i)}
                              />
                            </form>
                          </>
                        );
                      })}
                  </div>
                  <input type="submit" value="Update Category" />
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EditCategories;

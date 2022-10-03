import React, { useState, useEffect } from "react";
import AddProductStyles from "./addproduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  clearErrors,
} from "../../../store/Actions/ProductActions";
import { allCategories } from "../../../store/Actions/CategoryActions";
import { useAlert } from "react-alert";
import { CREATE_PRODUCT_RESET } from "../../../store/Constants/ProductConstants";
import { useNavigate } from "react-router-dom";
import SpinnerLoader from "../../../components/SpinnerLoader/SpinnerLoader";
import SEO from "../../../components/SEO/SEO";

const AddProduct = () => {
  const { loading, error, success } = useSelector(
    (state) => state.createproduct
  );
  const {
    loading: catLoading,
    error: catError,
    categories,
  } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discription, setDiscription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [currentSubCategories, setCurrentSubCategories] = useState([]);

  const categoryHandle = (e) => {
    setCategory(e.target.value);
    let filterSubCategories = categories.filter(
      (val) => val.name === e.target.value
    );
    const getSubCategories = filterSubCategories[0].subCategory;
    setCurrentSubCategories(getSubCategories);
  };

  const createProductImageChangeHandler = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, file]);
          setImagesPreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("discription", discription);
    myForm.set("category", category);
    myForm.set("subcategory", subCategory);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    if (category === "") {
      alert.error("Please Select Any Category");
    } else if (subCategory === "") {
      alert.error("Please Select Sub-Category");
    } else if (images.length < 2) {
      alert.error("Please Choose Atleast 2 Images");
    } else {
      dispatch(createProduct(myForm));
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created SuccessFully");
      setImages([]);
      setImagesPreview([]);
      setName("");
      setDiscription("");
      setStock("");
      setPrice("");
      dispatch({
        type: CREATE_PRODUCT_RESET,
      });
    }

    if (catError) {
      alert.error(catError);
      dispatch(clearErrors());
    }

    dispatch(allCategories());
  }, [dispatch, alert, error, success, navigate, catError]);

  return (
    <>
      <SEO title="Add Product - BrickWind" />
      <div className={AddProductStyles.addproduct}>
        <div className="container">
          <div className="row justify-content-center">
            {loading || catLoading ? (
              <SpinnerLoader />
            ) : (
              <div className="col-md-7">
                <h2 className="text-center">Add Product</h2>
                <form
                  onSubmit={createProductSubmitHandler}
                  encType="multipart/form-data"
                >
                  <input
                    type="text"
                    placeholder="Enter Product Name"
                    onChange={(e) => setName(e.target.value)}
                    required
                    value={name}
                  />
                  <textarea
                    placeholder="Enter Product Discription"
                    required
                    rows={5}
                    onChange={(e) => setDiscription(e.target.value)}
                    value={discription}
                  ></textarea>
                  <span
                    style={{
                      fontSize: 12,
                    }}
                  >
                    Category:{" "}
                  </span>
                  <select onChange={categoryHandle}>
                    <option value="">Select Category</option>
                    {categories?.map((val, i) => {
                      return (
                        <option key={i} value={val.name}>
                          {val.name}
                        </option>
                      );
                    })}
                  </select>
                  {currentSubCategories[0] && (
                    <>
                      <span
                        style={{
                          fontSize: 12,
                        }}
                      >
                        Sub-Category:{" "}
                      </span>
                      <select
                        onChange={(e) => setSubCategory(e.target.value)}
                        required
                      >
                        <option value="">Select Sub-Category</option>
                        {currentSubCategories.map((val, i) => {
                          return (
                            <option value={val} key={i}>
                              {val}
                            </option>
                          );
                        })}
                      </select>
                    </>
                  )}
                  <input
                    min={1}
                    type="number"
                    placeholder="Enter Product Price"
                    required
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                  <input
                    min={1}
                    type="number"
                    placeholder="Enter Product Stock"
                    required
                    onChange={(e) => setStock(e.target.value)}
                    value={stock}
                  />
                  <div className={AddProductStyles.addimagesbox}>
                    <input
                      onChange={createProductImageChangeHandler}
                      type="file"
                      accept="image/*"
                      multiple
                      required
                    />
                    <div>
                      {imagesPreview.map((image, i) => {
                        return (
                          <img
                            src={image}
                            key={i}
                            alt="Products"
                            width={100}
                            height={100}
                            className="m-2"
                          />
                        );
                      })}
                    </div>
                  </div>
                  <input type="submit" value="Create Product" />
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;

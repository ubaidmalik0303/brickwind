import React, { useState, useEffect } from "react";
import UpdateProductStyles from "./updateproduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  getProductDetails,
  clearErrors,
} from "../../../store/Actions/ProductActions";
import { allCategories } from "../../../store/Actions/CategoryActions";
import { useAlert } from "react-alert";
import { UPDATE_PRODUCT_RESET } from "../../../store/Constants/ProductConstants";
import SpinnerLoader from "../../../components/SpinnerLoader/SpinnerLoader";
import { useParams, useNavigate } from "react-router-dom";
import SEO from "../../../components/SEO/SEO";

const UpdateProduct = () => {
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);
  const { error, product, loading } = useSelector(
    (state) => state.productDetails
  );
  const {
    error: catError,
    loading: catLoading,
    categories,
  } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discription, setDiscription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [currentSubCategories, setCurrentSubCategories] = useState([]);

  const categoryHandle = (e) => {
    setCategory(e.target.value);
    let filterSubCategories = categories?.filter(
      (val) => val.name === e.target.value
    );
    const getSubCategories = filterSubCategories[0]?.subCategory;
    setCurrentSubCategories(getSubCategories);
  };

  const updateProductImageChangeHandler = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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

  const updateProductSubmitHandler = (e) => {
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

    if (images[0]) {
      if (images.length < 2) {
        alert.error("Please Choose Atleast 2 Images");
      } else {
        dispatch(updateProduct(id, myForm));
      }
    } else {
      dispatch(updateProduct(id, myForm));
    }
  };

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setDiscription(product.discription);
      setPrice(product.price);
      setStock(product.stock);
      setCategory(product.category);
      setSubCategory(product.subcategory);
      setOldImages(product.images);
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated SuccessFully");
      dispatch(getProductDetails(id));
      navigate("/admin/products");
      dispatch({
        type: UPDATE_PRODUCT_RESET,
      });
    }

    if (catError) {
      alert.error(catError);
      dispatch(clearErrors());
    }

    dispatch(allCategories());
  }, [
    dispatch,
    alert,
    error,
    isUpdated,
    navigate,
    id,
    product,
    updateError,
    catError,
  ]);

  return (
    <>
      <SEO title="Update Product - BrickWind" />
      <div className={UpdateProductStyles.updateproduct}>
        <div className="container">
          <div className="row justify-content-center">
            {loading || updateLoading || catLoading ? (
              <SpinnerLoader />
            ) : (
              <div className="col-md-7">
                <h2 className="text-center">Update Product</h2>
                <form
                  onSubmit={updateProductSubmitHandler}
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
                    {categories.map((val, i) => {
                      return (
                        <option
                          selected={
                            product.category === val.name ? true : false
                          }
                          key={i}
                          value={val.name}
                        >
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
                      <select onChange={(e) => setSubCategory(e.target.value)}>
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
                  <div className={UpdateProductStyles.updateimagesbox}>
                    <input
                      onChange={updateProductImageChangeHandler}
                      type="file"
                      accept="image/*"
                      multiple
                    />
                    <div>
                      {oldImages &&
                        oldImages.map((image, i) => {
                          return (
                            <img
                              src={image.url}
                              key={i}
                              alt="Products"
                              width={100}
                              height={100}
                              className="m-2"
                            />
                          );
                        })}
                    </div>
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
                  <input type="submit" value="Update Product" />
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;

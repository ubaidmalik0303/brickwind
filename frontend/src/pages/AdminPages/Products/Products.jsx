import React, { useEffect } from "react";
import ProductsStyles from "./products.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProducts,
  deleteProduct,
} from "../../../store/Actions/ProductActions";
import { useAlert } from "react-alert";
import SpinnerLoader from "../../../components/SpinnerLoader/SpinnerLoader";
import { DELETE_PRODUCT_RESET } from "../../../store/Constants/ProductConstants";
import SEO from "../../../components/SEO/SEO";


const Products = () => {
  const { error, products, loading } = useSelector((state) => state.products);
  const {
    error: deleteProductError,
    isDeleted,
    loading: deleteProductLoading,
  } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const alert = useAlert();

  const deleteProductHandle = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted SuccessFully");
      dispatch({
        type: DELETE_PRODUCT_RESET,
      });
    }

    if (deleteProductError) {
      alert.error(deleteProductError);
      dispatch(clearErrors());
    }

    dispatch(getAdminProducts());
  }, [alert, dispatch, error, isDeleted, deleteProductError]);

  return (
    <>
      <SEO title="Products - BrickWind" />
      <div className={ProductsStyles.adminproducts}>
        <h2 className="text-center my-3">All Products</h2>
        <div className={ProductsStyles.adminproductsoptions}>
          {/* <form>
          <input type="text" placeholder="Search By Product ID" />
          <input type="submit" value="Search" />
        </form> */}
          <Link to="/admin/products/add-product">ADD PRODUCT</Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Sub-Category</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading || deleteProductLoading ? (
              <SpinnerLoader />
            ) : (
              products.map((prd, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <Link
                        to={`/store/${prd?.category}/${prd?.subcategory}/${prd._id}`}
                      >
                        {prd._id}
                      </Link>
                    </td>
                    <td>{prd.name}</td>
                    <td>{prd.category}</td>
                    <td>{prd.subcategory}</td>
                    <td>{prd.stock < 1 ? "Out Of Stock" : prd.stock}</td>
                    <td>{prd.price}</td>
                    <td>
                      <Link
                        className={ProductsStyles.editproductbtn}
                        to={`/admin/products/update-product/${prd._id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className={ProductsStyles.deleteproductbtn}
                        onClick={() => deleteProductHandle(prd._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Products;

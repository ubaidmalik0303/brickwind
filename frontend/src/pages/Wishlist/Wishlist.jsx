import React, { useEffect } from "react";
import WishlistStyles from "./wishlist.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";
import { FiX, FiHeart } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  getWishlist,
  clearErrors,
  removeFromWishlist,
} from "../../store/Actions/WishlistActions";
import { addItemsToCart } from "../../store/Actions/CartActions";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";
import { REMOVE_FROM_WISHLIST_RESET } from "../../store/Constants/WishlistConstant";
import SEO from "../../components/SEO/SEO";

const Wishlist = () => {

  const stringShort = (string) => {
    const newStr = string.slice(0, 50);
    return newStr + ".....";
  };

  const { wishlist, loading, error } = useSelector(
    (state) => state.getwishlist
  );
  const {
    loading: removeWishlistLoading,
    error: removeWishlistError,
    isDeleted,
  } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const alert = useAlert();

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const addtoCarthandler = (productid) => {
    dispatch(addItemsToCart(productid, 1));
    alert.success("Product Added To Cart Successfully.");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (removeWishlistError) {
      alert.error(removeWishlistError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      dispatch({
        type: REMOVE_FROM_WISHLIST_RESET,
      });
    }

    dispatch(getWishlist());
  }, [dispatch, alert, error, removeWishlistError, isDeleted]);

  return (
    <>
      <SEO title="Wishlist - BrickWind" />
      <Breadcrumb name="WISHLIST" breadcrumbpath=" > Wishlist" />
      <div className={`container-fluid ${WishlistStyles.wishlist} p-3 p-md-5`}>
        {!wishlist[0] ? (
          <>
            <div className="container text-center">
              <FiHeart size={100} />
              <h4 className="my-4">Your Wishlist Is Empty!</h4>
              <Link to="/store">View Products</Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="mt-4 mb-5">My Wishlist</h1>
            <table>
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>PRICE</th>
                  <th>STOCK STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading || removeWishlistLoading ? (
                  <SpinnerLoader />
                ) : (
                  wishlist?.map((product, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <div>
                            <img
                              src={product?.images[0]?.url}
                              alt={product?.name}
                            />
                            <FiX
                              color="black"
                              size={20}
                              onClick={() =>
                                handleRemoveFromWishlist(product._id)
                              }
                            />
                          </div>
                          <p>{stringShort(product?.name)}</p>
                        </td>
                        <td>
                          <span>${product?.price}</span>
                        </td>
                        <td>
                          <span>
                            {" "}
                            {product.stock > 0
                              ? product.stock < 10
                                ? `Only ${product.stock} Items Left`
                                : "In Stock"
                              : "Out Of Stock"}
                          </span>
                        </td>
                        <td>
                          <Link
                            to={`/store/${product?.category}/${product?.subcategory}/${product?._id}`}
                          >
                            VIEW PRODUCT
                          </Link>
                          <button onClick={() => addtoCarthandler(product._id)}>
                            ADD TO CART
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default Wishlist;

import React, { useState, useEffect } from "react";
import ProductPageStyles from "./productpage.module.css";
import StorePath from "../../components/StorePath/StorePath";
import ReactStars from "react-rating-stars-component";
import { FiHeart, FiStar } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  getProductDetails,
  getProducts,
  newReview,
} from "../../store/Actions/ProductActions";
import { addItemsToCart } from "../../store/Actions/CartActions";
import {
  addToWishlist,
  removeFromWishlist,
  clearErrors,
} from "../../store/Actions/WishlistActions";
import { loadUser } from "../../store/Actions/UserActions";
import {
  ADD_TO_WISHLIST_RESET,
  REMOVE_FROM_WISHLIST_RESET,
} from "../../store/Constants/WishlistConstant";
import { NEW_REVIEW_RESET } from "../../store/Constants/ProductConstants";
import Carousel from "react-multi-carousel";
import ProductCard from "../../components/ProductCard/ProductCard";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import SEO from "../../components/SEO/SEO";

const ProductPage = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const { loading, product } = useSelector((state) => state.productDetails);
  const {
    error: relatedProductsError,
    loading: relatedProductsLoading,
    products,
  } = useSelector((state) => state.products);
  const {
    isAuthenticated,
    user,
    loading: userLoading,
  } = useSelector((state) => state.user);
  const { success, error, isDeleted } = useSelector((state) => state.wishlist);
  const { success: reviewSuccess, error: reviewError } = useSelector(
    (state) => state.newreview
  );
  const dispatch = useDispatch();

  const isPurchased = user?.purchasedItems?.filter(
    (val) => val?.product?.toString() === product._id?.toString()
  );

  const alert = useAlert();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [show, setShow] = useState(false);
  const [showReviewBox, setShowReviewBox] = useState(false);
  let [quantity, setQuantity] = useState(1);
  const { productid, category, subcategory } = useParams();

  const stringShort = (string) => {
    const newStr = string.slice(0, 250);
    return newStr + `...`;
  };

  const extractVariation = (str) => {
    const newAry = str.split(",");
    return newAry;
  };

  const changeMainImage = (url) => {
    setMainImage(url);
  };

  const reviewSubmitHandler = () => {
    const mydata = {
      rating,
      comment,
      productid: product._id,
    };

    if (rating === "" || comment === "") {
      alert.error("Please Fill Review Form");
    } else {
      dispatch(newReview(mydata));
      setShowReviewBox(false);
    }
  };

  const addtoCarthandler = () => {
    if (isAuthenticated) {
      dispatch(addItemsToCart(productid, quantity));
      alert.success("Product Added To Cart Successfully.");
    } else {
      alert.error("Please Login To Add Products To Your Cart!");
      navigate("/login");
    }
  };

  const isWish = user?.wishlist?.filter((val) => val === product?._id);

  const wishlistHandler = (e, id) => {
    e.preventDefault();
    if (isAuthenticated) {
      if (isWish[0]) {
        dispatch(removeFromWishlist(id));
      } else {
        dispatch(addToWishlist(id));
      }
    } else {
      alert.error("Please Login To Add Products To Your Wishlist!");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (success) {
      dispatch({
        type: ADD_TO_WISHLIST_RESET,
      });
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      dispatch({
        type: REMOVE_FROM_WISHLIST_RESET,
      });
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (reviewSuccess) {
      alert.success("Review Submitted Successfully");
      dispatch({
        type: NEW_REVIEW_RESET,
      });
    }

    if (relatedProductsError) {
      alert.error(relatedProductsError);
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(productid));
    dispatch(getProducts("", 1, [0, 5000], category, subcategory, 0));
  }, [
    dispatch,
    productid,
    error,
    alert,
    isDeleted,
    success,
    reviewSuccess,
    reviewError,
    relatedProductsError,
    category,
    subcategory,
  ]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch, isDeleted, success]);

  return (
    <>
      {!loading && (
        <SEO
          title={`${product.name}`}
          discription={stringShort(product.discription)}
        />
      )}
      <StorePath />
      <Modal show={showReviewBox} onHide={() => setShowReviewBox(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactStars
            value={rating}
            size={50}
            count={5}
            onChange={(e) => setRating(e)}
          />
          <textarea
            placeholder="Your Comment"
            value={comment}
            style={{
              width: "100%",
            }}
            rows={5}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            style={{
              color: "white",
              border: "none",
              padding: "10px 20px",
              backgroundColor: "black",
            }}
            onClick={() => reviewSubmitHandler()}
          >
            Submit
          </button>
        </Modal.Body>
      </Modal>
      {product && (
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Product Discription</Modal.Title>
          </Modal.Header>
          <Modal.Body>{product.discription}</Modal.Body>
        </Modal>
      )}
      <div className={`container-fluid ${ProductPageStyles.productpage}`}>
        <div className="container">
          {loading ? (
            <SpinnerLoader />
          ) : (
            product && (
              <div className="row">
                <div className="col-md-5 py-3">
                  <img
                    src={mainImage === "" ? product.images[0].url : mainImage}
                    className="w-100"
                    height={500}
                    alt={product?.name}
                  />
                  <hr />
                  <div className={ProductPageStyles.productimagesrow}>
                    {product.images.map((val, i) => {
                      return (
                        <img
                          onClick={() => changeMainImage(val.url)}
                          key={i}
                          src={val.url}
                          alt={product?.name}
                          width={100}
                          height={100}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="col-md-7 py-3">
                  <h2>{product.name}</h2>
                  <ReactStars
                    size={25}
                    count={5}
                    edit={false}
                    value={product?.ratings}
                  />
                  <span className={ProductPageStyles.ratings}>
                    {product?.numOfReviews < 1
                      ? "(No Reviews Yet)"
                      : `(${product?.numOfReviews} Reviews)`}
                  </span>
                  <br />
                  {!userLoading &&
                    isAuthenticated &&
                    isPurchased[0] &&
                    !isPurchased[0]?.isReviewed && (
                      <span
                        className={ProductPageStyles.submitreview}
                        onClick={() => setShowReviewBox(true)}
                      >
                        Submit Review
                      </span>
                    )}
                  <hr style={{ width: 50 }} />
                  <span className={ProductPageStyles.price}>
                    ${product.price}.00
                  </span>
                  <p className={ProductPageStyles.discription}>
                    {stringShort(product.discription)}
                    <span
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => setShow(true)}
                    >
                      Read More
                    </span>
                  </p>
                  <span className={ProductPageStyles.category}>
                    PRODUCT ID: <b>{product._id}</b>
                  </span>
                  <br />
                  <span className={ProductPageStyles.category}>
                    CATEGORY: <b>{product.category}</b>
                  </span>
                  <br />
                  <span className={ProductPageStyles.category}>
                    SUB-CATEGORY: <b>{product.subcategory}</b>
                  </span>
                  <br />
                  {product.vatiation && (
                    <div className={ProductPageStyles.variation}>
                      <span>VARIATION:</span>
                      <select className="mx-2" name="" id="">
                        {extractVariation(product.sizes).map((val, i) => {
                          return (
                            <option key={i} value={val}>
                              {val}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  )}
                  <span className={ProductPageStyles.category}>
                    STATUS:{" "}
                    <b
                      style={{
                        color: product.stock < 1 ? "red" : "green",
                      }}
                    >
                      {product.stock < 1 ? "Out Of Stock" : "In Stock"}
                    </b>
                  </span>
                  <div className={`${ProductPageStyles.quantity} my-3`}>
                    <span>QUANTITY:</span>
                    <input
                      type="number"
                      min={1}
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => {
                        if (e.target.value > product.stock) {
                          setQuantity(product.stock);
                        } else if (e.target.value < 1) {
                          setQuantity(1);
                        } else {
                          setQuantity(e.target.value);
                        }
                      }}
                    />
                  </div>
                  <button
                    disabled={product?.stock < 1 ? true : false}
                    onClick={addtoCarthandler}
                    className={ProductPageStyles.addtocardbtn}
                  >
                    ADD TO CART
                  </button>
                  <hr className="my-3" />
                  <span
                    style={{
                      color: isWish && isWish[0] ? "red" : "grey",
                    }}
                    className={ProductPageStyles.addtowishlist}
                    onClick={(e) => wishlistHandler(e, product._id)}
                  >
                    ADD TO WISHLIST{" "}
                    <FiHeart
                      color={isWish && isWish[0] ? "red" : "grey"}
                      fill={isWish && isWish[0] ? "red" : "transparent"}
                      size={14}
                    />
                  </span>
                </div>
              </div>
            )
          )}
        </div>
        <div className="container py-5">
          <hr />
          <h3 className="my-4">Related Products:</h3>
          {relatedProductsLoading ? (
            <SpinnerLoader />
          ) : (
            <Carousel responsive={responsive}>
              {products.map((related) => {
                if (related._id !== product._id) {
                  return <ProductCard data={related} />;
                }
              })}
            </Carousel>
          )}
        </div>
        <div className={`container ${ProductPageStyles.reviews}`}>
          <hr />
          <h3 className="my-4">Reviews For This Product</h3>
          {loading ? (
            <SpinnerLoader />
          ) : product?.reviews[0] ? (
            <div className="row py-4">
              {product?.reviews?.map((review, i) => {
                return (
                  <div key={i} className="col-md-6 p-3">
                    <ReviewCard data={review} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="container-fluid text-center py-5">
              <FiStar size={100} />
              <h4>No Reviews Yet!</h4>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;

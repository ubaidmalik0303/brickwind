import React, { useEffect } from "react";
import ProductCardStyles from "./productCard.module.css";
import ReactStars from "react-rating-stars-component";
import { FiArrowRight, FiHeart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../../store/Actions/CartActions";
import { useAlert } from "react-alert";
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

const ProductCard = ({ data }) => {
  const stringShort = (string) => {
    const newStr = string.slice(0, 50);
    return newStr + ".....";
  };

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { success, error, isDeleted } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const isWish = user?.wishlist?.filter((val) => val === data?._id);

  const addtoCarthandler = (productid) => {
    if (isAuthenticated) {
      dispatch(addItemsToCart(productid, 1));
      alert.success("Product Added To Cart Successfully.");
    } else {
      alert.error("Please Login To Add Products To Your Cart!");
      navigate("/login");
    }
  };

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
  }, [dispatch, error, success, alert, isDeleted]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch, isDeleted, success]);

  return (
    <Link
      className={ProductCardStyles.productCardLink}
      to={`/store/${data.category}/${data.subcategory}/${data._id}`}
    >
      <div className={ProductCardStyles.productCard}>
        <div className={ProductCardStyles.upperBody}>
          <img
            src={data.images[0].url}
            height={180}
            width={180}
            alt={data?.name}
          />
          <div className={ProductCardStyles.hoverCard}>
            <FiArrowRight
              className={ProductCardStyles.rightArrow}
              color="black"
              size={30}
            />
            <button
              disabled={data?.stock < 1 ? true : false}
              onClick={(e) => {
                e.preventDefault();
                addtoCarthandler(data._id);
              }}
            >
              ADD TO CART
            </button>
          </div>
        </div>
        <div className="d-flex py-1 px-1">
          <span>{data.category}</span>
          <FiHeart
            color={isWish && isWish[0] ? "red" : "grey"}
            fill={isWish && isWish[0] ? "red" : "transparent"}
            size={18}
            style={{ margin: "0 0 0 auto" }}
            onClick={(e) => wishlistHandler(e, data._id)}
          />
        </div>
        <h3 className="px-1">{stringShort(data.name)}</h3>
        <ReactStars
          classNames="mx-1"
          count={5}
          edit={false}
          value={data.ratings}
        />
        <span className={`${ProductCardStyles.price} px-1`}>
          ${data.price}.00
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;

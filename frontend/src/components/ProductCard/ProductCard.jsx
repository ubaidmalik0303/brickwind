import React from "react";
import ProductCardStyles from "./productCard.module.css";
import ImageDummy from "../../assets/headphone-3.jpg";
import ReactStars from "react-rating-stars-component";
import { FiArrowRight, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProductCard = () => {
  return (
    <Link className={ProductCardStyles.productCardLink} to="/hello">
      <div className={ProductCardStyles.productCard}>
        <div className={ProductCardStyles.upperBody}>
          <img src={ImageDummy} className="img-fluid" alt="" />
          <div className={ProductCardStyles.hoverCard}>
            <FiArrowRight
              className={ProductCardStyles.rightArrow}
              color="black"
              size={30}
            />
            <button onClick={(e) => {e.preventDefault(); alert("Hello World")}}>ADD TO CART</button>
          </div>
        </div>
        <span>Home-Decor</span>
        <FiHeart
          color="grey"
          size={18}
          style={{ position: "relative", left: "85px" }}
        />
        <h3>Kitchen Crokery</h3>
        <ReactStars count={5} edit={false} value={3.5} />
        <span className={ProductCardStyles.price}>$103.00</span>
      </div>
    </Link>
  );
};

export default ProductCard;

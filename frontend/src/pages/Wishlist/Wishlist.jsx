import React from "react";
import WishlistStyles from "./wishlist.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import DummyImage from "../../assets/headphone-3.jpg";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";

const Wishlist = () => {
  return (
    <>
      <Breadcrumb name="WISHLIST" breadcrumbpath=" > Wishlist" />
      <div className={`container-fluid ${WishlistStyles.wishlist} p-3 p-md-5`}>
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
              <tr>
                <td>
                  <div>
                    <img src={DummyImage} alt="" />
                    <FiX color="black" size={20} />
                  </div>
                  <p>Product Name</p>
                </td>
                <td>
                  <span>$300</span>
                </td>
                <td>
                  <span>In Stock</span>
                </td>
                <td>
                  <Link to="/">VIEW PRODUCT</Link>
                  <button>ADD TO CART</button>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
    </>
  );
};

export default Wishlist;

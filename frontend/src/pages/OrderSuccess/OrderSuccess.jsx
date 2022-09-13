import React from "react";
import OrderSuccessStyles from "./OrderSuccess.module.css";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO/SEO";

const OrderSuccess = () => {
  return (
    <>
      <SEO title="Order Success - BrickWind" />
      <div
        className={`container-fluid ${OrderSuccessStyles.orderSuccess} text-center`}
      >
        <div className="py-5"></div>
        <div className="py-5">
          <FaCheckCircle size={100} />
          <h2>Your order has been Placed Successfully</h2>
          <Link to="/my-account/my-orders">View Orders</Link>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;

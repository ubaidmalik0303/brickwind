import React from "react";
import OrderStyles from "./Order.module.css";
import ShippingStepper from "../../components/ShippingStepper/ShippingStepper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/SEO/SEO";

const Order = () => {
  const { user } = useSelector((state) => state.user);
  let { cartItems, shippingInfo } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  cartItems = cartItems.filter((val) => val?.createdBy === user?._id);

  const subTotal = cartItems?.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  // const shippingCharges = subTotal > 500 ? 0 : 5;
  const shippingCharges = 0;
  // const tax = Number((subTotal * 0.18).toFixed(2));
  const tax = 0;
  const totalPrice = Number(subTotal + tax + shippingCharges);

  const address = `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.pincode}, ${shippingInfo?.country}`;

  const proceedToPayment = () => {
    const data = {
      subTotal,
      tax,
      shippingCharges,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/my-account/payment");
  };

  return (
    <>
      <SEO title="Order - BrickWind" />
      <div className={`container-fluid ${OrderStyles.order}`}>
        <div className="py-5 mb-5"></div>
        <ShippingStepper activeStep={1} />
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className={OrderStyles.shippinginfo}>
                <h2>Shippping Info:</h2>
                <p>
                  <b>Name: </b>
                  {user?.name}
                </p>
                <p>
                  <b>Phone No: </b>
                  {shippingInfo?.phoneno}
                </p>
                <p>
                  <b>Adress: </b>
                  {address}
                </p>
              </div>
              <div className={OrderStyles.cartitems}>
                <h2>Your Cart Items:</h2>
                <div>
                  {cartItems &&
                    cartItems?.map((val, i) => {
                      return (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            margin: "10px 30px",
                          }}
                        >
                          <img
                            src={val.image}
                            alt={val.name}
                            width={100}
                            height={100}
                          />
                          <div>
                            <p
                              style={{
                                marginLeft: 10,
                              }}
                            >
                              {val.name}
                            </p>
                            <span
                              style={{
                                marginLeft: 10,
                              }}
                            >
                              {val.quantity} X ${val.price} ={" "}
                              <b>{val.quantity * val.price}</b>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className={`col-md-4 ${OrderStyles.ordersummary}`}>
              <h2 className="text-center">Order Summary</h2>
              <div>
                <span>
                  <b>SubTotal:</b>
                </span>
                <span>${subTotal}</span>
              </div>
              <div>
                <span>
                  <b>Shipping Charges:</b>
                </span>
                <span>${shippingCharges}</span>
              </div>
              <div>
                <span>
                  <b>GST:</b>
                </span>
                <span>${tax}</span>
              </div>
              <hr className="my-4" />
              <div>
                <span>
                  <b>Total:</b>
                </span>
                <span>${totalPrice}</span>
              </div>
              <button onClick={proceedToPayment}>Proceed To Payment</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;

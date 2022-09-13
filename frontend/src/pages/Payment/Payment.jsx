import React, { useRef, useState, useEffect } from "react";
import PaymentStyles from "./Payment.module.css";
import ShippingStepper from "../../components/ShippingStepper/ShippingStepper";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { FaCreditCard, FaCalendar, FaKey } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { axiosInstance } from "../../utils/AxiosInstance";
import { getAuthToken } from "../../utils/authTokenLocalStorage";
import { useNavigate } from "react-router-dom";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";
import { createOrder, clearErrors } from "../../store/Actions/OrderActions";
import SEO from "../../components/SEO/SEO";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const [paymentBtnLoading, setPaymentBtnLoading] = useState(false);

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  let { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.neworder);

  cartItems = cartItems.filter((val) => val?.createdBy === user?._id);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subTotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    setPaymentBtnLoading(true);

    try {
      const token = getAuthToken();

      const config = {
        headers: { "Content-type": "application/json", token },
      };

      const { data } = await axiosInstance.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pincode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        setPaymentBtnLoading(false);
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          navigate("/my-account/payment/success");
        } else {
          alert.error("There's is some issue while processing payment!");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      setPaymentBtnLoading(false);
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <>
      <SEO title="Payment - BrickWind" />
      <div className={`container-fluid ${PaymentStyles.payment}`}>
        <div className="py-5 mb-5"></div>
        <ShippingStepper activeStep={2} />
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 col-sm-6">
            <form onSubmit={submitHandler} className="shadow p-4 my-5">
              <h3 className="text-center">Card Info</h3>
              <div className={PaymentStyles.iconinput}>
                <FaCreditCard />
                <CardNumberElement className={PaymentStyles.paymentinput} />
              </div>
              <div className={PaymentStyles.iconinput}>
                <FaCalendar />
                <CardExpiryElement className={PaymentStyles.paymentinput} />
              </div>
              <div className={PaymentStyles.iconinput}>
                <FaKey />
                <CardCvcElement className={PaymentStyles.paymentinput} />
              </div>
              <button type="submit" ref={payBtn}>
                {paymentBtnLoading ? (
                  <SpinnerLoader size="sm" />
                ) : (
                  `Pay - $${orderInfo && orderInfo?.totalPrice}`
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;

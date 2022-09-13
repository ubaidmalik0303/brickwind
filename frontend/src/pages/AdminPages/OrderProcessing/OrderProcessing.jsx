import React, { useEffect, useState } from "react";
import OrderProcessingStyles from "./OrderProcessing.module.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateOrder,
  orderDetails,
  clearErrors,
} from "../../../store/Actions/OrderActions";
import { UPDATE_ORDER_RESET } from "../../../store/Constants/OrderConstant";
import { useAlert } from "react-alert";
import SpinnerLoader from "../../../components/SpinnerLoader/SpinnerLoader";
import SEO from "../../../components/SEO/SEO";

const OrderProcessing = () => {
  const { loading, error, order } = useSelector((state) => state.orderdetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const [status, setStatus] = useState("");

  const updateOrderhandler = (e) => {
    e.preventDefault();

    dispatch(updateOrder(id, { status }));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({
        type: UPDATE_ORDER_RESET,
      });
    }

    dispatch(orderDetails(id));
  }, [dispatch, error, id, updateError, isUpdated, alert]);
  return (
    <>
      <SEO title="Order Processing - BrickWind" />
      <div className={OrderProcessingStyles.orderprocessing}>
        {loading ? (
          <SpinnerLoader />
        ) : (
          <div className="row py-5 px-3">
            <div
              className={`${
                order?.orderStatus === "Delivered" ? "col-12" : "col-md-8"
              }`}
            >
              <h1>Order ID: {order?._id}</h1>
              <div className={OrderProcessingStyles.shippinginfo}>
                <h4>Shipping Info</h4>
                <span>
                  <b>Name: </b>
                  {order?.user?.name}
                </span>
                <span>
                  <b>Phone: </b>
                  {order?.shippingInfo?.phoneno}
                </span>
                <span>
                  <b>Phone: </b>
                  {`${order?.shippingInfo?.address}, ${order?.shippingInfo?.city}, ${order?.shippingInfo?.state}, ${order?.shippingInfo?.pincode}, ${order?.shippingInfo?.country}`}
                </span>
              </div>
              <div className={OrderProcessingStyles.payment}>
                <h4>Payment</h4>
                <span
                  className={
                    order?.paymentInfo?.status === "succeeded"
                      ? OrderProcessingStyles.orderstatusgreen
                      : OrderProcessingStyles.orderstatusred
                  }
                >
                  {order?.paymentInfo?.status === "succeeded"
                    ? "PAID"
                    : "NOT PAID"}
                </span>
                <span>
                  <b>Amount: </b>${order?.totalPrice}
                </span>
              </div>
              <div className={OrderProcessingStyles.orderstatus}>
                <h4>Order Status</h4>
                <span
                  className={
                    order?.orderStatus === "Delivered"
                      ? OrderProcessingStyles.orderstatusgreen
                      : OrderProcessingStyles.orderstatusred
                  }
                >
                  {order?.orderStatus}
                </span>
              </div>
              <div className={OrderProcessingStyles.orderitems}>
                <h4>Order Items</h4>
                {order?.orderItems?.map((val, i) => {
                  return (
                    <Link
                      key={i}
                      to={`/store/${val?.category}/${val?.subcategory}/${val?.product}`}
                    >
                      <div className={OrderProcessingStyles.orderitem}>
                        <img
                          src={val?.image}
                          alt={val?.name}
                          width={100}
                          height={100}
                        />
                        <div className="px-2">
                          <b>{val?.name}</b>
                          <p>
                            {val?.quantity} X {val?.price} = $
                            {val?.quantity * val?.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
            {order?.orderStatus !== "Delivered" && (
              <div className="col-md-4">
                <div
                  className={`${OrderProcessingStyles.processbox} shadow p-4`}
                >
                  <div className="col-12">
                    <form onSubmit={updateOrderhandler}>
                      <h3>Process Order</h3>
                      <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Update Status</option>
                        {order?.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}
                        {order?.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                      <input
                        type="submit"
                        value="Process"
                        disabled={
                          loading ? true : false || status === "" ? true : false
                        }
                      />
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderProcessing;

import React, { useEffect } from "react";
import OrderDetailsStyles from "./OrderDetails.module.css";
import BreadCrumb from "../../components/Breadcrumb/Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { orderDetails, clearErrors } from "../../store/Actions/OrderActions";
import { useAlert } from "react-alert";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";
import { Link, useParams } from "react-router-dom";
import SEO from "../../components/SEO/SEO";

const OrderDetails = () => {
  const { error, loading, order } = useSelector((state) => state.orderdetails);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(orderDetails(id));
  }, [dispatch, error, alert, id]);

  return (
    <>
      <SEO title="Order Details - BrickWind" />
      <BreadCrumb name="Order Details" breadcrumbpath=" > Order Details" />
      <div className={`container-fluid ${OrderDetailsStyles.orderdetails}`}>
        {loading ? (
          <SpinnerLoader />
        ) : (
          <>
            <div className="row py-5 px-3">
              <div className="col-md-8">
                <h1>Order ID: {order?._id}</h1>
                <div className={OrderDetailsStyles.shippinginfo}>
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
                <div className={OrderDetailsStyles.payment}>
                  <h4>Payment</h4>
                  <span
                    className={
                      order?.paymentInfo?.status === "succeeded"
                        ? OrderDetailsStyles.orderstatusgreen
                        : OrderDetailsStyles.orderstatusred
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
                <div className={OrderDetailsStyles.orderstatus}>
                  <h4>Order Status</h4>
                  <span
                    className={
                      order?.paymentInfo?.status === "delivered"
                        ? OrderDetailsStyles.orderstatusgreen
                        : OrderDetailsStyles.orderstatusred
                    }
                  >
                    {order?.orderStatus}
                  </span>
                </div>
              </div>
              <div className="col-md-4">
                <div className={OrderDetailsStyles.orderitems}>
                  <h4>Order Items</h4>
                  {order?.orderItems?.map((val, i) => {
                    return (
                      <Link
                        key={i}
                        to={`/store/${val?.category}/${val?.subcategory}/${val?.product}`}
                      >
                        <div className={OrderDetailsStyles.orderitem}>
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
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderDetails;

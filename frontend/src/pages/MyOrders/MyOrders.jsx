import React, { useEffect } from "react";
import MyOrdersStyles from "./myorders.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { FaReceipt, FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { myOrders, clearErrors } from "../../store/Actions/OrderActions";
import { useAlert } from "react-alert";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";
import SEO from "../../components/SEO/SEO";

const MyOrders = () => {
  const { error, loading, orders } = useSelector((state) => state.myorders);
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error, alert]);

  return (
    <>
      <SEO title="My Orders - BrickWind" />

      <Breadcrumb name="MY ORDERS" breadcrumbpath=" > My Orders" />
      <div className={`container-fluid ${MyOrdersStyles.myorders} p-3 p-md-5`}>
        {loading ? (
          <SpinnerLoader />
        ) : !orders[0] ? (
          <div className="container text-center">
            <FaReceipt size={100} />
            <h4 className="my-4">You Have No Orders Yet!</h4>
            <Link to="/store">View Products</Link>
          </div>
        ) : (
          <>
            {console.log(orders)}
            <h1 className="mt-4 mb-5">My Shopping Cart</h1>
            <table>
              <thead>
                <tr>
                  <th>ORDER ID</th>
                  <th>STATUS</th>
                  <th>ITEMS QTY</th>
                  <th>AMOUNT</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((val, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <span className={MyOrdersStyles.mobileheading}>
                          ORDER ID:
                        </span>
                        <span>{val._id}</span>
                      </td>
                      <td>
                        <span className={MyOrdersStyles.mobileheading}>
                          STATUS:
                        </span>
                        <span
                          className={
                            val.orderStatus === "Processing"
                              ? MyOrdersStyles.orderstatusred
                              : MyOrdersStyles.orderstatusgreen
                          }
                        >
                          {val.orderStatus}
                        </span>
                      </td>
                      <td>
                        <span className={MyOrdersStyles.mobileheading}>
                          ITEMS QTY:
                        </span>
                        <span>{val.orderItems.length}</span>
                      </td>
                      <td>
                        <span className={MyOrdersStyles.mobileheading}>
                          AMOUNT:
                        </span>
                        <span>${val.totalPrice}</span>
                      </td>
                      <td>
                        <span className={MyOrdersStyles.mobileheading}>
                          ACTIONS:
                        </span>
                        <Link to={`/my-account/my-orders/${val._id}`}>
                          <FaLink />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default MyOrders;

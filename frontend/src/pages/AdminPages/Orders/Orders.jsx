import React, { useEffect } from "react";
import OrdersStyles from "./orders.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  allOrders,
  deleteOrder,
  clearErrors,
} from "../../../store/Actions/OrderActions";
import { DELETE_ORDER_RESET } from "../../../store/Constants/OrderConstant";
import { useAlert } from "react-alert";
import SpinnerLoader from "../../../components/SpinnerLoader/SpinnerLoader";
import { useNavigate, Link } from "react-router-dom";
import SEO from "../../../components/SEO/SEO";

const Orders = () => {
  const { orders, error, loading } = useSelector((state) => state.allorders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      navigate("/admin");
      dispatch({
        type: DELETE_ORDER_RESET,
      });
    }

    dispatch(allOrders());
  }, [dispatch, error, alert, isDeleted, deleteError, navigate]);

  return (
    <>
      <SEO title="Orders - BrickWind" />

      <div className={OrdersStyles.orders}>
        <h2 className="text-center my-3">All Products</h2>
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
            {loading ? (
              <SpinnerLoader />
            ) : (
              orders?.map((val, i) => {
                return (
                  <tr key={i}>
                    <td>{val._id}</td>
                    <td
                      className={
                        val.orderStatus === "Delivered"
                          ? OrdersStyles.orderstatusgreen
                          : OrdersStyles.orderstatusred
                      }
                    >
                      {val.orderStatus}
                    </td>
                    <td>{val.orderItems.length}</td>
                    <td>${val.totalPrice}</td>
                    <td>
                      <Link
                        to={`/admin/order/${val._id}`}
                        className={OrdersStyles.editbtn}
                      >
                        Process
                      </Link>
                      <button
                        className={OrdersStyles.deletebtn}
                        onClick={() => deleteOrderHandler(val._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;

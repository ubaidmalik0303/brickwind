import React, { useEffect } from "react";
import DashboardStyles from "./dashboard.module.css";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import SEO from "../../../components/SEO/SEO";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts } from "../../../store/Actions/ProductActions";
import { allOrders } from "../../../store/Actions/OrderActions";
import { getAllusers } from "../../../store/Actions/UserActions";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const Dashboard = () => {
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allorders);
  const { users } = useSelector((state) => state.allusers);
  const dispatch = useDispatch();

  let outOfStock = 0;
  products[0] &&
    products.forEach((element) => {
      if (element.stock === 0) {
        outOfStock += 1;
      }
    });

  let totalSales = 0;
  orders[0] &&
    orders.forEach((element) => {
      totalSales += element.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Total Amount"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: "blue",
        hoverBackgroundColor: ["red"],
        data: [0, totalSales],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out Of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#00d2d9", "#9300a1"],
        hoverBackgroundColor: ["#04afb5", "#70027a"],
        data: [outOfStock, products?.length - outOfStock],
      },
    ],
  };

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(allOrders());
    dispatch(getAllusers());
  }, [dispatch]);

  return (
    <>
      <SEO title="Dashboard - BrickWind" />
      <div className={`${DashboardStyles.dashboard} container-fluid`}>
        <div className="bg-primary d-flex justify-content-center py-3">
          <span className={`${DashboardStyles.totalsalesamount}`}>
            TOTAL SALES: ${totalSales}
          </span>
        </div>
        <div className={DashboardStyles.summarybox}>
          <Link to="/admin/products" className="bg-secondary">
            <p>PRODUCTS</p>
            <p>{products?.length}</p>
          </Link>
          <Link to="/admin/orders" className="bg-success">
            <p>ORDERS</p>
            <p>{orders?.length}</p>
          </Link>
          <Link to="/admin/users" className="bg-danger">
            <p>Users</p>
            <p>{users?.length}</p>
          </Link>
        </div>
        <div className="row py-5">
          <div className="col-md-6 p-3">
            <div className={DashboardStyles.stockchart}>
              <Doughnut data={doughnutState} height={250} width={250} />
            </div>
          </div>
          <div className="col-md-6 p-3">
            <div className={DashboardStyles.productchart}>
              <Line data={lineState} height={250} width={250} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store";
import { loadUser } from "./store/Actions/UserActions";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Layout from "./components/Layout/Layout";
import Signup from "./pages/Signup/Signup";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import Store from "./pages/Store/Store";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Search from "./pages/Search/Search";
import ScrollToTopOnNavigate from "./components/ScrollToTopOnNavigate/ScrollToTopOnNavigate";
import MyAccount from "./pages/MyAccount/MyAccount";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import EditAccount from "./pages/EditAccount/EditAccount";
import MyOrders from "./pages/MyOrders/MyOrders";
import ProductPage from "./pages/ProductPage/ProductPage";
import Dashboard from "./pages/AdminPages/Dashboard/Dashboard";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import Users from "./pages/AdminPages/Users/Users";
import Orders from "./pages/AdminPages/Orders/Orders";
import Products from "./pages/AdminPages/Products/Products";
import Reviews from "./pages/AdminPages/Reviews/Reviews";
import Settings from "./pages/AdminPages/Settings/Settings";
import AddProduct from "./pages/AdminPages/AddProduct/AddProduct";
import UpdateProduct from "./pages/AdminPages/UpdateProduct/UpdateProduct";
import Categories from "./pages/AdminPages/Categories/Categories";
import AddCategory from "./pages/AdminPages/AddCategory/AddCategory";
import EditCategories from "./pages/AdminPages/EditCategories/EditCategories";
import Shipping from "./pages/Shipping/Shipping";
import Order from "./pages/Order/Order";
import Payment from "./pages/Payment/Payment";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import OrderProcessing from "./pages/AdminPages/OrderProcessing/OrderProcessing";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminRoute from "./utils/AdminRoute";
import { axiosInstance } from "./utils/AxiosInstance";
import { getAuthToken } from "./utils/authTokenLocalStorage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getWebsiteDetails } from "./store/Actions/WebsiteActions";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = async () => {
    const token = getAuthToken();
    const config = {
      headers: { "Content-type": "application/json", token },
    };
    const { data } = await axiosInstance.get("/api/v1/stripeapikey", config);
    setStripeApiKey(data?.stripeApiKey);
  };

  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getWebsiteDetails());
    getStripeApiKey();
  }, []);

  return (
    <>
      <Router>
        <ScrollToTopOnNavigate />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="store">
              <Route index element={<Store />} />
              <Route path=":category">
                <Route index element={<Store />} />
                <Route path=":subcategory">
                  <Route index element={<Store />} />
                  <Route path=":productid" element={<ProductPage />} />
                </Route>
              </Route>
            </Route>
            <Route path="search" element={<Search />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="password/reset/:token" element={<ResetPassword />} />
            <Route path="my-account" element={<ProtectedRoute />}>
              <Route index element={<MyAccount />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="cart" element={<Cart />} />
              <Route path="edit-account" element={<EditAccount />} />
              <Route path="changepassword" element={<ChangePassword />} />
              <Route path="my-orders" element={<MyOrders />} />
              <Route path="my-orders/:id" element={<OrderDetails />} />
              <Route path="shipping" element={<Shipping />} />
              <Route path="order" element={<Order />} />
              <Route
                path="payment"
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                }
              />
              <Route path="payment/success" element={<OrderSuccess />} />
            </Route>
          </Route>
          <Route path="admin" element={<AdminRoute />}>
            <Route element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="categories" element={<Categories />} />
              <Route path="categories/add-category" element={<AddCategory />} />
              <Route
                path="categories/update-category/:id"
                element={<EditCategories />}
              />
              <Route path="products" element={<Products />} />
              <Route path="products/add-product" element={<AddProduct />} />
              <Route
                path="products/update-product/:id"
                element={<UpdateProduct />}
              />
              <Route path="orders" element={<Orders />} />
              <Route path="order/:id" element={<OrderProcessing />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

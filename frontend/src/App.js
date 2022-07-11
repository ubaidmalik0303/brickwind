import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Layout from "./components/Layout/Layout";
import Signup from "./pages/Signup/Signup";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import Store from "./pages/Store/Store";
import Search from "./pages/Search/Search";
import ScrollToTopOnNavigate from "./components/ScrollToTopOnNavigate/ScrollToTopOnNavigate";

function App() {
  return (
    <>
      <Router>
        <ScrollToTopOnNavigate />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="store" element={<Store />} />
            <Route path="search" element={<Search />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<Wishlist />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

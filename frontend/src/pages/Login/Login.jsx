import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import LoginStyle from "./login.module.css";

const Login = () => {
  return (
    <>
      <Breadcrumb name="LOGIN" breadcrumbpath="> Login" />
      <div className={`container-fluid ${LoginStyle.login}`}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6 shadow px-4 py-5">
              <h2>Login</h2>
              <form action="">
                <input type="email" placeholder="Enter Your Email" />
                <input type="password" placeholder="Enter Your Password" />
                <Link to="/forgotpassword">Forgot Password?</Link>
                <input type="submit" value="Sign In" />
              </form>
              <Link to="/signup">Register New Account</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

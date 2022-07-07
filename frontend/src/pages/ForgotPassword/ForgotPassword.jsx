import React from "react";
import ForgotPasswordStyles from "./forgotpassword.module.css";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

const ForgotPassword = () => {
  return (
    <>
      <Breadcrumb />
      <div className={`container-fluid ${ForgotPasswordStyles.forgotpassword}`}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6 shadow px-4 py-5">
              <h2>Forgot Password</h2>
              <form action="">
                <input type="email" placeholder="Enter Your Email" />
                <input type="submit" value="Send Email" />
              </form>
              <Link to="/login">Login Your Account</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

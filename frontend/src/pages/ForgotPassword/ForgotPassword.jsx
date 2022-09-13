import React, { useState, useEffect } from "react";
import ForgotPasswordStyles from "./forgotpassword.module.css";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { forgotPassword, clearErrors } from "../../store/Actions/UserActions";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";
import SEO from "../../components/SEO/SEO";

const ForgotPassword = () => {
  const alert = useAlert();
  const { error, message, loading } = useSelector(
    (state) => state.forgotpassword
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const forgotpasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("email", email);

    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);

  return (
    <>
      <SEO title="Forgot Password - BrickWind" />
      <Breadcrumb
        name="FORGOT PASSWORD"
        breadcrumbpath=" > Forgot Password"
        auth="no"
      />
      <div className={`container-fluid ${ForgotPasswordStyles.forgotpassword}`}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6 shadow px-4 py-5">
              {loading ? (
                <SpinnerLoader />
              ) : (
                <>
                  <h2>Recover Password</h2>
                  <form onSubmit={forgotpasswordSubmit}>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Your Email"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type="submit" value="Send Email" />
                  </form>
                  <Link to="/login">Login Your Account</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

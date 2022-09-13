import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import LoginStyle from "./login.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { login, clearErrors } from "../../store/Actions/UserActions";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";
import SEO from "../../components/SEO/SEO";

const Login = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/my-account");
    }
  }, [dispatch, error, alert, isAuthenticated, navigate]);

  return (
    <>
      <SEO title="Login - BrickWind" />
      <Breadcrumb name="LOGIN" breadcrumbpath=" > Login" auth="no" />
      <div className={`container-fluid ${LoginStyle.login}`}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6 shadow px-4 py-5">
              {loading ? (
                <SpinnerLoader />
              ) : (
                <>
                  <h2>Login</h2>
                  <form onSubmit={loginSubmit}>
                    <>
                      <input
                        type="email"
                        placeholder="Enter Your Email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                      <input
                        type="password"
                        placeholder="Enter Your Password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                      <Link to="/forgotpassword">Forgot Password?</Link>
                      <input type="submit" value="Sign In" />
                    </>
                  </form>
                  <Link to="/signup">Register New Account</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

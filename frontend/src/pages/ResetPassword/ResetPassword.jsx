import React, { useState, useEffect } from "react";
import ResetPasswordStyles from "./ResetPassword.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword, clearErrors } from "../../store/Actions/UserActions";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";
import SEO from "../../components/SEO/SEO";

const ResetPassword = () => {
  const { error, loading, success } = useSelector(
    (state) => state.forgotpassword
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Reset Successfully...");
      navigate("/login");
    }
  }, [dispatch, error, alert, navigate, success]);

  return (
    <>
      <SEO title="Reset Password - BrickWind" />
      <Breadcrumb name="RESET PASSWORD" breadcrumbpath=" > RESET Password" />
      <div className={`container-fluid ${ResetPasswordStyles.resetpassword}`}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6 shadow px-4 py-5">
              {loading ? (
                <SpinnerLoader />
              ) : (
                <>
                  <h2>Reset Password</h2>
                  <form
                    onSubmit={resetPasswordSubmit}
                    encType="multipart/form-data"
                  >
                    <input
                      type="password"
                      name="new password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Your New Password"
                    />
                    <input
                      type="password"
                      name="confirm new password"
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Your New Password"
                    />
                    <input type="submit" value="Reset" />
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

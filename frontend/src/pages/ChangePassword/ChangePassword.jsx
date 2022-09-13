import React, { useState, useEffect } from "react";
import ChangePasswordStyles from "./changepassword.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import {
  updatePassword,
  clearErrors,
} from "../../store/Actions/ProfileActions";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../store/Constants/ProfileConstants";
import { useAlert } from "react-alert";
import SEO from "../../components/SEO/SEO";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";

const ChangePassword = () => {
  const { error, loading, isUpdated } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewpassword, setConfirmNewPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmNewPassword", confirmNewpassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully...");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
      navigate("/my-account");
    }
  }, [dispatch, error, alert, navigate, isUpdated]);

  return (
    <>
      <SEO title="Change Password - BrickWind" />
      <Breadcrumb name="CHANGE PASSWORD" breadcrumbpath=" > Change Password" />
      <div className={`container-fluid ${ChangePasswordStyles.changepassword}`}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6 shadow px-4 py-5">
              {loading ? (
                <SpinnerLoader />
              ) : (
                <>
                  <h2>Update Password</h2>
                  <form
                    onSubmit={updatePasswordSubmit}
                    encType="multipart/form-data"
                  >
                    <input
                      type="password"
                      name="old password"
                      required
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Enter Your Old Password"
                    />
                    <input
                      type="password"
                      name="new password"
                      required
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter Your New Password"
                    />
                    <input
                      type="password"
                      name="confirm new password"
                      required
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Confirm Your New Password"
                    />
                    <input type="submit" value="Update" />
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

export default ChangePassword;

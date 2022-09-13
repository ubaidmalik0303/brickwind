import React, { useState, useEffect } from "react";
import EditAccountStyles from "./editaccount.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import DummyMan from "../../assets/dummyman.png";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile, clearErrors } from "../../store/Actions/ProfileActions";
import { loadUser } from "../../store/Actions/UserActions";
import { UPDATE_PROFILE_RESET } from "../../store/Constants/ProfileConstants";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";
import SEO from "../../components/SEO/SEO";

const EditAccount = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, loading, isUpdated } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(DummyMan);

  const updateProfileDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]);
        }
      };
      reader.readAsDataURL(e?.target?.files[0]);
    }
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);

    if (avatar) {
      myForm.set("avatar", avatar);
      if (avatar.size > 500000) {
        return alert.error("Please Upload Image Less Then 500KB");
      }
    }

    dispatch(updateProfile(myForm));
    setAvatar("");
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully...");
      dispatch(loadUser());
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
      navigate("/my-account");
    }
  }, [dispatch, error, alert, navigate, user, isUpdated]);
  return (
    <>
      <SEO title="Edit Account - BrickWind" />
      <Breadcrumb name="EDIT ACCOUNT" breadcrumbpath={" > Edit Account"} />
      <div className={`container-fluid ${EditAccountStyles.editaccount}`}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6 shadow px-4 py-5">
              {loading ? (
                <SpinnerLoader />
              ) : (
                <>
                  <h2>Update Account</h2>
                  <form onSubmit={registerSubmit} encType="multipart/form-data">
                    <input
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      name="name"
                      placeholder="Enter Name"
                      value={name}
                    />
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      value={email}
                    />
                    <img src={avatarPreview} alt={user?.name} />
                    <input
                      onChange={updateProfileDataChange}
                      type="file"
                      name="avatar"
                      accept="image/*"
                    />
                    <input type="submit" value="Update" />
                    <Link
                      className={EditAccountStyles.changepasswordbtn}
                      to="/my-account/changepassword"
                    >
                      Change Password
                    </Link>
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

export default EditAccount;

import React, { useEffect, useState } from "react";
import SignupStyles from "./signup.module.css";
import { Link } from "react-router-dom";
import DummyMan from "../../assets/dummyman.png";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { register, clearErrors } from "../../store/Actions/UserActions";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";
import SEO from "../../components/SEO/SEO";

const Signup = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(DummyMan);

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    if (avatar.size > 500000) {
      return alert.error("Please Upload Image Less Then 500KB");
    }

    dispatch(register(myForm));
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
      <SEO title="Signup - BrickWind" />
      <Breadcrumb name="SIGNUP" breadcrumbpath={" > Signup"} auth="no" />
      <div className={`container-fluid ${SignupStyles.signup}`}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6 shadow px-4 py-5">
              {loading ? (
                <SpinnerLoader />
              ) : (
                <>
                  <h2>Register Account</h2>
                  <form onSubmit={registerSubmit} encType="multipart/form-data">
                    <input
                      onChange={registerDataChange}
                      type="text"
                      name="name"
                      placeholder="Enter Your Full Name"
                    />
                    <input
                      onChange={registerDataChange}
                      type="email"
                      name="email"
                      placeholder="Enter Your Email"
                    />
                    <input
                      onChange={registerDataChange}
                      type="password"
                      name="password"
                      placeholder="Enter Your Password"
                    />
                    <img src={avatarPreview} alt="Profile Pricture" />
                    <input
                      onChange={registerDataChange}
                      type="file"
                      name="avatar"
                      accept="image/*"
                      required
                    />
                    <input type="submit" value="Signup" />
                  </form>
                  <Link to="/login">Already Have Account?</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

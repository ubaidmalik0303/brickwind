import React from "react";
import SignupStyles from "./signup.module.css";
import { Link } from "react-router-dom";
import DummyMan from "../../assets/dummyman.png";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

const Signup = () => {
  return (
    <>
      <Breadcrumb />
      <div className={`container-fluid ${SignupStyles.signup}`}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6 shadow px-4 py-5">
              <h2>Register Account</h2>
              <form action="">
                <input type="text" placeholder="Enter Your Full Name" />
                <input type="email" placeholder="Enter Your Email" />
                <input type="password" placeholder="Enter Your Password" />
                <img src={DummyMan} />
                <input type="file" accept="image/*" />
                <input type="submit" value="Signup" />
              </form>
              <Link to="/login">Already Have Account?</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

import React, { useState, useEffect, useRef } from "react";
import headerStyles from "./header.module.css";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import BrickWindLogoWhite from "../../assets/brickwind-logo-white.png";


const MobileNavbar = ({ isShow, showFunc, setIsShow, categories }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setIsShow(false);
  }, [navigate]);

  return (
    <div
      className={`${headerStyles.mobileNavbar} ${
        isShow ? headerStyles.showmobilenav : headerStyles.hidemobilenav
      }`}
    >
      <FiX
        size={25}
        color="white"
        onClick={showFunc}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      />
      <div className={headerStyles.mobilenavcontent}>
        <h2>
          <img src={BrickWindLogoWhite} width={150} height={70} alt="" />
        </h2>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>

          <li>
            <Link to="/store">Store</Link>
              <FiChevronDown
                size={15}
                color="white"
                className={headerStyles.dropdownicon}
              />
            <ul>
              <li>jhsdjhsd</li>
              <li>jksdhsdjjhd</li>
            </ul>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileNavbar;

import React, { useEffect } from "react";
import headerStyles from "./header.module.css";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CategoriesList from "../CategoriesCollapse/CategoriesList";
import { useSelector } from "react-redux";

const MobileNavbar = ({ isShow, showFunc, setIsShow }) => {
  const navigate = useNavigate();
  const { website } = useSelector((state) => state.getwebsitedetails);

  useEffect(() => {
    setIsShow(false);
  }, [navigate, setIsShow]);

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
          <img
            src={website?.logo?.url}
            width={150}
            height={70}
            alt={website?.websitename}
          />
        </h2>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>

          <li>
            <CategoriesList heading="Store" link="/store" defaultOpen={false} />
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

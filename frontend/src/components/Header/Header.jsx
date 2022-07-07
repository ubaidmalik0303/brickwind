import React, { useState } from "react";
import headerStyles from "./header.module.css";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiShoppingBag,
  FiHeart,
  FiArrowDown,
  FiMenu,
  FiLogIn,
} from "react-icons/fi";
import DropDownImage from "../../assets/headphone-3.jpg";
import MobileNavbar from "./MobileNavbar";

const Header = () => {
  const [stickyHeader, setStickyHeader] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  window.onscroll = () => {
    if (window.scrollY >= 60) {
      setStickyHeader(true);
    }
    if (window.scrollY < 60) {
      setStickyHeader(false);
    }
  };

  const handleShowMobileNavbar = () => {
    if (showMobileNav) {
      setShowMobileNav(false);
    }
    if (!showMobileNav) {
      setShowMobileNav(true);
    }
  };

  return (
    <>
      <MobileNavbar isShow={showMobileNav} showFunc={handleShowMobileNavbar} />
      <header
        className={`${headerStyles.header} ${
          stickyHeader ? headerStyles.stickyheader : ""
        }`}
      >
        <div>
          <img src={Logo} alt="" width={120} />
        </div>
        <div className={headerStyles.navbar}>
          <ul>
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/about">ABOUT</Link></li>
            <li>
              <Link to="/">STORE</Link> <FiArrowDown size={15} />
              <div className={`${headerStyles.dropdown} shadow`}>
                <div>
                  <ul>
                    <li>CATEGORIES</li>
                    <li>LAPTOPS</li>
                    <li>ELECTRONICS</li>
                    <li>LAPTOPS</li>
                    <li>MOTORCYCLE</li>
                    <li>LAPTOPS</li>
                    <li>MOTORCYCLE</li>
                    <li>LAPTOPS</li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>SUB-CATEGORIES</li>
                    <li>LAPTOPS</li>
                    <li>ELECTRONICS</li>
                    <li>LAPTOPS</li>
                    <li>MOTORCYCLE</li>
                    <li>LAPTOPS</li>
                    <li>LAPTOPS</li>
                    <li>ELECTRONICS</li>
                    <li>LAPTOPS</li>
                    <li>MOTORCYCLE</li>
                    <li>LAPTOPS</li>
                  </ul>
                </div>
                <div>
                  <img src={DropDownImage} alt="" width={150} />
                </div>
              </div>
            </li>
            <li>CONTACT</li>
          </ul>
        </div>
        <div>
          <FiMenu
            className={headerStyles.menuicon}
            size={30}
            onClick={handleShowMobileNavbar}
          />
          <Link className="mx-1" to="/search">
            <FiSearch
              className={headerStyles.searchicon}
              color="black"
              size={30}
            />
          </Link>
          <Link className="mx-1" to="/login">
            <FiUser color="black" size={30} />
          </Link>
          <Link className="mx-1" to="/wishlist">
            <FiHeart color="black" size={30} />
          </Link>
          <Link className="mx-1" to="/cart">
            <FiShoppingBag color="black" size={30} />
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import headerStyles from "./header.module.css";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiUser,
  FiShoppingBag,
  FiHeart,
  FiChevronsDown,
  FiMenu,
  FiChevronsUp,
} from "react-icons/fi";
import MobileNavbar from "./MobileNavbar";
import BrickWindLogo from "../../assets/brickwind-logo.png";
import {
  allCategories,
  clearErrors,
} from "../../store/Actions/CategoryActions";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";

const Header = () => {
  const [stickyHeader, setStickyHeader] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [scrollToTop, setScrollToTop] = useState(false);
  const [currentCatIndex, setCurrentCatIndex] = useState(0);

  const alert = useAlert();

  const dispatch = useDispatch();
  const { loading, categories, error } = useSelector(
    (state) => state.categories
  );
  const { website } = useSelector((state) => state.getwebsitedetails);

  window.onscroll = () => {
    if (window.scrollY >= 60) {
      setStickyHeader(true);
    }
    if (window.scrollY < 60) {
      setStickyHeader(false);
    }
    if (window.scrollY >= window.innerHeight) {
      setScrollToTop(true);
    }
    if (window.scrollY < window.innerHeight) {
      setScrollToTop(false);
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

  const scrollToTopFunc = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(allCategories());
  }, [dispatch, error]);

  return (
    <>
      <div
        className={`${headerStyles.scrolltotopbtn} ${
          scrollToTop ? headerStyles.showscrollbtn : ""
        }`}
        onClick={scrollToTopFunc}
      >
        <FiChevronsUp color="white" size={20} />
      </div>
      <MobileNavbar
        isShow={showMobileNav}
        setIsShow={setShowMobileNav}
        showFunc={handleShowMobileNavbar}
        categories={categories}
      />
      <header
        className={`${headerStyles.header} ${
          stickyHeader
            ? headerStyles.stickyheader + " " + headerStyles.bglightblack
            : ""
        }`}
      >
        <div>
          <Link to="/">
            <img
              className={headerStyles.logoimg}
              src={website?.logo?.url}
              alt="BrickWind"
            />
          </Link>
        </div>
        <div className={headerStyles.navbar}>
          <ul>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/about">ABOUT</Link>
            </li>
            <li>
              <Link to="/store">STORE</Link> <FiChevronsDown size={15} />
              <div className={`${headerStyles.dropdown} shadow`}>
                {loading ? (
                  <SpinnerLoader />
                ) : (
                  <>
                    <div>
                      <ul>
                        <li>Categories</li>
                        {categories?.map((val, i) => {
                          return (
                            <li
                              key={i}
                              onMouseEnter={() => setCurrentCatIndex(i)}
                            >
                              <Link to={`store/${val.name}`}>{val.name}</Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div>
                      <ul>
                        <li>Sub-Categories</li>
                        {categories[currentCatIndex]?.subCategory.map(
                          (cat, i) => {
                            return (
                              <li key={i}>
                                <Link
                                  to={`store/${categories[currentCatIndex].name}/${cat}`}
                                >
                                  {cat}
                                </Link>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </div>
                    <div>
                      <img
                        src={categories[currentCatIndex]?.image?.url}
                        alt=""
                        width={150}
                        height={150}
                        className="shadow"
                      />
                    </div>
                  </>
                )}
              </div>
            </li>
            <li>
              <Link to="/contact">CONTACT</Link>
            </li>
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
          <Link className="mx-1" to="/my-account/wishlist">
            <FiHeart color="black" size={30} />
          </Link>
          <Link className="mx-1" to="/my-account/cart">
            <FiShoppingBag color="black" size={30} />
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;

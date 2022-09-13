import React from "react";
import FooterStyles from "./footer.module.css";
import {
  FaFacebook,
  FaPinterest,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const { website } = useSelector((state) => state.getwebsitedetails);
  return (
    <div className={FooterStyles.bglightblack}>
      <div className={`container-fluid`}>
        <div className="container">
          <div className={`${FooterStyles.newsSheltter}`}>
            <div>
              <h5>SUBSCRIBE NEWSLETTER</h5>
              <p>Get all the latest information on Events, Sales and Offers.</p>
            </div>
            <div>
              <input type="email" placeholder="Email Address" />
              <input type="button" value="SUBSCRIBE" />
            </div>
            <div className="py-5">
              <a href={website?.facebooklink}>
                <FaFacebook />
              </a>
              <a href={website?.pinterestlink}>
                <FaPinterest />
              </a>
              <a href={website?.instagramlink}>
                <FaInstagram />
              </a>
              <a href={website?.twitterlink}>
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr className="text-white mx-5" />
      <footer className={`container-fluid ${FooterStyles.footer}`}>
        <div className="row px-5">
          <div className="col-lg-3 col-sm-6 p-3">
            <h3>{website?.websitename}</h3>
            <span>{website?.footertext}</span>
          </div>
          <div className="col-lg-2 col-sm-3 p-3">
            <h3>MY ACCOUNT</h3>
            <ul>
              <li>
                <Link to="/my-account">PROFILE</Link>
              </li>
              <li>
                <Link to="/my-account/cart">CART</Link>
              </li>
              <li>
                <Link to="/my-account/wishlist">WISHLIST</Link>
              </li>
              <li>
                <Link to="/my-account/my-orders">MY ORDERS</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-sm-3 p-3">
            <h3>QUICK LINKS</h3>
            <ul>
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/store">STORE</Link>
              </li>
              <li>
                <Link to="/about">ABOUT US</Link>
              </li>
              <li>
                <Link to="/contact">CONTACT</Link>
              </li>
              <li>
                <Link to="/login">LOGIN</Link>
              </li>
              <li>
                <Link to="/signup">SIGNUP</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-5 col-sm-12 p-3">
            <h3>CONTACT INFO</h3>
            <div className="row">
              <div className="col-md-6">
                <strong>ADDRESS:</strong>
                <br />
                <span>{website?.address}</span>
              </div>
              <div className="col-md-6">
                <strong>PHONE:</strong>
                <br />
                <a href={`tel:${website?.contactno}`}>{website?.contactno}</a>
              </div>
              <div className="col-md-6">
                <strong>EMAIL:</strong>
                <br />
                <a href={`mailto:${website?.email}`}>{website?.email}</a>
              </div>
              <div className="col-md-6">
                <strong>WORKING DAYS/HOURS:</strong>
                <br />
                <span>{website?.workinghours}</span>
              </div>
            </div>
          </div>
        </div>
        <hr className="mx-5 text-white" />
        <div
          className={`container-fluid px-5 pb-4 pt-2 ${FooterStyles.footerBottom}`}
        >
          <span>{website?.footerbottomtext}</span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

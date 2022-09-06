import React from "react";
import FooterStyles from "./footer.module.css";
import {
  FaFacebook,
  FaPinterest,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
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
              <a href="https://www.facebook.com/brickwindllc">
                <FaFacebook />
              </a>
              <a href="https://www.pinterest.com/brickwindllc/">
                <FaPinterest />
              </a>
              <a href="https://www.instagram.com/brickwind.llc/">
                <FaInstagram />
              </a>
              <a href="https://twitter.com/brickwind">
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
            <h3>BRICKWIND</h3>
            <span>
              We have our very own fleet of delivery vans. Your order will be
              packed with care at our warehouse and delivered right to your door
              by our friendly BrickWind team.
            </span>
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
                <span>30 N Gould St Ste 25404, Sheridan, Wyoming, 82801</span>
              </div>
              <div className="col-md-6">
                <strong>PHONE:</strong>
                <br />
                <a href="tel:+16826518211">{"+1 682 651 8211"}</a>
              </div>
              <div className="col-md-6">
                <strong>EMAIL:</strong>
                <br />
                <a href="mailto:sales@brickwind.com">sales@brickwind.com</a>
              </div>
              <div className="col-md-6">
                <strong>WORKING DAYS/HOURS:</strong>
                <br />
                <span>Mon - Fri / 9:00 AM - 5:00 PM</span>
              </div>
            </div>
          </div>
        </div>
        <hr className="mx-5 text-white" />
        <div
          className={`container-fluid px-5 pb-4 pt-2 ${FooterStyles.footerBottom}`}
        >
          <span>BrickWind eCommerce. © 2022. All Rights Reserved</span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

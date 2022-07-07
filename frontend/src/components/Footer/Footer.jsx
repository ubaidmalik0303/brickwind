import React from "react";
import FooterStyles from "./footer.module.css";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="container-fluid">
        <hr className="mx-5" />
        <div className="container">
          <div className={`${FooterStyles.newsSheltter}`}>
            <div>
              <h5>SUBSCRIBE NEWSLETTER</h5>
              <p>Get all the latest information on Events, Sales and Offers.</p>
            </div>
            <div>
              <input type="email" placeholder="email address..." />
              <input type="button" value="SUBSCRIBE" />
            </div>
            <div className="py-5">
              <FiFacebook />
              <FiTwitter />
              <FiInstagram />
            </div>
          </div>
        </div>
      </div>
      <footer className={`container-fluid ${FooterStyles.footer}`}>
        <hr className="mx-5 mb-5" />
        <div className="row px-5">
          <div className="col-lg-3 col-sm-6 p-3">
            <h3>BRICKWICK</h3>
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus laudantium quaerat, quam ratione explicabo voluptatem eligendi consequuntur, dicta facere sint laboriosam aperiam sed dignissimos eum beatae non? Natus, nihil inventore!</span>
          </div>
          <div className="col-lg-2 col-sm-3 p-3">
            <h3>MY ACCOUNT</h3>
            <ul>
              <li>
                <Link to="/">PROFILE</Link>
              </li>
              <li>
                <Link to="/">CART</Link>
              </li>
              <li>
                <Link to="/">WISHLIST</Link>
              </li>
              <li>
                <Link to="/">MY ORDERS</Link>
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
                <Link to="/">PRODUCTS</Link>
              </li>
              <li>
                <Link to="/">ABOUT US</Link>
              </li>
              <li>
                <Link to="/">CONTACT</Link>
              </li>
              <li>
                <Link to="/">LOGIN</Link>
              </li>
              <li>
                <Link to="/">SIGNUP</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-5 col-sm-12 p-3">
            <h3>CONTACT INFO</h3>
            <div className="row">
              <div className="col-md-6">
                <strong>ADDRESS:</strong>
                <br />
                <span>1234 Street Name, City, England</span>
              </div>
              <div className="col-md-6">
                <strong>PHONE:</strong>
                <br />
                <span>{"(123) 456-7890"}</span>
              </div>
              <div className="col-md-6">
                <strong>EMAIL:</strong>
                <br />
                <span>mail@example.com</span>
              </div>
              <div className="col-md-6">
                <strong>WORKING DAYS/HOURS:</strong>
                <br />
                <span>Mon - Sun / 9:00 AM - 8:00 PM</span>
              </div>
            </div>
          </div>
        </div>
        <hr className="mx-5" />
        <div
          className={`container-fluid px-5 py-4 ${FooterStyles.footerBottom}`}
        >
          <span>BrickWick eCommerce. © 2022. All Rights Reserved</span>
        </div>
      </footer>
    </>
  );
};

export default Footer;

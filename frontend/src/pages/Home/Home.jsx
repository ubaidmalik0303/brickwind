import React from "react";
import HomeStyles from "./home.module.css";
import ImageDummy from "../../assets/headphone-3.jpg";
import ThemeLinkButton from "../../components/ThemeLinkButton/ThemeLinkButton";
import ProductCard from "../../components/ProductCard/ProductCard";
import {
  FiHeadphones,
  FiCreditCard,
  FiTruck,
  FiCornerUpLeft,
} from "react-icons/fi";

const Home = () => {
  return (
    <>
      <div className={HomeStyles.hero}>
        <div className={HomeStyles.banner}>
          <div className={HomeStyles.content}>
            <h2>Winter Fashion Trends</h2>
            <h3>GET UPTO 30% OFF</h3>
            <h3>on Jackets</h3>
            <p>
              STARTING AT{" "}
              <span>
                $199<sup>99</sup>
              </span>
            </p>
            <ThemeLinkButton title="SHOP NOW" link="/" />
          </div>
        </div>
      </div>

      <div className={`container-fluid ${HomeStyles.shopbycategory}`}>
        <h2>SHOP BY CATEGORY</h2>
        <div className="row py-2 px-5">
          {[0, 0, 0, 0, 0, 0].map((val, i) => {
            return (
              <div
                key={i}
                className={`col-md-2 text-center p-3 ${HomeStyles.shopbycategorycard}`}
              >
                <img src={ImageDummy} alt="" width={180} />
                <h3>ELECTRONICS</h3>
                <span>8 PRODUCTS</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`container-fluid py-5 ${HomeStyles.shopby}`}>
        <div className="row py-4">
          <div className="col-lg-3 col-sm-6">
            <div
              className={`${HomeStyles.shopbycard} ${HomeStyles.shopbycardcircle} ${HomeStyles.shopbycardcirclebottom}`}
              style={{ justifyContent: "flex-end" }}
            >
              <h3>HomeDecor Trends</h3>
              <p>See all and find yours</p>
              <ThemeLinkButton
                title="Shop By Home-Decor"
                link="/"
                style={{
                  padding: "15px 30px",
                  fontSize: 14,
                  position: "relative",
                  zIndex: 5,
                }}
              />
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div
              className={`${HomeStyles.shopbycard} ${HomeStyles.shopbycardcircle} ${HomeStyles.shopbycardcircletop}`}
            >
              <h3>HomeDecor Trends</h3>
              <p>See all and find yours</p>
              <ThemeLinkButton
                title="Shop By Home-Decor"
                link="/"
                style={{
                  padding: "15px 30px",
                  fontSize: 14,
                  position: "relative",
                  zIndex: 5,
                }}
              />
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div
              className={`${HomeStyles.shopbycard} ${HomeStyles.shopbycardcircle} ${HomeStyles.shopbycardcirclebottom}`}
              style={{ justifyContent: "flex-end" }}
            >
              <h3>HomeDecor Trends</h3>
              <p>See all and find yours</p>
              <ThemeLinkButton
                title="Shop By Home-Decor"
                link="/"
                style={{
                  padding: "15px 30px",
                  fontSize: 14,
                  position: "relative",
                  zIndex: 5,
                }}
              />
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div
              className={`${HomeStyles.shopbycard} ${HomeStyles.shopbycardcircle} ${HomeStyles.shopbycardcircletop}`}
            >
              <h3>HomeDecor Trends</h3>
              <p>See all and find yours</p>
              <ThemeLinkButton
                title="Shop By Home-Decor"
                link="/"
                style={{
                  padding: "15px 30px",
                  fontSize: 14,
                  position: "relative",
                  zIndex: 5,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`container-fluid ${HomeStyles.propularproducts}`}>
        <h2 className="text-center">POPULAR PRODUCTS</h2>
        <div className="row">
          {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((val, i) => {
            return (
              <div key={i} className="col-xl-2 col-md-3 col-sm-4 col-6 py-2">
                <ProductCard />
              </div>
            );
          })}
        </div>
      </div>

      <div className="container-fluid p-5">
        <hr />
      </div>

      <div className={`container-fluid ${HomeStyles.ourServices}`}>
        <div className="container">
          <div className="row text-center pb-5">
            <div className="col-md-3 col-sm-6 p-4">
              <FiHeadphones className="mb-4" size={35} />
              <h3>CUSTOMER SUPPORT</h3>
              <p>Need Assistence?</p>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
                voluptate provident maxime rerum laboriosam? Eveniet magni qui
                nesciunt
              </div>
            </div>
            <div className="col-md-3 col-sm-6 p-4">
              <FiCreditCard className="mb-4" size={35} />
              <h3>SECURED PAYMENT</h3>
              <p>Safe & Fast</p>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
                voluptate provident maxime rerum laboriosam? Eveniet magni qui
                nesciunt
              </div>
            </div>
            <div className="col-md-3 col-sm-6 p-4">
              <FiCornerUpLeft className="mb-4" size={35} />
              <h3>FREE RETURNS</h3>
              <p>Easy & Free</p>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
                voluptate provident maxime rerum laboriosam? Eveniet magni qui
                nesciunt
              </div>
            </div>
            <div className="col-md-3 col-sm-6 p-4">
              <FiTruck className="mb-4" size={35} />
              <h3>FREE SHIPPING</h3>
              <p>Orders Over $99</p>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
                voluptate provident maxime rerum laboriosam? Eveniet magni qui
                nesciunt
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

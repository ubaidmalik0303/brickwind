import React, { useEffect } from "react";
import HomeStyles from "./home.module.css";
import ThemeLinkButton from "../../components/ThemeLinkButton/ThemeLinkButton";
import ProductCard from "../../components/ProductCard/ProductCard";
import Carousel from "react-multi-carousel";
import {
  FiHeadphones,
  FiCreditCard,
  FiTruck,
  FiCornerUpLeft,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors, getProducts } from "../../store/Actions/ProductActions";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";
import SEO from "../../components/SEO/SEO";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);
  const {
    loading: catLoading,
    categories,
    error: catError,
  } = useSelector((state) => state.categories);
  const { website } = useSelector((state) => state.getwebsitedetails);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (catError) {
      alert.error(catError);
      dispatch(clearErrors());
    }

    dispatch(getProducts());
  }, [dispatch, error, alert, catError]);

  return (
    <>
      <SEO title="BrickWind" />
      <div className={`${HomeStyles.hero} w-100`}>
        <div className={HomeStyles.tarnsparent}></div>
        <div
          className={HomeStyles.banner}
          style={{ background: `url('${website?.banner?.url}')` }}
        >
          <div className={HomeStyles.content}>
            <h2>Home & Kitchen trends</h2>
            <h3>GET UPTO 30% OFF</h3>
            <h3>on Cutlery</h3>
            <p style={{ color: "white" }}>
              STARTING AT{" "}
              <span style={{ color: "black" }}>
                $10<sup>99</sup>
              </span>
            </p>
            <ThemeLinkButton title="SHOP NOW" link="/store/Home & Kitchen" />
          </div>
        </div>
      </div>

      <div className={`container-fluid ${HomeStyles.shopbycategory}`}>
        <h2>SHOP BY CATEGORY</h2>
        <div className="py-2 px-5">
          {catLoading ? (
            <SpinnerLoader />
          ) : (
            <Carousel responsive={responsive}>
              {categories?.map((val, i) => {
                return (
                  <div
                    className={`text-center p-3 ${HomeStyles.shopbycategorycard}`}
                    key={i}
                  >
                    <Link to={`store/${val.name}`}>
                      <div style={{ position: "relative" }}>
                        <div className={HomeStyles.categoryimagehover}></div>
                        <img
                          src={val.image.url}
                          alt={val?.name}
                          width={180}
                          height={180}
                        />
                      </div>
                      <h3>{val.name}</h3>
                    </Link>
                  </div>
                );
              })}
            </Carousel>
          )}
        </div>
      </div>

      <div className={`container-fluid py-5 ${HomeStyles.shopby}`}>
        <div className="row py-4">
          <div className="col-lg-3 col-md-6 p-3">
            <div
              className={`${HomeStyles.shopbycard} ${HomeStyles.shopbycardcircle} ${HomeStyles.shopbycardcirclebottom}`}
              style={{
                justifyContent: "flex-end",
                background:
                  "url('https://media.istockphoto.com/photos/wooden-chairs-at-table-in-bright-open-space-interior-with-lamp-next-picture-id968086564?k=20&m=968086564&s=612x612&w=0&h=dlB2NThpsLZliGMy_RAdjESDjFtgMgLWZjQnG_CchOM=')",
              }}
            >
              <h3>Furniture Trends</h3>
              <p>See all and find yours</p>
              <ThemeLinkButton
                title="Shop By Furniture"
                link="/store"
                style={{
                  padding: "15px 30px",
                  fontSize: 14,
                  position: "relative",
                  zIndex: 5,
                  textAlign: "center",
                }}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-6 p-3">
            <div
              className={`${HomeStyles.shopbycard} ${HomeStyles.shopbycardcircle} ${HomeStyles.shopbycardcircletop}`}
              style={{
                background:
                  "url('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/greer-interior-1529347631.jpg')",
              }}
            >
              <h3>Kitchen & Dining Trends</h3>
              <p>See all and find yours</p>
              <ThemeLinkButton
                title="Shop By Kitchen & Dining"
                link="/store"
                style={{
                  padding: "15px 10px",
                  fontSize: 14,
                  position: "relative",
                  zIndex: 5,
                  textAlign: "center",
                }}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-6 p-3">
            <div
              className={`${HomeStyles.shopbycard} ${HomeStyles.shopbycardcircle} ${HomeStyles.shopbycardcirclebottom}`}
              style={{
                justifyContent: "flex-end",
                background:
                  "url('https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZSUyMGRlY29yfGVufDB8fDB8fA%3D%3D&w=1000&q=80')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h3>Home Decor Trends</h3>
              <p>See all and find yours</p>
              <ThemeLinkButton
                title="Shop By Home-Decor"
                link="/store"
                style={{
                  padding: "15px 30px",
                  fontSize: 14,
                  position: "relative",
                  zIndex: 5,
                  textAlign: "center",
                }}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-6 p-3">
            <div
              className={`${HomeStyles.shopbycard} ${HomeStyles.shopbycardcircle} ${HomeStyles.shopbycardcircletop}`}
              style={{
                background:
                  "url('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/holiday-decor-small-space-06-1505838978.jpg?crop=1xw:1xh;center,top&resize=480:*')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h3>Seasonal Decor Trends</h3>
              <p>See all and find yours</p>
              <ThemeLinkButton
                title="Shop By Seasonal Decor"
                link="/store"
                style={{
                  padding: "15px 10px",
                  fontSize: 14,
                  position: "relative",
                  zIndex: 5,
                  textAlign: "center",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`container-fluid ${HomeStyles.propularproducts}`}>
        <h2 className="text-center">LATEST PRODUCTS</h2>
        <div className="row">
          {loading ? (
            <SpinnerLoader />
          ) : (
            products &&
            products.map((val, i) => {
              return (
                <div key={i} className="col-xl-2 col-md-3 col-sm-4 col-6 py-4">
                  <ProductCard data={val} />
                </div>
              );
            })
          )}
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
                We are here 24/7 to assist you. Our cutsomer support
                representative will response you as soon as possible. Call now
                or contact via email.
              </div>
            </div>
            <div className="col-md-3 col-sm-6 p-4">
              <FiCreditCard className="mb-4" size={35} />
              <h3>SECURED PAYMENT</h3>
              <p>Safe & Fast</p>
              <div>
                We integrated secure payment process to make sure our customer
                privacy more safe and easy.
              </div>
            </div>
            <div className="col-md-3 col-sm-6 p-4">
              <FiCornerUpLeft className="mb-4" size={35} />
              <h3>FREE RETURNS</h3>
              <p>Easy & Free</p>
              <div>
                If you are not happy with what you buy don't worry you can
                return easily and we will pay you full refund.
              </div>
            </div>
            <div className="col-md-3 col-sm-6 p-4">
              <FiTruck className="mb-4" size={35} />
              <h3>FREE SHIPPING</h3>
              <p>Orders Over $99</p>
              <div>
                We provide free shipping service to our customers on order above
                $99
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

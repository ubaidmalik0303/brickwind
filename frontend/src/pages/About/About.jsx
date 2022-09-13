import React from "react";
import AboutStyles from "./about.module.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import SEO from "../../components/SEO/SEO";

const About = () => {
  return (
    <>
      <SEO title="About - BrickWind" />
      <Breadcrumb name="ABOUT" breadcrumbpath=" > About" auth="no" />
      <div className={`container-fluid ${AboutStyles.about}`}>
        <div className="container">
          <h2>BrickWind</h2>
          <p>
            BrickWind is a eCommerce plateform where you can find wholesale and
            retail products in good prices and discounts. We are USA based
            company and deliver our products all over USA. You can order a
            single product or in bulk we have stock ready to deliver. we have
            vast variaty in home & kitchen, home decor, bathroom, furniture
            category. Our location: 30 N Gould St Ste 25404, Sheridan, Wyoming,
            82801. You can mail us on: sales@brickwind.com. For any inquiry call
            now +1 682 651 8211.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;

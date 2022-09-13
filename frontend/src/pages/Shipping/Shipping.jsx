import React from "react";
import ShppingStyles from "./Shipping.module.css";
import ShippingDetails from "../../components/ShippingDetails/ShippingDetails";
import ShippingStepper from "../../components/ShippingStepper/ShippingStepper";
import SEO from "../../components/SEO/SEO";

const Shipping = () => {
  return (
    <>
      <SEO title="Shipping Details - BrickWind" />
      <div className={`container-fluid ${ShppingStyles.shipping}`}>
        <div className="py-5 mb-5"></div>
        <ShippingStepper activeStep={0} />
        <ShippingDetails />
      </div>
    </>
  );
};

export default Shipping;

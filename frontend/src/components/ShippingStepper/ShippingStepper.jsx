import React from "react";
import { Stepper, Step } from "react-form-stepper";
import { useNavigate } from "react-router-dom";

const ShippingStepper = ({ activeStep }) => {
  const navigate = useNavigate();

  return (
    <Stepper activeStep={activeStep}>
      <Step label="Shipping Details" onClick={() => navigate("/my-account/shipping")} />
      <Step label="Confirm Order" onClick={() => navigate("/my-account/order")} />
      <Step label="Payment" onClick={() => () => navigate("/my-account/payment")} />
    </Stepper>
  );
};

export default ShippingStepper;

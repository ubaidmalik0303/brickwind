import React, { useState } from "react";
import ShippingDetailsStyles from "./ShippingDetails.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Country, State } from "country-state-city";
import { saveSippingInfo } from "../../store/Actions/CartActions";
import { useNavigate } from "react-router-dom";

const ShippingDetails = () => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingInfo?.address);
  const [city, setCity] = useState(shippingInfo?.city);
  const [state, setState] = useState(shippingInfo?.state);
  const [country, setCountry] = useState(shippingInfo?.country);
  const [pincode, setPincode] = useState(shippingInfo?.pincode);
  const [phoneno, setPhoneno] = useState(shippingInfo?.phoneno);

  const shippingSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveSippingInfo({
        address,
        city,
        state,
        country,
        pincode,
        phoneno,
      })
    );
    navigate("/my-account/order");
  };

  return (
    <div className={ShippingDetailsStyles.shppingdetails}>
      <h1>Shipping Details</h1>
      <div className="row justify-content-center align-items-center">
        <div className="col-md-5">
          <form onSubmit={shippingSubmit} encType="multipart/formdata">
            <input
              type="text"
              placeholder="Adress"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Pin Code"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Phone Number"
              value={phoneno}
              onChange={(e) => setPhoneno(e.target.value)}
              required
            />
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value="">Country</option>
              {Country &&
                Country?.getAllCountries()?.map((val) => {
                  return (
                    <option key={val.isoCode} value={val.isoCode}>
                      {val.name}
                    </option>
                  );
                })}
            </select>
            {country && (
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              >
                <option value="">State</option>
                {State &&
                  State?.getStatesOfCountry(country)?.map((val) => {
                    return (
                      <option key={val.isoCode} value={val.isoCode}>
                        {val.name}
                      </option>
                    );
                  })}
              </select>
            )}
            <input type="submit" value="Continue" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;

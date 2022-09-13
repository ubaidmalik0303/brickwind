import React, { useState, useEffect } from "react";
import SettingsStyles from "./settings.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  updateWebsiteDetails,
  getWebsiteDetails,
  clearErrors,
} from "../../../store/Actions/WebsiteActions";
import { CHANGE_WEBSITE_DETAILS_RESET } from "../../../store/Constants/WebsiteConstant";
import SpinnerLoader from "../../../components/SpinnerLoader/SpinnerLoader";
import SEO from "../../../components/SEO/SEO";

const Settings = () => {
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.websitedetails);
  const { loading, error, website, success } = useSelector(
    (state) => state.getwebsitedetails
  );
  const dispatch = useDispatch();
  const alert = useAlert();

  const [logo, setLogo] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const [banner, setBanner] = useState("");
  const [bannerPreview, setbannerPreview] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [websiteName, setWebsiteName] = useState("");
  const [footerText, setFooterText] = useState("");
  const [footerBottomText, setFooterBottomText] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [pinterestLink, setPinterestLink] = useState("");
  const [twitterLink, settwitterLink] = useState("");

  const logoImageHandle = (e) => {
    setLogoPreview("");
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setLogoPreview(reader.result);
        setLogo(e.target.files[0]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const bannerImageHandle = (e) => {
    setbannerPreview("");
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setbannerPreview(reader.result);
        setBanner(e.target.files[0]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const websiteDetailsSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    if (logo) {
      myForm.set("logo", logo);
    }
    if (banner) {
      myForm.set("banner", banner);
    }
    myForm.set("contactno", contactNo);
    myForm.set("address", address);
    myForm.set("email", email);
    myForm.set("workinghours", workingHours);
    myForm.set("websitename", websiteName);
    myForm.set("footertext", footerText);
    myForm.set("footerbottomtext", footerBottomText);
    myForm.set("facebooklink", facebookLink);
    myForm.set("pinterestlink", pinterestLink);
    myForm.set("instagramlink", instagramLink);
    myForm.set("twitterlink", twitterLink);

    dispatch(updateWebsiteDetails(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Website Details Updated Successfully");
      dispatch({
        type: CHANGE_WEBSITE_DETAILS_RESET,
      });
    }

    dispatch(getWebsiteDetails());
  }, [dispatch, alert, error, updateError, isUpdated]);

  useEffect(() => {
    if (website?.websitename) {
      setContactNo(website?.contactno);
      setEmail(website?.email);
      setAddress(website?.address);
      setWorkingHours(website?.workinghours);
      setWebsiteName(website?.websitename);
      setFooterText(website?.footertext);
      setFooterBottomText(website?.footerbottomtext);
      setFacebookLink(website?.facebooklink);
      setInstagramLink(website?.instagramlink);
      settwitterLink(website?.twitterlink);
      setPinterestLink(website?.pinterestlink);
      setLogoPreview(website?.logo?.url);
      setbannerPreview(website?.banner?.url);
    }
  }, [success, website]);

  return (
    <>
      <SEO title="Settings - BrickWind" />
      <div className={SettingsStyles.settings}>
        <div className="container-fluid">
          {loading || updateLoading ? (
            <SpinnerLoader />
          ) : (
            <form onSubmit={websiteDetailsSubmit} encType="multipart/form-data">
              <div className="row py-5">
                <h4>WEBSITE IMAGES</h4>
                <div className="col-lg-3 col-sm-6 p-3">
                  <span>Website Logo:</span>
                  {logoPreview && (
                    <img
                      src={logoPreview}
                      alt={website?.websitename}
                      width={100}
                      height={100}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={logoImageHandle}
                  />
                </div>
                <div className="col-lg-3 col-sm-6 p-3">
                  <span>Website Banner:</span>
                  {bannerPreview && (
                    <img
                      src={bannerPreview}
                      alt={website?.websitename}
                      width={100}
                      height={100}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={bannerImageHandle}
                  />
                </div>
              </div>
              <div className="row py-5">
                <h4>CONTACT INFO: </h4>
                <div className="col-lg-3 col-sm-6 p-3">
                  <span>CONTACT NO:</span>
                  <input
                    type="text"
                    placeholder="19374848"
                    value={contactNo}
                    onChange={(e) => setContactNo(e.target.value)}
                  />
                </div>
                <div className="col-lg-3 col-sm-6 p-3">
                  <span>ADDRESS:</span>
                  <input
                    type="text"
                    placeholder="21 Street Florida"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="col-lg-3 col-sm-6 p-3">
                  <span>EMAIL:</span>
                  <input
                    type="email"
                    placeholder="jone@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-lg-3 col-sm-6 p-3">
                  <span>WORKING DAYS/HOURS:</span>
                  <input
                    type="text"
                    placeholder="Mon - Fri / 9:00 AM - 5:00 PM"
                    value={workingHours}
                    onChange={(e) => setWorkingHours(e.target.value)}
                  />
                </div>
              </div>
              <div className="row py-5">
                <h4>WEBSITE TEXT: </h4>
                <div className="col-lg-3 col-sm-6 p-3">
                  <span>WEBSITE NAME:</span>
                  <input
                    type="text"
                    placeholder="Your Website Name"
                    value={websiteName}
                    onChange={(e) => setWebsiteName(e.target.value)}
                  />
                </div>
                <div className="col-lg-3 col-sm-6 p-3">
                  <span>FOOTER TEXT:</span>
                  <input
                    type="text"
                    placeholder="Footer Text"
                    value={footerText}
                    onChange={(e) => setFooterText(e.target.value)}
                  />
                </div>
                <div className="col-lg-3 col-sm-6 p-3">
                  <span>FOOTER BOTTOM TEXT:</span>
                  <input
                    type="text"
                    placeholder="Footer Bottom Text"
                    value={footerBottomText}
                    onChange={(e) => setFooterBottomText(e.target.value)}
                  />
                </div>
              </div>
              <div className="row py-5">
                <h4>SOCIAL LINKS: </h4>
                <div className="col-lg-3 col-sm-6 p-3">
                  <span>FACEBOOK:</span>
                  <input
                    type="text"
                    placeholder="Facebook Link"
                    value={facebookLink}
                    onChange={(e) => setFacebookLink(e.target.value)}
                  />
                </div>
                <div className="col-lg-3 col-sm-6 p-3">
                  <span>PINTEREST:</span>
                  <input
                    type="text"
                    placeholder="Pinterest Link"
                    value={pinterestLink}
                    onChange={(e) => setPinterestLink(e.target.value)}
                  />
                </div>
                <div className="col-lg-3 col-sm-6 p-3">
                  <span>TWITTER:</span>
                  <input
                    type="text"
                    placeholder="Twitter Link"
                    value={twitterLink}
                    onChange={(e) => settwitterLink(e.target.value)}
                  />
                </div>
                <div className="col-lg-3 col-sm-6 p-3">
                  <span>INSTAGRAM:</span>
                  <input
                    type="text"
                    placeholder="Instagram Link"
                    value={instagramLink}
                    onChange={(e) => setInstagramLink(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-center">
                <button type="submit">Update Website Details</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Settings;

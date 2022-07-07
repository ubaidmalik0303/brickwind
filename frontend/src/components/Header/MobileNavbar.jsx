import React from "react";
import headerStyles from "./header.module.css";
import { FiX } from "react-icons/fi";

const MobileNavbar = ({ isShow, showFunc }) => {
  return (
    <div
      className={`${headerStyles.mobileNavbar} ${
        isShow ? headerStyles.showmobilenav : headerStyles.hidemobilenav
      }`}
    >
      <FiX size={25} color="white" onClick={showFunc} style={{
        position: "absolute",
        top: 10,
        right: 10,
      }} />
    </div>
  );
};

export default MobileNavbar;

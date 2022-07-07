import React from "react";
import ButtonStyle from "./themeLinkButton.module.css";
import { Link } from "react-router-dom";

const ThemeLinkButton = ({ title, link, style }) => {
  return (
    <Link
      style={style}
      className={ButtonStyle.themelinkbutton}
      to={link}
    >
      {title}
    </Link>
  );
};

export default ThemeLinkButton;

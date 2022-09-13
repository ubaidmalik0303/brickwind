import React, { useState } from "react";
import CategoriesCollapseStyles from "./CategoriesCollapse.module.css";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const CategoriesCollapse = ({ link, title, children, cat, catOpen }) => {
  const [open, setOpen] = useState(false);

  const toggleCollapse = () => {
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <div className={CategoriesCollapseStyles.categoriescollapse}>
      <div className={CategoriesCollapseStyles.head}>
        <Link to={link}>{title}</Link>
        {cat.subCategory[0] && catOpen && (
          <FaChevronDown onClick={toggleCollapse} size={12} />
        )}
      </div>
      <div
        className={`${CategoriesCollapseStyles.collapsebox} ${
          open ? CategoriesCollapseStyles.collapseboxshow : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default CategoriesCollapse;

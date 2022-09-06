import React, { useState } from "react";
import CategoriesStyles from "./Categories.module.css";
import { FaChevronDown } from "react-icons/fa";
import Collapse from "react-bootstrap/Collapse";

const CategoriesList = () => {
  const [open, setOpen] = useState(false);

  const toggleCollapse = () => {
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <div className={CategoriesStyles.categories}>
      <div className={CategoriesStyles.head}>
        <span>Categories</span>
        <FaChevronDown onClick={toggleCollapse} />
      </div>
      <div>
        <Collapse ref="" in={open}></Collapse>
      </div>
    </div>
  );
};

export default CategoriesList;

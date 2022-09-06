import React, { useState } from "react";
import CategoriesCollapseStyles from "./CategoriesCollapse.module.css";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { Collapse } from "react-bootstrap";

const CategoriesCollapse = ({ link, title, children }) => {
  const [open, setOpen] = useState(false);

  const toggleCollapse = () => {
    open ? setOpen(false) : setOpen(true);
  };

  return (
    <div className={CategoriesCollapseStyles.categoriescollapse}>
      <div className={CategoriesCollapseStyles.head}>
        <Link to={link}>{title}</Link>
        <FaChevronDown onClick={toggleCollapse} />
      </div>
      <div>
        {/* <Collapse></Collapse> */}
      </div>
    </div>
  );
};

export default CategoriesCollapse;

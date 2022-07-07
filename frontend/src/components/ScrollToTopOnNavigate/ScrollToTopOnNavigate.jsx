import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ScrollToTopOnNavigate = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  return null;
};

export default ScrollToTopOnNavigate;

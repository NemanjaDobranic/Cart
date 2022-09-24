import React from "react";
import "./not-found.css";
import notFoundImg from "../../assets/images/404.png";

const notFound = () => {
  return (
    <div className="NotFound">
      <img src={notFoundImg} alt="not found" />
      <p>
        404 Page Not Found : The page you are looking for doesn't exist or has
        been removed! Please check your URL is valid.
      </p>
    </div>
  );
};

export default notFound;

import React from "react";
import "./index.css";

const NotFound = () => {
  return (
    <div className="main-not-found mt-7 flex justify-center items-center flex-col">
      <h1 className="mainnot">404</h1>
    <p className="main-not-p">Oops! Something is wrong.</p>
    <a className="not-btn" href="">
      <i className="icon-home" /> Go back in initial page, is better.
    </a>
    </div>
  );
};

export default NotFound;

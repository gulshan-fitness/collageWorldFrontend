import React, { useEffect } from "react";
import "./index.css";

const MotionText = ({ name }) => {

  useEffect(() => {
    const interval = setInterval(() => {
      const show = document.querySelector("span[data-show]");
      if (!show) {
        console.warn("No element with data-show found.");
        return; // Exit if the element is not found
      }
      
      const next = show.nextElementSibling || document.querySelector("span:first-child");
      if (!next) {
        console.warn("No next element found.");
        return; // Exit if the next element is not found
      }

      const up = document.querySelector("span[data-up]");
      if (up) {
        up.removeAttribute("data-up");
      }

      show.removeAttribute("data-show");
      show.setAttribute("data-up", "");

      next.setAttribute("data-show", "");
    }, 2000);

    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(interval);
  }, []); 

  return (
    <>
      <h2 className="texth2">
        {name}
        <div className="mask">
          <span data-show>a theater</span>
          <span>a gym</span>
          <span>a concert hall</span>
          <span>an arcade</span>
        </div>
      </h2>
    </>
  );
};

export default MotionText;

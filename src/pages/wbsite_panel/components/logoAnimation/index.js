import React from "react";
import styled from "styled-components";

const Button = () => {
  return (

      <button className="button" data-text="Awesome">
        <span className="actual-text">&nbsp;uiverse&nbsp;</span>
        <span aria-hidden="true" className="hover-text">
          &nbsp;uiverse&nbsp;
        </span>
      </button>
   
  );
};



export default Button;

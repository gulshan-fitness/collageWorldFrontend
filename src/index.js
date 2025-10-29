import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import Context_holder from "./Context_holder";

// import ErrorBoundary from "./pages/wbsite_panel/utils/errorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  
      <Context_holder>
     
        <App/>
      </Context_holder>
   
  </React.StrictMode>
);

reportWebVitals();

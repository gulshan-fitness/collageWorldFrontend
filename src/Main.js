import React, { useContext, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Outlet,  } from "react-router-dom";
import Navbar from "./pages/wbsite_panel/components/common/navbar/page";
// import InfoBar from "./pages/wbsite_panel/screens/home/infobar/index";
import Footer2 from "./pages/wbsite_panel/components/common/Footer/Footer";

import { Context } from "./Context_holder";

import SearchPage from "./pages/wbsite_panel/components/common/searchPage/SearchPage";
import UserLoginPopup from "./pages/wbsite_panel/screens/login/UserLoginPopup";
import UserSignUp_Popup from "./pages/wbsite_panel/screens/signup/UserSignUp_Popup";
import NewsLetter from "./pages/wbsite_panel/screens/home/newsLetter";
import Apply_popup from "./pages/wbsite_panel/components/applyPopup/Apply_popup";
import Compaire_colleges from "./pages/wbsite_panel/components/Compaire_colleges";
import Compare_colleges_select_popup from "./pages/wbsite_panel/components/Compare_colleges_popup";
import SubSidyPopup from "./pages/wbsite_panel/components/SubSidyPopup";

const Main = () => {
  const {
   
    setsearchbar,
  } = useContext(Context);

// useEffect(
//   ()=>{
//     ScrollComponent()
//   },[]
// )

const location = useLocation();
  
// Determine navbar background color based on the current path
const navbarBackgroundColor = location.pathname === '/allUniversity' ? '#18092f' : 'white'; // Replace 'defaultColor' with your actual default color

  return (
    <div>
      {/* <InfoBar /> */}
      <div id="page_on_the_top"></div>

      <Navbar setsearchbar={setsearchbar} backgroundColor={navbarBackgroundColor} />

      <Outlet />
      <NewsLetter/>
      <Footer2 setsearchbar={setsearchbar} />

     <SearchPage/>
     
     <UserLoginPopup/>

      <UserSignUp_Popup/>

      <Apply_popup/>

      <Compaire_colleges/>
      <SubSidyPopup/>

      {/* <Compare_colleges_select_popup/> */}


    </div>
  );
};

export default Main;

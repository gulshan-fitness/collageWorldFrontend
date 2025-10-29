



import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../Context_holder";


export default function AdminProtectedRoutes({ children }) {

  const { notify,verifyAdmin } = useContext(Context);

  const navigator = useNavigate();

  const admindata = JSON.parse(localStorage.getItem("admin"));
  const admintoken = localStorage.getItem("token");
      

  useEffect(() => {
if(!admindata|| !admintoken) return

   

    verifyAdmin(admindata?._id,admintoken);


  }, []);
  console.log(admindata,"admindata");
  

  useEffect(
    ()=>{

 if (!admindata ) {

        navigator("/admin_login/$rj60cc1113$");
      
      }
    },[admindata]
  )


 

    
  return children;
      


}

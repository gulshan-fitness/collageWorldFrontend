





import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../../Context_holder";



export default function SuperAdminProtectedRoute({ children }) {

  const { notify,verifyAdmin } = useContext(Context);

  const navigator = useNavigate();

  const admindata = JSON.parse(localStorage.getItem("admin"));
  const admintoken = localStorage.getItem("token");
      

  useEffect(() => {
    if(!admindata|| !admintoken) return

    verifyAdmin(admindata?._id,admintoken);

  }, []);

  useEffect(
    ()=>{

 if (!admindata || !admindata?.approved ||  admindata?.role=="subadmin" ) {
        navigator("/admin_login/$rj60cc1113$");
        notify("you Are Not Super Admin",0)
      }
    },[admindata]
  )


 

    
  return children;
      


}

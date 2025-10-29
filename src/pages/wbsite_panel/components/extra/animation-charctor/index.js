import React, { useContext, useState } from "react";
import "./index.css";
import { Context } from "../../../../../Context_holder";
import axios from "axios";
import Loader from "../../Loader";

const AnimatedText = ({ course_name }) => {
  const { setapply_popUpIsOpen, user, setuserSignUp_popup } =
    useContext(Context);

  const [loading, setLoading] = useState(false);
 

  const enquiry_api = async () => {
    if (user) {
      setLoading(true);
      try {
        const res = await axios.patch(
          `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_USER_URL}course_edit/${user?._id}/${course_name}`
        );

        if (res.data.status === 1) {
          setapply_popUpIsOpen(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      setuserSignUp_popup(true);
    }
  };

  return (
    <div onClick={()=>{!loading && enquiry_api()}} className="cursor-pointer">
      <div className="text-center">
        {loading  ? (
          <Loader color={"border-[white]"} />
        ) : (
          <h3 className="animate-charcter">Apply now</h3>
        )}
      </div>
    </div>
  );
};

export default AnimatedText;

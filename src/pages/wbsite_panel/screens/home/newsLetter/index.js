import React, { useContext, useState } from "react";
import { Context } from "../../../../../Context_holder";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";
import Loader from "../../../components/Loader";

function NewsLetter() {
  const { setuserSignUp_popup, user, enquiry_value, setenquiry_value, setapply_popUpIsOpen, notify } = useContext(Context);
  const [showloader, setshowloader] = useState(false);

  const enquiry_api = () => {
    const data = {
      enquiry: enquiry_value ?? null,
    };

    setshowloader(true);

    axios
      .patch(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_USER_URL}enquiry_edit/${user?._id}`,
        data
      )
      .then((success) => {
        console.log("enquiry_edit:", success);
        if (success.data.status === 1) {
          setenquiry_value("");
          setapply_popUpIsOpen(true);
          setshowloader(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setshowloader(false);
        notify("An error occurred. Please try again.", 0);
      });
  };

  const enquiry_Handler = () => {
    if (user == null) {
      setuserSignUp_popup(true);
    } else {
      if (enquiry_value !== "") {
        enquiry_api();
      } else {
        notify("Please fill the enquiry field", 0);
      }
    }
  };

  return (
    <div className="w-full py-4 sm:py-6 lg:py-10 bg-gradient-to-br from-[#0D1B2A] via-[#1C2526] to-[#2C3E50] flex justify-center items-center relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-[#FFD700]/10 rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-[#C0C0C0]/10 rounded-full blur-3xl opacity-40 animate-pulse-slow"></div>
      </div>

      <div className="w-[95%] sm:w-[85%] md:w-[70%] lg:w-[50%] py-4 sm:py-6 lg:py-8 bg-gradient-to-br from-[#1B263B]/95 to-[#8B0000]/95 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl border border-[#FFD700]/30 px-3 sm:px-4 lg:px-6 relative z-10">
        {/* Header Text */}
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#F5F5F5] text-center mb-2 sm:mb-3 lg:mb-4 bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] bg-clip-text text-transparent">
          Get in Touch
        </h2>
        <p className="text-center text-xs sm:text-sm lg:text-base text-[#FFECB3] mb-4 sm:mb-6 lg:mb-8 font-medium max-w-[90%] sm:max-w-[80%] mx-auto">
          Have questions about our courses, admissions, or your academic journey? We're here to guide you with personalized support.
        </p>

        {/* Form */}
        <div className="flex flex-col md:flex-row md:justify-center gap-2 sm:gap-3 lg:gap-4">
          <textarea
            placeholder="Your Enquiry"
            className="w-full md:w-[70%] h-20 sm:h-24 lg:h-28 p-2 sm:p-3 lg:p-4 bg-[#8B0000]/10 border border-[#FFD700]/50 rounded-lg sm:rounded-xl lg:rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C0C0C0]/50 focus:border-[#C0C0C0] text-[#F5F5F5] placeholder-[#FFECB3]/70 resize-none transition-all duration-300 text-xs sm:text-sm lg:text-base"
            value={enquiry_value}
            onChange={(e) => setenquiry_value(e.target.value)}
          />
          {showloader ? (
            <div className="flex items-center justify-center w-full md:w-auto h-12 sm:h-14 lg:h-16">
              <Loader className="text-[#FFD700] w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
            </div>
          ) : (
            <button
              type="button"
              onClick={enquiry_Handler}
              className="w-full md:w-auto px-4 sm:px-5 lg:px-6 py-2 sm:py-3 lg:py-4 bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] hover:from-[#FFECB3] hover:to-[#B0B0B0] text-[#1B263B] rounded-lg sm:rounded-xl lg:rounded-2xl font-semibold text-xs sm:text-sm lg:text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#FFD700]/40 hover:scale-105 flex items-center justify-center space-x-1 sm:space-x-2 min-h-[44px] sm:min-h-[48px] lg:min-h-[56px]"
            >
              <FaPaperPlane className="text-sm sm:text-base lg:text-lg" />
              <span>Send Enquiry</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsLetter;
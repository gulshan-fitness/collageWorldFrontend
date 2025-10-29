import React, { useContext, useState } from "react";

import { AcademicCapIcon, UserGroupIcon, TrophyIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Context } from "../../../../../Context_holder";
import axios from "axios";
import Loader from "../../Loader";

const OurConnection = ({ collegeDetails }) => {

     const { setapply_popUpIsOpen, user, setuserSignUp_popup} = useContext(Context);
  
      const [Loadershow, setLoadershow] = useState(false);
   
    
    
      const enquiry_api = () => {
  
        if (user ) {
         const data = {
  
    enquiry: `Applied for ${collegeDetails?.college_name}`,
    college:collegeDetails?._id
  
  };
  
          setLoadershow(true);
          axios
            .patch(
              process.env.REACT_APP_API_BASE_URL +
                process.env.REACT_APP_USER_URL +
                "enquiry_edit/" +
                user?._id , data
      
            )
            .then((success) => {
              if (success?.data?.status === 1) {
                setapply_popUpIsOpen(true);
                setLoadershow(false);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setuserSignUp_popup(true);
        }
      };
  return (
    <div className="w-full py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-[95%] max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <AcademicCapIcon className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Our Students' Success Stories
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm">
            Join thousands of successful students who have achieved their dreams through our programs
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

          {/* Students Enrolled */}
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <UserGroupIcon className="text-white text-2xl" />
            </div>
            <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
              124,000+
            </p>
            <p className="text-gray-700 font-semibold text-sm md:text-base">
              Students Enrolled
            </p>
          </div>

          {/* Registered Instructors */}
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <AcademicCapIcon className="text-white text-2xl" />
            </div>
            <p className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
              {collegeDetails.registered_instructors}+
            </p>
            <p className="text-gray-700 font-semibold text-sm md:text-base">
              Expert Instructors
            </p>
          </div>

          {/* Success Rate */}
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <TrophyIcon className="text-white text-2xl" />
            </div>
            <p className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
              98%
            </p>
            <p className="text-gray-700 font-semibold text-sm md:text-base">
              Success Rate
            </p>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm mb-4">
            Join our community of successful students and achieve your educational goals
          </p>

         {

      Loadershow? (   <Loader color={"border-[blue]"}/>):(
 <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          onClick={()=>enquiry_api()}
          >
            Start Your Journey
          </button>
       )
         }

         

        



        </div>

      </div>
    </div>
  );
};

export default OurConnection;

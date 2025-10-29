import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { BanknotesIcon,PhoneIcon,ClockIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Loader from "../../Loader";
import { Context } from "../../../../../Context_holder";

function LoanFec({ collegeDetails }) {

   const { setapply_popUpIsOpen, user, setuserSignUp_popup } = useContext(Context);

    const [Loadershow, setLoadershow] = useState(false);
 
  
  
    const enquiry_api = () => {

      if (user) {
       const data = {

  enquiry: `Applied For Education Loan`,
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
    <div className="w-full py-8 bg-gradient-to-br from-blue-50 to-white">
      <div className="w-[95%] max-w-4xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl mb-3 shadow-md">
            <BanknotesIcon className="text-white text-lg" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Education Loan Facility
          </h2>
          <p className="text-gray-600 text-xs">
            Financial assistance for your educational journey
          </p>
        </div>

        {/* Loan Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">

          {/* Description */}
          <div className="mb-4">
            <p className="text-gray-700 text-xs leading-relaxed">
              {collegeDetails.education_loan}
            </p>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Contact Details */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 text-blue-600" />
                Contact Info
              </h3>

              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <PhoneIcon className="h-3 w-3 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-xs">Loan Coordinator</p>
                    <p className="text-gray-600 text-[10px]">For loan assistance</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <PhoneIcon className="h-3 w-3 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-xs">Phone</p>
                    <Link
                      className="text-green-600 hover:text-green-700 font-semibold text-xs transition-colors duration-300"
                      to={`tel:${collegeDetails.loan_contact}`}
                    >
                      {collegeDetails.loan_contact}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-purple-600" />
                Important Notes
              </h3>

              <div className="space-y-2">
                <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 font-medium text-xs mb-1">Application Process</p>
                  <p className="text-blue-700 text-[10px]">
                    Contact for eligibility criteria and application procedures.
                  </p>
                </div>

                <div className="p-2 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-purple-800 font-medium text-xs mb-1">Quick Assistance</p>
                  <p className="text-purple-700 text-[10px]">
                    Guidance on loan options, interest rates, and repayment terms.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* CTA Section */}
          <div className="mt-4 text-center">

{
Loadershow? ( <Loader color={"border-[blue]"}/>):( <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 text-xs" onClick={()=>enquiry_api()}>
              Apply for Education Loan
            </button>)
}
           


            <p className="text-gray-500 text-[10px] mt-2">
              * Terms and conditions apply
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default LoanFec;
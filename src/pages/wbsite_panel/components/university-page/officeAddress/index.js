import React from "react";
import { BiMap } from "react-icons/bi";
import { BsArrow90DegRight } from "react-icons/bs";
import { PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import BottomImage from "./image/office.jpg";

const OfficeAddress = ({ collegeDetails }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 w-full py-8 md:py-12">
      <div className="w-[95%] max-w-6xl mx-auto lg:flex justify-between items-center gap-8">
        <div className="lg:w-[45%] w-full lg:py-6 flex lg:block justify-center items-center flex-col text-center lg:text-left">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
            Visit Our Campus{" "}
            <span className="text-blue-600">In Person</span>
          </h1>
          <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed max-w-md lg:max-w-none">
            Get personalized guidance from our expert counselors. We'll help you choose the right course,
            understand admission requirements, and guide you through every step of your educational journey.
          </p>

          <div className="space-y-4 w-full max-w-md lg:max-w-none">
          <a href="tel:+919876543210">
  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
    <PhoneIcon className="h-5 w-5 inline mr-2" />
    Call Now
  </button>
</a>


            <div className="flex items-center justify-center lg:justify-start gap-3 text-gray-700">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <MapPinIcon className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-sm">Visit Us:</p>
                <p className="text-green-600 font-medium text-sm">(10 AM to 7 PM)</p>
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-3 text-gray-700">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <BsArrow90DegRight className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-sm">{collegeDetails?.college_name}</p>
                <p className="text-gray-600 text-sm">{collegeDetails?.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-[50%] w-full mt-8 lg:mt-0">
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            <img
              src={`${process.env.REACT_APP_API_BASE_URL}image/office_photo/${collegeDetails?.office_photo}`}
              alt="Office Location"
              className="w-full h-64 md:h-80 lg:h-96 object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeAddress;

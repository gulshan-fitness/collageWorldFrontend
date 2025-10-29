import React from "react";
import "./index.css";
import { 
  FaDumbbell, 
  FaHome, 
  FaCoffee, 
  FaFlask, 
  FaLaptop, 
  FaUserMd, 
  FaBus, 
  FaWifi, 
  FaBook, 
  FaTheaterMasks 
} from 'react-icons/fa';

const UniversityFacilities = ({ collegeDetails }) => {
  return (
    <div className="w-full py-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-[95%] max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-3">
            {collegeDetails.college_name}
            <span className="text-blue-600"> Facilities</span>
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm">World-class amenities for students</p>
        </div>

        {/* Facilities Grid - Mobile First */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {/* Gym */}
          <div className="linkbutton bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 text-center group cursor-pointer">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
              <FaDumbbell className="text-white text-sm sm:text-lg" />
            </div>
            <h2 className="text-[10px] xs:text-xs font-semibold text-gray-800 leading-tight">Gym</h2>
            <div className="ease peterriver"></div>
          </div>

          {/* Hostel */}
          <div className="linkbutton bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-green-300 transition-all duration-300 text-center group cursor-pointer">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
              <FaHome className="text-white text-sm sm:text-lg" />
            </div>
            <h2 className="text-[10px] xs:text-xs font-semibold text-gray-800 leading-tight">Hostel</h2>
            <div className="ease belizehole"></div>
          </div>

          {/* Cafeteria */}
          <div className="linkbutton bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-purple-300 transition-all duration-300 text-center group cursor-pointer">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
              <FaCoffee className="text-white text-sm sm:text-lg" />
            </div>
            <h2 className="text-[10px] xs:text-xs font-semibold text-gray-800 leading-tight">Cafeteria</h2>
            <div className="ease amethyst"></div>
          </div>

          {/* Laboratory */}
          <div className="linkbutton bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-orange-300 transition-all duration-300 text-center group cursor-pointer">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
              <FaFlask className="text-white text-sm sm:text-lg" />
            </div>
            <h2 className="text-[10px] xs:text-xs font-semibold text-gray-800 leading-tight">Laboratory</h2>
            <div className="ease westeria"></div>
          </div>

          {/* Computer Labs */}
          <div className="linkbutton bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-indigo-300 transition-all duration-300 text-center group cursor-pointer">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
              <FaLaptop className="text-white text-sm sm:text-lg" />
            </div>
            <h2 className="text-[10px] xs:text-xs font-semibold text-gray-800 leading-tight">Computer Labs</h2>
            <div className="ease wetasphalt"></div>
          </div>

          {/* Auditorium */}
          <div className="linkbutton bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-pink-300 transition-all duration-300 text-center group cursor-pointer">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
              <FaTheaterMasks className="text-white text-sm sm:text-lg" />
            </div>
            <h2 className="text-[10px] xs:text-xs font-semibold text-gray-800 leading-tight">Auditorium</h2>
            <div className="ease midnightblue"></div>
          </div>

          {/* Wi-Fi Campus */}
          <div className="linkbutton bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-teal-300 transition-all duration-300 text-center group cursor-pointer">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
              <FaWifi className="text-white text-sm sm:text-lg" />
            </div>
            <h2 className="text-[10px] xs:text-xs font-semibold text-gray-800 leading-tight">Wi-Fi Campus</h2>
            <div className="ease sunflower"></div>
          </div>

          {/* Transport */}
          <div className="linkbutton bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-red-300 transition-all duration-300 text-center group cursor-pointer">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
              <FaBus className="text-white text-sm sm:text-lg" />
            </div>
            <h2 className="text-[10px] xs:text-xs font-semibold text-gray-800 leading-tight">Transport</h2>
            <div className="ease orange"></div>
          </div>

          {/* Medical */}
          <div className="linkbutton bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-yellow-300 transition-all duration-300 text-center group cursor-pointer">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
              <FaUserMd className="text-white text-sm sm:text-lg" />
            </div>
            <h2 className="text-[10px] xs:text-xs font-semibold text-gray-800 leading-tight">Medical</h2>
            <div className="ease carrot"></div>
          </div>

          {/* Library */}
          <div className="linkbutton bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-400 transition-all duration-300 text-center group cursor-pointer">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
              <FaBook className="text-white text-sm sm:text-lg" />
            </div>
            <h2 className="text-[10px] xs:text-xs font-semibold text-gray-800 leading-tight">Library</h2>
            <div className="ease alizarin"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityFacilities;
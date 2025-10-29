import React, { useContext } from "react";
import { Context } from "../../../../../Context_holder";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import img from "./image/7.gif"
import mobimg from "./image/search bn mobile.png"

export default function SearchPage() {
  const {
    collegeName,
    courseName,
    setCollegeName,
    setCourseName,
    setcollege_name,
    setcourse_name,
    searchbar,
    setsearchbar,
    setMobilnav,
  } = useContext(Context);

  const handleSearch = () => {
    setcollege_name(collegeName);
    setcourse_name(courseName);

    navigater("/allUniversity");

    setsearchbar(false);

    setMobilnav(false);
  };
  const navigater = useNavigate();

  return (
    <>
      <div
        className={`flex items-center p-4 fixed w-full h-screen overflow-hidden bg-white z-20 top-0 ${
          searchbar ? "left-0" : "left-[-100%]"
        } duration-300`}
      >
        <div className="w-full mt-[-5rem]">
          {/* Mobile optimized header */}
          <div className="w-full mb-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Find Your Perfect College
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Search from thousands of colleges and courses
              </p>
            </div>
            
            <div className="w-full h-[30vh] md:h-[40vh]">
              <img
                src={img}
                alt="Search illustration"
                className="w-full h-full object-contain hidden md:block"
              />
              <img
                src={mobimg}
                alt="Search illustration"
                className="w-full h-full object-contain md:hidden"
              />
            </div>
          </div>
        
          {/* Enhanced mobile search form */}
          <div className="relative bg-white shadow-2xl rounded-2xl w-full sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto p-6 border border-gray-100">
            <div className="space-y-4 md:space-y-0 md:flex md:gap-4">
              {/* College Name Input */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2 md:hidden">
                  College Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="Enter College Name"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700 placeholder-gray-400"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Course Name Input */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2 md:hidden">
                  Course Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    placeholder="Enter Course Name"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700 placeholder-gray-400"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="md:flex md:items-end">
                <button
                  onClick={handleSearch}
                  className="w-full md:w-auto py-4 px-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search Now
                </button>
              </div>
            </div>
            
            {/* Quick suggestions for mobile */}
            <div className="mt-6 md:hidden">
              <p className="text-sm text-gray-500 mb-3">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-gray-200 transition-colors">
                  Engineering
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-gray-200 transition-colors">
                  MBA
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-gray-200 transition-colors">
                  Medical
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-gray-200 transition-colors">
                  Delhi
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced close button */}
        <button 
          onClick={() => setsearchbar(false)}
          className="absolute right-4 top-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <IoCloseSharp className="text-gray-600 text-xl" />
        </button>
      </div>
    </>
  );
}

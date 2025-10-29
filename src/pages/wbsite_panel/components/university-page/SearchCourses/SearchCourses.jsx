import React from "react";
import { MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import collegeImage from "./ele ani 2.gif";
import { Link } from "react-router-dom";

function SearchCourses() {
  return (
    <div className="w-full py-12 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="w-[95%] max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

          {/* Left Section (Content) */}
          <div className="lg:w-1/2 w-full text-center lg:text-left">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
              <MagnifyingGlassIcon className="text-white text-2xl" />
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Discover Your Perfect University
            </h2>

            <p className="text-gray-600 mb-4 text-sm md:text-base leading-relaxed">
              At AAOPADHE, finding the ideal university is as simple as typing in your preferences.
              Just like the sparkles emerging from your screen, our platform illuminates your search for the best university.
            </p>

            <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
              Explore, compare, and choose from a wide range of options tailored to your needs.
              Start your journey to higher education with ease and clarity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/alluniversity"><button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <SparklesIcon className="h-5 w-5" />
                Start Searching
              </button>
              </Link>
              <button className="bg-white border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-700 font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Section (Image) */}
          <div className="lg:w-1/2 w-full">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl"></div>
              <img
                src={collegeImage}
                alt="College Discovery"
                className="relative w-full h-auto rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SearchCourses;

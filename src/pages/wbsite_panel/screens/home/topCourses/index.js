import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../../../Context_holder";

const TopCourses = () => {
  const { setcourse_name, setfilterHeading } = useContext(Context);
  const navigater = useNavigate();

  const course_handler = (course_name) => {
    setcourse_name(course_name);
    navigater("/allUniversity");
    setfilterHeading("Admission 2024");
  };

  const courses = [
    "B Ed",
    "MBA",
    "MBBS",
    "BA",
    "M Tech",
    "PhD",
    "LLB",
    "BSc"
  ];

  return (
    <div className="w-full flex justify-center md:mt-8 mt-4 md:py-6 py-4">
      <div className="w-11/12 lg:w-[90%] text-center">
        <h2 className="md:text-2xl text-lg font-bold md:mb-8 mb-4 text-blue-600 dark:text-blue-400">
          Top Courses for 2024 Admission
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {courses.map((course, index) => (
            <button
              key={index}
              className="w-full py-2 md:py-3 px-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 
                         rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 hover:border-blue-400 dark:hover:border-blue-500
                         transition-all duration-300 text-gray-900 dark:text-white 
                         hover:text-blue-700 dark:hover:text-blue-300
                         shadow-sm hover:shadow-md"
              onClick={() => course_handler(course)}
            >
              <span className="text-xs md:text-sm font-medium">{course}</span>
              <span className="block text-xs text-gray-600 dark:text-gray-300 mt-1">
                Admission 2025
              </span>
            </button>
          ))}
        </div>
        
        {/* <div className="mt-6 md:mt-8">
          <button 
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 
                       text-sm font-medium transition-colors duration-200"
          >
            View All Courses →
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default TopCourses;
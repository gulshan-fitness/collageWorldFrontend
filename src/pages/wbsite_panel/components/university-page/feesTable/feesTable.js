import React from "react";
import { useNavigate } from "react-router-dom";
import AnimatedText from "../../extra/animation-charctor";

// Optional: Icon for Apply button
import { FaGraduationCap } from "react-icons/fa";

export function FeesTable({ collegeDetails }) {
  const navigate = useNavigate();

  // Handle Apply Button Click
  // const handleApply = (courseName) => {
  //   // Replace with your actual route
  //   navigate(`/apply?course=${encodeURIComponent(courseName)}`);
  // };

  // Loading or Empty State
  if (!collegeDetails?.courses || collegeDetails.courses.length === 0) {
    return (
      <div className="w-full flex flex-col items-center py-12 px-4">
        <div className="max-w-6xl w-full text-center">
          <p className="text-gray-500">No course fees available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center py-8 md:py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full max-w-6xl">

        {/* Header */}
        <header className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Course Fees for 2025
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Detailed fee structure for all available courses
          </p>
        </header>

        {/* MOBILE: Card Layout */}
        <div className="block md:hidden space-y-4">
          {collegeDetails.courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all duration-300"
            >
              {/* Course Name */}
              <div className="flex items-start mb-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                <h3 className="font-semibold text-gray-900 text-base capitalize">
                  {course?.courseDetail?.courseName || "N/A"}
                </h3>
              </div>

              {/* Fees & Duration */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    Annual Fees
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    ₹{course?.fees || "N/A"}
                    <span className="text-xs font-normal text-gray-500 ml-1">/year</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    Duration
                  </p>
                  <p className="text-sm">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                      {course?.duration || "N/A"} Years
                    </span>
                  </p>
                </div>
              </div>

              {/* Apply Button */}
              <button
               
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg text-sm flex items-center justify-center gap-2"
              >
                <FaGraduationCap className="text-sm" />
                <AnimatedText course_name={course?.courseDetail?.courseName} />
              </button>
            </div>
          ))}
        </div>

        {/* DESKTOP: Table Layout */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">
                    Course Name
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">
                    Annual Fees
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wider">
                    Apply
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {collegeDetails.courses.map((course, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-blue-50 transition-colors duration-200 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        <span className="text-gray-900 font-medium text-sm capitalize">
                          {course?.courseDetail?.courseName || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <span className="text-green-600 font-bold text-sm">
                          ₹{course?.fees || "N/A"}
                        </span>
                        <span className="text-gray-500 text-xs ml-1">/year</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                        {course?.duration || "N/A"} Years
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      
                      <button 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-5 rounded-lg transition-all duration-300 hover:shadow-md text-sm flex items-center gap-2"
                      >
                        <FaGraduationCap className="text-xs" />

                        <AnimatedText course_name={course?.courseDetail?.courseName} />

                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Note */}
        <footer className="mt-6 text-center">
          <p className="text-xs md:text-sm text-gray-500 italic">
            * Fees are subject to change. Please contact the institution for the most updated information.
          </p>
        </footer>
      </div>
    </div>
  );
}
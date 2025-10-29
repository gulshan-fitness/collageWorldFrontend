import React from "react";
import { useNavigate } from "react-router-dom";

export function FeesTable({ collegeDetails }) {
  const navigater=useNavigate()
  return (
    <div className="w-full flex flex-col items-center rounded-xl">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Course Fees for 2025
          </h2>
          <p className="text-gray-600 text-sm">
            Detailed fee structure for all available courses
          </p>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              {/* Table Header */}
              <thead className="bg-gradient-to-r from-blue-400 to-yellow-100">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-black text-sm uppercase tracking-wider">
                    Course Name
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-black text-sm uppercase tracking-wider">
                    Annual Fees
                  </th>
                  <th className="py-4 px-6 text-left font-semibold text-black text-sm uppercase tracking-wider">
                    Duration
                  </th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="divide-y divide-gray-200">

                {collegeDetails?.courses?.map((course, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-blue-50 transition-colors duration-200 cursor-pointer ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white" 
                    }`}
                    onClick={()=>navigater(`/coursedetailspage/${course?.courseDetail?._id}`)}
                  >
                    {/* Course Name */}
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-gray-900 font-medium text-sm capitalize">
                          {course?.courseDetail?.courseName}
                        </span>
                      </div>
                    </td>
                    
                    {/* Fees */}
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <span className="text-green-600 font-bold text-sm">
                          ₹{course?.fees}
                        </span>
                        <span className="text-gray-500 text-xs ml-1">/year</span>
                      </div>
                    </td>
                    
                    {/* Duration */}
                    <td className="py-4 px-6">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                        {course?.duration} Years
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-4 text-center">
          <p className="text-gray-500 text-xs">
            * Fees are subject to change. Please contact the institution for the most updated information.
          </p>
        </div>
      </div>
    </div>
  );
}
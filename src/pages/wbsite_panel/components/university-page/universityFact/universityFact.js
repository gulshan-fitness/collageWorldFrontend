import React from "react";
import { FaCheckCircle, FaLightbulb } from 'react-icons/fa';

function UniversityFact({ collegeDetails }) {
  return (
    <div className="w-full py-8 bg-gradient-to-br from-blue-50 to-white">
      <div className="w-[95%] max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <FaLightbulb className="text-white text-2xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            University Facts
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Discover what makes our institution unique and exceptional
          </p>
        </div>

        {/* Facts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collegeDetails?.facts?.map((data, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-200 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FaCheckCircle className="text-green-600 text-lg" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 leading-relaxed text-sm font-medium">
                    {data}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600 text-sm">Years of Excellence</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">100+</div>
            <div className="text-gray-600 text-sm">Programs Offered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
            <div className="text-gray-600 text-sm">Successful Alumni</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
            <div className="text-gray-600 text-sm">Placement Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UniversityFact;
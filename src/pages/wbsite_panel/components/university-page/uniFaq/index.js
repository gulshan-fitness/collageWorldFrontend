import React, { useState } from "react";
import { ChevronDownIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function UniFaq({ collegeDetails }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full py-12 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="w-[95%] max-w-4xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <QuestionMarkCircleIcon className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm">
            Get answers to common questions about our programs and admissions
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {collegeDetails?.doubts?.map((doubts, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

              {/* Question Button */}
              <button
                className={`w-full text-left p-6 flex items-center justify-between transition-all duration-300 group hover:bg-gray-50 ${
                  activeIndex === index ? "bg-blue-50 border-blue-200" : ""
                }`}
                onClick={() => toggleAccordion(index)}
              >
                <span className={`font-semibold text-sm md:text-base transition-colors duration-300 ${
                  activeIndex === index ? "text-blue-700" : "text-gray-800 group-hover:text-blue-600"
                }`}>
                  {doubts.doubt}
                </span>

                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  activeIndex === index ? "bg-blue-600 text-white rotate-180" : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                }`}>
                  <ChevronDownIcon className="h-4 w-4" />
                </div>
              </button>

              {/* Answer Panel */}
              <div className={`transition-all duration-300 overflow-hidden ${
                activeIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}>
                <div className="p-6 pt-0 border-t border-gray-100">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                      {doubts.answer}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm mb-4">
            Still have questions? Contact our admission counselors for personalized assistance.
          </p>
         <Link to="/contact"> <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Contact Support
          </button>
          </Link>
        </div>
        

      </div>
    </div>
  );
}

export default UniFaq;

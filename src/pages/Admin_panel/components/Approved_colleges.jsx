import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../Context_holder";
import { Link } from "react-router-dom";
import { FaUniversity, FaGraduationCap, FaArrowRight, FaCheck } from "react-icons/fa";

const Approved_colleges = () => {

  const {college_fetch, colleges, setcollege_name}=useContext(Context);

  const [showAll, setShowAll] = useState(false);
  
  useEffect(() => {
    
    college_fetch();

  }, []);

  // Limit to 12 colleges initially
  const displayedColleges = showAll ? colleges : colleges?.slice(0, 12);
  const hasMoreColleges = colleges && colleges.length > 12;

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-white py-8 md:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FaCheck className="text-green-500" />
            Approved Universities
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
           AAOPADHE Approved Universities
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Explore our carefully selected and approved universities offering quality education
          </p>
          {/* Show total count */}
          {colleges && colleges?.length > 0 && (
            <div className="mt-3">
              <span className="text-xs text-gray-500">
                Showing {displayedColleges?.length} of {colleges?.length} universities
              </span>
            </div>
          )}
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {displayedColleges?.map((university, index) => (
            <Link
              onClick={() => setcollege_name(university?.college_name)}
              to={`/university-page/${university?._id}`}
              key={index}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-200 hover:border-blue-300 
                         transition-all duration-300 p-4 flex flex-col items-center text-center 
                         transform hover:-translate-y-1"
            >
              {/* University Logo */}
              <div className="relative w-full h-16 md:h-20 mb-3 overflow-hidden rounded-lg bg-gray-50">
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}image/college_logo/${university?.university_banner[0]}`}
                  alt={university?.college_name}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="absolute inset-0 bg-blue-100 rounded-lg hidden items-center justify-center">
                  <FaUniversity className="text-blue-500 text-2xl" />
                </div>
              </div>

              {/* Course Count */}
              <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full mb-2">
                <FaGraduationCap className="text-xs" />
                <span className="text-xs font-medium">
                  {university?.courses?.length || 0} Courses
                </span>
              </div>

              {/* University Name */}
              <h3 className="text-xs md:text-sm font-semibold text-gray-900 line-clamp-2 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                {university?.college_name}
              </h3>

              {/* View Details Link */}
              <div className="mt-auto flex items-center gap-1 text-blue-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>View Details</span>
                <FaArrowRight className="text-[10px]" />
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {(!colleges || colleges.length === 0) && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <FaUniversity className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Universities Found</h3>
            <p className="text-sm text-gray-600">
              We're working on adding more approved universities. Please check back later.
            </p>
          </div>
        )}

        {/* View More/Less Button */}
        {hasMoreColleges && (
          <div className="text-center mt-8 md:mt-12">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <FaUniversity className="text-sm" />
              {showAll ? 'Show Less Universities' : `View All ${colleges.length} Universities`}
              <FaArrowRight className={`text-xs transition-transform duration-200 ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Approved_colleges;

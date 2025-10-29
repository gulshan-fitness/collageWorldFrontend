import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../../../../Context_holder";
import { 
  BuildingOffice2Icon, 
  AcademicCapIcon,
  StarIcon,
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

const HoverUniversities = ({ top10Courses, top10College }) => {
  const { setcollege_name, setcourse_name } = useContext(Context);
  const navigate = useNavigate();

  const collegeSearchHandler = (collegeName) => {
    setcollege_name(collegeName);
    navigate("/allUniversity");
  };

  const courseSearchHandler = (courseName) => {
    setcourse_name(courseName);
    navigate("/allUniversity");
  };

  console.log(top10Courses,"top10Courses");
  

  return (
    <div className="w-full py-6 px-6 bg-white shadow-lg rounded-2xl border border-gray-200 overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
        {/* Top Universities Section */}
        <div className="w-full lg:w-1/2">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mr-3">
              <BuildingOffice2Icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Top Universities</h3>
              <p className="text-xs text-gray-500">Highly rated institutions</p>
            </div>
          </div>
          
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {top10College?.slice(0, 6).map((data, index) => (
              <div
                key={index}
                className="group p-3 rounded-lg bg-gray-50 hover:bg-emerald-50 border border-gray-100 hover:border-emerald-200 cursor-pointer transition-all duration-200 hover:shadow-sm"
                onClick={() => collegeSearchHandler(data?.college_name)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <BuildingOffice2Icon className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors truncate">
                        {data?.college_name}
                      </h4>
                      <div className="flex items-center mt-0.5">
                        <StarIcon className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                        <span className="text-xs text-gray-600">Top Rated</span>
                      </div>
                    </div>
                  </div>
                  <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Courses Section */}
        <div className="w-full lg:w-1/2">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mr-3">
              <AcademicCapIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Trending Courses</h3>
              <p className="text-xs text-gray-500">Popular programs</p>
            </div>
          </div>
          
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {top10Courses?.slice(0, 8).map((data, index) => (
              <div
                key={index}
                className="group p-3 rounded-lg bg-gray-50 hover:bg-emerald-50 border border-gray-100 hover:border-emerald-200 cursor-pointer transition-all duration-200 hover:shadow-sm"
                onClick={() => courseSearchHandler(data?.courseName)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <AcademicCapIcon className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors truncate">
                        {data?.courseDetails?.courseName}
                      </h4>
                      <div className="flex items-center mt-0.5">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse mr-2"></div>
                        <span className="text-xs text-gray-600">Trending</span>
                      </div>
                    </div>
                  </div>
                  <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            to="/allUniversity"
            className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm"
          >
            <BuildingOffice2Icon className="h-4 w-4 mr-2" />
            View All Universities
          </Link>
          <Link 
            to="/allUniversity"
            className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm"
          >
            <AcademicCapIcon className="h-4 w-4 mr-2" />
            Explore Courses
          </Link>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #94a3b8;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default HoverUniversities;
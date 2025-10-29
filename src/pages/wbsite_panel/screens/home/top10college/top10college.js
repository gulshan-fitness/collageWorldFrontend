import React, { useContext, useEffect } from "react";
import { Context } from "../../../../../Context_holder";
import { Link, useNavigate } from "react-router-dom";
import { 
  AcademicCapIcon, 
  StarIcon, 
  MapPinIcon,
  TrophyIcon,
  ChevronRightIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  GlobeAltIcon,
  PhoneIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const Top10College = () => {
  
  const { top10College, college_fetch_by_ratings, rounded_rating, setcollege_name } = useContext(Context);
  const navigater = useNavigate();

  useEffect(() => {
    college_fetch_by_ratings();
  }, []);





  return (
    <div className="w-full flex flex-col items-center py-6 md:py-12 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="md:w-[95%] w-full px-4">
        
        {/* Compact Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mr-3 shadow-lg">
              <TrophyIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Top 10 Colleges</h2>
              <div className="h-0.5 w-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto"></div>
            </div>
          </div>
          
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-4 leading-relaxed">
            Discover the <span className="font-semibold text-blue-600">highest-rated colleges</span> based on student reviews and academic excellence.
          </p>
        </div>

        {/* Compact Professional Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* Compact Table Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-3">
            <h3 className="text-lg font-bold text-white flex items-center">
              <TrophyIcon className="h-5 w-5 mr-2" />
              Top Ranked Colleges
            </h3>
          </div>

          {/* Desktop Compact Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Rank & College
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Location & Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {top10College?.map((college, index) => (
                  <tr 
                    key={index}
                    className="hover:bg-blue-50 transition-colors duration-200 cursor-pointer group"
                    onClick={() => navigater(`university-page/${college?._id}`)}
                  >
                    {/* Rank & College Name */}
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                            <span className="text-white font-bold text-sm">#{index + 1}</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 leading-tight truncate">
                            {college.college_name}
                          </h4>
                          <div className="flex items-center mt-1 text-xs text-gray-600">
                            <BuildingOfficeIcon className="h-3 w-3 mr-1" />
                            <span className="capitalize">{college.type || 'University'}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Location & Type */}
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-700">
                          <MapPinIcon className="h-3 w-3 text-green-600 mr-1 flex-shrink-0" />
                          <span className="font-medium truncate">{college.city}, {college.state}</span>
                        </div>
                        {college.affiliatedTo && college.affiliatedTo.length > 0 && (
                          <div className="flex items-center text-xs text-gray-500">
                            <AcademicCapIcon className="h-3 w-3 text-blue-600 mr-1 flex-shrink-0" />
                            <span className="truncate">{college.affiliatedTo[0]}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Details */}
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-700">
                          <CalendarIcon className="h-3 w-3 text-purple-600 mr-1" />
                          <span className="font-medium">Est. {college.estdYear || 'N/A'}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <UserGroupIcon className="h-3 w-3 text-orange-600 mr-1" />
                          <span>{college.registered_instructors || 0}+ Faculty</span>
                        </div>
                        {college.contactNumber && (
                          <div className="flex items-center text-xs text-gray-500">
                            <PhoneIcon className="h-3 w-3 text-blue-600 mr-1" />
                            <span>{college.contactNumber}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Rating */}
                    <td className="px-4 py-4">
                      <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full border border-yellow-200 w-fit">
                        <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-bold text-gray-900">
                          {rounded_rating(college.averageRating)}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">/5</span>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-4 py-4 text-center">
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3 py-1.5 rounded-md font-medium transition-all duration-200 flex items-center justify-center mx-auto shadow-sm hover:shadow-md text-xs">
                        <span>View</span>
                        <ChevronRightIcon className="h-3 w-3 ml-1" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Compact Card View */}
          <div className="md:hidden">
            <div className="divide-y divide-gray-200">
              {top10College?.map((college, index) => (
                <div 
                  key={index}
                  className="p-4 hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
                onClick={() => navigater(`university-page/${college?._id}`)}
                >
                  {/* Mobile Card Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-md mr-3 flex-shrink-0">
                        <span className="text-white font-bold text-sm">#{index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 leading-tight truncate">
                          {college.college_name}
                        </h4>
                        <div className="flex items-center mt-1 text-xs text-gray-600">
                          <BuildingOfficeIcon className="h-3 w-3 mr-1" />
                          <span className="capitalize">{college.type || 'University'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full border border-yellow-200 flex-shrink-0">
                      <StarIcon className="h-3 w-3 text-yellow-500 mr-1" />
                      <span className="font-bold text-gray-900 text-xs">
                        {rounded_rating(college.averageRating)}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Card Details */}
                  <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center text-gray-700">
                        <MapPinIcon className="h-3 w-3 text-green-600 mr-1" />
                        <span className="truncate">{college.city}, {college.state}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <CalendarIcon className="h-3 w-3 text-purple-600 mr-1" />
                        <span>Est. {college.estdYear || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center text-gray-600">
                        <UserGroupIcon className="h-3 w-3 text-orange-600 mr-1" />
                        <span>{college.registered_instructors || 0}+ Faculty</span>
                      </div>
                      {college.contactNumber && (
                        <div className="flex items-center text-gray-600">
                          <PhoneIcon className="h-3 w-3 text-blue-600 mr-1" />
                          <span className="truncate">{college.contactNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mobile Action Button */}
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md text-sm">
                    <span>View College Details</span>
                    <ChevronRightIcon className="h-4 w-4 ml-2" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Compact View All Button */}
        <div className="text-center mt-8">
          <button 
            onClick={() => navigater("/allUniversity")}
            className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 hover:border-blue-700 px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center mx-auto text-sm"
          >
            <BuildingOfficeIcon className="h-5 w-5 mr-2" />
            View All Colleges
            <ChevronRightIcon className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Top10College;

import React, { useContext } from "react";
import { FaArrowRight, FaGraduationCap, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import parse from 'html-react-parser';
import { Context } from "../../../../../Context_holder";
import { Link } from "react-router-dom";

function OurEvent({ collegeDetails }) {
  const { monthNames } = useContext(Context);

  return (
    <div className="w-full py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="w-[95%] max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <FaGraduationCap className="text-white text-2xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Upcoming Events</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Stay updated with our latest campus events and activities</p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collegeDetails?.events?.map((data, index) => (
            <Link
              to={`/college_event/${data?._id}`}
              key={index}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-200 overflow-hidden group-hover:-translate-y-2">
                
                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}image/event_image/${data?.logo}`}
                    alt={data?.alt}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 text-center shadow-lg">
                    <h4 className="text-2xl font-bold text-gray-900 mb-0 leading-none">
                      {new Date(data?.date).getDate()}
                    </h4>
                    <p className="text-xs text-gray-600 font-medium mt-1">
                      {monthNames[new Date(data?.date).getMonth()]}
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Event Header */}
                  <h5 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {data?.heading}
                  </h5>

                  {/* Event Meta */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaClock className="text-blue-500" />
                      <span className="font-medium">{data?.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaMapMarkerAlt className="text-red-500" />
                      <span className="font-medium">{data?.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {data?.description && parse(data?.description)}
                    </p>
                    {data?.description?.length > 100 && (
                      <div className="flex items-center gap-1 mt-2 text-blue-600 font-semibold text-sm">
                        <span>Read More</span>
                        <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                      {new Date(data?.date).getFullYear()}
                    </span>
                    <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                      <span>View Details</span>
                      <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Events Message */}
        {(!collegeDetails?.events || collegeDetails.events.length === 0) && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaGraduationCap className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Upcoming Events</h3>
            <p className="text-gray-500">Check back later for new events and activities.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OurEvent;
import React from 'react';
import { FaBuilding, FaMapMarkerAlt, FaStar, FaGraduationCap, FaRupeeSign } from 'react-icons/fa';

export default function StudentsPlaced({ placed_students }) {
  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-white py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
            <FaGraduationCap className="text-blue-600 text-lg" />
            Our Success Stories
          </h2>
          <p className="text-xs md:text-sm text-gray-600 max-w-lg mx-auto">
            Students placed in top companies with outstanding packages
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative overflow-hidden px-2">
          <div className="slider-container">
            <div className="slide-track">
              {placed_students?.map((data, index) => (
                <div className="slide" key={data._id}>
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-3 border border-gray-100 mx-1">
                    {/* Student Image */}
                    <div className="relative mb-2">
                      <img
                        src={`${process.env.REACT_APP_API_IMAGE_URL}students_placed_image/${data?.student_image}`}
                        loading="lazy"
                        alt={data?.name}
                        className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-blue-100"
                      />
                      <div className="absolute -bottom-1 right-1/2 translate-x-1/2 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-full whitespace-nowrap">
                        Placed
                      </div>
                    </div>

                    {/* Student Info */}
                    <div className="text-center space-y-1.5">
                      <h3 className="font-semibold text-gray-900 text-xs md:text-sm capitalize truncate">
                        {data?.name}
                      </h3>
                      
                      <div className="flex items-center justify-center gap-1 text-gray-600">
                        <FaBuilding className="text-blue-500 text-[10px]" />
                        <span className="text-[10px] md:text-xs capitalize truncate">
                          {data?.company}
                        </span>
                      </div>
                      
                      {data?.package && (
                        <div className="flex items-center justify-center gap-1 bg-blue-50 text-blue-700 text-[10px] font-medium px-1.5 py-0.5 rounded">
                          <FaRupeeSign className="text-[8px]" />
                          <span>{data.package}</span>
                        </div>
                      )}
                      
                      {data?.role && (
                        <p className="text-[10px] text-gray-500 capitalize truncate">
                          {data.role}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar key={star} className="text-yellow-400 text-[8px]" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Duplicate for seamless loop */}
              {placed_students?.map((data, index) => (
                <div className="slide" key={`dup-${data._id}`}>
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-3 border border-gray-100 mx-1">
                    <div className="relative mb-2">
                      <img
                        src={`${process.env.REACT_APP_API_IMAGE_URL}students_placed_image/${data?.student_image}`}
                        loading="lazy"
                        alt={data?.name}
                        className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-blue-100"
                      />
                      <div className="absolute -bottom-1 right-1/2 translate-x-1/2 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                        Placed
                      </div>
                    </div>
                    <div className="text-center space-y-1.5">
                      <h3 className="font-semibold text-gray-900 text-xs capitalize truncate">
                        {data?.name}
                      </h3>
                      <div className="flex items-center justify-center gap-1 text-gray-600">
                        <FaBuilding className="text-blue-500 text-[10px]" />
                        <span className="text-[10px] capitalize truncate">{data?.company}</span>
                      </div>
                      {data?.package && (
                        <div className="flex items-center justify-center gap-1 bg-blue-50 text-blue-700 text-[10px] font-medium px-1.5 py-0.5 rounded">
                          <FaRupeeSign className="text-[8px]" />
                          <span>{data.package}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar key={star} className="text-yellow-400 text-[8px]" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
       
      </div>

      <style jsx>{`
        .slider-container {
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .slide-track {
          display: flex;
          animation: scroll 40s linear infinite;
          gap: 0.5rem;
          padding: 0.5rem 0;
        }

        .slide {
          flex: 0 0 auto;
          width: 140px;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-140px * ${placed_students?.length || 0} - 0.5rem * ${placed_students?.length || 0}));
          }
        }

        @media (max-width: 768px) {
          .slide {
            width: 130px;
          }
          
          @keyframes scroll {
            100% {
              transform: translateX(calc(-130px * ${placed_students?.length || 0} - 0.5rem * ${placed_students?.length || 0}));
            }
          }
        }

        @media (max-width: 640px) {
          .slide {
            width: 120px;
          }
          
          @keyframes scroll {
            100% {
              transform: translateX(calc(-120px * ${placed_students?.length || 0} - 0.5rem * ${placed_students?.length || 0}));
            }
          }
        }

        .slider-container:hover .slide-track {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
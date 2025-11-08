import React, { useState, useEffect, useRef, useContext } from "react";
import { BuildingOfficeIcon } from "@heroicons/react/24/solid";
import InfiAnimation from "../../extra/infiAnimation/index";
import { Context } from "../../../../../Context_holder";

import Slider from "react-slick";
import { FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaBuilding } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HiringPartners = ({ id }) => {
  const [slidesToShow, setSlidesToShow] = useState(6);
  const [sliderKey, setSliderKey] = useState(0);
  const sliderRef = useRef(null);
  
  const { hiring_partners_fetch, hiring_partners } = useContext(Context);

  useEffect(() => {
    if (id) hiring_partners_fetch(null, id);
  }, [id]);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth < 375) {
        setSlidesToShow(2.5);
      } else if (window.innerWidth < 480) {
        setSlidesToShow(3.2);
      } else if (window.innerWidth < 640) {
        setSlidesToShow(4.2);
      } else if (window.innerWidth < 768) {
        setSlidesToShow(5.2);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(6.2);
      } else if (window.innerWidth < 1280) {
        setSlidesToShow(7.2);
      } else {
        setSlidesToShow(8.2);
      }
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    
    const timer = setTimeout(() => {
      setSliderKey(prev => prev + 1);
    }, 100);

    return () => {
      window.removeEventListener("resize", updateSlidesToShow);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (hiring_partners.length > 0) {
      setSliderKey(prev => prev + 1);
    }
  }, [hiring_partners]);

  // Helper function to format website URL
  const formatWebsiteUrl = (website) => {
    if (!website) return null;
    
    // Remove any whitespace
    let formattedUrl = website.trim();
    
    // Add https:// if not present
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }
    
    return formattedUrl;
  };

  // Custom arrow components
  const CustomPrevArrow = ({ onClick, currentSlide }) => {
    const isDisabled = currentSlide === 0;
    return (
      <button
        onClick={onClick}
        disabled={isDisabled}
        className={`absolute -left-3 md:-left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
          isDisabled 
            ? "bg-gray-300/50 cursor-not-allowed opacity-0" 
            : "bg-white/90 hover:bg-white hover:scale-110 shadow-xl border border-gray-200"
        }`}
        aria-label="Previous companies"
      >
        <FaChevronLeft className={`${isDisabled ? "text-gray-500" : "text-gray-700"} text-sm md:text-base`} />
      </button>
    );
  };

  const CustomNextArrow = ({ onClick, currentSlide, slideCount, slidesToShow }) => {
    const isDisabled = slideCount <= slidesToShow || currentSlide >= slideCount - Math.floor(slidesToShow);
    return (
      <button
        onClick={onClick}
        disabled={isDisabled}
        className={`absolute -right-3 md:-right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
          isDisabled 
            ? "bg-gray-300/50 cursor-not-allowed opacity-0" 
            : "bg-white/90 hover:bg-white hover:scale-110 shadow-xl border border-gray-200"
        }`}
        aria-label="Next companies"
      >
        <FaChevronRight className={`${isDisabled ? "text-gray-500" : "text-gray-700"} text-sm md:text-base`} />
      </button>
    );
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    touchThreshold: 10,
    accessibility: true,
    draggable: true,
    pauseOnHover: true,
    adaptiveHeight: false,
    variableWidth: false,
    centerMode: false,
    focusOnSelect: false,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 8.2,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 7.2,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6.2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5.2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 4.2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3.2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
        }
      }
    ]
  };

  console.log(hiring_partners, "hiring_partners");

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-3 sm:py-12 sm:px-4 lg:py-16 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12 px-2 sm:px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
            <span className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">Career Opportunities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Our Hiring Partners
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Leading companies that trust and hire our graduates
          </p>
        </div>

        {/* Hiring Partners Slider */}
        <div className="relative px-1 sm:px-2 lg:px-4">
          {hiring_partners?.length !== 0 ? (
            <Slider 
              key={sliderKey}
              ref={sliderRef} 
              {...settings}
            >
              {hiring_partners?.map((partner, index) => {
                const websiteUrl = formatWebsiteUrl(partner.website);
                
                return (
                  <div key={partner._id || index} className="px-2 sm:px-3 focus:outline-none">
                    <div className="flex flex-col items-center group">
                      {/* Company Logo Container */}
                      <div className="relative w-full">
                        {/* Main Logo Card with Anchor Tag */}
                        {websiteUrl ? (
                          <a
                            href={websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-2xl bg-white shadow-lg border border-gray-100 p-3 sm:p-4 group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer"
                          >
                            <div className="w-full h-full rounded-xl bg-gray-50 overflow-hidden flex items-center justify-center p-2">
                              {partner.logo ? (
                                <img
                                  src={`${process.env.REACT_APP_API_IMAGE_URL}hiring_partners_logo/${partner.logo}`}
                                  alt={partner.companyName}
                                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                  loading="lazy"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    if (e.target.nextSibling) {
                                      e.target.nextSibling.style.display = 'flex';
                                    }
                                  }}
                                />
                              ) : null}
                              {/* Fallback Icon */}
                              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 rounded-xl hidden items-center justify-center flex-col">
                                <FaBuilding className="text-gray-400 text-xl sm:text-2xl mb-1" />
                                <span className="text-[8px] xs:text-[10px] text-gray-500 text-center px-1">
                                  {partner.companyName?.split(' ')[0]}
                                </span>
                              </div>
                            </div>
                            
                            {/* External Link Icon Overlay */}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="w-6 h-6 sm:w-7 sm:h-7 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                <FaExternalLinkAlt className="text-white text-xs sm:text-sm" />
                              </div>
                            </div>
                          </a>
                        ) : (
                          /* Without link if no website */
                          <div className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-2xl bg-white shadow-lg border border-gray-100 p-3 sm:p-4 flex items-center justify-center">
                            <div className="w-full h-full rounded-xl bg-gray-50 overflow-hidden flex items-center justify-center p-2">
                              {partner.logo ? (
                                <img
                                  src={`${process.env.REACT_APP_API_IMAGE_URL}hiring_partners_logo/${partner.logo}`}
                                  alt={partner.companyName}
                                  className="w-full h-full object-contain"
                                  loading="lazy"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    if (e.target.nextSibling) {
                                      e.target.nextSibling.style.display = 'flex';
                                    }
                                  }}
                                />
                              ) : null}
                              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 rounded-xl hidden items-center justify-center flex-col">
                                <FaBuilding className="text-gray-400 text-xl sm:text-2xl mb-1" />
                                <span className="text-[8px] xs:text-[10px] text-gray-500 text-center px-1">
                                  {partner.companyName?.split(' ')[0]}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* College Badge */}
                        {partner.college_id && (
                          <div className="absolute -bottom-1 -left-1 bg-gradient-to-r from-green-500 to-blue-500 text-white text-[8px] xs:text-[10px] px-2 py-1 rounded-full flex items-center shadow-lg border border-white">
                            <span className="font-medium truncate max-w-[60px] xs:max-w-[80px]">
                              {partner.college_id.college_name}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Company Info */}
                      <div className="mt-3 sm:mt-4 text-center w-full">
                        {websiteUrl ? (
                          <a
                            href={websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group-hover:text-blue-600 transition-colors duration-200"
                          >
                            <h3 className="text-sm xs:text-base font-semibold text-gray-900 line-clamp-2 leading-tight mb-1 group-hover:text-blue-600 transition-colors duration-200">
                              {partner.companyName}
                            </h3>
                            <p className="text-xs text-gray-500 line-clamp-1 flex items-center justify-center gap-1">
                              <FaExternalLinkAlt className="text-[10px]" />
                              Visit Website
                            </p>
                          </a>
                        ) : (
                          <div>
                            <h3 className="text-sm xs:text-base font-semibold text-gray-900 line-clamp-2 leading-tight mb-1">
                              {partner.companyName}
                            </h3>
                            <p className="text-xs text-gray-500">
                              No website available
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          ) : (
            /* Empty State */
            <div className="text-center py-16 sm:py-20">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6">
                <FaBuilding className="text-gray-400 text-2xl sm:text-3xl" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                No Hiring Partners Yet
              </h3>
              <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto">
                We're working on building partnerships with leading companies to provide excellent career opportunities.
              </p>
            </div>
          )}
        </div>

        {/* Stats Section */}
        {hiring_partners?.length !== 0 && (
          <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
            <div className="text-center bg-white rounded-xl p-4 shadow-lg border border-gray-100">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
                {hiring_partners.length}+
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">
                Partner Companies
              </div>
            </div>
            <div className="text-center bg-white rounded-xl p-4 shadow-lg border border-gray-100">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">
                100+
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">
                Placements
              </div>
            </div>
            <div className="text-center bg-white rounded-xl p-4 shadow-lg border border-gray-100">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">
                50+
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">
                Industries
              </div>
            </div>
            <div className="text-center bg-white rounded-xl p-4 shadow-lg border border-gray-100">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">
                95%
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">
                Success Rate
              </div>
            </div>
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
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .slick-track {
          display: flex;
          align-items: center;
          gap: 0;
        }
        
        .slick-slide {
          height: auto;
          padding: 8px 0;
        }
        
        .slick-slide > div {
          height: 100%;
          margin: 0 4px;
        }
        
        .slick-slide:focus {
          outline: none;
        }
        
        .slick-list {
          margin: 0 -8px;
        }
        
        @media (max-width: 480px) {
          .slick-slide > div {
            margin: 0 2px;
          }
        }
      `}</style>
    </div>
  );
};

export default HiringPartners;
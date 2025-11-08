import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { FaEye, FaPlay, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Website_stories = ({ websitestory }) => {
  const [slidesToShow, setSlidesToShow] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState("");
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [sliderKey, setSliderKey] = useState(0); // Force re-render key
  const sliderRef = useRef(null);

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
    
    // Force slider re-render after initial render
    const timer = setTimeout(() => {
      setSliderKey(prev => prev + 1);
    }, 100);

    return () => {
      window.removeEventListener("resize", updateSlidesToShow);
      clearTimeout(timer);
    };
  }, []);

  // Reset slider when data changes
  useEffect(() => {
    if (websitestory && websitestory.length > 0) {
      setSliderKey(prev => prev + 1);
    }
  }, [websitestory]);

  const handleStoryClick = (story, index) => {
    if (!story?.video_url) {
      console.error("Video URL is undefined or empty");
      return;
    }
    
    if (story.video_url.includes("v=")) {
      const videoId = story.video_url.split("v=")[1].split("&")[0];
      setActiveVideoUrl(videoId);
      setActiveStoryIndex(index);
      setIsModalOpen(true);
    } else {
      console.error("Invalid YouTube URL:", story.video_url);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveVideoUrl("");
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
        aria-label="Previous stories"
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
        aria-label="Next stories"
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

  // Check if we have stories to show
  const hasStories = websitestory && websitestory.length > 0;

  return (
    <div className="w-full bg-white py-6 px-3 sm:py-8 sm:px-4 lg:py-10 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 px-2 sm:px-4">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            <span className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">Stories</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            Trusted Voices
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Your Source for Authentic Insights</p>
        </div>

        {/* Stories Slider */}
        <div className="relative px-1 sm:px-2 lg:px-4">
          {hasStories ? (
            <Slider 
              key={sliderKey} // Force re-render when key changes
              ref={sliderRef} 
              {...settings}
            >
              {websitestory.map((story, index) => (
                <div key={story.id || index} className="px-1.5 sm:px-2 focus:outline-none">
                  <div 
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => handleStoryClick(story, index)}
                  >
                    {/* Story Circle with Gradient Border */}
                    <div className="relative">
                      {/* Gradient Border */}
                      <div className="w-14 h-14 xs:w-16 xs:h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-22 lg:h-22 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 p-0.5 group-hover:scale-105 transition-transform duration-300">
                        <div className="w-full h-full rounded-full bg-white p-0.5">
                          <div className="w-full h-full rounded-full bg-gray-100 overflow-hidden">
                            <img
                              src={`${process.env.REACT_APP_API_IMAGE_URL}story_thumbnail/${story?.thumbnail}`}
                              alt={`Story ${index + 1}`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                if (e.target.nextSibling) {
                                  e.target.nextSibling.style.display = 'flex';
                                }
                              }}
                            />
                            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 hidden items-center justify-center">
                              <FaPlay className="text-white text-base sm:text-lg md:text-xl" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Play Icon Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <FaPlay className="text-white text-xs sm:text-sm ml-0.5" />
                        </div>
                      </div>

                      {/* View Count Badge */}
                      {story?.views && (
                        <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-[10px] xs:text-xs px-1.5 py-0.5 rounded-full flex items-center gap-1 shadow-lg border border-white">
                          <FaEye className="text-[8px] xs:text-[10px]" />
                          <span className="font-medium">{story?.views}</span>
                        </div>
                      )}
                    </div>

                    {/* Story Title */}
                    <div className="mt-2 sm:mt-3 text-center">
                      <p className="text-xs xs:text-sm font-medium text-gray-900 line-clamp-2 leading-tight max-w-[70px] xs:max-w-[80px] sm:max-w-[90px]">
                        Story {index + 1}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            /* Empty State */
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPlay className="text-gray-400 text-xl sm:text-2xl" />
              </div>
              <p className="text-sm sm:text-base text-gray-500">No stories available at the moment</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">Check back later for new stories</p>
            </div>
          )}
        </div>
      </div>

      {/* Instagram-style Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-3 sm:p-4 md:p-6">
          <div className="relative w-full max-w-sm sm:max-w-md mx-auto">
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute -top-10 sm:-top-12 right-0 text-white hover:text-gray-300 transition-colors z-10 p-2"
              aria-label="Close video"
            >
              <FaTimes className="text-2xl sm:text-3xl" />
            </button>

            {/* Story Header */}
            <div className="absolute top-4 left-4 right-4 z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-0.5 flex-shrink-0">
                  <div className="w-full h-full rounded-full bg-white p-0.5">
                    <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                      <img
                        src={`${process.env.REACT_APP_API_BASE_URL}image/story_thumbnail/${websitestory[activeStoryIndex]?.thumbnail}`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm sm:text-base font-semibold truncate">College World</p>
                  <p className="text-white/70 text-xs sm:text-sm truncate">Story {activeStoryIndex + 1}</p>
                </div>
                <div className="flex items-center gap-1.5 text-white/70 flex-shrink-0">
                  <FaEye className="text-xs sm:text-sm" />
                  <span className="text-xs sm:text-sm">{websitestory[activeStoryIndex]?.views || 0}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute top-2 left-4 right-4 z-10">
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full w-full animate-pulse"></div>
              </div>
            </div>

            {/* Video Container */}
            <div className="bg-black rounded-xl sm:rounded-2xl overflow-hidden aspect-[9/16] max-h-[85vh] shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeVideoUrl}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
                title={`Story ${activeStoryIndex + 1}`}
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
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
          padding: 4px 0;
        }
        
        .slick-slide > div {
          height: 100%;
          margin: 0 2px;
        }
        
        .slick-slide:focus {
          outline: none;
        }
        
        .slick-list {
          margin: 0 -4px;
        }
        
        @media (max-width: 480px) {
          .slick-slide > div {
            margin: 0 1px;
          }
        }
      `}</style>
    </div>
  );
};

export default Website_stories;
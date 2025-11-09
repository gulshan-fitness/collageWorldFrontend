import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { FaEye, FaPlay, FaTimes, FaChevronLeft, FaChevronRight, FaUser } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewsSlider = ({ stories }) => {
  const [slidesToShow, setSlidesToShow] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState("");
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [sliderKey, setSliderKey] = useState(0);
  const [videoLoading, setVideoLoading] = useState(true);
  const sliderRef = useRef(null);
  const videoRef = useRef(null);

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
    if (stories && stories?.length > 0) {
      setSliderKey(prev => prev + 1);
    }
  }, [stories]);

  // Get YouTube thumbnail
  const getYouTubeThumbnail = (videoUrl) => {
    let videoId = '';
    
    if (videoUrl.includes("youtu.be/")) {
      videoId = videoUrl.split("youtu.be/")[1]?.split("?")[0];
    } else if (videoUrl.includes("v=")) {
      videoId = videoUrl.split("v=")[1]?.split("&")[0];
    } else if (videoUrl.includes("youtube.com/embed/")) {
      videoId = videoUrl.split("youtube.com/embed/")[1]?.split("?")[0];
    }
    
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    return null;
  };

  // Extract YouTube video ID
  const getYouTubeVideoId = (videoUrl) => {
    let videoId = '';
    
    if (videoUrl.includes("youtu.be/")) {
      videoId = videoUrl.split("youtu.be/")[1]?.split("?")[0];
    } else if (videoUrl.includes("v=")) {
      videoId = videoUrl.split("v=")[1]?.split("&")[0];
    } else if (videoUrl.includes("youtube.com/embed/")) {
      videoId = videoUrl.split("youtube.com/embed/")[1]?.split("?")[0];
    }
    
    return videoId;
  };

  const handleStoryClick = (story, index) => {
    if (!story?.video_url) {
      console.error("Video URL is undefined or empty");
      return;
    }
    
    const videoId = getYouTubeVideoId(story.video_url);
    
    if (videoId) {
      setActiveVideoUrl(videoId);
      setActiveStoryIndex(index);
      setIsModalOpen(true);
      setVideoLoading(true);
    } else {
      console.error("Invalid YouTube URL:", story.video_url);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveVideoUrl("");
    setVideoLoading(false);
  };

  const navigateStory = (direction) => {
    let newIndex;
    if (direction === 'next') {
      newIndex = (activeStoryIndex + 1) % stories.length;
    } else {
      newIndex = (activeStoryIndex - 1 + stories.length) % stories.length;
    }
    
    const story = stories[newIndex];
    const videoId = getYouTubeVideoId(story.video_url);
    
    if (videoId) {
      setActiveVideoUrl(videoId);
      setActiveStoryIndex(newIndex);
      setVideoLoading(true);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      
      switch(e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          navigateStory('prev');
          break;
        case 'ArrowRight':
          navigateStory('next');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, activeStoryIndex, stories]);

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

  const currentStory = stories?.[activeStoryIndex];
  const thumbnailUrl = currentStory?.video_url ? getYouTubeThumbnail(currentStory.video_url) : null;

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-6 px-3 sm:py-8 sm:px-4 lg:py-10 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8 px-2 sm:px-4 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-3 sm:mb-4 shadow-lg">
            <FaPlay className="text-white text-lg sm:text-xl" />
          </div>

          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            <span className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">Success Stories</span>
          </div>
          
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Student Success Stories
          </h2>
          
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Watch inspiring testimonials from our successful students
          </p>
        </div>

        {/* Stories Slider */}
        <div className="relative px-1 sm:px-2 lg:px-4">
          {stories?.length !== 0 ? (
            <Slider 
              key={sliderKey}
              ref={sliderRef} 
              {...settings}
            >
              {stories?.map((story, index) => {
                const storyThumbnail = story.video_url ? getYouTubeThumbnail(story.video_url) : null;
                
                return (
                  <div key={story._id || index} className="px-1.5 sm:px-2 focus:outline-none">
                    <div 
                      className="flex flex-col items-center cursor-pointer group"
                      onClick={() => handleStoryClick(story, index)}
                    >
                      {/* Story Circle with Gradient Border */}
                      <div className="relative">
                        {/* Gradient Border */}
                        <div className="w-14 h-14 xs:w-16 xs:h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-22 lg:h-22 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-400 p-0.5 group-hover:scale-105 transition-transform duration-300">
                          <div className="w-full h-full rounded-full bg-white p-0.5">
                            <div className="w-full h-full rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                              {/* Thumbnail or default background */}
                              {storyThumbnail ? (
                                <img 
                                  src={storyThumbnail} 
                                  alt={story.title || `Story ${index + 1}`}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                                  <FaPlay className="text-white text-base sm:text-lg md:text-xl" />
                                </div>
                              )}
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
                        <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-[10px] xs:text-xs px-1.5 py-0.5 rounded-full flex items-center gap-1 shadow-lg border border-white">
                          <FaEye className="text-[8px] xs:text-[10px]" />
                          <span className="font-medium">{story.views || 0}</span>
                        </div>
                      </div>

                      {/* Story Title */}
                      <div className="mt-2 sm:mt-3 text-center">
                        <p className="text-xs xs:text-sm font-medium text-gray-900 line-clamp-2 leading-tight max-w-[70px] xs:max-w-[80px] sm:max-w-[90px]">
                          {story.title || `Story ${index + 1}`}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          ) : (
            /* Empty State */
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPlay className="text-blue-400 text-xl sm:text-2xl" />
              </div>
              <p className="text-sm sm:text-base text-gray-500">No success stories available at the moment</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">Check back later for inspiring stories</p>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Custom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-3 sm:p-4 md:p-6">
          <div className="relative w-full max-w-4xl mx-auto">
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute -top-10 sm:-top-12 right-0 text-white hover:text-gray-300 transition-colors z-20 p-2 bg-black/50 rounded-full"
              aria-label="Close video"
            >
              <FaTimes className="text-2xl sm:text-3xl" />
            </button>

            {/* Navigation Arrows */}
            {stories.length > 1 && (
              <>
                <button 
                  onClick={() => navigateStory('prev')}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200"
                  aria-label="Previous story"
                >
                  <FaChevronLeft className="text-lg sm:text-xl" />
                </button>
                <button 
                  onClick={() => navigateStory('next')}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200"
                  aria-label="Next story"
                >
                  <FaChevronRight className="text-lg sm:text-xl" />
                </button>
              </>
            )}

            {/* Modal Content */}
            <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex flex-col lg:flex-row">
                {/* Video Section */}
                <div className="lg:w-2/3 bg-black relative">
                  {/* Loading Spinner */}
                  {videoLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 bg-black">
                      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  
                  <div className="aspect-video lg:aspect-auto lg:h-[500px] relative">
                    <iframe
                      ref={videoRef}
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${activeVideoUrl}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                      title={`Success Story ${activeStoryIndex + 1}`}
                      onLoad={() => setVideoLoading(false)}
                    ></iframe>
                  </div>
                </div>

                {/* Info Section */}
                <div className="lg:w-1/3 p-4 sm:p-6 bg-white">
                  {/* Story Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 p-0.5 flex-shrink-0">
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                          {thumbnailUrl ? (
                            <img 
                              src={thumbnailUrl} 
                              alt={currentStory?.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FaUser className="text-gray-400 text-lg" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                        {currentStory?.title || `Story ${activeStoryIndex + 1}`}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">Student Success Story</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaEye className="text-base" />
                      <span className="text-sm font-medium">{currentStory?.views || 0} views</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {currentStory?.duration || '5:30'}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">About this story</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {currentStory?.description || "Watch this inspiring success story from one of our students who achieved their dreams through our program."}
                    </p>
                  </div>

                  {/* Progress Indicator */}
                  {stories.length > 1 && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span>Story {activeStoryIndex + 1} of {stories.length}</span>
                        <span>{Math.round(((activeStoryIndex + 1) / stories.length) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${((activeStoryIndex + 1) / stories.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button 
                      onClick={() => window.open(`https://youtube.com/watch?v=${activeVideoUrl}`, '_blank')}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      Watch on YouTube
                    </button>
                    <button 
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Counter for Mobile */}
            {stories.length > 1 && (
              <div className="lg:hidden mt-4 text-center">
                <span className="text-white text-sm">
                  {activeStoryIndex + 1} / {stories.length}
                </span>
              </div>
            )}
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

export default NewsSlider;
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { FaEye, FaPlay, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Website_stories = ({ websitestory }) => {
  const [slidesToShow, setSlidesToShow] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState("");
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth < 480) {
        setSlidesToShow(3);
      } else if (window.innerWidth < 640) {
        setSlidesToShow(4);
      } else if (window.innerWidth < 768) {
        setSlidesToShow(5);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(6);
      } else {
        setSlidesToShow(8);
      }
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const handleStoryClick = (story, index) => {
    console.log("Story clicked! URL: ", story.video_url);
    if (!story.video_url) {
      console.error("Video URL is undefined or empty");
      return;
    }
    
    if (story.video_url.includes("v=")) {
      const videoId = story.video_url.split("v=")[1].split("&")[0];
      console.log("Extracted Video ID: ", videoId);
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
  const CustomPrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
    >
      <FaChevronLeft className="text-gray-700 text-sm" />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
    >
      <FaChevronRight className="text-gray-700 text-sm" />
    </button>
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: slidesToShow,
    slidesToScroll: 2,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      }
    ]
  };



  console.log(websitestory,"websitestory");
  
  return (
    <div className="w-full bg-white py-4 px-2">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4 px-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Stories</span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            Trusted Voices
          </h2>
          <p className="text-sm text-gray-600">Your Source for Authentic Insights</p>
        </div>

        {/* Stories Slider */}
        <div className="relative px-4">
          <Slider {...settings}>
            {websitestory?.map((story, index) => (
              <div key={index} className="px-1">
                <div 
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => handleStoryClick(story, index)}
                >
                  {/* Story Circle with Gradient Border */}
                  <div className="relative">
                    {/* Gradient Border */}
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 p-0.5 group-hover:scale-105 transition-transform duration-200">
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <div className="w-full h-full rounded-full bg-gray-100">
                          <img
                            src={`${process.env.REACT_APP_API_IMAGE_URL}story_thumbnail/${story?.thumbnail}`}
                            alt="Story thumbnail"
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 hidden items-center justify-center">
                            <FaPlay className="text-white text-lg" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Play Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-6 h-6 bg-black/50 rounded-full flex items-center justify-center">
                        <FaPlay className="text-white text-xs ml-0.5" />
                      </div>
                    </div>

                    {/* View Count Badge */}
                    {story?.views && (
                      <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full flex items-center gap-1 shadow-lg">
                        <FaEye className="text-[10px]" />
                        <span className="text-[10px] font-medium">{story?.views}</span>
                      </div>
                    )}
                  </div>

                  {/* Story Title */}
                  <div className="mt-2 text-center">
                    <p className="text-xs font-medium text-gray-900 line-clamp-2 leading-tight max-w-[70px]">
                      Story {index + 1}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Empty State */}
        {(!websitestory || websitestory.length === 0) && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaPlay className="text-gray-400 text-xl" />
            </div>
            <p className="text-sm text-gray-500">No stories available</p>
          </div>
        )}
      </div>

      {/* Instagram-style Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-md mx-auto">
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <FaTimes className="text-2xl" />
            </button>

            {/* Story Header */}
            <div className="absolute top-4 left-4 right-4 z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-0.5">
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
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold">College World</p>
                  <p className="text-white/70 text-xs">Story {activeStoryIndex + 1}</p>
                </div>
                <div className="flex items-center gap-1 text-white/70">
                  <FaEye className="text-xs" />
                  <span className="text-xs">{websitestory[activeStoryIndex]?.views}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute top-2 left-4 right-4 z-10">
              <div className="h-0.5 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full w-full"></div>
              </div>
            </div>

            {/* Video Container */}
            <div className="bg-black rounded-2xl overflow-hidden aspect-[9/16] max-h-[80vh]">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeVideoUrl}?autoplay=1&rel=0&modestbranding=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
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
        }
        
        .slick-slide {
          height: auto;
        }
        
        .slick-slide > div {
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default Website_stories;

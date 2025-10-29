import React, { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaArrowRight, FaNewspaper, FaTimes, FaExternalLinkAlt } from "react-icons/fa";
import { Context } from "../../../../Context_holder";

// Custom Arrow components
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} slick-arrow slick-next`}
      style={{ 
        ...style, 
        display: "block", 
        background: "#2563eb", 
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        zIndex: 10
      }}
      onClick={onClick}
    >
      ›
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} slick-arrow slick-prev`}
      style={{ 
        ...style, 
        display: "block", 
        background: "#2563eb", 
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '20px',
        fontWeight: 'bold',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        zIndex: 10
      }}
      onClick={onClick}
    >
      ‹
    </div>
  );
};

const Website_news_Slider = () => {
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [showAllNewsModal, setShowAllNewsModal] = useState(false);
  const{website_news_fetch,website_news}=useContext(Context)


  useEffect(() => {

     website_news_fetch()

    const updateSlidesToShow = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 768) {
        setSlidesToShow(2);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    touchThreshold: 10,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          swipe: true,
          touchMove: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          swipe: true,
          touchMove: true,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          swipe: true,
          touchMove: true,
          dots: true,
        }
      }
    ]
  };

  // Format date function
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Handle modal open/close
  const openAllNewsModal = () => {
    setShowAllNewsModal(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeAllNewsModal = () => {
    setShowAllNewsModal(false);
    document.body.style.overflow = 'unset'; // Restore background scrolling
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        closeAllNewsModal();
      }
    };

    if (showAllNewsModal) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showAllNewsModal]);

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-white py-8 md:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FaNewspaper className="text-2xl text-blue-600" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Important News & Updates
            </h2>
          </div>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news and announcements from our institution
          </p>
        </div>

        {/* News Slider */}
        <div className="relative px-9 ">
          <Slider {...settings}>
            {website_news?.map((slide, index) => (
              <div key={index} className="px-3 focus:outline-none">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group h-full flex flex-col">
                  {/* News Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={`${process.env.REACT_APP_API_BASE_URL}image/website_news_photo/${slide.logo}`}
                      alt="News Thumbnail"
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                        News
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    {/* Media Logo and Date */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={`${process.env.REACT_APP_API_BASE_URL}image/news_media_image/${slide.news_media_logo}`}
                          alt="News Media"
                          className="w-6 h-6 object-contain"
                        />
                        <span className="text-xs text-gray-600 font-medium">
                          {slide.media_name || "Media"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <FaCalendarAlt size={10} />
                        <span>{formatDate(slide.date || new Date())}</span>
                      </div>
                    </div>

                    {/* Heading */}
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                      {slide.heading}
                    </h3>

                    {/* Description (if available) */}
                    {slide.description && (
                      <p className="text-xs text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {slide.description}
                      </p>
                    )}

                    {/* Read Moree */}
                    <div className="mt-auto flex items-center justify-between">
                      <button 
                    
                        className="text-blue-600 text-xs font-medium flex items-center gap-1 hover:gap-2 transition-all hover:text-blue-700"
                      
                        onClick={()=>  window.open(slide?.url, "_blank")}
                      >
                        Read More
                        <FaExternalLinkAlt size={10} />
                      </button>
                      <span className="text-xs text-gray-500">
                        {slide.category || "General"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <button 
            onClick={openAllNewsModal}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-6 rounded-lg transition-colors duration-200 inline-flex items-center gap-2"
          >
            View All News
            <FaArrowRight size={14} />
          </button>
        </div>

        {/* All News Modal */}
        {showAllNewsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="flex items-center gap-3">
                  <FaNewspaper className="text-2xl" />
                  <h3 className="text-xl font-bold">All News & Updates</h3>
                </div>
                <button
                  onClick={closeAllNewsModal}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {website_news?.map((slide, index) => (
                    <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      {/* News Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={`${process.env.REACT_APP_API_BASE_URL}image/website_news_photo/${slide.logo}`}
                          alt="News Thumbnail"
                          className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                            News
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        {/* Media Logo and Date */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={`${process.env.REACT_APP_API_BASE_URL}image/news_media_image/${slide.news_media_logo}`}
                              alt="News Media"
                              className="w-5 h-5 object-contain"
                            />
                            <span className="text-xs text-gray-600 font-medium">
                              {slide.media_name || "Media"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <FaCalendarAlt size={10} />
                            <span>{formatDate(slide.date || new Date())}</span>
                          </div>
                        </div>

                        {/* Heading */}
                        <h4 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                          {slide.heading}
                        </h4>

                        {/* Description */}
                        {slide.description && (
                          <p className="text-xs text-gray-600 mb-3 line-clamp-3 leading-relaxed">
                            {slide.description}
                          </p>
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                          <Link 
                            to={slide?.url || "#"} 
                            className="text-blue-600 text-xs font-medium flex items-center gap-1 hover:text-blue-700 transition-colors"
                            target={slide?.url ? "_blank" : "_self"}
                            rel={slide?.url ? "noopener noreferrer" : ""}
                            onClick={closeAllNewsModal}
                          >
                            
                            <FaExternalLinkAlt size={10} />
                          </Link>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {slide.category || "General"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Website_news_Slider;
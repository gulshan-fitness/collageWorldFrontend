'use client';

import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import {
  FaPlay,
  FaEye,
  FaCalendar,
  FaYoutube,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from 'react-icons/fa';
import { Context } from '../../../../../Context_holder';

// ==================== YouTube Helpers ====================
const getYouTubeId = (url) => {
  if (!url) return '';
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/
  );
  return match ? match[1] : '';
};

const getYouTubeEmbedUrl = (url) => {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : '';
};

// ==================== YouTube Modal ====================
const YouTubeModal = ({ isOpen, onClose, videoUrl, title }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
      <div className="relative w-full max-w-4xl mx-auto bg-black rounded-xl overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
          aria-label="Close"
        >
          <FaTimes className="text-xs" />
        </button>

        <div className="relative pt-[56.25%] bg-black">
          <iframe
            src={getYouTubeEmbedUrl(videoUrl)}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title || 'YouTube video'}
          />
        </div>
      </div>
    </div>
  );
};

// ==================== Main Slider ====================
export default function VideoStoriesSlider() {
  const { websitestory_fetch, websitestory } = useContext(Context);

  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const sliderRef = useRef(null);
  const minSwipeDistance = 50;

  // Fetch data
  useEffect(() => {
    websitestory_fetch();
  }, []);

  // === Responsive Items Per View ===
  const calculateItemsPerView = useCallback(() => {
    if (typeof window === 'undefined') return 4;
    const width = window.innerWidth;
    if (width < 400) return 1;     // Very small mobile
    if (width < 640) return 1;     // Mobile
    if (width < 768) return 2;     // Small tablet
    if (width < 1024) return 3;    // Tablet
    if (width < 1280) return 4;    // Desktop
    return 5;                      // Large desktop
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newItems = calculateItemsPerView();
      setItemsPerView(newItems);
      setCurrentIndex(0); // Reset to first slide on resize
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateItemsPerView]);

  const maxIndex = Math.max(0, (websitestory?.length || 0) - itemsPerView);

  // === Navigation ===
  const nextSlide = () => {
    if (currentIndex >= maxIndex) {
      setCurrentIndex(0); // Loop back to start
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex <= 0) {
      setCurrentIndex(maxIndex); // Loop to end
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // === Touch Swipe ===
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // === Modal ===
  const openModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  // === Formatters ===
  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });

  const formatViews = (v) => {
    if (!v) return '0';
    const num = parseInt(v.replace(/\D/g, ''));
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // === Empty State ===
  if (!websitestory?.length) {
    return (
      <section className="py-12 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaYoutube className="text-2xl text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Videos Available
          </h3>
          <p className="text-sm text-gray-600">
            Check back later for inspiring stories.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">

        {/* Header - Compact */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-600 rounded-2xl mb-3">
            <FaYoutube className="text-lg text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
           Our Success Stories
          </h2>
          <p className="text-xs text-gray-600 max-w-md mx-auto">
            Watch inspiring success stories
          </p>
        </header>

        {/* Slider Container */}
        <div className="relative">

          {/* Navigation Buttons - Always Visible */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center text-gray-600 hover:text-red-600 border border-gray-200 transition-all duration-200 hover:scale-110 hover:shadow-lg"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-sm" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center text-gray-600 hover:text-red-600 border border-gray-200 transition-all duration-200 hover:scale-110 hover:shadow-lg"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-sm" />
          </button>

          {/* Slider Track */}
          <div
            ref={sliderRef}
            className="overflow-hidden px-2"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-out gap-3"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {websitestory.map((video) => (
                <div
                  key={video._id}
                  className="flex-shrink-0 transition-transform duration-200 hover:scale-[1.02]"
                  style={{ 
                    width: `calc(${100 / itemsPerView}% - 0.75rem)`,
                  }}
                >
                  {/* Compact Card */}
                  <article className="bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-100 overflow-hidden h-full flex flex-col transition-all duration-200">
                    
                    {/* Thumbnail - Compact */}
                    <div
                      className="relative overflow-hidden cursor-pointer bg-gray-100"
                      onClick={() => openModal(video)}
                    >
                      <div className="aspect-video">
                        <img
                          src={`${process.env.REACT_APP_API_IMAGE_URL}story_thumbnail/${video.thumbnail}`}
                          alt={video.title || 'Video thumbnail'}
                          className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>

                      {/* Play Button - Small */}
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center transform scale-90 hover:scale-100 transition-all duration-200">
                          <FaPlay className="text-white text-xs ml-0.5" />
                        </div>
                      </div>

                      {/* Badges - Compact */}
                      <div className="absolute top-1.5 right-1.5 bg-black/80 text-white text-xs px-1.5 py-1 rounded-md flex items-center gap-1">
                        <FaEye className="text-[10px]" />
                        <span className="text-[10px] font-medium">{formatViews(video.views)}</span>
                      </div>
                    </div>

                    {/* Content - Compact */}
                    <div className="p-3 flex-1 flex flex-col">
                      <h3 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2 mb-2 flex-1">
                        {video.title || `Video: ${getYouTubeId(video.video_url)}`}
                      </h3>

                      <div className="space-y-2">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <FaCalendar className="text-gray-400 text-[10px]" />
                          <span>{formatDate(video.createdAt)}</span>
                        </div>

                        <button
                          onClick={() => openModal(video)}
                          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                          <FaPlay className="text-[10px]" />
                          <span>Watch</span>
                        </button>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Dots - Compact */}
          {maxIndex > 0 && (
            <div className="flex justify-center gap-1.5 mt-4">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'bg-red-600 w-4'
                      : 'bg-gray-300 w-1 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Progress Text - Compact */}
        <p className="text-center mt-3 text-xs text-gray-500">
          {currentIndex * itemsPerView + 1}-{Math.min((currentIndex + 1) * itemsPerView, websitestory.length)} of {websitestory.length}
        </p>
      </div>

      {/* Modal */}
      <YouTubeModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        videoUrl={selectedVideo?.video_url}
        title={selectedVideo?.title}
      />

      {/* Custom Styles */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
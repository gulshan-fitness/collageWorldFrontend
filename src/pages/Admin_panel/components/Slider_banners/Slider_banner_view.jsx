import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../Context_holder';
import { 
  FiTrash2, 
  FiEye, 
  FiSliders, 
  FiAlertTriangle,
  FiPlus,
  FiDownload,
  FiX,
  FiPlay,
  FiPause
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Slider_banner_view() {
  const { slider_banners_fetch, slider_banner, token, notify } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await slider_banners_fetch();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Auto-play for slider preview
  useEffect(() => {
    let interval;
    if (autoPlay && selectedBanner && selectedBanner.banner.length > 1) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % selectedBanner.banner.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [autoPlay, selectedBanner]);

  const delete_handler = (banner) => {
    setBannerToDelete(banner);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    if (!bannerToDelete) return;

    try {
      const success = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_SLIDER_BANNER_URL}delete/${bannerToDelete._id}/${JSON.stringify(bannerToDelete.banner)}`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      notify(success.data.msg, success.data.status);

      if (success.data.status === 1) {
        slider_banners_fetch();
      }
    } catch (error) {
      console.error('Error:', error);
      notify('Failed to delete slider banner', 0);
    } finally {
      setShowDeletePopup(false);
      setBannerToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setBannerToDelete(null);
  };

  const openSliderPreview = (banner) => {
    setSelectedBanner(banner);
    setCurrentSlide(0);
    setAutoPlay(true);
    setShowImageModal(true);
  };

  const nextSlide = () => {
    if (selectedBanner) {
      setCurrentSlide((prev) => (prev + 1) % selectedBanner.banner.length);
    }
  };

  const prevSlide = () => {
    if (selectedBanner) {
      setCurrentSlide((prev) => (prev - 1 + selectedBanner.banner.length) % selectedBanner.banner.length);
    }
  };

  const downloadImage = (imageUrl, index) => {
    const link = document.createElement('a');
    link.href = process.env.REACT_APP_API_IMAGE_URL + "slider_banner/" + imageUrl;
    link.download = `slider-banner-${index + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 rounded-xl w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 animate-pulse">
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
                  <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
                  <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
                </div>
                <div className="flex space-x-3">
                  <div className="h-10 bg-gray-300 rounded-lg flex-1"></div>
                  <div className="h-10 bg-gray-300 rounded-lg flex-1"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (slider_banner?.length !== 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-2xl mb-6">
              <FiSliders className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              Slider Banner Gallery
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Manage and preview all your website slider banner collections
            </p>
          </div>

          {/* Stats Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{slider_banner?.length || 0}</div>
                  <div className="text-sm text-gray-500">Slider Sets</div>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-gray-700">
                    {slider_banner?.reduce((total, item) => total + item.banner.length, 0) || 0}
                  </div>
                  <div className="text-sm text-gray-500">Total Slides</div>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-gray-700">
                    {Math.max(...(slider_banner?.map(item => item.banner.length) || [0]))}
                  </div>
                  <div className="text-sm text-gray-500">Largest Set</div>
                </div>
              </div>
              
              <Link
                to="/admin/slider_banner/add"
                className="mt-4 sm:mt-0 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <FiPlus className="text-lg" />
                <span>Add New Slider</span>
              </Link>
            </div>
          </div>

          {/* Slider Banners Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {slider_banner?.map((data, index) => (
              <div
                key={data._id}
                className="group bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:border-orange-300 transition-all duration-300 overflow-hidden"
              >
                
                {/* Slider Header */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        Slider Set #{index + 1}
                      </h3>
                      <p className="text-orange-100 text-sm">
                        {data.banner.length} slide{data.banner.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="bg-white/20 rounded-full px-3 py-1">
                      <span className="text-white text-sm font-semibold">
                        #{index + 1}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  
                  {/* Slider Preview */}
                  <div className="relative mb-4 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                    <div className="aspect-video flex items-center justify-center">
                      <img 
                        src={process.env.REACT_APP_API_IMAGE_URL + "slider_banner/" + data.banner[0]} 
                        alt="Slider Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                      Preview
                    </div>
                  </div>

                  {/* Thumbnail Grid */}
                  <div className="grid grid-cols-4 gap-2 mb-6">
                    {data.banner.slice(0, 4).map((bannerImage, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="relative aspect-video rounded border border-gray-200 overflow-hidden group/thumb"
                      >
                        <img 
                          src={process.env.REACT_APP_API_IMAGE_URL + "slider_banner/" + bannerImage} 
                          alt={`Slide ${imgIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/thumb:opacity-100 transition-all duration-300 flex items-center justify-center">
                          <span className="text-white text-xs font-semibold">
                            {imgIndex + 1}
                          </span>
                        </div>
                      </div>
                    ))}
                    {data.banner.length > 4 && (
                      <div className="relative aspect-video rounded border border-gray-200 bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-600 text-sm font-semibold">
                          +{data.banner.length - 4}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => openSliderPreview(data)}
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-center py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-lg"
                    >
                      <FiPlay className="text-sm" />
                      <span>Preview Slider</span>
                    </button>
                    
                    <button
                      onClick={() => delete_handler(data)}
                      className="flex-1 bg-white hover:bg-red-50 text-red-600 border border-red-300 hover:border-red-400 text-center py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-lg"
                    >
                      <FiTrash2 className="text-sm" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Preview Modal */}
        <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ${showImageModal ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className="relative max-w-6xl w-full mx-4">
            {/* Close Button */}
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 z-10"
            >
              <FiX className="w-6 h-6" />
            </button>

            {/* Auto-play Toggle */}
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className="absolute -top-12 left-0 text-white hover:text-gray-300 transition-colors duration-200 z-10 flex items-center space-x-2"
            >
              {autoPlay ? <FiPause className="w-5 h-5" /> : <FiPlay className="w-5 h-5" />}
              <span className="text-sm">{autoPlay ? 'Pause' : 'Play'}</span>
            </button>

            {/* Main Slider */}
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={process.env.REACT_APP_API_IMAGE_URL + "slider_banner/" + selectedBanner?.banner[currentSlide]} 
                alt={`Slide ${currentSlide + 1}`}
                className="w-full h-[70vh] object-contain"
              />
              
              {/* Navigation Arrows */}
              {selectedBanner?.banner.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {selectedBanner?.banner.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentSlide ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>

              {/* Slide Counter */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentSlide + 1} / {selectedBanner?.banner.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
              {selectedBanner?.banner.map((bannerImage, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`flex-shrink-0 w-20 h-12 rounded border-2 transition-all duration-200 overflow-hidden ${
                    index === currentSlide ? 'border-orange-500' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={process.env.REACT_APP_API_IMAGE_URL + "slider_banner/" + bannerImage} 
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Delete Confirmation Popup */}
        <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ${showDeletePopup ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 border border-gray-200">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <FiAlertTriangle className="text-red-600 text-3xl" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Delete Slider Set?</h3>
            <p className="text-gray-600 text-center mb-6">
              This will permanently delete {bannerToDelete?.banner.length} slider image{bannerToDelete?.banner.length !== 1 ? 's' : ''}. This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={cancelDelete}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg"
              >
                Delete Slider
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiSliders className="text-orange-600 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Slider Banners Yet</h2>
            <p className="text-gray-600 mb-6">Create your first slider banner set to showcase multiple images</p>
            <a
              href="/admin/slider_banner/add"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <FiPlus className="text-lg" />
              <span>Create First Slider</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
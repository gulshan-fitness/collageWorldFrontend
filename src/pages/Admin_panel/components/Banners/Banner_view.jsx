import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../Context_holder';
import { 
  FiTrash2, 
  FiEye, 
  FiImage, 
  FiAlertTriangle,
  FiPlus,
  FiDownload,
  FiX
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Banner_view() {
  const { banners_fetch, banner, token, notify } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await banners_fetch();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const delete_handler = (banner) => {
    setBannerToDelete(banner);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    if (!bannerToDelete) return;

    try {
      const success = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_BANNER_URL}delete/${bannerToDelete._id}/${JSON.stringify(bannerToDelete.banner)}`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      notify(success.data.msg, success.data.status);

      if (success.data.status === 1) {
        banners_fetch();
      }
    } catch (error) {
      console.error('Error:', error);
      notify('Failed to delete banner', 0);
    } finally {
      setShowDeletePopup(false);
      setBannerToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setBannerToDelete(null);
  };

  const openImagePreview = (imageUrl) => {
    setImagePreview(imageUrl);
    setShowImageModal(true);
  };

  const downloadImage = (imageUrl, index) => {
    const link = document.createElement('a');
    link.href = process.env.REACT_APP_API_IMAGE_URL + "college_banners/" + imageUrl;
    link.download = `banner-${index + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
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

  if (banner?.length !== 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-2xl mb-6">
              <FiImage className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Banner Gallery
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Manage and view all your banner images in one place
            </p>
          </div>

          {/* Stats Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{banner?.length || 0}</div>
                  <div className="text-sm text-gray-500">Banner Sets</div>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-gray-700">
                    {banner?.reduce((total, item) => total + item.banner.length, 0) || 0}
                  </div>
                  <div className="text-sm text-gray-500">Total Images</div>
                </div>
              </div>
              
              <Link
                to="/admin/banner/add"
                className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <FiPlus className="text-lg" />
                <span>Add New Banners</span>
              </Link>
            </div>
          </div>

          {/* Banners Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {banner?.map((data, index) => (
              <div
                key={data._id}
                className="group bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 overflow-hidden"
              >
                
                {/* Banner Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4">
                  <h3 className="text-white font-semibold text-lg">
                    Banner Set #{index + 1}
                  </h3>
                  <p className="text-blue-100 text-sm">
                    {data.banner.length} image{data.banner.length !== 1 ? 's' : ''}
                  </p>
                </div>
                
                <div className="p-6">
                  
                  {/* Banner Images Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {data.banner.map((bannerImage, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="relative group/image aspect-square rounded-lg overflow-hidden border border-gray-200 hover:border-blue-400 transition-all duration-200"
                      >
                        <img 
                          src={process.env.REACT_APP_API_IMAGE_URL + "college_banners/" + bannerImage} 
                          alt={`Banner ${imgIndex + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                        
                        {/* Image Overlay Actions */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/image:opacity-100 transition-all duration-300 flex items-center justify-center space-x-2">
                          <button
                            onClick={() => openImagePreview(bannerImage)}
                            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors duration-200 backdrop-blur-sm"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => downloadImage(bannerImage, imgIndex)}
                            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors duration-200 backdrop-blur-sm"
                          >
                            <FiDownload className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setSelectedBanner(data);
                        openImagePreview(data.banner[0]);
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-lg"
                    >
                      <FiEye className="text-sm" />
                      <span>View All</span>
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

        {/* Image Preview Modal */}
        <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ${showImageModal ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className="relative max-w-4xl max-h-[90vh] mx-4">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 z-10"
            >
              <FiX className="w-6 h-6" />
            </button>
            <img 
              src={process.env.REACT_APP_API_IMAGE_URL + "college_banners/" + imagePreview} 
              alt="Banner Preview"
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
            />
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
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Delete Banner Set?</h3>
            <p className="text-gray-600 text-center mb-6">
              This will permanently delete {bannerToDelete?.banner.length} banner image{bannerToDelete?.banner.length !== 1 ? 's' : ''}. This action cannot be undone.
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
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiImage className="text-blue-600 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Banners Yet</h2>
            <p className="text-gray-600 mb-6">Start by uploading your first set of banner images</p>
            <a
              href="/admin/banner/add"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <FiPlus className="text-lg" />
              <span>Upload First Banners</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
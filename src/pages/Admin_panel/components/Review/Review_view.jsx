import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../../Context_holder';
import {
  FiTrash2,
  FiEye,
  FiStar,
  FiUser,
  FiHome,
  FiSearch,
  FiFilter,
  FiMessageSquare,
  FiCalendar,
  FiChevronDown,
  FiX,
  FiAlertTriangle,
} from 'react-icons/fi';

export default function Review_view() {
  const { review_fetch, review, notify } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    review_fetch();
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  useEffect(() => {
    if (review?.review) {
      let filtered = review.review.filter(
        (item) =>
          item.college_id?.college_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.review?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (selectedCollege !== 'all') {
        filtered = filtered.filter((item) => item.college_id?._id === selectedCollege);
      }

      filtered = filtered.sort((a, b) => {
        switch (sortBy) {
          case 'newest':
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 'oldest':
            return new Date(a.createdAt) - new Date(b.createdAt);
          case 'college':
            return a.college_id?.college_name?.localeCompare(b.college_id?.college_name);
          default:
            return 0;
        }
      });

      setFilteredReviews(filtered);
    }
  }, [review, searchTerm, selectedCollege, sortBy]);

  const openDeleteModal = (review) => {
    setReviewToDelete(review);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setReviewToDelete(null);
  };

  const delete_handler = (id) => {
    setIsDeleting(true);
    axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_REVIEW_URL}delete/${id}`)
      .then((success) => {
        notify(success.data.msg, success.data.status);
        if (success.data.status === 1) {
          review_fetch();
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        notify('Error deleting review', 0);
      })
      .finally(() => {
        setIsDeleting(false);
        closeDeleteModal();
      });
  };

  const handleDeleteConfirm = () => {
    if (reviewToDelete) {
      delete_handler(reviewToDelete._id);
    }
  };

  const openReviewModal = (review) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReview(null);
  };

  const getCollegesList = () => {
    if (!review?.review) return [];
    const colleges = review.review.map((item) => item.college_id).filter(Boolean);
    return [...new Map(colleges.map((item) => [item._id, item])).values()];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const truncateText = (text, length = 100) => {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-64 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white/90 rounded-2xl shadow-sm p-4 sm:p-6 animate-pulse backdrop-blur-md"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (review?.review?.length !== 0) {
    return (
      <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        {/* Subtle Background Pattern */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-800 mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Customer Reviews
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Manage and monitor all user reviews across colleges
            </p>
          </div>

          {/* Stats and Controls */}
          <div className="bg-white/90 rounded-2xl shadow-lg border border-purple-100/50 p-4 sm:p-6 mb-8 backdrop-blur-md">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
              {/* Quick Stats */}
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-purple-600">{filteredReviews.length}</div>
                  <div className="text-xs sm:text-sm text-slate-500">Showing</div>
                </div>
                <div className="h-6 sm:h-8 w-px bg-purple-100"></div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-semibold text-slate-700">
                    {review?.review?.length || 0}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500">Total Reviews</div>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="flex-1 w-full max-w-4xl">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {/* Search Bar */}
                  <div className="flex-1 relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search reviews, users, or colleges..."
                      className="w-full pl-10 pr-4 py-2 sm:py-3 bg-white/50 border border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-sm sm:text-base backdrop-blur-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      aria-label="Search reviews"
                    />
                  </div>

                  {/* Filter Dropdowns */}
                  <div className="flex gap-2 sm:gap-3">
                    <select
                      value={selectedCollege}
                      onChange={(e) => setSelectedCollege(e.target.value)}
                      className="px-3 sm:px-4 py-2 sm:py-3 bg-white/50 border border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none cursor-pointer min-w-[120px] sm:min-w-[160px] text-sm sm:text-base backdrop-blur-sm"
                      aria-label="Filter by college"
                    >
                      <option value="all">All Colleges</option>
                      {getCollegesList().map((college) => (
                        <option key={college._id} value={college._id}>
                          {college.college_name}
                        </option>
                      ))}
                    </select>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 sm:px-4 py-2 sm:py-3 bg-white/50 border border-purple-100 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none cursor-pointer text-sm sm:text-base backdrop-blur-sm"
                      aria-label="Sort reviews"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="college">By College</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredReviews.map((data, index) => (
              <div
                key={data._id}
                className="bg-white/90 rounded-2xl shadow-lg border border-purple-100/50 hover:shadow-xl hover:border-purple-300 transition-all duration-300 overflow-hidden group backdrop-blur-md"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-4 sm:p-6">
                  {/* Review Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {data?.user?.name ? data.user.name.charAt(0).toUpperCase() : 'A'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 text-sm sm:text-base">
                          {data?.user?.name || 'Admin'}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 flex items-center space-x-1">
                          <FiCalendar className="text-xs" />
                          <span>{formatDate(data.createdAt)}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* College Info */}
                  <div className="mb-4 p-3 bg-purple-50/50 rounded-lg border border-purple-100 backdrop-blur-sm">
                    <div className="flex items-center space-x-2 text-xs sm:text-sm">
                      <FiHome className="text-purple-500 flex-shrink-0" />
                      <span className="font-medium text-purple-900 truncate">
                        {data.college_id?.college_name || 'Unknown College'}
                      </span>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <FiMessageSquare className="text-purple-400 text-sm" />
                      <span className="text-xs sm:text-sm font-medium text-slate-700">Review</span>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {truncateText(data.review, 120)}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 sm:space-x-3">
                    <button
                      onClick={() => openReviewModal(data)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      aria-label={`View details for ${data?.user?.name || 'Admin'}'s review`}
                      title="View review details"
                    >
                      <FiEye className="text-sm" />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => openDeleteModal(data)}
                      className="flex-1 bg-white hover:bg-red-50 text-red-600 border border-red-200 hover:border-red-300 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
                      aria-label={`Delete review by ${data?.user?.name || 'Admin'}`}
                      title="Delete this review"
                    >
                      <FiTrash2 className="text-sm" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty Search State */}
          {filteredReviews.length === 0 && review?.review?.length > 0 && (
            <div className="text-center py-12 sm:py-16">
              <div className="bg-white/90 rounded-2xl shadow-lg border border-purple-100/50 p-8 sm:p-12 max-w-md mx-auto backdrop-blur-md">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="text-yellow-600 text-2xl" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">No reviews found</h3>
                <p className="text-slate-600 text-sm sm:text-base mb-6">Try adjusting your search criteria</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCollege('all');
                  }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Review Detail Modal */}
        {showModal && selectedReview && (
          <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fadeIn"
            role="dialog"
            aria-labelledby="review-details-title"
            aria-modal="true"
          >
            <div className="bg-white/90 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-slideUp backdrop-blur-md">
              <div className="p-4 sm:p-6 border-b border-purple-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800" id="review-details-title">
                    Review Details
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
                    aria-label="Close review details modal"
                  >
                    <FiX className="text-xl sm:text-2xl" />
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* User Info */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                    {selectedReview?.user?.name ? selectedReview.user.name.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-base sm:text-lg">
                      {selectedReview?.user?.name || 'Admin'}
                    </h4>
                    <p className="text-slate-500 text-xs sm:text-sm flex items-center space-x-2">
                      <FiCalendar className="text-xs" />
                      <span>{formatDate(selectedReview.createdAt)}</span>
                    </p>
                  </div>
                </div>

                {/* College Info */}
                <div className="bg-purple-50/50 rounded-xl p-3 sm:p-4 border border-purple-100 backdrop-blur-sm">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <FiHome className="text-purple-500 text-lg sm:text-xl flex-shrink-0" />
                    <div>
                      <h5 className="font-semibold text-purple-900 text-sm sm:text-base">College</h5>
                      <p className="text-purple-800 text-xs sm:text-sm">
                        {selectedReview.college_id?.college_name || 'Unknown College'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div>
                  <h5 className="font-semibold text-slate-800 text-sm sm:text-base mb-3 flex items-center space-x-2">
                    <FiMessageSquare className="text-purple-400" />
                    <span>Review Content</span>
                  </h5>
                  <div className="bg-white/50 rounded-xl p-4 sm:p-6 border border-purple-100 backdrop-blur-sm">
                    <p className="text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedReview.review}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 border-t border-purple-100 bg-white/50 rounded-b-2xl backdrop-blur-sm">
                <div className="flex space-x-2 sm:space-x-3">
                  <button
                    onClick={closeModal}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-slate-800 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    aria-label="Close modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      openDeleteModal(selectedReview);
                      closeModal();
                    }}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
                    aria-label="Delete review from modal"
                  >
                    <FiTrash2 className="text-sm" />
                    <span>Delete Review</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && reviewToDelete && (
          <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-fadeIn"
            role="dialog"
            aria-labelledby="delete-confirm-title"
            aria-modal="true"
          >
            <div className="bg-white/90 rounded-2xl shadow-2xl max-w-md w-full animate-slideUp backdrop-blur-md">
              <div className="p-4 sm:p-6 border-b border-purple-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center space-x-2" id="delete-confirm-title">
                    <FiAlertTriangle className="text-red-500" />
                    <span>Confirm Deletion</span>
                  </h3>
                  <button
                    onClick={closeDeleteModal}
                    className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
                    aria-label="Close delete confirmation modal"
                  >
                    <FiX className="text-xl sm:text-2xl" />
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiTrash2 className="text-red-500 text-xl sm:text-2xl" />
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">
                    Delete Review?
                  </h4>
                  <p className="text-slate-600 text-sm sm:text-base">
                    Are you sure you want to delete this review? This action cannot be undone.
                  </p>
                </div>

                {/* Review Preview */}
                <div className="bg-white/50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 border border-purple-100 backdrop-blur-sm">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                    <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-semibold">
                      {reviewToDelete?.user?.name ? reviewToDelete.user.name.charAt(0).toUpperCase() : 'A'}
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-medium text-slate-800">
                        {reviewToDelete?.user?.name || 'Admin'}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500">
                        {reviewToDelete.college_id?.college_name || 'Unknown College'}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                    "{truncateText(reviewToDelete.review, 120)}"
                  </p>
                </div>

                <div className="flex space-x-2 sm:space-x-3">
                  <button
                    onClick={closeDeleteModal}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-slate-800 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    aria-label="Cancel deletion"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    disabled={isDeleting}
                    className={`flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300 ${
                      isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    aria-label="Confirm deletion of review"
                  >
                    {isDeleting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 sm:w-5 h-4 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Deleting...</span>
                      </div>
                    ) : (
                      <>
                        <FiTrash2 className="text-sm" />
                        <span>Yes, Delete</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
          .animate-slideUp {
            animation: slideUp 0.3s ease-out;
          }
          .hover\:scale-105:hover {
            animation: bounce 0.3s ease-in-out;
          }
          @keyframes bounce {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
          .backdrop-blur-md {
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
          }
          @media (max-width: 640px) {
            h1 {
              font-size: 1.5rem !important;
            }
            p {
              font-size: 0.875rem !important;
            }
            button,
            select,
            input {
              font-size: 0.9rem !important;
            }
            .min-w-40 {
              min-width: 120px !important;
            }
            .min-w-[120px] {
              min-width: 100px !important;
            }
            .min-w-[160px] {
              min-width: 120px !important;
            }
          }
        `}</style>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="bg-white/90 rounded-2xl shadow-lg border border-purple-100/50 p-6 sm:p-8 backdrop-blur-md">
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <FiMessageSquare className="text-purple-600 text-2xl sm:text-3xl" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">No Reviews Yet</h2>
            <p className="text-slate-600 text-sm sm:text-base mb-4 sm:mb-6">
              User reviews will appear here once they start submitting feedback
            </p>
            <div className="text-xs sm:text-sm text-slate-500">
              Check back later for user reviews
            </div>
          </div>
        </div>
      </div>
    );
  }
}
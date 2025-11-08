import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../../../../Context_holder';
import { Link } from 'react-router-dom';
import { 
  FiTrash2, 
  FiEye, 
  FiPlay, 
  FiPlus, 
  FiSearch,
  FiFilter,
  FiVideo,
  FiEye as FiViews,
  FiExternalLink,
  FiCalendar,
  FiX,
  FiAlertTriangle,
  FiTrendingUp
} from 'react-icons/fi';

export default function WebsiteStory_view() {
  const { websitestory_fetch, websitestory, token, notify } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStories, setFilteredStories] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    websitestory_fetch();
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  useEffect(() => {
    if (websitestory) {
      let filtered = websitestory.filter(story =>
        story.video_url?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      filtered = filtered.sort((a, b) => {
        switch (sortBy) {
          case 'newest':
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 'oldest':
            return new Date(a.createdAt) - new Date(b.createdAt);
          case 'views':
            return b.views - a.views;
          case 'title':
            return a.video_url?.localeCompare(b.video_url);
          default:
            return 0;
        }
      });

      setFilteredStories(filtered);
    }

    
  }, [websitestory, searchTerm, sortBy]);

  const openDeleteModal = (story) => {
    setStoryToDelete(story);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setStoryToDelete(null);
  };

  const delete_handler = (id, thumbnail) => {
    axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_WEBSITE_STORIES_URL}delete/${id}/${thumbnail}`, {
        headers: { Authorization: token }
      })
      .then((success) => {
        notify(success.data.msg, success.data.status);
        if (success.data.status === 1) {
          websitestory_fetch();
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        notify('Error deleting story', 0);
      })
      .finally(() => {
        closeDeleteModal();
      });
  };

  const handleDeleteConfirm = () => {
    if (storyToDelete) {
      delete_handler(storyToDelete._id, storyToDelete.thumbnail);
    }
  };

  const openStoryModal = (story) => {
    setSelectedStory(story);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStory(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown Date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDomainFromUrl = (url) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return 'External Link';
    }
  };

  const getRandomGradient = (index) => {
    const gradients = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-blue-500',
      'from-teal-500 to-green-500'
    ];
    return gradients[index % gradients.length];
  };

  const formatViews = (views) => {
    if (!views) return '0';
    if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M';
    if (views >= 1000) return (views / 1000).toFixed(1) + 'K';
    return views.toString();
  };

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-64 mx-auto animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-2xl shadow-sm p-6 animate-pulse">
                <div className="h-48 bg-gray-300 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-300 rounded w-20"></div>
                  <div className="h-4 bg-gray-300 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (websitestory?.length !== 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Website Stories
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Manage and showcase engaging video stories and content
            </p>
          </div>

          {/* Stats and Controls */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              
              {/* Quick Stats */}
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{filteredStories.length}</div>
                  <div className="text-sm text-gray-500">Showing</div>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-gray-700">{websitestory?.length || 0}</div>
                  <div className="text-sm text-gray-500">Total Stories</div>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                {/* <div className="text-center">
                  <div className="text-xl font-semibold text-gray-700">
                    {websitestory?.reduce((total, story) => total + (story.views || 0), 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Total Views</div>
                </div> */}
              </div>

              {/* Search and Filters */}
              <div className="flex-1 max-w-2xl">
                <div className="flex flex-col sm:flex-row gap-4">
                  
                  {/* Search Bar */}
                  <div className="flex-1 relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search stories..."
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Sort Dropdown */}
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none cursor-pointer min-w-40"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="views">Most Viewed</option>
                    <option value="title">By Title</option>
                  </select>
                </div>
              </div>

              {/* Add Story Button */}
              <Link
                to="/admin/website_story/add"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <FiPlus className="text-lg" />
                <span>Add Story</span>
              </Link>
            </div>
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story, index) => (
              <div
                key={story._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-purple-300 transition-all duration-300 overflow-hidden group"
              >
                
                {/* Story Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  {story.thumbnail ? (
                    <img
                      src={process.env.REACT_APP_API_IMAGE_URL + "story_thumbnail/" + story.thumbnail}
                      alt="Story Thumbnail"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-r ${getRandomGradient(index)} flex items-center justify-center`}>
                      <FiVideo className="text-white text-4xl" />
                    </div>
                  )}
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white bg-opacity-90 rounded-full p-4">
                      <FiPlay className="text-purple-600 text-2xl" />
                    </div>
                  </div>

                  {/* Views Badge */}
                  <div className="absolute top-3 left-3">
                    <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      <FiViews className="text-xs" />
                      <span>{formatViews(story.views || 0)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  
                  {/* Video Link */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-700 text-sm mb-2">Video Link</h3>
                      <div className="flex items-center space-x-1 text-purple-600">
                        <FiExternalLink className="text-xs" />
                        <span className="text-xs font-medium">External</span>
                      </div>
                    </div>
                    <p className="text-gray-900 text-sm line-clamp-2 break-all">
                      {story.video_url}
                    </p>
                  </div>

                  {/* Domain Info */}
                  <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-2 text-sm">
                      <FiVideo className="text-purple-500" />
                      <span className="font-medium text-purple-800">
                        {getDomainFromUrl(story.video_url)}
                      </span>
                    </div>
                  </div>

                  {/* Stats and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <FiViews className="text-xs" />
                        <span>{story.views || 0} views</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => openStoryModal(story)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors duration-200"
                      >
                        <FiEye className="text-sm" />
                      </button>
                      
                      <button
                        onClick={() => openDeleteModal(story)}
                        className="bg-white hover:bg-red-50 text-red-600 border border-red-300 hover:border-red-400 p-2 rounded-lg transition-all duration-200"
                      >
                        <FiTrash2 className="text-sm" />
                      </button>
                    </div>
                  </div>

                  {/* Watch Button */}
                  <div className="mt-4">
                    <Link
                      to={story.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
                    >
                      <FiPlay className="text-sm" />
                      <span>Watch Story</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty Search State */}
          {filteredStories.length === 0 && websitestory?.length > 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="text-yellow-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No stories found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Clear Search
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Story Detail Modal */}
        {showModal && selectedStory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Story Details</h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <FiX className="text-2xl" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Story Thumbnail */}
                <div className="flex justify-center">
                  {selectedStory.thumbnail ? (
                    <img
                      src={process.env.REACT_APP_API_IMAGE_URL + "story_thumbnail/" + selectedStory.thumbnail}
                      alt="Story Thumbnail"
                      className="w-full max-w-md h-48 object-cover rounded-2xl border-4 border-gray-100"
                    />
                  ) : (
                    <div className="w-full max-w-md h-48 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <FiVideo className="text-white text-4xl" />
                    </div>
                  )}
                </div>

                {/* Story Information */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Video URL</h4>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <p className="text-gray-900 text-sm break-all">
                        {selectedStory.video_url}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <FiViews className="text-purple-500" />
                        <span className="font-semibold text-purple-800">Views</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {selectedStory.views || 0}
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <FiVideo className="text-blue-500" />
                        <span className="font-semibold text-blue-800">Source</span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {getDomainFromUrl(selectedStory.video_url)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                <div className="flex space-x-3">
                  <button
                    onClick={closeModal}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-xl font-medium transition-colors duration-200"
                  >
                    Close
                  </button>
                  <Link
                    to={selectedStory.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <FiPlay className="text-sm" />
                    <span>Watch Story</span>
                  </Link>
                  <button
                    onClick={() => {
                      openDeleteModal(selectedStory);
                      closeModal();
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <FiTrash2 className="text-sm" />
                    <span>Delete Story</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && storyToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-slideUp">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                    <FiAlertTriangle className="text-red-500" />
                    <span>Confirm Deletion</span>
                  </h3>
                  <button
                    onClick={closeDeleteModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <FiX className="text-2xl" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiTrash2 className="text-red-500 text-2xl" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Delete Story?
                  </h4>
                  <p className="text-gray-600">
                    Are you sure you want to delete this story? This action cannot be undone.
                  </p>
                </div>

                {/* Story Preview */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                  <div className="flex items-center space-x-3">
                    {storyToDelete.thumbnail && (
                      <img
                        src={process.env.REACT_APP_API_IMAGE_URL + "story_thumbnail/" + storyToDelete.thumbnail}
                        alt="Story Thumbnail"
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">
                        {getDomainFromUrl(storyToDelete.video_url)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatViews(storyToDelete.views || 0)} views
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={closeDeleteModal}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-xl font-medium transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <FiTrash2 className="text-sm" />
                    <span>Yes, Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
          .animate-slideUp {
            animation: slideUp 0.3s ease-out;
          }
        `}</style>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiVideo className="text-purple-600 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Stories Yet</h2>
            <p className="text-gray-600 mb-6">Start sharing engaging video stories with your audience</p>
            <Link
              to="/admin/website_story/add"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center space-x-2 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <FiPlus className="text-lg" />
              <span>Add First Story</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
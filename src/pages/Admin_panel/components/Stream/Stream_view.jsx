import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Context } from '../../../../Context_holder';
import axios from 'axios';
import { 
  FiTrash2, 
  FiEye, 
  FiPlus, 
  FiSearch,
  FiFilter,
  FiBook,
  FiImage,
  FiX,
  FiAlertTriangle,
  FiEdit3,
  FiTrendingUp
} from 'react-icons/fi';

export default function Stream_view() {
  const { stream_fetch, stream, token, notify } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStreams, setFilteredStreams] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStream, setSelectedStream] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [streamToDelete, setStreamToDelete] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    stream_fetch();
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  useEffect(() => {
    if (stream) {
      let filtered = stream.filter(item =>
        item.stream_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      filtered = filtered.sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.stream_name?.localeCompare(b.stream_name);
          case 'newest':
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 'oldest':
            return new Date(a.createdAt) - new Date(b.createdAt);
          default:
            return 0;
        }
      });

      setFilteredStreams(filtered);
    }
  }, [stream, searchTerm, sortBy]);

  const openDeleteModal = (stream) => {
    setStreamToDelete(stream);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setStreamToDelete(null);
  };

  const delete_handler = (id, old_logo) => {
    axios.delete(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_STREAM_URL}delete/${id}/${old_logo}`, {
      headers: { Authorization: token }
    })
    .then((success) => {
      notify(success.data.msg, success.data.status);
      if (success.data.status === 1) {
        stream_fetch();
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      notify('Error deleting stream', 0);
    })
    .finally(() => {
      closeDeleteModal();
    });
  };

  const handleDeleteConfirm = () => {
    if (streamToDelete) {
      delete_handler(streamToDelete._id, streamToDelete.image);
    }
  };

  const openStreamModal = (stream) => {
    setSelectedStream(stream);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStream(null);
  };

  const getRandomGradient = (index) => {
    const gradients = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500',
      'from-teal-500 to-blue-500',
      'from-yellow-500 to-orange-500',
      'from-pink-500 to-rose-500'
    ];
    return gradients[index % gradients.length];
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(word => word[0]).join('').toUpperCase() : 'ST';
  };

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-64 mx-auto animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="bg-white rounded-2xl shadow-sm p-6 animate-pulse">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-300 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Academic Streams
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage and organize all educational streams and disciplines
          </p>
        </div>

        {/* Stats and Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Quick Stats */}
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{filteredStreams.length}</div>
                <div className="text-sm text-gray-500">Showing</div>
              </div>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="text-center">
                <div className="text-xl font-semibold text-gray-700">{stream?.length || 0}</div>
                <div className="text-sm text-gray-500">Total Streams</div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex-1 max-w-2xl">
              <div className="flex flex-col sm:flex-row gap-4">
                
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search streams..."
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
                  <option value="name">Sort by Name</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>

            {/* Add Stream Button */}
            <Link
              to="/admin/stream/add"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <FiPlus className="text-lg" />
              <span>Add Stream</span>
            </Link>
          </div>
        </div>

        {/* Streams Grid */}
        {filteredStreams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStreams.map((data, index) => (
              <div
                key={data._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-purple-300 transition-all duration-300 overflow-hidden group"
              >
                {/* Stream Image/Icon */}
                <div className="relative h-32 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                  {data.image ? (
                    <img
                      src={process.env.REACT_APP_API_IMAGE_URL + "stream_image/" + data.image}
                      alt={data.stream_name}
                      className="w-16 h-16 object-contain rounded-lg"
                    />
                  ) : (
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${getRandomGradient(index)} flex items-center justify-center text-white font-bold text-xl`}>
                      {getInitials(data.stream_name)}
                    </div>
                  )}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-black bg-opacity-50 rounded-full p-1">
                      <FiEye className="text-white text-sm" />
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  {/* Stream Name */}
                  <h3 className="font-bold text-gray-900 text-lg mb-2 truncate group-hover:text-purple-600 transition-colors">
                    {data.stream_name}
                  </h3>

                  {/* Stream Info */}
                  <div className="flex items-center space-x-2 text-gray-500 mb-4">
                    <FiBook className="text-sm" />
                    <span className="text-sm">Academic Stream</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openStreamModal(data)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-1 text-sm"
                    >
                      <FiEye className="text-xs" />
                      <span>View</span>
                    </button>
              w
                    
                    <button
                      onClick={() => openDeleteModal(data)}
                      className="flex-1 bg-white hover:bg-red-50 text-red-600 border border-red-300 hover:border-red-400 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-1 text-sm"
                    >
                      <FiTrash2 className="text-xs" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiBook className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {stream?.length > 0 ? 'No streams found' : 'No streams yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {stream?.length > 0 
                  ? 'Try adjusting your search criteria'
                  : 'Get started by creating your first academic stream'
                }
              </p>
              {stream?.length > 0 ? (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Clear Search
                </button>
              ) : (
                <Link
                  to="/admin/stream/add"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center space-x-2"
                >
                  <FiPlus className="text-lg" />
                  <span>Create First Stream</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Stream Detail Modal */}
      {showModal && selectedStream && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-slideUp">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Stream Details</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <FiX className="text-2xl" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Stream Image */}
              <div className="flex justify-center">
                {selectedStream.image ? (
                  <img
                    src={process.env.REACT_APP_API_IMAGE_URL + "stream_image/" + selectedStream.image}
                    alt={selectedStream.stream_name}
                    className="w-32 h-32 object-contain rounded-2xl border-4 border-gray-100"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-2xl">
                    {getInitials(selectedStream.stream_name)}
                  </div>
                )}
              </div>

              {/* Stream Information */}
              <div className="text-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedStream.stream_name}
                </h4>
                <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  <FiBook className="text-xs" />
                  <span>Academic Stream</span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-gray-700">Stream ID</div>
                    <div className="text-gray-600 truncate">{selectedStream._id}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-700">Status</div>
                    <div className="text-green-600 font-medium">Active</div>
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
                <button
                  onClick={() => {
                    openDeleteModal(selectedStream);
                    closeModal();
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <FiTrash2 className="text-sm" />
                  <span>Delete Stream</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && streamToDelete && (
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
                  Delete Stream?
                </h4>
                <p className="text-gray-600">
                  Are you sure you want to delete <strong>"{streamToDelete.stream_name}"</strong>? This action cannot be undone.
                </p>
              </div>

              {/* Stream Preview */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                <div className="flex items-center space-x-3">
                  {streamToDelete.image ? (
                    <img
                      src={process.env.REACT_APP_API_IMAGE_URL + "stream_image/" + streamToDelete.image}
                      alt={streamToDelete.stream_name}
                      className="w-12 h-12 object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {getInitials(streamToDelete.stream_name)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {streamToDelete.stream_name}
                    </p>
                    <p className="text-xs text-gray-500">Academic Stream</p>
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
}
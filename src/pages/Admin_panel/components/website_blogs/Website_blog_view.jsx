import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../Context_holder';
import { Link } from 'react-router-dom';
import { 
  FiTrash2, 
  FiEye, 
  FiEdit3, 
  FiPlus, 
  FiSearch,
  FiFilter,
  FiUser,
  FiCalendar,
  FiBook,
  FiX,
  FiAlertTriangle,
  FiClock,
  FiTrendingUp
} from 'react-icons/fi';

export default function Website_blog_view() {
  const { website_blog_fetch, website_blog, token, notify } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    website_blog_fetch();
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  useEffect(() => {
    if (website_blog) {
      let filtered = website_blog.filter(blog =>
        blog.heading?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      filtered = filtered.sort((a, b) => {
        switch (sortBy) {
          case 'newest':
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 'oldest':
            return new Date(a.createdAt) - new Date(b.createdAt);
          case 'title':
            return a.heading?.localeCompare(b.heading);
          case 'author':
            return a.author?.localeCompare(b.author);
          default:
            return 0;
        }
      });

      setFilteredBlogs(filtered);
    }
  }, [website_blog, searchTerm, sortBy]);

  const openDeleteModal = (blog) => {
    setBlogToDelete(blog);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setBlogToDelete(null);
  };

  const delete_handler = (id, logo) => {
    axios.delete(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_WEBSITE_BLOG_URL}delete/${id}/${logo}`, {
      headers: { Authorization: token }
    })
    .then((success) => {
      notify(success.data.msg, success.data.status);
      if (success.data.status === 1) {
        website_blog_fetch();
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      notify('Error deleting blog', 0);
    })
    .finally(() => {
      closeDeleteModal();
    });
  };

  const handleDeleteConfirm = () => {
    if (blogToDelete) {
      delete_handler(blogToDelete._id, blogToDelete.logo);
    }
  };

  const openBlogModal = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBlog(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text, length = 120) => {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  const getRandomGradient = (index) => {
    const gradients = [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-blue-500',
      'from-teal-500 to-green-500'
    ];
    return gradients[index % gradients.length];
  };

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8 px-4 sm:px-6 lg:px-8">
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

  if (website_blog?.length !== 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Website Blogs
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Manage and publish engaging content for your website
            </p>
          </div>

          {/* Stats and Controls */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              
              {/* Quick Stats */}
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{filteredBlogs.length}</div>
                  <div className="text-sm text-gray-500">Showing</div>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-xl font-semibold text-gray-700">{website_blog?.length || 0}</div>
                  <div className="text-sm text-gray-500">Total Blogs</div>
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
                      placeholder="Search blogs, authors, or content..."
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Sort Dropdown */}
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer min-w-40"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="title">By Title</option>
                    <option value="author">By Author</option>
                  </select>
                </div>
              </div>

              {/* Add Blog Button */}
              <Link
                to="/admin/website_blog/add"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <FiPlus className="text-lg" />
                <span>Write Blog</span>
              </Link>
            </div>
          </div>

          {/* Blogs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog, index) => (
              <div
                key={blog._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 overflow-hidden group"
              >
                
                {/* Blog Image */}
                <div className="relative h-48 overflow-hidden">
                  {blog.logo ? (
                    <img
                      src={process.env.REACT_APP_API_IMAGE_URL + "website_blog_image/" + blog.logo}
                      alt={blog.heading}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-r ${getRandomGradient(index)} flex items-center justify-center`}>
                      <FiBook className="text-white text-4xl" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="bg-black bg-opacity-50 rounded-full p-2">
                      <FiEye className="text-white text-sm" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  
                  {/* Blog Title */}
                  <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {blog.heading}
                  </h3>

                  {/* Blog Excerpt */}
                  {blog.content && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {truncateText(blog.content, 120)}
                    </p>
                  )}

                  {/* Author and Date */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <FiUser className="text-gray-400" />
                      <span>{blog.author || 'Unknown Author'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiCalendar className="text-gray-400" />
                      <span>{blog.createdAt ? formatDate(blog.createdAt) : 'Unknown Date'}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openBlogModal(blog)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-1 text-sm"
                    >
                      <FiEye className="text-xs" />
                      <span>View</span>
                    </button>
                    
                    <Link
                      to={`/admin/website_blog/edit/${blog._id}`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-1 text-sm"
                    >
                      <FiEdit3 className="text-xs" />
                      <span>Edit</span>
                    </Link>
                    
                    <button
                      onClick={() => openDeleteModal(blog)}
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

          {/* Empty Search State */}
          {filteredBlogs.length === 0 && website_blog?.length > 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="text-yellow-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No blogs found</h3>
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

        {/* Blog Detail Modal */}
        {showModal && selectedBlog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Blog Details</h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <FiX className="text-2xl" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Blog Image */}
                <div className="flex justify-center">
                  {selectedBlog.logo ? (
                    <img
                      src={process.env.REACT_APP_API_IMAGE_URL + "website_blog_image/" + selectedBlog.logo}
                      alt={selectedBlog.heading}
                      className="w-full max-w-2xl h-64 object-cover rounded-2xl border-4 border-gray-100"
                    />
                  ) : (
                    <div className="w-full max-w-2xl h-64 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                      <FiBook className="text-white text-6xl" />
                    </div>
                  )}
                </div>

                {/* Blog Information */}
                <div className="text-center">
                  <h4 className="text-3xl font-bold text-gray-900 mb-4">
                    {selectedBlog.heading}
                  </h4>
                  
                  <div className="flex items-center justify-center space-x-6 text-gray-600 mb-6">
                    <div className="flex items-center space-x-2">
                      <FiUser className="text-gray-400" />
                      <span className="font-medium">{selectedBlog.author || 'Unknown Author'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiCalendar className="text-gray-400" />
                      <span>{selectedBlog.createdAt ? formatDate(selectedBlog.createdAt) : 'Unknown Date'}</span>
                    </div>
                  </div>
                </div>

                {/* Blog Content */}
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3 text-lg">Content</h5>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedBlog.content || 'No content available.'}
                    </p>
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
                    to={`/admin/website_blog/edit/${selectedBlog._id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <FiEdit3 className="text-sm" />
                    <span>Edit Blog</span>
                  </Link>
                  <button
                    onClick={() => {
                      openDeleteModal(selectedBlog);
                      closeModal();
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <FiTrash2 className="text-sm" />
                    <span>Delete Blog</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && blogToDelete && (
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
                    Delete Blog?
                  </h4>
                  <p className="text-gray-600">
                    Are you sure you want to delete <strong>"{blogToDelete.heading}"</strong>? This action cannot be undone.
                  </p>
                </div>

                {/* Blog Preview */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                  <div className="flex items-center space-x-3">
                    {blogToDelete.logo && (
                      <img
                        src={process.env.REACT_APP_API_IMAGE_URL + "website_blog_image/" + blogToDelete.logo}
                        alt={blogToDelete.heading}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">
                        {blogToDelete.heading}
                      </p>
                      <p className="text-xs text-gray-500">
                        By {blogToDelete.author || 'Unknown Author'}
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
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiBook className="text-blue-600 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Blogs Yet</h2>
            <p className="text-gray-600 mb-6">Start creating engaging content for your website</p>
            <Link
              to="/admin/website_blog/add"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center space-x-2 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <FiPlus className="text-lg" />
              <span>Write First Blog</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
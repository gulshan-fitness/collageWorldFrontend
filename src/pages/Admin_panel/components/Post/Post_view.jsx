import axios from 'axios';
import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Context } from '../../../../Context_holder';
import { Link } from 'react-router-dom';
import { 
  FiEdit, 
  FiTrash2, 
  FiExternalLink, 
  FiPlus, 
  FiSearch,
  FiCalendar,
  FiBook,
  FiUser,
  FiImage,
  FiFilter,
  FiX,
  FiChevronDown,
  FiAlertTriangle,
  FiMessageSquare,
  FiClock,
  FiHash
} from 'react-icons/fi';

export default function Post_view() {
  const { posts_fetch, post, token, notify, admin } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [dateRange, setDateRange] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Move filterByDateRange function before useMemo
  const filterByDateRange = (postItem, range) => {
    if (range === 'all') return true;
    
    const postDate = new Date(postItem.createdAt || postItem.updatedAt);
    const now = new Date();
    const diffTime = now - postDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    switch (range) {
      case 'today':
        return diffDays < 1;
      case 'week':
        return diffDays < 7;
      case 'month':
        return diffDays < 30;
      case 'year':
        return diffDays < 365;
      default:
        return true;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!admin) return;

      if (admin?.role === "subadmin" && admin?.collage_id) {
        await posts_fetch(null, admin?.collage_id);
      } else if (admin?.role === "superadmin") {
        await posts_fetch(null, null);
      }
      
      setTimeout(() => setIsLoading(false), 800);
    };

    fetchData();
  }, [admin]);

  // Get unique values for filters
  const uniqueColleges = useMemo(() => {
    return [...new Set(post?.map(p => p.college_id?._id))].map(collegeId => {
      const college = post.find(p => p.college_id?._id === collegeId)?.college_id;
      return { id: collegeId, name: college?.college_name };
    });
  }, [post]);

  const uniqueAuthors = useMemo(() => {
    return [...new Set(post?.map(p => p.author).filter(Boolean))];
  }, [post]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    if (!post?.length) return [];

    let filtered = post.filter(postItem => {
      // Search term filter
      const matchesSearch = 
        postItem?.heading?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        postItem?.author?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        postItem?.college_id?.college_name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        postItem?.post?.replace(/<[^>]*>/g, '')?.toLowerCase()?.includes(searchTerm.toLowerCase());

      // College filter
      const matchesCollege = selectedCollege === 'all' || postItem?.college_id?._id === selectedCollege;

      // Author filter
      const matchesAuthor = selectedAuthor === 'all' || postItem?.author === selectedAuthor;

      // Date range filter
      const matchesDate = filterByDateRange(postItem, dateRange);

      return matchesSearch && matchesCollege && matchesAuthor && matchesDate;
    });

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.createdAt || b.updatedAt) - new Date(a.createdAt || a.updatedAt);
        case 'oldest':
          return new Date(a.createdAt || a.updatedAt) - new Date(b.createdAt || b.updatedAt);
        case 'title':
          return a.heading?.localeCompare(b.heading);
        case 'college':
          return a.college_id?.college_name?.localeCompare(b.college_id?.college_name);
        case 'author':
          return a.author?.localeCompare(b.author);
        default:
          return 0;
      }
    });

    return filtered;
  }, [post, searchTerm, selectedCollege, selectedAuthor, sortBy, dateRange]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCollege('all');
    setSelectedAuthor('all');
    setSortBy('recent');
    setDateRange('all');
  };

  const hasActiveFilters = searchTerm || selectedCollege !== 'all' || selectedAuthor !== 'all' || dateRange !== 'all';

  const delete_handler = (post) => {
    setPostToDelete(post);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_POST_URL}delete/${postToDelete._id}/${postToDelete.logo}`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      notify(response.data.msg, response.data.status);

      if (response.data.status === 1) {
        if (!admin) return;

        if (admin?.role === "subadmin" && admin?.collage_id) {
          await posts_fetch(null, admin?.collage_id);
        } else if (admin?.role === "superadmin") {
          await posts_fetch(null, null);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      notify('Failed to delete post', 0);
    } finally {
      setShowDeletePopup(false);
      setPostToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setPostToDelete(null);
  };

  const getCollegeColor = (collegeId) => {
    const colors = [
      'bg-gradient-to-r from-blue-400 to-cyan-500',
      'bg-gradient-to-r from-purple-400 to-indigo-500',
      'bg-gradient-to-r from-green-400 to-emerald-500',
      'bg-gradient-to-r from-orange-400 to-red-500',
      'bg-gradient-to-r from-pink-400 to-rose-500',
      'bg-gradient-to-r from-teal-400 to-blue-500'
    ];
    const index = collegeId?.split('')?.reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index] || 'bg-gradient-to-r from-gray-400 to-gray-500';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getContentPreview = (htmlContent) => {
    const text = htmlContent?.replace(/<[^>]*>/g, '') || 'No content available';
    return text.length > 120 ? text.substring(0, 120) + '...' : text;
  };

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-gray-50 rounded-xl p-6 animate-pulse">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (post?.length !== 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Posts Management
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Manage and organize all your college announcements and news posts
            </p>
          </div>

         {/* Stats and Controls Card */}
<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
  {/* Stats Row */}
  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
    
    {/* Quick Stats */}
    <div className="w-full flex flex-wrap justify-between sm:justify-start sm:space-x-6">
      <div className="flex-1 sm:flex-none text-center min-w-[80px]">
        <div className="text-2xl font-bold text-blue-600">{filteredPosts.length}</div>
        <div className="text-sm text-gray-500">Showing</div>
      </div>

      <div className="hidden sm:block h-8 w-px bg-gray-300"></div>

      <div className="flex-1 sm:flex-none text-center min-w-[80px] mt-4 sm:mt-0">
        <div className="text-xl font-semibold text-gray-700">{post?.length || 0}</div>
        <div className="text-sm text-gray-500">Total Posts</div>
      </div>

      <div className="hidden sm:block h-8 w-px bg-gray-300"></div>

      <div className="flex-1 sm:flex-none text-center min-w-[80px] mt-4 sm:mt-0">
        <div className="text-xl font-semibold text-gray-700">{uniqueColleges.length}</div>
        <div className="text-sm text-gray-500">Colleges</div>
      </div>

      <div className="hidden sm:block h-8 w-px bg-gray-300"></div>

      <div className="flex-1 sm:flex-none text-center min-w-[80px] mt-4 sm:mt-0">
        <div className="text-xl font-semibold text-gray-700">{uniqueAuthors.length}</div>
        <div className="text-sm text-gray-500">Authors</div>
      </div>
    </div>

    {/* Add Button */}
    <div className="w-full lg:w-auto">
      <Link
        to="/admin/post/add"
        className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        <FiPlus className="text-lg" />
        <span>Create Post</span>
      </Link>
    </div>
  </div>

  {/* Search and Filter Bar */}
  <div className="mt-6">
    <div className="flex flex-col lg:flex-row gap-4">
      
      {/* Search Bar */}
      <div className="flex-1 relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search posts by title, author, college, or content..."
          className="w-full pl-10 pr-10 py-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <FiX className="text-lg" />
          </button>
        )}
      </div>

      {/* Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="lg:w-40 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-4 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors duration-200"
      >
        <FiFilter className="text-lg" />
        <span className="hidden sm:inline">Filters</span>
        <FiChevronDown className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
      </button>

      {/* Sort Dropdown */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="lg:w-48 px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer text-sm"
      >
        <option value="recent">Most Recent</option>
        <option value="oldest">Oldest First</option>
        <option value="title">Title A-Z</option>
        <option value="college">College Name</option>
        <option value="author">Author Name</option>
      </select>
    </div>

    {/* Advanced Filters */}
    {showFilters && (
      <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* College Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by College</label>
            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="all">All Colleges</option>
              {uniqueColleges.map((college) => (
                <option key={college.id} value={college.id}>
                  {college.name}
                </option>
              ))}
            </select>
          </div>

          {/* Author Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Author</label>
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="all">All Authors</option>
              {uniqueAuthors.map((author) => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
              <option value="year">Past Year</option>
            </select>
          </div>
        </div>

        {/* Active Filters & Clear Button */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>

              {searchTerm && (
                <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="ml-1 text-blue-600 hover:text-blue-800">
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedCollege !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  College: {uniqueColleges.find(c => c.id === selectedCollege)?.name}
                  <button onClick={() => setSelectedCollege('all')} className="ml-1 text-green-600 hover:text-green-800">
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedAuthor !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                  Author: {selectedAuthor}
                  <button onClick={() => setSelectedAuthor('all')} className="ml-1 text-purple-600 hover:text-purple-800">
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}

              {dateRange !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                  Date: {dateRange}
                  <button onClick={() => setDateRange('all')} className="ml-1 text-orange-600 hover:text-orange-800">
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>

            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-600 hover:text-gray-800 underline self-start sm:self-auto"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    )}
  </div>
</div>


          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredPosts.length} of {post?.length || 0} posts
              {hasActiveFilters && ' (filtered)'}
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPosts.map((postItem, index) => (
              <div
                key={postItem?._id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 overflow-hidden"
              >
                
                {/* Post Header with College Color */}
                <div className={`h-3 ${getCollegeColor(postItem?.college_id?._id)}`}></div>
                
                <div className="p-6">
                  
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={process.env.REACT_APP_API_IMAGE_URL + "Post_image/" + postItem?.logo}
                        alt="Post"
                        className="w-14 h-14 rounded-lg border-2 border-white shadow-md object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {postItem?.heading}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCollegeColor(postItem?.college_id?._id)} text-white`}>
                            {postItem?.college_id?.college_name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Post Details */}
                  <div className="space-y-3 mb-6">
                    
                    {/* Author and Date */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <FiUser className="text-blue-500 flex-shrink-0" />
                        <span className="font-medium truncate">{postItem?.author}</span>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <FiClock className="text-gray-400" />
                        <span>{formatDate(postItem?.createdAt)}</span>
                      </div>
                    </div>

                    {/* Content Preview */}
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <FiMessageSquare className="text-green-500 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700">Content Preview</span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {getContentPreview(postItem?.post)}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Link
                      to={`/admin/post/edit/${postItem?._id}`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2.5 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <FiEdit className="text-sm flex-shrink-0" />
                      <span>Edit</span>
                    </Link>
                    
                    <button
                      onClick={() => delete_handler(postItem)}
                      className="flex-1 bg-white hover:bg-red-50 text-red-600 border border-red-300 hover:border-red-400 text-center py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <FiTrash2 className="text-sm flex-shrink-0" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty Search State */}
          {filteredPosts.length === 0 && post?.length > 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="text-yellow-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No posts found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
                <button 
                  onClick={clearAllFilters}
                  className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}

          {/* Delete Confirmation Popup */}
          {showDeletePopup && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300">
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 border border-gray-200">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <FiAlertTriangle className="text-red-600 text-2xl" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-4">Confirm Deletion</h3>
                <p className="text-gray-600 text-center mb-6">
                  Are you sure you want to delete this post? This action cannot be undone.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={cancelDelete}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-semibold transition-all duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiMessageSquare className="text-blue-600 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Posts Yet</h2>
            <p className="text-gray-600 mb-6">Start by creating your first announcement or news post</p>
            <Link
              to="/admin/post/add"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center space-x-2 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <FiPlus className="text-lg" />
              <span>Create First Post</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../../../../Context_holder';
import { 
  FiTrash2, 
  FiExternalLink, 
  FiSearch,
  FiFilter,
  FiPlay,
  FiYoutube,
  FiCalendar,
  FiUser,
  FiBook,
  FiAlertTriangle,
  FiClock,
  FiMessageSquare
} from 'react-icons/fi';

export default function StoryView() {
  const { story_fetch, story, token, notify, admin } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStories, setFilteredStories] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [isLoading, setIsLoading] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!admin) return;

      if (admin?.role === "subadmin" && admin?.collage_id) {
        await story_fetch(null, admin?.collage_id);
      } else if (admin?.role === "superadmin") {
        await story_fetch(null, null);
      }
      
      setTimeout(() => setIsLoading(false), 800);
    };

    fetchData();
  }, [admin]);

  useEffect(() => {
    if (story?.length > 0) {
      let filtered = story?.filter(storyItem =>
        storyItem?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        storyItem?.college_id?.college_name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );

      if (selectedCollege !== 'all') {
        filtered = filtered?.filter(storyItem => storyItem?.college_id?._id === selectedCollege);
      }

      filtered = filtered?.sort((a, b) => {
        switch (sortBy) {
          case 'recent':
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 'title':
            return a.title?.localeCompare(b.title);
          case 'college':
            return a.college_id?.college_name?.localeCompare(b.college_id?.college_name);
          default:
            return 0;
        }
      });

      setFilteredStories(filtered);
    }
  }, [story, searchTerm, selectedCollege, sortBy]);

  const delete_handler = (story) => {
    setStoryToDelete(story);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    if (!storyToDelete) return;

    try {
      const success = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_STORY_URL}delete/${storyToDelete._id}`,
        {
          headers: { Authorization: token }
        }
      );

      notify(success.data.msg, success.data.status);
      if (success.data.status === 1) {
        if (!admin) return;

        if (admin?.role === "subadmin" && admin?.collage_id) {
          await story_fetch(null, admin?.collage_id);
        } else if (admin?.role === "superadmin") {
          await story_fetch(null, null);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      notify('Failed to delete story', 0);
    } finally {
      setShowDeletePopup(false);
      setStoryToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setStoryToDelete(null);
  };

  const extractVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const getCollegeColor = (collegeId) => {
    const colors = [
      'bg-gradient-to-r from-red-400 to-pink-500',
      'bg-gradient-to-r from-purple-400 to-indigo-500',
      'bg-gradient-to-r from-green-400 to-emerald-500',
      'bg-gradient-to-r from-orange-400 to-red-500',
      'bg-gradient-to-r from-blue-400 to-cyan-500',
      'bg-gradient-to-r from-teal-400 to-blue-500'
    ];
    const index = collegeId?.split('')?.reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index] || 'bg-gradient-to-r from-gray-400 to-gray-500';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
                <div className="h-48 bg-gray-300 rounded-xl mb-4"></div>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
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

  if (story?.length !== 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Student Stories
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Inspiring journeys and success stories from students across colleges
            </p>
          </div>

          {/* Stats and Controls Card */}

       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
    
    {/* Quick Stats */}
    <div className="flex flex-wrap justify-center sm:justify-start items-center gap-6">
      <div className="text-center">
        <div className="text-2xl font-bold text-red-600">{filteredStories?.length}</div>
        <div className="text-sm text-gray-500">Showing</div>
      </div>
      
      <div className="hidden sm:block h-8 w-px bg-gray-300"></div>

      <div className="text-center">
        <div className="text-xl font-semibold text-gray-700">{story?.length || 0}</div>
        <div className="text-sm text-gray-500">Total Stories</div>
      </div>

      <div className="hidden sm:block h-8 w-px bg-gray-300"></div>

      <div className="text-center">
        <div className="text-xl font-semibold text-gray-700">
          {new Set(story?.map(s => s.college_id?._id)).size}
        </div>
        <div className="text-sm text-gray-500">Colleges</div>
      </div>
    </div>

    {/* Search and Filters */}
    <div className="w-full lg:w-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center lg:justify-end">
      
      {/* Search Bar */}
      <div className="relative w-full sm:w-64 lg:w-72">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search stories..."
          className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 w-full sm:w-auto justify-center sm:justify-end">
        <select 
          value={selectedCollege}
          onChange={(e) => setSelectedCollege(e.target.value)}
          className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer w-full sm:w-auto"
        >
          <option value="all">All Colleges</option>
          {[...new Set(story?.map(s => s.college_id?._id))].map(collegeId => {
            const college = story.find(s => s.college_id?._id === collegeId)?.college_id;
            return (
              <option key={collegeId} value={collegeId}>
                {college?.college_name}
              </option>
            );
          })}
        </select>

        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer w-full sm:w-auto"
        >
          <option value="recent">Most Recent</option>
          <option value="title">Title A-Z</option>
          <option value="college">College Name</option>
        </select>
      </div>
    </div>
  </div>
</div>
s

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredStories?.map((storyItem, index) => {
              const videoId = extractVideoId(storyItem.video_url);
              const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;

              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-red-300 transition-all duration-300 overflow-hidden"
                >
                  
                  {/* Story Header with College Color */}
                  <div className={`h-3 ${getCollegeColor(storyItem?.college_id?._id)}`}></div>
                  
                  <div className="p-6">
                    
                    {/* Video Thumbnail */}
                    <div className="relative mb-4 rounded-xl overflow-hidden bg-gray-100">
                      {thumbnailUrl ? (
                        <div className="aspect-video relative">
                          <img
                            src={thumbnailUrl}
                            alt="Video thumbnail"
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                            <button
                              onClick={() => window.open(storyItem.video_url, '_blank')}
                              className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-2xl"
                            >
                              <FiPlay className="w-6 h-6 text-white ml-1" />
                            </button>
                          </div>
                          <div className="absolute top-3 right-3">
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center">
                              <FiYoutube className="w-3 h-3 mr-1" />
                              YouTube
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <div className="text-center">
                            <FiYoutube className="w-12 h-12 text-gray-400 mb-2 mx-auto" />
                            <p className="text-gray-500 text-sm">Video Preview</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Story Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-2">
                          {storyItem?.title || 'Student Success Story'}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCollegeColor(storyItem?.college_id?._id)} text-white`}>
                            {storyItem?.college_id?.college_name}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Story Details */}
                    <div className="space-y-3 mb-6">
                      
                      {/* Date */}
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <FiCalendar className="text-red-500" />
                          <span>Added {formatDate(storyItem?.createdAt)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FiClock className="text-gray-400" />
                          <span>Video Story</span>
                        </div>
                      </div>

                      {/* YouTube Link Preview */}
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <FiExternalLink className="text-red-500" />
                          <span className="text-sm font-medium text-gray-700">YouTube Link</span>
                        </div>
                        <p className="text-xs text-gray-600 truncate font-mono">
                          {storyItem.video_url}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <button
                        onClick={() => window.open(storyItem.video_url, '_blank')}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white text-center py-2.5 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <FiPlay className="text-sm" />
                        <span>Watch</span>
                      </button>
                      
                      <button
                        onClick={() => delete_handler(storyItem)}
                        className="flex-1 bg-white hover:bg-red-50 text-red-600 border border-red-300 hover:border-red-400 text-center py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <FiTrash2 className="text-sm" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty Search State */}
          {filteredStories?.length === 0 && story?.length > 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="text-yellow-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No stories found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedCollege('all'); }}
                  className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}

          {/* Delete Confirmation Popup */}
          <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ${showDeletePopup ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 border border-gray-200">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <FiAlertTriangle className="text-red-600 text-2xl" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-4">Confirm Deletion</h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete this student story? This action cannot be undone.
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
                  Delete Story
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiYoutube className="text-red-600 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Stories Yet</h2>
            <p className="text-gray-600 mb-6">Start by adding inspiring student success stories and experiences</p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>• Share YouTube video links</p>
              <p>• Add compelling titles</p>
              <p>• Organize by college</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
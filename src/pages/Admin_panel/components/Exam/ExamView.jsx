import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../../Context_holder";
import axios from "axios";
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiAward,
  FiGlobe,
  FiDownload,
  FiAlertTriangle,
  FiClock,
  FiBook,
  FiEye,
  FiChevronDown,
  FiX
} from "react-icons/fi";

export default function ExamView() {
  const { token, notify, Examfetch, exam } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExams, setFilteredExams] = useState([]);
  const [selectedMode, setSelectedMode] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);

  // Delete handler
  const delete_handler = (exam) => {
    setExamToDelete(exam);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    if (!examToDelete) return;

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_EXAM_URL}delete/${examToDelete._id}/${examToDelete.logo}/${examToDelete.PreviousPapper}`,
        {
          headers: { Authorization: token },
        }
      );

      notify(response.data.msg, response.data.status);
      if (response.data.status === 1) Examfetch();
    } catch (error) {
      console.error('Error:', error);
      notify('Failed to delete exam', 0);
    } finally {
      setShowDeletePopup(false);
      setExamToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setExamToDelete(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Examfetch();
      setTimeout(() => setIsLoading(false), 800);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (exam?.length > 0) {
      let filtered = exam?.filter(examItem =>
        examItem?.FullName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        examItem?.ShortName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );

      // Apply mode filter
      if (selectedMode !== 'all') {
        filtered = filtered?.filter(examItem => examItem?.Mode === selectedMode);
      }

      setFilteredExams(filtered);
    }
  }, [exam, searchTerm, selectedMode]);

  const getExamColor = (examId) => {
    const colors = [
      'bg-gradient-to-r from-blue-500 to-cyan-600',
      'bg-gradient-to-r from-purple-500 to-indigo-600',
      'bg-gradient-to-r from-green-500 to-emerald-600',
      'bg-gradient-to-r from-orange-500 to-red-600',
      'bg-gradient-to-r from-pink-500 to-rose-600',
      'bg-gradient-to-r from-teal-500 to-blue-600'
    ];
    const index = examId?.split('')?.reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index] || 'bg-gradient-to-r from-gray-500 to-gray-600';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedMode('all');
  };

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          
          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 animate-pulse">
                <div className="h-3 bg-gray-300 rounded mb-4"></div>
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

  if (exam?.length !== 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Exams Management
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Manage and organize all your competitive exams and entrance tests
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FiBook className="text-blue-600 text-xl sm:text-2xl" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">{exam?.length || 0}</div>
                  <div className="text-xs sm:text-sm text-gray-500">Total Exams</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <FiGlobe className="text-green-600 text-xl sm:text-2xl" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">
                    {exam?.filter(e => e.Mode === 'online exam').length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">Online Exams</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <FiGlobe className="text-orange-600 text-xl sm:text-2xl" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">
                    {exam?.filter(e => e.Mode === 'offline exam').length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">Offline Exams</div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
              
              {/* Quick Stats */}
              <div className="flex items-center space-x-4 sm:space-x-8">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600">{filteredExams?.length}</div>
                  <div className="text-xs sm:text-sm text-gray-500">Showing</div>
                </div>
                <div className="h-6 sm:h-8 w-px bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl font-semibold text-gray-700">{exam?.length || 0}</div>
                  <div className="text-xs sm:text-sm text-gray-500">Total Exams</div>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="flex-1 w-full max-w-2xl">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  
                  {/* Search Bar */}
                  <div className="flex-1 relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                    <input
                      type="text"
                      placeholder="Search exams by name..."
                      className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Mode Filter */}
                  <select
                    value={selectedMode}
                    onChange={(e) => setSelectedMode(e.target.value)}
                    className="w-full sm:w-auto px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer text-sm sm:text-base"
                  >
                    <option value="all">All Modes</option>
                    <option value="online exam">Online Exams</option>
                    <option value="offline exam">Offline Exams</option>
                  </select>

                  {/* Clear Filters Button */}
                  {(searchTerm || selectedMode !== 'all') && (
                    <button
                      onClick={clearFilters}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded-xl transition-colors duration-200 text-sm sm:text-base"
                    >
                      <FiX className="text-xs sm:text-sm" />
                      <span>Clear</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Add Button */}
              <Link
                to="/admin/exam/add"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                <FiPlus className="text-sm sm:text-lg" />
                <span>Add Exam</span>
              </Link>
            </div>
          </div>

          {/* Exams Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredExams?.map((examItem, index) => (
              <div
                key={examItem?._id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 overflow-hidden"
              >
                
                {/* Exam Header with Color */}
                <div className={`h-2 sm:h-3 ${getExamColor(examItem?._id)}`}></div>
                
                <div className="p-4 sm:p-6">
                  
                  {/* Exam Header */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      {examItem?.logo ? (
                        <img
                          src={`${process.env.REACT_APP_API_IMAGE_URL}exam_image/${examItem?.logo}`}
                          alt={examItem?.FullName}
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg border-2 border-white shadow-md object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-100 rounded-lg border-2 border-white shadow-md flex items-center justify-center">
                          <FiBook className="text-gray-400 text-lg sm:text-xl" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 break-words">
                          {examItem?.FullName}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1 flex-wrap gap-1">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium whitespace-nowrap">
                            {examItem?.ShortName}
                          </span>
                          {examItem?.topExam && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium flex items-center gap-1 whitespace-nowrap">
                              <FiAward className="text-xs" />
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Exam Details */}
                  <div className="space-y-3 mb-4 sm:mb-6">
                    
                    {/* Mode and Year */}
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <FiGlobe className={`${examItem?.Mode === 'online exam' ? 'text-green-500' : 'text-orange-500'} text-sm sm:text-base`} />
                        <span className="font-medium capitalize">{examItem?.Mode}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FiCalendar className="text-gray-400 text-sm sm:text-base" />
                        <span>{examItem?.year}</span>
                      </div>
                    </div>

                    {/* Application Dates */}
                    <div className="p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-2 mb-1 sm:mb-2">
                        <FiClock className="text-blue-500 text-sm sm:text-base" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700">Application Period</span>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div className="break-words">From: {formatDate(examItem?.Application_FormDate?.from)}</div>
                        <div className="break-words">To: {formatDate(examItem?.Application_FormDate?.to)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons - Optimized for Mobile */}
                  <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                    {/* Edit Button */}
                    <Link
                      to={`/admin/exam/edit/${examItem?._id}`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2.5 px-3 sm:px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-[44px] text-sm sm:text-base"
                      aria-label={`Edit ${examItem?.FullName} exam`}
                      title="Edit this exam"
                    >
                      <FiEdit className="text-xs sm:text-sm flex-shrink-0" />
                      <span className="truncate">Edit</span>
                    </Link>

                    {/* Delete Button */}
                    <button
                      onClick={() => delete_handler(examItem)}
                      disabled={showDeletePopup}
                      className={`flex-1 bg-white text-red-600 border border-red-300 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 py-2.5 px-3 sm:px-4 min-h-[44px] text-sm sm:text-base
                        ${showDeletePopup ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-50 hover:border-red-400'}`}
                      aria-label={`Delete ${examItem?.FullName} exam`}
                      title="Delete this exam"
                      aria-disabled={showDeletePopup}
                    >
                      <FiTrash2 className="text-xs sm:text-sm flex-shrink-0" />
                      <span className="truncate">Delete</span>
                    </button>

                    {/* PDF Button */}
                    {examItem?.PreviousPapper && (
                      <a
                        href={`${process.env.REACT_APP_API_IMAGE_URL}exam_PreviousPapper/${examItem?.PreviousPapper}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2.5 px-3 sm:px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 min-h-[44px] text-sm sm:text-base"
                        aria-label={`Download previous paper for ${examItem?.FullName}`}
                        title="Download previous year paper"
                        download
                      >
                        <FiDownload className="text-xs sm:text-sm flex-shrink-0" />
                        <span className="truncate">PDF</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty Search State */}
          {filteredExams?.length === 0 && exam?.length > 0 && (
            <div className="text-center py-12 sm:py-16">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-12 max-w-md mx-auto">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="text-yellow-600 text-xl sm:text-2xl" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No exams found</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-6">Try adjusting your search or filters</p>
                <button 
                  onClick={clearFilters}
                  className="bg-gray-900 hover:bg-black text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors duration-200 text-sm sm:text-base"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}

          {/* Delete Confirmation Popup */}
          <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ${showDeletePopup ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md mx-4 border border-gray-200">
              <div className="flex items-center justify-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <FiAlertTriangle className="text-red-600 text-xl sm:text-2xl" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-center mb-3 sm:mb-4">Confirm Deletion</h3>
              <p className="text-gray-600 text-center text-sm sm:text-base mb-4 sm:mb-6">
                Are you sure you want to delete <strong>{examToDelete?.FullName}</strong>? This action cannot be undone.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={cancelDelete}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <FiBook className="text-blue-600 text-2xl sm:text-3xl" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">No Exams Yet</h2>
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">Start by creating your first competitive exam</p>
            <Link
              to="/admin/exam/add"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold inline-flex items-center justify-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg w-full text-sm sm:text-base"
            >
              <FiPlus className="text-sm sm:text-lg" />
              <span>Create First Exam</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
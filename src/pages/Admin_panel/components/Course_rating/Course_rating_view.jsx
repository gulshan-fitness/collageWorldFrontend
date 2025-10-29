import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../Context_holder';
import { Link } from 'react-router-dom';
import { 
  FiStar, 
  FiTrash2, 
  FiEye, 
  FiUsers,
  FiBook,
  FiAward,
  FiSearch,
  FiFilter,
  FiAlertTriangle,
  FiX,
  FiTrendingUp,
  FiMapPin,
  FiCalendar,
  FiDollarSign
} from 'react-icons/fi';

export default function Course_rating_view() {
  const { course_rating_fetch, courserating, notify } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRatings, setFilteredRatings] = useState([]);
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [ratingToDelete, setRatingToDelete] = useState(null);
  const [sortBy, setSortBy] = useState('recent');
  const [selectedRatingDetail, setSelectedRatingDetail] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await course_rating_fetch();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Filter and sort ratings based on your data structure
  useEffect(() => {
    if (courserating) {
      let filtered = courserating.filter(rating =>
        rating.collage_course_id?.Course_id?.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rating.collage_course_id?.college_id?.college_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rating.rating?.toString().includes(searchTerm)
      );

      // Filter by rating range
      if (selectedRating !== 'all') {
        filtered = filtered.filter(rating => {
          const ratingValue = rating.rating;
          switch (selectedRating) {
            case 'excellent': return ratingValue >= 4;
            case 'good': return ratingValue >= 3 && ratingValue < 4;
            case 'average': return ratingValue >= 2 && ratingValue < 3;
            case 'poor': return ratingValue < 2;
            default: return true;
          }
        });
      }

      // Filter by college
      if (selectedCollege !== 'all') {
        filtered = filtered.filter(rating => 
          rating.collage_course_id?.college_id?._id === selectedCollege
        );
      }

      // Filter by course
      if (selectedCourse !== 'all') {
        filtered = filtered.filter(rating => 
          rating.collage_course_id?.Course_id?._id === selectedCourse
        );
      }

      // Sort ratings
      filtered = filtered.sort((a, b) => {
        switch (sortBy) {
          case 'recent':
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 'rating':
            return b.rating - a.rating;
          case 'course':
            return a.collage_course_id?.Course_id?.courseName?.localeCompare(b.collage_course_id?.Course_id?.courseName);
          case 'college':
            return a.collage_course_id?.college_id?.college_name?.localeCompare(b.collage_course_id?.college_id?.college_name);
          case 'fees':
            return (a.collage_course_id?.fees || 0) - (b.collage_course_id?.fees || 0);
          default:
            return 0;
        }
      });

      setFilteredRatings(filtered);
    }
  }, [courserating, searchTerm, selectedRating, selectedCollege, selectedCourse, sortBy]);

  const delete_handler = (rating) => {
    setRatingToDelete(rating);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    if (!ratingToDelete) return;

    try {
      const success = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_COURSE_RATING_URL}delete/${ratingToDelete._id}`
      );

      notify(success.data.msg, success.data.status);

      if (success.data.status === 1) {
        course_rating_fetch();
      }
    } catch (error) {
      console.error('Error:', error);
      notify('Failed to delete rating', 0);
    } finally {
      setShowDeletePopup(false);
      setRatingToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setRatingToDelete(null);
  };

  const showRatingDetails = (rating) => {
    setSelectedRatingDetail(rating);
    setShowDetailModal(true);
  };

  // Get rating color and label
  const getRatingInfo = (rating) => {
    if (rating >= 4) return { 
      label: 'Excellent', 
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200', 
      starColor: 'text-emerald-500',
      bgColor: 'bg-emerald-500'
    };
    if (rating >= 3) return { 
      label: 'Good', 
      color: 'bg-blue-100 text-blue-800 border-blue-200', 
      starColor: 'text-blue-500',
      bgColor: 'bg-blue-500'
    };
    if (rating >= 2) return { 
      label: 'Average', 
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
      starColor: 'text-yellow-500',
      bgColor: 'bg-yellow-500'
    };
    return { 
      label: 'Poor', 
      color: 'bg-red-100 text-red-800 border-red-200', 
      starColor: 'text-red-500',
      bgColor: 'bg-red-500'
    };
  };

  // Calculate statistics based on your data structure
  const stats = {
    total: courserating?.length || 0,
    average: courserating?.reduce((acc, curr) => acc + curr.rating, 0) / courserating?.length || 0,
    excellent: courserating?.filter(r => r.rating >= 4).length || 0,
    good: courserating?.filter(r => r.rating >= 3 && r.rating < 4).length || 0,
    averageCount: courserating?.filter(r => r.rating >= 2 && r.rating < 3).length || 0,
    poor: courserating?.filter(r => r.rating < 2).length || 0,
    totalColleges: new Set(courserating?.map(r => r.collage_course_id?.college_id?._id)).size || 0,
    totalCourses: new Set(courserating?.map(r => r.collage_course_id?.Course_id?._id)).size || 0,
  };

  // Get unique colleges and courses for filters
  const uniqueColleges = [...new Set(courserating?.map(r => r.collage_course_id?.college_id?._id))].map(collegeId => {
    const college = courserating.find(r => r.collage_course_id?.college_id?._id === collegeId)?.collage_course_id?.college_id;
    return { value: collegeId, label: college?.college_name };
  });

  const uniqueCourses = [...new Set(courserating?.map(r => r.collage_course_id?.Course_id?._id))].map(courseId => {
    const course = courserating.find(r => r.collage_course_id?.Course_id?._id === courseId)?.collage_course_id?.Course_id;
    return { value: courseId, label: course?.courseName };
  });

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format duration
  const formatDuration = (years) => {
    if (!years) return 'N/A';
    return `${years} Year${years > 1 ? 's' : ''}`;
  };

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 rounded-xl w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          
          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white/80 rounded-2xl p-6 shadow-lg border border-white/20 animate-pulse">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-xl mr-4"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 animate-pulse">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="h-5 bg-gray-300 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                  <div className="w-12 h-6 bg-gray-300 rounded"></div>
                </div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (courserating?.length !== 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-2xl mb-6">
              <FiStar className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Course Ratings
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Manage and analyze all course ratings across colleges and programs
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                  <FiStar className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total Ratings</div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <FiTrendingUp className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{stats.average.toFixed(1)}</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                  <FiBook className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{stats.totalColleges}</div>
                  <div className="text-sm text-gray-600">Colleges</div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                  <FiAward className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{stats.totalCourses}</div>
                  <div className="text-sm text-gray-600">Courses</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              
              {/* Search Bar */}
              <div className="flex-1 max-w-2xl">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                    <input
                      type="text"
                      placeholder="Search by course, college, or rating..."
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Filter Buttons */}
                  <div className="flex gap-3 flex-wrap">
                    <select 
                      value={selectedRating}
                      onChange={(e) => setSelectedRating(e.target.value)}
                      className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none cursor-pointer min-w-32"
                    >
                      <option value="all">All Ratings</option>
                      <option value="excellent">Excellent (4-5)</option>
                      <option value="good">Good (3-4)</option>
                      <option value="average">Average (2-3)</option>
                      <option value="poor">Poor (0-2)</option>
                    </select>

                    <select 
                      value={selectedCollege}
                      onChange={(e) => setSelectedCollege(e.target.value)}
                      className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none cursor-pointer min-w-40"
                    >
                      <option value="all">All Colleges</option>
                      {uniqueColleges.map(college => (
                        <option key={college.value} value={college.value}>
                          {college.label}
                        </option>
                      ))}
                    </select>

                    <select 
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none cursor-pointer min-w-32"
                    >
                      <option value="all">All Courses</option>
                      {uniqueCourses.map(course => (
                        <option key={course.value} value={course.value}>
                          {course.label}
                        </option>
                      ))}
                    </select>

                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none cursor-pointer"
                    >
                      <option value="recent">Most Recent</option>
                      <option value="rating">Highest Rating</option>
                      <option value="course">Course Name</option>
                      <option value="college">College Name</option>
                      <option value="fees">Course Fees</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="text-sm text-gray-600 whitespace-nowrap">
                Showing {filteredRatings.length} of {courserating?.length} ratings
              </div>
            </div>
          </div>

          {/* Ratings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRatings.map((rating) => {
              const ratingInfo = getRatingInfo(rating.rating);
              const courseData = rating.collage_course_id;
              const collegeData = courseData?.college_id;
              const courseDetails = courseData?.Course_id;
              
              return (
                <div
                  key={rating._id}
                  className="group bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:border-purple-300 transition-all duration-300 overflow-hidden"
                >
                  
                  {/* Rating Header with College Color */}
                  <div className={`px-6 py-4 ${ratingInfo.bgColor}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                          <FiBook className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-sm line-clamp-1">
                            {courseDetails?.courseName || 'Unknown Course'}
                          </h3>
                          <p className="text-white/80 text-xs line-clamp-1">
                            {collegeData?.college_name || 'Unknown College'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    
                    {/* Rating Display */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium border ${ratingInfo.color} flex items-center space-x-1`}>
                          <FiStar className={`w-3 h-3 ${ratingInfo.starColor}`} />
                          <span>{rating.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500">{ratingInfo.label}</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(rating.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    {/* College Info */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                        <FiMapPin className="w-4 h-4 text-purple-500" />
                        <span className="font-medium">College</span>
                      </div>
                      <p className="text-gray-800 font-semibold text-sm line-clamp-1">
                        {collegeData?.college_name || 'N/A'}
                      </p>
                      <p className="text-gray-600 text-xs mt-1">
                        {collegeData?.city}, {collegeData?.state}
                      </p>
                    </div>

                    {/* Course Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="flex items-center space-x-2 text-xs text-gray-600 mb-1">
                          <FiCalendar className="w-3 h-3 text-blue-500" />
                          <span>Duration</span>
                        </div>
                        <p className="text-gray-800 text-sm font-medium">
                          {formatDuration(courseData?.duration)}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 text-xs text-gray-600 mb-1">
                          <FiDollarSign className="w-3 h-3 text-green-500" />
                          <span>Fees</span>
                        </div>
                        <p className="text-gray-800 text-sm font-medium">
                          {formatCurrency(courseData?.fees)}
                        </p>
                      </div>
                    </div>

                    {/* Specializations */}
                    {courseData?.specialisation && courseData.specialisation.length > 0 && (
                      <div className="mb-4">
                        <div className="text-xs text-gray-600 mb-2">Specializations:</div>
                        <div className="flex flex-wrap gap-1">
                          {courseData.specialisation.slice(0, 3).map((spec, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              {spec}
                            </span>
                          ))}
                          {courseData.specialisation.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              +{courseData.specialisation.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <button
                        onClick={() => delete_handler(rating)}
                        className="flex-1 bg-white hover:bg-red-50 text-red-600 border border-red-300 hover:border-red-400 text-center py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-lg"
                      >
                        <FiTrash2 className="text-sm" />
                        <span>Delete</span>
                      </button>
                      
                      <button
                        onClick={() => showRatingDetails(rating)}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-center py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-lg"
                      >
                        <FiEye className="text-sm" />
                        <span>Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty Search State */}
          {filteredRatings.length === 0 && courserating?.length > 0 && (
            <div className="text-center py-16">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-12 max-w-md mx-auto">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="text-yellow-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No ratings found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                <button 
                  onClick={() => { 
                    setSearchTerm(''); 
                    setSelectedRating('all');
                    setSelectedCollege('all');
                    setSelectedCourse('all');
                  }}
                  className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Rating Detail Modal */}
        <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ${showDetailModal ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl mx-4 border border-gray-200 max-h-[90vh] overflow-y-auto">
            {selectedRatingDetail && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Rating Details</h3>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Rating Summary */}
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xl font-bold">{selectedRatingDetail.collage_course_id?.Course_id?.courseName}</h4>
                        <p className="text-purple-100">{selectedRatingDetail.collage_course_id?.college_id?.college_name}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">{selectedRatingDetail.rating}/5</div>
                        <div className="text-purple-100">{getRatingInfo(selectedRatingDetail.rating).label}</div>
                      </div>
                    </div>
                  </div>

                  {/* College Details */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FiMapPin className="w-5 h-5 text-purple-500 mr-2" />
                      College Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">College Name</label>
                        <p className="text-gray-900">{selectedRatingDetail.collage_course_id?.college_id?.college_name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Location</label>
                        <p className="text-gray-900">{selectedRatingDetail.collage_course_id?.college_id?.city}, {selectedRatingDetail.collage_course_id?.college_id?.state}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Type</label>
                        <p className="text-gray-900 capitalize">{selectedRatingDetail.collage_course_id?.college_id?.type}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Established</label>
                        <p className="text-gray-900">{selectedRatingDetail.collage_course_id?.college_id?.estdYear}</p>
                      </div>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <FiBook className="w-5 h-5 text-blue-500 mr-2" />
                      Course Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Course Name</label>
                        <p className="text-gray-900">{selectedRatingDetail.collage_course_id?.Course_id?.courseName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Duration</label>
                        <p className="text-gray-900">{formatDuration(selectedRatingDetail.collage_course_id?.duration)}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Fees</label>
                        <p className="text-gray-900">{formatCurrency(selectedRatingDetail.collage_course_id?.fees)}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Mode</label>
                        <p className="text-gray-900">{selectedRatingDetail.collage_course_id?.mode}</p>
                      </div>
                    </div>
                  </div>

                  {/* Specializations */}
                  {selectedRatingDetail.collage_course_id?.specialisation && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Specializations</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedRatingDetail.collage_course_id.specialisation.map((spec, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Rating Metadata */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Rating Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Rating Date</label>
                        <p className="text-gray-900">{new Date(selectedRatingDetail.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Rating ID</label>
                        <p className="text-gray-900 font-mono text-sm">{selectedRatingDetail._id}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
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
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Delete Rating?</h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete this rating for <strong>"{ratingToDelete?.collage_course_id?.Course_id?.courseName}"</strong> at <strong>"{ratingToDelete?.collage_course_id?.college_id?.college_name}"</strong>? This action cannot be undone.
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
                Delete Rating
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiStar className="text-purple-600 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Ratings Yet</h2>
            <p className="text-gray-600 mb-6">Start by adding your first course rating</p>
            <Link
              to="/admin/course_rating/add"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <FiStar className="text-lg" />
              <span>Add First Rating</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
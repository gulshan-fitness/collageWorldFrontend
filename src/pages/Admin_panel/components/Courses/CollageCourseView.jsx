import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../../../Context_holder';
import axios from 'axios';
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiDollarSign,
  FiBook,
  FiMapPin,
  FiClock,
  FiUsers,
  FiAward,
  FiAlertTriangle,
  FiX,
} from 'react-icons/fi';

export default function CollageCourse_view() {
  const { collage_course_fetch, Collage_course, token, notify, admin } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedMode, setSelectedMode] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isLoading, setIsLoading] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  useEffect(() => {
    if (admin?.role === 'subadmin') {
      collage_course_fetch(null, admin?.collage_id);
    } else {
      collage_course_fetch(null, null);
    }
    setTimeout(() => setIsLoading(false), 800);
  }, [admin]);

  useEffect(() => {
    if (Collage_course?.length > 0) {
      let filtered = Collage_course.filter(
        (course) =>
          course?.college_id?.college_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course?.Course_id?.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course?.specialisation?.some((spec) => spec.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      if (selectedMode !== 'all') {
        filtered = filtered.filter((course) => course?.time?.toLowerCase() === selectedMode);
      }

      filtered = filtered.sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a?.Course_id?.courseName?.localeCompare(b?.Course_id?.courseName);
          case 'duration':
            return b?.duration - a?.duration;
          case 'fees':
            return (b?.fees || 0) - (a?.fees || 0);
          default:
            return 0;
        }
      });

      setFilteredCourses(filtered);
    }
  }, [Collage_course, searchTerm, selectedMode, sortBy]);

  const delete_handler = (id) => {
    setCourseToDelete(id);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    if (!courseToDelete) return;

    axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_COLLAGECOURSE_URL}delete/${courseToDelete}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        if (response.data.status === 1) {
          notify(response.data.msg, response.data.status);
          if (admin?.role === 'subadmin') {
            collage_course_fetch(null, admin?.collage_id);
          } else {
            collage_course_fetch(null, null);
          }
        }
        setShowDeletePopup(false);
        setCourseToDelete(null);
      })
      .catch((error) => {
        notify(error, 0);
        setShowDeletePopup(false);
        setCourseToDelete(null);
      });
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setCourseToDelete(null);
  };

  const getModeColor = (mode) => {
    const colors = {
      'full time': 'bg-green-100 text-green-800 border-green-200',
      'part time': 'bg-blue-100 text-blue-800 border-blue-200',
      'distance': 'bg-purple-100 text-purple-800 border-purple-200',
      'online': 'bg-orange-100 text-orange-800 border-orange-200',
    };
    return colors[mode?.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="h-8 bg-gray-200 rounded-lg w-48 mx-auto mb-3 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg p-4 shadow-sm animate-pulse">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  <div className="flex gap-2 mt-3">
                    <div className="h-8 bg-gray-200 rounded flex-1"></div>
                    <div className="h-8 bg-gray-200 rounded flex-1"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (Collage_course?.length > 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full shadow-md mb-3">
              <FiBook className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">College Courses Management</h1>
            <p className="text-gray-600 text-sm sm:text-base max-w-lg mx-auto">
              Manage and explore all college course offerings
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center">
                  <FiBook className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Total Courses</p>
                  <p className="text-lg font-bold text-gray-900">{Collage_course.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-md flex items-center justify-center">
                  <FiUsers className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Active Colleges</p>
                  <p className="text-lg font-bold text-gray-900">
                    {new Set(Collage_course.map((course) => course?.college_id?._id)).size}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-md flex items-center justify-center">
                  <FiAward className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Unique Programs</p>
                  <p className="text-lg font-bold text-gray-900">
                    {new Set(Collage_course.map((course) => course?.Course_id?._id)).size}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            {/* Header with Actions */}
            <div className="bg-blue-600 px-4 py-4 sm:px-6 sm:py-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">Course Directory</h2>
                  <p className="text-blue-100 text-sm mt-1">Manage all course offerings</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2">
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full sm:w-48 pl-10 pr-3 py-2 rounded-md border-0 focus:ring-2 focus:ring-blue-300 bg-white/90 text-gray-900 placeholder-gray-400 text-sm"
                    />
                  </div>
                  <select
                    value={selectedMode}
                    onChange={(e) => setSelectedMode(e.target.value)}
                    className="w-full sm:w-32 px-3 py-2 rounded-md border-0 focus:ring-2 focus:ring-blue-300 bg-white/90 text-gray-900 text-sm"
                  >
                    <option value="all">All Modes</option>
                    <option value="full time">Full Time</option>
                    <option value="part time">Part Time</option>
                    <option value="distance">Distance</option>
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full sm:w-32 px-3 py-2 rounded-md border-0 focus:ring-2 focus:ring-blue-300 bg-white/90 text-gray-900 text-sm"
                  >
                    <option value="name">Sort A-Z</option>
                    <option value="duration">Duration</option>
                    <option value="fees">Fees</option>
                  </select>
                  <Link
                    to="/admin/college_course/add"
                    className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-md flex items-center justify-center gap-2 text-sm"
                  >
                    <FiPlus />
                    <span>Add Course</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCourses.map((course) => (
                  <div
                    key={course._id}
                    className="bg-white rounded-md shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-200"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center">
                            <FiBook className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-base font-bold text-gray-900 truncate">{course?.Course_id?.courseName}</h3>
                            <p className="text-xs text-gray-600 truncate">{course?.college_id?.college_name}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FiCalendar className="text-blue-500 text-sm" />
                            <span className="text-xs font-medium text-gray-700">{course?.duration} Years</span>
                          </div>
                          {course?.fees && (
                            <div className="flex items-center space-x-2">
                             
                              <span className="text-xs font-medium text-gray-700">₹{course?.fees?.toLocaleString()}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getModeColor(course?.time)}`}>
                            {course?.time}
                          </span>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <FiClock />
                            <span>{course?.mode}</span>
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-medium text-gray-500 mb-1">Specializations</div>
                          <div className="flex flex-wrap gap-1">
                            {course?.specialisation?.slice(0, 3).map((spec, i) => (
                              <span
                                key={i}
                                className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md text-xs"
                              >
                                {spec}
                              </span>
                            ))}
                            {course?.specialisation?.length > 3 && (
                              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md text-xs">
                                +{course?.specialisation?.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        {course?.scholarship && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-2 flex items-center space-x-2">
                            <FiAward className="text-yellow-600 text-sm" />
                            <span className="text-xs font-medium text-yellow-800">Scholarship Available</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
                        <Link
                          to={`/admin/college_course/edit/${course?._id}`}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2"
                        >
                          <FiEdit className="text-sm" />
                          <span>Edit</span>
                        </Link>
                        <button
                          onClick={() => delete_handler(course?._id)}
                          className="flex-1 bg-white hover:bg-red-50 text-red-600 border border-red-300 hover:border-red-400 text-center py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2"
                        >
                          <FiTrash2 className="text-sm" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6 max-w-sm mx-auto">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FiSearch className="text-yellow-600 text-xl" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No courses found</h3>
                    <p className="text-gray-600 text-sm mb-4">Try adjusting your search or filters</p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedMode('all');
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Delete Confirmation Popup */}
        <div
          className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ${
            showDeletePopup ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm mx-4">
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <FiAlertTriangle className="text-red-600 text-lg" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-3">Confirm Deletion</h3>
            <p className="text-gray-600 text-sm text-center mb-4">
              Are you sure you want to delete this course? This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={cancelDelete}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-md text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-medium"
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-6">
        <div className="max-w-sm w-full text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiBook className="text-blue-600 text-lg" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">No Courses Yet</h2>
            <p className="text-gray-600 text-sm mb-4">Start by adding your first course to the directory</p>
            <Link
              to="/admin/college_course/add"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2"
            >
              <FiPlus />
              <span>Add First Course</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
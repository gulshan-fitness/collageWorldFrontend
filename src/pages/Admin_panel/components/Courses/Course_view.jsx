import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../../Context_holder";
import axios from "axios";
import {
  FiBook,
  FiTrash2,
  FiEdit,
  FiEye,
  FiSearch,
  FiPlus,
  FiAlertTriangle,
  FiPlay,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

export default function Course_view() {
  const { course_fetch, course, token, notify } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [isLoading, setIsLoading] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [expandedCourse, setExpandedCourse] = useState(null);

  const delete_handler = (course) => {
    setCourseToDelete(course);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    if (!courseToDelete) return;
    try {
      const success = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_COURSE_URL}delete/${courseToDelete?._id}/${courseToDelete?.course_image}/${courseToDelete?.ProgramOverview_image}/${courseToDelete?.keyhighlight_image}/${courseToDelete?.syllabusImage}/${courseToDelete?.eligibility_DurationImage}/${courseToDelete?.programFeesImage}/${courseToDelete?.admissionProcessImage}/${courseToDelete?.educationLoanImage}`,
        { headers: { Authorization: token } }
      );
      notify(success?.data?.msg, success?.data?.status);
      if (success?.data?.status === 1) {
        course_fetch();
      }
    } catch (error) {
      console.error("Delete error:", error);
      notify("Failed to delete course", 0);
    } finally {
      setShowDeletePopup(false);
      setCourseToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setCourseToDelete(null);
  };

  const toggleExpand = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await course_fetch();
      setTimeout(() => setIsLoading(false), 800);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (course?.length > 0) {
      let filtered = course.filter(
        (c) =>
          c?.courseName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
          c?.courseType?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
          c?.stream_id?.stream_name?.toLowerCase()?.includes(searchTerm.toLowerCase())
      );
      if (selectedType !== "all") {
        filtered = filtered.filter((c) => c?.courseType === selectedType);
      }
      filtered = filtered.sort((a, b) => {
        switch (sortBy) {
          case "name":
            return a?.courseName?.localeCompare(b?.courseName);
          case "type":
            return a?.courseType?.localeCompare(b?.courseType);
          case "recent":
            return new Date(b?.createdAt) - new Date(a?.createdAt);
          default:
            return 0;
        }
      });
      setFilteredCourses(filtered);
    }
  }, [course, searchTerm, selectedType, sortBy]);

  const getCourseTypeColor = (type) => {
    const colors = {
      ugCourse: "bg-blue-100 text-blue-800 border-blue-200",
      pgCourse: "bg-purple-100 text-purple-800 border-purple-200",
      abroadStudy: "bg-green-100 text-green-800 border-green-200",
      certificateProgram: "bg-orange-100 text-orange-800 border-orange-200",
      onlineCourse: "bg-indigo-100 text-indigo-800 border-indigo-200",
      distanceCourse: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[type] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getCourseTypeLabel = (type) => {
    const labels = {
      ugCourse: "UG Course",
      pgCourse: "PG Course",
      abroadStudy: "Abroad Study",
      certificateProgram: "Certificate",
      onlineCourse: "Online",
      distanceCourse: "Distance",
    };
    return labels[type] || type;
  };

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 flex flex-col items-center">
        <div className="text-center mb-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-40 mx-auto mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-60 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 animate-pulse shadow-lg">
              <div className="flex items-center gap-4 mb-4">
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
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-6 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
            <FiBook className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2">Course Management</h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Manage and organize all your academic courses
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 mb-8 space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            
            {/* Stats */}
            <div className="flex items-center justify-between sm:justify-start sm:gap-8 text-center sm:text-left w-full sm:w-auto">
              <div>
                <div className="text-xl font-bold text-blue-600">{filteredCourses?.length}</div>
                <div className="text-sm text-gray-500">Showing</div>
              </div>
              <div className="hidden sm:block h-8 w-px bg-gray-300"></div>
              <div>
                <div className="text-lg font-semibold text-gray-700">{course?.length || 0}</div>
                <div className="text-sm text-gray-500">Total Courses</div>
              </div>
              <div className="hidden sm:block h-8 w-px bg-gray-300"></div>
              <div>
                <div className="text-lg font-semibold text-gray-700">
                  {new Set(course?.map((c) => c?.courseType)).size}
                </div>
                <div className="text-sm text-gray-500">Types</div>
              </div>
            </div>

            {/* Filters + Add */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-4 py-2 sm:py-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="all">All Types</option>
                {[...new Set(course?.map((c) => c?.courseType))].map((type) => (
                  <option key={type} value={type}>
                    {getCourseTypeLabel(type)}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="recent">Most Recent</option>
                <option value="name">Name A-Z</option>
                <option value="type">Course Type</option>
              </select>

              <Link
                to="/admin/course/add"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition shadow-md"
              >
                <FiPlus />
                <span className="hidden sm:inline">Add Course</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((courseItem) => (
            <div
              key={courseItem?._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition overflow-hidden"
            >
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="relative">
                      <img
                        src={`${process.env.REACT_APP_API_IMAGE_URL}course_image/${courseItem?.course_image}`}
                        alt={courseItem?.courseName}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-gray-200 shadow-md"
                        onError={(e) =>
                          (e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            courseItem?.courseName || "C"
                          )}&background=3b82f6&color=fff&size=64`)
                        }
                      />
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full shadow-md">
                        <FiBook className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-800 text-base sm:text-lg truncate">
                        {courseItem?.courseName}
                      </h3>
                      <span
                        className={`px-2 sm:px-3 py-0.5 sm:py-1 mt-1 inline-block rounded-full text-xs font-semibold border ${getCourseTypeColor(
                          courseItem?.courseType
                        )}`}
                      >
                        {getCourseTypeLabel(courseItem?.courseType)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stream */}
                {courseItem?.stream_id && (
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>Stream:</strong> {courseItem?.stream_id?.stream_name}
                  </p>
                )}

                {/* Specializations */}
                {courseItem?.specialisation?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {courseItem?.specialisation?.slice(0, 3).map((spec, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs"
                      >
                        {spec}
                      </span>
                    ))}
                    {courseItem?.specialisation?.length > 3 && (
                      <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-lg text-xs">
                        +{courseItem?.specialisation?.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link
                    to={`/admin/course/edit/${courseItem?._id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg font-semibold flex items-center justify-center gap-1"
                  >
                    <FiEdit className="w-4 h-4" /> Edit
                  </Link>

                  <button
                    onClick={() => delete_handler(courseItem)}
                    className="flex-1 bg-white hover:bg-red-50 text-red-600 border border-red-300 py-2 rounded-lg font-semibold flex items-center justify-center gap-1"
                  >
                    <FiTrash2 className="w-4 h-4" /> Delete
                  </button>

                  <Link
                    to={`/coursedetailspage/${courseItem?._id}`}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold flex items-center justify-center gap-1"
                  >
                    <FiEye className="w-4 h-4" /> View
                  </Link>
                </div>

                {/* Expand */}
                <button
                  onClick={() => toggleExpand(courseItem?._id)}
                  className="w-full mt-3 flex items-center justify-center text-sm text-gray-500 hover:text-blue-600 transition"
                >
                  Details
                  {expandedCourse === courseItem?._id ? (
                    <FiChevronUp className="ml-1" />
                  ) : (
                    <FiChevronDown className="ml-1" />
                  )}
                </button>
              </div>

              {expandedCourse === courseItem?._id && (
                <div className="border-t bg-gray-50 p-5 text-sm text-gray-700">
                  {courseItem?.youtubeUrl && (
                    <div className="mb-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <FiPlay className="text-red-500" />
                        Course Video
                      </h4>
                      <p className="truncate text-gray-600">{courseItem?.youtubeUrl}</p>
                    </div>
                  )}
                  {courseItem?.createdAt && (
                    <p className="flex justify-between text-gray-600">
                      <span>Created:</span>
                      <span>{new Date(courseItem?.createdAt).toLocaleDateString()}</span>
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSearch className="text-yellow-600 text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                No courses found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedType("all");
                }}
                className="bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-lg font-semibold"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation */}
        {showDeletePopup && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <FiAlertTriangle className="text-red-600 text-2xl" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                Confirm Deletion
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete{" "}
                <strong>"{courseToDelete?.courseName}"</strong>? This cannot be
                undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold"
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
}

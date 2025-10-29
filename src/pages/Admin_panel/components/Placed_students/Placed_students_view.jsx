import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Context } from '../../../../Context_holder';
import axios from 'axios';
import { 
  FiUser, 
  FiBriefcase, 
  FiMessageSquare, 
  FiHome, 
  FiTrash2, 
  FiSearch,
  FiFilter,
  FiPlus,
  FiAlertTriangle,
  FiEye,
  FiStar
} from 'react-icons/fi';

export default function Placed_students_view() {
  const { placed_students_fetch, placed_students, token, notify, admin } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [isLoading, setIsLoading] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!admin) return;

      try {
        if (admin?.role === "subadmin" && admin?.collage_id) {
          await placed_students_fetch(null, admin?.collage_id);
        } else if (admin?.role === "superadmin") {
          await placed_students_fetch(null, null);
        }
      } catch (error) {
        console.error('Error fetching placed students:', error);
        notify('Failed to load placed students data', 0);
      } finally {
        setTimeout(() => setIsLoading(false), 800);
      }
    };

    fetchData();
  }, [admin]);

  useEffect(() => {
    if (placed_students?.length > 0) {
      let filtered = placed_students?.filter(student =>
        student?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        student?.company?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        student?.review?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        student?.college_id?.college_name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );

      if (selectedCollege !== 'all') {
        filtered = filtered?.filter(student => student?.college_id?._id === selectedCollege);
      }

      if (selectedCompany !== 'all') {
        filtered = filtered?.filter(student => student?.company === selectedCompany);
      }

      filtered = filtered?.sort((a, b) => {
        switch (sortBy) {
          case 'recent':
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 'name':
            return a.name?.localeCompare(b.name);
          case 'college':
            return a.college_id?.college_name?.localeCompare(b.college_id?.college_name);
          case 'company':
            return a.company?.localeCompare(b.company);
          default:
            return 0;
        }
      });

      setFilteredStudents(filtered);
    } else {
      setFilteredStudents([]);
    }
  }, [placed_students, searchTerm, selectedCollege, selectedCompany, sortBy]);

  const delete_handler = (student) => {
    setStudentToDelete(student);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    if (!studentToDelete) return;

    setIsDeleting(true);
    try {
      const deleteUrl = `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_PLACED_STUDENTS_URL}delete/${studentToDelete._id}/${studentToDelete.student_image}`;
      
      const response = await axios.delete(deleteUrl, {
        headers: { 
          Authorization: token,
          'Content-Type': 'application/json'
        }
      });

      notify(response.data.msg, response.data.status);
      
      if (response.data.status === 1) {
        // Refresh the students list
        if (admin?.role === "subadmin" && admin?.collage_id) {
          await placed_students_fetch(null, admin?.collage_id);
        } else if (admin?.role === "superadmin") {
          await placed_students_fetch(null, null);
        }
      }
    } catch (error) {
      console.error('Delete error:', error);
      notify('Failed to delete placed student', 0);
    } finally {
      setIsDeleting(false);
      setShowDeletePopup(false);
      setStudentToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setStudentToDelete(null);
  };

  const getCompanyColor = (company) => {
    const colors = [
      'bg-gradient-to-r from-blue-400 to-cyan-500',
      'bg-gradient-to-r from-purple-400 to-indigo-500',
      'bg-gradient-to-r from-green-400 to-emerald-500',
      'bg-gradient-to-r from-orange-400 to-red-500',
      'bg-gradient-to-r from-pink-400 to-rose-500',
      'bg-gradient-to-r from-teal-400 to-blue-500'
    ];
    const index = company?.split('')?.reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index] || 'bg-gradient-to-r from-gray-400 to-gray-500';
  };

  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
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
                  <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
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

  if (placed_students?.length !== 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Placed Students</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Celebrate and manage student placement achievements
            </p>
          </div>

          {/* Stats + Filters Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6 mb-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              
              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{filteredStudents?.length}</div>
                  <div className="text-xs sm:text-sm text-gray-500">Showing</div>
                </div>

                <div className="hidden sm:block h-8 w-px bg-gray-300"></div>

                <div className="text-center">
                  <div className="text-xl font-semibold text-gray-700">{placed_students?.length || 0}</div>
                  <div className="text-xs sm:text-sm text-gray-500">Total Students</div>
                </div>

                <div className="hidden sm:block h-8 w-px bg-gray-300"></div>

                <div className="text-center">
                  <div className="text-xl font-semibold text-gray-700">
                    {new Set(placed_students?.map(s => s.college_id?._id)).size}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">Colleges</div>
                </div>

                <div className="hidden sm:block h-8 w-px bg-gray-300"></div>

                <div className="text-center">
                  <div className="text-xl font-semibold text-gray-700">
                    {new Set(placed_students?.map(s => s.company)).size}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">Companies</div>
                </div>
              </div>

              {/* Filters + Search + Add Button */}
              <div className="flex flex-col sm:flex-row flex-wrap w-full lg:w-auto gap-3 sm:gap-4 justify-center lg:justify-end items-stretch">
                
                {/* Search */}
                <div className="relative w-full sm:w-64 lg:w-72">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* College Filter */}
                <select 
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm cursor-pointer"
                >
                  <option value="all">All Colleges</option>
                  {[...new Set(placed_students?.map(s => s.college_id?._id))].map(collegeId => {
                    const college = placed_students.find(s => s.college_id?._id === collegeId)?.college_id;
                    return (
                      <option key={collegeId} value={collegeId}>
                        {college?.college_name}
                      </option>
                    );
                  })}
                </select>

                {/* Company Filter */}
                <select 
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm cursor-pointer"
                >
                  <option value="all">All Companies</option>
                  {[...new Set(placed_students?.map(s => s.company))].map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>

                {/* Sort */}
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm cursor-pointer"
                >
                  <option value="recent">Most Recent</option>
                  <option value="name">Name A-Z</option>
                  <option value="college">College Name</option>
                  <option value="company">Company Name</option>
                </select>

                {/* Add Button */}
                <Link
                  to="/admin/placed_students/add"
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg text-sm"
                >
                  <FiPlus className="text-base" />
                  <span>Add Student</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Students Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredStudents?.map((student) => (
              <div
                key={student?._id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-green-300 transition-all duration-300 overflow-hidden"
              >
                {/* Header with Company Color */}
                <div className={`h-2 ${getCompanyColor(student?.company)}`}></div>
                
                <div className="p-5">
                  {/* Student Header */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative">
                      <img
                        src={process.env.REACT_APP_API_IMAGE_URL + "Placed_students_image/" + student?.student_image}
                        alt={student?.name}
                        className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-md"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student?.name)}&background=10b981&color=fff&size=64`;
                        }}
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full">
                        <FiStar className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg group-hover:text-green-600 truncate">
                        {student?.name}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        <FiHome className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-500 truncate">
                          {student?.college_id?.college_name}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Company Badge */}
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 text-xs text-white rounded-full ${getCompanyColor(student?.company)} font-semibold`}>
                      {student?.company}
                    </span>
                  </div>

                  {/* Review */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <FiMessageSquare className="text-green-500 flex-shrink-0" />
                      <span className="text-sm font-semibold text-gray-700">Student Review</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                      {student?.review}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => delete_handler(student)}
                      className="bg-white hover:bg-red-50 text-red-600 border border-red-300 hover:border-red-400 px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 text-sm transition-all duration-200 hover:shadow-md"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty Search State */}
          {filteredStudents?.length === 0 && placed_students?.length > 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="text-yellow-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No students found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                <button 
                  onClick={() => { 
                    setSearchTerm(''); 
                    setSelectedCollege('all'); 
                    setSelectedCompany('all'); 
                  }}
                  className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}

          {/* Delete Confirmation Popup */}
          {showDeletePopup && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-200">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <FiAlertTriangle className="text-red-600 text-2xl" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-4">Confirm Deletion</h3>
                <p className="text-gray-600 text-center mb-6">
                  Are you sure you want to delete <strong>{studentToDelete?.name}</strong>'s placement record? This action cannot be undone.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={cancelDelete}
                    disabled={isDeleting}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={isDeleting}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isDeleting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Deleting...
                      </>
                    ) : (
                      'Delete Student'
                    )}
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
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiUser className="text-green-600 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Placed Students</h2>
            <p className="text-gray-600 mb-6">Start by adding successful student placement stories</p>
            <Link
              to="/admin/placed_students/add"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center space-x-2 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <FiPlus className="text-lg" />
              <span>Add First Student</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
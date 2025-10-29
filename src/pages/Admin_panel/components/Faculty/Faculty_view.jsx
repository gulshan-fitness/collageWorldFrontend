import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Context } from '../../../../Context_holder';
import axios from 'axios';
import { 
  FiUser, 
  FiBook, 
  FiAward, 
  FiBriefcase, 
  FiTrash2, 
  FiEye, 
  FiSearch,
  FiFilter,
  FiHome,
  FiUsers,
  FiAlertTriangle,
  FiEdit,
  FiClock
} from 'react-icons/fi';

export default function Faculty_view() {
  const { faculty_fetch, faculty, token, notify, admin } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFaculty, setFilteredFaculty] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [isLoading, setIsLoading] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [facultyToDelete, setFacultyToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!admin) return;

      try {
        if (admin?.role === "subadmin" && admin?.collage_id) {
          await faculty_fetch(null, admin?.collage_id);
        } else if (admin?.role === "superadmin") {
          await faculty_fetch(null, null);
        }
      } catch (error) {
        console.error('Error fetching faculty:', error);
        notify('Failed to load faculty data', 0);
      } finally {
        setTimeout(() => setIsLoading(false), 800);
      }
    };

    fetchData();
  }, [admin]);

  useEffect(() => {
    if (faculty?.length > 0) {
      let filtered = faculty?.filter(facultyItem =>
        facultyItem?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        facultyItem?.department?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        facultyItem?.designation?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        facultyItem?.college_id?.college_name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );

      if (selectedCollege !== 'all') {
        filtered = filtered?.filter(facultyItem => facultyItem?.college_id?._id === selectedCollege);
      }

      if (selectedDepartment !== 'all') {
        filtered = filtered?.filter(facultyItem => facultyItem?.department === selectedDepartment);
      }

      filtered = filtered?.sort((a, b) => {
        switch (sortBy) {
          case 'recent':
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 'name':
            return a.name?.localeCompare(b.name);
          case 'college':
            return a.college_id?.college_name?.localeCompare(b.college_id?.college_name);
          case 'department':
            return a.department?.localeCompare(b.department);
          default:
            return 0;
        }
      });

      setFilteredFaculty(filtered);
    } else {
      setFilteredFaculty([]);
    }
  }, [faculty, searchTerm, selectedCollege, selectedDepartment, sortBy]);

  const delete_handler = (faculty) => {
    setFacultyToDelete(faculty);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    if (!facultyToDelete) return;

    setIsDeleting(true);
    try {
      // Debug: Log the URL to check if it's correct
      const deleteUrl = `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_FACULTY_URL}delete/${facultyToDelete._id}`;
      console.log('Delete URL:', deleteUrl);
      console.log('Faculty ID:', facultyToDelete._id);
      console.log('Token:', token ? 'Present' : 'Missing');

      const response = await axios.delete(deleteUrl, {
        headers: { 
          Authorization: token,
          'Content-Type': 'application/json'
        }
      });

      console.log('Delete response:', response);

      notify(response.data.msg, response.data.status);
      
      if (response.data.status === 1) {
        // Refresh the faculty list
        if (admin?.role === "subadmin" && admin?.collage_id) {
          await faculty_fetch(null, admin?.collage_id);
        } else if (admin?.role === "superadmin") {
          await faculty_fetch(null, null);
        }
      }
    } catch (error) {
      console.error('Delete error details:', error);
      console.error('Error response:', error.response);
      
      if (error.response) {
        // Server responded with error status
        notify(`Delete failed: ${error.response.data?.msg || error.response.statusText}`, 0);
      } else if (error.request) {
        // Request was made but no response received
        notify('Delete failed: No response from server', 0);
      } else {
        // Something else happened
        notify('Delete failed: ' + error.message, 0);
      }
    } finally {
      setIsDeleting(false);
      setShowDeletePopup(false);
      setFacultyToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setFacultyToDelete(null);
  };

  const getDepartmentColor = (department) => {
    const colors = {
      'Computer Science': 'bg-gradient-to-r from-blue-400 to-cyan-500',
      'Engineering': 'bg-gradient-to-r from-purple-400 to-indigo-500',
      'Science': 'bg-gradient-to-r from-green-400 to-emerald-500',
      'Arts': 'bg-gradient-to-r from-orange-400 to-red-500',
      'Commerce': 'bg-gradient-to-r from-pink-400 to-rose-500',
      'Management': 'bg-gradient-to-r from-teal-400 to-blue-500',
      'default': 'bg-gradient-to-r from-gray-400 to-gray-500'
    };
    return colors[department] || colors.default;
  };

  const getInitials = (name) => {
    return name?.split(' ').map(word => word[0]).join('').toUpperCase();
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

  if (faculty?.length !== 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Faculty Members</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Manage and view all faculty members across your institutions
            </p>
          </div>

          {/* Stats + Filters Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6 mb-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              
              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{filteredFaculty?.length}</div>
                  <div className="text-xs sm:text-sm text-gray-500">Showing</div>
                </div>

                <div className="hidden sm:block h-8 w-px bg-gray-300"></div>

                <div className="text-center">
                  <div className="text-xl font-semibold text-gray-700">{faculty?.length || 0}</div>
                  <div className="text-xs sm:text-sm text-gray-500">Total Faculty</div>
                </div>

                <div className="hidden sm:block h-8 w-px bg-gray-300"></div>

                <div className="text-center">
                  <div className="text-xl font-semibold text-gray-700">
                    {new Set(faculty?.map(f => f.college_id?._id)).size}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">Colleges</div>
                </div>

                <div className="hidden sm:block h-8 w-px bg-gray-300"></div>

                <div className="text-center">
                  <div className="text-xl font-semibold text-gray-700">
                    {new Set(faculty?.map(f => f.department)).size}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">Departments</div>
                </div>
              </div>

              {/* Filters + Search + Add Button */}
              <div className="flex flex-col sm:flex-row flex-wrap w-full lg:w-auto gap-3 sm:gap-4 justify-center lg:justify-end items-stretch">
                
                {/* Search */}
                <div className="relative w-full sm:w-64 lg:w-72">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search faculty..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* College Filter */}
                <select 
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm cursor-pointer"
                >
                  <option value="all">All Colleges</option>
                  {[...new Set(faculty?.map(f => f.college_id?._id))].map(collegeId => {
                    const college = faculty.find(f => f.college_id?._id === collegeId)?.college_id;
                    return (
                      <option key={collegeId} value={collegeId}>
                        {college?.college_name}
                      </option>
                    );
                  })}
                </select>

                {/* Department Filter */}
                <select 
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm cursor-pointer"
                >
                  <option value="all">All Departments</option>
                  {[...new Set(faculty?.map(f => f.department))].map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>

                {/* Sort */}
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm cursor-pointer"
                >
                  <option value="recent">Most Recent</option>
                  <option value="name">Name A-Z</option>
                  <option value="college">College Name</option>
                  <option value="department">Department</option>
                </select>

                {/* Add Button */}
                <Link
                  to="/admin/faculty/add"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg text-sm"
                >
                  <FiUser className="text-base" />
                  <span>Add Faculty</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Faculty Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredFaculty?.map((facultyItem) => (
              <div
                key={facultyItem?._id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 overflow-hidden"
              >
                <div className={`h-2 ${getDepartmentColor(facultyItem?.department)}`}></div>
                <div className="p-5">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {getInitials(facultyItem?.name)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg group-hover:text-blue-600">
                        {facultyItem?.name}
                      </h3>
                      <span className={`inline-block mt-1 px-3 py-1 text-xs text-white rounded-full ${getDepartmentColor(facultyItem?.department)}`}>
                        {facultyItem?.department}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-2 text-sm text-gray-600 mb-5">
                    <div className="flex items-center gap-2">
                      <FiHome className="text-blue-500" />
                      <span>{facultyItem?.college_id?.college_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiBriefcase className="text-green-500" />
                      <span>{facultyItem?.designation}</span>
                    </div>
                    {facultyItem?.qualification && (
                      <div className="flex items-center gap-2">
                        <FiAward className="text-purple-500" />
                        <span className="line-clamp-1">{facultyItem?.qualification}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => delete_handler(facultyItem)}
                      className="flex-1 bg-white hover:bg-red-50 text-red-600 border border-red-300 hover:border-red-400 text-center py-2 rounded-lg font-semibold flex items-center justify-center gap-2 text-sm"
                    >
                      <FiTrash2 /> <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty Search State */}
          {filteredFaculty?.length === 0 && faculty?.length > 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="text-yellow-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No faculty found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                <button 
                  onClick={() => { 
                    setSearchTerm(''); 
                    setSelectedCollege('all'); 
                    setSelectedDepartment('all'); 
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
                  Are you sure you want to delete <strong>{facultyToDelete?.name}</strong>? This action cannot be undone.
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
                      'Delete Faculty'
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
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiUsers className="text-blue-600 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Faculty Members</h2>
            <p className="text-gray-600 mb-6">Start by adding faculty members to your institution</p>
            <Link
              to="/admin/faculty/add"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center space-x-2 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <FiUser className="text-lg" />
              <span>Add First Faculty</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
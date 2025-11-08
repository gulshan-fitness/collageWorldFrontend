import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
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
  FiHome,
  FiGlobe,
  FiFilter,
  FiMapPin,
  FiUsers,
  FiAward,
  FiStar,
  FiChevronDown,
  FiX,
  FiAlertTriangle
} from 'react-icons/fi';

// Custom Delete Confirmation Modal
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, collegeName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <FiAlertTriangle className="text-red-600 text-lg" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Delete College</h3>
              <p className="text-sm text-gray-500">This action cannot be undone</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <FiX className="text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-700 mb-2">
            Are you sure you want to delete <span className="font-semibold text-gray-900">"{collegeName}"</span>?
          </p>
          <p className="text-sm text-gray-500">
            All associated data, images, and documents will be permanently removed from the system.
          </p>
        </div>

        {/* Footer */}
        <div className="flex space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-semibold transition-all duration-200 border border-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Delete College
          </button>
        </div>
      </div>
    </div>
  );
};

export default function College_view() {
  const { colleges, college_fetch, token, notify, admin, verifyAdmin } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, college: null });

  

  useEffect(() => {

    if (!admin) return;

    setIsLoading(true);

    if (admin?.role === "subadmin" && admin?.collage_id) {
      college_fetch(admin?.collage_id);
    } 

    else if(admin?.role === "superadmin") {
      college_fetch();
    }
    
    setTimeout(() => setIsLoading(false), 800);

  }, [admin]);

  console.log(colleges,"colleges");
  

  useEffect(() => {
    if (colleges && colleges?.length > 0) {

      let filtered = colleges.filter(college =>
        college.college_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.affiliatedTo?.some(affil => affil.toLowerCase().includes(searchTerm.toLowerCase())) ||
        college.type?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (selectedType !== 'all') {
        filtered = filtered.filter(college => college.type?.toLowerCase() === selectedType);
      }

      filtered = filtered.sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.college_name?.localeCompare(b.college_name);
          case 'year':
            return b.estdYear - a.estdYear;
          case 'type':
            return a.type?.localeCompare(b.type);
          default:
            return 0;
        }
      });

      setFilteredColleges(filtered);
    }
  }, [colleges, searchTerm, selectedType, sortBy]);

  const college_idRemover = () => {
    if (!admin || !token) return;

    axios.patch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_ADMIN_URL}college_idRemove/${admin?._id}`, {}, {
      headers: { Authorization: token }
    })
    .then((success) => {
      notify(success.data.msg, success.data.status);
      if (success.data.status === 1) {
        verifyAdmin(admin?._id, token);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const openDeleteModal = (college) => {
    setDeleteModal({ isOpen: true, college });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, college: null });
  };

  const delete_handler = () => {
    const { college } = deleteModal;
    if (!college) return;

    axios.delete(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_COLLEGE_URL}delete/${college._id}/${college.university_banner}/${college.campus_images}/${college.pdf}/${college.office_photo}`, {
      headers: { Authorization: token }
    })
    .then((success) => {
      notify(success.data.msg, success.data.status);
      if (success.data.status === 1) {
        if (!admin) return;

        if (admin?.role === "subadmin" && admin?.collage_id) {
          college_idRemover();
          college_fetch(admin?.collage_id);
        } else if (admin?.role === "superadmin") {
          college_fetch();
        }
      }
      closeDeleteModal();
    })
    .catch((error) => {
      console.error('Error:', error);
      closeDeleteModal();
    });
  };

  const getTypeColor = (type) => {
    const colors = {
      'government': 'from-emerald-500 to-green-600',
      'private': 'from-indigo-500 to-purple-600',
      'public': 'from-blue-500 to-cyan-600',
      'deemed': 'from-orange-500 to-red-500',
      'autonomous': 'from-pink-500 to-rose-500'
    };
    return colors[type?.toLowerCase()] || 'from-gray-500 to-gray-600';
  };

  const getTypeIcon = (type) => {
    const icons = {
      'government': '🏛️',
      'private': '🏢',
      'public': '🏫',
      'deemed': '🎓',
      'autonomous': '⚡'
    };
    return icons[type?.toLowerCase()] || '🏛️';
  };

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-10 bg-gradient-to-r from-gray-300 to-gray-200 rounded-2xl w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-5 bg-gradient-to-r from-gray-300 to-gray-200 rounded-lg w-80 mx-auto animate-pulse"></div>
          </div>
          
          {/* Search and Filter Skeleton */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="h-14 bg-gray-200 rounded-2xl animate-pulse"></div>
              <div className="h-14 bg-gray-200 rounded-2xl animate-pulse"></div>
              <div className="h-14 bg-gray-200 rounded-2xl animate-pulse"></div>
            </div>
          </div>

          {/* Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 p-6 animate-pulse">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gray-300 rounded-2xl"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-6 bg-gray-300 rounded-lg"></div>
                    <div className="h-4 bg-gray-300 rounded-lg w-24"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded-lg"></div>
                  <div className="h-4 bg-gray-300 rounded-lg w-4/5"></div>
                  <div className="h-4 bg-gray-300 rounded-lg w-3/5"></div>
                </div>
                <div className="flex space-x-3 mt-6">
                  <div className="flex-1 h-12 bg-gray-300 rounded-xl"></div>
                  <div className="flex-1 h-12 bg-gray-300 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (colleges?.length !== 0) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-2xl shadow-blue-500/25 mb-6">
                <FiHome className="text-3xl text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-4">
                College Directory
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Manage and explore all educational institutions with our comprehensive dashboard
              </p>
            </div>

            {/* Stats and Controls Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 p-6 md:p-8 mb-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-6">
                
                {/* Quick Stats */}
                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {filteredColleges.length}
                    </div>
                    <div className="text-sm font-medium text-gray-500">Showing</div>
                  </div>
                  <div className="h-12 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-700">{colleges?.length || 0}</div>
                    <div className="text-sm font-medium text-gray-500">Total Colleges</div>
                  </div>
                </div>

                {/* Add Button */}
                <Link
                  to="/admin/college/add"
                  className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3.5 rounded-2xl font-semibold flex items-center space-x-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center group-hover:rotate-90 transition-transform">
                    <FiPlus className="text-white text-sm" />
                  </div>
                  <span>Add College</span>
                </Link>
              </div>

              {/* Search and Filters */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                
                {/* Search Bar */}
                <div className="relative group">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search colleges, affiliations..."
                    className="w-full pl-12 pr-4 py-4 bg-gray-100/80 border border-gray-300/50 rounded-2xl focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Filter Dropdowns */}
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <FiFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <select 
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full pl-12 pr-10 py-4 bg-gray-100/80 border border-gray-300/50 rounded-2xl focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 appearance-none cursor-pointer transition-all duration-300 backdrop-blur-sm"
                    >
                      <option value="all">All Types</option>
                      <option value="government">Government</option>
                      <option value="private">Private</option>
                      <option value="public">Public</option>
                      <option value="deemed">Deemed</option>
                    </select>
                    <FiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>

                  <div className="relative flex-1">
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full pl-4 pr-10 py-4 bg-gray-100/80 border border-gray-300/50 rounded-2xl focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 appearance-none cursor-pointer transition-all duration-300 backdrop-blur-sm"
                    >
                      <option value="name">Sort A-Z</option>
                      <option value="year">Newest First</option>
                      <option value="type">By Type</option>
                    </select>
                    <FiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Colleges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              { filteredColleges?.map((college, index) => (
                <div
                  key={college._id}
                  className="group bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl hover:border-blue-300/50 transition-all duration-500 overflow-hidden hover:scale-105"
                >
                  
                  {/* College Header with Type Gradient */}
                  <div className={`h-2 bg-gradient-to-r ${getTypeColor(college.type)}`}></div>
                  
                  <div className="p-6">
                    
                    {/* College Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={process.env.REACT_APP_API_IMAGE_URL + "college_logo/" + college.university_banner[0]}
                            alt="College Logo"
                            className="w-16 h-16 rounded-2xl border-4 border-white shadow-lg object-cover"
                          />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full border-2 border-white flex items-center justify-center text-xs text-white">
                            {getTypeIcon(college.type)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                            {college.college_name}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getTypeColor(college.type)} text-white shadow-md`}>
                              {college.type}
                            </span>
                            <div className="flex items-center space-x-1 text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                              <FiCalendar className="text-xs" />
                              <span className="text-xs font-medium">{college.estdYear}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* College Details */}
                    <div className="space-y-4 mb-6">
                      
                      {/* Affiliations */}
                      <div className="flex items-start space-x-3">
                        <FiAward className="text-blue-500 flex-shrink-0 mt-1" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-gray-700 mb-2">Affiliations</div>
                          <div className="flex flex-wrap gap-2">
                            {college?.affiliatedTo?.slice(0, 3).map((affiliation, idx) => (
                              <span
                                key={idx}
                                className="inline-block bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 px-3 py-1.5 rounded-xl text-sm font-medium border border-gray-200/50 shadow-sm"
                              >
                                {affiliation}
                              </span>
                            ))}
                            {college?.affiliatedTo?.length > 3 && (
                              <span className="inline-block bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-1.5 rounded-xl text-sm font-medium border border-blue-200">
                                +{college.affiliatedTo.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Website */}
                      <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl border border-gray-200/50 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                              <FiGlobe className="text-white text-lg" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-gray-700">Official Website</div>
                              <div className="text-xs text-gray-500 truncate max-w-[120px]">
                                {college.officialWebsite?.replace(/^https?:\/\//, '')}
                              </div>
                            </div>
                          </div>
                          <Link
                            to={college.officialWebsite}
                            className="bg-white hover:bg-gray-50 text-blue-600 hover:text-blue-700 font-semibold text-sm py-2 px-4 rounded-xl transition-all duration-200 border border-gray-300/50 shadow-sm hover:shadow-md flex items-center space-x-2"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>Visit</span>
                            <FiExternalLink className="text-xs" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <Link
                        to={`/admin/college/edit/${college._id}`}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-center py-3.5 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
                      >
                        <FiEdit className="text-sm group-hover:scale-110 transition-transform" />
                        <span>Edit</span>
                      </Link>
                      
                      <button
                        onClick={() => openDeleteModal(college)}
                        className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-red-50 hover:to-red-100 text-red-600 border border-gray-300/50 hover:border-red-300 text-center py-3.5 rounded-2xl font-semibold transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center space-x-2 group"
                      >
                        <FiTrash2 className="text-sm group-hover:scale-110 transition-transform" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty Search State */}
            {filteredColleges.length === 0 && colleges?.length > 0 && (
              <div className="text-center py-16">
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 p-12 max-w-md mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-amber-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <FiSearch className="text-amber-600 text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">No results found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search terms or filters</p>
                  <button 
                    onClick={() => { setSearchTerm(''); setSelectedType('all'); }}
                    className="bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={deleteModal.isOpen}
          onClose={closeDeleteModal}
          onConfirm={delete_handler}
          collegeName={deleteModal.college?.college_name}
        />
      </>
    );
  } else {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FiHome className="text-blue-600 text-3xl" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-4">
              No Colleges Yet
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Start building your college directory by adding the first institution
            </p>
            <Link
              to="/admin/college/add"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold inline-flex items-center space-x-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                <FiPlus className="text-white text-sm" />
              </div>
              <span className="text-lg">Add First College</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
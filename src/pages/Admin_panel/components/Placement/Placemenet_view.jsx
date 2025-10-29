import axios from 'axios';
import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Context } from '../../../../Context_holder';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { 
  FiEdit, 
  FiTrash2, 
  FiPlus, 
  FiSearch,
  FiBriefcase,
  FiFilter,
  FiX,
  FiChevronDown,
  FiAlertTriangle,
  FiEye,
  FiTrendingUp,
  FiAward,
  FiBuilding
} from 'react-icons/fi';

export default function Placement_view() {
  const { placement_fetch, placemenet, token, notify, admin } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [isLoading, setIsLoading] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [placementToDelete, setPlacementToDelete] = useState(null);
  const [expandedPlacement, setExpandedPlacement] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!admin) return;

      if (admin?.role === "subadmin" && admin?.collage_id) {
        await placement_fetch(null, admin?.collage_id);
      } else if (admin?.role === "superadmin") {
        await placement_fetch(null, null);
      }
      
      setTimeout(() => setIsLoading(false), 800);
    };

    fetchData();
  }, [admin]);

  // Get unique values for filters
  const uniqueColleges = useMemo(() => {
    return [...new Set(placemenet?.map(p => p.college_id?._id))].map(collegeId => {
      const college = placemenet.find(p => p.college_id?._id === collegeId)?.college_id;
      return { id: collegeId, name: college?.college_name };
    });
  }, [placemenet]);

  // Filter and sort placements
const filteredPlacements = useMemo(() => {
  if (!placemenet || placemenet.length === 0) return [];

  const normalizedSearch = searchTerm.trim().toLowerCase();

  let filtered = placemenet.filter((placement) => {
    const collegeName = placement?.college_id?.college_name?.toLowerCase() || '';
    const contentText = placement?.placemenet_paragraph
      ? placement.placemenet_paragraph.replace(/<[^>]*>/g, '').toLowerCase()
      : '';

    const matchesSearch =
      !normalizedSearch ||
      collegeName.includes(normalizedSearch) ||
      contentText.includes(normalizedSearch);

    const matchesCollege =
      selectedCollege === 'all' || placement?.college_id?._id === selectedCollege;

    return matchesSearch && matchesCollege;
  });

  // Sorting logic
  filtered.sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
      case 'college':
        return a.college_id?.college_name?.localeCompare(b.college_id?.college_name);
      case 'content':
        return (
          (b.placemenet_paragraph?.length || 0) - (a.placemenet_paragraph?.length || 0)
        );
      default:
        return 0;
    }
  });

  return filtered;
}, [placemenet, searchTerm, selectedCollege, sortBy]);


  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCollege('all');
    setSortBy('recent');
  };

  const hasActiveFilters = searchTerm || selectedCollege !== 'all';

  const delete_handler = (placement) => {
    setPlacementToDelete(placement);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    if (!placementToDelete) return;

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_PLACEMENT_URL}delete/${placementToDelete._id}`,
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
          await placement_fetch(null, admin?.collage_id);
        } else if (admin?.role === "superadmin") {
          await placement_fetch(null, null);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      notify('Failed to delete placement information', 0);
    } finally {
      setShowDeletePopup(false);
      setPlacementToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setPlacementToDelete(null);
  };

  const toggleExpand = (id) => {
    setExpandedPlacement(expandedPlacement === id ? null : id);
  };

  const getCollegeColor = (collegeId) => {
    const colors = [
      'bg-gradient-to-r from-emerald-400 to-green-500',
      'bg-gradient-to-r from-blue-400 to-cyan-500',
      'bg-gradient-to-r from-purple-400 to-indigo-500',
      'bg-gradient-to-r from-orange-400 to-red-500',
      'bg-gradient-to-r from-pink-400 to-rose-500',
      'bg-gradient-to-r from-teal-400 to-blue-500'
    ];
    const index = collegeId?.split('')?.reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index] || 'bg-gradient-to-r from-gray-400 to-gray-500';
  };

  const getContentPreview = (htmlContent) => {
    const text = htmlContent?.replace(/<[^>]*>/g, '') || 'No placement information available';
    return text.length > 150 ? text.substring(0, 150) + '...' : text;
  };

  const getContentLength = (htmlContent) => {
    return htmlContent?.replace(/<[^>]*>/g, '').length || 0;
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
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

  if (placemenet?.length !== 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Placement Information
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Manage and organize placement statistics and career opportunity information
            </p>
          </div>

          {/* Stats and Controls Card */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-8">
  {/* ====== Top Section: Stats + Add Button ====== */}
  <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
    
    {/* Quick Stats */}
    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
      {/* Showing */}
      <div className="text-center min-w-[80px]">
        <div className="text-xl sm:text-2xl font-bold text-emerald-600">{filteredPlacements.length}</div>
        <div className="text-xs sm:text-sm text-gray-500">Showing</div>
      </div>

      <div className="hidden sm:block h-8 w-px bg-gray-300"></div>

      {/* Total */}
      <div className="text-center min-w-[80px]">
        <div className="text-lg sm:text-xl font-semibold text-gray-700">{placemenet?.length || 0}</div>
        <div className="text-xs sm:text-sm text-gray-500">Total</div>
      </div>

      <div className="hidden sm:block h-8 w-px bg-gray-300"></div>

      {/* Colleges */}
      <div className="text-center min-w-[80px]">
        <div className="text-lg sm:text-xl font-semibold text-gray-700">{uniqueColleges.length}</div>
        <div className="text-xs sm:text-sm text-gray-500">Colleges</div>
      </div>

      <div className="hidden sm:block h-8 w-px bg-gray-300"></div>

      {/* Detailed */}
      <div className="text-center min-w-[80px]">
        <div className="text-lg sm:text-xl font-semibold text-gray-700">
          {placemenet?.filter(p => getContentLength(p.placemenet_paragraph) > 200).length}
        </div>
        <div className="text-xs sm:text-sm text-gray-500">Detailed</div>
      </div>
    </div>

    {/* Add Button */}
    <Link
      to="/admin/placement/add"
      className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg"
    >
      <FiPlus className="text-lg" />
      <span>Add Placement</span>
    </Link>
  </div>

  {/* ====== Search + Filters Section ====== */}
  <div className="mt-6">
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      
      {/* Search Bar */}
      <div className="flex-1 relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search placement info by college or content..."
          className="w-full pl-10 pr-9 py-2.5 sm:py-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm sm:text-base"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <FiX className="text-base sm:text-lg" />
          </button>
        )}
      </div>

      {/* College Filter */}
      <select 
        value={selectedCollege}
        onChange={(e) => setSelectedCollege(e.target.value)}
        className="w-full sm:w-64 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none cursor-pointer text-sm sm:text-base"
      >
        <option value="all">All Colleges</option>
        {uniqueColleges.map(college => (
          <option key={college.id} value={college.id}>
            {college.name}
          </option>
        ))}
      </select>

      {/* Sort Dropdown */}
      <select 
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full sm:w-48 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none cursor-pointer text-sm sm:text-base"
      >
        <option value="recent">Most Recent</option>
        <option value="college">College A-Z</option>
        <option value="content">Content Length</option>
      </select>
    </div>

    {/* ====== Active Filters ====== */}
    {hasActiveFilters && (
      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600">Active filters:</span>

          {searchTerm && (
            <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs sm:text-sm rounded-full">
              Search: "{searchTerm}"
              <button onClick={() => setSearchTerm('')} className="ml-1 text-blue-600 hover:text-blue-800">
                <FiX className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedCollege !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs sm:text-sm rounded-full">
              College: {uniqueColleges.find(c => c.id === selectedCollege)?.name}
              <button onClick={() => setSelectedCollege('all')} className="ml-1 text-green-600 hover:text-green-800">
                <FiX className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>

        <button
          onClick={clearAllFilters}
          className="text-sm text-gray-600 hover:text-gray-800 underline self-end sm:self-auto"
        >
          Clear all
        </button>
      </div>
    )}
  </div>
</div>


          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredPlacements.length} of {placemenet?.length || 0} placement records
              {hasActiveFilters && ' (filtered)'}
            </div>
          </div>

          {/* Placements Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPlacements.map((placement, index) => (
              <div
                key={placement?._id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-emerald-300 transition-all duration-300 overflow-hidden"
              >
                
                {/* Placement Header with College Color */}
                <div className={`h-3 ${getCollegeColor(placement?.college_id?._id)}`}></div>
                
                <div className="p-6">
                  
                  {/* Placement Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-emerald-100 rounded-xl">
                        <FiBriefcase className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                          {placement?.college_id?.college_name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCollegeColor(placement?.college_id?._id)} text-white`}>
                            Placement Information
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            getContentLength(placement?.placemenet_paragraph) > 200 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {getContentLength(placement?.placemenet_paragraph) > 200 ? 'Detailed' : 'Brief'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Placement Content */}
                  <div className="space-y-4 mb-6">
                    
                    {/* Content Preview */}
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <FiTrendingUp className="text-emerald-500" />
                          <span className="text-sm font-medium text-gray-700">Placement Details</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {getContentLength(placement?.placemenet_paragraph)} characters
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-600 max-h-32 overflow-hidden">
                        {expandedPlacement === placement._id ? (
                          <div className="space-y-2">
                            {parse(placement?.placemenet_paragraph || 'No placement information available')}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {parse(getContentPreview(placement?.placemenet_paragraph))}
                          </div>
                        )}
                        
                        {getContentLength(placement?.placemenet_paragraph) > 150 && (
                          <button
                            onClick={() => toggleExpand(placement._id)}
                            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mt-2"
                          >
                            {expandedPlacement === placement._id ? 'Show less' : 'Read more'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Link
                      to={`/admin/placement/edit/${placement?._id}`}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-center py-2.5 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <FiEdit className="text-sm" />
                      <span>Edit</span>
                    </Link>
                    
                    <button
                      onClick={() => delete_handler(placement)}
                      className="flex-1 bg-white hover:bg-red-50 text-red-600 border border-red-300 hover:border-red-400 text-center py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <FiTrash2 className="text-sm" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty Search State */}
          {filteredPlacements.length === 0 && placemenet?.length > 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="text-yellow-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No placement records found</h3>
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
                  Are you sure you want to delete placement information for <span className="font-semibold">{placementToDelete?.college_id?.college_name}</span>? This action cannot be undone.
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
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiBriefcase className="text-emerald-600 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Placement Information Yet</h2>
            <p className="text-gray-600 mb-6">Start by adding placement statistics and career opportunity information</p>
            <Link
              to="/admin/placement/add"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center space-x-2 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <FiPlus className="text-lg" />
              <span>Add First Placement</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
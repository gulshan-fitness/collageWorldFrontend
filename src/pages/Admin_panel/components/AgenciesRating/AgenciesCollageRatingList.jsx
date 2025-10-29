import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../../../Context_holder";
import Select from 'react-select';
import {
  FiTrash2,
  FiPlus,
  FiSearch,
  FiFilter,
  FiAward,
  FiTrendingUp,
  FiBook,
  FiMapPin,
  FiCalendar,
  FiAlertTriangle,
  FiX,
  FiStar,
  FiBarChart2,
  FiTarget
} from 'react-icons/fi';

export default function AgenciesCollageRatingList() {
  const { AgenciesCollageRating, AgenciesRatingsfetch, token, notify } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    college: null,
    stream: null,
    agency: null,
    year: null,
    status: null,
    rankingRange: null
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [ratingToDelete, setRatingToDelete] = useState(null);

  // Fetch ratings
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await AgenciesRatingsfetch();
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Update filtered data when data or filters change
  useEffect(() => {
    if (AgenciesCollageRating) {
      let result = AgenciesCollageRating;

      // Apply search term
      if (searchTerm) {
        result = result.filter(rating =>
          rating?.collage_id?.college_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          rating?.stream_id?.stream_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          rating?.agencyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          rating?.year?.toString().includes(searchTerm)
        );
      }

      // Apply college filter
      if (filters.college) {
        result = result.filter(rating => 
          rating?.collage_id?._id === filters.college.value
        );
      }

      // Apply stream filter
      if (filters.stream) {
        result = result.filter(rating => 
          rating?.stream_id?._id === filters.stream.value
        );
      }

      // Apply agency filter
      if (filters.agency) {
        result = result.filter(rating => 
          rating?.agencyName === filters.agency.value
        );
      }

      // Apply year filter
      if (filters.year) {
        result = result.filter(rating => 
          rating?.year?.toString() === filters.year.value
        );
      }

      // Apply status filter
      if (filters.status) {
        result = result.filter(rating => {
          const percentage = Math.round((rating?.Ranking / rating?.out_of) * 100);
          switch (filters.status.value) {
            case 'excellent': return percentage >= 80;
            case 'good': return percentage >= 60 && percentage < 80;
            case 'average': return percentage >= 40 && percentage < 60;
            case 'poor': return percentage >= 20 && percentage < 40;
            case 'very-poor': return percentage < 20;
            default: return true;
          }
        });
      }

      // Apply ranking range filter
      if (filters.rankingRange) {
        result = result.filter(rating => {
          const ranking = rating?.Ranking;
          switch (filters.rankingRange.value) {
            case 'top10': return ranking <= 10;
            case 'top25': return ranking <= 25;
            case 'top50': return ranking <= 50;
            case 'top100': return ranking <= 100;
            default: return true;
          }
        });
      }

      setFilteredData(result);
    }
  }, [AgenciesCollageRating, filters, searchTerm]);

  // Get unique values for filters
  const uniqueColleges = [...new Set(AgenciesCollageRating?.map(r => r?.college_id).filter(Boolean))].map(college => ({
    value: college?._id,
    label: college?.college_name
  }));

  const uniqueStreams = [...new Set(AgenciesCollageRating?.map(r => r.stream_id).filter(Boolean))].map(stream => ({
    value: stream._id,
    label: stream.stream_name
  }));

  const uniqueAgencies = [...new Set(AgenciesCollageRating?.map(r => r.agencyName).filter(Boolean))].map(agency => ({
    value: agency,
    label: agency
  }));

  const uniqueYears = [...new Set(AgenciesCollageRating?.map(r => r.year).filter(Boolean))].sort((a, b) => b - a).map(year => ({
    value: year.toString(),
    label: year.toString()
  }));

  const statusOptions = [
    { value: 'excellent', label: 'Excellent (80-100%)' },
    { value: 'good', label: 'Good (60-79%)' },
    { value: 'average', label: 'Average (40-59%)' },
    { value: 'poor', label: 'Poor (20-39%)' },
    { value: 'very-poor', label: 'Very Poor (0-19%)' }
  ];

  const rankingOptions = [
    { value: 'top10', label: 'Top 10' },
    { value: 'top25', label: 'Top 25' },
    { value: 'top50', label: 'Top 50' },
    { value: 'top100', label: 'Top 100' }
  ];

  // Delete rating
  const handleDelete = async (id, collegeName) => {
    setRatingToDelete({ id, collegeName });
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    if (!ratingToDelete) return;

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_AGENCIES_URL}delete/${ratingToDelete.id}`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      notify(response.data.msg, response.data.status);

      if (response.data.status === 1) {
        AgenciesRatingsfetch();
      }
    } catch (err) {
      console.error(err);
      notify("Error deleting data ❌", 0);
    } finally {
      setShowDeletePopup(false);
      setRatingToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setRatingToDelete(null);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      college: null,
      stream: null,
      agency: null,
      year: null,
      status: null,
      rankingRange: null
    });
    setSearchTerm('');
  };

  // Get status color based on ranking percentage
  const getStatusColor = (ranking, outOf) => {
    if (!ranking || !outOf) return 'bg-gray-100 text-gray-600 border border-gray-200';
    const percentage = (ranking / outOf) * 100;
    if (percentage >= 80) return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
    if (percentage >= 60) return 'bg-green-100 text-green-800 border border-green-200';
    if (percentage >= 40) return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    if (percentage >= 20) return 'bg-orange-100 text-orange-800 border border-orange-200';
    return 'bg-red-100 text-red-800 border border-red-200';
  };

  // Get status label
  const getStatusLabel = (ranking, outOf) => {
    if (!ranking || !outOf) return 'N/A';
    const percentage = Math.round((ranking / outOf) * 100);
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 60) return 'Good';
    if (percentage >= 40) return 'Average';
    if (percentage >= 20) return 'Poor';
    return 'Very Poor';
  };

  // Get agency color
  const getAgencyColor = (agencyName) => {
    const colors = {
      'AAOPADHE': 'bg-purple-100 text-purple-800 border border-purple-200',
      'indiatoday': 'bg-blue-100 text-blue-800 border border-blue-200',
      'the week': 'bg-green-100 text-green-800 border border-green-200',
      'NIRF': 'bg-red-100 text-red-800 border border-red-200',
      'Outlook': 'bg-orange-100 text-orange-800 border border-orange-200',
      'IIRF': 'bg-indigo-100 text-indigo-800 border border-indigo-200',
      'TOI': 'bg-pink-100 text-pink-800 border border-pink-200',
      'NIRF Innovation': 'bg-teal-100 text-teal-800 border border-teal-200',
      'the': 'bg-gray-100 text-gray-800 border border-gray-200',
      'qs': 'bg-yellow-100 text-yellow-800 border border-yellow-200'
    };
    return colors[agencyName] || 'bg-gray-100 text-gray-800 border border-gray-200';
  };

  // Custom select styles
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: '6px 8px',
      border: `2px solid ${state.isFocused ? '#2563eb' : '#e5e7eb'}`,
      borderRadius: '8px',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(37, 99, 235, 0.1)' : 'none',
      backgroundColor: 'white',
      transition: 'all 0.2s ease-in-out',
      minHeight: '40px',
      fontSize: '14px',
      '&:hover': {
        borderColor: '#2563eb',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#2563eb' : state.isFocused ? '#dbeafe' : 'white',
      color: state.isSelected ? 'white' : '#1f2937',
      padding: '8px 12px',
      fontSize: '14px',
      borderBottom: '1px solid #f1f5f9',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        backgroundColor: state.isSelected ? '#2563eb' : '#dbeafe',
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      overflow: 'hidden',
      zIndex: 50,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#1e40af',
      fontWeight: '500',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af',
      fontSize: '14px',
    }),
  };

  // Check if any filter is active
  const isAnyFilterActive = Object.values(filters).some(filter => filter !== null) || searchTerm;

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

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full shadow-md mb-3">
            <FiAward className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Agency Ratings Management</h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-lg mx-auto">
            Comprehensive overview of all college rankings from trusted rating agencies
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center">
                <FiBarChart2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Total Ratings</p>
                <p className="text-lg font-bold text-gray-900">{filteredData.length}</p>
                {isAnyFilterActive && (
                  <p className="text-xs text-blue-600 mt-1">
                    ({AgenciesCollageRating?.length || 0} total)
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-md flex items-center justify-center">
                <FiAward className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Agencies</p>
                <p className="text-lg font-bold text-gray-900">
                  {new Set(filteredData.map(r => r?.agencyName)).size || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-md flex items-center justify-center">
                <FiBook className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Colleges</p>
                <p className="text-lg font-bold text-gray-900">
                  {new Set(filteredData.map(r => r?.collage_id?._id)).size || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-md flex items-center justify-center">
                <FiTarget className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Streams</p>
                <p className="text-lg font-bold text-gray-900">
                  {new Set(filteredData.map(r => r?.stream_id?._id)).size || 0}
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
                <h2 className="text-lg sm:text-xl font-bold text-white">Ratings Directory</h2>
                <p className="text-blue-100 text-sm mt-1">Manage all agency ratings and rankings</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
                  <input
                    type="text"
                    placeholder="Search ratings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-48 pl-10 pr-3 py-2 rounded-md border-0 focus:ring-2 focus:ring-blue-300 bg-white/90 text-gray-900 placeholder-gray-400 text-sm"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-white/90 hover:bg-white text-blue-600 font-medium py-2 px-3 rounded-md flex items-center gap-2 text-sm"
                >
                  <FiFilter className="text-sm" />
                  <span>Filters {isAnyFilterActive && `(${Object.values(filters).filter(Boolean).length})`}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          {showFilters && (
            <div className="bg-gray-50 border-b border-gray-200 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">College</label>
                  <Select
                    value={filters.college}
                    onChange={(selected) => setFilters(prev => ({ ...prev, college: selected }))}
                    options={uniqueColleges}
                    placeholder="All Colleges"
                    styles={customSelectStyles}
                    isClearable
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stream</label>
                  <Select
                    value={filters.stream}
                    onChange={(selected) => setFilters(prev => ({ ...prev, stream: selected }))}
                    options={uniqueStreams}
                    placeholder="All Streams"
                    styles={customSelectStyles}
                    isClearable
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Agency</label>
                  <Select
                    value={filters.agency}
                    onChange={(selected) => setFilters(prev => ({ ...prev, agency: selected }))}
                    options={uniqueAgencies}
                    placeholder="All Agencies"
                    styles={customSelectStyles}
                    isClearable
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <Select
                    value={filters.year}
                    onChange={(selected) => setFilters(prev => ({ ...prev, year: selected }))}
                    options={uniqueYears}
                    placeholder="All Years"
                    styles={customSelectStyles}
                    isClearable
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <Select
                    value={filters.status}
                    onChange={(selected) => setFilters(prev => ({ ...prev, status: selected }))}
                    options={statusOptions}
                    placeholder="All Status"
                    styles={customSelectStyles}
                    isClearable
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ranking</label>
                  <Select
                    value={filters.rankingRange}
                    onChange={(selected) => setFilters(prev => ({ ...prev, rankingRange: selected }))}
                    options={rankingOptions}
                    placeholder="All Ranks"
                    styles={customSelectStyles}
                    isClearable
                  />
                </div>
              </div>

              {/* Active Filters and Clear Button */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200">
                {isAnyFilterActive && (
                  <div className="mb-3 sm:mb-0">
                    <span className="text-sm font-medium text-gray-700 mr-3">Active filters:</span>
                    <div className="flex flex-wrap gap-2">
                      {searchTerm && (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                          Search: "{searchTerm}"
                          <button 
                            onClick={() => setSearchTerm('')}
                            className="ml-1 hover:text-blue-600 focus:outline-none"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {Object.entries(filters).map(([key, value]) => 
                        value && (
                          <span key={key} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                            {value.label}
                            <button 
                              onClick={() => setFilters(prev => ({ ...prev, [key]: null }))}
                              className="ml-1 hover:text-blue-600 focus:outline-none"
                            >
                              ×
                            </button>
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
                <div className="flex space-x-2">
                  {isAnyFilterActive && (
                    <button
                      onClick={clearAllFilters}
                      className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={() => setShowFilters(false)}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Ratings Grid */}
          <div className="p-4 sm:p-6">
            {filteredData.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredData.map((rating) => (
                  <div
                    key={rating._id}
                    className="bg-white rounded-md shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-200"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center">
                            <FiAward className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-base font-bold text-gray-900 truncate">{rating?.collage_id?.college_name}</h3>
                            <p className="text-xs text-gray-600 truncate">{rating?.stream_id?.stream_name}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FiAward className="text-blue-500 text-sm" />
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAgencyColor(rating?.agencyName)}`}>
                              {rating?.agencyName}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FiCalendar className="text-gray-500 text-sm" />
                            <span className="text-xs font-medium text-gray-700">{rating?.year}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-center">
                            <div className="text-xs text-gray-500">Ranking</div>
                            <div className="text-lg font-bold text-gray-900">{rating?.Ranking}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-500">Out Of</div>
                            <div className="text-lg font-semibold text-gray-700">{rating?.out_of}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-500">Percentage</div>
                            <div className="text-lg font-bold text-blue-600">
                              {Math.round((rating?.Ranking / rating?.out_of) * 100)}%
                            </div>
                          </div>
                        </div>

                        <div className="text-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(rating?.Ranking, rating?.out_of)}`}>
                            {getStatusLabel(rating?.Ranking, rating?.out_of)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          onClick={() => handleDelete(rating?._id, rating?.collage_id?.college_name)}
                          className="w-full bg-white hover:bg-red-50 text-red-600 border border-red-300 hover:border-red-400 text-center py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2"
                        >
                          <FiTrash2 className="text-sm" />
                          <span>Delete Rating</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6 max-w-sm mx-auto">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiSearch className="text-yellow-600 text-xl" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {isAnyFilterActive ? "No Matching Ratings Found" : "No Ratings Found"}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {isAnyFilterActive 
                      ? "Try adjusting your search or filters" 
                      : "Start by adding some ratings to see them here."
                    }
                  </p>
                  {isAnyFilterActive && (
                    <button
                      onClick={clearAllFilters}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Clear Filters
                    </button>
                  )}
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
            Are you sure you want to delete the rating for <strong>{ratingToDelete?.collegeName}</strong>? This action cannot be undone.
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
}
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../Context_holder';
import { Link } from 'react-router-dom';
import { 
  FiTrendingUp, 
  FiTrash2, 
  FiSearch, 
  FiFilter, 
  FiHome, 
  FiCalendar,
  FiUsers,
  FiPlus,
  FiAlertTriangle,
  FiBarChart2,
  FiEye
} from 'react-icons/fi';

export default function PlacementScore_view() {
  const { placement_score_fetch, placementscore, notify, admin } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredScores, setFilteredScores] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [isLoading, setIsLoading] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [scoreToDelete, setScoreToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!admin) return;

      try {
        if (admin?.role === "subadmin") {
          await placement_score_fetch(null, admin?.collage_id);
        } else if (admin?.role === "superadmin") {
          await placement_score_fetch(null, null);
        }
      } catch (error) {
        console.error('Error fetching placement scores:', error);
        notify('Failed to load placement data', 0);
      } finally {
        setTimeout(() => setIsLoading(false), 800);
      }
    };

    fetchData();
  }, [admin]);

  useEffect(() => {
    if (placementscore?.length > 0) {
      let filtered = placementscore?.filter(score =>
        score?.college_id?.college_name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        score?.year?.toString()?.includes(searchTerm?.toLowerCase()) ||
        score?.placementScore?.toString()?.includes(searchTerm?.toLowerCase())
      );

      if (selectedCollege !== 'all') {
        filtered = filtered?.filter(score => score?.college_id?._id === selectedCollege);
      }

      if (selectedYear !== 'all') {
        filtered = filtered?.filter(score => score?.year?.toString() === selectedYear);
      }

      filtered = filtered?.sort((a, b) => {
        switch (sortBy) {
          case 'recent':
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 'score_high':
            return b.placementScore - a.placementScore;
          case 'score_low':
            return a.placementScore - b.placementScore;
          case 'year':
            return b.year - a.year;
          case 'college':
            return a.college_id?.college_name?.localeCompare(b.college_id?.college_name);
          default:
            return 0;
        }
      });

      setFilteredScores(filtered);
    } else {
      setFilteredScores([]);
    }
  }, [placementscore, searchTerm, selectedCollege, selectedYear, sortBy]);

  const delete_handler = (score) => {
    setScoreToDelete(score);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    if (!scoreToDelete) return;

    setIsDeleting(true);
    try {
      const deleteUrl = `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_PLACEMENT_SCORE_URL}delete/${scoreToDelete._id}`;
      
      const response = await axios.delete(deleteUrl);

      notify(response.data.msg, response.data.status);
      
      if (response.data.status === 1) {
        // Refresh the scores list
        if (admin?.role === "subadmin") {
          await placement_score_fetch(null, admin?.collage_id);
        } else if (admin?.role === "superadmin") {
          await placement_score_fetch(null, null);
        }
      }
    } catch (error) {
      console.error('Delete error:', error);
      notify('Failed to delete placement score', 0);
    } finally {
      setIsDeleting(false);
      setShowDeletePopup(false);
      setScoreToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setScoreToDelete(null);
  };

  const getScoreColor = (score) => {
    if (score >= 500) return 'bg-gradient-to-r from-green-400 to-emerald-500';
    if (score >= 200) return 'bg-gradient-to-r from-blue-400 to-cyan-500';
    if (score >= 50) return 'bg-gradient-to-r from-purple-400 to-indigo-500';
    return 'bg-gradient-to-r from-orange-400 to-red-500';
  };

  const getScoreLevel = (score) => {
    if (score >= 500) return 'Excellent';
    if (score >= 200) return 'Large';
    if (score >= 50) return 'Medium';
    return 'Small Batch';
  };

  const formatNumber = (num) => {
    return num?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

  if (placementscore?.length !== 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Placement Statistics</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Track and analyze student placement data across colleges
            </p>
          </div>

          {/* Stats + Filters Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6 mb-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              
              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{filteredScores?.length}</div>
                  <div className="text-xs sm:text-sm text-gray-500">Showing</div>
                </div>

                <div className="hidden sm:block h-8 w-px bg-gray-300"></div>

                <div className="text-center">
                  <div className="text-xl font-semibold text-gray-700">{placementscore?.length || 0}</div>
                  <div className="text-xs sm:text-sm text-gray-500">Total Records</div>
                </div>

                <div className="hidden sm:block h-8 w-px bg-gray-300"></div>

                <div className="text-center">
                  <div className="text-xl font-semibold text-gray-700">
                    {new Set(placementscore?.map(s => s.college_id?._id)).size}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">Colleges</div>
                </div>

                <div className="hidden sm:block h-8 w-px bg-gray-300"></div>

                <div className="text-center">
                  <div className="text-xl font-semibold text-gray-700">
                    {new Set(placementscore?.map(s => s.year)).size}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">Years</div>
                </div>
              </div>

              {/* Filters + Search + Add Button */}
              <div className="flex flex-col sm:flex-row flex-wrap w-full lg:w-auto gap-3 sm:gap-4 justify-center lg:justify-end items-stretch">
                
                {/* Search */}
                <div className="relative w-full sm:w-64 lg:w-72">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search placement data..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* College Filter */}
                <select 
                  value={selectedCollege}
                  onChange={(e) => setSelectedCollege(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm cursor-pointer"
                >
                  <option value="all">All Colleges</option>
                  {[...new Set(placementscore?.map(s => s.college_id?._id))].map(collegeId => {
                    const college = placementscore.find(s => s.college_id?._id === collegeId)?.college_id;
                    return (
                      <option key={collegeId} value={collegeId}>
                        {college?.college_name}
                      </option>
                    );
                  })}
                </select>

                {/* Year Filter */}
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm cursor-pointer"
                >
                  <option value="all">All Years</option>
                  {[...new Set(placementscore?.map(s => s.year))].sort((a, b) => b - a).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>

                {/* Sort */}
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm cursor-pointer"
                >
                  <option value="recent">Most Recent</option>
                  <option value="score_high">Highest Score</option>
                  <option value="score_low">Lowest Score</option>
                  <option value="year">Year</option>
                  <option value="college">College Name</option>
                </select>

                {/* Add Button */}
                <Link
                  to="/admin/placement_score/add"
                  className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg text-sm"
                >
                  <FiPlus className="text-base" />
                  <span>Add Score</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Placement Scores Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredScores?.map((score) => (
              <div
                key={score?._id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-purple-300 transition-all duration-300 overflow-hidden"
              >
                {/* Header with Score Color */}
                <div className={`h-2 ${getScoreColor(score?.placementScore)}`}></div>
                
                <div className="p-5">
                  {/* College Header */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <FiHome className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg group-hover:text-purple-600 truncate">
                        {score?.college_id?.college_name}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        <FiCalendar className="w-3 h-3 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {score?.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Placement Score */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FiUsers className="text-purple-500" />
                        <span className="text-sm font-semibold text-gray-700">Students Placed</span>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getScoreColor(score?.placementScore)} text-white`}>
                        {getScoreLevel(score?.placementScore)}
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 text-center py-3 bg-gray-50 rounded-xl border border-gray-200">
                      {formatNumber(score?.placementScore)}
                      <span className="text-sm font-normal text-gray-500 ml-1">students</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-5">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Placement Scale</span>
                      <span className="font-medium">{Math.min(score?.placementScore, 1000)}+</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ease-out ${getScoreColor(score?.placementScore)}`}
                        style={{ width: `${Math.min((score?.placementScore / 1000) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0</span>
                      <span>1000</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => delete_handler(score)}
                      className="flex-1 bg-white hover:bg-red-50 text-red-600 border border-red-300 hover:border-red-400 text-center py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm"
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
          {filteredScores?.length === 0 && placementscore?.length > 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="text-yellow-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No placement data found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                <button 
                  onClick={() => { 
                    setSearchTerm(''); 
                    setSelectedCollege('all'); 
                    setSelectedYear('all'); 
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
                  Are you sure you want to delete placement data for <strong>{scoreToDelete?.college_id?.college_name}</strong> ({scoreToDelete?.year})? This action cannot be undone.
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
                      'Delete Record'
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
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiBarChart2 className="text-purple-600 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Placement Data</h2>
            <p className="text-gray-600 mb-6">Start tracking student placement statistics</p>
            <Link
              to="/admin/placement_score/add"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center space-x-2 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <FiPlus className="text-lg" />
              <span>Add First Record</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
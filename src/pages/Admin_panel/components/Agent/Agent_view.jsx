import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../../../Context_holder';
import axios from 'axios';
import {
  FiTrash2,
  FiPlus,
  FiSearch,
  FiUser,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiEye,
  FiAlertTriangle,
} from 'react-icons/fi';

export default function Agent_view() {
  const { agent_fetch, agent, token, notify, admin } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState(null);

  // Filter agents based on search and filters
  useEffect(() => {
    if (agent) {
     let filtered = agent.filter((agentItem) => {
  const phoneStr = agentItem.phone ? String(agentItem.phone) : '';
  return (
    agentItem.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agentItem.college_id?.college_name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    phoneStr.includes(searchTerm)
  );
});


      if (selectedCollege !== 'all') {
        filtered = filtered.filter(
          (agentItem) => agentItem.college_id?._id === selectedCollege
        );
      }

      filtered = filtered.sort((a, b) => {
        switch (sortBy) {
          case 'recent':
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 'name':
            return a.name?.localeCompare(b.name);
          case 'college':
            return a.college_id?.college_name?.localeCompare(
              b.college_id?.college_name
            );
          default:
            return 0;
        }
      });

      setFilteredAgents(filtered);
    }
  }, [agent, searchTerm, selectedCollege, sortBy]);

  const delete_handler = (agent) => {
    setAgentToDelete(agent);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    if (!agentToDelete) return;

    try {
      const success = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_AGENT_URL}delete/${agentToDelete._id}/${agentToDelete.Profile}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      notify(success.data.msg, success.data.status);

      if (success.data.status === 1) {
        if (!admin) return;

        if (admin?.role === 'subadmin' && admin?.collage_id) {
          agent_fetch(null, admin?.collage_id);
        } else if (admin?.role === 'superadmin') {
          agent_fetch(null, null);
        }
      }
    } catch (error) {
      console.error(error);
      notify('Error deleting agent', 0);
    } finally {
      setShowDeletePopup(false);
      setAgentToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setAgentToDelete(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!admin) return;

      setIsLoading(true);

      if (admin?.role === 'subadmin' && admin?.collage_id) {
        await agent_fetch(null, admin?.collage_id);
      } else if (admin?.role === 'superadmin') {
        await agent_fetch(null, null);
      }

      setIsLoading(false);
      setTimeout(() => setIsVisible(true), 100);
    };

    fetchData();
  }, [admin]);

  const getCollegeColor = (collegeId) => {
    const colors = [
      'bg-gradient-to-r from-blue-500 to-cyan-600',
      'bg-gradient-to-r from-purple-500 to-indigo-600',
      'bg-gradient-to-r from-emerald-500 to-teal-600',
      'bg-gradient-to-r from-orange-500 to-red-600',
      'bg-gradient-to-r from-pink-500 to-rose-600',
      'bg-gradient-to-r from-violet-500 to-purple-600',
    ];
    const index =
      collegeId?.split('')?.reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      colors.length;
    return colors[index] || 'bg-gradient-to-r from-gray-500 to-gray-600';
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'A';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="h-8 bg-gray-200 rounded-xl w-3/4 max-w-xs mx-auto mb-3 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 max-w-sm mx-auto animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 mb-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white/80 rounded-2xl p-4 shadow-lg border border-white/20 animate-pulse"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-xl mr-3"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 animate-pulse"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-14 h-14 bg-gray-300 rounded-xl"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-20"></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-6 px-4">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div
          className={`text-center mb-8 transform transition-all duration-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-2xl mb-4">
            <FiUser className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Agents Directory
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
            Manage and organize all registered agents across colleges
          </p>
        </div>

        {/* Stats Cards */}
        <div
          className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 mb-6 transform transition-all duration-500 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                <FiUser className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-gray-800">
                  {filteredAgents.length}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Showing</div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                <FiMapPin className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-gray-800">
                  {new Set(agent?.map((a) => a.college_id?._id)).size || 0}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Colleges</div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                <FiPhone className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-gray-800">
                  {agent?.filter((a) => a.phone).length || 0}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  With Phone
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                <FiCalendar className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-gray-800">
                  {agent?.filter((a) => a.Profile).length || 0}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  With Profile
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Controls Card */}
        <div
          className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 mb-6 transform transition-all duration-500 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="relative w-full">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-base sm:text-lg" />
              <input
                type="text"
                placeholder="Search agents by name, college, or phone..."
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter and Sort */}
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                className="w-full sm:flex-1 px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer text-sm sm:text-base"
              >
                <option value="all">All Colleges</option>
                {[...new Set(agent?.map((a) => a.college_id?._id))].map(
                  (collegeId) => {
                    const college = agent.find(
                      (a) => a.college_id?._id === collegeId
                    )?.college_id;
                    return (
                      <option key={collegeId} value={collegeId}>
                        {college?.college_name}
                      </option>
                    );
                  }
                )}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-36 px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer text-sm sm:text-base"
              >
                <option value="recent">Most Recent</option>
                <option value="name">Name A-Z</option>
                <option value="college">College Name</option>
              </select>
            </div>

            {/* Add Button */}
            <Link
              to="/admin/agent/add"
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <FiPlus className="text-base sm:text-lg" />
              <span>Add Agent</span>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        {filteredAgents.length > 0 ? (
          <div
            className={`grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3 transform transition-all duration-500 delay-400 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {filteredAgents.map((agentItem) => (
              <div
                key={agentItem._id}
                className="group bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 overflow-hidden"
              >
                {/* College Color Header */}
                <div
                  className={`h-1.5 sm:h-2 ${getCollegeColor(
                    agentItem?.college_id?._id
                  )}`}
                ></div>

                <div className="p-4 sm:p-6">
                  {/* Agent Header */}
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      {agentItem.Profile ? (
                        <img
                          src={`${process.env.REACT_APP_API_BASE_URL}${agentItem.Profile}`}
                          alt={agentItem.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl border-2 border-white shadow-md object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-md">
                          {getInitial(agentItem.name)}
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {agentItem.name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span
                            className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getCollegeColor(
                              agentItem?.college_id?._id
                            )} text-white shadow-sm`}
                          >
                            {agentItem.college_id?.college_name || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Agent Details */}
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <div className="flex items-center space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <FiPhone className="text-blue-500 flex-shrink-0 text-base sm:text-lg" />
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-gray-700">
                          Phone
                        </div>
                        <div className="text-gray-900 text-sm sm:text-base font-semibold">
                          {agentItem.phone}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <FiMapPin className="text-green-500 flex-shrink-0 text-base sm:text-lg" />
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-gray-700">
                          College
                        </div>
                        <div className="text-gray-900 text-sm sm:text-base">
                          {agentItem.college_id?.college_name || 'N/A'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <FiCalendar className="text-purple-500 flex-shrink-0 text-base sm:text-lg" />
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-gray-700">
                          Added
                        </div>
                        <div className="text-gray-900 text-sm sm:text-base">
                          {formatDate(agentItem.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    {/* <Link
                      to={`/agent_details/${agentItem._id}`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 sm:py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-lg text-sm sm:text-base"
                    >
                      <FiEye className="text-sm sm:text-base" />
                      <span>View</span>
                    </Link> */}
                    <button
                      onClick={() => delete_handler(agentItem)}
                      className="flex-1 bg-white hover:bg-red-50 text-red-600 border border-red-300 hover:border-red-400 text-center py-2 sm:py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-lg text-sm sm:text-base"
                    >
                      <FiTrash2 className="text-sm sm:text-base" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`text-center py-12 sm:py-16 transform transition-all duration-500 delay-400 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sm:p-12 max-w-md mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <FiUser className="text-blue-600 text-2xl sm:text-3xl" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                {searchTerm || selectedCollege !== 'all'
                  ? 'No Agents Found'
                  : 'No Agents Yet'}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                {searchTerm || selectedCollege !== 'all'
                  ? 'Try adjusting your search terms or filters to find agents.'
                  : 'Start by adding your first agent to the system.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {(searchTerm || selectedCollege !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCollege('all');
                    }}
                    className="bg-gray-900 hover:bg-black text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg text-sm sm:text-base"
                  >
                    Clear Filters
                  </button>
                )}
                <Link
                  to="/agent_add"
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold inline-flex items-center justify-center space-x-2 transition-all duration-200 hover:shadow-lg text-sm sm:text-base"
                >
                  <FiPlus className="text-base sm:text-lg" />
                  <span>Add First Agent</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Popup */}
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ${
            showDeletePopup ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md mx-4 border border-gray-200 transform transition-all duration-300 scale-95 sm:scale-100">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center">
                <FiAlertTriangle className="text-red-600 text-2xl sm:text-3xl" />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-3 sm:mb-4">
              Delete Agent?
            </h3>
            <p className="text-gray-600 text-sm sm:text-base text-center mb-4 sm:mb-6">
              Are you sure you want to delete{' '}
              <strong>{agentToDelete?.name}</strong>? This action cannot be
              undone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 sm:py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg text-sm sm:text-base"
              >
                Delete Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
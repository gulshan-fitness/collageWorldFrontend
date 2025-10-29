import axios from 'axios';
import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Context } from '../../../../Context_holder';
import { Link } from 'react-router-dom';
import { 
  FiEdit, 
  FiTrash2, 
  FiPlus, 
  FiSearch,
  FiCalendar,
  FiMapPin,
  FiFilter,
  FiX,
  FiChevronDown,
  FiAlertTriangle,
  FiClock,
  FiEye,
  FiHash
} from 'react-icons/fi';

export default function Event_view() {
  const { event_fetch, event, token, notify, admin } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [isLoading, setIsLoading] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Move filterByDate function before useMemo
  const filterByDate = (eventItem, filter) => {
    if (filter === 'all') return true;
    
    const eventDate = new Date(eventItem.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const eventTime = eventDate.getTime();
    const todayTime = today.getTime();
    const diffTime = eventTime - todayTime;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    switch (filter) {
      case 'today':
        return diffDays === 0;
      case 'week':
        return diffDays >= 0 && diffDays <= 7;
      case 'month':
        return diffDays >= 0 && diffDays <= 30;
      case 'past':
        return diffDays < 0;
      case 'upcoming':
        return diffDays >= 0;
      default:
        return true;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!admin) return;

      if (admin?.role === "subadmin" && admin?.collage_id) {
        await event_fetch(null, admin?.collage_id);
      } else if (admin?.role === "superadmin") {
        await event_fetch(null, null);
      }
      
      setTimeout(() => setIsLoading(false), 800);
    };

    fetchData();
  }, [admin]);

  // Get unique values for filters
  const uniqueColleges = useMemo(() => {
    return [...new Set(event?.map(e => e.college_id?._id))].map(collegeId => {
      const college = event.find(e => e.college_id?._id === collegeId)?.college_id;
      return { id: collegeId, name: college?.college_name };
    });
  }, [event]);

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    if (!event?.length) return [];

    let filtered = event.filter(eventItem => {
      // Search term filter
      const matchesSearch = 
        eventItem?.heading?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        eventItem?.college_id?.college_name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        eventItem?.location?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        eventItem?.description?.replace(/<[^>]*>/g, '')?.toLowerCase()?.includes(searchTerm.toLowerCase());

      // College filter
      const matchesCollege = selectedCollege === 'all' || eventItem?.college_id?._id === selectedCollege;

      // Date filter
      const matchesDate = filterByDate(eventItem, selectedDate);

      return matchesSearch && matchesCollege && matchesDate;
    });

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.date) - new Date(a.date);
        case 'upcoming':
          return new Date(a.date) - new Date(b.date);
        case 'title':
          return a.heading?.localeCompare(b.heading);
        case 'college':
          return a.college_id?.college_name?.localeCompare(b.college_id?.college_name);
        case 'location':
          return a.location?.localeCompare(b.location);
        default:
          return 0;
      }
    });

    return filtered;
  }, [event, searchTerm, selectedCollege, selectedDate, sortBy]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCollege('all');
    setSelectedDate('all');
    setSortBy('recent');
  };

  const hasActiveFilters = searchTerm || selectedCollege !== 'all' || selectedDate !== 'all';

  const delete_handler = (event) => {
    setEventToDelete(event);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    if (!eventToDelete) return;

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_EVENT_URL}delete/${eventToDelete._id}/${eventToDelete.logo}`,
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
          await event_fetch(null, admin?.collage_id);
        } else if (admin?.role === "superadmin") {
          await event_fetch(null, null);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      notify('Failed to delete event', 0);
    } finally {
      setShowDeletePopup(false);
      setEventToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setEventToDelete(null);
  };

  const getCollegeColor = (collegeId) => {
    const colors = [
      'bg-gradient-to-r from-amber-400 to-orange-500',
      'bg-gradient-to-r from-red-400 to-pink-500',
      'bg-gradient-to-r from-green-400 to-emerald-500',
      'bg-gradient-to-r from-blue-400 to-cyan-500',
      'bg-gradient-to-r from-purple-400 to-indigo-500',
      'bg-gradient-to-r from-teal-400 to-blue-500'
    ];
    const index = collegeId?.split('')?.reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index] || 'bg-gradient-to-r from-gray-400 to-gray-500';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isUpcomingEvent = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    return eventDate >= today;
  };

  const getContentPreview = (htmlContent) => {
    const text = htmlContent?.replace(/<[^>]*>/g, '') || 'No description available';
    return text.length > 100 ? text.substring(0, 100) + '...' : text;
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

  if (event?.length !== 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Events Management
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Manage and organize all your college events and activities
            </p>
          </div>

          {/* Stats and Controls Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-8">
  {/* Top Section - Stats + Add Button */}
  <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
    
    {/* Quick Stats */}
    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
      {/* Showing */}
      <div className="text-center min-w-[80px]">
        <div className="text-xl sm:text-2xl font-bold text-amber-600">{filteredEvents.length}</div>
        <div className="text-xs sm:text-sm text-gray-500">Showing</div>
      </div>

      <div className="hidden sm:block h-8 w-px bg-gray-300"></div>

      {/* Total Events */}
      <div className="text-center min-w-[80px]">
        <div className="text-lg sm:text-xl font-semibold text-gray-700">{event?.length || 0}</div>
        <div className="text-xs sm:text-sm text-gray-500">Total Events</div>
      </div>

      <div className="hidden sm:block h-8 w-px bg-gray-300"></div>

      {/* Colleges */}
      <div className="text-center min-w-[80px]">
        <div className="text-lg sm:text-xl font-semibold text-gray-700">{uniqueColleges.length}</div>
        <div className="text-xs sm:text-sm text-gray-500">Colleges</div>
      </div>

      <div className="hidden sm:block h-8 w-px bg-gray-300"></div>

      {/* Upcoming */}
      <div className="text-center min-w-[80px]">
        <div className="text-lg sm:text-xl font-semibold text-gray-700">
          {event?.filter(e => isUpcomingEvent(e.date)).length}
        </div>
        <div className="text-xs sm:text-sm text-gray-500">Upcoming</div>
      </div>
    </div>

    {/* Add Button */}
    <Link
      to="/admin/event/add"
      className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg"
    >
      <FiPlus className="text-lg" />
      <span>Create Event</span>
    </Link>
  </div>

  {/* Search + Filter + Sort */}
  <div className="mt-6">
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
      
      {/* Search Bar */}
      <div className="flex-1 relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search events..."
          className="w-full pl-10 pr-9 py-2.5 sm:py-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 text-sm sm:text-base"
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

      {/* Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-4 py-2.5 sm:py-3 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all duration-200"
      >
        <FiFilter className="text-base sm:text-lg" />
        <span>Filters</span>
        <FiChevronDown className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
      </button>

      {/* Sort Dropdown */}
      <select 
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full sm:w-48 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none cursor-pointer text-sm sm:text-base"
      >
        <option value="recent">Most Recent</option>
        <option value="upcoming">Upcoming First</option>
        <option value="title">Title A-Z</option>
        <option value="college">College Name</option>
        <option value="location">Location</option>
      </select>
    </div>

    {/* Filters Section */}
    {showFilters && (
      <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* College Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by College</label>
            <select 
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
            >
              <option value="all">All Colleges</option>
              {uniqueColleges.map(college => (
                <option key={college.id} value={college.id}>
                  {college.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
            >
              <option value="all">All Events</option>
              <option value="upcoming">Upcoming</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="past">Past</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
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

              {selectedDate !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 text-xs sm:text-sm rounded-full">
                  Date: {selectedDate}
                  <button onClick={() => setSelectedDate('all')} className="ml-1 text-orange-600 hover:text-orange-800">
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
    )}
  </div>
</div>


          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredEvents.length} of {event?.length || 0} events
              {hasActiveFilters && ' (filtered)'}
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEvents.map((eventItem, index) => (
              <div
                key={eventItem?._id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-amber-300 transition-all duration-300 overflow-hidden"
              >
                
                {/* Event Header with College Color */}
                <div className={`h-3 ${getCollegeColor(eventItem?.college_id?._id)}`}></div>
                
                <div className="p-6">
                  
                  {/* Event Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={process.env.REACT_APP_API_IMAGE_URL + "event_image/" + eventItem?.logo}
                        alt="Event"
                        className="w-14 h-14 rounded-lg border-2 border-white shadow-md object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                          {eventItem?.heading}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCollegeColor(eventItem?.college_id?._id)} text-white`}>
                            {eventItem?.college_id?.college_name}
                          </span>
                          {!isUpcomingEvent(eventItem?.date) && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Past Event
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-3 mb-6">
                    
                    {/* Date and Time */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <FiCalendar className="text-amber-500 flex-shrink-0" />
                        <span className="font-medium">{formatDate(eventItem?.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <FiClock className="text-gray-400" />
                        <span>{eventItem?.time}</span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FiMapPin className="text-red-500 flex-shrink-0" />
                      <span className="truncate">{eventItem?.location}</span>
                    </div>

                    {/* Description Preview */}
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <FiHash className="text-green-500 flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-700">Description</span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {getContentPreview(eventItem?.description)}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                  
                    
                    <button
                      onClick={() => delete_handler(eventItem)}
                      className="flex-1 bg-white hover:bg-red-50 text-red-600 border border-red-300 hover:border-red-400 text-center py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <FiTrash2 className="text-sm flex-shrink-0" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty Search State */}
          {filteredEvents.length === 0 && event?.length > 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSearch className="text-yellow-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
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
                  Are you sure you want to delete this event? This action cannot be undone.
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
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCalendar className="text-amber-600 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Events Yet</h2>
            <p className="text-gray-600 mb-6">Start by creating your first college event</p>
            <Link
              to="/admin/event/add"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl font-semibold inline-flex items-center space-x-2 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <FiPlus className="text-lg" />
              <span>Create First Event</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
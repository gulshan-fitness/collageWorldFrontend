import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../../../../Context_holder';
import { useNavigate } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  PhoneIcon, 
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  UserGroupIcon,
  StarIcon,
  XMarkIcon,
  FunnelIcon,
  ClockIcon,
  MapPinIcon,
  CheckBadgeIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import Select from 'react-select';
import BookCounselling from '../../../../../components/common/BookCounselling';

const CounsellingRoom = () => {
  const { agent_fetch, agent, setselected_college, college_fetch, selected_college, colleges } = useContext(Context);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);

  // Debounce search term
  useEffect(() => {
    if (searchTerm) {
      setIsSearching(true);
    }
    
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const query = {}

    if (selected_college) {
      query.college_id = selected_college?.value
    }

    if (debouncedSearchTerm) {
      query.name = debouncedSearchTerm
    }

    agent_fetch(null,null, new URLSearchParams(query).toString())
  }, [selected_college, debouncedSearchTerm]);

  useEffect(() => {
    college_fetch()
    setselected_college(null)
  }, [])

  useEffect(() => {
    setLoading(false)
  }, [agent]);

  const handleContactAgent = (agentData) => {
    const phoneNumber = agentData.phone;
    const message = `Hi ${agentData.name}, I would like to know more about ${agentData.college_id?.college_name || 'your college'} admission process.`;
    const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallAgent = (phone) => {
    window.open(`tel:+91${phone}`, '_self');
  };

  const clearSearch = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
    setselected_college(null);
  };

  const handleViewAllServices = () => {
    setShowAllServices(true);
  };

  // Custom styles for react-select
  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '48px',
      border: state.isFocused ? '2px solid #3B82F6' : '1px solid #D1D5DB',
      borderRadius: '0.5rem',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none',
      '&:hover': {
        border: '1px solid #9CA3AF'
      }
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9CA3AF',
      fontSize: '14px'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3B82F6' : state.isFocused ? '#EFF6FF' : 'white',
      color: state.isSelected ? 'white' : '#374151',
      padding: '12px 16px'
    })
  };

  if (loading) {
    return (
      <div className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
              <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-400 mx-auto animate-ping"></div>
            </div>
            <p className="mt-6 text-lg text-gray-600 font-medium">Loading counsellors...</p>
            <p className="mt-2 text-sm text-gray-500">Please wait while we fetch the best counsellors for you</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-blue-600 rounded-full mr-4 shadow-lg">
              <UserGroupIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-5xl font-bold text-gray-900 mb-2">Counselling Room</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto"></div>
            </div>
          </div>
          
          <p className="text-md md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
            Connect with <span className="font-semibold text-blue-600">expert counsellors</span> from multiple colleges. 
            Get personalized guidance for your admission journey and career planning.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <AcademicCapIcon className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-medium">Expert Guidance</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <ChatBubbleLeftRightIcon className="h-5 w-5 text-green-600 mr-2" />
              <span className="font-medium">Instant Chat</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <PhoneIcon className="h-5 w-5 text-purple-600 mr-2" />
              <span className="font-medium">Direct Call</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <ClockIcon className="h-5 w-5 text-orange-600 mr-2" />
              <span className="font-medium">24/7 Available</span>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filter Section */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <FunnelIcon className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Find Your Perfect Counsellor</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Enhanced Search Bar */}
              <div className="lg:col-span-2 relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Counsellor
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    {isSearching ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
                    ) : (
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Search by counsellor name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-200"
                  />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
                {isSearching && (
                  <p className="mt-2 text-sm text-blue-600 flex items-center">
                    <div className="animate-pulse mr-2">🔍</div>
                    Searching counsellors...
                  </p>
                )}
              </div>

              {/* Enhanced College Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by College
                </label>
                <Select
                  value={selected_college}
                  onChange={(e) => setselected_college(e)}
                  options={colleges?.map(data => ({ 
                    value: data._id, 
                    label: data.college_name 
                  }))}
                  placeholder="Select college..."
                  isClearable
                  styles={selectStyles}
                  className="text-sm"
                />
              </div>
            </div>

            {/* Results Summary and Clear Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 pt-6 border-t border-gray-100">
              <div className="text-sm text-gray-600 mb-4 sm:mb-0">
                <span className="font-medium text-gray-900">
                  {agent?.length || 0} counsellor{(agent?.length || 0) !== 1 ? 's' : ''} found
                </span>
                {searchTerm && (
                  <span className="ml-2">
                    for "<span className="font-medium text-blue-600">{searchTerm}</span>"
                  </span>
                )}
                {selected_college && (
                  <span className="ml-2">
                    from <span className="font-medium text-blue-600">{selected_college.label}</span>
                  </span>
                )}
              </div>
              
              {(searchTerm || selected_college) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  <XMarkIcon className="h-4 w-4 mr-1" />
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Agents Grid */}
        {agent?.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserGroupIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Counsellors Found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selected_college 
                  ? 'Try adjusting your search criteria or browse all available counsellors.' 
                  : 'No counsellors are currently available. Please check back later.'}
              </p>
              {(searchTerm || selected_college) && (
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  View All Counsellors
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {agent?.map((agentData) => (
              <div
                key={agentData._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
              >
                {/* Enhanced Agent Profile Image */}
                <div className="relative w-20 h-20  bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
                  {agentData.Profile ? (
                    <img
                      src={`${process.env.REACT_APP_API_BASE_URL}image/agent_profile/${agentData?.Profile}`}
                      alt={agentData.name}
                      className="w-full h-full  rounded-2xl object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className={`${agentData.Profile ? 'hidden' : 'flex'} absolute inset-0 items-center justify-center`}
                    style={{ display: agentData.Profile ? 'none' : 'flex' }}
                  >
                    <div className="text-center">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-xl border-4 border-blue-100">
                        <span className="text-3xl font-bold text-blue-600">
                          {agentData.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Online Status Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span>Online</span>
                    </div>
                  </div>

                  {/* Verified Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
                      <CheckBadgeIcon className="w-3 h-3" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Agent Info */}
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                      {agentData.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 font-medium">
                      Senior Counsellor at {agentData.college_id?.college_name || 'College'}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <PhoneIcon className="h-4 w-4 mr-2 text-blue-600" />
                      <span>+91 {agentData.phone}</span>
                    </div>
                    {agentData.college_id?.city && (
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPinIcon className="h-4 w-4 mr-2 text-green-600" />
                        <span>{agentData.college_id.city}</span>
                      </div>
                    )}
                  </div>

                  {/* Enhanced College Info */}
                  {agentData.college_id && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                      <div className="flex items-center mb-3">
                        <AcademicCapIcon className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-sm font-semibold text-gray-900">College Details</span>
                      </div>
                      <p className="text-sm text-gray-700 font-medium mb-1">{agentData.college_id.college_name}</p>
                      {agentData.college_id.city && (
                        <p className="text-xs text-gray-600 flex items-center">
                          <MapPinIcon className="h-3 w-3 mr-1" />
                          {agentData.college_id.city}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Enhanced Action Buttons */}
                  <div className="flex space-x-3 mb-6">
                    <button
                      onClick={() => handleContactAgent(agentData)}
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
                      WhatsApp
                    </button>
                    <button
                      onClick={() => handleCallAgent(agentData.phone)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <PhoneIcon className="h-4 w-4 mr-2" />
                      Call Now
                    </button>
                  </div>

                  {/* Enhanced Expertise Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full border border-blue-200">
                      Admission Guidance
                    </span>
                    <span className="px-3 py-1.5 bg-purple-100 text-purple-800 text-xs font-medium rounded-full border border-purple-200">
                      Career Planning
                    </span>
                    <span className="px-3 py-1.5 bg-green-100 text-green-800 text-xs font-medium rounded-full border border-green-200">
                      Scholarship Info
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Enhanced Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Still Need More Help?
            </h3>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              Our expert counsellors are here to guide you through every step of your admission process. 
              Get personalized advice and make informed decisions about your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
              >
                <CalendarIcon className="h-5 w-5 mr-2" />
                Schedule a Free Consultation
              </button>
              <button 
                onClick={handleViewAllServices}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center"
              >
                View All Services
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Book Counselling Modal */}
      <BookCounselling 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />

      {/* All Services Modal */}
      {showAllServices && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <AcademicCapIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">All Educational Services</h2>
                    <p className="text-sm text-gray-600">Comprehensive support for your educational journey</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAllServices(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Admission Guidance */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                      <AcademicCapIcon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Admission Guidance</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center"><CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />College Selection</li>
                    <li className="flex items-center"><CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />Application Process</li>
                    <li className="flex items-center"><CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />Document Verification</li>
                    <li className="flex items-center"><CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />Entrance Exam Prep</li>
                  </ul>
                </div>

                {/* Career Counselling */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                      <UserGroupIcon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Career Counselling</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center"><CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />Career Assessment</li>
                    <li className="flex items-center"><CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />Industry Insights</li>
                    <li className="flex items-center"><CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />Skill Development</li>
                    <li className="flex items-center"><CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />Job Market Trends</li>
                  </ul>
                </div>

                {/* Scholarship Assistance */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                      <StarIcon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Scholarship Assistance</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center"><CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />Scholarship Search</li>
                    <li className="flex items-center"><CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />Application Support</li>
                    <li className="flex items-center"><CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />Financial Planning</li>
                    <li className="flex items-center"><CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />Merit-based Aid</li>
                  </ul>
                </div>

                {/* Exam Preparation */}
                <div className="bg-gradient-to-br from-orange-50 to-red-100 p-6 rounded-xl border border-orange-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mr-4">
                      <CalendarIcon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Exam Preparation</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center"><CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />Study Materials</li>
                    <li className="flex items-center"><CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />Mock Tests</li>
                    <li className="flex items-center"><CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />Time Management</li>
                    <li className="flex items-center"><CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />Expert Guidance</li>
                  </ul>
                </div>

                {/* Study Abroad */}
                <div className="bg-gradient-to-br from-teal-50 to-cyan-100 p-6 rounded-xl border border-teal-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mr-4">
                      <MapPinIcon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Study Abroad</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center"><CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />University Selection</li>
                    <li className="flex items-center"><CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />Visa Assistance</li>
                    <li className="flex items-center"><CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />IELTS/TOEFL Prep</li>
                    <li className="flex items-center"><CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />Pre-departure Support</li>
                  </ul>
                </div>

                {/* Online Learning */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-100 p-6 rounded-xl border border-indigo-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mr-4">
                      <ClockIcon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Online Learning</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center"><CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />Course Recommendations</li>
                    <li className="flex items-center"><CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />Platform Guidance</li>
                    <li className="flex items-center"><CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />Certification Support</li>
                    <li className="flex items-center"><CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />Progress Tracking</li>
                  </ul>
                </div>

              </div>

              {/* Contact Section */}
              <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white text-center">
                <h3 className="text-xl font-bold mb-2">Need Personalized Assistance?</h3>
                <p className="text-blue-100 mb-4">Our expert counsellors are ready to help you with any of these services</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => {
                      setShowAllServices(false);
                      setIsBookingOpen(true);
                    }}
                    className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
                  >
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    Book Free Consultation
                  </button>
                  <button 
                    onClick={() => setShowAllServices(false)}
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center"
                  >
                    <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                    Chat with Counsellor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CounsellingRoom;

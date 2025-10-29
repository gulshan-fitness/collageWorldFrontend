import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../../Context_holder';
import { useSearchParams } from 'react-router-dom';
import { 
  FaTimes, 
  FaSearch, 
  FaFilter, 
  FaDownload, 
  FaFileExcel, 
  FaEye, 
  FaCheck, 
  FaClock,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaUniversity,
  FaComment,
  FaEdit,
  FaSync,
  FaStar,
  FaCalendarAlt,
  FaIdCard,
  FaChartLine,
  FaBell,
  FaCrown,
  FaShield,
  FaRocket
} from 'react-icons/fa';
import { FiMessageSquare, FiUserCheck, FiTrendingUp } from 'react-icons/fi';
import Select from 'react-select';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import * as XLSX from 'xlsx';

const states = require("../../../Json_files/States.json");
const cities = require("../../../Json_files/Cities.json");

const EnquiriesDetails = () => {
  const { 
    users_fetch, 
    allusers, 
    course_fetch, 
    course, 
    college_state, 
    setcollege_state, 
    handlestateInputChange, 
    statemenuIsOpen, 
    college_city, 
    setcollege_city, 
    handlecityInputChange, 
    citymenuIsOpen, 
    notify 
  } = useContext(Context); 

  const [SearchTerm, setSearchTerm] = useState("");
  const [Searched_college_name, setSearched_college_name] = useState("");
  const [enquiry_time, setenquiry_time] = useState("past24Hours");
  const [searchParams, setSearchParams] = useSearchParams();
  const [popup_status, setpopup_status] = useState(false);
  const [current_user_detals, setcurrent_user_detals] = useState(null);
  const [selected_course, setselected_course] = useState(null);
  const [enquiry_date, setenquiry_date] = useState("");
  const [user_id, setuser_id] = useState("");
  const [user_response_value, setuser_response_value] = useState("");
  const [input_pop_up, setinput_pop_up] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  // Stats calculation
  const stats = {
    total: allusers?.users?.length || 0,
    pending: allusers?.users?.filter(user => !user?.checked)?.length || 0,
    completed: allusers?.users?.filter(user => user?.checked)?.length || 0,
    withResponse: allusers?.users?.filter(user => user?.user_response)?.length || 0
  };

  useEffect(() => {
    course_fetch?.();
  }, []);

  useEffect(() => {
    const query = {};
    if (enquiry_time !== "") query.enquiry_time = enquiry_time;
    if (Searched_college_name !== "") query.college_name = Searched_college_name;
    if (selected_course !== null) query.course = selected_course?.label;
    if (enquiry_date !== "") query.date = enquiry_date;
    if (college_state !== "") query.state = college_state?.label;
    if (college_city !== "") query.city = college_city?.label;

    setSearchParams?.(query);
    users_fetch?.(null, window.location.search?.toString());
  }, [enquiry_time, Searched_college_name, selected_course, enquiry_date, college_state, college_city]);

  const search_handler = () => {
    setSearched_college_name?.(SearchTerm);
  };

  const popUp_handler = (user) => {
    setcurrent_user_detals?.(user);
    setpopup_status?.(true);
  };

  const checked_handler = (id, status) => {
    axios.patch?.(
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_USER_URL + "checked_status_edit/" + id + "/" + status
    ).then?.((success) => {
      notify?.(success?.data?.msg, success?.data?.status);
      if (success?.data?.status === 1) {
        users_fetch?.(null, window.location.search?.toString());
        setuser_response_value?.("");
      }
    }).catch?.((error) => {
      console.log(error);
    });
  };

  const user_response_handler = () => {
    axios.patch?.(
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_USER_URL + "user_response_edit/" + user_id + "/" + user_response_value
    ).then?.((success) => {
      notify?.(success?.data?.msg, success?.data?.status);
      if (success?.data?.status === 1) {
        users_fetch?.(null, window.location.search?.toString());
        setinput_pop_up?.(false);
      }
    }).catch?.((error) => {
      console.log(error);
    });
  };

  const user_response_add = (id) => {
    setinput_pop_up?.(true);
    setuser_id?.(id);
    setuser_response_value?.(allusers?.users?.find(user => user?._id === id)?.user_response || "");
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize?.(18);
    doc.text?.("User Data", 14, 22);

    const tableColumn = ["Name", "Email", "Contact", "Course", "College Name", "Follow up", "User Response"];
    const tableRows = allusers?.users?.map?.(user => [
      user?.name,
      user?.email,
      user?.contact,
      user?.course,
      user?.college_name ?? "none",
      user?.checked === true ? "Done" : "Pending",
      user?.user_response === "" ? "none" : user?.user_response,
    ]);

    doc.autoTable?.(tableColumn, tableRows, { startY: 30 });
    doc.save?.("user-data.pdf");
  };

  const Reset_handler = () => {
    setenquiry_date?.("");
    setenquiry_time?.("");
    setSearched_college_name?.("");
    setselected_course?.(null);
    setSearchTerm?.("");
    setcollege_city?.("");
    setcollege_state?.("");
  };

  const exportToExcel = () => {
    const data = allusers?.users?.map?.(enquiry => ({
      ID: enquiry?._id,
      Name: enquiry?.name,
      Contact: enquiry?.contact,
      Email: enquiry?.email,
      Course: enquiry?.course,
      State: enquiry?.state,
      City: enquiry?.city,
      Enquiry: enquiry?.enquiry,
      College: enquiry?.college_name,
      checked: enquiry?.checked ? "done" : "pending",
      user_response: enquiry?.user_response,
    }));

    const wb = XLSX.utils.book_new?.();
    const ws = XLSX.utils.json_to_sheet?.(data);
    XLSX.utils.book_append_sheet?.(wb, ws, "Sheet1");
    XLSX.writeFile?.(wb, `Students Enquiry.xlsx`);
  };

  // Custom styles for react-select
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'white',
      borderColor: state?.isFocused ? '#6366f1' : '#e2e8f0',
      borderRadius: '12px',
      padding: '8px 12px',
      boxShadow: state?.isFocused ? '0 0 0 3px rgba(99, 102, 241, 0.1)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      borderWidth: '2px',
      '&:hover': {
        borderColor: '#6366f1'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state?.isSelected ? '#6366f1' : state?.isFocused ? '#f8fafc' : 'white',
      color: state?.isSelected ? 'white' : '#374151',
      padding: '12px 16px',
      fontSize: '14px',
      fontWeight: '500'
    })
  };

  // Filter users based on active tab
  const filteredUsers = allusers?.users?.filter?.(user => {
    switch (activeTab) {
      case 'pending': return !user?.checked;
      case 'completed': return user?.checked;
      case 'withResponse': return user?.user_response;
      default: return true;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Premium Header */}
        <div className="mb-8">
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-8 text-white shadow-2xl mb-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="relative ">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                      <FaRocket className="w-6 h-6" />
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold">Enquiries Management</h1>
                  </div>
                  <p className="text-indigo-100 text-lg opacity-90">Premium dashboard for managing student enquiries and responses</p>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={generatePDF}
                    className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl"
                  >
                    <FaDownload className="w-4 h-4" />
                    <span>PDF</span>
                  </button>
                  <button
                    onClick={exportToExcel}
                    className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl"
                  >
                    <FaFileExcel className="w-4 h-4" />
                    <span>Excel</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Enquiries</p>
                  <p className="text-3xl font-bold text-gray-900">{stats?.total}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <FaUser className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-3 flex items-center text-sm text-green-600">
                <FiTrendingUp className="w-4 h-4 mr-1" />
                <span>All enquiries</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
                  <p className="text-3xl font-bold text-orange-600">{stats?.pending}</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <FaClock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-3 flex items-center text-sm text-orange-600">
                <FaBell className="w-4 h-4 mr-1" />
                <span>Requires attention</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{stats?.completed}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <FaCheck className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-3 flex items-center text-sm text-green-600">
                <FiUserCheck className="w-4 h-4 mr-1" />
                <span>Followed up</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">With Response</p>
                  <p className="text-3xl font-bold text-purple-600">{stats?.withResponse}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <FiMessageSquare className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-3 flex items-center text-sm text-purple-600">
                <FaStar className="w-4 h-4 mr-1" />
                <span>Responses sent</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2 mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Enquiries', count: stats?.total, icon: FaUser },
              { id: 'pending', label: 'Pending', count: stats?.pending, icon: FaClock },
              { id: 'completed', label: 'Completed', count: stats?.completed, icon: FaCheck },
              { id: 'withResponse', label: 'With Response', count: stats?.withResponse, icon: FiMessageSquare }
            ].map?.((tab) => {
              const Icon = tab?.icon;
              return (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab?.(tab?.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                    activeTab === tab?.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab?.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    activeTab === tab?.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab?.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <FaFilter className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
                <p className="text-sm text-gray-600">Refine your enquiry search</p>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setIsFilterOpen?.(!isFilterOpen)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                {isFilterOpen ? 'Collapse' : 'Expand'}
              </button>
              <button
                onClick={Reset_handler}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FaSync className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {isFilterOpen && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* College Search */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">College Search</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="text"
                      placeholder="Search college..."
                      value={SearchTerm}
                      onChange={(e) => setSearchTerm?.(e?.target?.value)}
                      className="pl-12 pr-4 py-3 w-full border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50/50"
                    />
                  </div>
                  <button
                    onClick={search_handler}
                    className="px-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    <FaSearch />
                  </button>
                </div>
              </div>

              {/* Time Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Time Period</label>
                <select
                  value={enquiry_time}
                  onChange={(e) => setenquiry_time?.(e?.target?.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50/50"
                >
                  <option value="anyTime">Any Time</option>
                  <option value="past24Hours">Last 24 hours</option>
                  <option value="pastWeek">Last 1 week</option>
                  <option value="pastMonth">Last 1 month</option>
                </select>
              </div>

              {/* Course Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Course</label>
                <Select
                  value={selected_course}
                  styles={customStyles}
                  onChange={setselected_course}
                  options={course?.filter?.((course, index, self) =>
                    index === self?.findIndex?.((c) => c?.courseName === course?.courseName)
                  )?.map?.(data => ({ value: data?._id, label: data?.courseName }))}
                  placeholder="Select course..."
                  isClearable
                />
              </div>

              {/* Date Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Specific Date</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="date"
                    value={enquiry_date}
                    onChange={(e) => setenquiry_date?.(e?.target?.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50/50"
                  />
                </div>
              </div>

              {/* State Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">State</label>
                <Select
                  value={college_state}
                  styles={customStyles}
                  onChange={setcollege_state}
                  onInputChange={handlestateInputChange}
                  menuIsOpen={statemenuIsOpen}
                  options={states?.map?.(data => ({ value: data?.name, label: data?.name }))}
                  placeholder="Select state..."
                  isClearable
                />
              </div>

              {/* City Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">City</label>
                <Select
                  value={college_city}
                  styles={customStyles}
                  onChange={setcollege_city}
                  onInputChange={handlecityInputChange}
                  menuIsOpen={citymenuIsOpen}
                  options={cities?.map?.(data => ({ value: data?.name, label: data?.name }))}
                  placeholder="Select city..."
                  isClearable
                />
              </div>
            </div>
          )}
        </div>

        {/* Enquiries Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-5 text-left text-gray-700 font-bold text-sm uppercase tracking-wider">Student Information</th>
                  <th className="px-6 py-5 text-left text-gray-700 font-bold text-sm uppercase tracking-wider">Course & College</th>
                  <th className="px-6 py-5 text-left text-gray-700 font-bold text-sm uppercase tracking-wider">Status & Response</th>
                  <th className="px-6 py-5 text-left text-gray-700 font-bold text-sm uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers?.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <FaUser className="text-5xl mb-4 text-gray-300" />
                        <p className="text-xl font-semibold text-gray-500 mb-2">No enquiries found</p>
                        <p className="text-sm">Try adjusting your filters or search criteria</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers?.map?.((user, index) => (
                    <tr key={user?.id} className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-300 group">
                      {/* Student Information */}
                      <td className="px-6 py-5">
                        <div className="flex items-start space-x-4">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                              {user?.name?.charAt?.(0)?.toUpperCase?.()}
                            </div>
                            {user?.checked && (
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                <FaCheck className="w-2 h-2 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors duration-200 truncate">
                                {user?.name}
                              </h3>
                              {user?.user_response && (
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
                                  <FiMessageSquare className="w-3 h-3" />
                                  Replied
                                </span>
                              )}
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center text-sm text-gray-600">
                                <FaEnvelope className="w-3 h-3 mr-2 text-gray-400" />
                                <span className="truncate">{user?.email}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <FaPhone className="w-3 h-3 mr-2 text-gray-400" />
                                {user?.contact}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <FaMapMarkerAlt className="w-3 h-3 mr-2 text-gray-400" />
                                {user?.state && user?.city ? `${user?.state}, ${user?.city}` : 'Location not specified'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Course & College */}
                      <td className="px-6 py-5">
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <FaGraduationCap className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Course</p>
                              <p className="font-semibold text-gray-900">{user?.course}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <FaUniversity className="w-4 h-4 text-purple-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">College</p>
                              <p className="font-semibold text-gray-900">{user?.college_name ?? "Not specified"}</p>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Status & Response */}
                      <td className="px-6 py-5">
                        <div className="space-y-3">
                          <button
                            onClick={() => checked_handler?.(user?._id, !user?.checked)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md ${
                              user?.checked 
                                ? 'bg-green-100 text-green-800 hover:bg-green-200 border border-green-200' 
                                : 'bg-orange-100 text-orange-800 hover:bg-orange-200 border border-orange-200'
                            }`}
                          >
                            {user?.checked ? <FaCheck className="w-4 h-4" /> : <FaClock className="w-4 h-4" />}
                            {user?.checked ? 'Completed' : 'Pending'}
                          </button>
                          
                          {/* User Response Display */}
                          {user?.user_response && (
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                  <FiMessageSquare className="w-4 h-4 text-green-600" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-semibold text-green-800 mb-2">Your Response</p>
                                  <p className="text-sm text-green-700 leading-relaxed whitespace-pre-wrap">
                                    {user?.user_response}
                                  </p>
                                  <p className="text-xs text-green-600 mt-2 font-medium">Response sent to student</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => popUp_handler?.(user)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group/btn"
                          >
                            <FaEye className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" />
                            View Details
                          </button>
                          <button
                            onClick={() => user_response_add?.(user?._id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                              user?.user_response
                                ? 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white'
                                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
                            }`}
                          >
                            <FaEdit className="w-4 h-4" />
                            {user?.user_response ? "Edit Response" : "Add Response"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Response Input Popup */}
        <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ${input_pop_up ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl mx-4 transform transition-all duration-300 scale-100 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <FiMessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Student Response</h3>
                  <p className="text-sm text-gray-600">Send a response to the student</p>
                </div>
              </div>
              <button
                onClick={() => setinput_pop_up?.(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200 text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Response</label>
                <textarea
                  rows="6"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none transition-all duration-200 bg-gray-50/50"
                  placeholder="Write your detailed response to the student here..."
                  value={user_response_value}
                  onChange={(e) => setuser_response_value?.(e?.target?.value)}
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setinput_pop_up?.(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={user_response_handler}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                >
                  Send Response
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enquiry Details Popup */}
        <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-300 ${popup_status ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <FaIdCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Enquiry Details</h2>
                  <p className="text-sm text-gray-600">Complete information about student enquiry</p>
                </div>
              </div>
              <button
                onClick={() => setpopup_status?.(false)}
                className="p-3 hover:bg-gray-100 rounded-xl transition-colors duration-200 text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 border-b pb-3">Personal Information</h3>
                <div className="space-y-4">
                  {[
                    { icon: FaUser, label: 'Full Name', value: current_user_detals?.name, color: 'blue' },
                    { icon: FaEnvelope, label: 'Email Address', value: current_user_detals?.email, color: 'green' },
                    { icon: FaPhone, label: 'Contact Number', value: current_user_detals?.contact, color: 'purple' },
                    { icon: FaMapMarkerAlt, label: 'Location', value: current_user_detals?.state && current_user_detals?.city ? `${current_user_detals?.state}, ${current_user_detals?.city}` : 'Not specified', color: 'orange' },
                    { icon: FaGraduationCap, label: 'Course Interested', value: current_user_detals?.course, color: 'indigo' },
                    { icon: FaUniversity, label: 'College', value: current_user_detals?.college_name ?? 'Not specified', color: 'red' }
                  ].map?.((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className={`w-12 h-12 bg-${item?.color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <item.icon className={`w-5 h-5 text-${item?.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600">{item?.label}</p>
                        <p className="font-semibold text-gray-900">{item?.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enquiry Content & Response */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 border-b pb-3">Enquiry Details</h3>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaComment className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-blue-800 mb-3">Student's Message</p>
                      <p className="text-gray-900 leading-relaxed whitespace-pre-wrap text-lg">
                        {current_user_detals?.enquiry ?? 'No enquiry message provided.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Response Section */}
                {current_user_detals?.user_response && (
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FiMessageSquare className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm font-semibold text-green-800">Your Response</p>
                          <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">SENT</span>
                        </div>
                        <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                          {current_user_detals?.user_response}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiriesDetails;
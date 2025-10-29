import { useContext, useEffect, useState } from "react";
import { Context } from "../../../../Context_holder";
import { 
  FaUser, FaBook, FaCreditCard, FaGift, FaBriefcase, FaUsers, 
  FaQuestionCircle, FaRegFileAlt, FaCommentDots, FaSignOutAlt, 
  FaTrashAlt, FaEdit, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaMale, FaFemale, FaHome, FaCalendar, FaGraduationCap,
  FaChevronRight, FaTimes, FaSave, FaStar, FaCrown, FaExclamationTriangle, FaBars
} from 'react-icons/fa';
import axios from "axios";
import Select from 'react-select';
import { Link, useNavigate } from "react-router-dom";

const states = require("../../../../Json_files/States.json");
const cities = require("../../../../Json_files/Cities.json");

export default function StudentProfile() {
  const { user, course_fetch, course, selected_city, selected_state, setselected_city, 
          search_cities, setselected_state, setsearch_cities, notify, setuser, 
          setusertoken, userlogout_handler } = useContext(Context);

  const [selected_course, setselected_course] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  useEffect(() => {
    course_fetch();
  }, []);

  useEffect(() => {
    const search_city = cities.filter(data => data.state === selected_state?.value);
    setsearch_cities(search_city);
  }, [selected_state]);

  const uniqueCourses = course.filter((course, index, self) =>
    index === self.findIndex((c) => c.courseName === course.courseName)
  );

  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  const handleCloseClick = () => {
    setIsEditOpen(false);
  };

  const edit_handler = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const contact = e.target.contact.value;
    const birth = e.target.birth.value;
    const gender = e.target.gender.value;
    const state = selected_state?.value;
    const city = selected_city?.value;
    const course = selected_course?.label;

    const data = {
      name: name,
      email: email,
      contact: contact,
      birth: birth,
      gender: gender,
      state: state,
      city: city,
      course: course,
    };

    axios
      .put(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_USER_URL}edit/${user?._id}`,
        data
      )
      .then((response) => {
        notify(response.data.msg, response.data.status);

        if (response.data.status === 1) {
          axios.post(process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_USER_URL + "login", { email: email })
            .then((success) => {
              if (success.data.status == 1) {
                setuser(success.data.user);
                setusertoken(success.data.token);
                localStorage.setItem("user", JSON.stringify(success.data.user));
                localStorage.setItem("usertoken", success.data.token);
              }
            })
            .catch((error) => { });

          setIsEditOpen(false);
          setselected_state(null);
          setselected_course(null);
          setselected_city(null);
        }
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const student_logout_handler = () => {
    userlogout_handler();
    navigate("/");
  };

  const user_account_delete = () => {
    axios.delete(process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_USER_URL + "delete/" + user?._id)
      .then((response) => {
        notify(response.data.msg, response.data.status);
        if (response.data.status === 1) {
          localStorage.removeItem("user");
          localStorage.removeItem("usertoken");
          setuser(null);
          setusertoken(null);
          navigate("/");
        }
      })
      .catch((error) => { });
    setShowDeleteModal(false);
  };

  const sidebarItems = [
    { label: 'Dashboard', icon: 'FaHome', isBold: true, url: "/" },
    { label: 'Profile Details', icon: 'FaUser', isBold: true, url: "#profile" },
    { label: 'My Courses', icon: 'FaBook', url: "#courses" },
    { label: 'Payments', icon: 'FaCreditCard', url: "#payments" },
    { label: 'Scholarships', icon: 'FaGift', url: "#scholarships" },
    { label: 'Career Opportunities', icon: 'FaBriefcase', url: "#career" },
    { label: 'Student Community', icon: 'FaUsers', url: "#community" },
    { label: 'Help Center', icon: 'FaQuestionCircle', url: "#help" },
    { label: 'My Resume', icon: 'FaRegFileAlt', url: "#resume" },
    { label: 'Support', icon: 'FaCommentDots', url: "#support" },
  ];

  const iconMapping = {
    FaHome: FaHome,
    FaUser: FaUser,
    FaBook: FaBook,
    FaCreditCard: FaCreditCard,
    FaGift: FaGift,
    FaBriefcase: FaBriefcase,
    FaUsers: FaUsers,
    FaQuestionCircle: FaQuestionCircle,
    FaRegFileAlt: FaRegFileAlt,
    FaCommentDots: FaCommentDots,
  };

  const contactDetails = [
    { icon: <FaEnvelope className="text-xl text-rose-500" />, label: 'Email Address', value: user?.email },
    { icon: <FaPhone className="text-xl text-emerald-500" />, label: 'Mobile Number', value: user?.contact },
    { icon: user?.gender === 'female' ? <FaFemale className="text-xl text-pink-500" /> : <FaMale className="text-xl text-blue-500" />, label: 'Gender', value: user?.gender },
    { icon: <FaMapMarkerAlt className="text-xl text-orange-500" />, label: 'Location', value: `${user?.city}, ${user?.state}` },
    { icon: <FaGraduationCap className="text-xl text-purple-500" />, label: 'Enrolled Course', value: user?.course },
    { icon: <FaCalendar className="text-xl text-indigo-500" />, label: 'Member Since', value: '2024' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-20 bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white p-3 sm:p-4 shadow-2xl border-b border-white/10">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
          >
            <FaBars className="text-xl text-amber-300" />
          </button>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/20">
              <FaUser className="text-white text-lg sm:text-xl" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white truncate max-w-[150px] sm:max-w-[200px]">{user?.name}</h1>
              <p className="text-amber-300 text-xs sm:text-sm font-medium flex items-center">
                <FaStar className="mr-1" /> Premium Student
              </p>
            </div>
          </div>
          <button
            onClick={handleEditClick}
            className="p-2 sm:p-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <FaEdit className="text-base sm:text-lg" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-purple-900/90 via-indigo-900/90 to-blue-900/90 backdrop-blur-md shadow-2xl text-white z-30 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}>
        <div className="p-4 sm:p-6 border-b border-white/10 bg-gradient-to-r from-purple-800/50 to-indigo-800/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 ring-2 ring-white/20">
                <FaCrown className="text-white text-lg sm:text-xl" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-amber-300 to-rose-400 bg-clip-text text-transparent">
                  EduPortal
                </h1>
                <p className="text-amber-200 text-xs sm:text-sm font-medium">Student Dashboard</p>
              </div>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
            >
              <FaTimes className="text-amber-300 text-lg" />
            </button>
          </div>
        </div>
        <nav className="p-4 space-y-1">
          <ul className="space-y-1">
            {sidebarItems.map((data, index) => {
              const IconComponent = iconMapping[data.icon];
              const isActive = activeTab === data.label.toLowerCase().replace(' ', '-');
              
              return (
                <li key={index}>
                  <Link
                    to={data.url}
                    className={`flex items-center p-3 rounded-2xl transition-all duration-300 group ${
                      isActive
                        ? 'bg-gradient-to-r from-rose-500/20 to-pink-500/20 border border-rose-500/30 shadow-lg shadow-rose-500/10'
                        : 'hover:bg-white/5 border border-transparent hover:border-white/10'
                    }`}
                    onClick={() => {
                      setActiveTab(data.label.toLowerCase().replace(' ', '-'));
                      setIsSidebarOpen(false);
                    }}
                  >
                    <div className={`p-2 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-md'
                        : 'bg-white/10 text-amber-300 group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-rose-500/50 group-hover:to-pink-500/50'
                    }`}>
                      <IconComponent className="text-base sm:text-lg" />
                    </div>
                    <span className={`ml-3 font-semibold text-sm transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-amber-200 group-hover:text-white'
                    }`}>
                      {data.label}
                    </span>
                    <FaChevronRight className={`ml-auto text-xs sm:text-sm transition-transform duration-300 ${
                      isActive ? 'rotate-90 text-rose-300' : 'text-amber-500 group-hover:text-amber-300'
                    }`} />
                  </Link>
                </li>
              );
            })}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <button
                onClick={() => {
                  student_logout_handler();
                  setIsSidebarOpen(false);
                }}
                className="flex items-center w-full p-3 rounded-2xl text-amber-200 hover:text-white hover:bg-rose-500/20 transition-all duration-300 group border border-transparent hover:border-rose-500/30"
              >
                <div className="p-2 rounded-xl bg-white/10 group-hover:bg-rose-500/30 transition-colors">
                  <FaSignOutAlt className="text-base sm:text-lg" />
                </div>
                <span className="ml-3 font-semibold text-sm">Sign Out</span>
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(true);
                  setIsSidebarOpen(false);
                }}
                className="flex items-center w-full p-3 rounded-2xl text-amber-200 hover:text-white hover:bg-rose-500/20 transition-all duration-300 group border border-transparent hover:border-rose-500/30"
              >
                <div className="p-2 rounded-xl bg-white/10 group-hover:bg-rose-500/30 transition-colors">
                  <FaTrashAlt className="text-base sm:text-lg" />
                </div>
                <span className="ml-3 font-semibold text-sm">Delete Account</span>
              </button>
            </div>
          </ul>
        </nav>
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-h-screen p-3 sm:p-4 lg:p-6 xl:p-8">
        {/* Mobile Navigation */}
        <div className="lg:hidden mb-4 sm:mb-6 bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-rose-200/20 p-2 sm:p-3">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory">
            {sidebarItems.map((data, index) => {
              const IconComponent = iconMapping[data.icon];
              return (
                <Link
                  key={index}
                  to={data.url}
                  className="flex-shrink-0 flex flex-col items-center p-2 sm:p-3 rounded-xl bg-gradient-to-br from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 transition-all duration-300 border border-rose-200/60 hover:border-rose-300/60 snap-center"
                >
                  <IconComponent className="text-rose-500 text-lg sm:text-xl mb-1" />
                  <span className="text-xs font-medium text-gray-700 text-center max-w-[70px] sm:max-w-[80px] truncate">{data.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-purple-900 via-rose-900 to-pink-900 text-white p-3 sm:p-4 lg:p-6 xl:p-8 rounded-2xl sm:rounded-3xl shadow-2xl mb-4 sm:mb-6 lg:mb-8 relative overflow-hidden border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse-slow"></div>
          <div className="absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 bg-gradient-to-br from-amber-400/20 to-rose-500/20 rounded-full blur-3xl opacity-70"></div>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-amber-200 text-sm sm:text-base lg:text-lg xl:text-xl font-medium">
                  Continue your colorful learning journey
                </p>
              </div>
              <div className="hidden sm:flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 shadow-inner">
                <FaStar className="text-amber-300 text-base sm:text-lg" />
                <span className="text-amber-300 font-semibold text-xs sm:text-sm">Premium Student</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
            <button
              onClick={handleEditClick}
              className="bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-500 hover:to-rose-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-1 sm:space-x-2 group"
            >
              <FaEdit className="text-base sm:text-lg group-hover:rotate-12 transition-transform" />
              <span className="text-xs sm:text-sm">Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Profile Details Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl border border-rose-200/20 overflow-hidden mb-6 sm:mb-8">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-rose-800/80 to-pink-800/80 p-3 sm:p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/20">
                  <FaUser className="text-white text-base sm:text-xl" />
                </div>
                <span>Personal Information</span>
              </h2>
              <div className="text-emerald-300 text-xs sm:text-sm font-medium bg-emerald-500/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-emerald-500/30 shadow-sm">
                Active Student
              </div>
            </div>
          </div>

          {/* Contact Details Grid */}
          <div className="p-3 sm:p-4 lg:p-6 xl:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {contactDetails.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-rose-50/50 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-rose-200/60 hover:border-rose-400/50 transition-all duration-300 group hover:shadow-lg hover:scale-105"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 ring-2 ring-rose-300/30">
                      <div className="text-rose-600">
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">{item.label}</p>
                      <p className="text-gray-900 font-semibold text-sm sm:text-base truncate">
                        {item.value || 'Not specified'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-rose-200/50">
              <button
                onClick={student_logout_handler}
                className="flex items-center justify-center space-x-1 sm:space-x-2 bg-gradient-to-r from-rose-100 to-pink-100 hover:from-rose-200 hover:to-pink-200 text-rose-600 border border-rose-300/60 hover:border-rose-400 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
              >
                <FaSignOutAlt className="text-base sm:text-lg" />
                <span className="text-xs sm:text-sm">Sign Out</span>
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center justify-center space-x-1 sm:space-x-2 bg-gradient-to-r from-rose-100 to-pink-100 hover:from-rose-200 hover:to-pink-200 text-rose-600 border border-rose-300/60 hover:border-rose-400 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
              >
                <FaTrashAlt className="text-base sm:text-lg" />
                <span className="text-xs sm:text-sm">Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl border border-rose-200/50 w-full max-w-md sm:max-w-lg md:max-w-2xl max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-500">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-rose-800 to-pink-800 p-3 sm:p-4 lg:p-6 text-white border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-400 to-rose-500 rounded-full flex items-center justify-center ring-2 ring-white/20">
                    <FaEdit className="text-white text-base sm:text-xl" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold">Update Profile</h3>
                    <p className="text-amber-200 text-xs sm:text-sm">Edit your personal details</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseClick}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90"
                >
                  <FaTimes className="text-white text-base sm:text-lg" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-3 sm:p-4 lg:p-6 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-rose-400/30 scrollbar-track-rose-100">
              <form className="space-y-3 sm:space-y-4 lg:space-y-6" onSubmit={edit_handler}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                  {/* Name */}
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-semibold text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      defaultValue={user?.name}
                      className="w-full p-2 sm:p-3 lg:p-4 bg-rose-50/50 border border-rose-300/60 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-semibold text-gray-700">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      defaultValue={user?.email}
                      className="w-full p-2 sm:p-3 lg:p-4 bg-rose-50/50 border border-rose-300/60 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Contact */}
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-semibold text-gray-700">Mobile Number</label>
                    <input
                      type="tel"
                      name="contact"
                      required
                      defaultValue={user?.contact}
                      className="w-full p-2 sm:p-3 lg:p-4 bg-rose-50/50 border border-rose-300/60 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all duration-300"
                      placeholder="Enter your mobile number"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-semibold text-gray-700">Date of Birth</label>
                    <input
                      type="date"
                      name="birth"
                      required
                      className="w-full p-2 sm:p-3 lg:p-4 bg-rose-50/50 border border-rose-300/60 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all duration-300"
                    />
                  </div>

                  {/* State */}
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-semibold text-gray-700">State</label>
                    <Select
                      value={selected_state}
                      onChange={(e) => setselected_state(e)}
                      options={states.map((data) => ({ value: data.name, label: data.name }))}
                      className="react-select-container text-sm"
                      classNamePrefix="react-select"
                      placeholder="Select your state"
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-1 sm:space-y-2">
                    <label className="text-xs sm:text-sm font-semibold text-gray-700">City</label>
                    <Select
                      value={selected_city}
                      onChange={(e) => setselected_city(e)}
                      options={search_cities.map((data) => ({ value: data.name, label: data.name }))}
                      className="react-select-container text-sm"
                      classNamePrefix="react-select"
                      placeholder="Select your city"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="space-y-2 sm:space-y-3">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700">Gender</label>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {['male', 'female', 'other'].map((gender) => (
                      <label key={gender} className="flex items-center space-x-2 sm:space-x-3 cursor-pointer p-2 sm:p-3 rounded-xl bg-rose-50/50 hover:bg-rose-100 transition-colors border border-rose-200/60 hover:border-rose-300">
                        <input
                          type="radio"
                          name="gender"
                          value={gender}
                          className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 focus:ring-rose-500"
                        />
                        <span className="text-gray-700 font-medium capitalize text-xs sm:text-sm">{gender}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Course */}
                <div className="space-y-1 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700">Course</label>
                  <Select
                    value={selected_course}
                    onChange={(e) => setselected_course(e)}
                    options={uniqueCourses?.map((data) => ({ value: data._id, label: data.courseName }))}
                    className="react-select-container text-sm"
                    classNamePrefix="react-select"
                    placeholder="Select your course"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4">
                  <button
                    type="button"
                    onClick={handleCloseClick}
                    className="flex-1 bg-gradient-to-r from-gray-100 to-rose-100 hover:from-gray-200 hover:to-rose-200 text-gray-700 py-2 sm:py-3 lg:py-4 px-3 sm:px-4 lg:px-6 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 border border-rose-300/60 hover:shadow-md hover:scale-105 text-xs sm:text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white py-2 sm:py-3 lg:py-4 px-3 sm:px-4 lg:px-6 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                  >
                    <FaSave className="text-base sm:text-lg" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl border border-rose-300/50 w-full max-w-sm sm:max-w-md overflow-hidden animate-in zoom-in-95 duration-500">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-rose-800 to-rose-900 p-3 sm:p-4 text-white border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full flex items-center justify-center ring-2 ring-white/20">
                    <FaExclamationTriangle className="text-white text-base sm:text-xl" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold">Confirm Deletion</h3>
                    <p className="text-rose-200 text-xs sm:text-sm">This action cannot be undone</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90"
                >
                  <FaTimes className="text-white text-base sm:text-lg" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
              <p className="text-gray-700 text-center font-medium text-sm sm:text-base">
                Are you sure you want to delete your account? All your data will be permanently removed.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gradient-to-r from-gray-100 to-rose-100 hover:from-gray-200 hover:to-rose-200 text-gray-700 py-2 sm:py-3 lg:py-4 px-3 sm:px-4 lg:px-6 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 border border-rose-300/60 hover:shadow-md hover:scale-105 text-xs sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={user_account_delete}
                  className="flex-1 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white py-2 sm:py-3 lg:py-4 px-3 sm:px-4 lg:px-6 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                >
                  <FaTrashAlt className="text-base sm:text-lg" />
                  <span>Delete Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
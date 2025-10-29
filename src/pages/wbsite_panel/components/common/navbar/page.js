import React, { useContext, useEffect, useState } from "react";

import { AiFillHome, AiFillProfile } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { 
  FaUniversity, 
  FaBrain, 
  FaCompass, 
  FaEllipsisH, 
  FaBars, 
  FaUserCircle, 
  FaGraduationCap, 
  FaShieldAlt, 
  FaPhone, 
  FaMobile,
  FaDollarSign,
  FaMoneyBillWave
} from "react-icons/fa";
import apple from "./mobicon/app-store-logo.png";
import play from "./mobicon/play.webp";
import logo from "./mobicon/aapd-logo.png"
// Assuming you're using heroicons
import { Link, useNavigate } from "react-router-dom";
import backbutton from "./mobicon/back-button.png";
import colors from "../../../utils/colour";
import HoverUniversities from "../hoverUniveristies/page";
import signupIcon from "./mobicon/add-friend.png";
import { Context } from "../../../../../Context_holder";
import gificon from "./mobicon/search.gif"

const Navbar = ({ setsearchbar , backgroundColor }) => {

  const {
    stream_fetch,
    stream,
    setuserLogin_popup,
    user,
    userlogout_handler,
    mobilnav,
    setMobilnav,
    top10course_fetch,
    college_fetch_by_ratings,
    top10College,
    topCourses,
    stream_with_colleges,
    stream_with_colleges_fetch,
    setcollege_state,Examfetch,exam,setstream_name
  } = useContext(Context);

  const navigater = useNavigate();

  
   

  const [open, setopen] = useState(false);

  const [isSliderOpen, setSliderOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [slider_content, setslider_content] = useState([]);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showExploreDropdown, setShowExploreDropdown] = useState(false);

  const best_college_handler = (state) => {
    setcollege_state({ value: state });
    setSliderOpen(false);
    navigater("/allUniversity");
  };

  

  useEffect(() => {

    top10course_fetch();
    college_fetch_by_ratings();
    stream_with_colleges_fetch();

  }, []);

  useEffect(() => {
    if(showExploreDropdown) Examfetch(null,"?TopExam=true");
  }, [showExploreDropdown]);


  const logout_handler = () => {
    userlogout_handler();
    setMobilnav(false);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  
  const toggleSlider = (colleges) => {
    setslider_content(colleges);
    setSliderOpen(!isSliderOpen);
    setMobilnav(!mobilnav);
  };

  const toggleAIModal = () => {
    setShowAIModal(!showAIModal);
    setShowMoreDropdown(false);
  };

  const toggleMoreDropdown = () => {
    setShowMoreDropdown(!showMoreDropdown);
  };

  const toggleExploreDropdown = () => {
    setShowExploreDropdown(!showExploreDropdown);
    setShowMoreDropdown(false);
  };

  return (
    <>
      {/* Desktop navbar */}
      <div
        style={{
          color: backgroundColor === '#18092f' ? '#ffffff' : '#000000',
          backgroundColor: backgroundColor || '#f8f9fa'
        }}
        className="w-full py-3 bg-white mdz-50 z-20 sticky top-0 shadow-sm border-b border-gray-100  "
      >
        <div className="mx-auto lg:w-[90%] px-3 lg:px-0 flex gap-9 xl:gap-2 items-center py-2 md:py-4 xl:justify-between">
          
          <div className="flex items-center gap-4 w-[50%] lg:w-auto">
            <Link to="/" className="flex items-center">
              <h1 className="hover:scale-110 transition-transform duration-300 font-bold text-[14px] sm:text-[16px] whitespace-nowrap">
              AAOPADHE
              </h1>
            </Link>

            {/* Compact Search Bar */}
            <div
              className="cursor-pointer border justify-between gap-2 lg:flex hidden rounded-md 
              items-center py-1 px-2 text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-700 w-[14rem] text-sm"
              onClick={() => setsearchbar(true)}
            >
              <AiOutlineSearch className="text-gray-500 text-base" />
              <div className="text-sm">Search colleges, courses...</div>
            </div>
            
            <div
              className="absolute top-0 right-[3rem] p-2 md:hidden cursor-pointer"
              onClick={() => setsearchbar(true)}
            >
              <img
                src={gificon}
                alt="Search GIF"
                className="w-[40px] h-[30px] md:hidden"
              />
            </div>
          </div>

          <ul className="hidden lg:flex md:block lg:w-[50%] text-[12px] xl:text-[13px] justify-end gap-1 sm:gap-2 xl:gap-3 relative">
            
            <Link to="/refrel"
              className="px-2 py-1.5 group bg-purple-500 hover:bg-purple-600 text-white font-medium 
              duration-300 cursor-pointer rounded-md md:flex hidden items-center gap-1 text-xs whitespace-nowrap"
            >
              <FaDollarSign className="text-xs" />
              <FaMoneyBillWave className="text-xs" />
             Refrel
            </Link>
            
            {/* AI Suggestion Button */}
            <Link to="/aisuggestion"
              onClick={toggleAIModal}
              className="px-2 py-1.5 group bg-purple-500 hover:bg-purple-600 text-white font-medium 
              duration-300 cursor-pointer rounded-md md:flex hidden items-center gap-1 text-xs whitespace-nowrap"
            >
              <FaBrain className="text-xs" />
              AI Suggest
            </Link>

            {/* Exams Button */}
<div className="relative group md:flex">

  <button className="px-2 py-1.5 bg-green-500 hover:bg-green-600 text-white font-medium 
      duration-300 cursor-pointer rounded-md flex items-center gap-1 text-xs whitespace-nowrap">
    <FaCompass className="text-xs" />
    Exams
  </button>

  <div className="absolute right-0 top-full mt-2 bg-white shadow-xl rounded-lg border border-gray-200 py-2 w-48 z-50 max-h-64 overflow-y-auto
      opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
    {exam?.map((examItem, index) => (
      <Link
        key={index}
        to={`/exam/${examItem._id}`}
        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm border-b border-gray-100 last:border-b-0"
      >
        <div className="font-medium">{examItem?.ShortName}</div>
        {examItem?.ExamName && (
          <div className="text-xs text-gray-500 truncate">{examItem?.ExamName}</div>
        )}
      </Link>
    ))}
  </div>
</div>



            {/* More Dropdown */}
            
            <div className="relative group">

              <button
                
                className="px-2 py-1.5  bg-orange-500 hover:bg-orange-600 text-white font-medium 
                duration-300 cursor-pointer rounded-md md:flex hidden items-center gap-1 text-xs whitespace-nowrap"
              >
                <FaEllipsisH className="text-xs" />
                More
              </button>
              
              
                <div className="absolute group-hover:block hidden right-0 top-5 mt-2 shadow-xl   py-2 w-80 z-50 max-h-96 overflow-y-auto py">

   <div className=" bg-white shadow-xl rounded-lg border border-gray-200 py-2 w-80 z-50 max-h-96 overflow-y-auto py">

     <Link
                    to="/careers"
                    className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors text-sm border-b border-gray-100"
                  >
                    <div className="font-medium">Careers</div>
                    <div className="text-xs text-gray-500">Job opportunities</div>
                  </Link>
                  <Link
                    to="/news"
                    className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors text-sm border-b border-gray-100"
                  >
                    <div className="font-medium">News</div>
                    <div className="text-xs text-gray-500">Latest updates</div>
                  </Link>
                  <Link
                    to="/events"
                    className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors text-sm border-b border-gray-100"
                  >
                    <div className="font-medium">Events</div>
                    <div className="text-xs text-gray-500">Upcoming events</div>
                  </Link>
                  <Link
                    to="/resources"
                    className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors text-sm border-b border-gray-100"
                  >
                    <div className="font-medium">Resources</div>
                    <div className="text-xs text-gray-500">Study materials</div>
                  </Link>
                  
                  {/* Divider */}
                  <div className="border-t border-gray-200 my-2"></div>
                  
                  {/* Why We Are Different Section */}
                  <div className="px-4 py-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Why We Are Different</div>
                  </div>
                  
                  {[
                    { to: "/ourcommitment", title: "Our Commitment", desc: "Unwavering dedication to student success", icon: "🎯" },
                    { to: "/wediffrent", title: "What makes us different?", desc: "Revolutionary approach to education", icon: "✨" },
                    { to: "/inviteuniversity", title: "Invite University", desc: "Exclusive partnership opportunities", icon: "🤝" },
                    { to: "/videoCounselingSection", title: "Expert Counseling", desc: "Personalized guidance from professionals", icon: "👨‍🏫" },
                    { to: "/ourexpert", title: "Our Experts", desc: "Industry-leading education specialists", icon: "🧠" },
                    { to: "/ConnectWithStudentsAlumni", title: "Student Network", desc: "Connect with successful alumni", icon: "🌐" },
                    { to: "/fakeuniversity", title: "Fraud Protection", desc: "Advanced verification systems", icon: "🛡️" },
                    { to: "/successStories", title: "Success Stories", desc: "Real achievements, real results", icon: "🏆" },
                    { to: "/importantVideos", title: "Premium Content", desc: "Exclusive educational resources", icon: "🎥" },
                    { to: "/blog", title: "Expert Insights", desc: "Latest trends and expert analysis", icon: "📚" }
                  ].map((item, index) => (
                    <Link
                      key={index}
                      to={item.to}
                      onClick={() => setShowMoreDropdown(false)}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors text-sm border-b border-gray-100 last:border-b-0"
                    >
                      <span className="text-lg mr-3">{item.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs text-gray-500">{item.desc}</div>
                      </div>
                    </Link>
                  ))}

   </div>
                
             



                </div>

            
            </div>

            <li className="px-2 py-1.5 group bg-gradient-to-r from-indigo-500 to-purple-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 font-medium text-xs
            hover:text-white duration-300 cursor-pointer rounded-md md:block hidden text-white whitespace-nowrap relative">
              Top Universities
              <div className="w-[800px] z-[100] absolute  top-full mt-2 shadow-2xl bg-white rounded-2xl border border-gray-200
                opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform translate-y-2 group-hover:translate-y-0 right-0">
                <HoverUniversities
                  top10College={top10College}
                  top10Courses={topCourses}
                />
              </div>
            </li>

            <Link
              to={"/student_profile"}
              className={`flex items-center ${
                user ? "block" : "hidden"
              } cursor-pointer`}
            >
              <FaUserCircle className="text-2xl text-blue-500" />
              <div className="ml-2">
                <h2 className="font-medium capitalize bg-[blue] text-white rounded-md py-0.5 px-1 text-xs whitespace-nowrap">
                  {user?.name}
                </h2>
              </div>
            </Link>

            <div className={` ${user ? "hidden" : "block"}`}>
              <Link
                className="px-2 sm:block max-md:hidden py-1.5 cursor-pointer
                bg-white hover:bg-[#002147] text-black border border-gray-300
                font-medium duration-300 hover:text-white rounded-md text-xs whitespace-nowrap"
                onClick={() => setuserLogin_popup(true)}
              >
                Sign in
              </Link>
            </div>
          </ul>
          
          <FaBars
            className="text-[20px] absolute right-4 lg:hidden block text-gradient-to-b from-transparent to-purple-900 cursor-pointer hover:text-purple-600 transition-colors duration-200"
            onClick={() => setMobilnav(true)}
          />
        </div>
      </div>

      {/* AI Suggestion Modal */}
      {/* {showAIModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <FaBrain className="text-white text-lg" />
                </div>
                <Link to={"aisuggestion"} className="text-2xl font-bold text-gray-800">AI Suggestion</Link >
              </div>
              <button
                onClick={toggleAIModal}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What are you looking for?
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Engineering colleges in Delhi"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Budget Range
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option>Under 1 Lakh</option>
                  <option>1-5 Lakhs</option>
                  <option>5-10 Lakhs</option>
                  <option>Above 10 Lakhs</option>
                </select>
              </div>
              
              <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
                Get AI Suggestions
              </button>
            </div>
          </div>
        </div>
      )} */}

      {/* Mobile Menu */}
      <div
        className={`overflow-y-auto h-full fixed block lg:hidden px-4 pb-[12rem] 
          top-0 right-0 bg-gradient-to-br from-white via-blue-50 to-purple-50 z-20 w-full duration-700 ${
            mobilnav === true ? "left-[0%]" : "left-[-100%]"
          }`}
      >
        {/* Modern Mobile Header */}
        <div className="flex justify-between items-center py-4 px-2 border-b border-gray-200 bg-white/90 backdrop-blur-sm sticky top-0 z-10 rounded-b-2xl shadow-sm">
          <Link
            to={"/student_profile"}
            className={`flex items-center ${
              user ? "flex" : "hidden"
            } cursor-pointer`}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <FaUserCircle className="text-2xl text-white" />
            </div>
            <div className="ml-3">
              <h2 className="font-bold capitalize text-gray-800 text-lg">
                {user?.name}
              </h2>
              <p className="text-sm text-gray-500">Student Profile</p>
            </div>
          </Link>
          
          <div className={`${user ? "hidden" : "flex"} items-center`}>
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
              <FaUserCircle className="text-white text-lg" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">Welcome!</h2>
              <p className="text-xs text-gray-500">Sign in to continue</p>
            </div>
          </div>

          <button
            onClick={() => setMobilnav(false)}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors shadow-sm"
          >
            <img src={backbutton} className="w-5 h-5" alt="Close" />
          </button>
        </div>

        {/* Modern Search Bar */}
        <div className="p-4">
          <div
            className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl transition-all duration-300"
            onClick={() => setsearchbar(true)}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-sm">
              <AiOutlineSearch className="text-white text-lg" />
            </div>
            <div className="flex-1">
              <p className="text-gray-700 font-semibold">Search anything...</p>
              <p className="text-xs text-gray-500">Colleges, courses, exams & more</p>
            </div>
          </div>
        </div>

        {/* Desktop Features Section */}
        <div className="px-4 py-2">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full mr-2 shadow-lg"></div>
            Quick Actions
          </h3>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            {/* Refrel */}
            <Link
              to="/refrel"
              onClick={() => setMobilnav(false)}
              className="bg-gradient-to-br from-violet-500 via-purple-500 to-purple-600 p-4 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <FaDollarSign className="text-2xl mb-2 drop-shadow-sm" />
              <FaMoneyBillWave className="text-2xl mb-2 drop-shadow-sm" />
             Refrel
            </Link>

            {/* AI Suggestion */}
            <Link
              to="/aisuggestion"
              onClick={() => setMobilnav(false)}
              className="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 p-4 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <FaBrain className="text-2xl mb-2 drop-shadow-sm" />
              AI Suggest
            </Link>
          </div>

          {/* Exams Section */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-4 shadow-xl border border-emerald-100/50 mb-4 backdrop-blur-sm">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                <FaCompass className="text-white text-lg drop-shadow-sm" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Top Exams</h4>
                <p className="text-xs text-emerald-600">Trending competitive exams</p>
              </div>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {exam?.slice(0, 5).map((examItem, index) => (
                <Link
                  key={index}
                  to={`/exam/${examItem._id}`}
                  onClick={() => setMobilnav(false)}
                  className="flex items-center p-3 bg-white/80 rounded-xl hover:bg-emerald-50 transition-all duration-300 border border-emerald-100/50 hover:border-emerald-200 hover:shadow-md backdrop-blur-sm"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center mr-3 shadow-sm">
                    <span className="text-emerald-600 text-xs font-bold">{examItem?.ShortName?.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{examItem?.ShortName}</p>
                    <p className="text-xs text-emerald-600 truncate">{examItem?.FullName}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              to="/examlist"
              onClick={() => setMobilnav(false)}
              className="block w-full mt-3 py-3 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white rounded-xl font-semibold text-center hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              View All Exams
            </Link>
          </div>

          {/* More Section */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-4 shadow-xl border border-orange-100/50 mb-4 backdrop-blur-sm">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                <FaEllipsisH className="text-white text-lg drop-shadow-sm" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">More Services</h4>
                <p className="text-xs text-orange-600">Additional resources</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/careers"
                onClick={() => setMobilnav(false)}
                className="p-3 bg-white/80 rounded-xl hover:bg-orange-50 transition-all duration-300 border border-orange-100/50 hover:border-orange-200 hover:shadow-md backdrop-blur-sm"
              >
                <p className="text-sm font-semibold text-orange-700">Careers</p>
                <p className="text-xs text-orange-600">Job opportunities</p>
              </Link>
              <Link
                to="/news"
                onClick={() => setMobilnav(false)}
                className="p-3 bg-white/80 rounded-xl hover:bg-orange-50 transition-all duration-300 border border-orange-100/50 hover:border-orange-200 hover:shadow-md backdrop-blur-sm"
              >
                <p className="text-sm font-semibold text-orange-700">News</p>
                <p className="text-xs text-orange-600">Latest updates</p>
              </Link>
              <Link
                to="/events"
                onClick={() => setMobilnav(false)}
                className="p-3 bg-white/80 rounded-xl hover:bg-orange-50 transition-all duration-300 border border-orange-100/50 hover:border-orange-200 hover:shadow-md backdrop-blur-sm"
              >
                <p className="text-sm font-semibold text-orange-700">Events</p>
                <p className="text-xs text-orange-600">Upcoming events</p>
              </Link>
              <Link
                to="/resources"
                onClick={() => setMobilnav(false)}
                className="p-3 bg-white/80 rounded-xl hover:bg-orange-50 transition-all duration-300 border border-orange-100/50 hover:border-orange-200 hover:shadow-md backdrop-blur-sm"
              >
                <p className="text-sm font-semibold text-orange-700">Resources</p>
                <p className="text-xs text-orange-600">Study materials</p>
              </Link>
            </div>
          </div>

          {/* Navigation Menu Section */}
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-4 shadow-xl mb-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-3 shadow-lg">
                <FaBars className="text-white text-lg drop-shadow-sm" />
              </div>
              <div>
                <h4 className="font-bold text-white drop-shadow-sm">Navigation Menu</h4>
                <p className="text-xs text-blue-100">Quick links & pages</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/"
                onClick={() => setMobilnav(false)}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 hover:shadow-lg"
              >
                <p className="text-sm font-semibold text-white drop-shadow-sm">Home</p>
                <p className="text-xs text-blue-100">Main page</p>
              </Link>
              <Link
                to="/about"
                onClick={() => setMobilnav(false)}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 hover:shadow-lg"
              >
                <p className="text-sm font-semibold text-white drop-shadow-sm">About</p>
                <p className="text-xs text-blue-100">About us</p>
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobilnav(false)}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 hover:shadow-lg"
              >
                <p className="text-sm font-semibold text-white drop-shadow-sm">Contact</p>
                <p className="text-xs text-blue-100">Get in touch</p>
              </Link>
              <Link
                to="/allUniversity"
                onClick={() => setMobilnav(false)}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 hover:shadow-lg"
              >
                <p className="text-sm font-semibold text-white drop-shadow-sm">Universities</p>
                <p className="text-xs text-blue-100">Top colleges</p>
              </Link>
            </div>
          </div>

          {/* Stream-wise Colleges Section */}
          <div className="bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 rounded-2xl p-4 shadow-xl mb-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-3 shadow-lg">
                <FaGraduationCap className="text-white text-lg drop-shadow-sm" />
              </div>
              <div>
                <h4 className="font-bold text-white drop-shadow-sm">Stream-wise Colleges</h4>
                <p className="text-xs text-cyan-100">Find colleges by stream</p>
              </div>
            </div>
            
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {stream_with_colleges?.slice(0, 8).map((data, index) => (
                <Link 

                to={"/allUniversity"}
                  key={index}
                  className="flex items-center p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-white/30 group cursor-pointer hover:shadow-lg"
                  onClick={() => {toggleSlider(data?.colleges)
                    setstream_name(data?.stream_name)
                  }}
                >
                  <img
                    className="w-8 h-8 rounded-full mr-3 shadow-lg border-2 border-white"
                    src={`${process.env.REACT_APP_API_BASE_URL}image/stream_image/${data?.image}`}
                    alt={data?.stream_name}
                  />
                  <div className="flex-1">
                    <p className="text-white font-semibold capitalize drop-shadow-sm">{data?.stream_name} College</p>
                    <p className="text-xs text-cyan-100">Explore colleges</p>
                  </div>
                  <div className="w-6 h-6 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:translate-x-1 transition-all duration-300 shadow-sm">
                    <svg className="w-4 h-4 text-white drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
            
            {stream_with_colleges?.length > 8 && (
              <button
                onClick={togglePopup}
                className="block w-full mt-3 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-xl font-semibold text-center transition-all duration-300 border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                View More Colleges →
              </button>
            )}
          </div>

          {/* Why We Are Different - Premium Theme Section */}
          <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-black rounded-3xl p-6 shadow-2xl border border-slate-700/50 mb-4 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-cyan-400/10 animate-pulse"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl border border-cyan-300/30">
                  <FaShieldAlt className="text-white text-xl drop-shadow-lg" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg drop-shadow-lg">Why We Are Different</h4>

                  <p className="text-sm text-cyan-300 font-medium">Discover what makes us unique</p>
                  
                </div>
              </div>
              
              <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-400/30 scrollbar-track-slate-800/30">
                {[
                  { to: "/ourcommitment", title: "Our Commitment", desc: "Unwavering dedication to student success", icon: "🎯" },
                  { to: "/wediffrent", title: "What makes us different?", desc: "Revolutionary approach to education", icon: "✨" },
                  { to: "/inviteuniversity", title: "Invite University", desc: "Exclusive partnership opportunities", icon: "🤝" },
                  { to: "/videoCounselingSection", title: "Expert Counseling", desc: "Personalized guidance from professionals", icon: "👨‍🏫" },
                  { to: "/ourexpert", title: "Our Experts", desc: "Industry-leading education specialists", icon: "🧠" },
                  { to: "/ConnectWithStudentsAlumni", title: "Student Network", desc: "Connect with successful alumni", icon: "🌐" },
                  { to: "/fakeuniversity", title: "Fraud Protection", desc: "Advanced verification systems", icon: "🛡️" },
                  { to: "/successStories", title: "Success Stories", desc: "Real achievements, real results", icon: "🏆" },
                  { to: "/importantVideos", title: "Premium Content", desc: "Exclusive educational resources", icon: "🎥" },
                  { to: "/blog", title: "Expert Insights", desc: "Latest trends and expert analysis", icon: "📚" }
                ].map((item, index) => (
                  <Link
                    key={index}
                    to={item.to}
                    onClick={() => setMobilnav(false)}
                    className="flex items-center p-4 bg-gradient-to-r from-slate-800/80 via-blue-900/40 to-slate-800/80 rounded-2xl hover:from-blue-800/60 hover:via-cyan-900/50 hover:to-blue-800/60 transition-all duration-300 border border-slate-600/30 hover:border-cyan-400/40 hover:shadow-xl backdrop-blur-sm group transform hover:scale-[1.02]"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-all duration-300 shadow-lg border border-cyan-300/20">
                      <span className="text-lg">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white drop-shadow-sm group-hover:text-cyan-100 transition-colors">{item.title}</p>
                      <p className="text-xs text-slate-300 group-hover:text-cyan-200 transition-colors">{item.desc}</p>
                    </div>
                    <div className="w-6 h-6 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-all duration-300 border border-cyan-300/20">
                      <span className="text-cyan-300 text-xs">→</span>
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Premium Badge */}
              <div className="mt-4 flex items-center justify-center">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 rounded-full shadow-lg border border-cyan-300/30">
                  <p className="text-white text-xs font-bold drop-shadow-sm">🌟 Premium Education Platform</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500 rounded-2xl p-4 shadow-xl mb-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-3 shadow-lg">
                <FaPhone className="text-white text-lg drop-shadow-sm" />
              </div>
              <div>
                <h4 className="font-bold text-white drop-shadow-sm">Contact Us</h4>
                <p className="text-xs text-pink-100">Get in touch with us</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <span className="text-2xl mr-3">📞</span>
                <div>
                  <p className="text-white font-semibold drop-shadow-sm">New User</p>
                  <a href="tel:+917976527115" className="text-pink-100 text-sm hover:text-white transition-colors">
                    +91 79 7652 7115
                  </a>
                </div>
              </div>

              <div className="flex items-center p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <span className="text-2xl mr-3">👤</span>
                <div>
                  <p className="text-white font-semibold drop-shadow-sm">Help Desk</p>
                  <a href="tel:+917976527115" className="text-pink-100 text-sm hover:text-white transition-colors">
                    +91 79 7652 7115
                  </a>
                </div>
              </div>

              <div className="flex items-center p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <span className="text-2xl mr-3">✉️</span>
                <div>
                  <p className="text-white font-semibold drop-shadow-sm">Email</p>
                  <a href="mailto:ofcwrk@hotmail.co.uk" className="text-pink-100 text-sm hover:text-white transition-colors">
                    ofcwrk@hotmail.co.uk
                  </a>
                </div>
              </div>

              <div className="flex items-center p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <span className="text-2xl mr-3">🕑</span>
                <div>
                  <p className="text-white font-semibold drop-shadow-sm">Visit Us</p>
                  <p className="text-pink-100 text-sm">10 AM to 7 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* App Download Section */}
          <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-2xl p-4 shadow-xl mb-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-3 shadow-lg">
                <FaMobile className="text-white text-lg drop-shadow-sm" />
              </div>
              <div>
                <h4 className="font-bold text-white drop-shadow-sm">Download App</h4>
                <p className="text-xs text-green-100">Get our mobile app</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-lg"
              >
                <img src={play} alt="Google Play" className="w-full h-12 object-contain" />
              </a>
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-lg"
              >
                <img src={apple} alt="App Store" className="w-full h-12 object-contain" />
              </a>
            </div>
          </div>

          {/* Sign Up / Logout Section */}
          <div className="px-2 mb-4">
            <div className={`${user ? "hidden" : "flex"} mb-3`}>
              <Link
                className="flex items-center justify-center w-full p-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => setuserLogin_popup(true)}
              >
                <img
                  src={signupIcon}
                  alt="Sign up"
                  className="w-5 h-5 mr-2"
                />
                Sign Up
              </Link>
            </div>

            <div className={`${user ? "flex" : "hidden"}`}>
              <button
                className="w-full p-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                onClick={logout_handler}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Additional Content Section */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 shadow-lg mb-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <FaBars className="text-white text-lg" />
              </div>
              <div>
                <h4 className="font-bold text-white">Additional Resources</h4>
                <p className="text-xs text-gray-300">More options & features</p>
              </div>
            </div>
            
            <div className="space-y-2">
              {/* Old Navigation Items */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <Link
                  to="/"
                  onClick={() => setMobilnav(false)}
                  className="p-3 bg-yellow-200 text-black rounded-xl hover:bg-yellow-300 transition-colors text-center font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobilnav(false)}
                  className="p-3 bg-yellow-200 text-black rounded-xl hover:bg-yellow-300 transition-colors text-center font-medium"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobilnav(false)}
                  className="p-3 bg-yellow-200 text-black rounded-xl hover:bg-yellow-300 transition-colors text-center font-medium"
                >
                  Contact
                </Link>
                <Link
                  to="/refrel"
                  onClick={() => setMobilnav(false)}
                  className="p-3 bg-yellow-200 text-black rounded-xl hover:bg-yellow-300 transition-colors text-center font-medium"
                >
                  Refrel
                </Link>
                <Link
                  to="/aisuggestion"
                  onClick={() => setMobilnav(false)}
                  className="p-3 bg-yellow-200 text-black rounded-xl hover:bg-yellow-300 transition-colors text-center font-medium"
                >
                  AI Suggest
                </Link>
                <Link
                  to="/allUniversity"
                  onClick={() => setMobilnav(false)}
                  className="p-3 bg-yellow-200 text-black rounded-xl hover:bg-yellow-300 transition-colors text-center font-medium"
                >
                  Universities
                </Link>
              </div>

              {/* Exam List */}
              <div className="mb-4">
                <h5 className="text-white font-semibold mb-2 flex items-center">
                  <FaCompass className="mr-2" />
                  Quick Exam Access
                </h5>
                <div className="grid grid-cols-2 gap-2">
                  {exam?.slice(0, 6).map((examItem, index) => (
                    <Link
                      key={index}
                      to={`/exam/${examItem._id}`}
                      onClick={() => setMobilnav(false)}
                      className="p-2 bg-yellow-200 text-black rounded-lg hover:bg-yellow-300 transition-colors text-center text-sm font-medium"
                    >
                      {examItem?.ShortName}
                    </Link>
                  ))}
                </div>
              </div>

              {/* More Services */}
              <div className="mb-4">
                <h5 className="text-white font-semibold mb-2 flex items-center">
                  <FaEllipsisH className="mr-2" />
                  More Services
                </h5>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/careers"
                    onClick={() => setMobilnav(false)}
                    className="p-2 bg-yellow-200 text-black rounded-lg hover:bg-yellow-300 transition-colors text-center text-sm font-medium"
                  >
                    Careers
                  </Link>
                  <Link
                    to="/news"
                    onClick={() => setMobilnav(false)}
                    className="p-2 bg-yellow-200 text-black rounded-lg hover:bg-yellow-300 transition-colors text-center text-sm font-medium"
                  >
                    News
                  </Link>
                  <Link
                    to="/events"
                    onClick={() => setMobilnav(false)}
                    className="p-2 bg-yellow-200 text-black rounded-lg hover:bg-yellow-300 transition-colors text-center text-sm font-medium"
                  >
                    Events
                  </Link>
                  <Link
                    to="/resources"
                    onClick={() => setMobilnav(false)}
                    className="p-2 bg-yellow-200 text-black rounded-lg hover:bg-yellow-300 transition-colors text-center text-sm font-medium"
                  >
                    Resources
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stream Colleges Popup */}
      {isPopupOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
    {/* Backdrop with enhanced blur and transition */}
    <div 
      className="absolute inset-0 bg-black/70 backdrop-blur-lg transition-opacity duration-300"
      onClick={togglePopup}
    />
    
    {/* Modal container */}
    <div className="
      relative 
      bg-white/95 backdrop-blur-2xl 
      rounded-3xl 
      shadow-2xl 
      w-full max-w-2xl 
      max-h-[85vh]
      overflow-hidden
      border border-white/30
      transform transition-all duration-300
      scale-95 hover:scale-100
    ">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200/50">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            All Stream Colleges
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Choose a stream to explore colleges
          </p>
        </div>
        
        {/* Close button */}
        <button
          onClick={togglePopup}
          className="
            w-10 h-10 
            bg-gradient-to-br from-gray-100 to-gray-200 
            hover:from-red-50 hover:to-red-100 
            rounded-full 
            flex items-center justify-center 
            transition-all duration-300 
            shadow-lg hover:shadow-xl 
            transform hover:scale-110
            border border-gray-200/50
            group
          "
          aria-label="Close popup"
        >
          <span className="text-gray-600 group-hover:text-red-600 font-bold text-lg transition-colors duration-300">
            ×
          </span>
        </button>
      </div>
      
      {/* Content */}
      <div className="p-6 pt-4">
        <div className="space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {stream_with_colleges?.map((data, index) => (
            <Link
              to="/allUniversity"
              key={index}
              onClick={() => {
                toggleSlider(data?.colleges);
                setstream_name(data?.stream_name);
                setIsPopupOpen(false);
              }}
              className="
                group relative flex items-center gap-4 p-5
                bg-gradient-to-br from-gray-50 to-gray-100
                backdrop-blur-xl border border-gray-200/60
                rounded-2xl hover:border-blue-400/50
                hover:shadow-lg
                transition-all duration-300 
                hover:scale-[1.02] active:scale-[0.99]
                cursor-pointer overflow-hidden
                hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-indigo-50/50
              "
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-full group-hover:translate-x-full" />
              
              {/* Stream Image with better styling */}
              <div className="relative z-10">
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}image/stream_image/${data?.image}`}
                  alt={data?.stream_name}
                  className="
                    w-14 h-14 rounded-xl 
                    border-2 border-white/80 
                    shadow-lg
                    group-hover:border-blue-300/60 
                    group-hover:shadow-blue-200/50
                    transition-all duration-300
                    object-cover
                  "
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/56/3B82F6/FFFFFF?text=${data?.stream_name?.charAt(0)}`;
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex-1 relative z-10 min-w-0">
                <p className="text-gray-900 font-semibold text-lg capitalize tracking-tight truncate">
                  {data?.stream_name} Colleges
                </p>
                <p className="text-sm text-gray-600 mt-1 group-hover:text-blue-600 transition-colors duration-300">
                  Explore top colleges in this stream
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-gray-500 bg-gray-200/50 px-2 py-1 rounded-full">
                    {data?.colleges?.length || 0} colleges
                  </span>
                </div>
              </div>

              {/* Arrow Icon */}
              <div className="
                relative z-10
                w-10 h-10 
                rounded-xl 
                flex items-center justify-center
                bg-white 
                border border-gray-200
                text-gray-400
                group-hover:bg-blue-500
                group-hover:text-white
                group-hover:border-blue-500
                group-hover:translate-x-1 
                transition-all duration-300
                shadow-sm group-hover:shadow-md
              ">
                <svg
                  className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {(!stream_with_colleges || stream_with_colleges.length === 0) && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎓</span>
            </div>
            <h3 className="text-gray-700 font-medium text-lg">No streams available</h3>
            <p className="text-gray-500 text-sm mt-1">Check back later for updates</p>
          </div>
        )}
      </div>
    </div>
  </div>
)}




      {/* Modern Bottom Navigation */}
      <nav className="bg-white/95 backdrop-blur-xl fixed bottom-0 w-full border-t border-gray-200/50 flex justify-around py-4 shadow-2xl z-50 lg:hidden">
        <Link
          to="/"
          onClick={() => setMobilnav(false)}
          className="flex flex-col items-center space-y-2 text-gray-600 hover:text-blue-600 transition-all duration-300 group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
            <AiFillHome className="h-5 w-5 text-blue-600 drop-shadow-sm" />
          </div>
          <span className="text-xs font-semibold">Home</span>
        </Link>
        
        <Link
          to="/examlist"
          onClick={() => setMobilnav(false)}
          className="flex flex-col items-center space-y-2 text-gray-600 hover:text-green-600 transition-all duration-300 group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
            <FaCompass className="h-5 w-5 text-green-600 drop-shadow-sm" />
          </div>
          <span className="text-xs font-semibold">Exams</span>
        </Link>
        
        <Link
          to="/allUniversity"
          onClick={() => setMobilnav(false)}
          className="flex flex-col items-center space-y-2 text-gray-600 hover:text-purple-600 transition-all duration-300 group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-violet-200 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
            <FaUniversity className="h-5 w-5 text-purple-600 drop-shadow-sm" />
          </div>
          <span className="text-xs font-semibold">Universities</span>
        </Link>
        
        <button
          onClick={() => {
            setMobilnav(false);
            setsearchbar(true);
          }}
          className="flex flex-col items-center space-y-2 text-gray-600 hover:text-orange-600 transition-all duration-300 group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-amber-200 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
            <AiOutlineSearch className="h-5 w-5 text-orange-600 drop-shadow-sm" />
          </div>
          <span className="text-xs font-semibold">Search</span>
        </button>
        
        <Link
          to="/student_profile"
          className="flex flex-col items-center space-y-2 text-gray-600 hover:text-indigo-600 transition-all duration-300 group"
          onClick={() => setMobilnav(false)}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-200 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
            <AiFillProfile className="h-5 w-5 text-indigo-600 drop-shadow-sm" />
          </div>
          <span className="text-xs font-semibold">Profile</span>
        </Link>
      </nav>

      {/* End */}
      
      {/* {isSliderOpen && (
        <div
          className={`overflow-y-auto h-full absolute block lg:hidden px-2 pb-[12rem] 
            top-0 right-0 bg-white z-40 w-full duration-700 
            ${isSliderOpen ? "right-[0%]" : "right-[-100%]"}`}
        >
          <div
            className="fixed right-0 top-0 bg-white h-full w-[100%] shadow-lg overflow-y-auto 
          transition-transform duration-300 ease-in"
          >
            <div className="p-4">
              <h2 className="text-lg font-bold mb-4">
                Location wise best university
              </h2>

              {slider_content?.map((data, index) => (
                <div
                  key={index}
                  className=" cursor-pointer font-semi-bold "
                  onClick={() => best_college_handler(data?.state)}
                >
                  {data?.state}
                </div>
              ))}
            </div>
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => {
                setSliderOpen(false);
                setMobilnav(true);
              }}
            >
              <img src={backbutton} className="w-8 h-8"></img>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Navbar;

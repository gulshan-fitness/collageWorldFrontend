import React, { useContext, useEffect } from "react";
import { AiFillHome, AiFillProfile } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { FaUniversity } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoCall } from "react-icons/io5";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaLocationArrow,
  FaGraduationCap,
  FaBookOpen,
  FaAward,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { 
  BuildingOfficeIcon, 
  AcademicCapIcon, 
  SparklesIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';
import NewsLetter from "../../../screens/home/newsLetter";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../../../../Context_holder";
import apple from "./app-store-logo.png";
import play from "./play.webp";

import { format } from "date-fns";

// Custom CSS for scrollbar
const customScrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(51, 65, 85, 0.3);
    border-radius: 2px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #3b82f6, #1d4ed8);
    border-radius: 2px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #2563eb, #1e40af);
  }
`;

function Footer2({ setsearchbar }) {
  const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
  const {
    website_blog_fetch,
    website_blog,
    best_colleges_in_cities_array,
    setcourse_name,
    setcollege_city,
    best_colleges_in_courses_array,
    best_colleges_in_pg_courses_array,
    setfilterHeading,
  } = useContext(Context);
  useEffect(() => {

    
    website_blog_fetch();
  }, []);

  const navigater = useNavigate();

  const best_college_handler = (city) => {

    setcollege_city({ value: city });
    setfilterHeading("Best Colleges in");
    navigater("/allUniversity");

  };

  const ugc_course_handler = (course_name) => {


    setcourse_name(course_name);

    setfilterHeading("Best Colleges for");
    navigater("/allUniversity");

  };

  // Custom navigation function that scrolls to header after navigation
  const navigateAndScrollToTop = (path) => {
    navigater(path);
    // Use setTimeout to ensure navigation completes before scrolling
    setTimeout(() => {
      const headerElement = document.getElementById('page_on_the_top');
      if (headerElement) {
        headerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Fallback to window scroll if element not found
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <div className="w-full bg-gradient-to-br from-gray-900 via-slate-900 to-black py-8 md:py-12 px-4 border-t border-gray-800">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-2xl border border-blue-500/20">
              <AcademicCapIcon className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              AAOPADHE
            </h2>
            <p className="text-gray-400 max-w-md mx-auto">Your gateway to top colleges and universities across India</p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            
            {/* About Us Section */}
            <div className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <BuildingOfficeIcon className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white">About Us</h4>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                AAOPADHE: Your gateway to top colleges! We specialize in guiding
                students to the best institutions for their chosen streams.
              </p>
              
              {/* Social Media */}
              <div className="flex gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center hover:from-blue-700 hover:to-blue-800 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-110">
                  <FaFacebookF className="text-white text-sm" />
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl flex items-center justify-center hover:from-pink-700 hover:to-purple-700 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-110">
                  <FaInstagram className="text-white text-sm" />
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-blue-500 rounded-xl flex items-center justify-center hover:from-sky-600 hover:to-blue-600 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-110">
                  <FaTwitter className="text-white text-sm" />
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <FaPhoneAlt className="text-white text-xs" />
                  </div>
              <a href="tel:+917976527115" className="text-sm text-gray-300 hover:text-white transition-colors">
    +91 79765 27115
</a>
                </div>
                <div className="flex items-center gap-3 p-2 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <FaEnvelope className="text-white text-xs" />
                  </div>
                  <a href="mailto:ofcwrk@hotmail.co.uk" className="text-sm text-gray-300 hover:text-white transition-colors">
                    ofcwrk@hotmail.co.uk
                  </a>
                </div>
                <div className="flex items-start gap-3 p-2 bg-gray-700/30 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white text-xs" />
                  </div>
                  <p className="text-sm text-gray-300">
                    Khirni Phatak, Sodala<br />
                    Jaipur, Rajasthan
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <SparklesIcon className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white">Quick Links</h4>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={() => navigateAndScrollToTop("/")}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm text-left shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3"
                >
                  <span className="text-lg">🏠</span>
                  <span>Home</span>
                </button>
                <button 
                  onClick={() => navigateAndScrollToTop("/about")}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm text-left shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3"
                >
                  <span className="text-lg">📖</span>
                  <span>About Us</span>
                </button>
                <button 
                  onClick={() => navigateAndScrollToTop("/contact")}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm text-left shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3"
                >
                  <span className="text-lg">📞</span>
                  <span>Contact</span>
                </button>
                <button 
                  onClick={() => navigateAndScrollToTop("/allUniversity")}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm text-left shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3"
                >
                  <span className="text-lg">🏛️</span>
                  <span>Universities</span>
                </button>
                <button 
                  onClick={() => navigateAndScrollToTop("/examlist")}
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm text-left shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3"
                >
                  <span className="text-lg">📝</span>
                  <span>Exams</span>
                </button>
              </div>
            </div>

            {/* Best Colleges */}
            <div className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <FaAward className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white">Best Colleges</h4>
              </div>
              
              <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                {best_colleges_in_cities_array?.slice(0, 8).map((city, index) => (
                  <button
                    key={index}
                    onClick={() => best_college_handler(city)}
                    className="w-full text-left text-sm text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-700 hover:to-slate-700 px-3 py-2 rounded-lg transition-all duration-300 capitalize cursor-pointer flex items-center gap-3 group"
                  >
                    <span className="text-blue-400 group-hover:text-blue-300">📍</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{city}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Courses & Downloads */}
            <div className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <FaGraduationCap className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white">Popular Courses</h4>
              </div>
              
              <div className="space-y-2 mb-6 max-h-32 overflow-y-auto custom-scrollbar">
                {best_colleges_in_courses_array?.slice(0, 6).map((course, index) => (
                  <button
                    key={index}
                    onClick={() => ugc_course_handler(course)}
                    className="w-full text-left text-sm text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-700 hover:to-slate-700 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer flex items-center gap-3 group"
                  >
                    <span className="text-emerald-400 group-hover:text-emerald-300">🎓</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{course}</span>
                  </button>
                ))}
              </div>

              {/* App Downloads */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <DevicePhoneMobileIcon className="h-4 w-4 text-white" />
                  </div>
                  <h5 className="text-sm font-bold text-white">Download App</h5>
                </div>
                <div className="flex gap-3">
                  <a href="https://play.google.com" className="group">
                    <img src={play} alt="Google Play" className="w-20 h-auto rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105" />
                  </a>
                  <a href="https://www.apple.com/app-store/" className="group">
                    <img src={apple} alt="App Store" className="w-20 h-auto rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* More Services Section */}
          <div className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <SparklesIcon className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white">More Services</h4>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                { path: "/careers", label: "Careers", icon: "💼", color: "from-blue-600 to-indigo-600" },
                { path: "/news", label: "News", icon: "📰", color: "from-green-600 to-emerald-600" },
                { path: "/events", label: "Events", icon: "🎉", color: "from-purple-600 to-pink-600" },
                { path: "/resources", label: "Resources", icon: "📚", color: "from-orange-600 to-red-600" },
                { path: "/aisuggestion", label: "AI Suggest", icon: "🤖", color: "from-teal-600 to-cyan-600" },
                { path: "/refrel", label: "Refrel", icon: "💰", color: "from-yellow-600 to-orange-600" }
              ].map((service, index) => (
                <button
                  key={index}
                  onClick={() => navigateAndScrollToTop(service.path)}
                  className={`bg-gradient-to-r ${service.color} hover:shadow-xl text-white px-4 py-4 rounded-xl font-medium transition-all duration-300 text-sm shadow-lg transform hover:scale-105 hover:-translate-y-1`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">{service.icon}</span>
                    <span className="leading-tight text-center font-semibold">{service.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Latest Posts Section */}
          <div className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                <FaBookOpen className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white">Latest Posts</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {website_blog?.slice(0, 3).map((data, index) => (
                <Link 
                  to={"/blog"} 
                  key={index}
                  className="bg-gradient-to-br from-gray-700 to-slate-700 rounded-xl p-4 hover:from-gray-600 hover:to-slate-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-600/50"
                >
                  <div className="flex gap-4">
                    <img
                      src={`${process.env.REACT_APP_API_BASE_URL}image/website_blog_image/${data.logo}`}
                      alt="blog"
                      className="w-16 h-16 rounded-xl object-cover shadow-lg"
                    />
                    <div className="flex-1">
                      <h5 className="text-white font-semibold text-sm mb-2 line-clamp-2 leading-relaxed">
                        {data.heading}
                      </h5>
                      <p className="text-gray-400 text-xs flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        {format(new Date(data.createdAt), "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div className="bg-gradient-to-br from-slate-800 to-gray-800 rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <FaAward className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white">Why Choose Us</h4>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { path: "/ourcommitment", label: "Our Commitment", icon: "🎯", color: "from-blue-600 to-indigo-600" },
                { path: "/wediffrent", label: "What Makes Us Different", icon: "✨", color: "from-purple-600 to-pink-600" },
                { path: "/inviteuniversity", label: "Invite University", icon: "🏛️", color: "from-green-600 to-emerald-600" },
                { path: "/videoCounselingSection", label: "Counseling", icon: "👨‍🏫", color: "from-orange-600 to-red-600" },
                { path: "/ourexpert", label: "Our Experts", icon: "🧠", color: "from-teal-600 to-cyan-600" },
                { path: "/ConnectWithStudentsAlumni", label: "Connect Students", icon: "🌐", color: "from-yellow-600 to-orange-600" },
                { path: "/fakeuniversity", label: "Fake University Alert", icon: "🛡️", color: "from-red-600 to-pink-600" },
                { path: "/successStories", label: "Success Stories", icon: "🏆", color: "from-emerald-600 to-teal-600" },
                { path: "/importantVideos", label: "Important Videos", icon: "🎥", color: "from-indigo-600 to-purple-600" },
                { path: "/blog", label: "Blogs & Posts", icon: "📚", color: "from-cyan-600 to-blue-600" }
              ].map((service, index) => (
                <button
                  key={index}
                  onClick={() => navigateAndScrollToTop(service.path)}
                  className={`bg-gradient-to-r ${service.color} hover:shadow-xl text-white px-3 py-4 rounded-xl font-medium transition-all duration-300 text-xs shadow-lg transform hover:scale-105 hover:-translate-y-1`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-lg">{service.icon}</span>
                    <span className="leading-tight text-center font-semibold">{service.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 pt-8">
            <div className="text-center">
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl mb-3">
                  <AcademicCapIcon className="h-6 w-6 text-white" />
                </div>
              </div>
              <p className="text-white font-bold text-lg mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                2025 AAOPADHE - All Rights Reserved
              </p>
              <p className="text-gray-400 text-sm max-w-4xl mx-auto leading-relaxed">
                At AAOPADHE, our objective is to offer students precise, unbiased, and in-depth 
                information about universities and their academic programs. We aim to simplify the 
                decision-making process for students and help them achieve their educational dreams.
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <div className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-full border border-blue-500/30">
                  <span className="text-blue-400 text-sm font-medium">🎓 50,000+ Students Guided</span>
                </div>
                <div className="px-4 py-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-full border border-green-500/30">
                  <span className="text-green-400 text-sm font-medium">⭐ 4.8/5 Rating</span>
                </div>
                <div className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full border border-purple-500/30">
                  <span className="text-purple-400 text-sm font-medium">🏆 95% Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="bg-slate-800 fixed bottom-0 w-full border-t border-slate-600 flex justify-around py-2 shadow-lg md:hidden">
        <Link to="/" className="text-center group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-1">
            <AiFillHome className="h-4 w-4 text-white" />
          </div>
          <span className="text-xs text-white">Home</span>
        </Link>
        <Link to="/allUniversity" className="text-center group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-1">
            <FaUniversity className="h-4 w-4 text-white" />
          </div>
          <span className="text-xs text-white">Universities</span>
        </Link>
        <div className="text-center group" onClick={() => setsearchbar(true)}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-1 cursor-pointer">
            <AiOutlineSearch className="h-4 w-4 text-white" />
          </div>
          <span className="text-xs text-white">Search</span>
        </div>
        <Link to="/student_profile" className="text-center group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-1">
            <AiFillProfile className="h-4 w-4 text-white" />
          </div>
          <span className="text-xs text-white">Profile</span>
        </Link>
      </nav>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-0 right-0 px-4 py-4 z-[9999] md:mb-4 mb-16">
        <div className="mb-3">
          <a href="tel:+9179765 27115">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all duration-300">
              <IoCall className="text-white text-lg" />
            </div>
          </a>
        </div>
        <div>
          <a href="https://wa.me/+917976527115" target="_blank" rel="noopener noreferrer">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition-all duration-300">
              <IoLogoWhatsapp className="text-white text-lg" />
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

export default Footer2;
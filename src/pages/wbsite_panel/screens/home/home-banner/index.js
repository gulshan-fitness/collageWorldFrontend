import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../../../Context_holder";
import "swiper/css";

const HomeBanner = () => {
  const { slider_banners_fetch } = useContext(Context);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    slider_banners_fetch();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 py-12 md:py-16 text-center overflow-hidden border-b border-gray-100">
      {/* Enhanced Background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-16 w-32 h-32 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-16 right-20 w-40 h-40 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-green-400 to-green-500 rounded-full blur-2xl opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Enhanced Heading with Better Typography */} 
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight tracking-tight">
            Find Your Perfect{" "}
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent font-extrabold">
              College
            </span>{" "}
            &{" "}
            <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent font-extrabold">
              Course
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            Make informed decisions with{" "}
            <span className="text-blue-600 font-semibold">expert guidance</span>.
            Thousands of colleges, hundreds of courses —{" "}
            <span className="text-purple-600 font-semibold">one trusted platform</span>.
          </p>
        </div>

        {/* Enhanced Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
            <span className="text-lg">🏛️</span>
            <span>Explore Colleges</span>
            <div className="w-0 group-hover:w-2 h-2 bg-white rounded-full transition-all duration-300"></div>
          </button>

          <button className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
            <span className="text-lg">📖</span>
            <span>Find Courses</span>
            <div className="w-0 group-hover:w-2 h-2 bg-white rounded-full transition-all duration-300"></div>
          </button>

          <button className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
            <span className="text-lg">🤖</span>
            <span>AI Guidance</span>
            <div className="w-0 group-hover:w-2 h-2 bg-white rounded-full transition-all duration-300"></div>
          </button>
        </div>

        {/* Enhanced Stats Section with Attention-Grabbing Colors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="group bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-blue-200">
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🏫</div>
            <div className="text-2xl md:text-3xl font-black text-blue-700 mb-2">1000+</div>
            <div className="text-blue-600 text-sm font-semibold uppercase tracking-wide">Colleges Listed</div>
          </div>

          <div className="group bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-purple-200">
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">📚</div>
            <div className="text-2xl md:text-3xl font-black text-purple-700 mb-2">500+</div>
            <div className="text-purple-600 text-sm font-semibold uppercase tracking-wide">Courses Available</div>
          </div>

          <div className="group bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-green-200">
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🎓</div>
            <div className="text-2xl md:text-3xl font-black text-green-700 mb-2">50K+</div>
            <div className="text-green-600 text-sm font-semibold uppercase tracking-wide">Students Helped</div>
          </div>

          <div className="group bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-orange-200">
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">⭐</div>
            <div className="text-2xl md:text-3xl font-black text-orange-700 mb-2">4.8/5</div>
            <div className="text-orange-600 text-sm font-semibold uppercase tracking-wide">User Rating</div>
          </div>
        </div>

        {/* Enhanced Course Sidebar */}
        <CourseSidebar />
      </div>
    </div>
  );
};

const CourseSidebar = () => {
  const courses = [
    { name: "B.Tech", icon: "⚙️", color: "from-blue-500 to-blue-600", textColor: "text-blue-700" },
    { name: "M.Tech", icon: "🔧", color: "from-blue-600 to-blue-700", textColor: "text-blue-800" },
    { name: "MBA", icon: "💼", color: "from-purple-500 to-purple-600", textColor: "text-purple-700" },
    { name: "BBA", icon: "📊", color: "from-purple-600 to-purple-700", textColor: "text-purple-800" },
    { name: "BCA", icon: "💻", color: "from-green-500 to-green-600", textColor: "text-green-700" },
    { name: "MCA", icon: "🖥️", color: "from-green-600 to-green-700", textColor: "text-green-800" },
    { name: "BA", icon: "📚", color: "from-orange-500 to-orange-600", textColor: "text-orange-700" },
    { name: "MA", icon: "🎓", color: "from-orange-600 to-orange-700", textColor: "text-orange-800" },
  ];

  const [scrollIndex, setScrollIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth < 640) setItemsPerView(2);
      else if (window.innerWidth < 1024) setItemsPerView(3);
      else setItemsPerView(4);
    };
    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  useEffect(() => {
    const scrollEffect = setInterval(() => {
      setScrollIndex((prev) =>
        prev === courses.length - itemsPerView ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(scrollEffect);
  }, [courses.length, itemsPerView]);

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-8 rounded-2xl border border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        {/* Enhanced Section Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
            Popular{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Courses
            </span>
          </h2>
          <p className="text-gray-600 font-medium">Explore trending courses and find your perfect match</p>
        </div>

        {/* Enhanced Slider */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${scrollIndex * (100 / itemsPerView)}%)` }}
          >
            {courses.map((course, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-1/2 sm:w-1/3 lg:w-1/4 px-2"
              >
                <div className="group bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 rounded-xl p-5 text-center cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  <div
                    className={`bg-gradient-to-r ${course.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className="text-white text-lg">{course.icon}</span>
                  </div>
                  <h3 className={`${course.textColor} font-bold text-lg mb-1`}>{course.name}</h3>
                  <p className="text-gray-500 text-sm font-medium">Explore Programs</p>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Controls */}
          <button
            onClick={() =>
              setScrollIndex((prev) =>
                prev === 0 ? courses.length - itemsPerView : prev - 1
              )
            }
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 shadow-lg p-3 rounded-full text-gray-600 hover:text-blue-600 transition-all duration-300 transform hover:scale-110"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() =>
              setScrollIndex((prev) =>
                prev === courses.length - itemsPerView ? 0 : prev + 1
              )
            }
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 shadow-lg p-3 rounded-full text-gray-600 hover:text-blue-600 transition-all duration-300 transform hover:scale-110"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Enhanced Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: courses.length - itemsPerView + 1 }).map(
            (_, i) => (
              <button
                key={i}
                onClick={() => setScrollIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  scrollIndex === i
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 w-8"
                    : "bg-gray-300 hover:bg-gray-400 w-2"
                }`}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;

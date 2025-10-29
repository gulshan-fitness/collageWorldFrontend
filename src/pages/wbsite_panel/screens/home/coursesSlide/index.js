import React, { useEffect, useState } from "react";

const CourseSidebar = () => {
  const courses = [
    { name: "B.Tech", icon: "⚙️", color: "bg-blue-500" },
    { name: "M.Tech", icon: "🔧", color: "bg-blue-600" },
    { name: "MBA", icon: "💼", color: "bg-purple-500" },
    { name: "BBA", icon: "📊", color: "bg-purple-600" },
    { name: "BCA", icon: "💻", color: "bg-green-500" },
    { name: "MCA", icon: "🖥️", color: "bg-green-600" },
    { name: "BA", icon: "📚", color: "bg-orange-500" },
    { name: "MA", icon: "🎓", color: "bg-orange-600" },
  ];

  const [scrollIndex, setScrollIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [itemsPerView, setItemsPerView] = useState(4);

  // Responsive items per view
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

  // Auto scroll
  useEffect(() => {
    const scrollEffect = setInterval(() => {
      setScrollIndex((prev) =>
        prev === courses.length - itemsPerView ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(scrollEffect);
  }, [courses.length, itemsPerView]);

  return (
    <div className="bg-white py-8 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Popular <span className="text-blue-600">Courses</span>
          </h2>
          <p className="text-gray-500 text-sm">Explore trending courses</p>
        </div>

        {/* Slider */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${scrollIndex * (100 / itemsPerView)}%)` }}
          >
            {courses.map((course, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-1/2 sm:w-1/3 lg:w-1/4 px-2"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className={`bg-gray-50 border rounded-lg p-4 text-center cursor-pointer
                  transition-all duration-300 hover:scale-105 hover:shadow
                  ${hoveredIndex === index ? "shadow-md scale-105" : ""}`}
                >
                  <div
                    className={`${course.color} w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 transition-transform duration-300 ${hoveredIndex === index ? "scale-110" : ""
                      }`}
                  >
                    <span className="text-white text-lg">{course.icon}</span>
                  </div>
                  <h3 className="text-gray-800 font-semibold text-sm">{course.name}</h3>
                  <p className="text-gray-500 text-xs">Explore</p>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            onClick={() =>
              setScrollIndex((prev) =>
                prev === 0 ? courses.length - itemsPerView : prev - 1
              )
            }
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border shadow p-1.5 rounded-full text-gray-600 hover:text-blue-600"
          >
            ‹
          </button>
          <button
            onClick={() =>
              setScrollIndex((prev) =>
                prev === courses.length - itemsPerView ? 0 : prev + 1
              )
            }
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border shadow p-1.5 rounded-full text-gray-600 hover:text-blue-600"
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-4 space-x-1">
          {Array.from({ length: courses.length - itemsPerView + 1 }).map(
            (_, i) => (
              <button
                key={i}
                onClick={() => setScrollIndex(i)}
                className={`h-1.5 rounded-full transition-all ${scrollIndex === i
                    ? "bg-blue-600 w-5"
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

export default CourseSidebar;

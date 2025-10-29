import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../../../Context_holder";
import CoursePopUp from "../coursePopup/courserPopup";
import { Link } from "react-router-dom";

const UniversityDiv = ({ activeFilter }) => {
  const { stream_fetch, stream, course } = useContext(Context);
  const [openScreen, setOpenScreen] = useState(false);
  const [pop_upCourses, setpop_upCourses] = useState([]);

  const toggleSidebar = (boolean, courses) => {
    setpop_upCourses(courses);
    setOpenScreen(boolean);
  };

  const close_handler = () => {
    setOpenScreen(false);
  };

  const displayData = activeFilter === "all" ? stream : course;
  const isStreamData = activeFilter === "all";

  useEffect(() => {
    stream_fetch();
  }, []);

  return (
    <div className="w-full px-4">
      {/* Results count */}
      <div className="mb-6 text-center">
        <p className="text-gray-600 text-sm">
          Showing{" "}
          <span className="font-semibold text-blue-600">
            {displayData?.length || 0}
          </span>{" "}
          {isStreamData ? "streams" : "courses"}
        </p>
      </div>

      {displayData?.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
          {displayData?.map((data, index) => {
            // Agar stream h to div clickable, agar course h to Link use karein
            const CardContent = (
              <div
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 
                  cursor-pointer hover:scale-105 border border-gray-100 overflow-hidden group`}
              >
                <div className="relative">
                  <img
                    src={`${process.env.REACT_APP_API_IMAGE_URL}stream_image/${
                      isStreamData ? data?.image : data?.course_image
                    }`}
                    alt={isStreamData ? data?.stream_name : data?.courseName}
                    className="w-full h-24 sm:h-28 md:h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-3">
                  <h3 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                    {isStreamData ? data?.stream_name : data?.courseName}
                  </h3>

                  {isStreamData ? (
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium">
                        {data?.courses?.length || 0} Courses
                      </span>
                      <span className="text-gray-400">Stream</span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-md font-bold text-gray-800 ">
                          {data?.courseType}
                        </span>
                      </div>
                      <div className="bg-purple-50 text-purple-600 px-2 py-1 rounded-full text-xs font-medium text-center">
                        Course
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );

            return isStreamData ? (
              <div
                key={index}
                onClick={() => toggleSidebar(true, data?.courses)}
              >
                {CardContent}
              </div>
            ) : (
              <Link key={index} to={`/coursedetailspage/${data._id}`}>
                {CardContent}
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-4xl text-gray-400">📚</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {activeFilter === "all"
              ? "No Streams Available"
              : "No Courses Available"}
          </h3>
          <p className="text-gray-500">
            {activeFilter === "all"
              ? "There are no streams to display at the moment."
              : `No courses found for the selected filter: ${activeFilter}`}
          </p>
        </div>
      )}

      {/* Course Popup for streams */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "white",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          transform: openScreen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease-in-out",
          zIndex: 1000,
        }}
      >
        <CoursePopUp onClose={close_handler} courses={pop_upCourses} />
      </div>
    </div>
  );
};

export default UniversityDiv;

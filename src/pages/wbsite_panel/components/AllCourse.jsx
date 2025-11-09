import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Context } from "../../../Context_holder";

export default function AllCourse({ isOpen, onClose,course_handler }) {
  const { course_fetch, course } = useContext(Context);

  const [search, setSearch] = useState("");

  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    if (isOpen) {
      course_fetch();
    }
  }, [isOpen]);


  useEffect(() => {
    if (course?.length) {
      const filtered = course.filter((c) =>
        c.courseName.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [course, search]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl w-[90%] max-w-lg p-8 relative max-h-[80vh] overflow-y-auto border border-blue-100">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <AiOutlineClose size={24} />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🎓 All Courses
        </h2>

        {/* Search Input */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search course by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 text-gray-800 border border-blue-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
          />
        </div>

        {/* Course List */}
        {filteredCourses.length > 0 ? (
          <ul className="space-y-2">
            {filteredCourses.map((c) => (
              <li
                key={c._id}
                onClick={()=>{course_handler(c.courseName)
                    onClose()
                }}
                className="px-4 py-3 bg-white/70 hover:bg-blue-100 border border-blue-100 rounded-xl text-gray-800 font-medium shadow-sm hover:shadow-md cursor-pointer transition-all duration-200"
              >
                {c.courseName}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 mt-8">
            No courses found.
          </p>
        )}
      </div>
    </div>
  );
}

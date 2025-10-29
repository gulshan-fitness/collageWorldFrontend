import React, { useContext, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Context } from "../../../../../Context_holder";

const CoursePopUp = ({ onClose, courses }) => {
  const { setcourse_name } = useContext(Context);

  const uniqueCourses = courses.filter(
    (course, index, self) =>
      index === self.findIndex((c) => c.courseName === course.courseName)
  );

  return (
    <div className="p-4 relative flex gap-2 " style={{ position: 'relative', zIndex: 999999 }}>
      {uniqueCourses?.map((data, index) => (
        <Link
          to={"/allUniversity"}
          onClick={() => setcourse_name(data?.courseName)}
          key={index}
          className="mb-4 relativen  "
        >
          <div className="text-md font-bold text-black  hover:border-none
           hover:bg-[#002147] hover:text-[#fdc800] border-2 p-1 rounded-lg capitalize ">
            {data?.courseName}
          </div>
        </Link>
      ))}

      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "0rem",
          right: "1rem",
          padding: "0.5rem 1rem",
         // Tailwind blue-600
          color: "black",
          border: "none",
          borderRadius: "0.375rem",
          cursor: "pointer",
        }}
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default CoursePopUp;

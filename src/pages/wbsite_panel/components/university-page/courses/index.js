import React, { useState, useEffect, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { TiTick } from "react-icons/ti";
import AnimatedText from "../../extra/animation-charctor";
import StarRatings from "react-star-ratings";
import "../../animateBounce/bounce.css";
import Typewriter from "typewriter-effect";
import {
  BookOpenIcon,
  ClockIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { Context } from "../../../../../Context_holder";
import { Link } from "react-router-dom";

const Courses = ({ collegeDetails }) => {
  const {rounded_rating}=useContext(Context)
  const [datanum, setDatanum] = useState(3);
  const [spaciliationCount, setspaciliationCount] = useState(4);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 200,
    });
  }, []);

  const handleIncrement = () => {
    setDatanum((prev) => prev + 3);
  };

  return (
    <div className="w-full bg-white py-6">
      <div className="w-[95%] max-w-7xl mx-auto">
        {/* Compact Header Section */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl mb-3 shadow-lg">
            <BookOpenIcon className="h-6 w-6 text-white" />
          </div>
          <h2 className="font-bold text-2xl text-black mb-2">
            <Typewriter
              options={{
                strings: [
                  "Explore Our Courses",
                  "Discover Your Future",
                  "Join Our Learning Community",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                typeSpeed: 100,
                deleteSpeed: 50,
                pauseFor: 1500,
                cursor: "|",
              }}
            />
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm">
            Choose from our comprehensive range of courses designed to shape
            your future
          </p>
        </div>

        {/* Course Cards Container */}
        <div className="space-y-4">
          {collegeDetails?.courses?.slice(0, datanum).map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden"
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            >
              <div className="flex flex-col lg:flex-row">
                {/* Image Section - Small Rounded */}
                <div className="lg:w-40 flex-shrink-0 p-4 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-4 border-blue-100 shadow-md">
                      <img
                        className="w-full h-full object-cover"
                        src={`${process.env.REACT_APP_API_BASE_URL}image/course_image/${course?.courseDetail?.course_image}`}
                        alt={course?.courseDetail?.courseName}
                      />
                    </div>
                    
                    {/* Course Mode Badge */}
                    <div className="absolute -top-1 -right-1 z-10">
                      <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-md">
                        {course?.mode}
                      </span>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute -bottom-1 -left-1 z-10">
                      <div className="bg-white px-2 py-1 rounded-full shadow-md flex items-center space-x-1 border border-gray-200">
                        <StarRatings
                          rating={Number(rounded_rating(course?.avgCourseRating)) || 0}
                          starRatedColor="#fbbf24"
                          numberOfStars={5}
                          starDimension="10px"
                          starSpacing="1px"
                          readonly
                        />
                        <span className="text-gray-700 font-medium text-xs">
                          {rounded_rating(course?.avgCourseRating )?? 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-4 lg:border-l border-gray-200">
                  {/* Course Header */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-black mb-2">
                      {course?.courseDetail?.courseName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <div className="flex items-center space-x-1 text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                        <ClockIcon className="h-3 w-3 text-blue-600" />
                        <span>{course?.duration} Years</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-md">
                        <CurrencyDollarIcon className="h-3 w-3 text-green-600" />
                        <span className="font-semibold text-green-600">
                          ₹{course?.fees}/Year
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600 bg-purple-50 px-2 py-1 rounded-md">
                        <AcademicCapIcon className="h-3 w-3 text-purple-600" />
                        <span>{course?.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Course Details Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Basic Details */}
                    <div className="space-y-3">
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <h4 className="font-semibold text-black mb-2 text-sm flex items-center">
                          <BookOpenIcon className="h-4 w-4 text-blue-600 mr-2" />
                          Course Info
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-xs">Duration</span>
                            <span className="font-semibold text-black text-xs">
                              {course.duration}Y
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-xs">Mode</span>
                            <span className="font-semibold text-black text-xs">
                              {course.mode}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 text-xs">Schedule</span>
                            <span className="font-semibold text-black text-xs">
                              {course.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Specializations & Approvals */}
                    <div className="space-y-3">
                      {/* Specializations */}
                      {course?.specialisation &&
                        course?.specialisation?.length > 0 && (
                          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <h4 className="font-semibold text-black mb-2 text-sm">
                              Specializations
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {course?.specialisation
                                ?.slice(0, spaciliationCount)
                                .map((spec, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-1 bg-white text-purple-700 rounded-md text-xs font-medium border border-purple-200"
                                  >
                                    {spec}
                                  </span>
                                ))}
                              {course?.specialisation?.length > 4 &&
                                spaciliationCount !==
                                  course?.specialisation?.length && (
                                  <button
                                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium"
                                    onClick={() =>
                                      setspaciliationCount(
                                        course?.specialisation?.length
                                      )
                                    }
                                  >
                                    +{course?.specialisation?.length - 4}
                                  </button>
                                )}
                            </div>
                          </div>
                        )}

                      {/* Approvals */}
                      {course?.approved && course?.approved?.length > 0 && (
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <h4 className="font-semibold text-black mb-2 text-sm flex items-center">
                            <CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />
                            Approved By
                          </h4>
                          <div className="space-y-1.5">
                            {course?.approved?.slice(0, 2).map((approval, i) => (
                              <div
                                key={i}
                                className="flex items-center space-x-2"
                              >
                                <TiTick className="text-green-600 text-sm" />
                                <span className="text-xs font-semibold text-black">
                                  {approval}
                                </span>
                              </div>
                            ))}
                            {course?.approved?.length > 2 && (
                              <div className="text-xs text-gray-600 text-center">
                                +{course?.approved?.length - 2} more
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Reviews & CTA */}
                    <div className="space-y-3">
                      {/* Reviews */}
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                        <h4 className="font-semibold text-black mb-2 text-sm">
                          Rating
                        </h4>
                        <div className="flex items-center space-x-2 mb-2">

                          <StarRatings
                            rating={Number(rounded_rating(course?.avgCourseRating)) || 0}
                            starRatedColor="#f59e0b"
                            numberOfStars={5}
                            starDimension="14px"
                            starSpacing="1px"
                            readonly
                          />

                          <div className="text-xs">
                            <span className="font-bold text-amber-600">
                              {rounded_rating(course?.avgCourseRating) ?? 0}
                            </span>
                            <span className="text-gray-600 ml-1">/5</span>
                          </div>
                        </div>
                      </div>

                      {/* Button */}
                      <div className="pt-1 gap-1 flex flex-wrap items-center">
                        <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg text-sm">
                          <AnimatedText
                            course_name={course?.courseDetail?.courseName}
                          />

                          
                        </button>


                          <Link to={`/coursedetailspage/${course?.courseDetail?._id}`} className="w-full bg-gradient-to-r  from-blue-600 to-indigo-600 block text-center hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg text-md capitalize">
                       
Details
                          
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {datanum < (collegeDetails?.courses?.length ?? 0) && (
          <div className="text-center mt-6">
            <button
              onClick={handleIncrement}
              className="bg-white hover:bg-blue-50 text-blue-600 font-semibold py-2 px-6 rounded-lg border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md text-sm"
            >
              Load More Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;

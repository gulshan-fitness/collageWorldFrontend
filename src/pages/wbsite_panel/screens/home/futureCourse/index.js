import React, { useState } from 'react';
import { FaBullseye, FaGraduationCap, FaHandsHelping, FaBook, FaChevronDown, FaChevronUp, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const courses = [
  {
    title: 'UI/UX Design',
    jobGrowth: '22% by 2030',
    salary: '$90k/year (entry-level)',
    duration: '6 months',
    fees: '$1000',
    growth: 'High demand in tech industries',
    icon: <FaBullseye className="text-blue-600" />,
    color: 'blue',
    rating: 4.8,
    students: '2.4k'
  },
  {
    title: 'Cybersecurity',
    jobGrowth: '31% by 2029',
    salary: '$110k/year (entry-level)',
    duration: '9 months',
    fees: '$1500',
    growth: 'Critical as cyber threats increase',
    icon: <FaGraduationCap className="text-green-600" />,
    color: 'green',
    rating: 4.9,
    students: '1.8k'
  },
  {
    title: 'Artificial Intelligence',
    jobGrowth: '40% by 2030',
    salary: '$140k/year',
    duration: '12 months',
    fees: '$2500',
    growth: 'Explosive, AI is transforming all industries',
    icon: <FaHandsHelping className="text-purple-600" />,
    color: 'purple',
    rating: 4.7,
    students: '3.2k'
  },
  {
    title: 'Cloud Computing',
    jobGrowth: '26% by 2027',
    salary: '$130k/year',
    duration: '10 months',
    fees: '$1800',
    growth: 'High demand across enterprises',
    icon: <FaBook className="text-orange-600" />,
    color: 'orange',
    rating: 4.6,
    students: '2.1k'
  },
];

const FuturisticCourses = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-700',
      green: 'bg-green-50 border-green-200 text-green-700',
      purple: 'bg-purple-50 border-purple-200 text-purple-700',
      orange: 'bg-orange-50 border-orange-200 text-orange-700'
    };
    return colors[color] || colors.blue;
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={index < rating ? "text-yellow-400" : "text-gray-300"}
        size={12}
      />
    ));
  };

  return (
    <div className="w-full bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Top Futuristic High-Paying Courses for 2024
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Discover the most in-demand careers of the future with our specialized courses
          </p>
        </div>

        {/* Courses Accordion */}
        <div className="space-y-4">
          {courses.map((course, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(index)}
                className={`w-full flex items-center justify-between p-4 md:p-5 text-left transition-all duration-200 ${
                  activeIndex === index ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className={`p-2 md:p-3 rounded-lg border ${getColorClasses(course.color)}`}>
                    {course.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                        {course.jobGrowth}
                      </span>
                      <span className="text-xs text-blue-600 font-medium">
                        {course.salary.split('(')[0]}
                      </span>
                      <div className="flex items-center gap-1">
                        {renderStars(course.rating)}
                        <span className="text-xs text-gray-600">({course.rating})</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500 hidden md:block">
                    {activeIndex === index ? 'Show Less' : 'Show Details'}
                  </span>
                  {activeIndex === index ? (
                    <FaChevronUp className="text-gray-400 text-sm" />
                  ) : (
                    <FaChevronDown className="text-gray-400 text-sm" />
                  )}
                </div>
              </button>

              {/* Accordion Content */}
              {activeIndex === index && (
                <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-gray-100 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-xs md:text-sm text-gray-600 font-medium">Job Growth</span>
                        <span className="text-xs md:text-sm text-green-600 font-semibold">{course.jobGrowth}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-xs md:text-sm text-gray-600 font-medium">Average Salary</span>
                        <span className="text-xs md:text-sm text-blue-600 font-semibold">{course.salary}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-xs md:text-sm text-gray-600 font-medium">Enrolled Students</span>
                        <span className="text-xs md:text-sm text-purple-600 font-semibold">{course.students}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-xs md:text-sm text-gray-600 font-medium">Duration</span>
                        <span className="text-xs md:text-sm text-orange-600 font-semibold">{course.duration}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-xs md:text-sm text-gray-600 font-medium">Course Fees</span>
                        <span className="text-xs md:text-sm text-red-600 font-semibold">{course.fees}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-xs md:text-sm text-gray-600 font-medium">Rating</span>
                        <span className="text-xs md:text-sm text-yellow-600 font-semibold">{course.rating}/5</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-2">
                      <span className="text-xs md:text-sm text-gray-700 font-medium mt-0.5">Career Outlook:</span>
                      <span className="text-xs md:text-sm text-gray-800 flex-1">{course.growth}</span>
                    </div>
                  </div>

                  {/* <div className="flex gap-3 mt-4">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200">
                      Enroll Now
                    </button>
                    <button className="px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs md:text-sm font-medium py-2 rounded-lg transition-all duration-200">
                      View Details
                    </button>
                  </div> */}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs md:text-sm text-gray-600 mb-3">
            Ready to start your future career? Explore all our courses
          </p>
          <Link to={"/careers"} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-6 rounded-lg transition-colors duration-200">
            View All Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FuturisticCourses; 
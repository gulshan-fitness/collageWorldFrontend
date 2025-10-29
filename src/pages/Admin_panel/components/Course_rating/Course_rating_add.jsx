import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../Context_holder';
import Select from 'react-select';
import axios from 'axios';
import ReactStarsRating from 'react-awesome-stars-rating';
import { 
  FiStar, 
  FiBook, 
  FiAward, 
  FiCheckCircle,
  FiBookOpen,
  FiSend
} from 'react-icons/fi';

export default function Course_rating_add() {
  const { collage_course_fetch, college_fetch, Collage_course, notify, setselected_college, selected_college, colleges } = useContext(Context);
  const [rating_value, setrating_value] = useState(null);
  const [selected_course, setselected_course] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const onChange = (value) => {
    setrating_value(value);
  };

  useEffect(() => {
    collage_course_fetch(null, null);
    college_fetch();
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // Filter courses when college selection changes
  useEffect(() => {
    if (selected_college && Collage_course) {
      const filtered = Collage_course.filter(data => 
        data?.college_id?._id === selected_college?.value
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses([]);
    }
  }, [selected_college, Collage_course]);

  // Custom select styles with proper z-index
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: '12px 16px',
      marginTop: '6px',
      border: `2px solid ${state.isFocused ? '#3b82f6' : '#e2e8f0'}`,
      borderRadius: '12px',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none',
      backgroundColor: 'white',
      transition: 'all 0.3s ease-in-out',
      minHeight: '52px',
      '&:hover': {
        borderColor: '#3b82f6',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : 'white',
      color: state.isSelected ? 'white' : '#1f2937',
      padding: '12px 16px',
      fontSize: '14px',
      fontWeight: '500',
      borderBottom: '1px solid #f1f5f9',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        backgroundColor: state.isSelected ? '#3b82f6' : '#eff6ff',
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '12px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      zIndex: 9999,
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#1f2937',
      fontWeight: '600',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af',
    }),
    container: (provided) => ({
      ...provided,
      position: 'relative',
      zIndex: 1000,
    })
  };

  const handleSubmit = async () => {
    if (!selected_course || !rating_value) {
      notify('Please select a course and provide a rating', 0);
      return;
    }

    setIsSubmitting(true);

    const course_id = selected_course?.value;
    const rating = rating_value;

    const data = {
      collage_course_id: course_id,
      rating: rating,
    };

    try {
      const success = await axios.post(
        process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_COURSE_RATING_URL + "add", 
        data
      );
      
      notify(success.data.msg, success.data.status);

      if (success.data.status === 1) {
        setselected_course(null);
        setrating_value(null);
        setselected_college(null);
      }
    } catch (error) {
      console.error('Error:', error);
      notify('Failed to submit rating. Please try again.', 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get rating label and color
  const getRatingInfo = (value) => {
    if (!value) return { label: 'Not rated', color: 'text-gray-500' };
    if (value >= 4) return { label: 'Excellent', color: 'text-emerald-600' };
    if (value >= 3) return { label: 'Good', color: 'text-blue-600' };
    if (value >= 2) return { label: 'Average', color: 'text-yellow-600' };
    return { label: 'Poor', color: 'text-red-600' };
  };

  const ratingInfo = getRatingInfo(rating_value);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative">
      
      {/* Background Elements - Lower z-index */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none ">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-2xl mx-auto ">
        
        {/* Main Card */}
        <div className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8 sm:px-8 sm:py-10 relative ">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <FiStar className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-3">
              Course Rating
            </h1>
            <p className="text-blue-100 text-center text-lg max-w-2xl mx-auto">
              Share your experience and help students choose the right courses
            </p>
          </div>

          {/* Form Section */}
          <div className="px-6 py-8 sm:px-8 sm:py-10 relative ">
            
            {/* College Selection - High z-index */}
            <div className="mb-8 transform transition-all duration-300 hover:scale-[1.01] relative ">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-3">1</div>
                Select College
                <span className="text-red-400 ml-1">*</span>
              </label>
              <Select
                value={selected_college}
                styles={customSelectStyles}
                onChange={(e) => { setselected_college(e); setselected_course(null); }}
                name="college_id"
                options={colleges?.map(data => ({ value: data._id, label: data.college_name }))}
                placeholder="Search for college..."
                isSearchable
                noOptionsMessage={() => "No colleges found"}
                menuPortalTarget={document.body}
                menuPosition="fixed"
              />
            </div>

            {/* Course Selection - High z-index */}
            <div className="mb-8 transform transition-all duration-300 hover:scale-[1.01] relative ">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs mr-3">2</div>
                Select Course
                <span className="text-red-400 ml-1">*</span>
              </label>
              <Select
                value={selected_course}
                styles={customSelectStyles}
                onChange={(e) => setselected_course(e)}
                name="Course_id"
                options={filteredCourses?.map(data => ({ 
                  value: data._id, 
                  label: data?.Course_id?.courseName,
                  college: data?.college_id?.college_name
                }))}
                placeholder={selected_college ? "Select course..." : "Please select a college first"}
                isSearchable
                isDisabled={!selected_college}
                noOptionsMessage={() => selected_college ? "No courses found" : "Please select a college first"}
                menuPortalTarget={document.body}
                menuPosition="fixed"
              />
              {selected_college && filteredCourses.length === 0 && (
                <p className="text-sm text-gray-500 mt-2 flex items-center">
                  <FiBookOpen className="w-4 h-4 mr-2" />
                  No courses available for this college
                </p>
              )}
            </div>

            {/* Course Info Preview - Lower z-index */}
            {selected_course && (
              <div className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-4 transform transition-all duration-300 relative ">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiBook className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">
                      {selected_course.label}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {selected_college?.label}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Rating Section - Lower z-index */}
            <div className="mb-8 transform transition-all duration-300 hover:scale-[1.01] relative ">
              <label className="block text-sm font-semibold text-gray-700 mb-4 flex items-center">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-3">3</div>
                Rate Your Experience
                <span className="text-red-400 ml-1">*</span>
              </label>
              
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                {/* Stars Rating */}
                <div className="flex justify-center mb-4">
                  <ReactStarsRating 
                    onChange={onChange} 
                    value={rating_value} 
                    className="flex"
                    starGap="8px"
                   
                    primaryColor="#f59e0b"
                    secondaryColor="#e5e7eb"
                 
                  />
                </div>

                {/* Rating Display */}
                {rating_value && (
                  <div className="text-center">
                    <div className={`inline-flex items-center px-4 py-2 bg-amber-100 text-amber-800 rounded-full font-bold text-lg shadow-md transition-all duration-300 hover:scale-105`}>
                      <span>{rating_value.toFixed(1)}</span>
                      <span className="mx-2">•</span>
                      <span className={ratingInfo.color}>{ratingInfo.label}</span>
                    </div>
                  </div>
                )}

                {/* Rating Labels */}
                <div className="flex justify-between text-xs text-gray-500 mt-4 px-2">
                  <span>Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Very Good</span>
                  <span>Excellent</span>
                </div>
              </div>
            </div>

            {/* Submit Button - Lower z-index */}
            <div className="pt-6 transform transition-all duration-300 hover:scale-[1.01] relative ">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !selected_course || !rating_value}
                className={`
                  relative overflow-hidden
                  w-full
                  bg-gradient-to-r from-blue-500 to-indigo-600
                  hover:from-blue-600 hover:to-indigo-700
                  disabled:from-gray-400 disabled:to-gray-500
                  text-white font-bold py-4 px-8 
                  rounded-xl shadow-lg
                  transform transition-all duration-300
                  hover:shadow-xl
                  focus:outline-none focus:ring-4 focus:ring-blue-200
                  disabled:cursor-not-allowed
                  group
                `}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting Rating...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <FiSend className="w-5 h-5" />
                    <span className="text-lg">Submit Rating</span>
                  </div>
                )}
              </button>
            </div>

            {/* Help Text - Lower z-index */}
            <div className="text-center pt-6 border-t border-gray-200 relative">
              <div className="flex items-center justify-center text-gray-500 text-sm">
                <FiAward className="w-4 h-4 mr-2" />
                Your honest rating helps future students make better choices
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards - Lower z-index */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 relative ">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FiStar className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">Honest Ratings</h3>
            <p className="text-xs text-gray-600">Real experiences</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FiBook className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">Course Specific</h3>
            <p className="text-xs text-gray-600">Targeted feedback</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FiCheckCircle className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">Verified</h3>
            <p className="text-xs text-gray-600">Authentic reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
}
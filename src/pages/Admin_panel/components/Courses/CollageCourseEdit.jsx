import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../../../Context_holder';
import Select from 'react-select';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { 
  FiSave, 
  FiBook, 
  FiHome, 
  FiCalendar, 
  FiDollarSign, 
  FiAward, 
  FiClock, 
  FiCheckCircle,
  FiGlobe,
  FiUsers,
  FiTrendingUp,
  FiEdit3
} from 'react-icons/fi';

export default function CollageCourse_edit() {
  const {
    college_fetch, colleges, selected_college, setselected_college,
    currenetcourse, token, collage_course_fetch, course_fetch,
    CurrentCollage_course, selected_stream, setselected_stream,
    notify, course, admin
  } = useContext(Context);

  const { id } = useParams();
  const [currenet_data, setcurrenet_data] = useState(null);
  const [SelectedCourse, setSelectedCourse] = useState(null);
  const [SelectedMode, setSelectedMode] = useState(null);
  const [Selectedtime, setSelectedtime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!admin) return;

    setIsLoading(true);
    
    if (admin?.role === "subadmin" && admin?.collage_id) {
      college_fetch(admin?.collage_id);
    } else if (admin?.role === "superadmin") {
      college_fetch();
    }

    course_fetch();
    collage_course_fetch(id, null);
    
    setTimeout(() => setIsLoading(false), 800);
  }, [admin, id]);

  useEffect(() => {
    if (CurrentCollage_course) {
      setcurrenet_data(CurrentCollage_course);
      setselected_college({
        label: CurrentCollage_course?.college_id?.college_name,
        value: CurrentCollage_course?.college_id?._id
      });
      setSelectedCourse({
        label: CurrentCollage_course?.Course_id?.courseName,
        value: CurrentCollage_course?.Course_id?._id
      });
      setSelectedMode(CurrentCollage_course?.mode);
      setSelectedtime(CurrentCollage_course?.time);
    }
  }, [CurrentCollage_course]);

  // Custom styles for react-select
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'white',
      borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
      borderWidth: '2px',
      borderRadius: '12px',
      padding: '8px 12px',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none',
      '&:hover': {
        borderColor: '#3b82f6'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : 'white',
      color: state.isSelected ? 'white' : '#1f2937',
      padding: '12px 16px',
      fontSize: '14px'
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '12px',
      border: '2px solid #e5e7eb',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const college_id = selected_college?.value;
    const Course_id = SelectedCourse?.value;
    const duration = e.target.duration.value;
    const specialisation = e.target.specialisation.value.split("$").filter(a => a !== "");
    const scholarship = e.target.scholarship.value;
    const mode = SelectedMode;
    const time = Selectedtime;
    const fees = e.target.fees.value;
    const approved = e.target.approved.value.split("$").filter(a => a !== "");

    const formData = {
      college_id,
      Course_id,
      duration,
      specialisation,
      scholarship,
      mode,
      time,
      fees,
      approved,
    };

    axios.put(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_COLLAGECOURSE_URL}edit/${id}`, formData, {
      headers: { Authorization: token }
    })
    .then((response) => {
      if (response.data.status === 1) {
        notify(response.data.msg, response.data.status);
        collage_course_fetch(id, null);
      }
      setIsSubmitting(false);
    })
    .catch((error) => {
      console.error('Error:', error);
      setIsSubmitting(false);
    });
  };

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="h-10 bg-gray-200 rounded-xl w-48 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 animate-pulse">
            <div className="space-y-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-16 bg-gray-200 rounded-xl"></div>
                  <div className="h-16 bg-gray-200 rounded-xl"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Premium Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <FiEdit3 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Edit Course Program</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Update course details and specifications for {CurrentCollage_course?.college_id?.college_name}
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Course Information</h2>
                <p className="text-blue-100 mt-2">Update course details and program specifications</p>
              </div>
              <div className="bg-white/20 rounded-xl px-4 py-2 backdrop-blur-sm">
                <span className="text-white font-semibold text-sm">EDIT MODE</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            
            {/* Institution & Course Selection */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-2 h-8 bg-blue-600 rounded-full mr-3"></div>
                Institution & Course Details
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                
                {/* College Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                    <FiHome className="text-blue-500" />
                    <span>College <span className="text-red-500">*</span></span>
                  </label>
                  <Select
                    value={selected_college}
                    styles={customStyles}
                    onChange={(e) => { setselected_college(e) }}
                    name="college_id"
                    options={colleges?.map(data => ({
                      value: data._id,
                      label: data.college_name
                    }))}
                    placeholder="Select college"
                    isDisabled={admin?.role === "subadmin"}
                  />
                  {admin?.role === "subadmin" && (
                    <p className="text-sm text-blue-600 mt-1">College selection is auto-filled for your institution</p>
                  )}
                </div>

                {/* Course Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                    <FiBook className="text-green-500" />
                    <span>Course <span className="text-red-500">*</span></span>
                  </label>
                  <Select
                    value={SelectedCourse}
                    styles={customStyles}
                    onChange={(e) => { setSelectedCourse(e) }}
                    name="course_id"
                    options={course?.map(data => ({
                      value: data._id,
                      label: data.courseName
                    }))}
                    placeholder="Select course"
                  />
                </div>
              </div>
            </div>

            {/* Program Specifications */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-2 h-8 bg-green-600 rounded-full mr-3"></div>
                Program Specifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                
                {/* Duration */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                    <FiCalendar className="text-purple-500" />
                    <span>Duration (Years) <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    defaultValue={CurrentCollage_course?.duration}
                    required
                    min="1"
                    max="10"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="e.g., 4"
                  />
                </div>

                {/* Mode */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                    <FiGlobe className="text-orange-500" />
                    <span>Mode <span className="text-red-500">*</span></span>
                  </label>
                  <select
                    id="mode"
                    name="mode"
                    required
                    value={SelectedMode}
                    onChange={(e) => { setSelectedMode(e.target.value) }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  >
                    <option value="">Select Mode</option>
                    <option value="On-Campus">On Campus</option>
                    <option value="Distance">Distance</option>
                  </select>
                </div>

                {/* Time */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                    <FiClock className="text-red-500" />
                    <span>Time <span className="text-red-500">*</span></span>
                  </label>
                  <select
                    id="time"
                    name="time"
                    required
                    value={Selectedtime}
                    onChange={(e) => { setSelectedtime(e.target.value) }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  >
                    <option value="">Select Time</option>
                    <option value="Full Time">Full-Time</option>
                    <option value="Part Time">Part-Time</option>
                    <option value="Distance">Distance</option>
                  </select>
                </div>

                {/* Fees */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                    <FiDollarSign className="text-green-500" />
                    <span>Fees (₹)</span>
                  </label>
                  <input
                    type="number"
                    id="fees"
                    name="fees"
                    defaultValue={CurrentCollage_course?.fees}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="Annual fees"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-2 h-8 bg-purple-600 rounded-full mr-3"></div>
                Additional Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Specializations */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Specializations
                    <span className="text-red-500 text-xs ml-2">($ separated)</span>
                  </label>
                  <input
                    type="text"
                    id="specialisation"
                    name="specialisation"
                    defaultValue={CurrentCollage_course?.specialisation?.join("$")}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="Spec1$Spec2$Spec3"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate multiple specializations with $ symbol</p>
                </div>

                {/* Approvals */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Approvals & Affiliations
                    <span className="text-red-500 text-xs ml-2">($ separated)</span>
                  </label>
                  <input
                    type="text"
                    id="approved"
                    name="approved"
                    defaultValue={CurrentCollage_course?.approved?.join("$")}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="Approval1$Approval2"
                  />
                </div>

                {/* Scholarship */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center space-x-2">
                    <FiAward className="text-yellow-500" />
                    <span>Scholarship Information</span>
                  </label>
                  <input
                    type="text"
                    id="scholarship"
                    name="scholarship"
                    defaultValue={CurrentCollage_course?.scholarship}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="Scholarship details"
                  />
                </div>
              </div>
            </div>

            {/* Current Course Preview */}
            {CurrentCollage_course && (
              <div className="mb-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center space-x-2">
                  <FiTrendingUp className="text-blue-600" />
                  <span>Current Course Preview</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-blue-800">College:</span>
                    <p className="text-blue-700">{CurrentCollage_course?.college_id?.college_name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-blue-800">Course:</span>
                    <p className="text-blue-700">{CurrentCollage_course?.Course_id?.courseName}</p>
                  </div>
                  <div>
                    <span className="font-medium text-blue-800">Duration:</span>
                    <p className="text-blue-700">{CurrentCollage_course?.duration} Years</p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 px-12 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <FiSave className="w-5 h-5 text-white" />
                )}
                <span className="text-lg">{isSubmitting ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
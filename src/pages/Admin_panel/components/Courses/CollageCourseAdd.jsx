import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../../Context_holder';
import Select from 'react-select';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CollageCourseAdd() {
  const {
    college_fetch, colleges, selected_college, setselected_college,
    token, stream, selected_stream, setselected_stream, notify,
    course_fetch, course, admin
  } = useContext(Context);

  const [SelectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    if (!admin) return;

    if (admin?.role === "subadmin" && admin?.collage_id) {
      college_fetch(admin?.collage_id);
    } else if (admin?.role === "superadmin") {
      college_fetch();
    }

    setselected_college(null);
    course_fetch();
  }, [admin]);

  console.log(colleges,"colleges");
  

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

    const college_id = selected_college?.value;
    const Course_id = SelectedCourse?.value;
    const duration = e.target.duration.value;
    const specialisation = e.target.specialisation.value.split("$").filter(a => a !== "");
    const scholarship = e.target.scholarship.value;
    const mode = e.target.mode.value;
    const time = e.target.time.value;
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

    axios.post(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_COLLAGECOURSE_URL}add`, formData, {
      headers: {
        Authorization: token
      }
    })
      .then((response) => {
        notify(response.data.msg, response.data.status);

        if (response.data.status === 1) {
          e.target.reset();
          setselected_college(null);
          setSelectedCourse(null);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-4 sm:py-6 px-3 sm:px-6 lg:px-8">
  <div className="max-w-6xl mx-auto w-full">
    {/* Header */}
    <div className="text-center mb-6 sm:mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-3 sm:mb-4 mx-auto">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
      </div>
      <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">Add College Course</h1>
      <p className="text-gray-600 text-base sm:text-lg max-w-md sm:max-w-2xl mx-auto px-2">
        Link courses to colleges with detailed program information.
      </p>
    </div>

    {/* Main Form */}
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 sm:px-6 py-5 sm:py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Course Assignment</h2>
          <p className="text-blue-100 text-sm sm:text-base mt-1 sm:mt-2">
            Configure course details for specific colleges
          </p>
        </div>
        <div className="bg-white/20 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm self-start sm:self-center">
          <span className="text-white font-semibold text-xs sm:text-sm">NEW COURSE</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8">
        {/* College & Course Section */}
        <div className="mb-6 sm:mb-8">

          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">

            <div className="w-2 h-6 sm:h-8 bg-blue-600 rounded-full mr-2 sm:mr-3"></div>
            Institution & Course Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-1 sm:space-y-2">
              <label className="block text-sm font-semibold text-gray-700">College <span className="text-red-500">*</span></label>
              <Select
                value={selected_college}
                styles={customStyles}
                onChange={(e) => setselected_college(e)}
                options={colleges?.map(d => ({ value: d?._id, label: d?.college_name }))}
                placeholder="Select college"
               
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Course <span className="text-red-500">*</span></label>
              <Select
                value={SelectedCourse}
                styles={customStyles}
                onChange={(e) => setSelectedCourse(e)}
                options={course?.map(d => ({ value: d._id, label: d.courseName }))}
                placeholder="Select course"
              />
            </div>
          </div>
        </div>

        {/* Program Details */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
            <div className="w-2 h-6 sm:h-8 bg-green-600 rounded-full mr-2 sm:mr-3"></div>
            Program Specifications
          </h3>

          {/* Stack to 1 column on small screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Duration (Years)</label>
              <input type="number" name="duration" required className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="e.g. 4" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Mode</label>
              <select name="mode" required className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                <option value="">Select Mode</option>
                <option>On Campus</option>
                <option>Distance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Time</label>
              <select name="time" required className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                <option value="">Select Time</option>
                <option>Full Time</option>
                <option>Part Time</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Fees (₹)</label>
              <input type="number" name="fees" className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200" placeholder="Annual fees" />
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
            <div className="w-2 h-6 sm:h-8 bg-purple-600 rounded-full mr-2 sm:mr-3"></div>
            Additional Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <input name="specialisation" placeholder="Spec1$Spec2" className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
            <input name="approved" placeholder="Approval1$Approval2" className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
            <input name="scholarship" placeholder="Scholarship info" className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4 sm:pt-6">
          <button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:scale-105 text-white font-semibold py-3 sm:py-4 px-8 sm:px-12 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add College Course</span>
          </button>
        </div>
      </form>
    </div>

    {/* Stats Section */}
    <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
      {[{
        label: 'Available Colleges', count: colleges?.length || 0, color: 'blue'
      }, {
        label: 'Available Courses', count: course?.length || 0, color: 'green'
      }, {
        label: 'Your Role', count: admin?.role || 'User', color: 'purple'
      }].map((card, i) => (
        <div key={i} className={`bg-white/90 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-lg border border-white/30`}>
          <div className="flex items-center">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-${card.color}-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4`}>
              <svg className={`w-5 h-5 sm:w-6 sm:h-6 text-${card.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">{card.label}</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900 capitalize">{card.count}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}
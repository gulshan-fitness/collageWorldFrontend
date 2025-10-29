import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../Context_holder';
import Select from 'react-select';
import axios from 'axios';
import { 
  FiUser, 
  FiBook, 
  FiAward, 
  FiBriefcase, 
  FiPlus,
  FiHome,
  FiCheckCircle
} from 'react-icons/fi';

export default function Faculty_add() {
  const { college_fetch, colleges, selected_college, setselected_college, token, notify, admin } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!admin) return;

    if (admin?.role === "subadmin" && admin?.collage_id) {
      college_fetch(admin?.collage_id);
    } else if (admin?.role === "superadmin") {
      college_fetch();
    }

    setselected_college(null);
  }, [admin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const college_id = selected_college?.value;
    const name = e.target.name.value;
    const department = e.target.department.value;
    const designation = e.target.designation.value;
    const qualification = e.target.qualification.value;

    const data = {
      college_id: college_id,
      name: name,
      department: department,
      designation: designation,
      qualification: qualification
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_FACULTY_URL}add`,
        data,
        {
          headers: { Authorization: token }
        }
      );

      notify(response.data.msg, response.data.status);

      if (response.data.status === 1) {
        e.target.reset();
        setselected_college(null);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      notify('Failed to add faculty member', 0);
    } finally {
      setIsLoading(false);
    }
  };

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '56px',
      border: state.isFocused ? '2px solid #3b82f6' : '2px solid #e5e7eb',
      borderRadius: '12px',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none',
      transition: 'all 0.2s ease-in-out',
      backgroundColor: '#fafafa',
      '&:hover': {
        borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : 'white',
      color: state.isSelected ? 'white' : '#1f2937',
      padding: '12px 16px',
      fontSize: '14px',
      borderRadius: '8px',
      margin: '2px 8px',
      width: 'calc(100% - 16px)',
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      overflow: 'hidden',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af',
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FiUser className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Add Faculty Member
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Add new faculty members to your institution with their professional details
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-2xl p-6 flex items-center space-x-4 animate-fade-in">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FiCheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800">Faculty Added Successfully!</h3>
              <p className="text-green-600">The new faculty member has been added to the system.</p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FiPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Faculty Details</h2>
                <p className="text-blue-100 text-sm">Enter the faculty member's information</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-8">
              
              {/* First Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* College Selection */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <FiHome className="text-blue-500" />
                    <label htmlFor="college_id" className="block text-lg font-semibold text-gray-800">
                      College
                    </label>
                  </div>
                  <Select
                    value={selected_college}
                    styles={customSelectStyles}
                    onChange={(e) => setselected_college(e)}
                    name="college_id"
                    options={colleges?.map(data => ({ 
                      value: data._id, 
                      label: data.college_name 
                    }))}
                    placeholder="Select college..."
                    isSearchable
                    required
                    noOptionsMessage={() => "No colleges found"}
                  />
                  <p className="text-sm text-gray-500">
                    Choose the college where the faculty member works
                  </p>
                </div>

                {/* Name Input */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <FiUser className="text-blue-500" />
                    <label htmlFor="name" className="block text-lg font-semibold text-gray-800">
                      Full Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-800"
                      placeholder="Enter full name"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Faculty member's complete name
                  </p>
                </div>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Department Input */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <FiBook className="text-blue-500" />
                    <label htmlFor="department" className="block text-lg font-semibold text-gray-800">
                      Department
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      id="department"
                      name="department"
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-800"
                      placeholder="e.g., Computer Science"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Academic department or faculty
                  </p>
                </div>

                {/* Designation Input */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <FiBriefcase className="text-blue-500" />
                    <label htmlFor="designation" className="block text-lg font-semibold text-gray-800">
                      Designation
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      id="designation"
                      name="designation"
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-800"
                      placeholder="e.g., Professor, Assistant Professor"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Current position or title
                  </p>
                </div>
              </div>

              {/* Third Row */}
              <div className="grid grid-cols-1 gap-8">
                
                {/* Qualification Input */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <FiAward className="text-blue-500" />
                    <label htmlFor="qualification" className="block text-lg font-semibold text-gray-800">
                      Qualification
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      id="qualification"
                      name="qualification"
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-800"
                      placeholder="e.g., Ph.D. in Computer Science, M.Tech"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Educational qualifications and degrees
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-12 pt-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={isLoading}
                className={`px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-700 hover:to-indigo-700'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Faculty...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <FiUser className="w-5 h-5 mr-2" />
                    Add Faculty Member
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FiBook className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Faculty Information Tips</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Ensure all information is accurate and up-to-date
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Use proper titles and designations
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Include all relevant qualifications and degrees
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Double-check the college selection before submitting
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
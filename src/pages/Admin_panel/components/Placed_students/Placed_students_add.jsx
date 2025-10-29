import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../Context_holder';
import Select from 'react-select';
import axios from 'axios';
import { 
  FiUser, 
  FiBriefcase, 
  FiMessageSquare, 
  FiImage, 
  FiHome,
  FiPlus,
  FiUpload,
  FiCheckCircle
} from 'react-icons/fi';

export default function Placed_students_add() {
  const { college_fetch, colleges, selected_college, setselected_college, token, notify, admin } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (!admin) return;

    if (admin?.role === "subadmin" && admin?.collage_id) {
      college_fetch(admin?.collage_id);
    } else if (admin?.role === "superadmin") {
      college_fetch();
    }

    setselected_college(null);
  }, [admin]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const college_id = selected_college?.value;
    const student_name = e.target.student_name.value;
    const company = e.target.company.value;
    const review = e.target.review.value;
    const student_image = e.target.student_image.files[0];

    if (!student_image) {
      notify('Please select a student image', 0);
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('college_id', college_id);
    formData.append('student_name', student_name);
    formData.append('company', company);
    formData.append('review', review);
    formData.append('student_image', student_image);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_PLACED_STUDENTS_URL}add`,
        formData,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      notify(response.data.msg, response.data.status);

      if (response.data.status === 1) {
        e.target.reset();
        setselected_college(null);
        setImagePreview(null);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      notify('Failed to add placed student', 0);
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FiUser className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Add Placed Student
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Celebrate student success by adding their placement achievements
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-2xl p-6 flex items-center space-x-4 animate-fade-in">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FiCheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800">Student Added Successfully!</h3>
              <p className="text-green-600">The placed student has been added to the system.</p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          
          {/* Card Header */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FiPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Student Placement Details</h2>
                <p className="text-green-100 text-sm">Enter the student's placement information</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="space-y-8">
              
              {/* First Row - College, Name, Company */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                
                {/* College Selection */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <FiHome className="text-green-500" />
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
                    Student's college institution
                  </p>
                </div>

                {/* Student Name */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <FiUser className="text-green-500" />
                    <label htmlFor="student_name" className="block text-lg font-semibold text-gray-800">
                      Student Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      id="student_name"
                      name="student_name"
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-200 transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-800"
                      placeholder="Enter student name"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Full name of the student
                  </p>
                </div>

                {/* Company */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <FiBriefcase className="text-green-500" />
                    <label htmlFor="company" className="block text-lg font-semibold text-gray-800">
                      Company
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-200 transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-800"
                      placeholder="Company name"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Placement company/organization
                  </p>
                </div>
              </div>

              {/* Second Row - Review and Image */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                
                {/* Review */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <FiMessageSquare className="text-green-500" />
                    <label htmlFor="review" className="block text-lg font-semibold text-gray-800">
                      Student Review
                    </label>
                  </div>
                  <div className="relative">
                    <textarea
                      id="review"
                      name="review"
                      required
                      rows={6}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-200 transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-800 resize-none"
                      placeholder="Share the student's experience and journey..."
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Student's placement experience and feedback
                  </p>
                </div>

                {/* Image Upload */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <FiImage className="text-green-500" />
                    <label htmlFor="student_image" className="block text-lg font-semibold text-gray-800">
                      Student Photo
                    </label>
                  </div>
                  
                  {/* Image Preview and Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-green-400 transition-all duration-200 bg-gray-50">
                    {imagePreview ? (
                      <div className="space-y-4">
                        <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-xl shadow-md"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview(null);
                              document.getElementById('student_image').value = '';
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-sm text-green-600 font-medium">Image selected</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
                          <FiUpload className="w-8 h-8 text-green-500" />
                        </div>
                        <div>
                          <p className="text-gray-600 font-medium">Upload student photo</p>
                          <p className="text-gray-500 text-sm mt-1">PNG, JPG, JPEG up to 5MB</p>
                        </div>
                      </div>
                    )}
                    
                    <input
                      type="file"
                      id="student_image"
                      name="student_image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="student_image"
                      className="inline-block mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors duration-200 cursor-pointer shadow-md hover:shadow-lg"
                    >
                      Choose File
                    </label>
                  </div>
                  <p className="text-sm text-gray-500">
                    Professional photo of the student
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center lg:justify-end mt-12 pt-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full lg:w-auto px-12 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-green-700 hover:to-blue-700'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Student...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <FiUser className="w-5 h-5 mr-2" />
                    Add Placed Student
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-green-100">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FiBriefcase className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Placement Information Tips</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Use high-quality professional photos of students
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Include authentic student experiences and feedback
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Verify company names and student details
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Ensure proper college selection before submission
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
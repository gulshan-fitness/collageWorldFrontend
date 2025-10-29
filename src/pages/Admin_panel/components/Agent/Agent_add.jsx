import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../Context_holder';
import Select from 'react-select';
import axios from 'axios';

export default function Agent_add() {
  const { college_fetch, colleges, selected_college, setselected_college, token, notify, admin } = useContext(Context);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null);

  useEffect(() => {
    if (!admin) return;

    if (admin?.role === "subadmin" && admin?.collage_id) {
      college_fetch(admin?.collage_id);
    } else if (admin?.role === "superadmin") {
      college_fetch();
    }

    setselected_college(null);
    setTimeout(() => setIsVisible(true), 100);
  }, [admin]);

  // Handle profile image preview
  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
      zIndex: 9999, // High z-index to ensure it appears above other elements
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999, // Ensure menu portal has high z-index
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
      zIndex: 1000, // High z-index for the container
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const college_id = selected_college?.value;
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const AgentProfile = e.target.Profile.files[0];

    if (!college_id || !name || !phone || !AgentProfile) {
      notify('Please fill all required fields', 0);
      setIsSubmitting(false);
      return;
    }

    const formdata = new FormData();
    formdata.append("college_id", college_id);
    formdata.append("name", name);
    formdata.append("phone", phone);
    formdata.append("Profile", AgentProfile);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_AGENT_URL}add`, 
        formdata, 
        {
          headers: {
            Authorization: token
          }
        }
      );

      notify(response.data.msg, response.data.status);
      if (response.data.status === 1) {
        e.target.reset();
        setselected_college(null);
        setProfilePreview(null);
      }
    } catch (error) {
      console.log(error);
      notify('Error adding agent. Please try again.', 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName = "w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 bg-white font-medium text-gray-700 placeholder-gray-400";

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative">
      {/* Background Elements - Lower z-index */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none ">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-4xl mx-auto ">
        {/* Main Card */}
        <div className={`relative bg-white rounded-3xl shadow-2xl border border-white/20 backdrop-blur-sm overflow-hidden transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8 sm:px-8 sm:py-10 relative ">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-3">
              Add New Agent
            </h1>
            <p className="text-blue-100 text-center text-lg max-w-2xl mx-auto">
              Create a new agent profile to manage college admissions and student outreach
            </p>
          </div>

          {/* Form Section */}
          <div className="px-6 py-8 sm:px-8 sm:py-10 relative ">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* College Selection - With proper z-index */}
              <div className="transform transition-all duration-300 hover:scale-[1.01] relative ">
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-3">1</div>
                  College
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <Select
                  value={selected_college}
                  styles={customSelectStyles}
                  onChange={(e) => setselected_college(e)}
                  name="college_id"
                  options={colleges?.map(data => ({ value: data._id, label: data.college_name }))}
                  placeholder="Select college..."
                  isSearchable
                  noOptionsMessage={() => "No colleges found"}
                  menuPortalTarget={document.body} // Render menu in body to avoid clipping
                  menuPosition="fixed" // Fixed positioning for the menu
                />
              </div>

              {/* Profile Image Upload */}
              <div className="transform transition-all duration-300 hover:scale-[1.01] relative ">
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs mr-3">2</div>
                  Profile Picture
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* Image Preview */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden">
                      {profilePreview ? (
                        <img 
                          src={profilePreview} 
                          alt="Profile preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-4">
                          <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs text-gray-500">No image</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* File Input */}
                  <div className="flex-1">
                    <input
                      type="file"
                      id="Profile"
                      name="Profile"
                      accept="image/*"
                      onChange={handleProfileChange}
                      required
                      className="hidden"
                    />
                    <label
                      htmlFor="Profile"
                      className="block w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer text-center"
                    >
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <div>
                          <span className="text-blue-600 font-semibold">Click to upload</span>
                          <span className="text-gray-500 ml-1">or drag and drop</span>
                        </div>
                        <p className="text-xs text-gray-400">PNG, JPG, JPEG up to 5MB</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Name and Phone - Side by side on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative ">
                {/* Name Input */}
                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-3">3</div>
                    Full Name
                    <span className="text-red-400 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Enter agent's full name"
                    className={inputClassName}
                  />
                </div>

                {/* Phone Input */}
                <div className="transform transition-all duration-300 hover:scale-[1.01]">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs mr-3">4</div>
                    Phone Number
                    <span className="text-red-400 ml-1">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="Enter phone number"
                    className={inputClassName}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 transform transition-all duration-300 hover:scale-[1.01] relative ">
                <button
                  type="submit"
                  disabled={isSubmitting}
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
                      <span>Adding Agent...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span className="text-lg">Add New Agent</span>
                    </div>
                  )}
                </button>
              </div>

              {/* Help Text */}
              <div className="text-center pt-6 border-t border-gray-200 relative ">
                <div className="flex items-center justify-center text-gray-500 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  All fields marked with * are required
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Feature Cards - Lower z-index */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 relative ">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">Verified</h3>
            <p className="text-xs text-gray-600">Secure process</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">Protected</h3>
            <p className="text-xs text-gray-600">Data security</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">Fast</h3>
            <p className="text-xs text-gray-600">Quick setup</p>
          </div>
        </div>
      </div>
    </div>
  );
}
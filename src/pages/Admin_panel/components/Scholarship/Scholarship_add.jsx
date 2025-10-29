import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../Context_holder';
import Select from 'react-select';
import axios from 'axios';

export default function Scholarship_add() {
  const { college_fetch, colleges, selected_college, setselected_college, token, notify, admin } = useContext(Context);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);

    const college_id = selected_college?.value;
    const scholarship_type = e.target.scholarship_type.value;
    const organisation = e.target.organisation.value;
    const application_deadline = e.target.application_deadline.value;
    const no_Of_scholarship = e.target.no_Of_scholarship.value;
    const amount = e.target.amount.value;
    const international_students = e.target.international_students.value;
    const scholarship_link = e.target.scholarship_link.value;

    const data = {
      college_id: college_id,
      scholarship_type: scholarship_type,
      organisation: organisation,
      application_deadline: application_deadline,
      no_Of_scholarship: no_Of_scholarship,
      amount: amount,
      international_students: international_students,
      scholarship_link: scholarship_link
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_SCHOLARSHIP_URL}add`, 
        data,
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
      }
    } catch (error) {
      console.error('Error adding scholarship:', error);
      notify('Failed to add scholarship. Please try again.', 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '48px',
      border: state.isFocused ? '2px solid #3b82f6' : '1px solid #d1d5db',
      borderRadius: '12px',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none',
      backgroundColor: '#f9fafb',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        borderColor: state.isFocused ? '#3b82f6' : '#9ca3af'
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
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Add New Scholarship
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create scholarship opportunities for students and help them achieve their academic goals
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l9-5m-9 5v9" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Scholarship Information</h2>
                <p className="text-blue-100 text-sm">Fill in the details to create a new scholarship</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="space-y-6">
              {/* College Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  College
                </label>
                <Select
                  value={selected_college}
                  styles={customStyles}
                  onChange={(e) => setselected_college(e)}
                  name="college_id"
                  options={colleges?.map(data => ({ 
                    value: data._id, 
                    label: data.college_name 
                  }))}
                  placeholder="Select a college..."
                  isSearchable
                  required
                />
              </div>

              {/* Scholarship Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Scholarship Type */}
                <div>
                  <label htmlFor="scholarship_type" className="block text-sm font-semibold text-gray-700 mb-2">
                    Scholarship Type
                  </label>
                  <input
                    type="text"
                    id="scholarship_type"
                    name="scholarship_type"
                    required
                    placeholder="e.g., Merit-based, Need-based"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-all duration-200 placeholder-gray-400"
                  />
                </div>

                {/* Organisation */}
                <div>
                  <label htmlFor="organisation" className="block text-sm font-semibold text-gray-700 mb-2">
                    Organisation
                  </label>
                  <input
                    type="text"
                    id="organisation"
                    name="organisation"
                    required
                    placeholder="e.g., Government, Private Trust"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-all duration-200 placeholder-gray-400"
                  />
                </div>

                {/* Application Deadline */}
                <div>
                  <label htmlFor="application_deadline" className="block text-sm font-semibold text-gray-700 mb-2">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    id="application_deadline"
                    name="application_deadline"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-all duration-200"
                  />
                </div>

                {/* Number of Scholarships */}
                <div>
                  <label htmlFor="no_Of_scholarship" className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Scholarships
                  </label>
                  <input
                    type="number"
                    id="no_Of_scholarship"
                    name="no_Of_scholarship"
                    required
                    min="1"
                    placeholder="e.g., 50"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-all duration-200 placeholder-gray-400"
                  />
                </div>

                {/* Amount */}
                <div>
                  <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2">
                    Scholarship Amount
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">₹</span>
                    </div>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      placeholder="Enter amount in INR"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-all duration-200 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Scholarship Link */}
                <div>
                  <label htmlFor="scholarship_link" className="block text-sm font-semibold text-gray-700 mb-2">
                    Scholarship Link
                  </label>
                  <input
                    type="url"
                    id="scholarship_link"
                    name="scholarship_link"
                    placeholder="https://example.com/scholarship"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* International Students Radio */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <label className="block text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Available for International Students
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      id="yes"
                      name="international_students"
                      type="radio"
                      value={true}
                      required
                      className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-700 font-medium flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Yes
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      id="no"
                      name="international_students"
                      type="radio"
                      value={false}
                      required
                      className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-700 font-medium flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      No
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding Scholarship...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Scholarship
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> All fields are required unless otherwise specified. Make sure to provide accurate and up-to-date information for students.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
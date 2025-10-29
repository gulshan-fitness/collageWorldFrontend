import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../Context_holder';
import Select from 'react-select';
import axios from 'axios';

export default function Doubts_add() {
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

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '48px',
      border: state.isFocused ? '2px solid #10b981' : '1px solid #d1d5db',
      borderRadius: '12px',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(16, 185, 129, 0.1)' : 'none',
      backgroundColor: '#f9fafb',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        borderColor: state.isFocused ? '#10b981' : '#9ca3af'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#10b981' : state.isFocused ? '#ecfdf5' : 'white',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const college_id = selected_college?.value;
    const doubt = e.target.doubt.value;
    const answer = e.target.answer.value;

    const data = {
      college_id: college_id,
      doubt: doubt,
      answer: answer
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_DOUBTS_URL}add`,
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
      console.error('Error adding FAQ:', error);
      notify('Failed to add FAQ. Please try again.', 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3">
            Add New FAQ
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create frequently asked questions to help students and parents get the information they need
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">FAQ Information</h2>
                <p className="text-emerald-100 text-sm">Fill in the question and answer for the FAQ</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="space-y-6">
              {/* College Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

              {/* Doubt/Question Field */}
              <div>
                <label htmlFor="doubt" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Question
                </label>
                <div className="relative">
                  <textarea
                    id="doubt"
                    name="doubt"
                    required
                    rows="3"
                    placeholder="Enter the question that students frequently ask..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 transition-all duration-200 placeholder-gray-400 resize-none"
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                    {e => e.target.value.length}/500
                  </div>
                </div>
              </div>

              {/* Answer Field */}
              <div>
                <label htmlFor="answer" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Answer
                </label>
                <div className="relative">
                  <textarea
                    id="answer"
                    name="answer"
                    required
                    rows="5"
                    placeholder="Provide a clear and helpful answer to the question..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 transition-all duration-200 placeholder-gray-400 resize-none"
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                    {e => e.target.value.length}/1000
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding FAQ...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add FAQ
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tips Card */}
        <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-semibold text-emerald-800 mb-2">Tips for Great FAQs</h4>
              <ul className="text-sm text-emerald-700 space-y-1">
                <li>• Keep questions clear and concise</li>
                <li>• Provide detailed but easy-to-understand answers</li>
                <li>• Use simple language that students can easily comprehend</li>
                <li>• Focus on common concerns and important information</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Example FAQs */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Example Question
            </h4>
            <p className="text-sm text-gray-600">
              "What are the admission requirements for international students?"
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Example Question
            </h4>
            <p className="text-sm text-gray-600">
              "Is hostel accommodation available for first-year students?"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../Context_holder';
import Select from 'react-select';
import axios from 'axios';
import { useParams,  } from 'react-router-dom';

export default function Doubts_edit() {
  const { college_fetch, colleges, current_doubt, doubts_fetch, selected_college, setselected_college, token, notify, admin } = useContext(Context);
  const { id } = useParams();
  
  const [current_data, setcurrent_data] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!admin) return;

      if (admin?.role === "subadmin" && admin?.collage_id) {
        await college_fetch(admin?.collage_id);
      } else if (admin?.role === "superadmin") {
        await college_fetch();
      }

      if (id) {
        await doubts_fetch(id, null);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [id, admin]);

  useEffect(() => {
    if (current_doubt){

      setcurrent_data(current_doubt);

      setselected_college({
        label: current_doubt?.college_id?.college_name,
        value: current_doubt?.college_id?._id
      });

    }
  }, [current_doubt]);

  console.log(current_doubt,selected_college,"ram");
  

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
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_DOUBTS_URL}edit/${id}`,
        data,
        {
          headers: {
            Authorization: token
          }
        }
      );

      notify(response.data.msg, response.data.status);

   
    } catch (error) {
      console.error('Error updating FAQ:', error);
      notify('Failed to update FAQ. Please try again.', 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading FAQ details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg border border-gray-100 mb-4">
            <div className="p-2 bg-emerald-100 rounded-full">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Edit FAQ
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Update the question and answer to provide the best information for students
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
                <h2 className="text-xl font-semibold text-white">FAQ Details</h2>
                <p className="text-emerald-100 text-sm">Update the question and answer below</p>
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

              {/* Question Field */}
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
                    defaultValue={current_data?.doubt}
                    placeholder="Enter the question that students frequently ask..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 transition-all duration-200 placeholder-gray-400 resize-none"
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                    {current_data?.doubt?.length || 0}/500
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
                    rows="6"
                    defaultValue={current_data?.answer}
                    placeholder="Provide a clear and helpful answer to the question..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 transition-all duration-200 placeholder-gray-400 resize-none"
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                    {current_data?.answer?.length || 0}/1000
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4 justify-end">
             
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Update FAQ
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Current Information Card */}
        <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm text-emerald-800">
                <strong>Editing FAQ for:</strong> <span className="font-semibold">{current_data?.college_id?.college_name}</span>. 
                Make sure the information is accurate and helpful for students.
              </p>
            </div>
          </div>
        </div>

        {/* Best Practices Card */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Tips for Great Questions
            </h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Be clear and specific</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Use simple, easy-to-understand language</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Focus on common student concerns</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Tips for Helpful Answers
            </h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Provide complete and accurate information</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Keep answers concise but thorough</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Include relevant contact information if needed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../../Context_holder';
import Select from 'react-select';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Review_add() {
  const { college_fetch, colleges, selected_college, setselected_college, notify } = useContext(Context);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    college_fetch();
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selected_college || !review.trim()) {
      notify('Please select a college and provide a review', 0);
      return;
    }

    setIsSubmitting(true);

    const data = {
      college_id: selected_college.value,
      review: review,
    };

    try {
      const success = await axios.post(
        process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_REVIEW_URL + 'add',
        data
      );

      notify(success.data.msg, success.data.status);

      if (success.data.status === 1) {
        e.target.reset();
        setselected_college(null);
        setReview('');
      }
    } catch (error) {
      console.error('Error:', error);
      notify('Failed to submit review. Please try again.', 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Premium color palette
  const colors = {
    primary: {
      purple: '#8b5cf6',
      blue: '#3b82f6',
      slate: '#1e293b',
    },
    accent: {
      pink: '#ec4899',
      cyan: '#06b6d4',
      teal: '#14b8a6',
      emerald: '#10b981',
    },
    background: {
      light: '#f8fafc',
      card: 'rgba(255, 255, 255, 0.85)',
      subtle: '#f1f5f9',
    },
    state: {
      success: '#10b981',
      error: '#ef4444',
    },
  };

  // Custom styles for react-select
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: '12px 16px',
      marginTop: '8px',
      border: `2px solid ${state.isFocused ? colors.primary.purple : '#e2e8f0'}`,
      borderRadius: '12px',
      boxShadow: state.isFocused ? `0 0 0 3px ${colors.primary.purple}20` : 'none',
      backgroundColor: colors.background.card,
      backdropFilter: 'blur(8px)',
      transition: 'all 0.3s ease-in-out',
      fontSize: '0.9rem',
      '&:hover': {
        borderColor: colors.primary.purple,
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? colors.primary.purple
        : state.isFocused
        ? `${colors.primary.purple}10`
        : colors.background.card,
      color: state.isSelected ? 'white' : colors.primary.slate,
      padding: '12px 16px',
      fontSize: '0.9rem',
      fontWeight: '500',
      borderBottom: '1px solid #f1f5f9',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        backgroundColor: state.isSelected ? colors.primary.purple : `${colors.primary.purple}10`,
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(15, 23, 42, 0.15)',
      border: '1px solid #e2e8f0',
      backgroundColor: colors.background.card,
      backdropFilter: 'blur(8px)',
      overflow: 'hidden',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: colors.primary.slate,
      fontWeight: '600',
      fontSize: '0.9rem',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: colors.primary.slate,
      opacity: 0.7,
      fontSize: '0.9rem',
    }),
  };

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 transition-all duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative max-w-2xl sm:max-w-3xl mx-auto">
        {/* Main Card */}
        <div
          className={`relative p-4 sm:p-8 bg-white/90 rounded-2xl shadow-2xl border border-purple-100/50 backdrop-blur-md transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Header Icon */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 8v9.5c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-2 0H5v9.5h14V8zm-7 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
              </svg>
            </div>
          </div>

          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8 mt-6 pt-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Write a College Review
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              Share your experience to help future students make informed decisions
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* College Selection */}
            <div className="mb-6 sm:mb-8">
              <label
                htmlFor="college_id"
                className="block text-sm font-semibold text-slate-700 mb-3 flex items-center"
              >
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs mr-3">
                  1
                </div>
                Select College
                <span className="text-pink-400 ml-1">*</span>
              </label>
              <Select
                value={selected_college}
                styles={customSelectStyles}
                onChange={(e) => setselected_college(e)}
                name="college_id"
                options={colleges?.map((data) => ({ value: data._id, label: data.college_name }))}
                placeholder="Search for your college..."
                isSearchable
                noOptionsMessage={() => 'No colleges found'}
                className="w-full"
                aria-label="Select a college"
              />
            </div>

            {/* Review Section */}
            <div className="mb-6 sm:mb-8">
              <label
                htmlFor="review"
                className="block text-sm font-semibold text-slate-700 mb-3 flex items-center"
              >
                <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs mr-3">
                  2
                </div>
                Your Review
                <span className="text-pink-400 ml-1">*</span>
              </label>
              <ReactQuill
                value={review}
                onChange={setReview}
                theme="snow"
                className="bg-white/50 rounded-xl border border-purple-100 backdrop-blur-sm"
                placeholder="Write your review here..."
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['clean'],
                  ],
                }}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className={`
                  relative overflow-hidden
                  w-full max-w-xs sm:max-w-sm
                  bg-gradient-to-r from-purple-500 to-pink-500
                  hover:from-purple-600 hover:to-pink-600
                  text-white font-semibold py-3 sm:py-4 px-6 sm:px-8
                  rounded-xl shadow-lg
                  transform transition-all duration-300
                  hover:shadow-xl hover:scale-105
                  focus:outline-none focus:ring-4 focus:ring-purple-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                  group
                `}
                disabled={isSubmitting || !selected_college || !review.trim()}
                aria-label="Submit college review"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <span>Submit Review</span>
                  </div>
                )}
              </button>
            </div>

            {/* Privacy Note */}
            <div className="text-center mt-6 pt-6 border-t border-purple-100/50">
              <div className="flex items-center justify-center text-slate-500 text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Your review is anonymous and secure
              </div>
            </div>
          </form>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8">
          {[
            {
              icon: (
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
              title: 'Verified',
              description: 'Authentic reviews',
              bgColor: 'bg-purple-100',
            },
            {
              icon: (
                <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              ),
              title: 'Helpful',
              description: 'Guide students',
              bgColor: 'bg-cyan-100',
            },
            {
              icon: (
                <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              ),
              title: 'Private',
              description: 'Your data safe',
              bgColor: 'bg-pink-100',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm border border-purple-100/50 transform transition-all duration-500 hover:scale-105 hover:shadow-lg ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-10 h-10 ${feature.bgColor} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                {feature.icon}
              </div>
              <h3 className="font-semibold text-slate-800 text-sm">{feature.title}</h3>
              <p className="text-xs text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ql-container {
          min-height: 150px;
          border-radius: 0 0 12px 12px;
          font-size: 0.9rem;
        }
        .ql-toolbar {
          border-radius: 12px 12px 0 0;
          background-color: rgba(255, 255, 255, 0.85);
          border-color: #e2e8f0;
        }
        .ql-editor {
          background-color: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(8px);
        }
        @keyframes bounce {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .hover\:scale-105:hover {
          animation: bounce 0.3s ease-in-out;
        }
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        @media (max-width: 640px) {
          h2 {
            font-size: 1.5rem !important;
          }
          p {
            font-size: 0.875rem !important;
          }
          button,
          select,
          .ql-editor {
            font-size: 0.9rem !important;
          }
          .ql-container {
            min-height: 120px;
          }
        }
      `}</style>
    </div>
  );
}
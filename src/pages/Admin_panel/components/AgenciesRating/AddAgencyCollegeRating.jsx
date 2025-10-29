import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../../../../Context_holder';
import Select from 'react-select';

export default function AddAgencyCollegeRating() {
  const {
    stream_fetch,
    setselected_stream,
    selected_college,
    stream,
    selected_stream,
    college_fetch,
    colleges,
    setselected_college,
    notify,
    token,
  } = useContext(Context);

  const [outof, setOutof] = useState('');
  const [ranking, setRanking] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const agencies = [
 "AAOPADHE", "indiatoday", "the week", "NIRF","Outlook","IIRF","TOI","NIRF Innovation","the","qs"
  ];

  // Color scheme
  const colors = {
    primary: {
      purple: '#8b5cf6',
      blue: '#3b82f6',
      slate: '#1e293b',
      gray: '#475569',
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

  // Custom select styles
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: '10px 14px',
      marginTop: '6px',
      border: `2px solid ${state.isFocused ? colors.primary.purple : '#e2e8f0'}`,
      borderRadius: '12px',
      boxShadow: state.isFocused ? `0 0 0 3px ${colors.primary.purple}20` : 'none',
      backgroundColor: colors.background.card,
      backdropFilter: 'blur(8px)',
      transition: 'all 0.3s ease-in-out',
      minHeight: '48px',
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
      zIndex: 50, // Ensure menu is above other elements
      overflow: 'hidden',
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999, // High z-index for portal
    }),
    singleValue: (provided) => ({
      ...provided,
      color: colors.primary.slate,
      fontWeight: '600',
      fontSize: '0.9rem',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: colors.primary.gray,
      opacity: 0.7,
      fontSize: '0.9rem',
    }),
  };

  // Fetch streams & colleges from backend
  useEffect(() => {
    stream_fetch();
    setselected_stream(null);
    college_fetch();
    setselected_college(null);
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!selected_stream) newErrors.stream_id = 'Please select a stream';
    if (!selected_college) newErrors.college_id = 'Please select a college';
    if (!ranking || ranking < 1) newErrors.ranking = 'Please enter 1 or greater';
    if (!outof || outof < 1) newErrors.out_of = 'Please enter 1 or greater';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      notify('Please fill all required fields correctly', 0);
      return;
    }

    setIsSubmitting(true);

    const stream_id = selected_stream?.value;
    const college_id = selected_college?.value;
    const agencyName = e.target.agencyName.value;
    const Ranking = parseInt(ranking);
    const year = e.target.year.value;
    const out_of = parseInt(outof);

    const data = {
      stream_id,
      college_id,
      agencyName,
      Ranking,
      year,
      out_of,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_AGENCIES_URL}add`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      notify(response.data.msg, response.data.status);

      if (response.data.status === 1) {
        e.target.reset();
        setselected_college(null);
        setselected_stream(null);
        setOutof('');
        setRanking('');
        setErrors({});
      }
    } catch (err) {
      console.error(err);
      notify('Error saving data ❌', 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName =
    'w-full p-3 sm:p-4 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white/50 font-medium text-slate-700 placeholder-slate-400 backdrop-blur-sm text-sm sm:text-base';

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
          className={`relative p-6 sm:p-8 bg-white/90 rounded-2xl shadow-2xl border border-purple-100/50 backdrop-blur-md transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Header Icon */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
          </div>

          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-10 mt-8 pt-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Add Agency Rating
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              Submit college rankings from trusted rating agencies
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Stream Selection */}
            <div>
              <label
                htmlFor="stream_id"
                className="block text-sm font-semibold text-slate-700 mb-3 flex items-center"
              >
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs mr-3">
                  1
                </div>
                Stream
                <span className="text-pink-400 ml-1">*</span>
              </label>
              <Select
                value={selected_stream}
                styles={customSelectStyles}
                onChange={(e) => setselected_stream(e)}
                name="stream_id"
                options={stream?.map((data) => ({ value: data._id, label: data.stream_name }))}
                placeholder="Select stream..."
                isSearchable
                noOptionsMessage={() => 'No streams found'}
                menuPortalTarget={document.body} // Render menu in body to avoid stacking issues
                className="w-full"
                aria-label="Select a stream"
                aria-describedby={errors.stream_id ? 'stream-error' : undefined}
              />
              {errors.stream_id && (
                <p id="stream-error" className="text-red-500 text-xs mt-1">
                  {errors.stream_id}
                </p>
              )}
            </div>

            {/* College Selection */}
            <div>
              <label
                htmlFor="college_id"
                className="block text-sm font-semibold text-slate-700 mb-3 flex items-center"
              >
                <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs mr-3">
                  2
                </div>
                College
                <span className="text-pink-400 ml-1">*</span>
              </label>
              <Select
                value={selected_college}
                styles={customSelectStyles}
                onChange={(e) => setselected_college(e)}
                name="college_id"
                options={colleges?.map((data) => ({ value: data._id, label: data.college_name }))}
                placeholder="Select college..."
                isSearchable
                noOptionsMessage={() => 'No colleges found'}
                menuPortalTarget={document.body} // Render menu in body to avoid stacking issues
                className="w-full"
                aria-label="Select a college"
                aria-describedby={errors.college_id ? 'college-error' : undefined}
              />
              {errors.college_id && (
                <p id="college-error" className="text-red-500 text-xs mt-1">
                  {errors.college_id}
                </p>
              )}
            </div>

            {/* Agency Selection */}
            <div>
              <label
                htmlFor="agencyName"
                className="block text-sm font-semibold text-slate-700 mb-3 flex items-center"
              >
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs mr-3">
                  3
                </div>
                Rating Agency
                <span className="text-pink-400 ml-1">*</span>
              </label>
              <select
                name="agencyName"
                className={inputClassName}
                required
                aria-label="Select a rating agency"
              >
                <option value="">Select Agency</option>
                {agencies.map((agency) => (
                  <option key={agency} value={agency} className="py-2">
                    {agency}
                  </option>
                ))}
              </select>
            </div>

            {/* Ranking and Out Of */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Ranking */}
              <div>
                <label
                  htmlFor="Ranking"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Ranking Position
                  <span className="text-pink-400 ml-1">*</span>
                </label>
                <input
                  type="number"
                  name="Ranking"
                  value={ranking}
                  onChange={(e) => {
                    const value = e.target.value;
                    setRanking(value);
                    setErrors((prev) => ({
                      ...prev,
                      ranking: value < 1 ? 'Please enter 1 or greater' : undefined,
                    }));
                  }}
                  className={inputClassName}
                  placeholder="Enter rank"
                  min="1"
                  required
                  aria-label="Enter ranking position"
                  aria-describedby={errors.ranking ? 'ranking-error' : undefined}
                />
                {errors.ranking && (
                  <p id="ranking-error" className="text-red-500 text-xs mt-1">
                    {errors.ranking}
                  </p>
                )}
              </div>

              {/* Out Of */}
              <div>
                <label
                  htmlFor="out_of"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Out Of
                  <span className="text-pink-400 ml-1">*</span>
                </label>
                <input
                  type="number"
                  name="out_of"
                  value={outof}
                  onChange={(e) => {
                    const value = e.target.value;
                    setOutof(value);
                    setErrors((prev) => ({
                      ...prev,
                      out_of: value < 1 ? 'Please enter 1 or greater' : undefined,
                    }));
                  }}
                  className={inputClassName}
                  placeholder="Total rankings"
                  min="1"
                  required
                  aria-label="Enter total rankings"
                  aria-describedby={errors.out_of ? 'outof-error' : undefined}
                />
                {errors.out_of && (
                  <p id="outof-error" className="text-red-500 text-xs mt-1">
                    {errors.out_of}
                  </p>
                )}
              </div>
            </div>

            {/* Year */}
            <div>
              <label
                htmlFor="year"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Year
                <span className="text-pink-400 ml-1">*</span>
              </label>
              <input
                type="number"
                name="year"
                className={inputClassName}
                placeholder="e.g., 2024"
                min="2000"
                max="2030"
                defaultValue={new Date().getFullYear()}
                required
                aria-label="Enter ranking year"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6 sm:pt-8 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting || !selected_stream || !selected_college || !ranking || !outof}
                className={`
                  relative overflow-hidden
                  w-full max-w-xs sm:max-w-sm
                  bg-gradient-to-r from-purple-500 to-pink-500
                  hover:from-purple-600 hover:to-pink-600
                  disabled:from-gray-400 disabled:to-gray-500
                  text-white font-semibold py-3 sm:py-4 px-6 sm:px-8
                  rounded-xl shadow-lg
                  transform transition-all duration-300
                  hover:shadow-xl hover:scale-105
                  focus:outline-none focus:ring-4 focus:ring-purple-200
                  disabled:cursor-not-allowed
                  group
                `}
                aria-label="Submit agency rating"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving Rating...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Save Rating</span>
                  </div>
                )}
              </button>
            </div>

            {/* Privacy Note */}
            <div className="text-center pt-6 border-t border-purple-100/50">
              <div className="flex items-center justify-center text-slate-500 text-sm">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Your data is secure and verified
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
              description: 'Trusted agency data',
              bgColor: 'bg-purple-100',
            },
            {
              icon: (
                <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              ),
              title: 'Accurate',
              description: 'Reliable rankings',
              bgColor: 'bg-pink-100',
            },
            {
              icon: (
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
              title: 'Current',
              description: 'Up-to-date data',
              bgColor: 'bg-emerald-100',
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
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
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
        @media (max-width: 640px) {
          h1 {
            font-size: 1.5rem !important;
          }
          p {
            font-size: 0.875rem !important;
          }
          button,
          select,
          input {
            font-size: 0.9rem !important;
          }
          .max-w-xs {
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
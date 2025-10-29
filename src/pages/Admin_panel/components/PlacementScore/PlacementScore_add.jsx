import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../Context_holder';
import Select from 'react-select';
import axios from 'axios';
import { 
  FiTrendingUp, 
  FiAward, 
  FiCalendar, 
  FiHome, 
  FiPlus,
  FiCheckCircle,
  FiBarChart2,
  FiUsers
} from 'react-icons/fi';

export default function PlacementScore_add() {
  const { college_fetch, colleges, selected_college, setselected_college, notify, admin } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [studentsCount, setStudentsCount] = useState(0);

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
    const year = e.target.year.value;
    const placementScore = e.target.score.value;

    if (!college_id || !year || !placementScore) {
      notify('Please fill all required fields', 0);
      setIsLoading(false);
      return;
    }

    const data = {
      college_id: college_id,
      year: year,
      placementScore: parseInt(placementScore)
    };

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_PLACEMENT_SCORE_URL + "add",
        data
      );

      notify(response.data.msg, response.data.status);

      if (response.data.status === 1) {
        setselected_college(null);
        setStudentsCount(0);
        e.target.reset();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      notify('Failed to add placement data', 0);
    } finally {
      setIsLoading(false);
    }
  };

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '56px',
      border: state.isFocused ? '2px solid #8b5cf6' : '2px solid #e5e7eb',
      borderRadius: '12px',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(139, 92, 246, 0.1)' : 'none',
      transition: 'all 0.2s ease-in-out',
      backgroundColor: '#fafafa',
      '&:hover': {
        borderColor: state.isFocused ? '#8b5cf6' : '#d1d5db',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#8b5cf6' : state.isFocused ? '#f3f4f6' : 'white',
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

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear - i);

  // Function to format large numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FiUsers className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Add Placement Data
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Record the number of students placed for each college
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-2xl p-6 flex items-center space-x-4 animate-fade-in">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FiCheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800">Data Added Successfully!</h3>
              <p className="text-green-600">The placement data has been recorded.</p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          
          {/* Card Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FiBarChart2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Placement Statistics</h2>
                <p className="text-purple-100 text-sm">Enter number of students placed</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="space-y-8">
              
              {/* College Selection */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <FiHome className="text-purple-500" />
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
                  Select the college for placement tracking
                </p>
              </div>

              {/* Year and Students Count Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                
                {/* Year Selection */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <FiCalendar className="text-purple-500" />
                    <label htmlFor="year" className="block text-lg font-semibold text-gray-800">
                      Academic Year
                    </label>
                  </div>
                  <select
                    id="year"
                    name="year"
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-200 bg-gray-50 text-gray-800 appearance-none cursor-pointer"
                  >
                    <option value="">Select Year</option>
                    {yearOptions.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500">
                    Academic year of placement
                  </p>
                </div>

                {/* Students Count Input */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <FiUsers className="text-purple-500" />
                    <label htmlFor="score" className="block text-lg font-semibold text-gray-800">
                      Students Placed
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="score"
                      name="score"
                      type="number"
                      min="0"
                      max="10000"
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-800 pr-20"
                      placeholder="Enter number"
                      onChange={(e) => setStudentsCount(parseInt(e.target.value) || 0)}
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <span className="text-gray-500 font-medium">students</span>
                    </div>
                  </div>
                  
                  {/* Count Visualization */}
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Students Placed</span>
                      <span className="font-semibold text-purple-600">
                        {formatNumber(studentsCount)} students
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${Math.min((studentsCount / 1000) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span>Scale: 1K</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    Total number of students placed this year
                  </p>
                </div>
              </div>

              {/* Placement Scale Info */}
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                  <FiTrendingUp className="w-4 h-4" />
                  Placement Scale Reference
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm">
                  <div className="text-center p-2 bg-white rounded-lg border border-purple-100">
                    <div className="text-purple-600 font-bold">1-50</div>
                    <div className="text-gray-600 text-xs">Small Batch</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg border border-purple-100">
                    <div className="text-purple-600 font-bold">51-200</div>
                    <div className="text-gray-600 text-xs">Medium</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg border border-purple-100">
                    <div className="text-purple-600 font-bold">201-500</div>
                    <div className="text-gray-600 text-xs">Large</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg border border-purple-100">
                    <div className="text-purple-600 font-bold">500+</div>
                    <div className="text-gray-600 text-xs">Excellent</div>
                  </div>
                </div>
              </div>

           {/* Quick Stats Preview */}
{studentsCount > 0 && (
  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-5 text-white shadow-md">
    {/* Header */}
    <h4 className="font-semibold mb-3 flex items-center gap-2 text-base sm:text-lg">
      <FiAward className="w-5 h-5 sm:w-6 sm:h-6" />
      Placement Summary
    </h4>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4 text-sm sm:text-base">
      
      {/* Total Students */}
      <div className="flex flex-col items-center justify-center bg-white/10 rounded-xl py-3 px-2">
        <div className="text-3xl font-bold">{formatNumber(studentsCount)}</div>
        <div className="text-purple-100 text-xs sm:text-sm mt-1">Total Students</div>
      </div>

      {/* College Name */}
      <div className="flex flex-col items-center justify-center bg-white/10 rounded-xl py-3 px-2">
        <div className="text-xl font-semibold text-center break-words max-w-[90%]">
          {selected_college?.label || 'College'}
        </div>
        <div className="text-purple-100 text-xs sm:text-sm mt-1">Institution</div>
      </div>
    </div>
  </div>
)}

            </div>

            {/* Submit Button */}
            <div className="flex justify-center sm:justify-end mt-12 pt-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-purple-700 hover:to-indigo-700'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Recording Data...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <FiPlus className="w-5 h-5 mr-2" />
                    Add Placement Data
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <FiUsers className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Placement Data Guidelines</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Placement score represents the actual number of students placed
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Use current or recent academic years for accurate tracking
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Include all students with confirmed job offers
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  Regular updates help in performance analysis and comparison
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
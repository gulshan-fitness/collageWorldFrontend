import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../Context_holder';
import Select from 'react-select';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { 
  FiBook, 
  FiEdit3, 
  FiPlus, 
  FiSave,
  FiBriefcase,
  FiAward,
  FiCheckCircle,
  FiTrendingUp
} from 'react-icons/fi';

export default function Placement_add() {
  const { college_fetch, colleges, selected_college, setselected_college, quill_value, setquill_value, token, notify, admin } = useContext(Context);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      ['link'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'bullet', 'indent',
    'align',
    'blockquote', 'code-block',
    'link'
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '48px',
      border: state.isFocused ? '2px solid #059669' : '1px solid #d1d5db',
      borderRadius: '12px',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(5, 150, 105, 0.1)' : 'none',
      backgroundColor: '#f9fafb',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        borderColor: state.isFocused ? '#059669' : '#9ca3af'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#059669' : state.isFocused ? '#d1fae5' : 'white',
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
    const placemenet_paragraph = quill_value;

    if (!college_id) {
      notify('Please select a college', 0);
      setIsSubmitting(false);
      return;
    }

    if (!placemenet_paragraph || placemenet_paragraph.replace(/<[^>]*>/g, '').trim().length === 0) {
      notify('Please add placement information', 0);
      setIsSubmitting(false);
      return;
    }

    const data = {
      college_id,
      placemenet_paragraph
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_PLACEMENT_URL}add`,
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
        setquill_value(null);
        
        // Navigate to placements list after success
        setTimeout(() => {
          navigate('/admin/placements');
        }, 1500);
      }
    } catch (error) {
      console.error('Error:', error);
      notify('Failed to add placement information', 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg border border-gray-100 mb-4">
            <div className="p-2 bg-emerald-100 rounded-full">
              <FiBriefcase className="w-5 h-5 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Add Placement Information
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create compelling placement information to attract students and showcase career opportunities
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Card Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <FiTrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Placement Details</h2>
                <p className="text-emerald-100 text-sm">Provide comprehensive placement information for the college</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="space-y-6">
              
              {/* College Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FiBook className="w-4 h-4 text-emerald-600" />
                  Select College
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
                  placeholder="Choose a college..."
                  isSearchable
                  required
                />
              </div>

              {/* Placement Information Editor */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FiEdit3 className="w-4 h-4 text-emerald-600" />
                  Placement Information
                </label>
                <div className="border border-gray-300 rounded-xl overflow-hidden bg-gray-50">
                  <ReactQuill
                    value={quill_value}
                    onChange={setquill_value}
                    modules={quillModules}
                    formats={quillFormats}
                    theme="snow"
                    style={{
                      minHeight: '300px',
                      border: 'none',
                      fontFamily: 'inherit'
                    }}
                    placeholder="Write about placement statistics, top recruiters, average packages, placement process, training programs, success stories, and career opportunities..."
                  />
                </div>
                {quill_value && (
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      Content length: {quill_value.replace(/<[^>]*>/g, '').length} characters
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      quill_value.replace(/<[^>]*>/g, '').length > 100 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {quill_value.replace(/<[^>]*>/g, '').length > 100 ? 'Good length' : 'Add more details'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding Placement Info...
                  </>
                ) : (
                  <>
                    <FiPlus className="w-5 h-5" />
                    Add Placement Information
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tips and Guidelines */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Best Practices Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiAward className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Best Practices</h3>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Include placement statistics and percentages</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Mention top recruiting companies</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Highlight highest and average packages</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Describe training and preparation programs</span>
              </li>
            </ul>
          </div>

          {/* Content Suggestions Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiCheckCircle className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Content Ideas</h3>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Internship opportunities and conversion rates</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Alumni success stories and career paths</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Industry partnerships and collaborations</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Career guidance and counseling services</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Stats Preview */}
        <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <FiTrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-semibold text-emerald-800">Why Placement Information Matters</h4>
              <p className="text-sm text-emerald-700 mt-1">
                Comprehensive placement details help students make informed decisions and showcase your college's career success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
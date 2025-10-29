import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../Context_holder';
import Select from 'react-select';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';

export default function Placement_edit() {
  const { college_fetch, colleges, selected_college, setselected_college, quill_value, setquill_value, current_placement, placement_fetch, token, notify, admin } = useContext(Context);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setselected_college({ 
      label: current_placement?.college_id?.college_name, 
      value: current_placement?.college_id?._id 
    });
    setquill_value(current_placement?.placemenet_paragraph);
  }, [current_placement]);

  useEffect(() => {
    if (!id) return;
    placement_fetch(id, null);
  }, [id]);

  useEffect(() => {
    if (!admin) return;
    if (admin?.role === "subadmin" && admin?.collage_id) {
      college_fetch(admin?.collage_id);
    } else if (admin?.role === "superadmin") {
      college_fetch();
    }
  }, [admin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const college_id = selected_college?.value;
    const placemenet_paragraph = quill_value;

    const data = {
      college_id: college_id,
      placemenet_paragraph: placemenet_paragraph,
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_PLACEMENT_URL}edit/${id}`, 
        data, 
        {
          headers: { Authorization: token }
        }
      );

      notify(response.data.msg, response.data.status);
      if (response.data.status === 1) {
        placement_fetch(id, null);
      }
    } catch (error) {
      console.error('Update error:', error);
      notify('Failed to update placement information', 0);
    } finally {
      setIsLoading(false);
    }
  };

  // Custom styles for react-select
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '48px',
      border: state.isFocused ? '2px solid #3b82f6' : '2px solid #e5e7eb',
      borderRadius: '8px',
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
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '8px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Placement Information</h1>
          <p className="text-gray-600">Update college placement details and statistics</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <h2 className="text-xl font-semibold text-white">Placement Details</h2>
            <p className="text-blue-100 text-sm mt-1">Edit the placement information for the selected college</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-8">
              {/* College Selection */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                  <label htmlFor="college_id" className="block text-lg font-semibold text-gray-800">
                    Select College
                  </label>
                </div>
                <div className="max-w-md">
                  <Select
                    value={selected_college}
                    styles={customSelectStyles}
                    onChange={(e) => setselected_college(e)}
                    name="college_id"
                    options={colleges?.map(data => ({ 
                      value: data._id, 
                      label: data.college_name 
                    }))}
                    placeholder="Search and select college..."
                    isSearchable
                    noOptionsMessage={() => "No colleges found"}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Choose the college for which you want to update placement information
                </p>
              </div>

              {/* Placement Content Editor */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                  <label className="block text-lg font-semibold text-gray-800" htmlFor="placement_content">
                    Placement Information
                  </label>
                </div>
                
                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md">
                  <ReactQuill 
                    value={quill_value}  
                    onChange={setquill_value}
                    theme="snow"
                    modules={{
                      toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        [{ 'indent': '-1'}, { 'indent': '+1' }],
                        ['link', 'image'],
                        ['clean']
                      ],
                    }}
                    style={{
                      minHeight: '300px',
                      borderRadius: '12px',
                    }}
                  />
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>Provide detailed information about placement statistics, top recruiters, average packages, and success stories</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end items-center mt-12 pt-6 border-t border-gray-100">
             
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-700 hover:to-indigo-700'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving Changes...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Editing Tips</h3>
              <ul className="mt-2 text-gray-600 space-y-1 text-sm">
                <li>• Include current year placement statistics and trends</li>
                <li>• Mention top recruiting companies and average packages</li>
                <li>• Highlight successful placement stories if available</li>
                <li>• Keep the information updated and accurate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../Context_holder'
import Select from 'react-select';
import axios from 'axios';
import { 
  FaUpload, 
  FaPlus, 
  FaUniversity, 
  FaImage, 
  FaCheckCircle,
  FaCloudUploadAlt,
  FaTimes
} from 'react-icons/fa';

export default function PremiumadsAdd() {
  const { college_fetch, colleges, selected_college, setselected_college, token, notify } = useContext(Context);
  const [image, setimage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    college_fetch();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setimage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const removeImage = () => {
    setimage(null);
    setImagePreview(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
  };

  const submitHandler = () => {
    if (!selected_college || !image) {
      notify('Please select a college and upload an image', 0);
      return;
    }

    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("college_id", selected_college?.value);
    formdata.append("image", image);
    
    axios.post(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_PREMIUMAD_URL}add`, formdata, {
      headers: {
        Authorization: token
      }
    })
    .then((response) => {
      notify(response.data.msg, response.data.status);
      if (response.data.status === 1) {
        setselected_college(null);
        setimage(null);
        setImagePreview(null);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      notify('Failed to upload premium ad', 0);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#f8fafc',
      border: state.isFocused ? '2px solid #8b5cf6' : '2px solid #e2e8f0',
      borderRadius: '12px',
      padding: '8px 12px',
      fontSize: '16px',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(139, 92, 246, 0.1)' : 'none',
      transition: 'all 0.2s ease-in-out',
      minHeight: '56px',
      '&:hover': {
        borderColor: '#c7d2fe'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#8b5cf6' : state.isFocused ? '#f3f4f6' : 'white',
      color: state.isSelected ? 'white' : '#1f2937',
      padding: '12px 16px',
      fontSize: '14px',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#7c3aed'
      }
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#1f2937',
      fontWeight: '500'
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl shadow-2xl shadow-purple-500/25 mb-6">
            <FaUniversity className="text-3xl text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text text-transparent mb-4">
            Add Premium Advertisement
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Showcase colleges with high-quality promotional content
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-6 md:p-8">
          
          {/* College Selection */}
          <div className="mb-8">
            <label className="flex items-center space-x-3 text-lg font-semibold text-gray-800 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <FaUniversity className="text-white text-lg" />
              </div>
              <span>Select College</span>
            </label>
            
            <Select
              value={selected_college}
              onChange={setselected_college}
              options={colleges?.map(d => ({ value: d?._id, label: d?.college_name }))}
              placeholder="Search and select a college..."
              styles={customSelectStyles}
              isSearchable
              noOptionsMessage={() => "No colleges found"}
            />
            
            {selected_college && (
              <div className="mt-3 flex items-center space-x-2 text-green-600">
                <FaCheckCircle className="text-sm" />
                <span className="text-sm font-medium">Selected: {selected_college.label}</span>
              </div>
            )}
          </div>

          {/* Image Upload Section */}
          <div className="mb-8">
            <label className="flex items-center space-x-3 text-lg font-semibold text-gray-800 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <FaImage className="text-white text-lg" />
              </div>
              <span>Advertisement Image</span>
            </label>

            {/* Drag & Drop Area */}
            <div
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer ${
                isDragOver
                  ? 'border-purple-500 bg-purple-50/50 scale-105'
                  : imagePreview
                  ? 'border-green-400 bg-green-50/30'
                  : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('premiumad').click()}
            >
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mx-auto max-h-64 rounded-xl shadow-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage();
                    }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                  >
                    <FaTimes className="text-sm" />
                  </button>
                  <div className="mt-4 flex items-center justify-center space-x-2 text-green-600">
                    <FaCheckCircle className="text-lg" />
                    <span className="font-semibold">Image Selected</span>
                  </div>
                </div>
              ) : (
                <div className="py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <FaCloudUploadAlt className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Upload Advertisement Image
                  </h3>
                  <p className="text-gray-500 mb-4 max-w-md mx-auto">
                    Drag and drop your image here, or click to browse
                  </p>
                  <div className="text-sm text-gray-400 space-y-1">
                    <p>Supports: JPG, PNG, WebP</p>
                    <p>Recommended: 1200×600px or larger</p>
                  </div>
                </div>
              )}

              <input
                type="file"
                id="premiumad"
                name="premiumad"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Requirements Checklist */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-2xl p-6 mb-8 border border-blue-200/50">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
              <FaCheckCircle className="text-blue-500" />
              <span>Requirements</span>
            </h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  selected_college ? 'bg-green-500' : 'bg-gray-300'
                }`}></div>
                <span>Select a college</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  image ? 'bg-green-500' : 'bg-gray-300'
                }`}></div>
                <span>Upload high-quality advertisement image</span>
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={submitHandler}
              disabled={!selected_college || !image || isLoading}
              className={`group relative flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg ${
                !selected_college || !image || isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white hover:shadow-xl hover:scale-105'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <FaPlus className="text-xl group-hover:scale-110 transition-transform" />
                  <span>Create Premium Advertisement</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Success State (Optional) */}
        {!selected_college && !image && (
          <div className="text-center mt-12">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg border border-white/50 p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaUpload className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Ready to Get Started?</h3>
              <p className="text-gray-500">
                Select a college and upload an image to create your first premium advertisement.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Context } from '../../../../Context_holder';
import { 
  FiUpload, 
  FiImage, 
  FiCheckCircle, 
  FiAlertCircle,
  FiTrash2,
  FiPlus,
  FiSliders
} from 'react-icons/fi';

export default function Slider_banner_add() {
  const { token, notify } = useContext(Context);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      handleFileSelection(files);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFileSelection(files);
    }
  };

  const handleFileSelection = (files) => {
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') && 
      file.size <= 10 * 1024 * 1024 // 10MB limit for sliders
    );

    if (validFiles.length !== files.length) {
      notify('Some files were skipped. Please upload only images under 10MB.', 0);
    }

    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const submit_handler = async (e) => {
    e.preventDefault();
    
    if (selectedFiles.length === 0) {
      notify('Please select at least one slider banner image', 0);
      return;
    }

    if (selectedFiles.length > 10) {
      notify('Maximum 10 slider banners allowed per upload', 0);
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append("banner", file);
    });

    try {
      const success = await axios.post(
        process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_SLIDER_BANNER_URL + "add",
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      notify(success.data.msg, success.data.status);

      if (success.data.status === 1) {
        e.target.reset();
        setSelectedFiles([]);
      }
    } catch (error) {
      console.error("Error:", error);
      notify('Failed to upload slider banners. Please try again.', 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getImageDimensions = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
        URL.revokeObjectURL(url);
      };
      img.src = url;
    });
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        
        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-8 sm:px-8 sm:py-10">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <FiSliders className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-3">
              Add Slider Banners
            </h1>
            <p className="text-orange-100 text-center text-lg max-w-2xl mx-auto">
              Upload multiple banner images for your website slider carousel
            </p>
          </div>

          {/* Form Section */}
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <form onSubmit={submit_handler} encType="multipart/form-data">
              
              {/* Upload Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs mr-3">1</div>
                    Select Slider Images
                    <span className="text-red-400 ml-1">*</span>
                  </label>
                  <div className="text-sm text-gray-500">
                    {selectedFiles.length}/10 selected
                  </div>
                </div>
                
                <div
                  className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                    dragActive 
                      ? 'border-orange-400 bg-orange-50' 
                      : 'border-gray-300 bg-gray-50 hover:border-orange-300 hover:bg-orange-50'
                  } ${selectedFiles.length >= 10 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={selectedFiles.length < 10 ? handleDrop : undefined}
                >
                  <input
                    multiple={true}
                    type="file"
                    id="banner"
                    name="banner"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={selectedFiles.length >= 10}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto">
                      <FiUpload className="w-8 h-8 text-orange-500" />
                    </div>
                    
                    <div>
                      <p className="text-lg font-semibold text-gray-700 mb-2">
                        {selectedFiles.length >= 10 ? 'Maximum files reached' : 'Drag & drop slider images here'}
                      </p>
                      <p className="text-gray-500 text-sm">
                        or <span className="text-orange-600 font-semibold">browse files</span>
                      </p>
                    </div>
                    
                    <div className="text-xs text-gray-400">
                      Supports: JPG, PNG, WEBP • Max 10MB per file • Recommended: 1920×1080px
                    </div>

                    {selectedFiles.length >= 10 && (
                      <div className="text-sm text-orange-600 font-medium">
                        Maximum of 10 slider banners reached
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Selected Files Preview */}
              {selectedFiles.length > 0 && (
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-4 flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-3">2</div>
                    Selected Slider Banners ({selectedFiles.length})
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className="flex items-start space-x-3">
                          {/* File Preview */}
                          <div className="flex-shrink-0 relative">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                              <img 
                                src={URL.createObjectURL(file)} 
                                alt={file.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">{index + 1}</span>
                            </div>
                          </div>
                          
                          {/* File Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatFileSize(file.size)}
                            </p>
                            <div className="flex items-center mt-1">
                              <FiCheckCircle className="w-3 h-3 text-green-500 mr-1" />
                              <span className="text-xs text-green-600">Ready for slider</span>
                            </div>
                          </div>
                          
                          {/* Remove Button */}
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Add More Button */}
                  {selectedFiles.length < 10 && (
                    <div className="mt-4 text-center">
                      <button
                        type="button"
                        onClick={() => document.getElementById('banner').click()}
                        className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                      >
                        <FiPlus className="w-4 h-4 mr-2" />
                        Add More Slider Images
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Guidelines */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
                <h4 className="text-sm font-semibold text-blue-800 mb-2 flex items-center">
                  <FiAlertCircle className="w-4 h-4 mr-2" />
                  Slider Banner Guidelines
                </h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Recommended dimensions: 1920×1080px (16:9 aspect ratio)</li>
                  <li>• Maximum 10 slider banners per upload</li>
                  <li>• Use high-quality images for best display</li>
                  <li>• File formats: JPG, PNG, WEBP</li>
                  <li>• Maximum file size: 10MB per image</li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting || selectedFiles.length === 0}
                  className={`
                    relative overflow-hidden
                    w-full
                    bg-gradient-to-r from-orange-500 to-red-500
                    hover:from-orange-600 hover:to-red-600
                    disabled:from-gray-400 disabled:to-gray-500
                    text-white font-bold py-4 px-8 
                    rounded-xl shadow-lg
                    transform transition-all duration-300
                    hover:shadow-xl
                    focus:outline-none focus:ring-4 focus:ring-orange-200
                    disabled:cursor-not-allowed
                    group
                  `}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Uploading {selectedFiles.length} Slider Banner{selectedFiles.length !== 1 ? 's' : ''}...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <FiSliders className="w-5 h-5" />
                      <span className="text-lg">
                        Upload {selectedFiles.length} Slider Banner{selectedFiles.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FiSliders className="w-5 h-5 text-orange-500" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">Slider Ready</h3>
            <p className="text-xs text-gray-600">Optimized for carousel</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FiUpload className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">Batch Upload</h3>
            <p className="text-xs text-gray-600">Multiple at once</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FiCheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">Auto Optimized</h3>
            <p className="text-xs text-gray-600">Web ready</p>
          </div>
        </div>
      </div>
    </div>
  );
}
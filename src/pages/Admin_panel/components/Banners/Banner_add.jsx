import axios from "axios";
import React, { useContext, useState } from "react";
import { Context } from "../../../../Context_holder";
import {
  FiUpload,
  FiImage,
  FiCheckCircle,
  FiAlertCircle,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";

export default function Banner_add() {
  const { token, notify } = useContext(Context);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]); // State for image previews

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
    const validFiles = files.filter(
      (file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024 // 5MB limit
    );

    if (validFiles.length !== files.length) {
      notify("Some files were skipped. Please upload only images under 5MB.", 0);
    }

    // Generate preview URLs for valid image files
    const newPreviewUrls = validFiles.map((file) => URL.createObjectURL(file));
    setSelectedFiles((prev) => [...prev, ...validFiles]);
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    // Revoke object URL to free memory
    URL.revokeObjectURL(previewUrls[index]);
  };

  const submit_handler = async (e) => {
    e.preventDefault();

    if (selectedFiles.length === 0) {
      notify("Please select at least one banner image", 0);
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("banner", file);
    });

    try {
      const success = await axios.post(
        process.env.REACT_APP_API_BASE_URL +
          process.env.REACT_APP_BANNER_URL +
          "add",
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
        setPreviewUrls([]); // Clear previews
      }
    } catch (error) {
      console.error("Error:", error);
      notify("Failed to upload banners. Please try again.", 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="min-h-screen py-6 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-6 sm:px-6 sm:py-8">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <FiImage className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-2 sm:mb-3">
              Upload Banners
            </h1>
            <p className="text-purple-100 text-center text-sm sm:text-base max-w-md mx-auto">
              Add multiple banner images to showcase your content
            </p>
          </div>

          {/* Form Section */}
          <div className="px-4 py-6 sm:px-6 sm:py-8">
            <form onSubmit={submit_handler} encType="multipart/form-data">
              {/* File Upload Area */}
              <div className="mb-6 sm:mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs mr-2 sm:mr-3">
                    1
                  </div>
                  Select Banner Images
                  <span className="text-red-400 ml-1">*</span>
                </label>

                <div
                  className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 ${
                    dragActive
                      ? "border-purple-400 bg-purple-50"
                      : "border-gray-300 bg-gray-50 hover:border-purple-300 hover:bg-purple-50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    multiple={true}
                    type="file"
                    id="banner"
                    name="banner"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="space-y-3 sm:space-y-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto">
                      <FiUpload className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-base sm:text-lg font-semibold text-gray-700 mb-1 sm:mb-2">
                        Drag & drop your images here
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        or{" "}
                        <span className="text-purple-600 font-semibold">
                          browse files
                        </span>
                      </p>
                    </div>
                    <div className="text-xs text-gray-400">
                      Supports: JPG, PNG, WEBP • Max 5MB per file
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Files Preview */}
              {selectedFiles.length > 0 && (
                <div className="mb-6 sm:mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs mr-2 sm:mr-3">
                      2
                    </div>
                    Selected Files ({selectedFiles.length})
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          {/* Image Preview */}
                          <div className="flex-shrink-0">
                            {previewUrls[index] ? (
                              <img
                                src={previewUrls[index]}
                                alt={file.name}
                                className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover border border-gray-200"
                                onError={() => notify("Failed to load preview for " + file.name, 0)}
                              />
                            ) : (
                              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                <FiImage className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                          </div>

                          {/* File Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatFileSize(file.size)}
                            </p>
                            <div className="flex items-center mt-1">
                              <FiCheckCircle className="w-3 h-3 text-green-500 mr-1" />
                              <span className="text-xs text-green-600">
                                Ready to upload
                              </span>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors duration-200"
                          >
                            <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add More Button */}
                  <div className="mt-3 sm:mt-4 text-center">
                    <button
                      type="button"
                      onClick={() => document.getElementById("banner").click()}
                      className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-200 hover:scale-105 text-sm"
                    >
                      <FiPlus className="w-4 h-4 mr-1 sm:mr-2" />
                      Add More Images
                    </button>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4 sm:pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting || selectedFiles.length === 0}
                  className={`
                    relative overflow-hidden
                    w-full
                    bg-gradient-to-r from-purple-500 to-pink-500
                    hover:from-purple-600 hover:to-pink-600
                    disabled:from-gray-400 disabled:to-gray-500
                    text-white font-bold py-3 sm:py-4 px-6 sm:px-8 
                    rounded-xl shadow-lg
                    transform transition-all duration-300
                    hover:shadow-xl
                    focus:outline-none focus:ring-4 focus:ring-purple-200
                    disabled:cursor-not-allowed
                    group
                    text-sm sm:text-base
                  `}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>
                        Uploading {selectedFiles.length} Banner
                        {selectedFiles.length !== 1 ? "s" : ""}...
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <FiUpload className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>
                        Upload {selectedFiles.length} Banner
                        {selectedFiles.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  )}
                </button>
              </div>

              {/* Help Text */}
              <div className="text-center pt-4 sm:pt-6">
                <div className="flex items-center justify-center text-gray-500 text-xs sm:text-sm">
                  <FiAlertCircle className="w-4 h-4 mr-1 sm:mr-2" />
                  All uploaded images will be optimized for web display
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-center shadow-lg border border-white/20">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FiImage className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
            </div>
            <h3 className="font-semibold text-gray-800 text-xs sm:text-sm">
              Multiple Upload
            </h3>
            <p className="text-xs text-gray-600">Upload many at once</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-center shadow-lg border border-white/20">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FiUpload className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
            </div>
            <h3 className="font-semibold text-gray-800 text-xs sm:text-sm">
              Drag & Drop
            </h3>
            <p className="text-xs text-gray-600">Easy file selection</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-center shadow-lg border border-white/20">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
            </div>
            <h3 className="font-semibold text-gray-800 text-xs sm:text-sm">
              Instant Preview
            </h3>
            <p className="text-xs text-gray-600">See before uploading</p>
          </div>
        </div>
      </div>
    </div>
  );
}
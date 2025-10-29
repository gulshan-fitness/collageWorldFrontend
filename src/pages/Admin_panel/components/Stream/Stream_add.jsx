import React, { useContext, useState } from 'react'
import { Context } from '../../../../Context_holder';
import axios from 'axios';
import { 
  FiBook, 
  FiImage, 
  FiPlus, 
  FiUpload,
  FiCheckCircle,
  FiX
} from 'react-icons/fi';

export default function Stream_add() {
  const { token, notify } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [streamName, setStreamName] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        notify('Please select a valid image file', 0);
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        notify('Image size should be less than 5MB', 0);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    document.getElementById('image').value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const stream_name = e.target.stream_name.value;
    const image = e.target.image.files[0];

    if (!stream_name || !image) {
      notify('Please fill all required fields', 0);
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('stream_name', stream_name);
    formData.append('image', image);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_STREAM_URL}add`,
        formData,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      notify(response.data.msg, response.data.status);

      if (response.data.status === 1) {
        e.target.reset();
        setImagePreview(null);
        setStreamName('');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      notify('Failed to add stream', 0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FiBook className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Add New Stream
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create new academic streams with professional branding
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-2xl p-6 flex items-center space-x-4 animate-fade-in">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FiCheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800">Stream Added Successfully!</h3>
              <p className="text-green-600">The new academic stream has been created.</p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          
          {/* Card Header */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FiPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Stream Details</h2>
                <p className="text-orange-100 text-sm">Create a new academic stream</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="space-y-8">
              
              {/* Stream Name Input */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <FiBook className="text-orange-500" />
                  <label htmlFor="stream_name" className="block text-lg font-semibold text-gray-800">
                    Stream Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="stream_name"
                    name="stream_name"
                    required
                    value={streamName}
                    onChange={(e) => setStreamName(e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-200 transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-800"
                    placeholder="e.g., Computer Science, Mechanical Engineering, Business Administration"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Enter the full name of the academic stream
                </p>
              </div>

              {/* Image Upload Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <FiImage className="text-orange-500" />
                  <label htmlFor="image" className="block text-lg font-semibold text-gray-800">
                    Stream Icon/Image
                  </label>
                </div>
                
                {/* Image Preview and Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-orange-400 transition-all duration-200 bg-gray-50">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-xl shadow-md border-2 border-orange-200"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-center">
                        <p className="text-green-600 font-medium text-sm">Image selected</p>
                        <p className="text-gray-500 text-xs mt-1">Click the X to change image</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto">
                        <FiUpload className="w-8 h-8 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-gray-600 font-medium">Upload stream icon</p>
                        <p className="text-gray-500 text-sm mt-1">PNG, JPG, JPEG up to 5MB</p>
                      </div>
                    </div>
                  )}
                  
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="image"
                    className="inline-block mt-4 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold transition-colors duration-200 cursor-pointer shadow-md hover:shadow-lg"
                  >
                    {imagePreview ? 'Change Image' : 'Choose Image'}
                  </label>
                </div>
                <p className="text-sm text-gray-500">
                  Professional icon or image representing the stream
                </p>
              </div>

              {/* Stream Preview */}
              {(streamName || imagePreview) && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                  <h4 className="font-semibold text-orange-800 mb-4 text-center">
                    Stream Preview
                  </h4>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {imagePreview && (
                      <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-orange-300 shadow-sm">
                        <img
                          src={imagePreview}
                          alt="Stream preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    {streamName && (
                      <div className="text-center sm:text-left">
                        <h5 className="font-bold text-gray-800 text-lg">{streamName}</h5>
                        <p className="text-gray-600 text-sm">Academic Stream</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center sm:justify-end mt-12 pt-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-orange-700 hover:to-red-700'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Stream...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <FiPlus className="w-5 h-5 mr-2" />
                    Create Stream
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <FiBook className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Stream Creation Tips</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  Use clear, descriptive names for academic streams
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  Choose high-quality, relevant images or icons
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  Ensure images are optimized for web (PNG/JPG under 5MB)
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  Use consistent naming conventions across all streams
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
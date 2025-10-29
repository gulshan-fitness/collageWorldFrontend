import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { Context } from "../../../../Context_holder";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { 
  FiCalendar, 
  FiMapPin, 
  FiClock, 
  FiType, 
  FiImage, 
  FiPlus,
  FiBook,
  FiUpload,
  FiCheck
} from "react-icons/fi";

export default function Event_add() {
  const {
    college_fetch,
    colleges,
    selected_college,
    setselected_college,
    quill_value,
    setquill_value,
    token,
    notify,
    admin
  } = useContext(Context);

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

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
      ['link', 'image', 'video'],
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
    'link', 'image', 'video'
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '48px',
      border: state.isFocused ? '2px solid #f59e0b' : '1px solid #d1d5db',
      borderRadius: '12px',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(245, 158, 11, 0.1)' : 'none',
      backgroundColor: '#f9fafb',
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        borderColor: state.isFocused ? '#f59e0b' : '#9ca3af'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#f59e0b' : state.isFocused ? '#fef3c7' : 'white',
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
    setquill_value(null);
  }, [admin]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const submit_handler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const logo = e.target.logo.files[0];
    const college_id = selected_college?.value;
    const description = quill_value;
    const location = e.target.location.value;
    const heading = e.target.heading.value;
    const date = e.target.date.value;
    const time = e.target.time.value;

    if (!logo) {
      notify('Please select an event image', 0);
      setIsSubmitting(false);
      return;
    }

    if (!college_id) {
      notify('Please select a college', 0);
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("logo", logo);
    formData.append("college_id", college_id);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("heading", heading);
    formData.append("date", date);
    formData.append("time", time);

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL +
          process.env.REACT_APP_EVENT_URL +
          "add",
        formData,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data'
          },
        }
      );

      notify(response.data.msg, response.data.status);

      if (response.data.status === 1) {
        e.target.reset();
        setselected_college(null);
        setquill_value(null);
        setSelectedFile(null);
        setFilePreview(null);
        
        // Navigate to events list after success
        setTimeout(() => {
          navigate('/admin/events');
        }, 1500);
      }
    } catch (error) {
      console.error("Error:", error);
      notify('Failed to create event', 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-3">
            Create New Event
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Organize and announce exciting events for your college community
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Card Header */}
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <FiCalendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Event Information</h2>
                <p className="text-amber-100 text-sm">Fill in the details to create an engaging event</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={submit_handler} encType="multipart/form-data" className="p-6 md:p-8">
            <div className="space-y-6">
              
              {/* College Selection & Image Upload */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* College Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <FiBook className="w-4 h-4 text-amber-600" />
                    College
                  </label>
                  <Select
                    value={selected_college}
                    styles={customStyles}
                    onChange={(e) => setselected_college(e)}
                    name="college_id"
                    options={colleges?.map((data) => ({
                      value: data._id,
                      label: data.college_name,
                    }))}
                    placeholder="Select a college..."
                    isSearchable
                    required
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <FiImage className="w-4 h-4 text-amber-600" />
                    Event Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-amber-400 transition-colors duration-200 bg-gray-50">
                    <input
                      type="file"
                      id="logo"
                      name="logo"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                    <label htmlFor="logo" className="cursor-pointer block">
                      <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 font-medium">Click to upload event image</p>
                      <p className="text-gray-400 text-sm mt-1">PNG, JPG, JPEG up to 5MB</p>
                    </label>
                  </div>
                  {filePreview && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                      <div className="border border-gray-200 rounded-xl overflow-hidden">
                        <img
                          src={filePreview}
                          alt="Event preview"
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Event Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FiMapPin className="w-4 h-4 text-amber-600" />
                    Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    placeholder="Enter event location"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-gray-50 transition-all duration-200 placeholder-gray-400"
                  />
                </div>

                {/* Heading */}
                <div>
                  <label htmlFor="heading" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FiType className="w-4 h-4 text-amber-600" />
                    Event Title
                  </label>
                  <input
                    id="heading"
                    name="heading"
                    type="text"
                    required
                    placeholder="Enter event title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-gray-50 transition-all duration-200 placeholder-gray-400"
                  />
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FiCalendar className="w-4 h-4 text-amber-600" />
                    Event Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-gray-50 transition-all duration-200"
                  />
                </div>

                {/* Time */}
                <div>
                  <label htmlFor="time" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FiClock className="w-4 h-4 text-amber-600" />
                    Event Time
                  </label>
                  <input
                    id="time"
                    name="time"
                    type="text"
                    required
                    placeholder="e.g., 2:00 PM - 4:00 PM"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-gray-50 transition-all duration-200 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FiBook className="w-4 h-4 text-amber-600" />
                  Event Description
                </label>
                <div className="border border-gray-300 rounded-xl overflow-hidden">
                  <ReactQuill
                    value={quill_value}
                    onChange={setquill_value}
                    modules={quillModules}
                    formats={quillFormats}
                    theme="snow"
                    style={{ minHeight: '200px', border: 'none' }}
                  />
                </div>
                {quill_value && (
                  <div className="mt-2 text-sm text-gray-500">
                    Description length: {quill_value.replace(/<[^>]*>/g, '').length} characters
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Event...
                  </>
                ) : (
                  <>
                    <FiPlus className="w-5 h-5" />
                    Create Event
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tips Card */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 rounded-lg flex-shrink-0">
              <FiCheck className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-800 mb-2">Tips for Great Events</h4>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• Use high-quality images that represent your event well</li>
                <li>• Write clear and compelling event titles</li>
                <li>• Provide detailed descriptions with all necessary information</li>
                <li>• Include specific dates, times, and locations</li>
                <li>• Use proper formatting for better readability</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
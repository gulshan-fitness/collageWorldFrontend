import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../../../Context_holder';
import Select from 'react-select';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  FiBook,
  FiSave,
  FiUpload,
  FiX,
  FiImage,
  FiYoutube,
  FiEdit3,
  FiTrash2,
  FiCheckCircle,
  FiAward,
  FiUser,
  FiDollarSign,
  FiList,
  FiClock,
  FiArrowLeft, // Added for Previous button
  FiArrowRight // Added for Next button
} from 'react-icons/fi';

export default function Course_edit() {
  const {
    course_fetch, currenetcourse, token,
    stream_fetch, stream, selected_stream, setselected_stream,
    notify
  } = useContext(Context);

  const { id } = useParams();
  const [currenet_data, setcurrenet_data] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  // Image states and refs
  const [imageValues, setImageValues] = useState({});
  const imageRefs = {
    course_image: useRef(),
    ProgramOverview_image: useRef(),
    keyhighlight_image: useRef(),
    syllabusImage: useRef(),
    eligibility_DurationImage: useRef(),
    programFeesImage: useRef(),
    admissionProcessImage: useRef(),
    educationLoanImage: useRef()
  };

  // Rich text fields
  const [course_overview, setcourse_overview] = useState("");
  const [coursekeyhighlight, setcoursekeyhighlight] = useState("");
  const [coursesyllabus, setcoursesyllabus] = useState("");
  const [courseeligibility, setcourseeligibility] = useState("");
  const [coursefees, setcoursefees] = useState("");
  const [admissionProcess, setadmissionProcess] = useState("");
  const [educationLoan, seteducationLoan] = useState("");
  const [CourseType, setCourseType] = useState("");

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '56px',
      border: state.isFocused ? '2px solid #3b82f6' : '2px solid #e5e7eb',
      borderRadius: '12px',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none',
      transition: 'all 0.2s ease-in-out',
      backgroundColor: '#fafafa',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : 'white',
      color: state.isSelected ? 'white' : '#1f2937',
      padding: '12px 16px',
      fontSize: '14px',
      borderRadius: '8px',
      margin: '2px 8px',
      width: 'calc(100% - 16px)',
    }),
  };

  const Perticuler_ImageDelete = (old_image, path) => {
    const id = currenet_data?._id;
    axios.patch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_COURSE_URL}Perticuler_ImageDelete/${id}/${old_image}/${path}`, {}, {
      headers: { Authorization: token }
    })
      .then((success) => {
        notify(success.data.msg, success.data.status);
        if (success.data.status === 1) {
          course_fetch(id);
        }
      })
      .catch((err) => console.error(err));
  };

  const image_update_handler = (value, old_value, ref, path, mode) => {
    if (!value) return;
    const id = currenet_data?._id;
    const formData = new FormData();
    formData.append("image", value);

    if (mode !== "newAdd") {
      formData.append("old_image", old_value);
    }

    setIsLoading(true);
    axios.patch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_COURSE_URL}ImageEdits/${id}/${mode}/${path}`, formData, {
      headers: { Authorization: token }
    })
      .then((success) => {
        notify(success.data.msg, success.data.status);
        if (success.data.status === 1) {
          course_fetch(id);
          ref.current.value = "";
          setImageValues(prev => ({ ...prev, [path]: null }));
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  const handleImageChange = (e, path) => {
    const file = e.target.files[0];
    setImageValues(prev => ({ ...prev, [path]: file }));
  };

  useEffect(() => {
    course_fetch(id);
    stream_fetch();
  }, []);

  useEffect(() => {
    if (currenetcourse) {
      setcurrenet_data(currenetcourse);
      setselected_stream({
        label: currenetcourse?.stream_id?.stream_name,
        value: currenetcourse?.stream_id?._id
      });

      setcourse_overview(currenetcourse?.ProgramOverview || "");
      setcoursekeyhighlight(currenetcourse?.keyhighlight || "");
      setcoursesyllabus(currenetcourse?.syllabus || "");
      setcourseeligibility(currenetcourse?.eligibility_Duration || "");
      setcoursefees(currenetcourse?.programFees || "");
      setadmissionProcess(currenetcourse?.admissionProcess || "");
      seteducationLoan(currenetcourse?.educationLoan || "");
      setCourseType(currenetcourse?.courseType || "");
    }
  }, [currenetcourse]);

  const edit_handler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      courseName: e?.target?.courseName?.value || "",
      stream_id: selected_stream?.value || "",
      ProgramOverview: course_overview ?? "",
      keyhighlight: coursekeyhighlight ?? "",
      syllabus: coursesyllabus ?? "",
      eligibility_Duration: courseeligibility ?? "",
      programFees: coursefees ?? "",
      admissionProcess: admissionProcess ?? "",
      educationLoan: educationLoan ?? "",
      courseType: e?.target?.courseType?.value || "",
      youtubeUrl: e?.target?.youtubeUrl?.value || "",
      specialisation: e?.target?.specialisation?.value
        ?.split("$")
        ?.filter(a => a?.trim() !== "") || []
    };

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_COURSE_URL}edit/${id}`, data, {
        headers: { Authorization: token }
      });

      if (response.data.status === 1) {
        notify(response.data.msg, response.data.status);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        course_fetch(id);
      }
    } catch (error) {
      console.error(error);
      notify('Failed to update course', 0);
    } finally {
      setIsLoading(false);
    }
  };

  const ImageUploadSection = ({ title, path, icon: Icon }) => {
    const hasImage = currenet_data?.[path];
    const currentValue = imageValues[path];

    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-gray-800">{title}</h3>
          </div>
          {hasImage && (
            <button
              type="button"
              onClick={() => Perticuler_ImageDelete(currenet_data[path], path)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              <FiTrash2 className="w-4 h-4" />
              <span className="text-sm font-medium">Delete</span>
            </button>
          )}
        </div>

        {hasImage && (
          <div className="mb-4">
            <img
              src={`${process.env.REACT_APP_API_IMAGE_URL}${path}/${currenet_data[path]}`}
              alt={title}
              className="w-32 h-24 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
            />
          </div>
        )}

        <div className="space-y-3">
          <input
            ref={imageRefs[path]}
            type="file"
            onChange={(e) => handleImageChange(e, path)}
            className="hidden"
            accept="image/*"
          />
          
          <button
            type="button"
            onClick={() => imageRefs[path].current?.click()}
            className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-400 transition-colors bg-gray-50"
          >
            <FiUpload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Click to upload {title.toLowerCase()}</p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 5MB</p>
          </button>

          {currentValue && (
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-sm text-blue-700 font-medium">
                {currentValue.name}
              </span>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setImageValues(prev => ({ ...prev, [path]: null }))}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <FiX className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => image_update_handler(
                    currentValue,
                    currenet_data?.[path],
                    imageRefs[path],
                    path,
                    hasImage ? "update" : "newAdd"
                  )}
                  disabled={isLoading}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Uploading...' : hasImage ? 'Update' : 'Upload'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: FiEdit3 },
    { id: 'content', label: 'Course Content', icon: FiBook },
    { id: 'media', label: 'Media', icon: FiImage }
  ];

  // Handle Next and Previous button clicks
  const handleNavigation = (direction) => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (direction === 'next' && currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    } else if (direction === 'prev' && currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  console.log(currenet_data, "currenet_data", CourseType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FiBook className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Edit Course
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Update course information and media content
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-2xl p-6 flex items-center space-x-4 animate-fade-in">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FiCheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800">Course Updated Successfully!</h3>
              <p className="text-green-600">The course has been updated successfully.</p>
            </div>
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FiEdit3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Edit Course: {currenet_data?.courseName}</h2>
                <p className="text-blue-100 text-sm">Update course details and media</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={edit_handler} className="p-6">
            
            {/* Basic Information Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Stream Selection */}
                  <div className="space-y-3">
                    <label className="block text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <FiBook className="text-blue-500" />
                      Stream
                    </label>
                    <Select
                      value={selected_stream}
                      styles={customSelectStyles}
                      onChange={setselected_stream}
                      options={stream?.map(data => ({ value: data._id, label: data.stream_name }))}
                      placeholder="Select stream..."
                      isSearchable
                      required
                    />
                  </div>

                  {/* Course Name */}
                  <div className="space-y-3">
                    <label htmlFor="courseName" className="block text-lg font-semibold text-gray-800">
                      Course Name
                    </label>
                    <input
                      type="text"
                      id="courseName"
                      name="courseName"
                      defaultValue={currenet_data?.courseName}
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-800"
                      placeholder="Enter course name"
                    />
                  </div>

                  {/* Course Type */}
                  <div className="space-y-3">
                    <label htmlFor="courseType" className="block text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <FiAward className="text-blue-500" />
                      Course Type
                    </label>
                    <select
                      id="courseType"
                      name="courseType"
                      required
                      value={CourseType}
                      onChange={(e) => setCourseType(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-gray-50 text-gray-800 appearance-none cursor-pointer"
                    >
                      <option value="">Select Course Type</option>
                      <option value="ugCourse">UG Course</option>
                      <option value="pgCourse">PG Course</option>
                      <option value="abroadStudy">Abroad Study</option>
                      <option value="certificateProgram">Certificate Program</option>
                      <option value="onlineCourse">Online Course</option>
                      <option value="distanceCourse">Distance Course</option>
                    </select>
                  </div>

                  {/* Specialisation */}
                  <div className="space-y-3">
                    <label htmlFor="specialisation" className="block text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <FiList className="text-blue-500" />
                      Specialisation
                      <span className="text-red-500 text-sm">($ separated)</span>
                    </label>
                    <input
                      type="text"
                      id="specialisation"
                      name="specialisation"
                      defaultValue={currenet_data?.specialisation?.join("$")}
                      required
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-800"
                      placeholder="AI$ML$Data Science"
                    />
                  </div>

                  {/* YouTube URL */}
                  <div className="space-y-3">
                    <label htmlFor="youtubeUrl" className="block text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <FiYoutube className="text-red-500" />
                      YouTube URL
                    </label>
                    <input
                      type="url"
                      id="youtubeUrl"
                      name="youtubeUrl"
                      defaultValue={currenet_data?.youtubeUrl}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-800"
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Course Content Tab */}
            {activeTab === 'content' && (
              <div className="space-y-8">
                {[
                  { value: course_overview, onChange: setcourse_overview, label: 'Program Overview', icon: FiBook },
                  { value: coursekeyhighlight, onChange: setcoursekeyhighlight, label: 'Key Highlights', icon: FiAward },
                  { value: coursesyllabus, onChange: setcoursesyllabus, label: 'Syllabus', icon: FiList },
                  { value: courseeligibility, onChange: setcourseeligibility, label: 'Eligibility & Duration', icon: FiUser },
                  { value: coursefees, onChange: setcoursefees, label: 'Program Fees', icon: FiDollarSign },
                  { value: admissionProcess, onChange: setadmissionProcess, label: 'Admission Process', icon: FiClock },
                  { value: educationLoan, onChange: seteducationLoan, label: 'Education Loan', icon: FiDollarSign },
                ].map((editor, index) => (
                  <div key={index} className="space-y-4">
                    <label className="block text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <editor.icon className="text-blue-500" />
                      {editor.label}
                    </label>
                    <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                      <ReactQuill 
                        value={editor.value} 
                        onChange={editor.onChange}
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
                        style={{ minHeight: '200px', border: 'none' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Media Tab */}
            {activeTab === 'media' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ImageUploadSection 
                    title="Course Image" 
                    path="course_image" 
                    icon={FiImage}
                  />
                  
                  <ImageUploadSection 
                    title="Program Overview" 
                    path="ProgramOverview_image" 
                    icon={FiBook}
                  />

                  <ImageUploadSection 
                    title="Key Highlights" 
                    path="keyhighlight_image" 
                    icon={FiAward}
                  />

                  <ImageUploadSection 
                    title="Syllabus" 
                    path="syllabusImage" 
                    icon={FiList}
                  />

                  <ImageUploadSection 
                    title="Eligibility & Duration" 
                    path="eligibility_DurationImage" 
                    icon={FiUser}
                  />

                  <ImageUploadSection 
                    title="Program Fees" 
                    path="programFeesImage" 
                    icon={FiDollarSign}
                  />

                  <ImageUploadSection 
                    title="Admission Process" 
                    path="admissionProcessImage" 
                    icon={FiClock}
                  />

                  <ImageUploadSection 
                    title="Education Loan" 
                    path="educationLoanImage" 
                    icon={FiDollarSign}
                  />
                </div>
              </div>
            )}

            {/* Navigation and Submit Buttons */}
            <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200">
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleNavigation('prev')}
                  disabled={activeTab === tabs[0].id}
                  className={`px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 ${
                    activeTab === tabs[0].id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
                  }`}
                >
                  <FiArrowLeft className="w-5 h-5" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigation('next')}
                  disabled={activeTab === tabs[tabs.length - 1].id}
                  className={`px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 ${
                    activeTab === tabs[tabs.length - 1].id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
                  }`}
                >
                  <span>Next</span>
                  <FiArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Update Course Button (only for Basic Info and Course Content) */}
              {(activeTab === 'basic' || activeTab === 'content') && (
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-700 hover:to-indigo-700'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating Course...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <FiSave className="w-5 h-5 mr-2" />
                      Update Course
                    </div>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
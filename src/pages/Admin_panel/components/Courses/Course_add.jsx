import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../../Context_holder';
import Select from 'react-select';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { 
  FiBook, 
  FiYoutube, 
  FiImage, 
  FiPlus, 
  FiCheckCircle,
  FiUpload,
  FiX
} from 'react-icons/fi';

export default function Course_add() {
  const { colleges, selected_college, setselected_college, token, stream_fetch, stream, selected_stream, setselected_stream, notify } = useContext(Context);

  const [course_overview, setcourse_overview] = useState("");
  const [coursekeyhighlight, setcoursekeyhighlight] = useState("");
  const [coursesyllabus, setcoursesyllabus] = useState("");
  const [courseeligibility, setcourseeligibility] = useState("");
  const [coursefees, setcoursefees] = useState("");
  const [educationLoan, seteducationLoan] = useState("");
  const [admissionProcess, setadmissionProcess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imagePreviews, setImagePreviews] = useState({});

  useEffect(() => {
    stream_fetch();
    setselected_stream(null);
  }, []);

  const handleImageChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => ({
          ...prev,
          [fieldName]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (fieldName) => {
    setImagePreviews(prev => {
      const newPreviews = { ...prev };
      delete newPreviews[fieldName];
      return newPreviews;
    });
    document.getElementById(fieldName).value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const stream_id = selected_stream?.value;
    const courseName = e.target.courseName.value;
    const courseType = e.target.courseType.value;
    const course_image = e.target.course_image.files[0];
    const youtubeUrl = e.target.youtubeUrl.value;

    // Collect files from input
    const ProgramOverview_image = e.target.ProgramOverview_image?.files[0] ?? null;
    const keyhighlight_image = e.target.keyhighlight_image?.files[0] ?? null;
    const syllabusImage = e.target.syllabusImage?.files[0] ?? null;
    const eligibility_DurationImage = e.target.eligibility_DurationImage?.files[0] ?? null;
    const programFeesImage = e.target.programFeesImage?.files[0] ?? null;
    const admissionProcessImage = e.target.admissionProcessImage?.files[0] ?? null;
    const educationLoanImage = e.target.educationLoanImage?.files[0] ?? null;

    const specialisation = e.target.specialisation.value.split("$").filter(a => a !== "");

    const formData = new FormData();

    formData.append("stream_id", stream_id);
    formData.append("courseName", courseName);
    formData.append("courseType", courseType);
    formData.append("course_image", course_image);
    formData.append("specialisation", specialisation);

    // Append conditionally (only if file exists)
    if (ProgramOverview_image) formData.append("ProgramOverview_image", ProgramOverview_image);
    if (keyhighlight_image) formData.append("keyhighlight_image", keyhighlight_image);
    if (syllabusImage) formData.append("syllabusImage", syllabusImage);
    if (eligibility_DurationImage) formData.append("eligibility_DurationImage", eligibility_DurationImage);
    if (programFeesImage) formData.append("programFeesImage", programFeesImage);
    if (admissionProcessImage) formData.append("admissionProcessImage", admissionProcessImage);
    if (educationLoanImage) formData.append("educationLoanImage", educationLoanImage);

    // Text fields (ReactQuill)
    if (course_overview) formData.append("ProgramOverview", course_overview);
    if (coursekeyhighlight) formData.append("keyhighlight", coursekeyhighlight);
    if (coursesyllabus) formData.append("syllabus", coursesyllabus);
    if (courseeligibility) formData.append("eligibility_Duration", courseeligibility);
    if (coursefees) formData.append("programFees", coursefees);
    if (admissionProcess) formData.append("admissionProcess", admissionProcess);
    if (educationLoan) formData.append("educationLoan", educationLoan);
    if (youtubeUrl) formData.append("youtubeUrl", youtubeUrl);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_COURSE_URL}add`,
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
        setselected_college(null);
        setselected_stream(null);
        setcourse_overview("");
        setcoursekeyhighlight("");
        setcoursesyllabus("");
        setcourseeligibility("");
        setcoursefees("");
        setadmissionProcess("");
        seteducationLoan("");
        setImagePreviews({});
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      notify('Failed to add course', 0);
    } finally {
      setIsLoading(false);
    }
  };

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '56px',
      border: state.isFocused ? '2px solid #3b82f6' : '2px solid #e5e7eb',
      borderRadius: '12px',
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
      borderRadius: '8px',
      margin: '2px 8px',
      width: 'calc(100% - 16px)',
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <FiBook className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">Add New Course</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Create comprehensive course information with rich content and media</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-2xl p-6 flex items-center space-x-4 animate-fade-in">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FiCheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800">Course Added Successfully!</h3>
              <p className="text-green-600">The new course has been created and saved.</p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FiPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Course Information</h2>
                <p className="text-blue-100 text-sm">Complete all required fields to create the course</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            
            {/* Basic Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              
              {/* Stream Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
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
                <label htmlFor="courseName" className="block text-sm font-semibold text-gray-700">Course Name</label>
                <input
                  type="text"
                  id="courseName"
                  name="courseName"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-800"
                  placeholder="Enter course name"
                />
              </div>

              {/* Course Type */}
              <div className="space-y-3">
                <label htmlFor="courseType" className="block text-sm font-semibold text-gray-700">Course Type</label>
                <select
                  id="courseType"
                  name="courseType"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-gray-50 text-gray-800 appearance-none cursor-pointer"
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
                <label htmlFor="specialisation" className="block text-sm font-semibold text-gray-700">
                  Specialisation <span className="text-red-500 text-xs">($ separated)</span>
                </label>
                <input
                  type="text"
                  id="specialisation"
                  name="specialisation"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-800"
                  placeholder="AI$ML$Data Science"
                />
              </div>
            </div>

            {/* Media Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              
              {/* Course Image */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FiImage className="text-blue-500" />
                  Course Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-400 transition-all duration-200 bg-gray-50">
                  {imagePreviews.course_image ? (
                    <div className="space-y-3">
                      <div className="relative mx-auto w-24 h-24">
                        <img src={imagePreviews.course_image} alt="Preview" className="w-full h-full object-cover rounded-lg shadow-md" />
                        <button type="button" onClick={() => removeImage('course_image')} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                          <FiX className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-green-600 text-sm font-medium">Image selected</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                        <FiUpload className="w-6 h-6 text-blue-500" />
                      </div>
                      <p className="text-gray-600 text-sm">Upload course image</p>
                    </div>
                  )}
                  <input type="file" id="course_image" name="course_image" onChange={(e) => handleImageChange(e, 'course_image')} className="hidden" required />
                  <label htmlFor="course_image" className="inline-block mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 cursor-pointer text-sm">
                    Choose Image
                  </label>
                </div>
              </div>

              {/* YouTube URL */}
              <div className="space-y-3">
                <label htmlFor="youtubeUrl" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FiYoutube className="text-red-500" />
                  YouTube URL
                </label>
                <input
                  type="url"
                  id="youtubeUrl"
                  name="youtubeUrl"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-gray-50 placeholder-gray-400 text-gray-800"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
            </div>

            {/* Additional Images Grid */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Images (Optional)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { id: 'ProgramOverview_image', label: 'Program Overview' },
                  { id: 'keyhighlight_image', label: 'Key Highlights' },
                  { id: 'syllabusImage', label: 'Syllabus' },
                  { id: 'eligibility_DurationImage', label: 'Eligibility & Duration' },
                  { id: 'programFeesImage', label: 'Program Fees' },
                  { id: 'admissionProcessImage', label: 'Admission Process' },
                  { id: 'educationLoanImage', label: 'Education Loan' },
                ].map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label htmlFor={field.id} className="block text-xs font-medium text-gray-700">
                      {field.label}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-blue-400 transition-all duration-200 bg-gray-50">
                      {imagePreviews[field.id] ? (
                        <div className="space-y-2">
                          <div className="relative mx-auto w-12 h-12">
                            <img src={imagePreviews[field.id]} alt="Preview" className="w-full h-full object-cover rounded-md" />
                            <button type="button" onClick={() => removeImage(field.id)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600">
                              <FiX className="w-2 h-2" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-400">
                          <FiImage className="w-4 h-4 mx-auto mb-1" />
                          <span className="text-xs">Optional</span>
                        </div>
                      )}
                      <input type="file" id={field.id} name={field.id} onChange={(e) => handleImageChange(e, field.id)} className="hidden" />
                      <label htmlFor={field.id} className="block text-xs text-blue-600 hover:text-blue-700 cursor-pointer mt-1">
                        {imagePreviews[field.id] ? 'Change' : 'Upload'}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rich Text Editors */}
            <div className="space-y-6 mb-8">
              {[
                { value: course_overview, onChange: setcourse_overview, label: 'Program Overview' },
                { value: coursekeyhighlight, onChange: setcoursekeyhighlight, label: 'Key Highlights' },
                { value: coursesyllabus, onChange: setcoursesyllabus, label: 'Syllabus' },
                { value: courseeligibility, onChange: setcourseeligibility, label: 'Eligibility & Duration' },
                { value: coursefees, onChange: setcoursefees, label: 'Program Fees' },
                { value: admissionProcess, onChange: setadmissionProcess, label: 'Admission Process' },
                { value: educationLoan, onChange: seteducationLoan, label: 'Education Loan' },
              ].map((editor, index) => (
                <div key={index} className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">{editor.label}</label>
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
                      style={{ minHeight: '150px', border: 'none' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isLoading}
                className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-700 hover:to-indigo-700'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Course...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <FiPlus className="w-5 h-5 mr-2" />
                    Add Course
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
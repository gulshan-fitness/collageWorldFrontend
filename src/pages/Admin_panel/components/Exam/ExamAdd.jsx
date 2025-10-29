import React, { useContext, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Context } from "../../../../Context_holder";
import Select from 'react-select';
import axios from "axios";
import { 
  FaUpload, 
  FaCalendarAlt, 
  FaLink, 
  FaAward,
  FaBook,
  FaCheckSquare,
  FaFileAlt,
  FaYoutube,
  FaGlobe,
  FaBolt,
  FaPlus,
  FaSpinner,
  FaGraduationCap,
  FaEdit,
  FaClock,
  FaFilePdf,
  FaCrown,
  FaGem,
  FaShieldAlt,
  FaRocket,
  FaArrowRight,
  FaArrowLeft,
  FaSave,
  FaStar,
  FaPalette,
  FaMagic,
  FaBars
} from "react-icons/fa";

export default function ExamAdd() {
  const { notify, course_fetch, course, token } = useContext(Context);
  
  // Separate states for all form inputs
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [fullName, setFullName] = useState("");
  const [shortName, setShortName] = useState("");
  const [mode, setMode] = useState("online exam");
  const [year, setYear] = useState(new Date().getFullYear());
  const [youtubeLink, setYoutubeLink] = useState("");
  const [directApplyLink, setDirectApplyLink] = useState("");
  const [mockTestLink, setMockTestLink] = useState("");
  const [topExam, setTopExam] = useState(false);
  
  // Date states
  const [applicationFormDateFrom, setApplicationFormDateFrom] = useState("");
  const [applicationFormDateTo, setApplicationFormDateTo] = useState("");
  const [resultAnnounceDateFrom, setResultAnnounceDateFrom] = useState("");
  const [resultAnnounceDateTo, setResultAnnounceDateTo] = useState("");
  
  // Rich text states
  const [examPattern, setExamPattern] = useState("");
  const [applicationProcess, setApplicationProcess] = useState("");
  const [preparationTips, setPreparationTips] = useState("");
  const [result, setResult] = useState("");
  
  // File states
  const [logoFile, setLogoFile] = useState(null);
  const [previousPaperFile, setPreviousPaperFile] = useState(null);
  
  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: "basic", label: "Basic", icon: FaFileAlt, color: "from-blue-500 to-cyan-500" },
    { id: "dates", label: "Dates", icon: FaCalendarAlt, color: "from-purple-500 to-pink-500" },
    { id: "content", label: "Content", icon: FaBook, color: "from-orange-500 to-red-500" },
    { id: "media", label: "Media", icon: FaUpload, color: "from-green-500 to-teal-500" }
  ];

  useEffect(() => {
    course_fetch();
  }, []);

  // Navigation functions
  const nextSection = () => {
    const currentIndex = sections.findIndex(section => section.id === activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id);
      setIsMobileMenuOpen(false);
    }
  };

  const prevSection = () => {
    const currentIndex = sections.findIndex(section => section.id === activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id);
      setIsMobileMenuOpen(false);
    }
  };

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: '12px 14px',
      border: state.isFocused ? '2px solid #8b5cf6' : '2px solid #e2e8f0',
      borderRadius: '12px',
      backgroundColor: state.isFocused ? 'rgba(139, 92, 246, 0.05)' : '#ffffff',
      boxShadow: state.isFocused 
        ? '0 0 0 3px rgba(139, 92, 246, 0.1)' 
        : '0 2px 8px rgba(0, 0, 0, 0.06)',
      transition: 'all 0.3s ease',
      minHeight: '48px',
      fontSize: '16px', // Prevents zoom on iOS
      '&:hover': {
        borderColor: '#8b5cf6',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? '#8b5cf6' 
        : state.isFocused 
        ? '#f8fafc' 
        : 'white',
      color: state.isSelected ? 'white' : '#334155',
      padding: '12px 14px',
      fontSize: '14px',
      fontWeight: '500',
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: '14px',
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: '16px',
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: '16px',
    }),
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  // File handlers
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
  };

  const handlePreviousPaperChange = (e) => {
    const file = e.target.files[0];
    setPreviousPaperFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submitData = new FormData();
    
    // Append all form data from separate states
    submitData.append("Course_id", selectedCourse?.value || "");
    submitData.append("FullName", fullName);
    submitData.append("ShortName", shortName);
    submitData.append("Mode", mode);
    submitData.append("year", year.toString());
    submitData.append("youtubeLink", youtubeLink);
    submitData.append("directapplyLink", directApplyLink);
    submitData.append("MockTestLink", mockTestLink);
    submitData.append("topExam", topExam.toString());
    
    // Append date objects
    submitData.append("Application_FormDate", JSON.stringify({
      from: applicationFormDateFrom,
      to: applicationFormDateTo
    }));
    
    submitData.append("Result_Announce_Date", JSON.stringify({
      from: resultAnnounceDateFrom,
      to: resultAnnounceDateTo
    }));
    
    // Append rich text content
    submitData.append("ExamPattern", examPattern);
    submitData.append("ApplicationProcess", applicationProcess);
    submitData.append("PreparationTips", preparationTips);
    submitData.append("Result", result);
    
    // Append files
    if (logoFile) submitData.append("logo", logoFile);
    if (previousPaperFile) submitData.append("PreviousPapper", previousPaperFile);

    try {
      const success = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_EXAM_URL}add`,
        submitData,
        { headers: { Authorization: token } }
      );

      notify(success.data.msg, success.data.status);
      
      if (success.data.status === 1) {
        // Reset all states
        setSelectedCourse(null);
        setFullName("");
        setShortName("");
        setMode("online exam");
        setYear(new Date().getFullYear());
        setYoutubeLink("");
        setDirectApplyLink("");
        setMockTestLink("");
        setTopExam(false);
        setApplicationFormDateFrom("");
        setApplicationFormDateTo("");
        setResultAnnounceDateFrom("");
        setResultAnnounceDateTo("");
        setExamPattern("");
        setApplicationProcess("");
        setPreparationTips("");
        setResult("");
        setLogoFile(null);
        setPreviousPaperFile(null);
        setActiveSection("basic");
      }
    } catch (error) {
      console.error(error);
      notify("Error creating exam", 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const SectionButton = ({ title, icon: Icon, section, isActive, color }) => (
    <button
      type="button"
      onClick={() => {
        setActiveSection(section);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold transition-all duration-300 text-sm min-w-[70px] justify-center ${
        isActive 
          ? `bg-gradient-to-r ${color} text-white shadow-lg` 
          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
      }`}
    >
      <Icon className={`text-base ${isActive ? 'text-white' : 'text-gray-500'}`} />
      <span className="hidden xs:inline">{title}</span>
    </button>
  );

  const currentSection = sections.find(section => section.id === activeSection);
  const currentSectionIndex = sections.findIndex(section => section.id === activeSection);
  const isLastSection = currentSectionIndex === sections.length - 1;
  const isFirstSection = currentSectionIndex === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 py-4 px-3 sm:px-4 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Mobile Header */}
        <div className="lg:hidden mb-4">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/40 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
                  <FaGraduationCap className="text-white text-lg" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Create Exam</h1>
                  <p className="text-gray-600 text-xs">Step {currentSectionIndex + 1} of {sections.length}</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FaBars className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mb-4">
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white/40 p-4">
              <div className="grid grid-cols-2 gap-2">
                {sections.map((section) => (
                  <SectionButton
                    key={section.id}
                    title={section.label}
                    icon={section.icon}
                    section={section.id}
                    isActive={activeSection === section.id}
                    color={section.color}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Desktop Header */}
        <div className="hidden lg:block text-center mb-6">
          <div className="inline-flex flex-col items-center gap-4 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-white/40">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
                <FaGraduationCap className="text-white text-xl" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Create New Exam
              </h1>
            </div>
            <p className="text-gray-600 text-sm">
              Fill in all the details to create a comprehensive exam
            </p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 p-4 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <FaEdit className="text-blue-500 text-sm" />
              <h2 className="text-base font-bold text-gray-800">
                {currentSection.label}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {sections.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index <= currentSectionIndex 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 font-semibold text-xs">
                {Math.round(((currentSectionIndex + 1) / sections.length) * 100)}%
              </span>
            </div>
          </div>
          
          {/* Section Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {sections.map((section, index) => (
              <React.Fragment key={section.id}>
                <SectionButton 
                  title={section.label} 
                  icon={section.icon} 
                  section={section.id} 
                  isActive={activeSection === section.id}
                  color={section.color}
                />
                {index < sections.length - 1 && (
                  <div className={`flex items-center px-1 ${
                    index < currentSectionIndex 
                      ? 'text-purple-500' 
                      : 'text-gray-300'
                  }`}>
                    <FaArrowRight className="text-xs" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/40 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            
            {/* Basic Information Section */}
            {activeSection === "basic" && (
              <div className="space-y-4">
                <div className="space-y-4">
                  {/* Course Selection */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FaBook className="text-blue-500 text-sm" />
                      Course Selection
                      <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={selectedCourse}
                      styles={customSelectStyles}
                      onChange={setSelectedCourse}
                      options={course?.map(data => ({ 
                        value: data._id, 
                        label: data.courseName 
                      }))}
                      placeholder="Choose course..."
                    />
                  </div>

                  {/* Exam Mode */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FaGlobe className="text-blue-500 text-sm" />
                      Exam Mode
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={mode}
                      onChange={(e) => setMode(e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none font-medium text-gray-800 text-base"
                      required
                    >
                      <option value="online exam">Online Exam</option>
                      <option value="offline exam">Offline Exam</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Exam Full Name */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FaFileAlt className="text-blue-500 text-sm" />
                      Exam Full Name
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g., Joint Entrance Examination"
                      className="w-full p-3 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none placeholder-gray-400 font-medium text-base"
                      required
                    />
                  </div>

                  {/* Exam Short Name */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FaFileAlt className="text-blue-500 text-sm" />
                      Exam Short Name
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={shortName}
                      onChange={(e) => setShortName(e.target.value)}
                      placeholder="e.g., JEE Main"
                      className="w-full p-3 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none placeholder-gray-400 font-medium text-base"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Year */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FaCalendarAlt className="text-blue-500 text-sm" />
                      Year
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={year}
                      onChange={(e) => setYear(parseInt(e.target.value))}
                      placeholder="2024"
                      min="2000"
                      max="2030"
                      className="w-full p-3 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none placeholder-gray-400 font-medium text-base"
                      required
                    />
                  </div>

                  {/* Featured Exam */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FaAward className="text-blue-500 text-sm" />
                      Featured Exam
                    </label>
                    <label className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-xl bg-white hover:bg-gray-50 cursor-pointer transition-all duration-300">
                      <input
                        type="checkbox"
                        checked={topExam}
                        onChange={(e) => setTopExam(e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      />
                      <div className="flex-1">
                        <span className="text-gray-700 font-medium block text-sm">
                          Mark as Featured
                        </span>
                        <span className="text-gray-500 text-xs block mt-1">
                          Show in featured section
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Dates & Links Section */}
            {activeSection === "dates" && (
              <div className="space-y-4">
                <div className="space-y-4">
                  {/* Application Period */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FaCalendarAlt className="text-purple-500 text-sm" />
                      Application Period
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3 bg-gray-50 p-3 rounded-xl">
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">From</label>
                        <input
                          type="date"
                          value={applicationFormDateFrom}
                          onChange={(e) => setApplicationFormDateFrom(e.target.value)}
                          className="w-full p-2 border-2 border-gray-200 rounded-lg bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300 outline-none font-medium text-base"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">To</label>
                        <input
                          type="date"
                          value={applicationFormDateTo}
                          onChange={(e) => setApplicationFormDateTo(e.target.value)}
                          className="w-full p-2 border-2 border-gray-200 rounded-lg bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300 outline-none font-medium text-base"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Result Announcement */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FaAward className="text-purple-500 text-sm" />
                      Result Announcement
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3 bg-gray-50 p-3 rounded-xl">
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">From</label>
                        <input
                          type="date"
                          value={resultAnnounceDateFrom}
                          onChange={(e) => setResultAnnounceDateFrom(e.target.value)}
                          className="w-full p-2 border-2 border-gray-200 rounded-lg bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300 outline-none font-medium text-base"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">To</label>
                        <input
                          type="date"
                          value={resultAnnounceDateTo}
                          onChange={(e) => setResultAnnounceDateTo(e.target.value)}
                          className="w-full p-2 border-2 border-gray-200 rounded-lg bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 transition-all duration-300 outline-none font-medium text-base"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* YouTube Tutorial */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FaYoutube className="text-red-500 text-sm" />
                      YouTube Tutorial
                    </label>
                    <input
                      type="url"
                      value={youtubeLink}
                      onChange={(e) => setYoutubeLink(e.target.value)}
                      placeholder="https://youtube.com/..."
                      className="w-full p-3 border-2 border-gray-200 rounded-xl bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 outline-none placeholder-gray-400 font-medium text-base"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {/* Mock Test Link */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <FaBolt className="text-yellow-500 text-sm" />
                        Mock Test Link
                      </label>
                      <input
                        type="url"
                        value={mockTestLink}
                        onChange={(e) => setMockTestLink(e.target.value)}
                        placeholder="https://mocktest.com/..."
                        className="w-full p-3 border-2 border-gray-200 rounded-xl bg-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 outline-none placeholder-gray-400 font-medium text-base"
                      />
                    </div>

                    {/* Direct Apply Link */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <FaLink className="text-green-500 text-sm" />
                        Direct Apply Link
                      </label>
                      <input
                        type="url"
                        value={directApplyLink}
                        onChange={(e) => setDirectApplyLink(e.target.value)}
                        placeholder="https://apply.com/..."
                        className="w-full p-3 border-2 border-gray-200 rounded-xl bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 outline-none placeholder-gray-400 font-medium text-base"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Exam Content Section */}
            {activeSection === "content" && (
              <div className="space-y-4">
                {[
                  { label: "Exam Pattern", value: examPattern, setter: setExamPattern, icon: FaCheckSquare },
                  { label: "Application Process", value: applicationProcess, setter: setApplicationProcess, icon: FaFileAlt },
                  { label: "Preparation Tips", value: preparationTips, setter: setPreparationTips, icon: FaBook },
                  { label: "Result Information", value: result, setter: setResult, icon: FaAward }
                ].map((field) => (
                  <div key={field.label} className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <field.icon className="text-orange-500 text-sm" />
                      {field.label}
                    </label>
                    <div className="border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-orange-500">
                      <ReactQuill
                        theme="snow"
                        value={field.value}
                        onChange={field.setter}
                        modules={quillModules}
                        className="bg-white text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Media & Files Section */}
            {activeSection === "media" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { 
                      label: "Exam Logo", 
                      value: logoFile, 
                      onChange: handleLogoChange, 
                      icon: FaUpload,
                      required: true,
                      description: "PNG, JPG up to 5MB"
                    },
                    { 
                      label: "Previous Papers", 
                      value: previousPaperFile, 
                      onChange: handlePreviousPaperChange, 
                      icon: FaFilePdf,
                      required: false,
                      description: "PDF up to 10MB"
                    }
                  ].map((file) => (
                    <div key={file.label} className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <file.icon className="text-green-500 text-sm" />
                        {file.label}
                        {file.required && <span className="text-red-500">*</span>}
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-green-400 transition-all duration-300 cursor-pointer bg-gray-50">
                        <input
                          type="file"
                          onChange={file.onChange}
                          className="hidden"
                          id={`${file.label.toLowerCase().replace(' ', '-')}-upload`}
                          required={file.required}
                          accept={file.label === "Exam Logo" ? "image/*" : ".pdf"}
                        />
                        <label htmlFor={`${file.label.toLowerCase().replace(' ', '-')}-upload`} className="cursor-pointer">
                          <file.icon className="text-2xl text-gray-400 mx-auto mb-2" />
                          <div className="text-gray-600 font-medium text-sm mb-1">
                            {file.value ? file.value.name : `Upload ${file.label}`}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {file.description}
                          </div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={prevSection}
                disabled={isFirstSection}
                className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm order-2 sm:order-1"
              >
                <FaArrowLeft className="text-xs" />
                Previous
              </button>

              {!isLastSection ? (
                <button
                  type="button"
                  onClick={nextSection}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-sm order-1 sm:order-2 mb-3 sm:mb-0"
                >
                  Next
                  <FaArrowRight className="text-xs" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm order-1 sm:order-2 mb-3 sm:mb-0"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin text-xs" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <FaSave className="text-xs" />
                      Create Exam
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Prevent zoom on iOS for inputs */
        @media screen and (max-width: 768px) {
          input, select, textarea {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
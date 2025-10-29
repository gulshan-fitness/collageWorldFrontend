import React, { useContext, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Context } from "../../../../Context_holder";
import Select from "react-select";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import {
  FiEdit,
  FiUpload,
  FiBook,
  FiFileText,
  FiCalendar,
  FiGlobe,
  FiAward,
  FiYoutube,
  FiLink,
  FiZap,
  FiSave,
  FiImage,
  FiFile
} from "react-icons/fi";

export default function ExamEdit() {
  const {
    notify,
    course_fetch,
    course,
    token,
    current_exam,
    Examfetch,
  } = useContext(Context);

  const { id } = useParams();
  const Logo_ref = useRef();
  const paper_ref = useRef();

  const [examPattern, setExamPattern] = useState("");
  const [applicationProcess, setApplicationProcess] = useState("");
  const [preparationTips, setPreparationTips] = useState("");
  const [result, setResult] = useState("");
  const [Selectedmode, setSelectedmode] = useState("");
  const [SelectedCourse, setSelectedCourse] = useState(null);
  const [LogoValue, setLogoValue] = useState(null);
  const [PaperValue, setPapervalue] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  useEffect(() => {
    Examfetch(id);
    course_fetch();
  }, [id]);

  console.log(current_exam,"current_exam");
  
  useEffect(() => {
    if (current_exam) {
      setExamPattern(current_exam.ExamPattern || "");
      setApplicationProcess(current_exam.ApplicationProcess || "");
      setPreparationTips(current_exam.PreparationTips || "");
      setResult(current_exam.Result || "");
      setSelectedmode(current_exam.Mode || "");

      if (current_exam?.Course_id) {
        const matchedCourse = course?.find(
          (c) => c?._id === current_exam?.Course_id?._id
        );
        setSelectedCourse(
          matchedCourse
            ? { value: matchedCourse?._id, label: matchedCourse?.courseName }
            : null
        );
      }
    }
  }, [current_exam, course]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const Course_id = SelectedCourse?.value ?? null;
    const FullName = e.target.FullName.value ?? null;
    const ShortName = e.target.ShortName.value ?? null;
    const Mode = e.target.Mode.value ?? null;
    const year = e.target.year.value ?? null;
    const youtubeLink = e.target.youtubeLink.value ?? null;
    const directapplyLink = e.target.directapplyLink.value ?? null;
    const topExam = e.target.topExam.checked;

    const Application_FormDate = {
      from: e.target.Application_FormDate_from.value ?? null,
      to: e.target.Application_FormDate_to.value ?? null,
    };

    const Result_Announce_Date = {
      from: e.target.Result_Announce_Date_from.value ?? null,
      to: e.target.Result_Announce_Date_to.value ?? null,
    };

    const MockTestLink = e.target.MockTestLink.value ?? null;

    const formData = {
      Course_id,
      FullName,
      ShortName,
      Mode,
      year,
      topExam,
      youtubeLink,
      directapplyLink,
      ExamPattern: examPattern,
      ApplicationProcess: applicationProcess,
      PreparationTips: preparationTips,
      Result: result,
      Application_FormDate: JSON.stringify(Application_FormDate),
      Result_Announce_Date: JSON.stringify(Result_Announce_Date),
      MockTestLink
    };

console.log(formData,"formData");


    try {
      const success = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_EXAM_URL}edit/${id}`,
        formData,
        { headers: { Authorization: token } }
      );

      notify(success.data.msg, success.data.status);
      if (success.data.status === 1) {
        Examfetch(id);
      }
    } catch (error) {
      console.error(error);
      notify("Error updating exam", 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const image_update_handler = (value, old_value, ref, resetFn, filepath, objectKey) => {
    const id = current_exam?._id;
    if (!value || !id) return;

    const formData = new FormData();
    formData.append("image", value);
    formData.append("old_image", old_value);

    axios.patch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_EXAM_URL}ImageEdits/${id}/${filepath}/${objectKey}`, formData, {
      headers: { Authorization: token }
    })
    .then((success) => {
      notify(success.data.msg, success.data.status);
      if (success.data.status === 1) {
        Examfetch(id);
        ref.current.value = "";
        resetFn(null);
      }
    })
    .catch((err) => console.error(err));
  };

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toISOString().split("T")[0] : "";

  const InputField = ({ label, icon: Icon, children, required = false, className = "" }) => (
    <div className={`space-y-3 ${className}`}>
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
        <Icon className="text-blue-500 text-base" />
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex flex-col items-center gap-4 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-white/40">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
                <FiEdit className="text-xl text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Edit Exam
              </h1>
            </div>
            <p className="text-gray-600 text-sm sm:text-base">
              Update exam details and configuration
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8">
            
            {/* Basic Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Course Selection */}
              <InputField label="Course Selection" icon={FiBook} required>
                <Select
                  value={SelectedCourse}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      padding: '12px 14px',
                      border: state.isFocused ? '2px solid #3b82f6' : '2px solid #e2e8f0',
                      borderRadius: '12px',
                      backgroundColor: state.isFocused ? '#f8fafc' : '#ffffff',
                      boxShadow: state.isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : '0 2px 8px rgba(0, 0, 0, 0.06)',
                      transition: 'all 0.3s ease',
                      minHeight: '48px',
                      fontSize: '16px',
                    }),
                  }}
                  onChange={setSelectedCourse}
                  name="course_id"
                  options={course?.map((data) => ({
                    value: data._id,
                    label: data.courseName,
                  }))}
                />
              </InputField>

              {/* Exam Mode */}
              <InputField label="Exam Mode" icon={FiGlobe} required>
                <select
                  value={Selectedmode}
                  name="Mode"
                  onChange={(e) => setSelectedmode(e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none font-medium text-gray-700"
                  required
                >
                  <option value="online exam">Online Exam</option>
                  <option value="offline exam">Offline Exam</option>
                </select>
              </InputField>
            </div>

            {/* Exam Names Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <InputField label="Exam Full Name" icon={FiFileText} required>
                <input
                  type="text"
                  name="FullName"
                  defaultValue={current_exam?.FullName}
                  placeholder="Enter exam full name"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none placeholder-gray-400 font-medium"
                  required
                />
              </InputField>

              <InputField label="Exam Short Name" icon={FiFileText} required>
                <input
                  type="text"
                  name="ShortName"
                  defaultValue={current_exam?.ShortName}
                  placeholder="Enter exam short name"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none placeholder-gray-400 font-medium"
                  required
                />
              </InputField>
            </div>

            {/* Year and Featured Exam */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <InputField label="Year" icon={FiCalendar} required>
                <input
                  type="number"
                  name="year"
                  defaultValue={current_exam?.year}
                  placeholder="2024"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none placeholder-gray-400 font-medium"
                  required
                />
              </InputField>

              <InputField label="Featured Exam" icon={FiAward}>
                <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl bg-white hover:bg-gray-50 cursor-pointer transition-all duration-300 group">
                  <input
                    type="checkbox"
                    name="topExam"
                    defaultChecked={current_exam?.topExam === true}
                    className="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  />
                  <div className="flex-1">
                    <span className="text-gray-700 font-semibold block">
                      Mark as Featured
                    </span>
                    <span className="text-gray-500 text-sm block mt-1">
                      Show this exam in featured section
                    </span>
                  </div>
                </label>
              </InputField>
            </div>

            {/* Links Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <InputField label="YouTube Tutorial" icon={FiYoutube}>
                <input
                  type="url"
                  name="youtubeLink"
                  defaultValue={current_exam?.youtubeLink}
                  placeholder="https://youtube.com/..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none placeholder-gray-400 font-medium"
                />
              </InputField>

              <InputField label="Mock Test Link" icon={FiZap}>
                <input
                  type="url"
                  name="MockTestLink"
                  defaultValue={current_exam?.MockTestLink}

                  placeholder="https://mocktest.com/..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none placeholder-gray-400 font-medium"
                />
              </InputField>

              <InputField label="Direct Apply Link" icon={FiLink}>
                <input
                  type="url"
                  name="directapplyLink"
                  defaultValue={current_exam?.directapplyLink}
                  placeholder="https://apply.com/..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none placeholder-gray-400 font-medium"
                />
              </InputField>
            </div>

            {/* Date Ranges */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <InputField label="Application Period" icon={FiCalendar} required>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">From</label>
                    <input
                      type="date"
                      name="Application_FormDate_from"
                      defaultValue={formatDate(current_exam?.Application_FormDate?.from)}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 outline-none font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">To</label>
                    <input
                      type="date"
                      name="Application_FormDate_to"
                      defaultValue={formatDate(current_exam?.Application_FormDate?.to)}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 outline-none font-medium"
                      required
                    />
                  </div>
                </div>
              </InputField>

              <InputField label="Result Announcement" icon={FiAward} required>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">From</label>
                    <input
                      type="date"
                      name="Result_Announce_Date_from"
                      defaultValue={formatDate(current_exam?.Result_Announce_Date?.from)}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 outline-none font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">To</label>
                    <input
                      type="date"
                      name="Result_Announce_Date_to"
                      defaultValue={formatDate(current_exam?.Result_Announce_Date?.to)}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 outline-none font-medium"
                      required
                    />
                  </div>
                </div>
              </InputField>
            </div>

            {/* Rich Text Editors */}
            <div className="space-y-6 mb-8">
              <InputField label="Exam Pattern" icon={FiFileText}>
                <div className="border-2 border-gray-200 rounded-xl overflow-hidden transition-all duration-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                  <ReactQuill
                    theme="snow"
                    value={examPattern}
                    onChange={setExamPattern}
                    modules={quillModules}
                    className="bg-white rounded-xl"
                  />
                </div>
              </InputField>

              <InputField label="Application Process" icon={FiFileText}>
                <div className="border-2 border-gray-200 rounded-xl overflow-hidden transition-all duration-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                  <ReactQuill
                    theme="snow"
                    value={applicationProcess}
                    onChange={setApplicationProcess}
                    modules={quillModules}
                    className="bg-white"
                  />
                </div>
              </InputField>

              <InputField label="Preparation Tips" icon={FiBook}>
                <div className="border-2 border-gray-200 rounded-xl overflow-hidden transition-all duration-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                  <ReactQuill
                    theme="snow"
                    value={preparationTips}
                    onChange={setPreparationTips}
                    modules={quillModules}
                    className="bg-white"
                  />
                </div>
              </InputField>

              <InputField label="Result Information" icon={FiAward}>
                <div className="border-2 border-gray-200 rounded-xl overflow-hidden transition-all duration-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                  <ReactQuill
                    theme="snow"
                    value={result}
                    onChange={setResult}
                    modules={quillModules}
                    className="bg-white"
                  />
                </div>
              </InputField>
            </div>

        
            {/* Submit Button */}
            <div className="flex justify-center pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 min-w-[200px]"
              >
                <FiSave className="text-lg" />
                <span>{isSubmitting ? "Updating..." : "Update Exam"}</span>
              </button>
            </div>
          </form>

              {/* File Uploads */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 px-3">
              <InputField label="Exam Logo" icon={FiImage}>
                <div className="space-y-4">
                  <input
                    ref={Logo_ref}
                    type="file"
                    onChange={(e) => setLogoValue(e.target.files[0])}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all duration-200"
                  />
                  <button
                    type="button"
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${LogoValue ? "block" : "hidden"}`}
                    onClick={() =>
                      image_update_handler(
                        LogoValue,
                        current_exam?.logo,
                        Logo_ref,
                        setLogoValue,
                        "exam_image",
                        "logo"
                      )
                    }
                  >
                    <FiUpload className="text-sm" />
                    <span>Update Logo</span>
                  </button>
                </div>
              </InputField>

              <InputField label="Previous Papers" icon={FiFile}>
                <div className="space-y-4">
                  <input
                    ref={paper_ref}
                    type="file"
                    onChange={(e) => setPapervalue(e.target.files[0])}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all duration-200"
                  />
                  <button
                    type="button"
                    className={`w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${PaperValue ? "block" : "hidden"}`}
                    onClick={() =>
                      image_update_handler(
                        PaperValue,
                        current_exam?.PreviousPapper,
                        paper_ref,
                        setPapervalue,
                        "exam_PreviousPapper",
                        "PreviousPapper"
                      )
                    }
                  >
                    <FiUpload className="text-sm" />
                    <span>Update PDF</span>
                  </button>
                </div>
              </InputField>
            </div>

        </div>
      </div>
    </div>
  );
}
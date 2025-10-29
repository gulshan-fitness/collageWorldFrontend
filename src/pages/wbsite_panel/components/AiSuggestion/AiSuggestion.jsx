import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../../Context_holder";
import Select from "react-select";
import { Link, useSearchParams } from "react-router-dom";
import { 
  FaBrain, 
  FaGraduationCap, 
  FaUniversity, 
  FaMoneyBillWave, 
  FaClock, 
  FaMapMarkerAlt,
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaRocket
} from "react-icons/fa";

const cities = require("../../../../Json_files/Cities.json");
const states = require("../../../../Json_files/States.json");

export default function AiSuggestiona() {
  const {
    stream_fetch,
    stream,
    stream_name,
    setstream_name,
    college_type,
    setcollege_type,
    college_state,
    setcollege_state,
    selectedFeesRange,
    setselectedFeesRange,
    college_city,
    setcollege_city,
    course_time,
    setcourse_time,
    duration,
    setduration,
    search_cities,
    setsearch_cities,
    setcourse_name,
    course_name,
    course_fetch,
    course,
    search_query_clear,
    setCourseName
  } = useContext(Context);

  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [StreamId, setStreamId] = useState("");
  const [, setSearchParams] = useSearchParams();

  const TypesOfcolleges = ["Private", "Government"];

  const ranges = [
    { label: "Up to ₹1 Lakh", range: { max: 100000, min: 0 } },
    { label: "₹1-2 Lakh", range: { max: 200000, min: 100000 } },
    { label: "₹2-3 Lakh", range: { max: 300000, min: 200000 } },
    { label: "₹3-4 Lakh", range: { max: 400000, min: 300000 } },
    { label: "₹4-7 Lakh", range: { max: 700000, min: 400000 } },
    { label: "Above ₹7 Lakh", range: { max: 10000000, min: 700000 } },
  ];

  const courseDurations = [
    { label: "Up to 1 Year", years: 1 },
    { label: "2 Years", years: 2 },
    { label: "3 Years", years: 3 },
    { label: "4 Years", years: 4 },
    { label: "5 Years", years: 5 },
    { label: "Above 5 Years", years: 6 },
  ];

  const studyModes = ["Full Time", "Part Time", "Distance"];

  // ✅ Fetch streams on mount
  useEffect(() => {
    stream_fetch();
  }, []);

  // ✅ Fetch courses when stream is selected
  useEffect(() => {
    if (StreamId) {
      const query = { stream: StreamId };
      setSearchParams(query);
      course_fetch(null, window.location.search);
    }
  }, [StreamId]);

  // ✅ Update cities when state changes
  useEffect(() => {
    if (college_state) {
      const search_city = cities.filter(
        (data) => data.state === college_state?.value
      );
      setsearch_cities(search_city);
    } else {
      setsearch_cities([]);
    }
  }, [college_state]);

  // PRESERVING ALL COMMENTED BACKEND CODE - DO NOT REMOVE
  //  useEffect(() => {
  
  
  //     const query = {};
  //     const filters = [];
  
  
  //     if (course_name !== "") {
  //       localStorage.setItem("course_name", course_name);
  //     setCourseName(course_name)
  //     }
  
  //     if (course_time !== "") {
  //       localStorage.setItem("course_time", course_time);
  //       setcourse_name(course_time)
  //     }
  
  //     if (stream_name !== "") {
  //       localStorage.setItem("stream_name", stream_name);
  //       setstream_name(stream_name)
  //     }

  
  //     // if (college_name !== "") {
  //     //   localStorage.setItem("college_name", college_name);
  //     //   query.college_name = college_name;
  //     //   filters.push({
  //     //     label: "college",
  //     //     state: setcollege_name,
  //     //     local_storage: { name: "college_name" },
  //     //     value: college_name,
  //     //   });
  //     // }


  
  //     if (college_state !== "") {
  //       localStorage.setItem("college_state", JSON.stringify(college_state));
  //       setcollege_state(college_state)  
  //     }
  
  //     if (college_city !== "") {
  //       localStorage.setItem("college_city", JSON.stringify(college_city));
  // setcollege_city(college_city)  
  //     }
  
  //     if (college_type!=""){

  //       localStorage.setItem("college_type", college_type);
  //       setcollege_type(college_type)
    
  //     }
  
  //     if (duration != null){

  //       localStorage.setItem("duration", duration)
  //       setduration(duration)
        
  //     }
  
  //     if (selectedFeesRange?.max != null||selectedFeesRange?.min != null){
  //       localStorage.setItem("max_fees", selectedFeesRange?.max);
  //       localStorage.setItem("min_fees", selectedFeesRange?.min);
  //       setselectedFeesRange({ max: selectedFeesRange?.max, min:  selectedFeesRange?.min })
        
  //     }
  
  //     // if (specialisation !== "") {
  //     //   localStorage.setItem("specialisation", specialisation);
  //     //   query.specialisation = specialisation;
  //     //   filters.push({
  //     //     label: "Specialisation",
  //     //     state: setspecialisation,
  //     //     local_storage: { name: "specialisation" },
  //     //     value: specialisation,
  //     //   });
  //     // }
  
  
  //     setCourseName(course_name);
     
      
  
  //   }, [
  //     course_name,
  //     course_time,
  //     stream_name,
      
  //     college_state,
  //     college_city,
  //     college_type,
  //     duration,
      
  //     selectedFeesRange,
  //   ]);


    // console.log( course_name,
    //   course_time,
    //   stream_name,
      
    //   college_state,
    //   college_city,
    //   college_type,
    //   duration,
      
    //   selectedFeesRange,);
    
  // ✅ Step validation - KEEPING EXACT SAME LOGIC
  const isStepValid = () => {
    switch (step) {
      case 0:
        return !!stream_name;
      case 1:
        return !!course_name;
      case 2:
        return !!college_type;
      case 3:
        return !!selectedFeesRange?.min;
      case 4:
        return !!duration;
      case 5:
        return !!course_time;
      case 6:
        return !!college_state;
      case 7:
        return !!college_city;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid()) {
      setError("");
      setStep(step + 1);
    } else {
      setError(`Please select "${steps[step].title}" before proceeding.`);
    }
  };

  // Custom Select styles for modern UI
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      padding: '0.25rem',
      fontSize: '0.875rem',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#3b82f6',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: '0.875rem',
      backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#eff6ff' : 'white',
      color: state.isSelected ? 'white' : '#374151',
    }),
  };

  // ✅ Steps definition - KEEPING ALL BACKEND LOGIC INTACT
  const steps = [
    {
      title: "Choose Your Stream",
      icon: <FaGraduationCap className="text-blue-600" />,
      content: (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {stream?.map((data) => (
            <div
              key={data._id}
              onClick={() => {
                setstream_name(data?.stream_name);
                setStreamId(data?._id);
              }}
              className={`cursor-pointer rounded-lg border p-3 flex flex-col items-center shadow-sm hover:shadow-md transition-all duration-200 
              ${
                stream_name === data.stream_name
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <img
                src={`${process.env.REACT_APP_API_IMAGE_URL}stream_image/${data?.image}`}
                alt={data.stream_name}
                className="w-12 h-12 object-contain mb-2"
              />
              <span className="text-sm font-medium text-center text-gray-800">
                {data.stream_name}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Select Your Course",
      icon: <FaUniversity className="text-green-600" />,
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {course?.map((courseItem) => (
            <div
              key={courseItem?._id}
              onClick={() => setcourse_name(courseItem?.courseName)}
              className={`cursor-pointer rounded-lg border p-3 flex flex-col items-center shadow-sm hover:shadow-md transition-all duration-200 
              ${
                course_name === courseItem?.courseName
                  ? "border-green-500 bg-green-50 shadow-md"
                  : "border-gray-200 hover:border-green-300"
              }`}
            >
              <img
                src={`${process.env.REACT_APP_API_IMAGE_URL}course_image/${courseItem.course_image}`}
                alt={courseItem.courseName}
                className="w-12 h-12 object-contain mb-2"
              />
              <span className="text-sm font-medium text-center text-gray-800">
                {courseItem.courseName}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "College Type",
      icon: <FaUniversity className="text-purple-600" />,
      content: (
        <div className="space-y-2">
          {TypesOfcolleges.map((data) => (
            <label
              key={data}
              className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg border transition-all duration-200 ${
                college_type === data
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200 hover:border-purple-300 hover:bg-purple-25"
              }`}
            >
              <input
                type="radio"
                name="collegeType"
                checked={college_type === data}
                onChange={() => setcollege_type(data)}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-800">{data}</span>
            </label>
          ))}
        </div>
      ),
    },
    {
      title: "Budget Range",
      icon: <FaMoneyBillWave className="text-orange-600" />,
      content: (
        <div className="space-y-2">
          {ranges.map((data) => (
            <label
              key={data.label}
              className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg border transition-all duration-200 ${
                selectedFeesRange?.min === data.range.min
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-200 hover:border-orange-300 hover:bg-orange-25"
              }`}
            >
              <input
                type="radio"
                name="fees"
                checked={selectedFeesRange?.min === data.range.min}
                onChange={() => setselectedFeesRange(data.range)}
                className="text-orange-600 focus:ring-orange-500"
              />
              <span className="text-sm font-medium text-gray-800">{data.label}</span>
            </label>
          ))}
        </div>
      ),
    },
    {
      title: "Course Duration",
      icon: <FaClock className="text-indigo-600" />,
      content: (
        <div className="space-y-2">
          {courseDurations.map((data) => (
            <label
              key={data.label}
              className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg border transition-all duration-200 ${
                duration === data.years
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-25"
              }`}
            >
              <input
                type="radio"
                name="duration"
                checked={duration === data.years}
                onChange={() => setduration(data.years)}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-gray-800">{data.label}</span>
            </label>
          ))}
        </div>
      ),
    },
    {
      title: "Study Mode",
      icon: <FaGraduationCap className="text-teal-600" />,
      content: (
        <div className="space-y-2">
          {studyModes.map((data) => (
            <label
              key={data}
              className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg border transition-all duration-200 ${
                course_time === data
                  ? "border-teal-500 bg-teal-50"
                  : "border-gray-200 hover:border-teal-300 hover:bg-teal-25"
              }`}
            >
              <input
                type="radio"
                name="studyMode"
                checked={course_time === data}
                onChange={() => setcourse_time(data)}
                className="text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm font-medium text-gray-800">{data}</span>
            </label>
          ))}
        </div>
      ),
    },
    {
      title: "Select State",
      icon: <FaMapMarkerAlt className="text-red-600" />,
      content: (
        <div>
          <Select
            value={college_state}
            onChange={(e) => setcollege_state(e)}
            name="states"
            placeholder="Choose your preferred state..."
            styles={customSelectStyles}
            options={states.map((data) => ({
              value: data.name,
              label: data.name,
            }))}
          />
        </div>
      ),
    },
    {
      title: "Select City",
      icon: <FaMapMarkerAlt className="text-pink-600" />,
      content: (
        <div>
          <Select
            value={college_city}
            onChange={(e) => setcollege_city(e)}
            name="cities"
            placeholder="Choose your preferred city..."
            styles={customSelectStyles}
            options={search_cities.map((data) => ({
              value: data.name,
              label: data.name,
            }))}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-6 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-3 shadow-lg">
            <FaBrain className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            AI College Suggestion
          </h1>
          <p className="text-xs md:text-sm text-gray-600">
            Let our AI help you find the perfect college based on your preferences
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-600">Progress</span>
            <span className="text-xs font-medium text-blue-600">
              {step + 1} of {steps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Step Header */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {steps[step].icon}
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  {steps[step].title}
                </h2>
                <p className="text-xs text-gray-600">
                  Step {step + 1} of {steps.length}
                </p>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="p-4">
            <div className="mb-4">
              {steps[step].content}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700 flex items-center gap-2">
                  <span className="text-red-500">⚠</span>
                  {error}
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <button
                disabled={step === 0}
                onClick={() => {
                  setError("");
                  setStep(step - 1);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  step === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-600 text-white hover:bg-gray-700 shadow-sm hover:shadow-md"
                }`}
              >
                <FaArrowLeft className="text-xs" />
                Back
              </button>

              {step < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Next
                  <FaArrowRight className="text-xs" />
                </button>
              ) : (
                <Link
                  to="/allUniversity"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <FaRocket className="text-xs" />
                  Find Colleges
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Summary Card */}
        {step > 0 && (
          <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FaCheck className="text-green-500 text-xs" />
              Your Selections
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {stream_name && (
                <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
                  Stream: {stream_name}
                </div>
              )}
              {course_name && (
                <div className="bg-green-50 text-green-700 px-2 py-1 rounded">
                  Course: {course_name}
                </div>
              )}
              {college_type && (
                <div className="bg-purple-50 text-purple-700 px-2 py-1 rounded">
                  Type: {college_type}
                </div>
              )}
              {selectedFeesRange && (
                <div className="bg-orange-50 text-orange-700 px-2 py-1 rounded">
                  Budget: ₹{selectedFeesRange.min/100000}L-{selectedFeesRange.max/100000}L
                </div>
              )}
              {duration && (
                <div className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded">
                  Duration: {duration} Years
                </div>
              )}
              {course_time && (
                <div className="bg-teal-50 text-teal-700 px-2 py-1 rounded">
                  Mode: {course_time}
                </div>
              )}
              {college_state?.value && (
                <div className="bg-red-50 text-red-700 px-2 py-1 rounded">
                  State: {college_state.value}
                </div>
              )}
              {college_city?.value && (
                <div className="bg-pink-50 text-pink-700 px-2 py-1 rounded">
                  City: {college_city.value}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

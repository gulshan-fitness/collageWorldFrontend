import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ReactStarsRating from "react-awesome-stars-rating";
import { FaDownload, FaFilter, FaMapMarkerAlt, FaGraduationCap, FaSearch, FaTimes } from "react-icons/fa";
import { Context } from "../../../../../Context_holder";
import Dropdown from "../../DropDown/DropDown";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { 
  AcademicCapIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  StarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import Loader from "../../Loader";

function AllUniversity() {
  const {
    college_fetch,
    colleges,
    setstream_name,
    setcourse_name,
    course_name,
    college_name,
    setcollege_name,
    stream_name,
    college_type,
    setcollege_type,
    college_state,
    setcollege_state,
    college_city,
    setcollege_city,
    course_time,
    setcourse_time,
    duration,
    setduration,
    selectedFeesRange,
    setselectedFeesRange,
    specialisation,
    setspecialisation,
    collegeName,
    setCollegeName,
    courseName,
    setCourseName,
    setsearchbar,
    rounded_rating,
    ScrollComponent,
    setapply_popUpIsOpen,
    user,
    setuserSignUp_popup,
    filterHeading
  } = useContext(Context);

  const navigater = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [enableFilters, setEnableFilters] = useState([]);
  const [collegesDisplayed, setCollegesDisplayed] = useState(6);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [Loadershow, setLoadershow] = useState(false);
   const [ActiveLoaderIndex, setActiveLoaderIndex] = useState("");

  const enquiry_api = (id) => {
    if (user) {
      const data={college:id}
      setLoadershow(true)
      axios
        .patch(
          process.env.REACT_APP_API_BASE_URL +
            process.env.REACT_APP_USER_URL +
            "college_edit/" +
            user?._id ,data
            
        )
        .then((success) => {
          if (success.data.status === 1) {
            setapply_popUpIsOpen(true);
             setLoadershow(false)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setuserSignUp_popup(true);
    }
  };

  useEffect(() => {
    const query = {};
    const filters = [];

    if (course_name !== "") {
      localStorage.setItem("course_name", course_name);
      query.course_name = course_name;
      filters.push({
        label: "Course ",
        state: setcourse_name,
        local_storage: { name: "course_name" },
        value: course_name,
      });
    }

    if (course_time !== "") {
      localStorage.setItem("course_time", course_time);
      query.course_time = course_time;
      filters.push({
        label: "Course Type",
        state: setcourse_time,
        local_storage: { name: "course_time" },
        value: course_time,
      });
    }

    if (stream_name !== "") {
      localStorage.setItem("stream_name", stream_name);
      query.stream_name = stream_name;
      filters.push({
        label: "stream",
        state: setstream_name,
        local_storage: { name: "stream_name" },
        value: stream_name,
      });
    }

    if (college_name !== "") {
      localStorage.setItem("college_name", college_name);
      query.college_name = college_name;
      filters.push({
        label: "college",
        state: setcollege_name,
        local_storage: { name: "college_name" },
        value: college_name,
      });
    }

    if (college_state !== "") {
      localStorage.setItem("college_state", JSON.stringify(college_state));
      query.college_state = college_state.value;
      filters.push({
        label: "state",
        state: setcollege_state,
        local_storage: { name: "college_state" },
        value: college_state?.value,
      });
    }

    if (college_city !== "") {
      localStorage.setItem("college_city", JSON.stringify(college_city));
      query.college_city = college_city.value;
      filters.push({
        label: "city",
        state: setcollege_city,
        local_storage: { name: "college_city" },
        value: college_city.value,
      });
    }

    if (college_type != "") {
      localStorage.setItem("college_type", college_type);
      query.college_type = college_type;
      filters.push({
        label: "college type",
        state: setcollege_type,
        local_storage: { name: "college_type" },
        value: college_type,
      });
    }

    if (duration != null) {
      localStorage.setItem("duration", duration);
      query.duration = duration;
      filters.push({
        label: "duration",
        state: setduration,
        local_storage: { name: "duration" },
        value: duration,
      });
    }

    if (selectedFeesRange?.max != null || selectedFeesRange?.min != null) {
      localStorage.setItem("max_fees", selectedFeesRange?.max);
      localStorage.setItem("min_fees", selectedFeesRange?.min);
      query.min_fees = selectedFeesRange?.min;
      query.max_fees = selectedFeesRange?.max;
      filters.push({
        label: "Fees",
        state: setselectedFeesRange,
        local_storage: {
          name: "",
          subname: { first: "max_fees", second: "min_fees" },
        },
        value: `${selectedFeesRange?.min} - ${selectedFeesRange?.max}`,
      });
    }

    console.log(college_state,"college_state");
    
    setCourseName(course_name);
    setCollegeName(college_name);
    setSearchParams(query);
    setEnableFilters(filters);
    ScrollComponent();
  }, [
    course_name,
    course_time,
    stream_name,
    college_name,
    college_state,
    college_city,
    college_type,
    duration,
    specialisation,
    selectedFeesRange,
  ]);

  useEffect(() => {

    college_fetch(null, window.location.search.toString());

  }, [searchParams]);

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prev) => !prev);
  };

  const handleSearch = () => {
    setcollege_name(collegeName);
    setcourse_name(courseName);
    navigater("/allUniversity");
    setsearchbar(false);
  };

  const loadMoreColleges = () => {
    setCollegesDisplayed((prevCount) => prevCount + 6);
  };

  const filters_remove_Handler = (data) => {
    if (data.label == "duration") {
      localStorage.removeItem(data.local_storage.name);
      data.state(null);
      setEnableFilters(
        enableFilters?.filter((filters) => {
          if (filters.label != data.label) {
            return true;
          } else {
            return false;
          }
        })
      );
    } else if (data.local_storage.name != "") {
      localStorage.removeItem(data.local_storage.name);
      data.state("");
      setEnableFilters(
        enableFilters?.filter((filters) => {
          if (filters.label != data.label) {
            return true;
          } else {
            return false;
          }
        })
      );
    } else {
      localStorage.removeItem(data.local_storage.subname.first);
      localStorage.removeItem(data.local_storage.subname.second);
      data.state("");
      setEnableFilters(
        enableFilters?.filter((filters) => {
          if (filters.label != data.label) {
            return true;
          } else {
            return false;
          }
        })
      );
    }
  };


  const downloadFile = (fileUrl) => {
    if (!fileUrl) return;

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop();
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };




  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-slate-100 to-blue-50" id="page_on_the_top">
      
      {/* Futuristic Header Section */}
      <div className="bg-white/80 backdrop-blur-xl shadow-xl border-b border-gray-200/50">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
          
          {/* Compact Page Title */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="flex items-center justify-center mb-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mr-3 shadow-lg">
                <SparklesIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                  Discover Premium Colleges
                </h1>
                <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-1"></div>
              </div>
            </div>
            
            {/* Compact Dynamic Heading */}
            <div className="text-xs sm:text-sm text-gray-600">
              {college_city && filterHeading ? (
                <span className="font-medium text-blue-600">
                  {filterHeading} ({college_city.value})
                </span>
              ) : course_name && filterHeading ? (
                <span className="font-medium text-blue-600">
                  {filterHeading} ({course_name})
                </span>
              ) : (
                <span>Find your perfect educational destination</span>
              )}
            </div>
          </div>

          {/* Compact Search Section */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-3 sm:p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                
                {/* College Name Input */}
                <div className="relative">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    College
                  </label>
                  <div className="relative">
                    <BuildingOfficeIcon className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                    <input
                      type="text"
                      defaultValue={college_name}
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      placeholder="College name"
                      className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 bg-white/80"
                    />
                  </div>
                </div>

                {/* Course Name Input */}
                <div className="relative">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Course
                  </label>
                  <div className="relative">
                    <AcademicCapIcon className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                    <input
                      type="text"
                      defaultValue={course_name}
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                      placeholder="Course name"
                      className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 bg-white/80"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <button
                    onClick={handleSearch}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center"
                  >
                    <MagnifyingGlassIcon className="h-3.5 w-3.5 mr-1.5" />
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Active Filters */}
      {enableFilters.length > 0 && (
        <div className="bg-white/70 backdrop-blur-sm border-b border-gray-200/50">
          <div className="container mx-auto px-3 sm:px-4 py-2">
            <div className="flex items-center gap-1.5 mb-1">
              <FunnelIcon className="h-3.5 w-3.5 text-gray-600" />
              <span className="text-xs font-medium text-gray-700">Filters:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {enableFilters?.map((data, index) => (
                <div key={index} className="inline-flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs border border-blue-200/50">
                  <span className="font-medium mr-1">{data?.label}:</span>
                  <span className="capitalize truncate max-w-20">{data?.value}</span>
                  <button 
                    onClick={() => filters_remove_Handler(data)}
                    className="ml-1 hover:bg-blue-100 rounded-full p-0.5 transition-colors duration-200"
                  >
                    <FaTimes className="h-2.5 w-2.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          
          {/* Compact Filter Sidebar */}
          <div className="lg:w-80 xl:w-72">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 overflow-hidden sticky top-4">
              
              {/* Filter Header */}
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 cursor-pointer lg:cursor-default"
                onClick={toggleFilterVisibility}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FunnelIcon className="h-4 w-4 mr-2" />
                    <h2 className="text-sm font-bold">Filters</h2>
                  </div>
                  <div className="lg:hidden">
                    {isFilterVisible ? (
                      <ChevronUpIcon className="h-4 w-4" />
                    ) : (
                      <ChevronDownIcon className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* Filter Content */}
              <div className={`${isFilterVisible ? 'block' : 'hidden lg:block'}`}>
                
                {/* Results Count */}
                <div className="bg-gray-50/80 px-3 py-2 border-b border-gray-200/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-700">Results</span>
                    <span className="bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                      {colleges?.college?.length || 0}
                    </span>
                  </div>
                </div>

                {/* Filter Options */}
                <div className="p-3">
                  <div className="max-h-80 overflow-y-auto">
                    <Dropdown />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Colleges Grid */}
          <div className="flex-1">
            
            {/* Results Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                {colleges?.length > 0 ? `${colleges.length} Colleges` : 'No Results'}
              </h3>
              <div className="lg:hidden">
                <button
                  onClick={toggleFilterVisibility}
                  className="flex items-center bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm"
                >
                  <FaFilter className="mr-1.5 h-3 w-3" />
                  Filters
                </button>
              </div>
            </div>

            {/* Colleges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              {colleges?.slice(0, collegesDisplayed)?.map((data, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50 hover:border-blue-300/50 transform hover:-translate-y-1 group">
                  
                  {/* College Image */}
                  <div className="relative">
                    <Link to={`/university-page/${data?._id}`}>
                      <img
                        src={`${process.env.REACT_APP_API_BASE_URL}image/college_logo/${data?.university_banner[0]}`}

                        className="w-full h-32 sm:h-36 object-cover group-hover:scale-105 transition-transform duration-300"

                        alt={`${data?.college_name} Banner`}

                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300x150/f3f4f6/6b7280?text=College";
                        }}

                      />
                    </Link>
                    
                    {/* Rating Badge */}
                    <div className="absolute top-2 right-2">
                      <div className="bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 shadow-md">
                        <div className="flex items-center">
                          <StarSolidIcon className="h-3 w-3 text-yellow-500 mr-1" />
                          <span className="text-xs font-bold text-gray-900">
                            {rounded_rating(data?.avgCollegeRating) || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* College Details */}
                  <div className="p-3 sm:p-4">
                    
                    {/* College Name */}
                    <Link to={`/university-page/${data?._id}`}>
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors duration-200 line-clamp-2 leading-tight">
                        {data?.college_name}
                      </h3>
                    </Link>

                    {/* Rating Section */}
                    <div className="flex items-center mb-3">
                      <ReactStarsRating
                        isEdit={false}
                        value={rounded_rating(data?.avgCollegeRating) ?? 0}
                        className="flex items-center"
                        size={12}
                      />
                      <span className="ml-1.5 text-xs text-gray-600">
                        ({rounded_rating(data?.avgCollegeRating) || 0})
                      </span>
                    </div>

                    {/* College Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs text-gray-600">
                        <AcademicCapIcon className="h-3 w-3 mr-1.5 text-blue-500 flex-shrink-0" />
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium truncate">
                          {data?.affiliatedTo}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-600">
                        <MapPinIcon className="h-3 w-3 mr-1.5 text-green-500 flex-shrink-0" />
                        <span className="truncate">{data?.city}, {data?.state}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <Link 
                        to={`/university-page/${data?._id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium text-xs flex items-center transition-colors duration-200"
                      >
                        Details
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>

                      <div className="flex items-center gap-2">
                        <button className="flex items-center text-green-600 hover:text-green-700 text-xs font-medium transition-colors duration-200" onClick={()=> downloadFile(`${process.env.REACT_APP_API_BASE_URL}college_pdf/${data?.pdf}`)}>

                          <FaDownload className="mr-1 h-2.5 w-2.5" />
                          PDF
                        </button>
                      {
 Loadershow && ActiveLoaderIndex==index ?(<Loader color={"border-[blue]"}/>):(<button
                          onClick={() => {enquiry_api(data?._id)
                            setActiveLoaderIndex(index)
                          }}
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-3 py-1.5 rounded-lg font-medium text-xs transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                        >
                          Apply
                        </button>)
                      }  
                        
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {collegesDisplayed < colleges.length && (
              <div className="text-center mt-6">
                <button
                  onClick={loadMoreColleges}
                  className="bg-white/90 backdrop-blur-sm hover:bg-white text-blue-600 border border-blue-300 hover:border-blue-400 px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Load More ({colleges.length - collegesDisplayed} remaining)
                </button>
              </div>
            )}

            {/* No Results Message */}
            {colleges?.length === 0 && (
              <div className="text-center py-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 max-w-sm mx-auto">
                  <AcademicCapIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">No Colleges Found</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Try adjusting your search criteria.
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllUniversity;
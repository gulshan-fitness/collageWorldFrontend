

import React, { useState, useEffect, useContext } from "react";
import useCollegeData from "../dropdowndata/useCollegeData";
import Dropdown from "../DropDown/DropDown"; // Assuming you have a Dropdown component
import Select from "react-select";
import { Context } from "../../../../Context_holder";

const DropdownTask = () => {
  
  const { collegeData, locationData, handleStateChange, handleCityChange } =useCollegeData();
  
  

  // Separate state for each dropdown

  const [selectedCollegeTypes, setSelectedCollegeTypes] = useState("");
  const [selectedCourseTypes, setSelectedCourseTypes] = useState("");
  const [selectedCourseFees, setSelectedCourseFees] = useState(""); // Storing fee ranges
  const [selectedCourseDurations, setSelectedCourseDurations] = useState(null);
  const [selectedStudyTypes, setSelectedStudyTypes] = useState("");

  // Separate state for fee range
  const [minFee, setMinFee] = useState([]);
  const [maxFee, setMaxFee] = useState([]);

  


  const [searchTerm, setSearchTerm] = useState("");

  // Manage dropdown open/close state
  const [openDropdowns, setOpenDropdowns] = useState({});

  useEffect(() => {
    // Automatically open dropdowns based on selected options
    const newDropdowns = {};
    if (selectedCollegeTypes.length > 0) newDropdowns["collegeTypes"] = true;
    if (selectedCourseTypes.length > 0) newDropdowns["courseTypes"] = true;
    if (selectedCourseFees.length > 0) newDropdowns["courseFees"] = true;
    if (selectedCourseDurations.length > 0)
      newDropdowns["courseDurations"] = true;
    if (selectedStudyTypes.length > 0) newDropdowns["studyTypes"] = true;

    // Open the first dropdown if no options are selected
    if (Object.keys(newDropdowns).length === 0) {
      newDropdowns[Object.keys(collegeData)[0]] = true; // Open the first dropdown by default
    }

    setOpenDropdowns(newDropdowns);
  }, [
    selectedCollegeTypes,
    selectedCourseTypes,
    selectedCourseFees,
    selectedCourseDurations,
    selectedStudyTypes,
    collegeData,
  ]);

  // Handle checkbox changes for selected options
  const handleCheckboxChange = (category, option) => {
    if (category === "courseFees") {
      // Assuming option is in the format "minFee - maxFee"
      const [min, max] = option.split(" - ").map(Number);
      setMinFee(min);
      setMaxFee(max);
      setSelectedCourseFees([option]); // Update selected course fees state
      console.log("Selected Fee Range:", option);
    } else {
      let updatedOptions = [];
      switch (category) {
        case "collegeTypes":
          updatedOptions = selectedCollegeTypes.includes(option)
            ? selectedCollegeTypes.filter((item) => item !== option)
            : [option];
          setSelectedCollegeTypes(updatedOptions);
          break;
        case "courseTypes":
          updatedOptions = selectedCourseTypes.includes(option)
            ? selectedCourseTypes.filter((item) => item !== option)
            : [option];
          setSelectedCourseTypes(updatedOptions);
          break;
        case "courseDurations":
          updatedOptions = selectedCourseDurations.includes(option)
            ? selectedCourseDurations.filter((item) => item !== option)
            : [option];
          setSelectedCourseDurations(updatedOptions);
          break;
        case "studyTypes":
          updatedOptions = selectedStudyTypes.includes(option)
            ? selectedStudyTypes.filter((item) => item !== option)
            : [option];
          setSelectedStudyTypes(updatedOptions);
          break;
        default:
          break;
      }
      console.log("Selected Options for", category, ":", updatedOptions);
    }
  };

  // Toggle the open/close state of a specific dropdown
  const toggleDropdown = (category, event) => {
    event.preventDefault();
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  // Handle state change
  const handleStateSelection = (selectedOption) => {
    handleStateChange(selectedOption);
    console.log("Selected State:", selectedOption); // Print selected state to console
  };

  // Handle city change
  const handleCitySelection = (selectedOption) => {
    handleCityChange(selectedOption);
    console.log("Selected City:", selectedOption); // Print selected city to console
  };

  return (
    <div className="">
      {Object.keys(collegeData).map((category) => (
        <Dropdown
          key={category}
          options={collegeData[category]}
          label={`Select ${category}`}
          selectedOptions={
            category === "collegeTypes"
              ? selectedCollegeTypes
              : category === "courseTypes"
              ? selectedCourseTypes
              : category === "courseFees"
              ? selectedCourseFees
              : category === "courseDurations"
              ? selectedCourseDurations
              : selectedStudyTypes
          }
          handleCheckboxChange={(option) =>
            handleCheckboxChange(category, option)
          }
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isOpen={!!openDropdowns[category]}
          toggleDropdown={(event) => toggleDropdown(category, event)}
        />
      ))}

      <div className="mt-4">
        <Select
          options={locationData.states}
          value={locationData.selectedState}
          onChange={handleStateSelection}
          placeholder="Select State"
        />
      </div>

      <div className="mt-4">
        <Select
          options={locationData.cities || []} // Ensure cities option is provided
          value={locationData.selectedCity}
          onChange={handleCitySelection}
          placeholder="Select City"
          isDisabled={!locationData.selectedState}
        />
      </div>
    </div>
  );
};

export default DropdownTask;
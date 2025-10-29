import React, { useState } from 'react';
import Select from 'react-select';

// Static datasets
const states = [
  { value: 'CA', label: 'California' },
  { value: 'NY', label: 'New York' },
  { value: 'TX', label: 'Texas' },
];

const cities = {
  CA: [
    { value: 'LA', label: 'Los Angeles' },
    { value: 'SF', label: 'San Francisco' },
  ],
  NY: [
    { value: 'NYC', label: 'New York City' },
    { value: 'BUF', label: 'Buffalo' },
  ],
  TX: [
    { value: 'DAL', label: 'Dallas' },
    { value: 'HOU', label: 'Houston' },
  ],
};

const useCollegeData = () => {
  const [collegeData, setCollegeData] = useState({
    collegeTypes: ["Private", "Government"],
    courseTypes: ["Degree", "Diploma", "Certification"],
    courseFees: ["20k-50k", "50k", "1 lakh", "1 lakh - 2 lakh", "2-3 lakh", "3-4 lakh", "4-5 lakh", "5 lakh above"],
    courseDurations: ["Upto 1 year", "2 years", "3 years", "4 years", "5 years"],
    studyTypes: ["Full-time", "Part-time", "Distance"],
  });

  const [locationData, setLocationData] = useState({
    states,
    cities: [],
    selectedState: null,
    selectedCity: null,
  });

  const handleStateChange = (selectedOption) => {
    setLocationData(prevData => ({
      ...prevData,
      selectedState: selectedOption,
      selectedCity: null,
      cities: cities[selectedOption.value] || [],
    }));
  };

  const handleCityChange = (selectedOption) => {
    setLocationData(prevData => ({
      ...prevData,
      selectedCity: selectedOption,
    }));
  };

  return {
    collegeData,
    locationData,
    handleStateChange,
    handleCityChange,
  };
};

export default useCollegeData;
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../../Context_holder";

import Select from 'react-select';
const cities = require("../../../../Json_files/Cities.json");
const states = require("../../../../Json_files/States.json");

const Dropdown = () => {

    const{stream_fetch,stream,
      
      

        stream_name ,setstream_name,college_type, setcollege_type,
        college_state, setcollege_state,
        selectedFeesRange,setselectedFeesRange,
        college_city, setcollege_city,
        course_time, setcourse_time,
        duration, setduration,
        
        // specialisation, setspecialisation,
        // collegeName, setCollegeName,courseName, setCourseName,college_searched_name,setsearchbar,searchbar,
    
        search_cities,
        setsearch_cities,
        search_query_clear,
        
        handlestateInputChange,
        statemenuIsOpen,
        
        handlecityInputChange,
        citymenuIsOpen

    }=useContext(Context)

        
  const [openDropdown, setOpenDropdown] = useState([]);

 const TypesOfcolleges=[
    "private",
    "government"
 ]


  const ranges = [
    { label: "Upto Rs. 1 Lakh", range: { max: 100000, min: 0 } },
    { label: "Rs. 1 Lakh - Rs. 2 Lakh", range: { max: 200000, min: 100000 } },
    { label: "Rs. 2 Lakh - Rs. 3 Lakh", range: { max: 300000, min: 200000 } },
    { label: "Rs. 3 Lakh - Rs. 4 Lakh", range: { max: 400000, min: 300000 } },
    { label: "Rs. 4 Lakh - Rs. 7 Lakh", range: { max: 700000, min: 400000 } },
    { label: "Above Rs. 7 Lakh", range: { max: 10000000, min: 700000 } }
  ];


  const courseDurations = [
    { label: "Upto 1 Year", years: 1 },
    { label: "2 Years", years: 2 },
    { label: "3 Years", years: 3 },
    { label: "4 Years", years: 4 },
    { label: "5 Years", years: 5 },
    { label: "Above 5 Years", years: 6 }
  ];

  const studyModes = ["Full Time", "Part Time", "Distance"];

  const toggleDropdown = (index) => {
    if (openDropdown.includes(index)) {
      setOpenDropdown(openDropdown.filter((i) => i !== index));
    } else {
      setOpenDropdown([...openDropdown, index]);
    }
  };


 
  

useEffect(
    ()=>{
        stream_fetch()

    },[]
)

useEffect(() => {
    const search_city = cities.filter(data => data.state === college_state?.value);
    setsearch_cities(search_city);
  }, [college_state]);


  return (
    <div className="bg-gray-100 p-4 rounded-lg ">
      <h2 className="text-white bg-blue-600 p-2 text-center font-semibold rounded-t-lg">
        Narrow results or view all
      </h2>

      <div className="mb-2">
        <button
          onClick={() => toggleDropdown(1)}
          className="w-full text-left bg-gray-200 p-3 flex justify-between items-center rounded-lg focus:outline-none"
        >
          Streams
          <svg
            className={`w-4 h-4 transform transition-transform ${
              openDropdown.includes(1) ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {openDropdown.includes(1) && (
          <div className="bg-white p-3 mt-2 rounded-lg shadow-md">
           

      {

        stream?.map(
            data=>  <label className="flex items-center font-semibold capitalize gap-2 cursor-pointer">
            <input
              type="radio"
              name="streams"
             
              defaultChecked={stream_name==data.stream_name}
              
            onChange={(e)=>setstream_name(data.stream_name)}
           
            />
            
            <span>{data.stream_name}</span>
            
          </label>
        )
      }
     
     


          </div>
        )}
      </div>

      <div className="mb-2">
        <button
          onClick={() => toggleDropdown(3)}
          className="w-full text-left bg-gray-200 p-3 flex justify-between items-center rounded-lg focus:outline-none"
        >
          College Type
          <svg
            className={`w-4 h-4 transform transition-transform ${
              openDropdown.includes(3) ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {openDropdown.includes(3) && (
          <div className="bg-white p-3 mt-2 rounded-lg shadow-md">


            {
                TypesOfcolleges.map(
                    data=><label className="flex items-center font-semibold capitalize gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="collegeType"
                     
                      defaultChecked={college_type==data}
                      
                    onChange={(e)=>setcollege_type(data)}
                   
                    />
                    
                    <span>{data}</span>
                    
                  </label>
                )
            }
       
       

         
          </div>
        )}
      </div>

      <div className="mb-2">
        <button
          onClick={() => toggleDropdown(4)}
          className="w-full text-left bg-gray-200 p-3 flex justify-between items-center rounded-lg focus:outline-none"
        >
          Fees
          <svg
            className={`w-4 h-4 transform transition-transform ${
              openDropdown.includes(4) ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {openDropdown.includes(4) && (
          <div className="bg-white p-3 mt-2 rounded-lg shadow-md">
              {
                ranges.map(
                    data=><label className="flex items-center font-semibold capitalize gap-2 cursor-pointer">
                    <input
                      type="radio"

                      name="fees"

                      defaultChecked={selectedFeesRange.min==data.range.min}

                      
                    onChange={()=>setselectedFeesRange(data.range)
                    
                       
                    }
                   
                    />
                    
                    <span>{data.label}</span>
                    
                  </label>
                )
            }
          </div>
        )}
      </div>

      <div className="mb-2">
        <button
          onClick={() => toggleDropdown(5)}
          className="w-full text-left bg-gray-200 p-3 flex justify-between items-center rounded-lg focus:outline-none"
        >
          Duration
          <svg
            className={`w-4 h-4 transform transition-transform ${
              openDropdown.includes(5) ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {openDropdown.includes(5) && (
          <div className="bg-white p-3 mt-2 rounded-lg shadow-md">

{
                courseDurations.map(
                    data=><label className="flex items-center font-semibold capitalize gap-2 cursor-pointer">
                    <input
                      type="radio"

                      name="duration"

                      defaultChecked={duration==data.years}

                      
                    onChange={()=>setduration(data.years)
                    
                       
                    }
                   
                    />
                    
                    <span>{data.label}</span>
                    
                  </label>
                )
            }
           
          </div>
        )}
      </div>

      <div className="mb-2">
        <button
          onClick={() => toggleDropdown(6)}
          className="w-full text-left bg-gray-200 p-3 flex justify-between items-center rounded-lg focus:outline-none"
        >
          Type Of Study
          <svg
            className={`w-4 h-4 transform transition-transform ${
              openDropdown.includes(6) ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {openDropdown.includes(6) && (
          <div className="bg-white p-3 mt-2 rounded-lg shadow-md">

{
                studyModes.map(
                    data=><label className="flex items-center font-semibold capitalize gap-2 cursor-pointer">
                    <input
                      type="radio"

                      name="studyMode"

                      defaultChecked={ course_time==data}

                      
                    onChange={()=>setcourse_time(data)
                    
                       
                    }
                   
                    />
                    
                    <span>{data}</span>
                    
                  </label>
                )
            }

          </div>
        )}
      </div>

      
      <div className="mb-2">
        <button
          onClick={() => toggleDropdown(7)}
          className="w-full text-left bg-gray-200 p-3 flex justify-between items-center rounded-lg focus:outline-none"
        >
          State
          <svg
            className={`w-4 h-4 transform transition-transform ${
              openDropdown.includes(7) ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {openDropdown.includes(7) && (
          <div className="bg-white p-3 mt-2 rounded-lg shadow-md">

<Select
  value={college_state}
  styles={{
    control: (provided) => ({
      ...provided,
      padding: '4px 20px',
      marginTop: '4px',
    }),
  }}
  onChange={(selectedOption) => {
    setcollege_state(selectedOption);
    console.log("Selected state:", selectedOption);
  }}
  onInputChange={handlestateInputChange}
  menuIsOpen={statemenuIsOpen}
  name="states"
  options={states.map((data) => ({ value: data.name, label: data.name }))}
  placeholder="Select a state"
/>


          </div>
        )}
      </div>

    
      <div className="mb-2">
        <button
          onClick={() => toggleDropdown(8)}
          className="w-full text-left bg-gray-200 p-3 flex justify-between items-center rounded-lg focus:outline-none"
        >
          City
          <svg
            className={`w-4 h-4 transform transition-transform ${
              openDropdown.includes(8) ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {openDropdown.includes(8) && (
          <div className="bg-white p-3 mt-2 rounded-lg shadow-md">

<Select
value={college_city}
styles={{
  control: (provided) => ({
    ...provided,
    padding: '4px 20px',
    marginTop: '4px',
  }),
}}
onChange={(e) => { setcollege_city(e) }}
onInputChange={handlecityInputChange}
menuIsOpen={citymenuIsOpen}
name="cities"
options={search_cities.map(data => ({ value: data.name, label: data.name }))}
/>

          </div>
        )}
      </div>



<button className=" py-1 px-3 hover:bg-blue-800 w-full rounded-lg my-4 bg-blue-600 text-white" onClick={ search_query_clear}>Reset Filter</button>

    </div>
    
  );
};

export default Dropdown;









import React, { useContext, useEffect, useState } from 'react';

import { Context } from '../../../Context_holder';
import axios from 'axios';



const Live_applications = () => {

    const{state_wise_colleges_fetch,state_wise_colleges,setuserSignUp_popup,setapply_popUpIsOpen,user}=useContext(Context)

    const [openDropdown, setOpenDropdown] = useState(null);

    useEffect(
        ()=>{
            state_wise_colleges_fetch()
        },[]
    )

    const toggleDropdown = (index) => {
      setOpenDropdown(openDropdown === index ? null : index);
    };


    const Live_applications_handler=(college_id)=>{
if(user){
  const data={college:college_id}
  axios
  .patch(
    process.env.REACT_APP_API_BASE_URL +
    process.env.REACT_APP_USER_URL +
    "college_edit/" +
    user?._id,data
    
  )
  .then((success) => {
   
    if (success.data.status === 1) {
      
      setapply_popUpIsOpen(true)
    }
  })
  .catch((error) => {
    console.log(error);
  });




}

else{
  setuserSignUp_popup(true)
}

    }
  
    return (
        <div className="max-w-screen-xl mx-auto p-4 bg-[#002147] min-h-screen">
        <h1 className="text-center text-2xl font-bold text-[#fdc800] mb-6">
          Live Application, Expert Guidance & Counseling for Listed Colleges & Universities
        </h1>
      
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
          {state_wise_colleges?.map((data, index) => (
            <div key={index} className="bg-[#002147] text-white p-4 rounded-lg shadow-md">
      
              {/* State Name Header */}
              <div
                onClick={() => toggleDropdown(index)}
                className="cursor-pointer flex border-2 px-4 py-3 shadow-md shadow-[#fdc800] border-[#fdc800] justify-between items-center rounded-md"
              >
                <span className="text-lg font-semibold">{data?.state}</span>
                <span className="transform transition-transform duration-300">
                  {openDropdown === index ? '▲' : '▼'}
                </span>
              </div>
      
              {/* Dropdown Content */}
              {openDropdown === index && (
                <div className="mt-4 bg-[#fdc800] p-4 rounded-md transition-all duration-300">
                  {data?.colleges?.map((college, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 p-3 bg-white rounded shadow-md">
                      <div>
                        <h3 className="font-bold text-[#002147]">{college.college_name}</h3>
                        <p className="text-sm text-gray-600">
                          📍 {college.city} ({data?.state})
                        </p>
                        <p className="text-sm text-gray-600">
                          🏛 Estd - {college.estdYear}
                        </p>
                      </div>
                      <button className="mt-3 md:mt-0 bg-[#002147] text-[#fdc800] font-bold py-2 px-4 rounded hover:bg-[#fdc800] hover:text-[#002147] transition w-full md:w-auto" onClick={()=> Live_applications_handler(college._id)}>
                        APPLY NOW
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
    );
};

export default Live_applications;

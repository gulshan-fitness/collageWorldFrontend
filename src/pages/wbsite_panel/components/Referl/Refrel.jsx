




import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Context } from "../../../../Context_holder";
import axios from "axios";
;

export default function Refrel() {
  const{setuserLogin_popup,setuserSignUp_popup,refrelUsers,RefrelUsersFetch}=useContext(Context)

const user= JSON.parse(localStorage.getItem("user"))



 const data = [
    { name: 'Bhawani shankar Sharma', cashbackAmount: '-', university: '-', course: '-', status: 'In Progress' },
    { name: 'mohan', cashbackAmount: '-', university: '-', course: '-', status: 'In Progress' },
  ];




  


useEffect(() => {
  if (!user) {
    setuserLogin_popup(true);
  } else if (user?._id) {
    RefrelUsersFetch(user._id);
  }
}, [user?._id]); 




  
  return (
    <div className="min-h-screen w-full  bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl relative">
        {/* Header */}
        <div className="flex items-start justify-between ">

          <div>

            <h2 className="text-lg font-bold text-gray-800">CV Wallet</h2>


            <p className="text-sm text-gray-500">
              Get CV Subsidy Cashback Upto
            </p>



            <h1 className="text-4xl font-bold text-black mt-2">₹20,000</h1>


            <p className="text-sm text-green-600 mt-1">
              Note : CV Subsidy is a cash reward given by College Vidya to
              students.
            </p>

            <p className="text-sm text-red-500 mt-2">
              *Offer valid till September 26th, 11 PM
            </p>

            <button className="flex items-center text-sm text-gray-700 mt-3 hover:underline">
              View Detail <FaChevronDown className="ml-1 w-3 h-3" />
            </button>
          </div>

          {/* Button */}
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md shadow hover:opacity-90 flex items-center gap-1" onClick={()=>{user?setuserSignUp_popup(true):setuserLogin_popup(true)}}>
            + Add Friend Details & Earn 🎁
          </button>
        </div>

        {/* Illustration (bottom right corner) */}
        <div className="absolute bottom-4 right-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4149/4149684.png"
            alt="wallet illustration"
            className="w-24 h-24"
          />
        </div>
      </div>

<div className="p-4 md:p-6">
      <h1 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
        CV Subsidy* Cashback Earned from your Referral Link
      </h1>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-sm md:text-base">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left whitespace-nowrap">Name</th>
              <th className="px-4 py-3 text-left whitespace-nowrap">Subsidy Cashback Amount</th>
              <th className="px-4 py-3 text-left whitespace-nowrap">University</th>
              <th className="px-4 py-3 text-left whitespace-nowrap">Course</th>
              <th className="px-4 py-3 text-left whitespace-nowrap">Status</th>
              <th className="px-4 py-3 text-left whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {refrelUsers?.map((row, idx) => (
              <tr key={idx} className="border-t border-gray-200">
                <td className="px-4 py-3 text-gray-800">{row?.name}</td>
                <td className="px-4 py-3 text-gray-800">20000</td>
                <td className="px-4 py-3 text-gray-800">{row?.college?.college_name}</td>

                <td className="px-4 py-3 text-gray-800">{row.course}</td>
                <td className="px-4 py-3">
                  <span className="inline-block bg-yellow-100 text-yellow-700 text-xs font-medium px-3 py-1 rounded-full">
                 {row?.checked?"Approved":"in Progress"} 
                  </span>
                </td>
                <td className="px-4 py-3">
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    
    </div>
  );
}



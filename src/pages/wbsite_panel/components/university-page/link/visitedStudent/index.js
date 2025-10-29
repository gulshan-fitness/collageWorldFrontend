// CollegesList.js
import React from 'react';

const colleges = [
  { name: "PB Siddhartha College", location: "Vijayawada", logo: "/logo1.png" },
  { name: "Andhra Loyola Institute", location: "Vijayawada", logo: "/logo2.png" },
  { name: "Velagapudi Ramakrishna College", location: "Vijayawada", logo: "/logo3.png" },
  { name: "SRK Institute of Technology", location: "Vijayawada", logo: "/logo4.png" },
];

const VisitedStudent = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Students Also Visited</h3>
      <ul>
        {colleges.map((college, index) => (
          <li key={index} className="flex items-center border-b pb-2 mb-2">
            <img src={college.logo} alt="Logo" className="w-10 h-10 mr-4" />
            <div>
              <h4 className="font-medium">{college.name}</h4>
              <p className="text-sm text-gray-600">{college.location}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VisitedStudent;

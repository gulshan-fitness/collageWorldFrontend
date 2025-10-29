import React from 'react';

// Sample data for professors
const professors = [
  {
    name: 'Dr. John Doe',
    degree: 'Ph.D. in Computer Science',
    experience: '15 years',
  },
  {
    name: 'Dr. John Doe',
    degree: 'Ph.D. in Computer Science',
    experience: '15 years',
  },
  {
    name: 'Dr. John Doe',
    degree: 'Ph.D. in Computer Science',
    experience: '15 years',
  },
  {
    name: 'Dr. John Doe',
    degree: 'Ph.D. in Computer Science',
    experience: '15 years',
  },
  {
    name: 'Dr. Jane Smith',
    degree: 'M.Sc. in Physics',
    experience: '10 years',
  },
  {
    name: 'Dr. Alan Brown',
    degree: 'Ph.D. in Mathematics',
    experience: '12 years',
  },
  // Add more professors as needed
];

const ProfessorsSection = ({faculties}) => {

  return (
<div className="w-full p-6 bg-gray-100">
  {/* Container div taking full width */}
  <div className="w-[90%] mx-auto">
    <h2 className="text-3xl font-bold mb-6 text-[#002147]">Our Professors</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {faculties?.map((professor, index) => (
        <div
          key={index}
          className="relative bg-[#002147] p-4 rounded-md shadow-lg transition-all duration-500 ease-out transform hover:rotate-3 hover:-translate-y-2 hover:shadow-2xl hover:bg-gradient-to-br hover:from-[#002147] hover:to-[#fdc800]"
        >
          {/* Remove the hover effect from the gradient overlay */}
          <h3 className="relative text-xl font-semibold mb-2 text-[#fdc800] transition-colors duration-500 z-10">
            {professor.name}
          </h3>
          <p className="relative text-white mb-1 transition-transform duration-500 hover:translate-x-2 z-10">
            <strong>Department:</strong> {professor.department}
          </p>
          <p className="relative text-white mb-1 transition-transform duration-500 hover:translate-x-2 z-10">
            <strong>Designation:</strong> {professor.designation}
          </p>
          <p className="relative text-white transition-transform duration-500 hover:translate-x-2 z-10">
            <strong>Qualification:</strong> {professor.qualification}
          </p>
        </div>
      ))}
    </div>
  </div>
</div>



  
  
  

  );
}

export default ProfessorsSection;
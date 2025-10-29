import React from 'react';

const universities = [
  { name: 'Bharatiya Vidya Mandir University', location: 'Mumbai, Maharashtra' },
  { name: 'Saraswati Institute of Technology', location: 'Pune, Maharashtra' },
  { name: 'Indira Gandhi National University', location: 'Delhi' },
  { name: 'Rajiv Gandhi Engineering College', location: 'Bengaluru, Karnataka' },
  { name: 'Himalayan Institute of Sciences', location: 'Dehradun, Uttarakhand' },
  { name: 'Mahatma Gandhi University of Arts', location: 'Ahmedabad, Gujarat' },
  { name: 'Techno Global University', location: 'Hyderabad, Telangana' },
  { name: 'Vivekanand Institute of Management', location: 'Chennai, Tamil Nadu' },
];

const FakeUniversityList = () => {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Explore Our Fake Indian Universities</h2>
      <p className="mb-8 text-center text-yellow-700 text-sm font-bold">
        Welcome to our curated list of esteemed universities that inspire innovation and creativity. 
        These institutions, though fictional, represent the spirit of education in India. 
        They offer diverse programs and opportunities for students to grow and excel in their fields. 
        Join a community that fosters learning and collaboration!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {universities.map((university, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
            <h3 className="text-lg font-semibold mb-2">{university.name}</h3>
            <p className="text-gray-600 text-sm">{university.location}</p>
            <p className="mt-4 text-sm">
              Join a vibrant community where students collaborate and explore endless opportunities.
              Experience innovative learning and connect with passionate individuals.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FakeUniversityList;

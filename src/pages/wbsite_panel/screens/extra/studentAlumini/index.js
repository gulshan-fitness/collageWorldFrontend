import React from 'react';

const connections = [
  { name: 'Aditi Sharma', role: 'Current Student', university: 'University of Delhi' },
  { name: 'Raj Patel', role: 'Alumnus', university: 'IIT Bombay' },
  { name: 'Sneha Gupta', role: 'Current Student', university: 'Jawaharlal Nehru University' },
  { name: 'Karan Mehta', role: 'Alumnus', university: 'IIM Bangalore' },
  { name: 'Priya Verma', role: 'Current Student', university: 'University of Mumbai' },
  { name: 'Rahul Singh', role: 'Alumnus', university: 'BITS Pilani' },
];

const ConnectWithStudentsAlumni = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 bg-gradient-to-r from-indigo-500 to-purple-600  shadow-lg text-white">
      <h2 className="text-4xl font-bold mb-6 text-center">Connect with University Students and Alumni</h2>
      <p className="mb-6 text-center text-lg">
        Expand your network and gain invaluable insights by connecting with students and alumni from diverse universities. 
        Share experiences, seek guidance, and explore countless opportunities together!
      </p>
      <div className="mb-8 text-center">
        <p className="text-base">
          Discover mentors, collaborators, and friends who can help you navigate your educational journey and career path. 
          Building connections can open doors to internships, job opportunities, and lifelong friendships. 
          Don’t miss out on this chance to learn from those who have been where you are now!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {connections.map((connection, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-2 text-blue-600">{connection.name}</h3>
            <p className="text-gray-700 text-lg">{connection.role}</p>
            <p className="text-gray-500">{connection.university}</p>
            <p className="mt-4 text-gray-600 text-sm">
              "As a {connection.role} at {connection.university}, I have had amazing experiences and learned so much. 
              Let's connect to share insights, discuss projects, and support each other's goals!"
            </p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">
              Connect Now
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button className="bg-green-500 text-white py-3 px-6 rounded-md font-semibold shadow-lg hover:bg-green-600 transition">
          Join Our Community
        </button>
      </div>
    </div>
  );
};

export default ConnectWithStudentsAlumni;

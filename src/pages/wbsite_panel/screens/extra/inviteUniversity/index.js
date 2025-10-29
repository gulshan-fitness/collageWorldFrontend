import React from 'react';
import { FaUsers, FaRocket, FaUniversity } from 'react-icons/fa';

const InviteUniversitySection = () => {
  return (
    <div className="w-full mx-auto p-8 bg-gradient-to-r from-blue-600 to-purple-700  shadow-lg text-white">
      <h2 className="text-4xl font-bold mb-6 text-center">Join Us and Make an Impact!</h2>
      <p className="mb-6 text-center md:px-[3rem]">
        We are thrilled to invite universities like yours to become a part of our vibrant community. 
        With thousands of students visiting us every month, you’ll gain unparalleled visibility and engagement.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
        <div className="flex flex-col items-center ">
          <FaUsers className="text-6xl mb-4" />
          <h3 className="text-xl font-semibold">Connect with Students</h3>
          <p className="text-center w-[50%]">Showcase your programs to a diverse audience and build lasting relationships.</p>
        </div>
        <div className="flex flex-col items-center">
          <FaRocket className="text-6xl mb-4" />
          <h3 className="text-xl font-semibold">Boost Your Visibility</h3>
          <p className="text-center w-[50%]">Gain exposure through our platform and attract top talent to your institution.</p>
        </div>
        <div className="flex flex-col items-center">
          <FaUniversity className="text-6xl mb-4" />
          <h3 className="text-xl font-semibold">Join a Network of Innovators</h3>
          <p className="text-center w-[50%]">Collaborate with like-minded institutions to drive education and innovation forward.</p>
        </div>
      </div>

      <p className="mb-6 text-center">
        Don’t miss out on the opportunity to connect with future leaders and thinkers. 
        Join us today, and let’s make a difference together!
      </p>
      <div className="text-center">
        <button className="bg-white text-blue-600 py-3 px-6 rounded-md font-semibold shadow-lg hover:bg-gray-200 transition">
          Get Started Now
        </button>
      </div>
    </div>
  );
};

export default InviteUniversitySection;

import React from 'react';

const OurCommitment = () => {
  return (
    <div className="bg-white p-10  shadow-lg transition-transform transform hover:scale-105 mt-8">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-indigo-600">Our Commitment</h2>
      <p className="mb-8 text-gray-700 text-lg text-center">
        At our platform, we are committed to empowering students to make informed choices about their college education. We recognize that selecting the right college is not just a decision—it's a journey that shapes futures.
      </p>
      <ul className="list-disc list-inside mb-6 space-y-4">
        <li>
          <strong className="text-indigo-500">Accurate Information:</strong> 
          We conduct thorough research on every college, ensuring you receive precise and up-to-date information. Our dedicated team evaluates data from multiple credible sources, guiding you toward making informed decisions.
        </li>
        <li>
          <strong className="text-indigo-500">Objective Ratings:</strong> 
          Our college ratings are tailored to students' needs, reflecting various criteria, including academic quality, campus facilities, placement records, and overall student satisfaction.
        </li>
        <li>
          <strong className="text-indigo-500">Professional Guidance:</strong> 
          Our experienced team is always here to provide personalized guidance. Whether you have questions or need support, we aim to empower you to feel confident in your college selection process.
        </li>
        <li>
          <strong className="text-indigo-500">Student Progress:</strong> 
          Your success is our success. We are dedicated to supporting you throughout your college journey, monitoring your progress, and providing resources to help you thrive.
        </li>
        <li>
          <strong className="text-indigo-500">Ethics and Transparency:</strong> 
          We believe in the importance of ethics and transparency. All information and ratings we provide are fair, clear, and impartial.
        </li>
        <li>
          <strong className="text-indigo-500">Community Support:</strong> 
          We foster a supportive community where students can share experiences, seek advice, and build connections. Join us to collaborate with peers who share your aspirations.
        </li>
        <li>
          <strong className="text-indigo-500">Lifelong Learning:</strong> 
          Education doesn't stop at college. We encourage continuous learning and personal development, providing resources and guidance even after your college journey begins.
        </li>
      </ul>
      <p className="text-lg text-gray-700 text-center">
        Our mission goes beyond merely helping students choose the right college; we aspire to inspire you to reach your fullest potential and succeed in your future endeavors. Together, let’s turn your dreams into reality!
      </p>
    </div>
  );
};

export default OurCommitment;

import React from 'react';

const VideoCounselingSection = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 bg-gradient-to-r from-green-400 to-blue-500  shadow-lg text-white">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Join Our Video Counseling Sessions</h2>
      <p className="mb-4 text-center text-base md:text-lg">
        Experience personalized guidance from experts through our convenient video counseling platform. 
        Whether you’re seeking academic advice, career guidance, or personal support, our sessions are designed to help you navigate your path.
      </p>
      <p className="mb-4 text-center text-base font-semibold">
        What You Will Gain from Video Counseling:
      </p>
      <ul className="list-disc list-inside mb-4 text-base md:text-lg">
        <li>✅ <strong>Personalized Guidance:</strong> Receive tailored advice to suit your unique situation.</li>
        <li>✅ <strong>Convenience:</strong> Connect with counselors from the comfort of your home.</li>
        <li>✅ <strong>Flexible Scheduling:</strong> Choose a time that works best for you.</li>
        <li>✅ <strong>Expert Insights:</strong> Benefit from the knowledge of experienced professionals.</li>
        <li>✅ <strong>Enhanced Decision-Making:</strong> Make informed choices about your education and career.</li>
      </ul>
      <p className="text-center mb-6 text-base md:text-lg">
        Don't miss out on this opportunity to invest in your future! 
        <br />
        Sign up today to reserve your spot for our upcoming video counseling sessions.
      </p>
      <div className="mt-6 text-center">
        <button className="bg-white text-green-600 py-2 px-4 md:py-3 md:px-6 rounded-md font-semibold shadow-lg hover:bg-gray-200 transition">
          Book Your Session Now
        </button>
      </div>
    </div>
  );
};

export default VideoCounselingSection;

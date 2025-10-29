import React from 'react';
import OurTeam from '../../home/our-team';

const AAPDExpert = () => {
  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">
        Meet Our Experts
      </h2>
      <p className="text-center text-gray-700 mb-8">
        At AAOPADHE, we empower students with essential information and resources to succeed in their educational journey. Our dedicated team of experts is here to guide you every step of the way.
      </p>
      <p className="text-center text-gray-700 mb-8">
        Our experts bring a wealth of experience in various fields, ensuring that you receive the best advice and support tailored to your needs. From course selections to career planning, our team is committed to your success.
      </p>

      {/* Why Choose Us Section */}
      <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-center text-blue-700 mb-4">
          Why Choose Us
        </h3>
        <p className="text-gray-700 mb-4 text-center">
          Our platform is designed to provide you with a comprehensive support system. Here’s why AAOPADHE stands out:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>✔ Expert Guidance: Personalized advice from professionals in various fields.</li>
          <li>✔ Comprehensive Resources: Access to a wealth of information tailored for students.</li>
          <li>✔ Community Support: Join a vibrant community of learners and experts.</li>
          <li>✔ Proven Success: Track record of helping students achieve their academic goals.</li>
        </ul>
        <p className="mt-4 text-gray-700 text-center">
          Join us at AAOPADHE and take the next step towards a successful future!
        </p>
      </div>

      {/* Key Services Section */}
      <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-center text-blue-700 mb-4">
          Our Key Services
        </h3>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>📚 **Course Recommendations**: Tailored advice based on your interests and career goals.</li>
          <li>🗓️ **Application Support**: Step-by-step guidance through the application process.</li>
          <li>🎓 **Career Counseling**: Insights into potential career paths and opportunities.</li>
          <li>🌐 **Networking Opportunities**: Connect with industry professionals and alumni.</li>
        </ul>
      </div>

      {/* FAQ Section */}
      <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-center text-blue-700 mb-4">
          Frequently Asked Questions
        </h3>
        <div className="text-gray-700 mb-4">
          <h4 className="font-semibold">1. How can I get started with AAOPADHE?</h4>
          <p>Simply create an account to explore resources tailored to your academic journey.</p>
          <h4 className="font-semibold mt-2">2. What types of courses do you offer information on?</h4>
          <p>We provide insights on a wide range of courses across various disciplines.</p>
          <h4 className="font-semibold mt-2">3. Can I reach out to an expert directly?</h4>
          <p>Yes, you can connect with our experts for personalized guidance.</p>
        </div>
      </div>
      <OurTeam/>
    </div>
  );
};

export default AAPDExpert;

import React, { useState } from 'react';
import Typewriter from 'react-typewriter-effect';

const WeDifferent = () => {

  const [openCareerServices, setOpenCareerServices] = useState(false);
  const [selectedTab, setSelectedTab] = useState('courses');

  const alumniStories = [
    { name: "Alice Smith", quote: "AAOPADHE helped me find my perfect college! The ratings were spot on and made my decision so much easier.", image: "/path/to/image1.jpg" },
    { name: "Bob Johnson", quote: "I could compare colleges easily and made an informed choice! The side-by-side comparisons saved me so much time.", image: "/path/to/image2.jpg" },
    { name: "Carol Davis", quote: "The application process was a breeze! The step-by-step guidance was exactly what I needed.", image: "/path/to/image3.jpg" },
  ];

  const tabs = [
    { key: 'courses', label: 'Courses Offered', content: 'Our courses range from arts and sciences to business and technology. Each course is designed to equip you with the knowledge and skills you need to excel in your chosen field.' },
    { key: 'professors', label: 'Professor Reviews', content: 'Read detailed reviews from current and former students about their professors, allowing you to choose the best faculty for your academic journey.' },
    { key: 'research', label: 'Research Opportunities', content: 'Explore various research opportunities available for students to engage with faculty and enhance their learning experience.' },
    { key: 'internships', label: 'Internship Programs', content: 'Get insights on internship programs that provide real-world experience and enhance your resume.' },
    { key: 'student-life', label: 'Student Life', content: 'Discover what it’s like to be a student at AAOPADHE, including clubs, organizations, and campus activities.' },
    { key: 'financial-aid', label: 'Financial Aid Information', content: 'Find out about the different financial aid options available to support your educational journey.' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative  bg-cover bg-center mt-8" style={{ backgroundImage: "url('/path/to/hero-image.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="flex flex-col items-center justify-center  p-6">
      <h1 className="text-white text-5xl font-bold">
        <Typewriter
          text="Discover Your Future with AAOPADHE"
          speed={100} // Typing speed in milliseconds
          cursorColor="#FFFFFF"
        />
      </h1>
      <p className="mt-4 text-white text-lg text-start max-w-xl">
        At AAOPADHE, we empower students by providing essential information and resources that help you succeed in your educational journey. Explore courses, get to know your professors, and find out about opportunities that await you. Your future starts here!
      </p>
      <p className="mt-2 text-white text-lg text-start max-w-xl">
        Join a community of learners and discover what AAOPADHE has to offer. Unlock your potential and take the first step toward achieving your dreams today!
      </p>
    </div>
      </div>

      {/* Key Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  <div className="bg-white p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105">
    <h2 className="text-2xl font-semibold">Comprehensive College Ratings</h2>
    <p className="text-gray-700 mt-2">Explore our extensive database of colleges, with ratings based on student reviews, academic performance, and career outcomes. Make informed decisions with insights that matter.</p>
    <ul className="list-disc list-inside mt-2 text-gray-600">
      <li>Detailed ratings from current students.</li>
      <li>Insights into faculty quality and support services.</li>
      <li>Performance metrics that highlight graduate success rates.</li>
    </ul>
  </div>
  <div className="bg-white p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105">
    <h2 className="text-2xl font-semibold">Compare Colleges</h2>
    <p className="text-gray-700 mt-2">Easily compare colleges side by side. Assess key factors such as tuition, course offerings, faculty credentials, and student satisfaction to find the right fit for your academic goals.</p>
    <ul className="list-disc list-inside mt-2 text-gray-600">
      <li>Side-by-side comparisons of tuition fees.</li>
      <li>Comparison of course offerings and specializations.</li>
      <li>Direct insights into campus culture and facilities.</li>
    </ul>
  </div>
  <div className="bg-white p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105">
    <h2 className="text-2xl font-semibold">Application Assistance</h2>
    <p className="text-gray-700 mt-2">Receive step-by-step guidance on the application process. From crafting the perfect personal statement to tracking deadlines, we ensure you submit a standout application.</p>
    <ul className="list-disc list-inside mt-2 text-gray-600">
      <li>Templates and tips for personal statements and resumes.</li>
      <li>Deadline tracking tools to keep you organized.</li>
      <li>Personalized advice from our experienced advisors.</li>
    </ul>
  </div>
  <div className="bg-white p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105">
    <h2 className="text-2xl font-semibold">Scholarship and Financial Aid Resources</h2>
    <p className="text-gray-700 mt-2">Navigate the complexities of financing your education. Our platform provides resources and tools to help you find scholarships and understand financial aid options available to you.</p>
    <ul className="list-disc list-inside mt-2 text-gray-600">
      <li>Searchable database of scholarships by major and need.</li>
      <li>Guides on applying for financial aid and grants.</li>
      <li>Tips for budgeting and managing college expenses.</li>
    </ul>
  </div>
  <div className="bg-white p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105">
    <h2 className="text-2xl font-semibold">Career Guidance and Internship Opportunities</h2>
    <p className="text-gray-700 mt-2">Prepare for your future career with our dedicated career services. Access internship opportunities, job postings, and professional development resources.</p>
    <ul className="list-disc list-inside mt-2 text-gray-600">
      <li>Access to internships in various fields.</li>
      <li>Workshops on resume building and interview preparation.</li>
      <li>Networking opportunities with alumni and industry professionals.</li>
    </ul>
  </div>
</div>


      {/* Alumni Success Stories */}
      <div className="bg-gray-50 p-6">
        <h2 className="text-2xl font-semibold text-center">Success Stories from Our Alumni</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {alumniStories.map(story => (
            <div key={story.name} className="bg-white p-4 shadow-lg rounded-lg">
              <img src={story.image} alt={story.name} className="h-32 w-full object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold">{story.name}</h3>
              <p className="text-gray-600 italic">"{story.quote}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Research Opportunities and Additional Info */}
      <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-semibold">What We Offer</h2>
      <p className="mt-2 text-gray-700">At AAOPADHE, we believe in empowering students with the information they need to succeed. Our platform provides:</p>
      <ul className="list-disc list-inside mt-2 text-gray-700">
        <li>Detailed course descriptions, including syllabus, prerequisites, and career opportunities.</li>
        <li>Comprehensive reviews of professors, highlighting teaching styles, grading practices, and student feedback.</li>
        <li>Up-to-date placement scores that showcase the success of graduates in the job market.</li>
        <li>Important application deadlines and requirements to keep you on track.</li>
      </ul>
      
      <div className="flex flex-wrap space-x-4 mt-4">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={`flex-1 p-2 m-1 rounded ${selectedTab === tab.key ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      
      
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} AAOPADHE. All Rights Reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="hover:text-blue-400">Facebook</a>
            <a href="#" className="hover:text-blue-400">Twitter</a>
            <a href="#" className="hover:text-blue-400">Instagram</a>
            <a href="#" className="hover:text-blue-400">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WeDifferent;

import React, { useState } from 'react';

const offeringsData = [
  {
    title: "Courses Offered",
    content: "Our courses range from arts and sciences to business and technology. Each course is designed to equip you with the knowledge and skills you need to excel in your chosen field.",
  },
  {
    title: "Professor Reviews",
    content: "Read detailed reviews from current and former students about their professors, allowing you to choose the best faculty for your academic journey.",
  },
  {
    title: "Placement Scores",
    content: "Stay informed with up-to-date placement scores that showcase the success of our graduates in the job market. These metrics help you gauge potential career opportunities post-graduation.",
  },
  {
    title: "Application Deadlines",
    content: "Never miss a deadline again! Our platform provides important application deadlines and requirements to keep you on track throughout the application process.",
  },
  {
    title: "Career Opportunities",
    content: "Explore various career opportunities available through internships and job placements facilitated by our network. Gain real-world experience while studying.",
  },
];

const WhatWeOffer = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const nextSlide = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % offeringsData.length);
  };

  const prevSlide = () => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + offeringsData.length) % offeringsData.length);
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-semibold">What We Offer</h2>
      <p className="mt-2 text-gray-700">
        At AAOPADHE, we believe in empowering students with the information they need to succeed. Our platform provides:
      </p>
      <div className="flex space-x-4 mt-4">
        <button onClick={prevSlide} className="p-2 bg-gray-300 rounded">Previous</button>
        <button onClick={nextSlide} className="p-2 bg-gray-300 rounded">Next</button>
      </div>
      <div className="mt-4 p-4 bg-white rounded-lg shadow">
        <h3 className="text-xl font-semibold">{offeringsData[selectedIndex].title}</h3>
        <p className="mt-2 text-gray-700">{offeringsData[selectedIndex].content}</p>
      </div>
      <div className="flex justify-center mt-4">
        {offeringsData.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`h-2 w-2 mx-1 rounded-full ${selectedIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default WhatWeOffer;

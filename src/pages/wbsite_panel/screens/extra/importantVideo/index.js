import React from 'react';

const ImportantVideos = () => {
  const videos = [
    {
      id: 1,
      title: "How to Choose the Best College?",
      url: "https://www.youtube.com/watch?v=example1",
      description: "Learn the essential factors to consider when selecting the right college for your educational journey."
    },
    {
      id: 2,
      title: "Tips for Success in College",
      url: "https://www.youtube.com/watch?v=example2",
      description: "Discover strategies and tips from successful students to excel in your college experience."
    },
    {
      id: 3,
      title: "Guidelines for Course Selection",
      url: "https://www.youtube.com/watch?v=example3",
      description: "Understand how to choose the right courses that align with your career goals and interests."
    },
    {
      id: 4,
      title: "The Importance of Networking in College",
      url: "https://www.youtube.com/watch?v=example4",
      description: "Explore how building connections can impact your academic and professional future."
    },
    {
      id: 5,
      title: "Financial Aid and Scholarships Explained",
      url: "https://www.youtube.com/watch?v=example5",
      description: "Learn about the various financial aid options available and how to apply for scholarships effectively."
    },
    {
      id: 6,
      title: "Time Management for Students",
      url: "https://www.youtube.com/watch?v=example6",
      description: "Get tips on how to manage your time efficiently to balance studies, work, and leisure."
    },
  ];

  return (
    <section className=" py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Important Videos</h2>
        <p className="text-lg text-yellow-700 text-center mb-8">
          Our platform provides students with the best college courses based on comprehensive research and ratings. 
          We offer detailed information about colleges and counseling services to help you succeed in your educational journey.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {videos.map(video => (
            <div key={video.id} className="bg-gray-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold mb-2 text-blue-400">{video.title}</h3>
              <p className="text-gray-600 mb-4">{video.description}</p>
              <iframe
                className="w-full h-48 rounded-lg"
                src={video.url.replace("watch?v=", "embed/")}
                title={video.title}
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Explore More Resources</h3>
          <p className="text-gray-600 mb-4">
            Our platform is designed to empower students by offering various resources, including:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Detailed college reviews and comparisons.</li>
            <li>Expert articles on career planning and development.</li>
            <li>Interactive webinars and Q&A sessions with industry experts.</li>
            <li>A community forum to connect with peers and share experiences.</li>
          </ul>
          <p className="text-gray-600">
            Start your journey toward academic excellence with us today!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImportantVideos;

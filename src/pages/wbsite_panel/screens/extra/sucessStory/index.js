import React from 'react';

const SuccessStories = () => {
  return (
    <section className="bg-gray-100 py-10 w-full flex justify-center">
      <div className="w-[90%] px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-500">Success Stories</h2>
        <p className="text-lg text-gray-700 text-center mb-8">
          Here are inspiring stories of students who achieved their dreams through hard work and determination. Our platform is committed to guiding students towards success by providing the best educational resources.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg ">
            <h3 className="text-xl font-semibold mb-2 text-blue-500 font-bold ">Aryan's Journey</h3>
            <p className="text-gray-600">
              Aryan hails from a small village. Through his perseverance and dedication, he overcame challenges and made his dreams a reality. His story teaches us that hard work can make any dream achievable.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-blue-500 font-bold">Seema's Story</h3>
            <p className="text-gray-600">
              Seema focused on her studies, keeping in mind her family's financial situation. She participated in various competitions and eventually secured a scholarship. Her dedication led her to success.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-blue-500 font-bold">Mohit's Achievement</h3>
            <p className="text-gray-600">
              Mohit excelled in sports and brought glory to his village by winning a national award. His story emphasizes that sports can also lead to a successful career.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-blue-500 font-bold">Sia's Success</h3>
            <p className="text-gray-600">
              Sia showed great interest in science and worked on numerous scientific projects. Her creativity and determination earned her several awards, and today she is a successful scientist.
            </p>
          </div>
        </div>

        {/* Additional Section for Platform Benefits */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Why Choose Our Platform?</h3>
          <p className="text-gray-600 mb-4">
            Our platform is dedicated to empowering students by providing access to the best college courses, comprehensive research, and detailed information about colleges. 
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4 text-center md:text-start md:ml-[35%]">
            <li>Access to comprehensive college data and ratings.</li>
            <li>Expert counseling to guide course selection.</li>
            <li>Regular webinars and workshops to enhance skills.</li>
            <li>Community support to share experiences and advice.</li>
          </ul>
          <p className="text-gray-600">
        
            Our platform helps you navigate the vast educational landscape.
          </p>
        </div>

        {/* Educational Insights Section */}
        <div className="mt-12 bg-white w-full p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Educational Insights</h3>
          <p className="text-gray-600 mb-4">
            Stay informed about the latest trends in education and career options. Our resources include:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4 text-center md:text-start md:ml-[35%]">
            <li>Guides on choosing the right college and course.</li>
            <li>Information on emerging fields and job opportunities.</li>
            <li>Success tips from industry professionals.</li>
            <li>Access to student testimonials and experiences.</li>
          </ul>
          <p className="text-gray-600">
            Knowledge is power, and we are here to ensure you have all the information you need to make informed decisions about your education and future.
          </p>
        </div>

        {/* Call to Action Section */}
        <div className="mt-10 text-center">
          <a 
            href="/signup" 
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign Up Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;

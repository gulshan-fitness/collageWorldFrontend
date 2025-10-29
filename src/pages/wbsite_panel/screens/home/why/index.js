import React from 'react';
import { useContext } from 'react';
import { FaBullseye, FaGraduationCap, FaHandsHelping, FaBook, FaCommentsDollar } from 'react-icons/fa';
import { MdSchool } from 'react-icons/md';
import { Context } from '../../../../../Context_holder';

function Why() {
  const {setuserSignUp_popup}=useContext(Context)
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-gray-50 py-8 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black mb-2 md:mb-4">
            Why We're <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Different</span>
          </h1>
          <p className="text-sm md:text-lg text-gray-600 font-medium">Top Features in Timeline</p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line - Hidden on mobile, visible on desktop */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-200 via-indigo-300 to-blue-200 h-full hidden lg:block"></div>

          {/* Timeline Items */}
          <div className="space-y-6 md:space-y-8">
            {[
              {
                icon: <FaBullseye className="text-white text-lg md:text-2xl" />,
                title: "Personalized Matches",
                description: "Find the best college tailored to your course and career goals.",
                color: "from-blue-500 to-blue-600",
                bgColor: "bg-blue-500",
                side: "left"
              },
              {
                icon: <MdSchool className="text-white text-lg md:text-2xl" />,
                title: "Vast College Options",
                description: "Explore top colleges across all courses, all in one place.",
                color: "from-indigo-500 to-indigo-600",
                bgColor: "bg-indigo-500",
                side: "right"
              },
              {
                icon: <FaHandsHelping className="text-white text-lg md:text-2xl" />,
                title: "Expert Assistance",
                description: "Get step-by-step guidance from our experienced counselors.",
                color: "from-purple-500 to-purple-600",
                bgColor: "bg-purple-500",
                side: "left"
              },
              {
                icon: <FaGraduationCap className="text-white text-lg md:text-2xl" />,
                title: "Trusted Insights",
                description: "Real student reviews to guide your decisions.",
                color: "from-cyan-500 to-cyan-600",
                bgColor: "bg-cyan-500",
                side: "right"
              },
              {
                icon: <FaCommentsDollar className="text-white text-lg md:text-2xl" />,
                title: "Scholarship Aid",
                description: "Discover colleges offering financial support and scholarships.",
                color: "from-emerald-500 to-emerald-600",
                bgColor: "bg-emerald-500",
                side: "left"
              },
              {
                icon: <FaBook className="text-white text-lg md:text-2xl" />,
                title: "In-Depth Resources",
                description: "Access comprehensive guides and study materials.",
                color: "from-teal-500 to-teal-600",
                bgColor: "bg-teal-500",
                side: "right"
              }
            ].map((item, index) => (
              <div key={index} className={`relative flex items-center ${
                item.side === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } flex-row`}>
                
                {/* Icon */}
                <div className={`relative z-10 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center shadow-lg flex-shrink-0 ${
                  item.side === 'left' ? 'lg:mr-8' : 'lg:ml-8'
                } mr-4`}>
                  {item.icon}
                </div>

                {/* Content */}
                <div className={`bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex-1 max-w-md ${
                  item.side === 'left' ? 'lg:ml-0' : 'lg:mr-0'
                }`}>
                  <h2 className={`text-lg md:text-xl lg:text-2xl font-bold mb-2 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                    {item.title}
                  </h2>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Timeline dot for desktop */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-blue-500 rounded-full hidden lg:block "></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 md:p-8 text-white shadow-xl">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Experience the Difference</h3>
            <p className="text-blue-100 text-sm md:text-base mb-4 md:mb-6 max-w-2xl mx-auto">
              Join thousands of students who chose our platform for their educational journey
            </p>
            <button className="bg-white text-blue-600 font-semibold py-2 md:py-3 px-6 md:px-8 rounded-xl hover:bg-gray-100 transition-colors duration-300 shadow-lg text-sm md:text-base" onClick={()=>setuserSignUp_popup(true)}>
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Why;

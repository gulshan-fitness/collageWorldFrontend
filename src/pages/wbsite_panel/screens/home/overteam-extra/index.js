import React from "react";
import { FaBuilding, FaChartLine, FaAward, FaUserTie, FaGraduationCap, FaStar, FaArrowRight } from "react-icons/fa";

const OverTeamExtra = () => {
  const companies = [
    { name: "Google", logo: "G", hires: 24, color: "from-red-500 to-red-600" },
    { name: "Microsoft", logo: "M", hires: 18, color: "from-green-500 to-green-600" },
    { name: "Amazon", logo: "A", hires: 22, color: "from-orange-500 to-orange-600" },
    { name: "Infosys", logo: "I", hires: 35, color: "from-blue-500 to-blue-600" },
    { name: "TCS", logo: "T", hires: 28, color: "from-purple-500 to-purple-600" },
    { name: "Wipro", logo: "W", hires: 19, color: "from-teal-500 to-teal-600" },
  ];

  const studentStats = [
    { icon: <FaUserTie className="text-white" />, label: "Placed Students", value: "5000+", bg: "bg-blue-600" },
    { icon: <FaBuilding className="text-white" />, label: "Partner Companies", value: "200+", bg: "bg-green-600" },
    { icon: <FaChartLine className="text-white" />, label: "Placement Rate", value: "95%", bg: "bg-purple-600" },
    { icon: <FaAward className="text-white" />, label: "Highest Package", value: "₹42 LPA", bg: "bg-orange-600" },
  ];

  return (
    <div className="w-full bg-white py-8 md:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FaStar className="text-yellow-400" />
            Success Stories
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Our Students Shine at Top Companies
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
            Join thousands of successful alumni who have built remarkable careers with world-class companies
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {studentStats.map((stat, index) => (
                <div key={index} className={`${stat.bg} rounded-xl p-4 text-center text-white shadow-lg`}>
                  <div className="flex justify-center mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-xl md:text-2xl font-bold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-blue-100 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Our Comprehensive Placement Program ensures that every student is industry-ready through hands-on training, mock interviews, resume building, and personalized career guidance.
We go beyond classroom learning by connecting students directly with top recruiters and leading companies across various domains.
              </p>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <FaStar className="text-yellow-400" />
                  <span>4.8/5 placement satisfaction</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="text-sm text-gray-600">500+ hiring partners</div>
                <div> Empowering Futures, One Career at a Time!</div>
              </div>
            </div>

            {/* Action Buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl">
                Explore Placement Opportunities
                <FaArrowRight className="text-sm" />
              </button>
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-semibold py-3 px-6 rounded-lg transition-all duration-200">
                Download Brochure
              </button>
            </div> */}
          </div>

          {/* Right Content - Companies & Images */}
          <div className="space-y-6">
            {/* Companies Grid */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaBuilding className="text-blue-600" />
                Top Recruiting Companies
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {companies.map((company, index) => (
                  <div key={index} className="text-center group transform hover:-translate-y-1 transition-transform duration-200">
                    <div className="bg-white border border-gray-200 rounded-xl p-3 group-hover:shadow-lg transition-shadow">
                      <div className={`w-12 h-12 bg-gradient-to-r ${company.color} rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-2`}>
                        {company.logo}
                      </div>
                      <div className="text-xs font-semibold text-gray-900 mb-1">
                        {company.name}
                      </div>
                      <div className="text-xs text-blue-600 font-medium">
                        {company.hires}+ placed
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Images Grid */}
            <div className="grid grid-cols-3 gap-3">
              {[
                "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/274f29ce-0d3f-4ac2-a2aa-f9b7bd188b2a",
                "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/b8a14493-3d9f-4b9b-b93a-56d0bc7243e9",
                "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/03e51e1e-9750-45a5-b75e-a1e341d4562a",
                "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/5eb50f89-3e5a-480e-860c-8d40d3ba9ffe",
                "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/86c71a79-2efe-4567-8665-b1e5a1fd9735",
                "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/97ef9643-5202-41aa-80f0-ceeabccdd099"
              ].map((src, index) => (
                <div key={index} className="relative group">
                  <img
                    className="w-full h-20 md:h-24 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105"
                    src={src}
                    alt={`Student ${index + 1}`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverTeamExtra;
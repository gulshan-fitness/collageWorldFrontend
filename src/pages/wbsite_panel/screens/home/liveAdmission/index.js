import React, { useContext } from "react";
import { Context } from "../../../../../Context_holder";
import { useNavigate } from "react-router-dom";

const AdmissionButtons = () => {

  const { setcourse_name,setfilterHeading } = useContext(Context);
  const buttons = [
    { name: "B Ed", icon: "", color: "from-blue-500 to-blue-700" },
    { name: "MBA", icon: "", color: "from-blue-600 to-blue-800" },
    { name: "MBBS", icon: "", color: "from-blue-700 to-blue-900" },
    { name: "BA", icon: "", color: "from-blue-500 to-indigo-600" },
    { name: "M Tech", icon: "", color: "from-blue-600 to-indigo-700" },
    { name: "PhD", icon: "", color: "from-blue-700 to-indigo-800" },
    { name: "LLB", icon: "", color: "from-blue-800 to-indigo-900" },
    { name: "D El Ed", icon: "", color: "from-indigo-500 to-blue-600" },
    { name: "BSc", icon: "", color: "from-indigo-600 to-blue-700" },
    { name: "B Pharmacy", icon: "", color: "from-indigo-700 to-blue-800" }
  ];

  const navigater=useNavigate()

  const course_handler = (course_name) => {
    setcourse_name(course_name)
    navigater("/allUniversity");
    setfilterHeading("Admission 2024")
  };
  
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 py-4 md:py-8 px-3 md:px-4 relative overflow-hidden border-b border-blue-200">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-transparent to-blue-600/5"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-300/10 to-transparent rounded-full blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-lg"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Compact Header */}
        <div className="mb-3 md:mb-4">
          <div className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-800 to-black rounded-lg mb-1 md:mb-2 shadow-md border border-white/10">
            <span className="text-white font-black text-xs md:text-sm">🎯</span>
          </div>
          <h2 className="text-sm md:text-xl font-black text-black mb-1 tracking-tight">
            2025 <span className="bg-gradient-to-r from-blue-700 to-black bg-clip-text text-transparent">Admissions Open</span>
          </h2>
          <p className="text-xs text-blue-800/80 font-medium">Apply to top colleges</p>
        </div>

        {/* Ultra Compact Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5 md:gap-2 mb-3 md:mb-4">
          {buttons.map((button, index) => (
            <button
              key={index}
              className="group relative bg-white/95 backdrop-blur-md border border-blue-200/50 rounded-xl md:rounded-2xl p-1.5 md:p-3 shadow-md hover:shadow-lg focus:outline-none focus:ring-1 focus:ring-blue-500/30 text-blue-900 hover:text-blue-800 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 hover:border-blue-300/70 overflow-hidden"
              onClick={()=>course_handler(button.name)}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-transparent to-blue-600/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10 flex flex-col items-center space-y-1">
                {/* Icon */}
                <div className={`w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r ${button.color} rounded-lg flex items-center justify-center group-hover:scale-105 transition-all duration-200 shadow-sm border border-white/20`}>
                  <span className="text-white text-xs drop-shadow-sm">
                    {button.icon}
                  </span>
                </div>
                
                {/* Course Info */}
                <div className="text-center">
                  <span className="font-bold text-xs block leading-tight text-black group-hover:text-blue-700 transition-colors">
                    {button.name}
                  </span>
                  <span className="text-[10px] text-blue-600/80 block font-medium">
                    2025
                  </span>
                </div>
                
                {/* Arrow */}
                <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-200 shadow-xs">
                  <span className="text-blue-500 group-hover:text-blue-700 text-[10px] font-bold">→</span>
                </div>
              </div>

              {/* Border Glow */}
              <div className="absolute inset-0 rounded-xl md:rounded-2xl border border-transparent bg-gradient-to-r from-blue-500/10 via-transparent to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ))}
        </div>

        {/* Compact Bottom Info */}
        <div className="relative bg-gradient-to-r from-blue-800 to-black rounded-xl md:rounded-2xl p-2 md:p-3 text-white shadow-lg border border-white/10 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-blue-800/20"></div>
          
          <div className="relative z-10 flex items-center justify-center gap-1.5 md:gap-2">
            <div className="w-4 h-4 md:w-5 md:h-5 bg-white/10 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">⚡</span>
            </div>
            <div className="text-center">
              <h3 className="text-[10px] md:text-xs font-bold mb-0.5 tracking-tight">Limited Seats</h3>
              <p className="text-[10px] text-blue-200 font-medium">
                Apply early for scholarships
              </p>
            </div>
            <div className="w-4 h-4 md:w-5 md:h-5 bg-white/10 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">🎓</span>
            </div>
          </div>
        </div>

        {/* Compact Stats */}
        <div className="mt-2 md:mt-3 flex justify-center items-center gap-3 md:gap-4">
          <div className="text-center">
            <div className="text-xs md:text-sm font-black text-black">50K+</div>
            <div className="text-[10px] text-blue-800/80 font-medium">Students</div>
          </div>
          <div className="w-0.5 h-4 bg-gradient-to-b from-blue-400 to-blue-600"></div>
          <div className="text-center">
            <div className="text-xs md:text-sm font-black text-black">500+</div>
            <div className="text-[10px] text-blue-800/80 font-medium">Colleges</div>
          </div>
          <div className="w-0.5 h-4 bg-gradient-to-b from-blue-400 to-blue-600"></div>
          <div className="text-center">
            <div className="text-xs md:text-sm font-black text-black">95%</div>
            <div className="text-[10px] text-blue-800/80 font-medium">Success</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionButtons;
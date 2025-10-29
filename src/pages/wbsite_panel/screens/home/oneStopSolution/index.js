import React, { useContext } from 'react';
import { 
  MagnifyingGlassIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  TrophyIcon,
  CurrencyDollarIcon,
  BookOpenIcon,
  CheckCircleIcon,
  SparklesIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';

import { Context } from '../../../../../Context_holder';

function OneStopSolution() {
  const {setuserSignUp_popup,user}=useContext(Context)
  const navigater=useNavigate()
  
  const solutions = [
    {
      icon: <MagnifyingGlassIcon className="h-4 w-4 md:h-5 w-5" />,
      title: "Select Course",
      description: "Choose career path",
      color: "from-blue-500 to-indigo-600",
      emoji: "🎯"
    },
    {
      icon: <DocumentTextIcon className="h-4 w-4 md:h-5 w-5" />,
      title: "Fill Details",
      description: "Quick info form",
      color: "from-green-500 to-emerald-600",
      emoji: "📝"
    },
    {
      icon: <AcademicCapIcon className="h-4 w-4 md:h-5 w-5" />,
      title: "Explore Options",
      description: "Browse universities",
      color: "from-purple-500 to-violet-600",
      emoji: "🏛️"
    },
    {
      icon: <TrophyIcon className="h-4 w-4 md:h-5 w-5" />,
      title: "Best Match",
      description: "Perfect fit finder",
      color: "from-amber-500 to-orange-600",
      emoji: "🏆"
    },
    {
      icon: <CurrencyDollarIcon className="h-4 w-4 md:h-5 w-5" />,
      title: "Scholarships",
      description: "Financial aid",
      color: "from-rose-500 to-pink-600",
      emoji: "💰"
    },
    {
      icon: <BookOpenIcon className="h-4 w-4 md:h-5 w-5" />,
      title: "Resources",
      description: "Study materials",
      color: "from-cyan-500 to-blue-600",
      emoji: "📚"
    }
  ];

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 py-6 md:py-12 px-3 md:px-4 relative overflow-hidden">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-400/10 to-transparent rounded-full blur-2xl"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Ultra Modern Header */}
        <div className="text-center mb-6 md:mb-10">
          <div className="inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl mb-3 md:mb-4 shadow-xl border border-white/20 backdrop-blur-sm">
            <SparklesIcon className="h-5 w-5 md:h-7 w-7 text-white drop-shadow-lg" />
          </div>
          <h2 className="text-lg md:text-3xl font-black text-slate-900 mb-1 md:mb-2 tracking-tight">
            Our One Stop <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Solution</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-xs md:text-sm leading-relaxed font-medium">
            Complete educational journey in 6 simple steps
          </p>
        </div>

        {/* Futuristic Solutions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 mb-6 md:mb-10">
          {solutions.map((solution, index) => (
            <div 
              key={index}
              className="group relative bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-3 md:p-5 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-white/50 hover:border-blue-200/50 overflow-hidden"
            >
              {/* Futuristic Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon with futuristic design */}
              <div className="relative mb-2 md:mb-3">
                <div className={`w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r ${solution.color} rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 border border-white/30`}>
                  <div className="text-white drop-shadow-sm">
                    {solution.icon}
                  </div>
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-4 h-4 md:w-5 md:h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                  <CheckCircleIcon className="h-2.5 w-2.5 md:h-3 w-3 text-white" />
                </div>
              </div>

              {/* Content with smaller text */}
              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-sm md:text-base">{solution.emoji}</span>
                  <h3 className="text-xs md:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {solution.title}
                  </h3>
                </div>
                <p className="text-slate-600 text-xs md:text-xs leading-tight font-medium">
                  {solution.description}
                </p>
              </div>

              {/* Step Number with futuristic design */}
              <div className="absolute top-2 md:top-3 right-2 md:right-3 w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-slate-100 to-slate-200 rounded-full flex items-center justify-center shadow-sm border border-white/50">
                <span className="text-slate-700 font-black text-xs">{index + 1}</span>
              </div>

              {/* Futuristic Arrow */}
              <div className="absolute bottom-2 right-2 w-4 h-4 md:w-5 md:h-5 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                <ArrowRightIcon className="h-2.5 w-2.5 md:h-3 w-3 text-blue-600" />
              </div>
            </div>
          ))}
        </div>

        {/* Ultra Compact Process Flow */}
        <div className="mb-6 md:mb-10">
          <div className="text-center mb-3 md:mb-5">
            <h3 className="text-sm md:text-xl font-black text-slate-900 mb-1 tracking-tight">Simple 6-Step Process</h3>
            <p className="text-slate-600 text-xs md:text-sm font-medium">Streamlined journey</p>
          </div>
          
          {/* Futuristic Process Steps */}
          <div className="flex flex-wrap justify-center items-center gap-1.5 md:gap-3">
            {solutions.map((solution, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center text-center group">
                  <div className={`w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r ${solution.color} rounded-full flex items-center justify-center shadow-lg mb-1 border border-white/30 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-white font-black text-xs">{index + 1}</span>
                  </div>
                  <span className="text-[7px] font-bold text-slate-700 max-w-16 md:max-w-16 leading-tight">{solution.title}</span>
                </div>
                {index < solutions.length - 1 && (
                  <div className="hidden sm:block w-3 md:w-4 h-0.5 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Futuristic Bottom CTA */}
        <div className="text-center">
          <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl md:rounded-3xl p-4 md:p-6 text-white shadow-2xl border border-white/20 backdrop-blur-sm overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-transparent to-purple-400/20 animate-pulse"></div>
            
            <div className="relative z-10">
              <h3 className="text-sm md:text-xl font-black mb-1 md:mb-3 tracking-tight">Ready to Start Your Journey?</h3>
              <p className="text-blue-100 text-xs md:text-sm mb-3 md:mb-5 max-w-xl mx-auto font-medium">
                Join thousands of successful students
              </p>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center">

                {/* <button className="bg-white text-blue-600 font-black py-2 md:py-3 px-4 md:px-6 rounded-xl md:rounded-2xl hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg text-xs md:text-sm border border-white/50"
                

                onClick={()=>{
                  !user?
                  setuserSignUp_popup(true):navigater("/allUniversity")
                }}
                >
                  Get Started Now
                </button> */}
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneStopSolution;

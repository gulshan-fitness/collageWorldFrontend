import React, { useContext, useEffect, useState } from 'react';
import UniversityDiv from '../../../components/common/universityDiv/page';
import AnimatedText from './animateheading';
import { Context } from '../../../../../Context_holder';
import { useSearchParams } from 'react-router-dom';

const CourseType = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { course_fetch,course
  }=useContext(Context)

  useEffect(()=>{
      window.scrollTo({ top: 0, behavior: 'smooth' });
    if(activeFilter!=='all'){
      const query={}
      query.courseType=activeFilter

      setSearchParams(query);
    course_fetch(null, window.location.search.toString());
    }
   
  },[activeFilter])

  const filterCategories = [
    { 
      id: 'all', 
      name: 'All Streams', 
      icon: '🎓', 
      gradient: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500'
    },
    { 
      id: 'ugCourse', 
      name: 'UG Course', 
      icon: '📚', 
      gradient: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500'
    },
    { 
      id: 'pgCourse', 
      name: 'PG Course', 
      icon: '🎯', 
      gradient: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-500'
    },
    { 
      id: 'abroadStudy', 
      name: 'Abroad Study', 
      icon: '🌍', 
      gradient: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-500'
    },
    { 
      id: 'certificateProgram', 
      name: 'Certificate Programme', 
      icon: '📜', 
      gradient: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-500'
    },
    { 
      id: 'onlineCourse', 
      name: 'Online Study', 
      icon: '💻', 
      gradient: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500'
    },
    { 
      id: 'distanceCourse', 
      name: 'Distance Study', 
      icon: '🌐', 
      gradient: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500'
    }
  ];

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative w-full py-5">
      {/* Mobile Filter Options */}
      <div className="md:hidden w-full bg-white shadow-sm border-b border-gray-200 mb-4">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Filter Options</h3>
            <button
              onClick={toggleSidebar}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300"
            >
              {isSidebarOpen ? 'Close' : 'Filters'} ✨
            </button>
          </div>
          
          {/* Mobile horizontal scroll filters */}
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {filterCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleFilterChange(category.id)}
                className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeFilter === category.id
                    ? `bg-gradient-to-r ${category.gradient} text-white shadow-md`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm font-medium whitespace-nowrap">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-80 bg-white shadow-lg border-r border-gray-200 h-fit sticky top-4">
          <div className="p-6">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">🎯</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Filter Courses
                </h2>
              </div>
              <p className="text-gray-500 text-sm">Choose your preferred course category</p>
            </div>

            {/* Filter Categories */}
            <div className="space-y-3">
              {filterCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleFilterChange(category.id)}
                  className={`group w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                    activeFilter === category.id
                      ? `bg-gradient-to-r ${category.gradient} text-white shadow-md`
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-sm border border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activeFilter === category.id 
                        ? 'bg-white/20' 
                        : 'bg-white shadow-sm'
                    }`}>
                      <span className="text-xl">{category.icon}</span>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-sm">{category.name}</p>
                      <p className={`text-xs ${activeFilter === category.id ? 'text-white/80' : 'text-gray-500'}`}>
                        Educational Programs
                      </p>
                    </div>
                  </div>
                  
                  {activeFilter === category.id && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/50" onClick={toggleSidebar}></div>
            <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl">
              <div className="p-6 pt-16 h-full overflow-y-auto">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xl">🎯</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">
                      Filter Courses
                    </h2>
                  </div>
                  <button
                    onClick={toggleSidebar}
                    className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200"
                  >
                    ✕
                  </button>
                </div>

                {/* Mobile Filter Categories */}
                <div className="space-y-3">
                  {filterCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleFilterChange(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                        activeFilter === category.id
                          ? `bg-gradient-to-r ${category.gradient} text-white shadow-md`
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          activeFilter === category.id 
                            ? 'bg-white/20' 
                            : 'bg-white shadow-sm'
                        }`}>
                          <span className="text-xl">{category.icon}</span>
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-sm">{category.name}</p>
                          <p className={`text-xs ${activeFilter === category.id ? 'text-white/80' : 'text-gray-500'}`}>
                            Educational Programs
                          </p>
                        </div>
                      </div>
                      
                      {activeFilter === category.id && (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 md:pl-6">
          <div className="w-full">
            <div className="flex flex-col items-center">
              <AnimatedText/>
              
              {/* Integrated Filter Display and Motivational Text */}
              <div className="w-full max-w-6xl mx-auto mt-6 mb-6 px-4">
                <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-white text-2xl">🎯</span>
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">
                          {activeFilter === 'all' ? 'All Available Courses' : `${filterCategories.find(cat => cat.id === activeFilter)?.name}`}
                        </h2>
                        <p className="text-sm md:text-base text-gray-600">
                          {activeFilter === 'all' ? 'Explore all educational opportunities' : 'Filtered results for your selection'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Clear Filter Button */}
                    {activeFilter !== 'all' && (
                      <button
                        onClick={() => handleFilterChange('all')}
                        className="bg-white text-gray-700 px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-300 font-medium text-xs md:text-sm shadow-sm"
                      >
                        Clear Filter ✕
                      </button>
                    )}
                  </div>
                  
                  {/* Motivational Text */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">💡</span>
                      </div>
                      <p className="text-gray-800 font-semibold text-base md:text-lg">
                        <span className="text-blue-600">Stream Choice Hai Important,</span> 
                        <span className="text-purple-600 ml-2">Career Mein Lakhon Ka Investment Hai!</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full">

                <UniversityDiv activeFilter={activeFilter} />
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseType;

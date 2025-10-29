import React, { useContext } from 'react';

const CourseTypeSidebar = ({ activeFilter, onFilterChange, isSidebarOpen, onToggleSidebar }) => {
  const filterCategories = [
    { 
      id: 'all', 
      name: 'All Streams', 
      icon: '🎓', 
      gradient: 'from-blue-500 to-blue-600',
      shadow: 'shadow-blue-200',
      count: 'All'
    },
    { 
      id: 'ug', 
      name: 'UG Course', 
      icon: '📚', 
      gradient: 'from-purple-500 to-purple-600',
      shadow: 'shadow-purple-200',
      count: 'Bachelor'
    },
    { 
      id: 'pg', 
      name: 'PG Course', 
      icon: '🎯', 
      gradient: 'from-indigo-500 to-indigo-600',
      shadow: 'shadow-indigo-200',
      count: 'Master'
    },
    { 
      id: 'abroad', 
      name: 'Abroad Study', 
      icon: '🌍', 
      gradient: 'from-emerald-500 to-emerald-600',
      shadow: 'shadow-emerald-200',
      count: 'Global'
    },
    { 
      id: 'certificate', 
      name: 'Certificate Programme', 
      icon: '📜', 
      gradient: 'from-amber-500 to-amber-600',
      shadow: 'shadow-amber-200',
      count: 'Cert'
    },
    { 
      id: 'online', 
      name: 'Online Study', 
      icon: '💻', 
      gradient: 'from-orange-500 to-orange-600',
      shadow: 'shadow-orange-200',
      count: 'Digital'
    }
  ];

  return (
    <>
      {/* Mobile hamburger button */}
      <div className="md:hidden fixed top-20 left-4 z-50">
        <button
          onClick={onToggleSidebar}
          className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-4 border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
            <span className={`block h-0.5 w-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ${isSidebarOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 ${isSidebarOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full transition-all duration-300 ${isSidebarOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-sm shadow-2xl border-r border-gray-100 z-40 pt-20">
        <div className="p-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Filter Courses
              </h2>
            </div>
            <p className="text-gray-500 text-sm">Choose your preferred course category</p>
          </div>

          {/* Filter Categories */}
          <div className="space-y-3">
            {filterCategories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => onFilterChange(category.id)}
                className={`group w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] ${
                  activeFilter === category.id
                    ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg ${category.shadow}`
                    : 'bg-gray-50/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-100'
                }`}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    activeFilter === category.id 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-white shadow-sm group-hover:shadow-md'
                  }`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm">{category.name}</p>
                    <p className={`text-xs ${activeFilter === category.id ? 'text-white/80' : 'text-gray-500'}`}>
                      {category.count} Programs
                    </p>
                  </div>
                </div>
                
                {activeFilter === category.id && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
          
          {/* Active filter summary */}
          {activeFilter !== 'all' && (
            <div className="mt-8 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="font-semibold text-gray-800">Active Filter</p>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Showing: <span className="font-medium text-blue-700">{filterCategories.find(cat => cat.id === activeFilter)?.name}</span>
              </p>
              <button
                onClick={() => onFilterChange('all')}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm py-2.5 px-4 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                Clear Filter
              </button>
            </div>
          )}

          {/* Stats Card */}
          <div className="mt-6 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-white text-xl">📊</span>
              </div>
              <p className="text-xs text-gray-600 font-medium">Explore diverse educational opportunities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onToggleSidebar}></div>
        <div className={`absolute left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-sm shadow-2xl transform transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-6 pt-20 h-full overflow-y-auto">
            {/* Mobile Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">🎯</span>
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Filter Courses
                </h2>
              </div>
              <button
                onClick={onToggleSidebar}
                className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors duration-200"
              >
                ✕
              </button>
            </div>

            {/* Mobile Filter Categories */}
            <div className="space-y-3">
              {filterCategories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => onFilterChange(category.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                    activeFilter === category.id
                      ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg`
                      : 'bg-gray-50 text-gray-700 hover:bg-white hover:shadow-md border border-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      activeFilter === category.id 
                        ? 'bg-white/20' 
                        : 'bg-white shadow-sm'
                    }`}>
                      <span className="text-2xl">{category.icon}</span>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-sm">{category.name}</p>
                      <p className={`text-xs ${activeFilter === category.id ? 'text-white/80' : 'text-gray-500'}`}>
                        {category.count} Programs
                      </p>
                    </div>
                  </div>
                  
                  {activeFilter === category.id && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
            
            {/* Mobile Active filter summary */}
            {activeFilter !== 'all' && (
              <div className="mt-6 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="font-semibold text-gray-800">Active Filter</p>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Showing: <span className="font-medium text-blue-700">{filterCategories.find(cat => cat.id === activeFilter)?.name}</span>
                </p>
                <button
                  onClick={() => onFilterChange('all')}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm py-2.5 px-4 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 font-medium shadow-lg"
                >
                  Clear Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseTypeSidebar;

import React, { useState, useEffect, useRef } from "react";

const BlogTopSection = ({ search_handler, recent_post_handler }) => {
  const [search_heading, setSearch_heading] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("latest");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const searchRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    search_handler(search_heading);
    setIsSearchFocused(false);
    if (window.innerWidth < 1024) {
      setShowSearchBar(false);
    }
  };

  const handleFilterClick = (filterType) => {
    setActiveFilter(filterType);
    recent_post_handler(filterType);
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(false);
    }
  };

  const timeFilters = [
    { key: "past24Hours", label: "Latest", icon: "🕒", mobileIcon: "⚡" },
    
    { key: "thisWeek", label: "This Week", icon: "📅", mobileIcon: "🗓️" },
    { key: "thisMonth", label: "This Month", icon: "🗓️", mobileIcon: "📊" },
  ];

  const quickSearches = [
    "React Tutorials", 
    "Web Development", 
    "UI/UX Design", 
    "JavaScript",
    "CSS Framework",
    "Mobile Development"
  ];

  return (
    <>
      {/* Main Navigation */}
      <div className="w-full sticky top-0 z-50 mb-8 lg:mb-12">
        {/* Background with Glass Effect */}
        <div className={`absolute inset-0 backdrop-blur-xl transition-all duration-500 ${
          isScrolled 
            ? "bg-white/95 dark:bg-gray-900/98 border-b border-gray-200/60 dark:border-gray-700/60 shadow-2xl shadow-blue-500/10" 
            : "bg-gradient-to-r from-white/90 to-blue-50/80 dark:from-gray-900/95 dark:to-blue-950/80"
        }`}></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between py-4 gap-8">
            
            {/* Brand Section */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <span className="text-white text-xl">✨</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
                  Event
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Discover Amazing Content
                </p>
              </div>
            </div>

            {/* Time Filters - Desktop */}
            <div className="flex items-center gap-2 p-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-gray-500/5 flex-1 justify-center max-w-2xl">
              {timeFilters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => handleFilterClick(filter.key)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 font-medium text-sm min-w-[120px] justify-center ${
                    activeFilter === filter.key
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 transform scale-105"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-gray-700/80 hover:shadow-md"
                  }`}
                >
                  <span className="text-lg">{filter.icon}</span>
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>

            {/* Search Section - Desktop */}
            <div ref={searchRef} className="flex-shrink-0 w-96">
              <div className={`relative transition-all duration-500 ${
                isSearchFocused ? 'scale-105' : 'scale-100'
              }`}>
                <form onSubmit={handleSearch}>
                  <div className={`relative backdrop-blur-xl rounded-2xl transition-all duration-500 ${
                    isSearchFocused 
                      ? 'bg-white/95 dark:bg-gray-800/95 shadow-2xl shadow-blue-500/30 ring-2 ring-blue-500/30' 
                      : 'bg-white/80 dark:bg-gray-800/80 shadow-lg shadow-gray-500/10 hover:shadow-xl hover:shadow-blue-500/15'
                  }`}>
                    <input
                      type="text"
                      placeholder="Search articles, topics, authors..."
                      value={search_heading}
                      onChange={(e) => setSearch_heading(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      className="w-full px-6 py-4 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base rounded-2xl"
                    />
                    
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </form>

                {/* Search Suggestions */}
                {isSearchFocused && search_heading && (
                  <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-gray-500/20 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden z-50 animate-slideDown">
                    <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick searches</p>
                    </div>
                    <div className="p-2 max-h-60 overflow-y-auto">
                      {quickSearches
                        .filter(item => item.toLowerCase().includes(search_heading.toLowerCase()))
                        .map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSearch_heading(suggestion);
                              search_handler(suggestion);
                              setIsSearchFocused(false);
                            }}
                            className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors duration-200 text-gray-700 dark:text-gray-300 flex items-center gap-3"
                          >
                            <span className="text-blue-500">🔍</span>
                            {suggestion}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* Mobile Header */}
            <div className="flex items-center justify-between py-4">
              {/* Brand */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">✨</span>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">
                  Events
                </h1>
              </div>

              {/* Mobile Actions */}
              <div className="flex items-center gap-2">
                
                {/* <button
                  onClick={() => setShowSearchBar(!showSearchBar)}
                  className="w-10 h-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:scale-110 transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button> */}

                {/* Mobile Menu Toggle */}
                {/* <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="w-10 h-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:scale-110 transition-all duration-300"
                >
                  <div className={`flex flex-col gap-1 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}>
                    <div className="w-5 h-0.5 bg-gray-600 dark:bg-gray-300 rounded"></div>
                    <div className="w-5 h-0.5 bg-gray-600 dark:bg-gray-300 rounded"></div>
                    <div className="w-5 h-0.5 bg-gray-600 dark:bg-gray-300 rounded"></div>
                  </div>
                </button> */}


              </div>
            </div>

            {/* Mobile Search Bar */}
           
              <div ref={searchRef} className="pb-4 animate-slideDown">
                <form onSubmit={handleSearch} className="relative">
                  <div className="relative backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-2xl shadow-blue-500/20 border border-gray-200/50 dark:border-gray-700/50">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={search_heading}
                      onChange={(e) => setSearch_heading(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      className="w-full px-4 py-4 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base rounded-2xl"
                    />
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            

           

            {/* Mobile Time Filters - Horizontal Scroll */}
            <div className="pb-4 overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 min-w-max">
                {timeFilters.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => handleFilterClick(filter.key)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 text-sm whitespace-nowrap flex-shrink-0 ${
                      activeFilter === filter.key
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50"
                    }`}
                  >
                    <span className="text-base">{filter.mobileIcon}</span>
                    <span>{filter.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default BlogTopSection;
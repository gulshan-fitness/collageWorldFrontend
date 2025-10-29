import React, { useState, useEffect, useContext } from 'react';
import Post from '../screens/blogs/post/post';
import PostTopSection from '../screens/blogs/blogtopsection/blogTop';
import { Context } from '../../../Context_holder';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import parse from "html-react-parser";
import axios from 'axios';

export default function EventExplore_page() {
  const { event_fetch, event,user,setapply_popUpIsOpen,setuserSignUp_popup } = useContext(Context);

  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [Heading_Terms, setHeading_Terms] = useState("");
  const [posted_time, setposted_time] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const search_handler = (search_term) => {
    setHeading_Terms(search_term);
  };

  const recent_post_handler = (posted_time) => {
    setposted_time(posted_time);
  };

  useEffect(() => {
    const query = {};
    
    if (Heading_Terms !== "") {
      query.heading = Heading_Terms;
    }
    
    if (posted_time !== "") {
      query.posted = posted_time;
    }
    
    setSearchParams(query);
    event_fetch(null, null, window.location.search.toString());
  }, [Heading_Terms, posted_time]);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCurrentPage(prev => prev + 1);
    setDisplayedPosts(posts?.slice(0, (currentPage + 1) * 6));
    
    setIsLoadingMore(false);
    setLoading(false);
  };

  // Calculate if we should show load more
  const shouldShowLoadMore = displayedPosts.length < (posts?.length || 0);

//   const Ragister_handler=()=>{



// if(user){

//   const Enquiry={}
//   axios
//   .patch(
//     process.env.REACT_APP_API_BASE_URL +
//     process.env.REACT_APP_USER_URL +
//     "enquiry_edit/" +
//     user?._id,Enquiry
    
//   )
//   .then((success) => {
   
//     if (success.data.status === 1) {
      
//       setapply_popUpIsOpen(true)
//     }
//   })
//   .catch((error) => {
//     console.log(error);
//   });




// }

// else{
//   setuserSignUp_popup(true)
// }

//     }

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/10">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl animate-float-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-indigo-500/2 rounded-full blur-3xl animate-float-medium delay-500"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      <div className={`relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 text-sm text-gray-600 dark:text-gray-300 mb-6 shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Discover Amazing Events
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-6 leading-tight">
            Events &
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Stories
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Explore captivating events and inspiring stories from our vibrant community
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-10">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">500+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">10K+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Participants</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">50+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Categories</div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-12 lg:mb-16">
          <div className="max-w-6xl mx-auto">
            <PostTopSection 
              search_handler={search_handler} 
              recent_post_handler={recent_post_handler}
            />
          </div>
        </div>

        {/* Posts Grid */}
        <div className="mb-16 lg:mb-20">
          {event?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
           {event?.map((post, index) => (
  <Link to={`/college_event/${post?._id}`}
    key={post?._id}
    className="group relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-200/60 dark:border-gray-700/60 hover:border-blue-300/80 dark:hover:border-blue-400/60 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02] overflow-hidden"
    style={{
      animationDelay: `${index * 150}ms`,
      animation: 'cardEntrance 0.8s ease-out forwards'
    }}
  >
    {/* Premium Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/3 group-hover:via-purple-500/2 group-hover:to-pink-500/2 transition-all duration-700 rounded-3xl z-0"></div>
    
    {/* Animated Shine Effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-0"></div>
    
    {/* Content Container */}
    <div className="relative z-10">
      {/* Event Header with Image */}
      <div className="relative h-48 overflow-hidden">
        {/* Event Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700">
          {post.college_id?.university_banner?.[0] ? (
            <img 
              src={`${process.env.REACT_APP_API_IMAGE_URL}event_image/${post?.logo}`}
              alt={post.heading}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-white text-6xl opacity-20">🎓</div>
            </div>
          )}
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* College Badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-3 py-1.5 rounded-2xl border border-white/20 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                {post.college_id?.college_name || "University"}
              </span>
            </div>
          </div>
        </div>
        
        {/* Date Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-black/40 backdrop-blur-sm px-3 py-2 rounded-2xl border border-white/10">
            <div className="text-white text-center">
              <div className="text-xs font-light">Event Date</div>
              <div className="text-sm font-bold">{new Date(post.date).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
        
        {/* Event Title */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white line-clamp-2 leading-tight">
            {post.heading}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-white/80 text-sm">{post.location}</span>
          </div>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        {/* Description */}

        <p className='preview  line-clamp-2'>
          { post?.description&& parse(post?.description)}
        </p>
        
        
        {/* College Info */}
        <div className="flex items-center gap-3 p-3 bg-gray-50/80 dark:bg-gray-800/50 rounded-2xl mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-bold">🎓</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
              {post.college_id?.college_name}
            </h4>
            <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
              {post.college_id?.city}, {post.college_id?.state}
            </p>
          </div>
        </div>

        {/* Event Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 p-2 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Time</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">{post.time}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-2 bg-purple-50/50 dark:bg-purple-900/20 rounded-xl">
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Type</div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
                {post.college_id?.type || "Conference"}
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.college_id?.affiliatedTo?.slice(0, 3).map((affiliation, idx) => (
            <span 
              key={idx}
              className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200 text-xs rounded-full border border-gray-200/50 dark:border-gray-600/50"
            >
              {affiliation.trim()}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 text-sm">
           View More
          </button>
        
        </div>
      </div>
    </div>

    {/* Hover Glow Effect */}
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/5 group-hover:to-pink-500/10 transition-all duration-700 pointer-events-none"></div>
  </Link>
))}

{/* Add these styles to your CSS */}
<style jsx>{`
  @keyframes cardEntrance {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`}</style>
            </div>
          ) : (
            /* Premium Empty State */
            <div className="text-center py-20 lg:py-28">
              <div className="max-w-md mx-auto">
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl flex items-center justify-center shadow-lg">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                  No Events Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                  We couldn't find any events matching your criteria. Try adjusting your search filters.
                </p>
                <button 
                  onClick={() => { setHeading_Terms(""); setposted_time(""); }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Load More Section */}
        {shouldShowLoadMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
            >
              {/* Animated background shine */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              {/* Loading spinner */}
              {isLoadingMore ? (
                <div className="flex items-center gap-3">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading Events...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Load More Events
                  <svg 
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              )}
            </button>
          </div>
        )}

        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
          <button className="w-12 h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 rounded-2xl shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 group">
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <button className="w-12 h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 rounded-2xl shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 group">
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          50% { transform: translateX(10px) translateY(-15px); }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
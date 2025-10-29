


import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../../Context_holder';
import StarRatings from "react-star-ratings";
import { FaUsers, FaSchool, FaStar, FaStarHalfAlt, FaStream, FaBlog, FaNewspaper, FaRegFileAlt } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);


export default function Dashboard() {

const createGradient = (ctx, colorStops) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  colorStops?.forEach(stop => {
    gradient.addColorStop(stop?.offset ?? 0, stop?.color ?? 'rgba(0,0,0,0)');
  });
  return gradient;
};

// Chart options
const premiumOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#6B7280',
        font: {
          size: 12,
          family: 'Inter, sans-serif',
          weight: '600',
        },
        usePointStyle: true,
        padding: 20,
      },
    },
    title: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      titleColor: '#1F2937',
      bodyColor: '#374151',
      borderColor: '#E5E7EB',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      boxPadding: 4,
      usePointStyle: true,
      callbacks: {
        label: function (context) {
          return `${context?.dataset?.label ?? ''}: ${context?.parsed?.y ?? 0}`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        color: '#6B7280',
        font: {
          size: 11,
          family: 'Inter, sans-serif',
        },
      },
    },
    y: {
      grid: {
        color: 'rgba(107, 114, 128, 0.1)',
        drawBorder: false,
      },
      ticks: {
        color: '#6B7280',
        font: {
          size: 11,
          family: 'Inter, sans-serif',
        },
        padding: 10,
      },
    },
  },
  elements: {
    bar: {
      borderRadius: 6,
      borderSkipped: false,
    },
  },
  animation: {
    duration: 1000,
    easing: 'easeInOutQuart',
  },
};


  const {users_fetch , allusers, colleges, college_fetch,review_fetch,review,rating ,rating_fetch,top10College,college_fetch_by_ratings,rounded_rating,topCourses,top10course_fetch,stream_fetch,stream,website_blog_fetch,website_blog,website_news_fetch,website_news,websitestory_fetch,websitestory, monthly_users_fetch,college_enquiry_users_fetch,college_enquiry_users,
    monthly_users,course_enquiry_users,course_enquiry_users_fetch,city_enquiry_users_fetch,city_enquiry_users,admin} = useContext(Context);


  
  useEffect(
    ()=>{
      if(admin?.role=="Superadmin")  {college_fetch()}
        
        users_fetch()
      
        review_fetch()
        rating_fetch()
        college_fetch_by_ratings()
        top10course_fetch()
        stream_fetch()
        website_blog_fetch()
        website_news_fetch()
        websitestory_fetch();
        monthly_users_fetch()
        college_enquiry_users_fetch()
        course_enquiry_users_fetch()
        city_enquiry_users_fetch()

    },
    [admin]
  )
   
  
  const chartData = {
    labels: monthly_users?.map((item) => item.month),
    datasets: [
      {
        label: 'Monthly Signups',
        data: monthly_users?.map((item) => item.signups),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', 
          '#FF9F40', '#66FF66', '#CC99FF', '#FF6666', '#00CCFF'
        ], // Colors for each bar
        borderColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', 
          '#FF9F40', '#66FF66', '#CC99FF', '#FF6666', '#00CCFF'
        ], // Matching border colors for bars
        borderWidth: 1,
      },
    ],
  };
  

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Signups: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Signups',
        },
        beginAtZero: true,
        grid: {
          borderColor: '#e5e7eb', // Tailwind CSS gray color
          borderWidth: 1,
        },
      },
    },
  };



  const college_enquiry_chartData = {
    labels: college_enquiry_users?.map((item) => item.collegeName),
    datasets: [
      {
        label: 'Top Colleges Enquiry',
        data: college_enquiry_users?.map((item) => item.userCount),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#66FF66', '#CC99FF', '#FF6666', '#00CCFF'
        ],
        borderColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#66FF66', '#CC99FF', '#FF6666', '#00CCFF'
        ],
        borderWidth: 1,
      },
    ],
  };
  




  const college_enquiry_options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Enquiry For Colleges: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Colleges',
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Enquiry For Colleges',
        },
        beginAtZero: true,
        grid: {
          borderColor: '#e5e7eb', // Tailwind CSS gray color
          borderWidth: 1,
        },
      },
    },
  };
  


console.log(course_enquiry_users,"course_enquiry_users");


  
  const course_enquiry_chartData = {
    labels: course_enquiry_users?.map((item) => item.course_name),
    datasets: [
      {
        label: 'Top Courses Enquiry',
        data: course_enquiry_users?.map((item) => item.userCount),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#66FF66', '#CC99FF', '#FF6666', '#00CCFF'
        ],
        borderColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#66FF66', '#CC99FF', '#FF6666', '#00CCFF'
        ],
        borderWidth: 1,
      },
    ],
  };
  


  const course_enquiry_options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Enquiry For Courses: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Courses',
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Enquiry For Courses',
        },
        beginAtZero: true,
        grid: {
          borderColor: '#e5e7eb', // Tailwind CSS gray color
          borderWidth: 1,
        },
      },
    },
  };
  

 
  const city_enquiry_chartData = {

    labels: city_enquiry_users?.map((item) => item.city),
    datasets: [
      {
        label: 'Top City Wise Enquiry',
        data: city_enquiry_users?.map((item) => item.userCount),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#66FF66', '#CC99FF', '#FF6666', '#00CCFF'
        ],
        borderColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#66FF66', '#CC99FF', '#FF6666', '#00CCFF'
        ],
        borderWidth: 1,
      },
    ],
  };
  


  const city_enquiry_options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Enquiry For College City Wise: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Cities',
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Enquiry For College City Wise',
        },
        beginAtZero: true,
        grid: {
          borderColor: '#e5e7eb', // Tailwind CSS gray color
          borderWidth: 1,
        },
      },
    },
  };
  

  return (
    <div className="md:p-10 p-2 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 ">Dashboard</h1>

    

<div className="w-full px-3 sm:px-4 md:px-6 py-4 sm:py-6">
  {/* Premium Dashboard Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
    
    {/* Students Enquiries - Premium Card */}
    <Link 
      to="/admin/enquiries_details" 
      className="group relative bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden border border-gray-100"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
            </svg>
          </div>
          <div className="text-right">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
          Students Enquiries
        </h3>
        <p className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
          {allusers?.users?.length || 0}
        </p>
        <p className="text-xs sm:text-sm text-gray-500">Active student inquiries</p>
        
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>

    {/* Admin Approvals - Premium Card */}
    <Link 
      to="/admin/adminlist" 
      className="group relative bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden border border-gray-100"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
          </div>
          <div className="text-right">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
          Admin Approvals
        </h3>
        <p className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">
          {/* Add your count here */}
        </p>
        <p className="text-xs sm:text-sm text-gray-500">Pending approvals</p>
        
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>

    {/* Total Colleges - Premium Card */}
    <Link 
      to="/admin/college/view" 
      className="group relative bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden border border-gray-100"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-yellow-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
            </svg>
          </div>
          <div className="text-right">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          </div>
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors">
          Total Colleges
        </h3>
        <p className="text-2xl sm:text-3xl font-bold text-yellow-600 mb-1">
          {colleges?.total_count || 0}
        </p>
        <p className="text-xs sm:text-sm text-gray-500">Registered institutions</p>
        
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>

    {/* Total Reviews - Premium Card */}
    <Link 
      to="/admin/review/view" 
      className="group relative bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden border border-gray-100"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
          <div className="text-right">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
          Total Reviews
        </h3>
        <p className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">
          {review?.length || 0}
        </p>
        <p className="text-xs sm:text-sm text-gray-500">User feedback</p>
        
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>

    {/* Total Ratings - Premium Card */}
    <Link 
      to="/admin/rating/view" 
      className="group relative bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden border border-gray-100"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
          <div className="text-right">
            <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
          </div>
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-cyan-600 transition-colors">
          Total Ratings
        </h3>
        <p className="text-2xl sm:text-3xl font-bold text-cyan-600 mb-1">
          {rating?.length || 0}
        </p>
        <p className="text-xs sm:text-sm text-gray-500">User ratings</p>
        
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>

    {/* Streams - Premium Card */}
    <Link 
      to="/admin/stream/view" 
      className="group relative bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden border border-gray-100"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-fuchsia-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </div>
          <div className="text-right">
            <div className="w-3 h-3 bg-fuchsia-400 rounded-full"></div>
          </div>
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
          Streams
        </h3>
        <p className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">
          {stream?.length || 0}
        </p>
        <p className="text-xs sm:text-sm text-gray-500">Academic streams</p>
        
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>

    {/* Website Blogs - Premium Card */}
    <Link 
      to="/admin/website_blog/view" 
      className="group relative bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden border border-gray-100"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
            </svg>
          </div>
          <div className="text-right">
            <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
          </div>
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
          Website Blogs
        </h3>
        <p className="text-2xl sm:text-3xl font-bold text-pink-600 mb-1">
          {website_blog?.length || 0}
        </p>
        <p className="text-xs sm:text-sm text-gray-500">Published articles</p>
        
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>

    {/* Website News - Premium Card */}
    <Link 
      to="/admin/website_news/view" 
      className="group relative bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden border border-gray-100"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"/>
              <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"/>
            </svg>
          </div>
          <div className="text-right">
            <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
          Website News
        </h3>
        <p className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">
          {website_news?.length || 0}
        </p>
        <p className="text-xs sm:text-sm text-gray-500">Latest updates</p>
        
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>

    {/* Website Stories - Premium Card */}
    <Link 
      to="/admin/website_story/view" 
      className="group relative bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden border border-gray-100"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-slate-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gray-500 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
            </svg>
          </div>
          <div className="text-right">
            <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
          </div>
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-600 transition-colors">
          Website Stories
        </h3>
        <p className="text-2xl sm:text-3xl font-bold text-gray-600 mb-1">
          {websitestory?.length || 0}
        </p>
        <p className="text-xs sm:text-sm text-gray-500">Featured stories</p>
        
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>

  </div>
</div>




{/* monthly students signups */}
  <div className="grid grid-cols-1 gap-6 p-4 sm:p-6">
      {/* Monthly Students Join - Premium Card */}
      <div className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-gray-100">
        <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 p-6 sm:p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
          <div className="relative  flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Monthly Students Join</h2>
                <p className="text-blue-100 text-xs sm:text-sm">Student enrollment trends over time</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-xl px-3 sm:px-4 py-1 sm:py-2 backdrop-blur-sm">
              <span className="text-white font-semibold text-xs sm:text-sm">TRENDING</span>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="h-64 sm:h-80 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-4 border border-gray-200">
            <Bar
              data={{
                ...chartData,
                datasets: chartData?.datasets?.map(dataset => ({
                  ...dataset,
                  backgroundColor: createGradient(document.createElement('canvas').getContext('2d'), [
                    { offset: 0, color: 'rgba(59, 130, 246, 0.8)' },
                    { offset: 1, color: 'rgba(139, 92, 246, 0.8)' },
                  ]),
                  borderColor: 'rgba(99, 102, 241, 1)',
                  borderWidth: 2,
                  hoverBackgroundColor: createGradient(document.createElement('canvas').getContext('2d'), [
                    { offset: 0, color: 'rgba(59, 130, 246, 1)' },
                    { offset: 1, color: 'rgba(139, 92, 246, 1)' },
                  ]),
                })) ?? [],
              }}
              options={premiumOptions}
            />
          </div>
        </div>
        <div className="px-4 sm:px-6 pb-6">
          <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
            <div className="bg-blue-50 rounded-xl p-2 sm:p-3">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">1.2K</div>
              <div className="text-blue-600 text-xs font-medium">Total Students</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-2 sm:p-3">
              <div className="text-xl sm:text-2xl font-bold text-purple-600">+18%</div>
              <div className="text-purple-600 text-xs font-medium">Growth</div>
            </div>
            <div className="bg-green-50 rounded-xl p-2 sm:p-3">
              <div className="text-xl sm:text-2xl font-bold text-green-600">94%</div>
              <div className="text-green-600 text-xs font-medium">Retention</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Colleges Enquiry - Premium Card */}
      <div className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-gray-100">
        <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-6 sm:p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
          <div className="relative  flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Top Colleges Enquiry</h2>
                <p className="text-purple-100 text-xs sm:text-sm">Most inquired colleges by students</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-xl px-3 sm:px-4 py-1 sm:py-2 backdrop-blur-sm">
              <span className="text-white font-semibold text-xs sm:text-sm">POPULAR</span>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="h-64 sm:h-80 bg-gradient-to-br from-gray-50 to-pink-50 rounded-2xl p-4 border border-gray-200">
            <Bar
              data={{
                ...college_enquiry_chartData,
                datasets: college_enquiry_chartData?.datasets?.map(dataset => ({
                  ...dataset,
                  backgroundColor: createGradient(document.createElement('canvas').getContext('2d'), [
                    { offset: 0, color: 'rgba(168, 85, 247, 0.8)' },
                    { offset: 1, color: 'rgba(236, 72, 153, 0.8)' },
                  ]),
                  borderColor: 'rgba(219, 39, 119, 1)',
                  borderWidth: 2,
                  hoverBackgroundColor: createGradient(document.createElement('canvas').getContext('2d'), [
                    { offset: 0, color: 'rgba(168, 85, 247, 1)' },
                    { offset: 1, color: 'rgba(236, 72, 153, 1)' },
                  ]),
                })) ?? [],
              }}
              options={premiumOptions}
            />
          </div>
        </div>
        <div className="px-4 sm:px-6 pb-6">
          <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
            <div className="bg-purple-50 rounded-xl p-2 sm:p-3">
              <div className="text-xl sm:text-2xl font-bold text-purple-600">856</div>
              <div className="text-purple-600 text-xs font-medium">Total Enquiries</div>
            </div>
            <div className="bg-pink-50 rounded-xl p-2 sm:p-3">
              <div className="text-xl sm:text-2xl font-bold text-pink-600">24</div>
              <div className="text-pink-600 text-xs font-medium">Colleges</div>
            </div>
            <div className="bg-red-50 rounded-xl p-2 sm:p-3">
              <div className="text-xl sm:text-2xl font-bold text-red-600">+32%</div>
              <div className="text-red-600 text-xs font-medium">Increase</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Courses Enquiry - Premium Card */}
      <div className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-gray-100">
        <div className="relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 p-6 sm:p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
          <div className="relative  flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Top Courses Enquiry</h2>
                <p className="text-green-100 text-xs sm:text-sm">Most popular courses among students</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-xl px-3 sm:px-4 py-1 sm:py-2 backdrop-blur-sm">
              <span className="text-white font-semibold text-xs sm:text-sm">IN DEMAND</span>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="h-64 sm:h-80 bg-gradient-to-br from-gray-50 to-green-50 rounded-2xl p-4 border border-gray-200">
            <Bar
              data={{
                ...course_enquiry_chartData,
                datasets: course_enquiry_chartData?.datasets?.map(dataset => ({
                  ...dataset,
                  backgroundColor: createGradient(document.createElement('canvas').getContext('2d'), [
                    { offset: 0, color: 'rgba(34, 197, 94, 0.8)' },
                    { offset: 1, color: 'rgba(59, 130, 246, 0.8)' },
                  ]),
                  borderColor: 'rgba(139, 92, 246, 1)',
                  borderWidth: 2,
                  hoverBackgroundColor: createGradient(document.createElement('canvas').getContext('2d'), [
                    { offset: 0, color: 'rgba(34, 197, 94, 1)' },
                    { offset: 1, color: 'rgba(59, 130, 246, 1)' },
                  ]),
                })) ?? [],
              }}
              options={premiumOptions}
            />
          </div>
        </div>
        <div className="px-4 sm:px-6 pb-6">
          <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
            <div className="bg-green-50 rounded-xl p-2 sm:p-3">
              <div className="text-xl sm:text-2xl font-bold text-green-600">642</div>
              <div className="text-green-600 text-xs font-medium">Course Enquiries</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-2 sm:p-3">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">18</div>
              <div className="text-blue-600 text-xs font-medium">Courses</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-2 sm:p-3">
              <div className="text-xl sm:text-2xl font-bold text-purple-600">+45%</div>
              <div className="text-purple-600 text-xs font-medium">Growth</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top City Wise Enquiry - Premium Card */}
      <div className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-gray-100">
        <div className="relative bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 p-6 sm:p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
          <div className="relative  flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">City Wise Enquiry</h2>
                <p className="text-yellow-100 text-xs sm:text-sm">Geographical distribution of enquiries</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-xl px-3 sm:px-4 py-1 sm:py-2 backdrop-blur-sm">
              <span className="text-white font-semibold text-xs sm:text-sm">REGIONAL</span>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="h-64 sm:h-80 bg-gradient-to-br from-gray-50 to-orange-50 rounded-2xl p-4 border border-gray-200">
            <Bar
              data={{
                ...city_enquiry_chartData,
                datasets: city_enquiry_chartData?.datasets?.map(dataset => ({
                  ...dataset,
                  backgroundColor: createGradient(document.createElement('canvas').getContext('2d'), [
                    { offset: 0, color: 'rgba(234, 179, 8, 0.8)' },
                    { offset: 1, color: 'rgba(249, 115, 22, 0.8)' },
                  ]),
                  borderColor: 'rgba(239, 68, 68, 1)',
                  borderWidth: 2,
                  hoverBackgroundColor: createGradient(document.createElement('canvas').getContext('2d'), [
                    { offset: 0, color: 'rgba(234, 179, 8, 1)' },
                    { offset: 1, color: 'rgba(249, 115, 22, 1)' },
                  ]),
                })) ?? [],
              }}
              options={premiumOptions}
            />
          </div>
        </div>
        <div className="px-4 sm:px-6 pb-6">
          <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
            <div className="bg-yellow-50 rounded-xl p-2 sm:p-3">
              <div className="text-xl sm:text-2xl font-bold text-yellow-600">28</div>
              <div className="text-yellow-600 text-xs font-medium">Cities</div>
            </div>
            <div className="bg-orange-50 rounded-xl p-2 sm:p-3">
              <div className="text-xl sm:text-2xl font-bold text-orange-600">1.5K</div>
              <div className="text-orange-600 text-xs font-medium">Total</div>
            </div>
            <div className="bg-red-50 rounded-xl p-2 sm:p-3">
              <div className="text-xl sm:text-2xl font-bold text-red-600">+28%</div>
              <div className="text-red-600 text-xs font-medium">Expansion</div>
            </div>
          </div>
        </div>
      </div>
    </div>




{/* top collegs */}
<div className="w-full max-w-4xl mx-auto px-4 py-6">
  {/* Ultra Compact Header */}
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
        </svg>
      </div>
      <div>
        <h1 className="text-lg font-bold text-gray-900">Top Colleges</h1>
        <p className="text-gray-500 text-sm">Ranked by ratings</p>
      </div>
    </div>
  </div>

  {/* Card Grid Layout - Most Compact */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {top10College?.map((college, index) => (
      <div 
        key={index}
        className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-start justify-between">
          {/* Left Section - Rank and Basic Info */}
          <div className="flex items-start space-x-3 flex-1 min-w-0">
            {/* Rank Badge */}
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm flex-shrink-0
              ${index === 0 ? 'bg-yellow-500' :
                index === 1 ? 'bg-gray-500' :
                index === 2 ? 'bg-amber-700' :
                'bg-purple-500'}`}
            >
              {index + 1}
            </div>

            {/* College Info */}
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 text-sm truncate">
                {college?.college_name}
              </h3>
              <div className="flex items-center space-x-1 mt-1">
                <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <span className="text-xs text-gray-600 truncate">
                  {college?.city}, {college?.state}
                </span>
              </div>
            </div>
          </div>

          {/* Right Section - Rating */}
          <div className="flex flex-col items-end space-y-1 flex-shrink-0">
            {/* Star Rating */}
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-3 h-3 ${
                    star <= (rounded_rating(college?.averageRating) ?? 0)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
            
            {/* Rating Number and Badge */}
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-bold ${
                (rounded_rating(college?.averageRating) ?? 0) >= 4.5 ? 'text-green-600' :
                (rounded_rating(college?.averageRating) ?? 0) >= 4.0 ? 'text-amber-600' :
                'text-orange-600'
              }`}>
                {rounded_rating(college?.averageRating) ?? 0}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                (rounded_rating(college?.averageRating) ?? 0) >= 4.5 ? 'bg-green-100 text-green-800' :
                (rounded_rating(college?.averageRating) ?? 0) >= 4.0 ? 'bg-amber-100 text-amber-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {((rounded_rating(college?.averageRating) ?? 0) >= 4.5 ? 'EXC' :
                  (rounded_rating(college?.averageRating) ?? 0) >= 4.0 ? 'GRT' :
                  'GOOD')}
              </span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>




<div className="w-full max-w-7xl mx-auto px-4 py-8">
  {/* Premium Header */}
<div className="relative rounded-2xl mb-6 sm:mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-600 transform -skew-y-1 origin-top-left"></div>
      <div className="relative px-4 py-4 sm:px-8 sm:py-8">
        <div className="flex items-center justify-between flex-col sm:flex-row gap-4 sm:gap-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
                Premium Courses
              </h1>
              <p className="text-blue-100 text-sm sm:text-lg">
                Top-rated academic programs from leading institutions
              </p>
            </div>
          </div>
          <div className="bg-white/20 rounded-xl px-3 sm:px-4 py-1 sm:py-2 backdrop-blur-sm">
            <span className="text-white font-semibold text-xs sm:text-sm">ELITE SELECTION</span>
          </div>
        </div>
      </div>
    </div>

  {/* Premium Courses Grid */}
  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
    {topCourses?.map((course, index) => (
      <div 
        key={course._id}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:scale-105 group overflow-hidden"
      >
        {/* Course Header with Gradient */}
        <div className="relative h-4 bg-gradient-to-r from-blue-500 to-teal-500"></div>
        
        <div className="p-6">
          {/* Rank and Course Type */}
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
              index === 0 ? 'bg-gradient-to-r from-yellow-400 to-amber-500' :
              index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-600' :
              index === 2 ? 'bg-gradient-to-r from-amber-600 to-amber-800' :
              'bg-gradient-to-r from-blue-500 to-teal-500'
            }`}>
              <span className="text-white font-bold text-sm">#{index + 1}</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
              course.courseDetails?.courseType === 'ugCourse' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-purple-100 text-purple-800'
            }`}>
              {course.courseDetails?.courseType === 'ugCourse' ? 'UNDERGRADUATE' : 'POSTGRADUATE'}
            </div>
          </div>

          {/* Course Name */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {course.courseDetails?.courseName}
          </h3>

          {/* College Info */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="min-w-0">
              <h4 className="font-semibold text-gray-800 text-sm truncate">
                {course.collegeDetails?.college_name}
              </h4>
              <p className="text-gray-600 text-xs truncate">
                {course.collegeDetails?.city}, {course.collegeDetails?.state}
              </p>
            </div>
          </div>

          {/* Course Details Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">Duration</div>
              <div className="font-semibold text-gray-900 text-sm">{course.duration} Years</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">Fees</div>
              <div className="font-semibold text-gray-900 text-sm">
                ₹{(course.fees || 0).toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              <span>{course.time}</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
              </svg>
              <span>{course.mode}</span>
            </div>
          </div>

          {/* Rating Section */}
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span className="font-semibold text-gray-800">Rating</span>
              </div>
              <div className={`text-lg font-bold ${
                (course.avgRating || 0) >= 4.5 ? 'text-green-600' :
                (course.avgRating || 0) >= 4.0 ? 'text-amber-600' :
                (course.avgRating || 0) > 0 ? 'text-orange-600' :
                'text-gray-400'
              }`}>
                {course.avgRating || 'N/A'}
              </div>
            </div>
            
            {/* Star Rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${
                      star <= (course.avgRating || 0)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              
              {/* Rating Badge */}
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                (course.avgRating || 0) >= 4.5 ? 'bg-green-100 text-green-800' :
                (course.avgRating || 0) >= 4.0 ? 'bg-amber-100 text-amber-800' :
                (course.avgRating || 0) > 0 ? 'bg-orange-100 text-orange-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {course.avgRating >= 4.5 ? 'EXCELLENT' :
                 course.avgRating >= 4.0 ? 'GREAT' :
                 course.avgRating > 0 ? 'GOOD' :
                 'NOT RATED'}
              </div>
            </div>
          </div>

          {/* Scholarship Info */}
          {course.scholarship && course.scholarship !== "Not Available" && course.scholarship !== "0" && (
            <div className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-medium text-green-800">Scholarship Available</span>
              </div>
              <p className="text-green-700 text-xs mt-1">{course.scholarship}</p>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>

  {/* Footer Stats */}
  <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600">{topCourses?.length || 0}</div>
        <div className="text-gray-600 text-sm">Total Courses</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-teal-600">
          {topCourses?.filter(course => course.courseDetails?.courseType === 'ugCourse').length || 0}
        </div>
        <div className="text-gray-600 text-sm">Undergraduate</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-purple-600">
          {topCourses?.filter(course => course.courseDetails?.courseType === 'pgCourse').length || 0}
        </div>
        <div className="text-gray-600 text-sm">Postgraduate</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-amber-600">
          {topCourses?.filter(course => course.avgRating >= 4).length || 0}
        </div>
        <div className="text-gray-600 text-sm">Highly Rated</div>
      </div>
    </div>
  </div>
</div>



     
     


    </div>
  );
}

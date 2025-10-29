
import React, { useContext, useEffect, useState } from 'react';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaShare, 
  FaBookmark,
  FaArrowLeft,
  FaUsers,

  FaRegBookmark
} from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { Context } from '../../../../../Context_holder';

export default function EventDetails() {

    const {id}=useParams()
    const { event_fetch,current_event}=useContext(Context)
 
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(
    ()=>{
        if(!id) return
event_fetch(id,null)
 window.scrollTo({ top: 0, behavior: 'smooth' });
    },[id]
  )

 
  


  if (!current_event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCalendarAlt className="h-12 w-12 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h3>
          <p className="text-gray-600 mb-6">The event you're looking for doesn't exist.</p>
          
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'long' }),
      year: date.getFullYear(),
      weekday: date.toLocaleString('default', { weekday: 'long' }),
      fullDate: date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
  };

  const dateInfo = formatDate(current_event?.date);



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
    

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Event Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200/50 mb-6">
              <FaCalendarAlt className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-700">University Event</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {current_event?.heading}
            </h1>
            
            {/* Event Meta Info */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
              <div className="flex items-center text-gray-700">
                <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200/50 mr-3">
                  <FaCalendarAlt className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{dateInfo.fullDate}</p>
                  <p className="text-sm text-gray-600">{dateInfo.weekday}</p>
                </div>
              </div>
              
              <div className="flex items-center text-gray-700">
                <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200/50 mr-3">
                  <FaClock className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{current_event?.time}</p>
                  <p className="text-sm text-gray-600">Duration</p>
                </div>
              </div>
              
              <div className="flex items-center text-gray-700">
                <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200/50 mr-3">
                  <FaMapMarkerAlt className="h-5 w-5 text-red-600" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{current_event?.location}</p>
                  <p className="text-sm text-gray-600">Venue</p>
                </div>
              </div>
            </div>
          </div>

          {/* Event Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8 group">
            <div className="aspect-w-16 aspect-h-9 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse">
              <img
                src={`${process.env.REACT_APP_API_BASE_URL}image/event_image/${current_event?.logo}`}
                alt={current_event?.heading}
                className={`w-full h-64 lg:h-96 object-cover transition-all duration-700 group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60"></div>
            
            {/* Date Badge */}
            <div className="absolute top-6 left-6">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
                <div className="text-2xl font-bold text-gray-900">{dateInfo.day}</div>
                <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                  {dateInfo.month}
                </div>
                <div className="text-xs text-gray-500 mt-1">{dateInfo.year}</div>
              </div>
            </div>
          </div>

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 lg:p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <FaUsers className="h-6 w-6 text-purple-600 mr-3" />
                  Event Details
                </h2>
                
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  {current_event?.description && parse(current_event?.description)}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
           

              {/* Quick Info Card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Event Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 font-medium flex items-center">
                      <FaCalendarAlt className="mr-2 text-blue-500" />
                      Date
                    </span>
                    <span className="font-semibold text-gray-900">{dateInfo.fullDate}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 font-medium flex items-center">
                      <FaClock className="mr-2 text-green-500" />
                      Time
                    </span>
                    <span className="font-semibold text-gray-900">{current_event?.time}</span>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 font-medium  mb-2 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-red-500" />
                      Location
                    </span>
                    <span className="font-semibold text-gray-900">{current_event?.location}</span>
                  </div>
                </div>
              </div>

          
            </div>
          </div>

        

          
        </div>
      </div>
    </div>
  );
};



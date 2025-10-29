import React, { useState } from 'react';
import { 
  CalendarDaysIcon, 
  MapPinIcon, 
  ClockIcon,
  UserGroupIcon,
  TicketIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import EventExplore_page from '../../../components/EventExplore_page';

const Events = () => {



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
              <CalendarDaysIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Educational Events
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Join workshops, webinars, and seminars to enhance your knowledge and connect with experts in education.
            </p>
          </div>
        </div>
      </div>

    <EventExplore_page/>
    </div>
  );
};

export default Events;

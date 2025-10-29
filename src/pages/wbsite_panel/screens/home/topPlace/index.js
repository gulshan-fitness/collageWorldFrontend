import React, { useContext, useState } from 'react';
import { Context } from '../../../../../Context_holder';
import { useNavigate } from 'react-router-dom';
import { 
  GlobeAltIcon,
  MapPinIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  BuildingOfficeIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

const places = [
  
  { 
    name: 'Delhi', 
    state: 'Delhi',
    icon: '🏙️', 
    description: 'Capital region with top universities',
    colleges: '500+',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  { 
    name: 'Bangalore', 
    state: 'Karnataka',
    icon: '🌆', 
    description: 'Silicon Valley of India',
    colleges: '300+',
    color: 'from-purple-500 to-indigo-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  { 
    name: 'Hyderabad', 
    state: 'Telangana',
    icon: '🏛️', 
    description: 'Cyberabad tech hub',
    colleges: '250+',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  { 
    name: 'Pune', 
    state: 'Maharashtra',
    icon: '🏯', 
    description: 'Oxford of the East',
    colleges: '200+',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  { 
    name: 'Mumbai', 
    state: 'Maharashtra',
    icon: '🏰', 
    description: 'Commercial capital',
    colleges: '400+',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200'
  },
  { 
    name: 'Chennai', 
    state: 'Tamil Nadu',
    icon: '🏨', 
    description: 'Detroit of India',
    colleges: '180+',
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200'
  },
  { 
    name: 'Kolkata', 
    state: 'West Bengal',
    icon: '🏫', 
    description: 'Cultural capital',
    colleges: '150+',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  },
  { 
    name: 'Ahmedabad', 
    state: 'Gujarat',
    icon: '🏢', 
    description: 'Manchester of India',
    colleges: '120+',
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200'
  },
  { 
    name: 'Jaipur', 
    state: 'Rajasthan',
    icon: '🏯', 
    description: 'Pink City heritage',
    colleges: '100+',
    color: 'from-red-500 to-pink-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  { 
    name: 'Lucknow', 
    state: 'Uttar Pradesh',
    icon: '🏛️', 
    description: 'City of Nawabs',
    colleges: '90+',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200'
  },
  { 
    name: 'Chandigarh', 
    state: 'Chandigarh',
    icon: '🏙️', 
    description: 'Planned city beauty',
    colleges: '80+',
    color: 'from-cyan-500 to-blue-500',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200'
  },
  { 
    name: 'Surat', 
    state: 'Gujarat',
    icon: '🏢', 
    description: 'Diamond city',
    colleges: '70+',
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200'
  },
  { 
    name: 'Kochi', 
    state: 'Kerala',
    icon: '🏖️', 
    description: 'Queen of Arabian Sea',
    colleges: '85+',
    color: 'from-blue-500 to-teal-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  { 
    name: 'Bhopal', 
    state: 'Madhya Pradesh',
    icon: '🏞️', 
    description: 'City of Lakes',
    colleges: '75+',
    color: 'from-green-500 to-blue-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  { 
    name: 'Bhubaneswar', 
    state: 'Odisha',
    icon: '🏛️', 
    description: 'Temple City',
    colleges: '65+',
    color: 'from-orange-500 to-yellow-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  { 
    name: 'Guwahati', 
    state: 'Assam',
    icon: '🌿', 
    description: 'Gateway to Northeast',
    colleges: '60+',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  }
];

const TopStudyPlaces = () => {
  const [showAll, setShowAll] = useState(false);
  const { setcollege_city, setfilterHeading } = useContext(Context);
  const navigater = useNavigate();

  const best_college_handler = (city) => {
    setcollege_city({ value: city });

    navigater("/allUniversity");
    setfilterHeading("Top colleges in");
  };

  // Determine how many places to show based on screen size
  const displayedPlaces = showAll ? places : places?.slice(0, window.innerWidth < 768 ? 8 : 24);

  return (
    <div className="w-full py-8 md:py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full mr-4 shadow-lg">
              <GlobeAltIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
                Top Study Destinations Across India
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full mx-auto"></div>
            </div>
          </div>
          
          <p className="text-md md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 leading-relaxed">
            Explore <span className="font-semibold text-emerald-600">premier educational destinations</span> across 
            different states with world-class institutions and excellent academic opportunities.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <BuildingOfficeIcon className="h-4 w-4 text-blue-600 mr-2" />
              <span className="font-medium">1000+ Institutions</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <AcademicCapIcon className="h-4 w-4 text-green-600 mr-2" />
              <span className="font-medium">Quality Education</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <MapPinIcon className="h-4 w-4 text-purple-600 mr-2" />
              <span className="font-medium">Pan-India Coverage</span>
            </div>
          </div>
        </div>

        {/* Enhanced Places Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {displayedPlaces.map((place, index) => (
            <div
              key={index}
              onClick={() => best_college_handler(place.name)}
              className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-emerald-300 transform hover:-translate-y-2 cursor-pointer ${place.bgColor} ${place.borderColor} border-l-4`}
            >
              {/* Place Header */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{place.icon}</div>
                  <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all duration-200" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors duration-200">
                  {place.name}
                </h3>
                
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <MapPinIcon className="h-3 w-3 mr-1" />
                  <span>{place.state}</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {place.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                    <span className="font-medium">{place.colleges} Colleges</span>
                  </div>
                  <div className="flex items-center text-xs text-emerald-600 font-medium">
                    <span>Explore</span>
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className={`h-1 bg-gradient-to-r ${place.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        <div className="text-center mb-8">
          <button
            className="bg-white hover:bg-gray-50 text-emerald-600 border-2 border-emerald-600 hover:border-emerald-700 px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center mx-auto"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? (
              <>
                <ChevronUpIcon className="h-5 w-5 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDownIcon className="h-5 w-5 mr-2" />
                View More Destinations ({places.length - 4} more)
              </>
            )}
          </button>
        </div>

        {/* Call to Action */}
        {/* <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Find Your Perfect Study Destination</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Discover top colleges and universities across India in your preferred location. 
              Get personalized recommendations based on your academic goals and preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center">
                <GlobeAltIcon className="h-5 w-5 mr-2" />
                Explore All Destinations
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400 px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center">
                <AcademicCapIcon className="h-5 w-5 mr-2" />
                Get Guidance
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TopStudyPlaces;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, A11y, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { 
  TrophyIcon,
  AcademicCapIcon,
  StarIcon,
  UserGroupIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

const PlacedStudents = () => {
  const studentData = [
    {
      imageUrl: "./studentsPlacedData/8_SANDHIYA_MCA_CU.webp",
      name: "Sandhiya",
      course: "MCA",
      college: "Chandigarh University",
      company: "Tech Solutions",
      package: "8.5 LPA",
      rating: 5
    },
    {
      imageUrl: "./studentsPlacedData/13_Rudransh Singh Chauhan_BCA_Manipal.webp",
      name: "Rudransh Singh Chauhan",
      course: "BCA",
      college: "Manipal University",
      company: "Software Corp",
      package: "6.2 LPA",
      rating: 5
    },
    {
      imageUrl: "./studentsPlacedData/3_Varun_BA_LPU.webp",
      name: "Varun",
      course: "BA",
      college: "Lovely Professional University",
      company: "Marketing Pro",
      package: "4.5 LPA",
      rating: 4
    },
    {
      imageUrl: "./studentsPlacedData/8_SANDHIYA_MCA_CU.webp",
      name: "Priya Sharma",
      course: "MBA",
      college: "Delhi University",
      company: "Consulting Firm",
      package: "12.0 LPA",
      rating: 5
    },
    {
      imageUrl: "./studentsPlacedData/3_Varun_BA_LPU.webp",
      name: "Amit Kumar",
      course: "B.Tech",
      college: "IIT Delhi",
      company: "Google",
      package: "25.0 LPA",
      rating: 5
    },
    {
      imageUrl: "./studentsPlacedData/8_SANDHIYA_MCA_CU.webp",
      name: "Neha Patel",
      course: "MBA",
      college: "IIM Bangalore",
      company: "McKinsey",
      package: "35.0 LPA",
      rating: 5
    }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <StarSolidIcon
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="w-full py-8 md:py-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full mr-4 shadow-lg">
              <TrophyIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Our Best Placed Students</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full mx-auto"></div>
            </div>
          </div>
          
          {/* Success Statistics */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-yellow-600 mb-2">80,899+</div>
                <div className="text-lg font-semibold text-gray-700">Students Placed</div>
                <div className="text-sm text-gray-500">Across top companies</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-green-600 mb-2">95%</div>
                <div className="text-lg font-semibold text-gray-700">Success Rate</div>
                <div className="text-sm text-gray-500">Placement guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-2">500+</div>
                <div className="text-lg font-semibold text-gray-700">Partner Companies</div>
                <div className="text-sm text-gray-500">Industry leaders</div>
              </div>
            </div>
          </div>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 leading-relaxed">
            Meet our <span className="font-semibold text-yellow-600">successful graduates</span> who have 
            secured amazing career opportunities in top companies.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <CheckBadgeIcon className="h-4 w-4 text-green-600 mr-2" />
              <span className="font-medium">Verified Placements</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <UserGroupIcon className="h-4 w-4 text-blue-600 mr-2" />
              <span className="font-medium">Real Success Stories</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <AcademicCapIcon className="h-4 w-4 text-purple-600 mr-2" />
              <span className="font-medium">Top Institutions</span>
            </div>
          </div>
        </div>

        {/* Enhanced Student Cards Slider */}
        <div className="relative">
          <Swiper
            modules={[Scrollbar, A11y, Autoplay, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: '.swiper-button-prev-custom',
              nextEl: '.swiper-button-next-custom',
            }}
            scrollbar={{ draggable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-12"
          >
            {studentData.map((student, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-yellow-300 transform hover:-translate-y-2">
                  
                  {/* Student Image */}
                  <div className="relative">
                    <img
                      src={student.imageUrl}
                      alt={student.name}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x200/f3f4f6/6b7280?text=Student+Photo";
                      }}
                    />
                    
                    {/* Success Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        ✓ PLACED
                      </div>
                    </div>
                    
                    {/* Package Badge */}
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-yellow-600 text-white px-3 py-2 rounded-lg font-bold shadow-lg">
                        {student.package}
                      </div>
                    </div>
                  </div>
                  
                  {/* Student Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{student.name}</h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <AcademicCapIcon className="h-4 w-4 mr-2 text-blue-600" />
                        <span>{student.course} from {student.college}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <TrophyIcon className="h-4 w-4 mr-2 text-yellow-600" />
                        <span>Placed at {student.company}</span>
                      </div>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {renderStars(student.rating)}
                      </div>
                      <div className="text-sm font-medium text-gray-600">
                        Success Story
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-yellow-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-yellow-200 cursor-pointer">
            <ChevronLeftIcon className="h-5 w-5" />
          </div>
          <div className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-yellow-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-yellow-200 cursor-pointer">
            <ChevronRightIcon className="h-5 w-5" />
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Join Our Success Stories?</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              "Sahi course, Sahi chunav ka saathi - Aao padhe aur safal bane!" 
              Start your journey towards a successful career today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center">
                <TrophyIcon className="h-5 w-5 mr-2" />
                Start Your Journey
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400 px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center">
                <UserGroupIcon className="h-5 w-5 mr-2" />
                View More Stories
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacedStudents;

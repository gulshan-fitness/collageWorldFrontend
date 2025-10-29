import React, { useState } from 'react';
import {
  AcademicCapIcon,
  UserGroupIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  ComputerDesktopIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  ArrowRightIcon,
  BookOpenIcon,
  TrophyIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import BookCounselling from '../../../../components/common/BookCounselling';

const Services = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const services = [
    {
      id: 1,
      title: 'Career Counselling',
      description: 'Get personalized career guidance from industry experts to make informed decisions about your future.',
      icon: UserGroupIcon,
      color: 'blue',
      features: ['One-on-one sessions', 'Career assessment tests', 'Industry insights', 'Skill development guidance'],
      price: 'Free',
      duration: '45 mins'
    },
    {
      id: 2,
      title: 'Admission Assistance',
      description: 'Complete support for college admissions including application help, document preparation, and interview guidance.',
      icon: DocumentTextIcon,
      color: 'green',
      features: ['Application form filling', 'Document verification', 'Interview preparation', 'Deadline management'],
      price: 'Free',
      duration: '60 mins'
    },
    {
      id: 3,
      title: 'Study Abroad Guidance',
      description: 'Expert assistance for international education including visa guidance, university selection, and cultural preparation.',
      icon: GlobeAltIcon,
      color: 'purple',
      features: ['University selection', 'Visa assistance', 'IELTS/TOEFL prep', 'Cultural orientation'],
      price: '₹2,999',
      duration: '90 mins'
    },
    {
      id: 4,
      title: 'Online Education Support',
      description: 'Comprehensive support for online learning including course selection, technical setup, and study strategies.',
      icon: ComputerDesktopIcon,
      color: 'orange',
      features: ['Course recommendations', 'Technical support', 'Study planning', 'Progress tracking'],
      price: 'Free',
      duration: '30 mins'
    },
    {
      id: 5,
      title: 'Scholarship Guidance',
      description: 'Find and apply for scholarships with expert guidance on eligibility, applications, and documentation.',
      icon: CurrencyDollarIcon,
      color: 'yellow',
      features: ['Scholarship search', 'Eligibility check', 'Application support', 'Essay writing help'],
      price: 'Free',
      duration: '45 mins'
    },
    {
      id: 6,
      title: 'Exam Preparation',
      description: 'Structured preparation for competitive exams with study materials, mock tests, and performance analysis.',
      icon: BookOpenIcon,
      color: 'indigo',
      features: ['Study materials', 'Mock tests', 'Performance analysis', 'Doubt clearing sessions'],
      price: '₹1,999/month',
      duration: 'Ongoing'
    }
  ];

  const additionalServices = [
    {
      title: 'College Comparison',
      description: 'Compare colleges based on rankings, fees, placements, and facilities',
      icon: BuildingOfficeIcon
    },
    {
      title: 'Skill Assessment',
      description: 'Evaluate your skills and get recommendations for improvement',
      icon: TrophyIcon
    },
    {
      title: 'Industry Mentorship',
      description: 'Connect with industry professionals for guidance and networking',
      icon: UserGroupIcon
    },
    {
      title: 'Resume Building',
      description: 'Create professional resumes with expert guidance and templates',
      icon: DocumentTextIcon
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      course: 'B.Tech Computer Science',
      message: 'The career counselling service helped me choose the right engineering branch. The counsellor was very knowledgeable and patient.',
      rating: 5
    },
    {
      name: 'Rahul Kumar',
      course: 'MBA',
      message: 'Excellent admission assistance! They helped me with every step of the MBA application process. Highly recommended.',
      rating: 5
    },
    {
      name: 'Anita Patel',
      course: 'Study Abroad - MS',
      message: 'The study abroad guidance was comprehensive. From university selection to visa process, everything was handled professionally.',
      rating: 5
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200',
      yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200',
      indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8">
            Comprehensive educational services designed to guide you through every step of your academic journey
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-full">
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              <span>Expert Guidance</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-full">
              <ClockIcon className="h-5 w-5 mr-2" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-full">
              <StarIcon className="h-5 w-5 mr-2" />
              <span>Proven Results</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Services Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of educational services tailored to meet your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2"
              >
                {/* Service Header */}
                <div className={`p-6 ${getColorClasses(service.color)} border-b`}>
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-white rounded-full mr-4 shadow-lg">
                      <service.icon className="h-8 w-8 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        <span>{service.duration}</span>
                        <span className="mx-2">•</span>
                        <span className="font-semibold">{service.price}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setIsBookingOpen(true)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center"
                    >
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Book Now
                    </button>
                    <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <ChatBubbleLeftRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Services */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Services</h2>
            <p className="text-lg text-gray-600">
              Explore more services to enhance your educational journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg"
              >
                <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
                  <service.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                  Learn More
                  <ArrowRightIcon className="h-4 w-4 ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Students Say</h2>
            <p className="text-lg text-gray-600">
              Real experiences from students who have used our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.message}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.course}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Book a free consultation with our expert counsellors and take the first step towards your dream career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
            >
              <CalendarIcon className="h-5 w-5 mr-2" />
              Book Free Consultation
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center">
              <PhoneIcon className="h-5 w-5 mr-2" />
              Call Now: +91 98765 43210
            </button>
          </div>
        </div>
      </div>

      {/* Book Counselling Modal */}
      <BookCounselling 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </div>
  );
};

export default Services;

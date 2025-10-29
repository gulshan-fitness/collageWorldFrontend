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
  BuildingOfficeIcon,
  SparklesIcon,
  HeartIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const LearnMore = () => {
  const [selectedService, setSelectedService] = useState(null);

  const mainServices = [
    {
      id: 1,
      title: 'Career Counselling',
      subtitle: 'Find Your Perfect Career Path',
      description: 'Get personalized career guidance from industry experts to make informed decisions about your future. Our counsellors help you discover your strengths, interests, and the best career options for you.',
      icon: UserGroupIcon,
      color: 'blue',
      features: [
        'One-on-one personalized sessions with certified counsellors',
        'Comprehensive career assessment tests',
        'Industry insights and market trends',
        'Skill development roadmap and guidance'
      ],
      benefits: [
        'Clear understanding of your career goals',
        'Knowledge about various career options',
        'Improved decision-making confidence',
        'Personalized action plan for success'
      ],
      duration: '45-60 minutes',
      price: 'Free Consultation',
      rating: 4.9,
      students: '10,000+'
    },
    {
      id: 2,
      title: 'Admission Assistance',
      subtitle: 'Get Into Your Dream College',
      description: 'Complete support for college admissions including application help, document preparation, and interview guidance. We make the complex admission process simple and stress-free.',
      icon: DocumentTextIcon,
      color: 'green',
      features: [
        'Complete application form filling assistance',
        'Document verification and preparation',
        'Interview preparation and mock sessions',
        'Application deadline management and tracking'
      ],
      benefits: [
        'Higher chances of admission acceptance',
        'Error-free application submission',
        'Confidence in interview performance',
        'Peace of mind throughout the process'
      ],
      duration: '60-90 minutes',
      price: 'Free Service',
      rating: 4.8,
      students: '15,000+'
    },
    {
      id: 3,
      title: 'Study Abroad Guidance',
      subtitle: 'Your Gateway to Global Education',
      description: 'Expert assistance for international education including university selection, visa guidance, and cultural preparation. Start your international academic journey with confidence.',
      icon: GlobeAltIcon,
      color: 'purple',
      features: [
        'University selection based on your profile',
        'Complete visa application assistance',
        'IELTS/TOEFL preparation guidance',
        'Pre-departure cultural orientation'
      ],
      benefits: [
        'Access to top international universities',
        'Smooth visa application process',
        'Better preparation for abroad studies',
        'Cultural adaptation support'
      ],
      duration: '90-120 minutes',
      price: '₹2,999',
      rating: 4.9,
      students: '5,000+'
    }
  ];

  const additionalServices = [
    {
      title: 'Online Education Support',
      description: 'Comprehensive support for online learning including course selection and study strategies',
      icon: ComputerDesktopIcon,
      color: 'orange'
    },
    {
      title: 'Scholarship Guidance',
      description: 'Find and apply for scholarships with expert guidance on eligibility and applications',
      icon: CurrencyDollarIcon,
      color: 'yellow'
    },
    {
      title: 'Exam Preparation',
      description: 'Structured preparation for competitive exams with materials and mock tests',
      icon: BookOpenIcon,
      color: 'indigo'
    },
    {
      title: 'College Comparison',
      description: 'Compare colleges based on rankings, fees, placements, and facilities',
      icon: BuildingOfficeIcon,
      color: 'blue'
    }
  ];

  const successStories = [
    {
      name: 'Priya Sharma',
      course: 'B.Tech Computer Science',
      university: 'IIT Delhi',
      message: 'The career counselling service helped me choose the right engineering branch. The counsellor was very knowledgeable and patient.',
      rating: 5,
      image: 'PS'
    },
    {
      name: 'Rahul Kumar',
      course: 'MBA',
      university: 'IIM Ahmedabad',
      message: 'Excellent admission assistance! They helped me with every step of the MBA application process. Highly recommended.',
      rating: 5,
      image: 'RK'
    },
    {
      name: 'Anita Patel',
      course: 'MS Computer Science',
      university: 'University of Toronto',
      message: 'The study abroad guidance was comprehensive. From university selection to visa process, everything was handled professionally.',
      rating: 5,
      image: 'AP'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600',
      yellow: 'from-yellow-500 to-yellow-600',
      indigo: 'from-indigo-500 to-indigo-600'
    };
    return colors[color] || colors.blue;
  };

  const getTextColorClasses = (color) => {
    const colors = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600',
      yellow: 'text-yellow-600',
      indigo: 'text-indigo-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-6">
            <LightBulbIcon className="text-white text-3xl" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Learn More About Our Services</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8">
            Discover comprehensive educational services designed to guide you through every step of your academic journey
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
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

      {/* Main Services Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Comprehensive Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from our range of educational services, each designed to help you achieve your academic goals
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {mainServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
              >
                {/* Service Header */}
                <div className={`bg-gradient-to-r ${getColorClasses(service.color)} p-6 text-white`}>
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-white bg-opacity-20 rounded-full mr-4">
                      <service.icon className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{service.title}</h3>
                      <p className="text-sm opacity-90">{service.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {service.duration}
                    </span>
                    <span className="font-semibold">{service.price}</span>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />
                      What's Included:
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <HeartIcon className="h-5 w-5 mr-2 text-red-500" />
                      Benefits:
                    </h4>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <StarIcon className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{service.rating}</div>
                      <div className="text-xs text-gray-600">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{service.students}</div>
                      <div className="text-xs text-gray-600">Students</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-3">
                    <Link to="/apply" className="block">
                      <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
                        <SparklesIcon className="h-5 w-5 mr-2" />
                        Apply Now
                      </button>
                    </Link>
                    <button className="w-full border-2 border-gray-300 text-gray-700 hover:border-blue-300 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center">
                      <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                      Chat with Counsellor
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
                className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg group"
              >
                <div className={`p-3 bg-gradient-to-r ${getColorClasses(service.color)} rounded-lg w-fit mb-4`}>
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                <Link to="/apply" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform duration-200">
                  Apply Now
                  <ArrowRightIcon className="h-4 w-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600">
              Real experiences from students who have used our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${getColorClasses('blue')} rounded-full flex items-center justify-center text-white font-bold mr-4`}>
                    {story.image}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{story.name}</div>
                    <div className="text-sm text-gray-600">{story.course}</div>
                    <div className="text-xs text-gray-500">{story.university}</div>
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(story.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic">"{story.message}"</p>
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
            <Link to="/apply">
              <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center">
                <SparklesIcon className="h-5 w-5 mr-2" />
                Apply Now - It's Free!
              </button>
            </Link>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center">
              <PhoneIcon className="h-5 w-5 mr-2" />
              Call Now: +91 98765 43210
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LearnMore;

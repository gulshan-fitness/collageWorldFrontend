import React from 'react';
import { 
  BriefcaseIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  ClockIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const Careers = () => {
  const jobCategories = [
    {
      title: "Education Technology",
      icon: <AcademicCapIcon className="h-8 w-8" />,
      openings: 12,
      description: "Join our EdTech team to revolutionize education",
      color: "from-blue-600 to-indigo-600"
    },
    {
      title: "Student Success",
      icon: <UserGroupIcon className="h-8 w-8" />,
      openings: 8,
      description: "Help students achieve their academic goals",
      color: "from-green-600 to-emerald-600"
    },
    {
      title: "Data Analytics",
      icon: <ChartBarIcon className="h-8 w-8" />,
      openings: 5,
      description: "Analyze education trends and student data",
      color: "from-purple-600 to-pink-600"
    },
    {
      title: "Business Development",
      icon: <BriefcaseIcon className="h-8 w-8" />,
      openings: 7,
      description: "Expand our reach to more institutions",
      color: "from-orange-600 to-red-600"
    }
  ];

  const jobListings = [
    {
      title: "Senior Education Counselor",
      department: "Student Success",
      location: "Remote",
      type: "Full-time",
      salary: "₹8-12 LPA",
      posted: "2 days ago"
    },
    {
      title: "Product Manager - EdTech",
      department: "Technology",
      location: "Bangalore",
      type: "Full-time",
      salary: "₹15-25 LPA",
      posted: "1 week ago"
    },
    {
      title: "Data Scientist",
      department: "Analytics",
      location: "Mumbai",
      type: "Full-time",
      salary: "₹12-18 LPA",
      posted: "3 days ago"
    },
    {
      title: "Content Writer - Education",
      department: "Marketing",
      location: "Delhi",
      type: "Full-time",
      salary: "₹6-10 LPA",
      posted: "5 days ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
              <BriefcaseIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Join Our Mission
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Help us transform education and empower students to achieve their dreams. 
              Build your career while making a meaningful impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                View Open Positions
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Learn About Culture
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Job Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Career Opportunities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover exciting roles across different departments and find the perfect fit for your skills and passion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {jobCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center text-white mb-4`}>
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-blue-600">{category.openings} openings</span>
                <ArrowRightIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Featured Job Listings */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Featured Positions</h3>
            <button className="text-blue-600 font-semibold hover:text-blue-700">View All Jobs</button>
          </div>

          <div className="space-y-4">
            {jobListings.map((job, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-bold text-gray-900">{job.title}</h4>
                      <span className="text-sm text-gray-500">{job.posted}</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <UserGroupIcon className="h-4 w-4 mr-1" />
                        {job.department}
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {job.type}
                      </div>
                      <div className="flex items-center">
                        <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                        {job.salary}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                      Learn More
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Work With Us */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UserGroupIcon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Great Team</h3>
            <p className="text-gray-600">Work with passionate professionals who care about education and student success.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ChartBarIcon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Growth Opportunities</h3>
            <p className="text-gray-600">Advance your career with continuous learning and development programs.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AcademicCapIcon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Meaningful Impact</h3>
            <p className="text-gray-600">Make a real difference in students' lives and the future of education.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;

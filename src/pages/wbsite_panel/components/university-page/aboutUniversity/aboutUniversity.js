import React from 'react';
import parse from 'html-react-parser';

function AboutUniversity({ collegeDetails }) {
  return (
    <section className="w-full py-8 bg-white">
      <div className="w-[95%] max-w-6xl mx-auto">
        {/* Header Section - Compact */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            About {collegeDetails?.college_name}
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* About Text - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="text-gray-700 leading-relaxed text-base">
                {collegeDetails?.about && parse(collegeDetails.about)}
              </div>
            </div>
          </div>

          {/* Key Points - Right Side */}
          <div className="space-y-4">
            {/* Vision Card */}
            <div className="bg-white border border-blue-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">Vision</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Excellence in education and research, fostering innovation and academic growth.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-white border border-green-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">Mission</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Empowering students with knowledge and skills to excel in their careers.
                  </p>
                </div>
              </div>
            </div>

            {/* Values Card */}
            <div className="bg-white border border-purple-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">Values</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Integrity, excellence, innovation, and inclusivity in all endeavors.
                  </p>
                </div>
              </div>
            </div>

            {/* Accreditation Card */}
            <div className="bg-white border border-orange-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">Accreditation</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Recognized by leading educational bodies and accreditation councils.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="text-xl font-bold text-blue-600">50+</div>
            <div className="text-xs text-gray-600 mt-1">Programs</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
            <div className="text-xl font-bold text-green-600">100+</div>
            <div className="text-xs text-gray-600 mt-1">Faculty</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100">
            <div className="text-xl font-bold text-purple-600">25+</div>
            <div className="text-xs text-gray-600 mt-1">Years</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-100">
            <div className="text-xl font-bold text-orange-600">10K+</div>
            <div className="text-xs text-gray-600 mt-1">Alumni</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUniversity;
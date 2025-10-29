import React, { useState } from 'react';
import {
  UserIcon,
  AcademicCapIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  SparklesIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const Apply = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    preferredService: '',
    preferredTime: '',
    message: '',
    agreeToTerms: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    'Career Counselling',
    'Admission Assistance',
    'Study Abroad Guidance',
    'Online Education Support',
    'Scholarship Guidance',
    'Exam Preparation'
  ];

  const timeSlots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
    '5:00 PM - 6:00 PM'
  ];

  const courses = [
    'Engineering (B.Tech/B.E)',
    'Medicine (MBBS)',
    'Management (MBA)',
    'Computer Applications (BCA/MCA)',
    'Arts & Humanities',
    'Commerce',
    'Science',
    'Law (LLB)',
    'Design',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        course: '',
        preferredService: '',
        preferredTime: '',
        message: '',
        agreeToTerms: false
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your application. Our counsellors will contact you within 24 hours to schedule your consultation.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>What's next?</strong><br />
              • You'll receive a confirmation email shortly<br />
              • Our team will call you to confirm details<br />
              • We'll schedule your preferred time slot
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-6">
            <DocumentTextIcon className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Apply for Our Services</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Take the first step towards your educational success. Fill out the form below and our expert counsellors will guide you.
          </p>
        </div>
      </div>

      {/* Application Form */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
              <h2 className="text-2xl font-bold text-center">Application Form</h2>
              <p className="text-center text-blue-100 mt-2">All fields are required unless marked optional</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <UserIcon className="h-4 w-4 inline mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <EnvelopeIcon className="h-4 w-4 inline mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <PhoneIcon className="h-4 w-4 inline mr-1" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <AcademicCapIcon className="h-4 w-4 inline mr-1" />
                    Interested Course/Program *
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select your course interest</option>
                    {courses.map((course, index) => (
                      <option key={index} value={course}>{course}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <SparklesIcon className="h-4 w-4 inline mr-1" />
                  Preferred Service *
                </label>
                <select
                  name="preferredService"
                  value={formData.preferredService}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select your preferred service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <CalendarIcon className="h-4 w-4 inline mr-1" />
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <ClockIcon className="h-4 w-4 inline mr-1" />
                    Preferred Time Slot *
                  </label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select preferred time</option>
                    {timeSlots.map((time, index) => (
                      <option key={index} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Additional Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Information (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us more about your requirements, goals, or any specific questions you have..."
                />
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  required
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Terms and Conditions
                  </a>
                  {' '}and{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Privacy Policy
                  </a>
                  . I understand that my information will be used to provide educational guidance and counselling services.
                </label>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center mx-auto"
                >
                  <SparklesIcon className="h-5 w-5 mr-2" />
                  Submit Application
                </button>
                <p className="text-sm text-gray-500 mt-3">
                  By submitting this form, you agree to be contacted by our counsellors within 24 hours.
                </p>
              </div>

            </form>
          </div>

          {/* Contact Information */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <PhoneIcon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm">+91 98765 43210</p>
              <p className="text-gray-500 text-xs mt-1">Available 9 AM - 7 PM</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <EnvelopeIcon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm">info@collegeworld.com</p>
              <p className="text-gray-500 text-xs mt-1">We reply within 2 hours</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <MapPinIcon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600 text-sm">123 Education Street</p>
              <p className="text-gray-500 text-xs mt-1">New Delhi, India</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Apply;

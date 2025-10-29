import React, { useState, useContext } from 'react';
import { Context } from '../../../Context_holder';
import { 
  XMarkIcon, 
  PhoneIcon, 
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  UserIcon,
  EnvelopeIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';

const BookCounselling = ({ isOpen, onClose }) => {
  const {  user,setapply_popUpIsOpen,setuserSignUp_popup,  } = useContext(Context);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

    const [selectedType, setSelectedType] = useState("");
  

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };




const enquiry_api = (data, e) => {
  setIsSubmitting(true);

  axios
    .patch(
      process.env.REACT_APP_API_BASE_URL +
        process.env.REACT_APP_USER_URL +
        "enquiry_edit/" +
        user?._id,
      data
    )
    .then((success) => {
      if (success.data.status === 1) {
        setapply_popUpIsOpen(true);
        e.target.reset();
        setSelectedType("");
       
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setIsSubmitting(false);  // ✅ Reset loading state
    });
};


  const enquiry_Handler = (e) => {
    e.preventDefault()

    if (user == null) {
      setuserSignUp_popup(true);
    } 

    else {

      const name=e.target.name.value
        const email=e.target.email.value
          const phone=e.target.phone.value
            const preferredTime=e.target.preferredTime.value
              const CounsellingType=selectedType
                const enquiry=e.target.enquiry.value



  const formattedData = 
    `subject:Book Free Counselling
    name=${name}
email=${email}
phone=${phone}
preferredTime=${preferredTime}
CounsellingType=${CounsellingType}
enquiry=${enquiry}`;


              

  enquiry_api( {enquiry:formattedData},e);


    }

  };



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-t-2xl relative">

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors duration-200"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          
          <div className="flex items-center mb-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-full mr-4">
              <AcademicCapIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Book Free Counselling</h2>
              <p className="text-blue-100">Get expert guidance for your academic journey</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center bg-white bg-opacity-20 px-3 py-1 rounded-full">
              <ClockIcon className="h-4 w-4 mr-2" />
              <span>30 Min Session</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 px-3 py-1 rounded-full">
              <PhoneIcon className="h-4 w-4 mr-2" />
              <span>Phone/Video Call</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 px-3 py-1 rounded-full">
              <CheckCircleIcon className="h-4 w-4 mr-2" />
              <span>100% Free</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Form Section */}
          <div className="lg:w-2/3 p-6">
         
            
            
            
         <form onSubmit={enquiry_Handler} className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Name Field */}
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-2">
        <UserIcon className="h-4 w-4 inline mr-2 text-gray-700" />
        Full Name <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="name"
        required
        placeholder="Enter your full name"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
      />
    </div>

    {/* Email Field */}
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-2">
        <EnvelopeIcon className="h-4 w-4 inline mr-2 text-gray-700" />
        Email Address <span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        name="email"
        required
        placeholder="Enter your email"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
      />
    </div>

    {/* Phone Field */}
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-2">
        <PhoneIcon className="h-4 w-4 inline mr-2 text-gray-700" />
        Phone Number <span className="text-red-500">*</span>
      </label>
      <input
        type="tel"
        name="phone"
        required
        placeholder="Enter your phone number"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
      />
    </div>

    {/* Preferred Time */}
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-2">
        <CalendarIcon className="h-4 w-4 inline mr-2 text-gray-700" />
        Preferred Time
      </label>
      <select
        name="preferredTime"
        className="w-full text-gray-900 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200"
      >
        <option value="">Select preferred time</option>
        <option value="morning">Morning (9 AM - 12 PM)</option>
        <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
        <option value="evening">Evening (5 PM - 8 PM)</option>
      </select>
    </div>
  </div>

  {/* Counselling Type */}
  <div>
    <label className="block text-sm font-semibold text-gray-900 mb-3">
      <AcademicCapIcon className="h-4 w-4 inline mr-2 text-gray-700" />
      Counselling Type
    </label>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {[
        { value: 'general', label: 'General Guidance', desc: 'Overall academic guidance' },
        { value: 'admission', label: 'Admission Help', desc: 'College admission process' },
        { value: 'career', label: 'Career Planning', desc: 'Career path guidance' }
      ].map((type) => (
        <label key={type.value} className="cursor-pointer">
          <input
            type="radio"
            name="counsellingType"
            value={type.value}
            checked={selectedType === type.value}
            onChange={() => setSelectedType(type.value)}
            className="sr-only"
          />
          <div
            className={`p-4 border-2 rounded-lg transition-all duration-200 ${
              selectedType === type.value
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <div className="font-medium text-gray-900">{type.label}</div>
            <div className="text-sm text-gray-600">{type.desc}</div>
          </div>
        </label>
      ))}
    </div>
  </div>

  {/* Message Field */}
  <div>
    <label className="block text-sm font-semibold text-gray-900 mb-2">
      <ChatBubbleLeftRightIcon className="h-4 w-4 inline mr-2 text-gray-700" />
      Your Message
    </label>
    <textarea
      name="enquiry"
      rows={4}
      placeholder="Tell us about your academic goals, questions, or any specific guidance you need..."
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 resize-none text-gray-900 placeholder-gray-400"
    />
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    disabled={isSubmitting}
    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
  >
    {isSubmitting ? (
      <>
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
        Booking Session...
      </>
    ) : (
      <>
        <CalendarIcon className="h-5 w-5 mr-2 text-white" />
        Book Free Session
      </>
    )}
  </button>
</form>

          
          </div>

          {/* Info Section */}
          <div className="lg:w-1/3 bg-gradient-to-br from-gray-50 to-blue-50 p-6 lg:rounded-r-2xl">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Our Counselling?</h3>
              <div className="space-y-4">
                {[
                  { icon: AcademicCapIcon, title: 'Expert Counsellors', desc: 'Certified education experts' },
                  { icon: ClockIcon, title: 'Flexible Timing', desc: 'Sessions at your convenience' },
                  { icon: CheckCircleIcon, title: 'Personalized Guidance', desc: 'Tailored to your goals' },
                  { icon: PhoneIcon, title: 'Multiple Channels', desc: 'Phone, video, or in-person' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3 mt-1">
                      <item.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Informative Slider */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Success Stories</h4>
              <div className="h-48 rounded-lg overflow-hidden">
                <Slider {...sliderSettings}>
                  {[
                    { 
                      image: '/api/placeholder/300/200', 
                      title: 'Admission Success',
                      desc: '95% admission success rate'
                    },
                    { 
                      image: '/api/placeholder/300/200', 
                      title: 'Career Guidance',
                      desc: 'Personalized career paths'
                    },
                    { 
                      image: '/api/placeholder/300/200', 
                      title: 'Expert Support',
                      desc: '24/7 counsellor support'
                    }
                  ].map((slide, index) => (
                    <div key={index} className="relative h-48">
                      <div className="h-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-center p-4">
                        <div>
                          <h5 className="text-lg font-bold mb-2">{slide.title}</h5>
                          <p className="text-sm opacity-90">{slide.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Need Immediate Help?</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <EnvelopeIcon className="h-4 w-4 mr-2 text-blue-600" />
                  <a href="mailto:ofcw0rk56@co.uk" className="text-blue-600 hover:underline">
                    ofcw0rk56@co.uk
                  </a>
                </div>
                <div className="flex items-center text-gray-600">
                  <PhoneIcon className="h-4 w-4 mr-2 text-green-600" />
                  <span>Available 24/7 for urgent queries</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCounselling;

import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Sample testimonials data (updated with image URLs or placeholders)
const testimonials = [
  {
    id: 1,
    name: 'Amit',
    designation: 'Graduate Student',
    text: "I am immensely grateful to have found Parul University. Their dedication to providing top-notch educational courses is unparalleled.",
    rating: 5,
    avatar: 'https://via.placeholder.com/48?text=Amit',
  },
  {
    id: 2,
    name: 'Umesh',
    designation: 'Undergraduate Student',
    text: "Parul University has been instrumental in my academic journey. The courses are well-structured, and the mentors are extremely knowledgeable.",
    rating: 5,
    avatar: 'https://via.placeholder.com/48?text=Umesh',
  },
  {
    id: 3,
    name: 'Rohit',
    designation: 'PhD Candidate',
    text: "Enrolling in Parul University's programs was one of the best decisions I've made. The courses are rigorous yet rewarding.",
    rating: 4,
    avatar: 'https://via.placeholder.com/48?text=Rohit',
  },
  {
    id: 4,
    name: 'Suresh',
    designation: 'High School Student',
    text: "As a high school student, I was looking for opportunities to expand my knowledge. Parul University offered exactly what I needed.",
    rating: 5,
    avatar: 'https://via.placeholder.com/48?text=Suresh',
  },
  {
    id: 5,
    name: 'Ashish',
    designation: 'Career Professional',
    text: "I have been able to advance my career significantly thanks to Parul University. The practical skills I've gained have been invaluable.",
    rating: 4,
    avatar: 'https://via.placeholder.com/48?text=Ashish',
  },
];

// Custom Arrow Components
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-blue-100 rounded-full p-2 shadow-md hover:bg-blue-200 transition-all duration-300"
    aria-label="Previous testimonial"
  >
    <FaChevronLeft className="text-blue-600 w-5 h-5" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-blue-100 rounded-full p-2 shadow-md hover:bg-blue-200 transition-all duration-300"
    aria-label="Next testimonial"
  >
    <FaChevronRight className="text-blue-600 w-5 h-5" />
  </button>
);

const WebTestimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true, // Keep dots on mobile for better UX
        },
      },
    ],
    appendDots: (dots) => (
      <div className="mt-6">
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <button
        className="w-2.5 h-2.5 rounded-full bg-gray-300 hover:bg-blue-500 transition-colors duration-300"
        aria-label="Slide indicator"
      />
    ),
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
        size={16}
      />
    ));
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-100 py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            What Our Students Say
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from our students about their transformative learning experiences at Parul University
          </p>
        </div>

        {/* Testimonial Slider */}
        <Slider {...settings}>
          {testimonials?.map((testimonial) => (
            <div key={testimonial.id} className="px-2 sm:px-3 focus:outline-none">
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 hover:border-blue-200 p-5 sm:p-6 h-full transition-all duration-300 group transform hover:-translate-y-1">
                {/* Quote and Rating */}
                <div className="flex justify-between items-start mb-4">
                  <FaQuoteLeft className="text-2xl text-blue-500 opacity-30" />
                  <div className="flex items-center gap-1">{renderStars(testimonial.rating)}</div>
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6 line-clamp-4 sm:line-clamp-5">
                  {testimonial.text}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3 sm:gap-4 pt-4 border-t border-gray-100">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-200 group-hover:border-blue-300 transition-all duration-300"
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/48')}
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-base sm:text-lg capitalize">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-xs sm:text-sm">{testimonial.designation}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default React.memo(WebTestimonial);
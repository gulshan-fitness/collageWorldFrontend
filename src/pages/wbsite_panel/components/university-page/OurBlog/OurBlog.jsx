import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaGraduationCap, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

// Custom Arrow components
const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} slick-arrow slick-next`}
      style={{ ...style, display: "block", background: "#333", borderRadius: '50%' }}
      onClick={onClick}
    >
      <FaArrowRight color="#fff" />
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} slick-arrow slick-prev`}
      style={{ ...style, display: "block", background: "#333", borderRadius: '50%' }}
      onClick={onClick}
    >
      <FaArrowLeft color="#fff" />
    </div>
  );
};

// Slick slider settings
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function OurBlog({ collegeDetails }) {
  const handleReadMoreClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="w-full py-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="w-[95%] max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl mb-3 shadow-md">
            <FaGraduationCap className="text-white text-lg" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Latest Blog & News
          </h2>
          <p className="text-gray-600 text-xs">
            Stay updated with our latest articles and news
          </p>
        </div>

        <Slider {...settings}>
          {collegeDetails?.posts?.map((data, index) => (
            <Link
              to={`/universityblog/${data._id}`}
              key={index}
              className="group bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 px-2"
              onClick={handleReadMoreClick}
            >
              <div className="relative">
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}image/Post_image/${data.logo}`}
                  alt={data.logo}
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-md">
                  <p className="text-xs font-bold">{data.icon}</p>
                  <p className="text-[10px] text-gray-300">{data.month}</p>
                </div>
              </div>
              <div className="p-4">
                <h5 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {data.hed}
                </h5>
                <p className="text-gray-600 text-xs mb-3 line-clamp-2 leading-relaxed">
                  {data.pre}
                </p>
                <div className="flex items-center gap-2 text-blue-600 font-medium text-xs">
                  <span>Read More</span>
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default OurBlog;
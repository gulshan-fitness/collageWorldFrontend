import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Testimonials({ collegeDetails }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
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

  return (
    <div className="w-full py-5">
      <div className="container mx-auto">
        <div className="md:text-[2rem] text-xl font-bold mb-8 ml-2">
          Our Placed Students
        </div>
        <Slider {...settings}>
          {collegeDetails?.placed_students?.map((item, ind) => (
            <div className="px-2" key={ind}>
              <div className="bg-[#f0f7ff] py-4 px-4 hover:bg-white hover:shadow-xl flex flex-col items-center rounded-lg border border-gray-200">
                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}image/students_placed_image/${item.student_image}`}
                  className="w-32 h-32 object-cover rounded-full mb-2"
                  alt={item.name}
                />
                <p className="text-center my-2 capitalize font-bold text-lg text-black">
                  {item.name}
                </p>
                <p className="text-center my-1 font-thin text-sm">
                  {item.work}
                </p>
                <p className="text-center mt-2 text-sm text-gray-600">
                  {item.review}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Testimonials;

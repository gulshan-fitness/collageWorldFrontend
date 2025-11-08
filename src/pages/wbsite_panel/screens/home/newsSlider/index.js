import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "react-modal";
import "./index.css";
import { PlayIcon, EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";

// Set the root element for the modal
Modal.setAppElement('#root');

const NewsSlider = ({ collegeDetails }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');

  console.log(collegeDetails?.stories,"ram",collegeDetails);
  

  const openModal = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentVideo('');
  };

  // Slick slider settings
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
        breakpoint: 768,
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


  console.log(collegeDetails,"collegeDetails");
  
  return (
    <div className="w-full py-12 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="w-[95%] max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <PlayIcon className="text-white text-2xl" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Student Success Stories
          </h2>

          <p className="text-gray-600 max-w-xl mx-auto text-sm">
            Watch inspiring testimonials from our successful students
          </p>
        </div>

        <Slider {...settings}>

          {collegeDetails?.stories?.map((data, index) => (
            <div className="px-3" key={index}>
              <div
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden cursor-pointer group"
                onClick={() => openModal(data.video_url)}
              >
                {/* Video Section */}
                <div className="relative">
                  <iframe
                    className="w-full h-40 object-cover"
                    src={data?.video_url}
                    title="Success Story Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <PlayIcon className="h-8 w-8 text-blue-600 ml-1" />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                    {data.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 mb-3">
                    {data.description}
                  </p>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Success Story</span>
                    <div className="flex items-center gap-1 text-blue-600 font-semibold">
                      <EyeIcon className="h-3 w-3" />
                      <span>Watch</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Video Modal"
          className="fixed inset-0 flex items-center justify-center z-50 outline-none"
          overlayClassName="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
        >
          <div className="relative w-full max-w-4xl mx-4">
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute -top-12 right-0 z-10 text-white hover:text-gray-300 transition-colors duration-200 p-2"
            >
              <XMarkIcon className="h-8 w-8" />
            </button>
            
            {/* Video Container */}
            <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src={currentVideo}
                  title="Success Story Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Additional Close Button at Bottom for Mobile */}
            <div className="flex justify-center mt-4 md:hidden">
              <button 
                onClick={closeModal}
                className="px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors duration-200 font-medium"
              >
                Close Video
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default NewsSlider;
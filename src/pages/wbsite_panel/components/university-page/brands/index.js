import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./index.css";
import student1 from "./image/amazone.png"
import student2 from "./image/decathlon.png"
import student3 from "./image/hcl.png"
import student4 from "./image/infosys.png"
import student5 from "./image/myntra.png"
import student6 from "./image/wipro.png"

// import required modules
import { FreeMode, Pagination, Navigation, Autoplay } from "swiper/modules";

const  Brands = () => {
  return (
    <div className="md:pt-[4rem] md:pb-[5rem] pb-1 pt-1">
      {/* <h1 className="text-black-500 font-bold text-2xl ml-[5rem]">Our placed students</h1> */}

      <div className="w-full flex justify-center  pb-[30px] pt-[25px]">
        <div className="w-[90%]">
          <Swiper
            slidesPerView={5}
            spaceBetween={30}
            freeMode={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[FreeMode, Navigation, Autoplay]}
            className="mySwiper">
            <SwiperSlide>
              <div className="w-[100%] h-[9rem] border-2 shadow-2xl">
                <img
                  className=" w-[15px] h-[20px] bg-white mt-2  object-cover   bg-center"
                  src={student1}
                  alt="image not found"
                 
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-[100%] h-[9rem] shadow-2xl">
                <img
                  className=" w-full h-full  mt-2  "
                  src={student2}
                  alt="image not found"
                
                  
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-[100%] h-[9rem] shadow-2xl overflow-hidden">
                <img
                  className=" w-full  bg-white mt-2  h-full object-cover bg-center"
                  src={student3}
                  alt="image not found"
                
                  
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-[100%] h-[9rem] shadow-2xl">
                <img
                  className=" w-full h-full bg-white mt-2"
                  src={student5}
                  alt={student1}
                 
                
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-[100%] h-[9rem] shadow-2xl">
                <img
                  className=" w-full h-full bg-white mt-2"
                  src={student6}
                  alt="image not found"
                 
                  
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-[100%] h-[9rem] border-2 shadow-2xl ">
                <img
                  className=" w-full h-full bg-white mt-2 object-fit"
                  src={student1}
                  alt="image not found"
                
                  
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-[100%] h-[9rem] border-2 shadow-2xl ">
                <img
                  className=" w-full h-full bg-white mt-2 object-fit"
                  src={student2}
                  alt="image not found"
                 
                 
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-[100%] h-[9rem] border-2 shadow-2xl ">
                <img
                  className=" w-full h-full bg-white mt-2 object-fit"
                  src={student3}
                  alt="image not found"
                 
                 
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-[100%] h-[9rem] border-2 shadow-2xl ">
                <img
                  className=" w-full h-full bg-white mt-2 object-fit bg-center"
                  src={student4}
                  alt="image not found"
                
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Brands;


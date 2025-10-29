
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "./styles/HomeBanner.css"
import "../../../styles/HomeBanner.module.css"




// import required modules
import { Autoplay, Pagination } from "swiper/modules";

const BannerSlider = ({img1 , img2 , img3 ,img4 ,img5}) => {
    return (
        <>
            <div className="flex relative z-[-1]">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper">
                    <SwiperSlide>
                        <div className="w-full h-[25rem]">
                            <img
                                className=" w-full h-full bg-[#190028] object-fill  object-center"
                                src={img1}
                                alt="image not found"
                                height={0}
                                width={0}
                                sizes="100vw"

                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="w-full h-[25rem]">
                            <img
                                className=" w-full h-full bg-[#190028] object-fill  object-center"
                                src={img2}
                                alt="image not found"
                                height={0}
                                width={0}
                                sizes="100vw"
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="w-full h-[25rem]">
                            <img
                                className=" w-full h-full bg-[#190028] object-fill  object-center"
                                src={img3}
                                alt="image not found"
                                height={0}
                                width={0}
                                sizes="100vw"
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="w-full h-[25rem]">
                            <img
                                className=" w-full h-full bg-[#190028] object-fill object-center"
                                src={img4}
                                alt="image not found"
                                height={0}
                                width={0}
                                sizes="100vw"
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="w-full h-[25rem]">
                            <img
                                className=" w-full h-full bg-[#190028] object-fill object-center"
                                src={img5}
                                alt="image not found"
                                height={0}
                                width={0}
                                sizes="100vw"
                            />
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>
        </>
    );
};

export default BannerSlider;

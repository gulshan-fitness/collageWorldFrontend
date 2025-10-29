import React from "react";
import service9 from "./image/service-9.webp";
import service10 from "./image/service-10.webp";
import service11 from "./image/service-11.webp";
import service12 from "./image/service-12.webp";
import manImage from "./image/menimgabout.jpg";

const AboutBanner = () => {
  return (
    <div className="w-[100%] py-5 bg-gradient-to-b from-[#18092f] via-purple-900 to-[#18092f] ">
      <div className="flex lg:w-[90%] mx-auto lg:flex-row flex-col justify-between sm:py-1">
        <div className="lg:w-[60%] w-[100%] items-center py-[20px] sm:py-[90px] order-2 lg:order-1 flex flex-col gap-0 sm:gap-24">
          <div className="sm:flex justify-between px-5">
            <div className="flex sm:w-[49%] sm:py-0 py-5 w-[99%] mx-auto gap-6">
              <img
                className="w-[60px] h-[60px]"
                width={60}
                height={60}
                alt="Top University Courses"
                src={service9}
                sizes="10vw"
              />
              <div>
                <div className="text-[#48a7d4] font-[700] text-[18px]">
                  Top University Courses
                </div>
                <div className="text-[13px] text-white">
                  We specialize in recommending the best university courses tailored to your interests and career goals, ensuring you have access to high-quality education.
                </div>
              </div>
            </div>
            <div className="flex sm:w-[49%] sm:py-0 py-5 w-[99%] mx-auto gap-6">
              <img
                className="w-[60px] h-[60px]"
                width={60}
                height={60}
                alt="Student Ratings"
                src={service10}
                sizes="10vw"
              />
              <div>
                <div className="text-[#fdc735] font-[700] text-[18px]">
                  Student Ratings
                </div>
                <div className="text-[13px] text-white">
                  Our platform leverages comprehensive student ratings and reviews to guide you in selecting the most effective and highly-rated courses and educators.
                </div>
              </div>
            </div>
          </div>
          <div className="sm:flex justify-between px-5">
            <div className="flex sm:w-[49%] sm:py-0 py-5 w-[99%] mx-auto gap-6">
              <img
                className="w-[60px] h-[60px]"
                width={60}
                height={60}
                alt="Expert Recommendations"
                src={service11}
                sizes="10vw"
              />
              <div>
                <div className="text-[#48a7d4] font-[700] text-[18px]">
                  Expert Recommendations
                </div>
                <div className="text-[13px] text-white">
                  Benefit from expert recommendations and personalized advice to help you make informed decisions about your educational journey.
                </div>
              </div>
            </div>
            <div className="flex sm:w-[49%] sm:py-0 py-5 w-[99%] mx-auto gap-6">
              <img
                className="w-[60px] h-[60px]"
                width={60}
                height={60}
                alt="Accessible Learning"
                src={service12}
                sizes="10vw"
              />
              <div>
                <div className="text-[#00a651] font-[700] text-[18px]">
                  Accessible Learning
                </div>
                <div className="text-[13px] text-white">
                  We strive to make top-tier education accessible to all, bridging the gap between students and premier learning opportunities through our user-friendly platform.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-[28%] mt-6 lg:mt-0 order-1 w-[80%] px-8 sm:px-0 lg:order-2 sm:w-[60%] sm:mx-0 mx-auto">
          <img
            className="w-full h-full"
            width={400}
            height={400}
            alt="About Us"
            src={manImage}
            sizes="50vw"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutBanner;

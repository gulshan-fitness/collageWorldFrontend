import React, { useState, useEffect, useContext } from "react";
import { MdGroups3 } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { FaReact } from "react-icons/fa";
// import feature1 from "./image/images.jpg";
// import feature2 from "./image/knmodi2.jpeg";
// import feature3 from "./image/knmodi3.webp";
import { Context } from "../../../../../Context_holder";


function OurFeatures({uni}) {
  const [currentSlide, setCurrentSlide] = useState(1);

  const { }=useContext (Context)

  // Define the images for the slider
  // const images =  [feature1, feature2, feature3];
  
  const images =  ["ram1", "ram2", "ram3"];

  // Function to handle automatic sliding
  const handleSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide % images.length) + 1);
  };

  // Start automatic sliding on component mount
  
  useEffect(() => {
    const intervalId = setInterval(handleSlide, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  const [features] = useState([
    {
      icon: <MdGroups3 />,
      subHed: "Skilled Teachers",
      preGraph:
        "At Dr. K.N. Modi University , we pride ourselves on having highly skilled and experienced teachers who are dedicated to providing top-notch education. They ensure that students receive comprehensive learning and guidance in their chosen fields.",
    },
    {
      icon: <GiReceiveMoney />,
      subHed: "Affordable Courses",
      preGraph:
        "We understand the importance of accessible education, which is why we offer a range of affordable courses at Dr. K.N. Modi University . Our goal is to make quality education accessible to everyone, regardless of their financial background.",
    },
    {
      icon: <FaReact />,
      subHed: "Efficient & Flexible",
      preGraph:
        "Dr. K.N. Modi University  believes in providing efficient and flexible learning opportunities to its students. Our programs are designed to accommodate diverse learning styles and schedules, allowing students to balance their academic pursuits with other commitments effectively.",
    },
  ]);

  return (
    <div className="w-full text-black px-3 lg:px-0 flex justify-center">
      <div className="w-[87%] mx-auto ">
        <div className="flex flex-col lg:flex-row justify-between">
          {/* Start First Box */}
          <div className="w-full lg:w-[45%] py-3">
            <div className="py-2">
              <h1 className="text-2xl">
                 Best Features at{" "}
                <span className={`${uni.text}`}>Dr. K.N. Modi University </span>{" "}
              </h1>
              <p className="text-sm font-thin py-3">
                We understand the importance of making quality education
                accessible to all. At Dr. K.N. Modi University , we offer a wide
                range of courses at affordable prices, ensuring that students
                from diverse backgrounds can pursue their academic goals
                without financial constraints.
              </p>
            </div>
            <div>
              {features?.map((data, index) => (
                <div className="flex gap-3 mb-2 items-start" key={index}>
                  <div className="w-[100px] h-[40px] flex justify-center items-center bg-[#ff7350]">
                    <div className="text-2xl">{data.icon}</div>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">{data.subHed}</h4>
                    <p className="text-sm font-thin py-2">{data.preGraph}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* End First Box */}

          {/* Start Second Box */}
          <div className="w-full lg:w-[45%] relative overflow-hidden">
            <div className="w-full h-[300px] lg:h-[90%] overflow-hidden">
              {/* {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ${
                    currentSlide === index + 1 ? "translate-x-0" : "-translate-x-full"
                  }`}
                  style={{ borderRadius: "8px" }}
                />
              ))} */}
            </div>
          </div>
          {/* End Second Box */}
        </div>
      </div>
    </div>
  );
}

export default OurFeatures;





import React from "react";
import "./index.css";
import abanner from './image/bg1.jpg';
const TopBanner = ({  title }) => {
  return (
    <div
      style={{ backgroundImage: `url(${abanner})` }}
      className={`w-full h-[25vh] md:h-[50vh] md:bg-center bg-fixed aboutBgBanner`}
    >
      <div className="about-overlay flex justify-center items-center h-[100%] w-[100%] ">
        <div className="flex justify-center text-white w-[60%] mx-auto items-center flex-col">
          <div className="text-[#48a4d7]  text-4xl font-bold">{title}</div>
          {/* <div className='py-2 text-[18px] text-center xl:text-[28px]  font-[600]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta recusandae animi magnam eius numquam, ipsum corrupti ullam, sequi laborum quaerat asperiores. Dolor minima nostrum aperiam recusandae facilis officiis suscipit placeat.</div>
                    <div className='text-[12px] text-center xl:text-[16px] font-[400] text-white'>Improving Lives Through Learning.</div> */}
        </div>
      </div>
    </div>
  );
};

export default TopBanner;

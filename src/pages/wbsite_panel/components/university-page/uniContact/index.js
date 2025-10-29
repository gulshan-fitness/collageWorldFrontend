import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { LuContact } from "react-icons/lu";
import { FaMapSigns } from "react-icons/fa";

const UniContact = () => {
  return (
    <div fluid className="py-10 w-full">
      <div className="flex justify-between w-[100%] text-[#fdc800] mx-auto flex-wrap py-[40px]">
        <div className=" rounded-lg w-[80%] mx-auto lg:w-[25%] my-3 bg-[#002147] py-3">
          <div className="text-center md:text-[24px] text-[20px] lg:text-[28px] font-[700] ">
            CORPORATE OFFICE
          </div>
          <div className="flex p-4 md:ms-10  lg:ms-4  gap-4 ">
            <AiOutlineMail className="text-[40px] text-matching" />
            <div className="text-[12px] md:text-[16px]">
              <div className="p-1 font-[700]">Email Address</div>
              <div className="font-[700] hover:text-[#fdc800] duration-300 cursor-pointer text-white">
              quantumncollege@gmail.com
              </div>
            </div>
          </div>
          <div className="flex p-4 md:ms-10 lg:ms-4  gap-4 ">
            <LuContact className="text-[40px] text-matching" />
            <div className="text-[12px] md:text-[16px]">
              <div className="p-1 font-[700]">Phone Number</div>
              <div className="font-[700] hover:text-[#fdc800] duration-300 cursor-pointer text-white">
              919257767661
              </div>
            </div>
          </div>
          <div className="flex p-4 md:ms-10 lg:ms-4  gap-4 ">
            <FaMapSigns className="text-[40px] text-matching" />
            <div className="text-[12px] md:text-[16px]">
              <div className="p-1 font-[700]">Address</div>
              <div className="font-[700] hover:text-[#fdc800] cursor-pointer duration-300 text-white">
                Quantum University Dehradun Roorkee
              </div>
            </div>
          </div>
        </div>
        <div className=" rounded-lg w-[80%] mx-auto lg:w-[25%] my-3 bg-[#002147] py-3">
          <h1 className="text-center md:text-[24px] text-[20px] lg:text-[28px] font-[700] ">
            CAMPUS ADDRESS
          </h1>
          <div className="flex p-4 md:ms-10 lg:ms-4  gap-4 ">
            <AiOutlineMail className="text-[40px] text-matching" />
            <div className="text-[12px] md:text-[16px]">
              <p className="p-1 font-[700]">Email Address</p>
              <p className="font-[700] hover:text-[#fdc800] duration-300 cursor-pointer text-white">
              quantumncollege@gmail.com
              </p>
            </div>
          </div>
          <div className="flex p-4 md:ms-10 lg:ms-4  gap-4 ">
            <LuContact className="text-[40px] text-matching" />
            <div className="text-[12px] md:text-[16px]">
              <p className="p-1 font-[700]">Phone Number 1</p>
              <p className="font-[700] hover:text-[#fdc800] duration-300 cursor-pointer text-white">
              919257767661
              </p>
            </div>
          </div>
          <div className="flex p-4 md:ms-10 lg:ms-4  gap-4 ">
            <LuContact className="text-[40px] text-matching" />
            <div className="text-[12px] md:text-[16px]">
              <p className="p-1 font-[700]">Address</p>
              <p className="font-[700] hover:text-[#fdc800] duration-300 cursor-pointer text-white">
                Quantum University Mandawar (22 Km milestone) Roorkee - Dehradun
                Highway (NH 73) Roorkee # 247167 Uttarakhand India.
              </p>
            </div>
          </div>
        </div>
        <div className=" rounded-lg w-[80%] mx-auto lg:w-[25%] my-3 bg-[#002147] py-3">
          <h1 className="text-center md:text-[24px] text-[20px] lg:text-[28px] font-[700] ">
            CONTACT NUMBERS
          </h1>
          <div className="flex p-4 md:ms-10 lg:ms-4  gap-4 ">
            <AiOutlineMail className="text-[40px] text-matching" />
            <div className="text-[12px] md:text-[16px]">
              <p className="p-1 font-[700]">Emergency</p>
              <p className="font-[700] hover:text-[#fdc800] duration-300 cursor-pointer text-white">
              quantumncollege@gmail.com
              </p>
            </div>
          </div>
          <div className="flex p-4 md:ms-10 lg:ms-4  gap-4 ">
            <LuContact className="text-[40px] text-matching" />
            <div className="text-[12px] md:text-[16px]">
              <p className="p-1 font-[700]">Toll Free Number</p>
              <p className="font-[700] hover:text-[#fdc800] duration-300 cursor-pointer text-white">
              18002743014
              </p>
            </div>
          </div>
          <div className="flex p-4 md:ms-10 lg:ms-4  gap-4 ">
            <LuContact className="text-[40px] text-matching" />
            <div className="text-[12px] md:text-[16px]">
              <p className="p-1 font-[700]">Help Desk</p>
              <p className="font-[700] hover:text-[#fdc800] duration-300 cursor-pointer text-white">
              +91-9319909777
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniContact;

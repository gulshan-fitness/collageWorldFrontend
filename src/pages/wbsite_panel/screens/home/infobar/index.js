
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import color from "../../../utils/colour";

const InfoBar = () => {

  return (
    <div
    style={{
      background: color.theme,
      color: color.mainTextColor,
    }}
    className="w-full flex py-1 justify-center"
  >
    <div className="sm:w-[90%] w-full flex flex-col sm:flex-row justify-between ps-2 pe-4 py-1">
      <a
        href="tel:919988776655"
        target="_blank"
        className="flex items-center cursor-pointer gap-2 hover:text-white mb-2 sm:mb-0"
      >
        <IoIosCall />
        <div>7791996354</div>
      </a>
  
      <div className="flex gap-4 sm:gap-8 sm:mt-1 justify-center">
        <a href="" target="_blank">
          <FaFacebook className="hover:text-white cursor-pointer" />
        </a>
        <a href="" target="_blank">
          <FaInstagram className="hover:text-white cursor-pointer" />
        </a>
        <a href="" target="_blank">
          <FaTwitter className="hover:text-white cursor-pointer" />
        </a>
        <a href="" target="_blank">
          <FaYoutube className="hover:text-white cursor-pointer" />
        </a>
      </div>
    </div>
  </div>
  
  );
};

export default InfoBar;
// bg-[#483D8B]
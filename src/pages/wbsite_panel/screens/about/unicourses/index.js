import React from "react";
import uniImg from "./demoPageImg/uni.png";
import { TiTick } from "react-icons/ti";
const DemoPage = () => {
  return (
    <div className=" mx-auto flex flex-col p-2  items-center bg-white border gray-200 rounded-lg shadow md:flex-row md:w-[70%] ">
      <div className="object-cover  rounded-t-lg w-28 md:w-48 lg:w-48 md:rounded-none md:rounded-s-lg">
        <img src={uniImg} alt="" />
      </div>
      <div className="w-[100%] 4 flex flex-col md:justify-start md:items-start justify-center items-center p-4 leading-normal">
        <div className="2 w-full">
          <div className="flex justify-between w-[100%]">
            <h5 className="mb-2  text-[22px] md:text-2xl font-bold tracking-tight">
              Quantum University Jaipur
            </h5>
            <h2 className="text-[16px] font-bold ">
              ₹ 67,000<span className="text-[14px] ">/year</span>
            </h2>
          </div>
          <div className="mb-2 2  text-[14px] font-[600] flex gap-4 tracking-tight">
            <div className="">Course Details</div>
            <div className="flex items-center text-[14px] text-green-600 2 gap-2">
              <p>3 Year</p>
              <p>,</p>
              <p>Oncampus</p>
              <p>,</p>
              <p>Full Time</p>
            </div>
          </div>

          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-yellow-300 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-4 h-4 text-yellow-300 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-4 h-4 text-yellow-300 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-4 h-4 text-yellow-300 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              4.95
            </p>
            <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              out of
            </p>
            <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              5
            </p>
          </div>
          <div className="mb-2 2  text-[14px] font-[600] flex gap-4 tracking-tight">
            <div className="">Scholarship : </div>
            <div className="flex items-center text-[14px] text-green-600 2 gap-2">
              <p>according to q care results..</p>
            </div>
          </div>
          <div className="mb-2 2  text-[14px] font-[600] flex gap-4 tracking-tight">
            <div className="">specialisation :</div>
            <div className="flex items-center text-[14px] text-green-600 2 gap-2">
              <p>Digital Marketing</p>
              <p>| Human Resourses |</p>
              <p>| Tourism |</p>
              <p>| Hosptal Management |</p>
              <p>| Finance |</p>
            </div>
          </div>

          <div className="mb-2 2  text-[14px] font-[600] flex gap-4 tracking-tight">
            <div className="">Gandhi Nagar, Jaipur</div>
            <div className="flex items-center text-[14px] text-green-600 2">
              <TiTick />
              <p>Approved by UGC AICTE</p>
            </div>
          </div>
          <p className="mb-3 text-[14px] text-center md:text-left font-normal text-gray-500">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <button className="px-2.5 py-1.5 w-[150px] bg-orange-600 rounded text-[600] ">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;


import React from "react";
import image from "./image/manimg.png"


const FormContact = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full py-10">
      <div className="flex lg:justify-between w-[100%] sm:w-[90%] mx-auto justify-center  flex-wrap">
        <img
          src={image}
          alt="img not Found"
          className="lg:w-[30%] w-[70%] sm:mx-0  px-2"
          width={10}
          height={10}
          sizes="50vw"
        />
        <div className="lg:w-[60%]  w-[100%] px-3 sm:px-0 ">
          <h1 className=" pb-2 mt-5 lg:mt-0  md:text-[30px] text-[25px] lg:text-[36px] text-center lg:text-left font-[500]">
            Get In Touch
          </h1>
          <p className="lg:text-[18px] md:text-[16px] text-[12px] text-[#363636] font-[verdana] text-center lg:text-left ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, eius to
            mod tempor incidi dunt ut dolore.
          </p>
          <form
            action=""
            onSubmit={submitHandler}
            className="flex justify-center text-[10px] md:text-[13px] lg:text-[15px] flex-col"
          >
            <div className="flex justify-between  mt-[30px]">
              <input
                type="text"
                placeholder="Name"
                className="rounded-md p-3 border-2 outline-none focus:border-gray-500 w-[40%]"
                required
              />
              <input
                type="email"
                name=""
                id=""
                placeholder="Email"
                className="rounded-md p-3 border-2 outline-none focus:border-gray-500 w-[40%]"
                required
              />
            </div>
            <div className="flex justify-between  mt-[30px]">
              <input
                type="text"
                placeholder="Phone"
                className="p-3 rounded-md border-2 outline-none focus:border-gray-500 w-[40%]"
                required
              />
              <input
                type="text"
                name=""
                id=""
                placeholder="Subject"
                className="rounded-md p-3 border-2 outline-none focus:border-gray-500 w-[40%]"
                required
              />
            </div>
            <div className="flex justify-between md:h-[170px] rounded-md overflow-hidden lg:h-[200px] h-[150%]  mt-[30px]">
              <textarea
                name=""
                id=""
                placeholder="Message"
                className="w-[100%] h-full rounded-md border-2 outline-none focus:border-gray-500 p-3"
              ></textarea>
            </div>
            <div className="mt-[30px]">
              <button className=" bg-[#002147] text-white duration-500 outline-none border-none w-full p-3 font-[700] rounded-md hover:text-[#fdc800]">
                {" "}
                Submit Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormContact;

import React from "react";
import Container from "../container/Container";

const ConnetQuery = ({ collegeDetails }) => {
  return (
    <div className="flex bg-[#f78c45] py-10 text-white justify-center items-center flex-col">
      <h1 className="uppercase lg:text-[30px] md:text-[25px] text-[20px] pt-6 font-semibold">
        Connet for your Query
      </h1>
      <h1 className=" lg:text-[45px] md:text-[35px] text-[25px]  pb-2  font-semibold">
        {collegeDetails.college_name }
      </h1>
      <button
        className="btn bg-[#fff]  text-black hover:bg-[#000] hover:text-[white] rounded-md font-semibold px-3 py-2
                      "
      >
        {collegeDetails.contactNumber }
      </button>
    </div>
  );
};

export default ConnetQuery;

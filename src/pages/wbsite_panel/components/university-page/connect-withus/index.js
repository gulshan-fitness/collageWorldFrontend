import React from "react";
import Container from "../container/Container";

const ConnectWithUs = ({ universityName, contactNumber, description }) => {
  return (
    <Container fluid extraclassName="py-8">
      <div className="connect-bg rounded-2xl lg:w-[900px] overflow-hidden text-white mx-auto">
        <div className="connect-bg-inner">
          <h1 className="text-center uppercase pb-4 mt-4 lg:text-[40px] md:text-[30px] text-[25px] font-semibold">
            Connect For Queries
          </h1>
          <p className="text-center md:text-[14px] text-md px-4 lg:px-14">
            {description}
          </p>
          <h1 className="text-center lg:text-[50px] md:text-[40px] text-[20px] md:px-14 px-4 mt-8 text-yellow-300 font-semibold">
            {universityName}
          </h1>
          <div className="flex justify-center py-4">
            <button
              className="btn bg-[#FF6600] hover:bg-[#000] hover:border-black rounded-md font-semibold px-3 py-2"
            >
              <a href={`tel:${contactNumber}`}>{contactNumber}</a>
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ConnectWithUs;

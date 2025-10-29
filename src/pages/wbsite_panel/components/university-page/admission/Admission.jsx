import React from "react";
import Container from "../container/Container";
import img from "./Adm prc.gif"; // Ensure the file name and path are correct

const Admission = () => {
  return (
    <Container fluid extraclassName="bg-[#FFF] py-10">
      <Container>
        <h1 className="text-center py-8 text-[35px] font-semibold">
          Admission Process
        </h1>
        <div className="flex justify-center">
          <img
            src={img}
            alt="Admission Process GIF"
            className="shadow-2xl"
            style={{ maxWidth: "100%", height: "auto" }} // Responsive image sizing
          />
        </div>
      </Container>
    </Container>
  );
};

export default Admission;

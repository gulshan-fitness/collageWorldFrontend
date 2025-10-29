import React from 'react';
import "./index.css";
import myntra from "./image/amazone.png";
import infosys from "./image/infosys.png";
import hcl from "./image/hcl.png";
import amazone from "./image/amazone.png";
import wipro from "./image/wipro.png";
import decathlon from "./image/decathlon.png";



const CollegeApproved = () => {
  return (
    <div className='bg-[#0f0528]'>
      <div className="Approved-main">
        <div className=''>
          <img src={myntra} alt="Myntra" />
          <h3>Jane Doe</h3>
        </div>
        <div>
          <img src={wipro} alt="Wipro" />
          <h3>John Doe</h3>
        </div>
        <div>
          <img src={amazone} alt="Amazon" />
        </div>
        <div>
          <img src={decathlon} alt="Decathlon" />
        </div>
        <div>
          <img src={hcl} alt="HCL" />
          <h3>Jane Doe</h3>
        </div>
        <div>
          <img src={infosys} alt="Infosys" />
        </div>
      </div>
    </div>
  );
}

export default CollegeApproved;
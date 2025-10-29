  import React from "react";
  import "./index.css";
  import parse from "html-react-parser";

  const InfiAnimation = ({ hiring_partners, collegeDetails }) => {
    // Duplicate the hiring partners for a continuous scroll effect
    const extendedPartners = [...hiring_partners, ...hiring_partners];
    
    return (
      <div className="container">
        <div className="brand-section">
          <div className="slider">
            <div className="slide-track">
              {extendedPartners?.map((data, index) => (
                <div className="slide" key={index}>
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}image/hiring_partners_logo/${data.logo}`}
                    className="slide-image"
                    alt={data.companyName}
                  />
                  <div className="company-name">{data.companyName}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="content-section">
          <div className="preview text-black">
            {collegeDetails?.placementDetails?.[0]?.placemenet_paragraph
              ? parse(collegeDetails.placementDetails[0].placemenet_paragraph)
              : "Data not available"}
          </div>
        </div>
      </div>
    );
  };

  export default InfiAnimation;

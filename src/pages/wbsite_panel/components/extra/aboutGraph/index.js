import React, { useEffect } from "react";
import "./index.css";

const YourComponent = () => {
  useEffect(() => {
    const handleScroll = () => {
      const timelineLine = document.querySelector(".timeline-line");
      const timelineImage = document.querySelector(".timeline-image");

      const maxTimelineHeight =
        (document.querySelectorAll(".my-container").length - 1) * 100;

      const scrollPercentage = (window.scrollY / maxTimelineHeight) * 65; // Adjust the speed as needed

      const adjustedPercentage = Math.min(100, scrollPercentage);
      timelineLine.style.height = `${adjustedPercentage}%`;
      timelineImage.style.top = `${adjustedPercentage}%`;
    };

    document.addEventListener("DOMContentLoaded", handleScroll);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("DOMContentLoaded", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures the effect runs once on component mount

  return (
    <div>
      <div className="my-timeline">
        <div className="my-container left-container">
          <h5>Year 1994</h5>
          <div className="text-box">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
              rerum! Non, laborum illum ea at ducimus, quia animi veniam,
              sapiente laudantium saepe magni aliquid dignissimos rerum quam
              placeat consectetur! Assumenda.
            </p>
          </div>
        </div>
        <div className="my-container right-container">
          <h5>Year 1996</h5>
          <div className="text-box">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
              rerum! Non, laborum illum ea at ducimus, quia animi veniam,
              sapiente laudantium saepe magni aliquid dignissimos rerum quam
              placeat consectetur! Assumenda.
            </p>
          </div>
        </div>
        <div className="my-container left-container">
          <h5>Year 1998</h5>
          <div className="text-box">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
              rerum! Non, laborum illum ea at ducimus, quia animi veniam,
              sapiente laudantium saepe magni aliquid dignissimos rerum quam
              placeat consectetur! Assumenda.
            </p>
          </div>
        </div>
        <div className="my-container right-container">
          <h5>Year 2000</h5>
          <div className="text-box">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
              rerum! Non, laborum illum ea at ducimus, quia animi veniam,
              sapiente laudantium saepe magni aliquid dignissimos rerum quam
              placeat consectetur! Assumenda.
            </p>
          </div>
        </div>
        <div className="my-container left-container">
          <h5>Year 2001</h5>
          <div className="text-box">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
              rerum! Non, laborum illum ea at ducimus, quia animi veniam,
              sapiente laudantium saepe magni aliquid dignissimos rerum quam
              placeat consectetur! Assumenda.
            </p>
          </div>
        </div>
        <div className="my-container right-container">
          <h5>Year 2002</h5>
          <div className="text-box">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
              rerum! Non, laborum illum ea at ducimus, quia animi veniam,
              sapiente laudantium saepe magni aliquid dignissimos rerum quam
              placeat consectetur! Assumenda.
            </p>
          </div>
        </div>
        <div className="my-container left-container">
          <h5>Year 2004</h5>
          <div className="text-box">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
              rerum! Non, laborum illum ea at ducimus, quia animi veniam,
              sapiente laudantium saepe magni aliquid dignissimos rerum quam
              placeat consectetur! Assumenda.
            </p>
          </div>
        </div>
        <div className="my-container right-container">
          <h5>Year 2008</h5>
          <div className="text-box">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
              rerum! Non, laborum illum ea at ducimus, quia animi veniam,
              sapiente laudantium saepe magni aliquid dignissimos rerum quam
              placeat consectetur! Assumenda.
            </p>
          </div>
        </div>
        <div className="timeline-line"></div>
        <img
          className="timeline-image"
          src="http://flagcorp.brandedbybrandemic.com/wp-content/uploads/2023/10/Frame-39652-1.svg"
          alt=""
        />
      </div>
    </div>
  );
};

export default YourComponent;

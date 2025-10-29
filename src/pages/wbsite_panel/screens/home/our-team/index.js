import React, { useEffect, useContext } from "react";
import Slider from "react-slick";
import "./ourTeam.css"; // Assuming your CSS is in this file
// import AOS from 'aos';
// import 'aos/dist/aos.css';
import axios from "axios";
import { Context } from "../../../../../Context_holder";
import a1 from "./img/a1.jpg";
import a2 from "./img/a2.jpg";
import a3 from "./img/a3.jpg";
import img4 from "./img/a2.jpg"
import img1 from "./img/c1.jpg"
import cto from "./img/c1.jpg"
import Loader from "../../../components/Loader";
import im1 from "./img/1.png"
import im2 from "./img/2.png"
// import im3 from "./img/c1.jpg"
import { useState } from "react";

const OurTeam = () => {
  useEffect(() => {

  }, []);

  const { setuserSignUp_popup, user,notify, enquiry_value, setenquiry_value, setapply_popUpIsOpen } = useContext(Context);
  
const [showloader,setshowloader] =useState(false)

  
  const enquiry_api = () => {



    const data={
      enquiry: enquiry_value ?? null,
    };

  
setshowloader(true)
    axios
      .patch(
        process.env.REACT_APP_API_BASE_URL +
        process.env.REACT_APP_USER_URL +
        "enquiry_edit/" +
        user?._id,
        data
      )
      .then((success) => {
        console.log("enquiry_edit:", success);
        if (success.data.status === 1) {
          setenquiry_value("");
          setapply_popUpIsOpen(true)
          setshowloader(false)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const enquiry_Handler = () => {

    if (user == null) {
      setuserSignUp_popup(true);
    } 

    else {
      if(enquiry_value!=""){

        enquiry_api();
      }

      else {
        notify("please fill the input",0)

      }
      

    }

  };



  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Duration for each slide (3 seconds)
  };



  return (
    <section className="bg-[#171717] w-full flex justify-center">
      <div className="md:flex w-[90%]">
        {/* Enquiry Section */}



        <div className="w-full md:w-[30%] bg-[#18092f] p-6 rounded-lg shadow-lg mr-4">
          <h3 className="text-xl text-blue-600 font-semibold mb-4">BOOK COUNSELLING</h3>
          <p className="text-sm text-gray-300 mb-4">
            Have questions? Reach out to us!
          </p>
          <textarea
            placeholder="Your Enquiry"
            className="w-full text-black h-24 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 mb-4"
            value={enquiry_value}
            onChange={(e) => setenquiry_value(e.target.value)}
          />

          {
           showloader ?(<Loader/>):
            (<button
            onClick={enquiry_Handler}
            className="w-full h-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm transition duration-200"
          >
            Send
          </button>)
          }
          

          {/* Slider for Informative Images */}
          <div className="mt-4 h-48 overflow-hidden">
            <Slider {...sliderSettings}>
              <div className="h-full flex justify-center items-center">
                <img
                  src={a1}
                  alt="Informative"
                  className="h-full object-cover"
                />
              </div>
              <div className="h-full flex justify-center items-center">
                <img
                  src={a2}
                  alt="Informative"
                  className="h-full object-cover"
                />
              </div>
              <div className="h-full flex justify-center items-center">
                <img
                  src={a3}
                  alt="Informative"
                  className="h-full object-cover"
                />
              </div>
            </Slider>
            <p className="text-center text-sm text-gray-500 mt-2">
              Your feedback helps us improve!
            </p>
          </div>
          
          {/* Contact Us Section */}
          <div className="mt-12">
            <h3 className="text-2xl text-blue-600 font-semibold">Contact Us</h3>
            <p className="text-sm text-white mb-2">
              For inquiries, feel free to reach out via email.
            </p>
            {/* <p className="text-md text-yellow-400 mb-4">
              Email: <a href="mailto:contact@example.com" className="text-blue-500">ofcwrk@co.uk</a>
            </p> */}
            <p className="text-md text-yellow-400 mb-4">
              Email: <a href="mailto:contact@example.com" className="text-blue-500">ofcw0rk56@co.uk</a>
            </p>
            <p className="text-md text-white">
              We look forward to hearing from you!
            </p>
          </div>
        </div>


        

        {/* Team Section */}
        <div className="w-full md:w-[70%] md:mt-0 mt-8">
          <span>meet our</span>
          <h2 >Team</h2>
          <p >
            Meet the talented individuals behind our success. Our team is a
            diverse group of professionals committed to delivering excellence in
            every project. From innovative designers to skilled developers, we
            collaborate to bring creative solutions and cutting-edge technology to
            life. Each team member brings unique skills and perspectives, ensuring
            that we approach challenges from all angles and achieve outstanding
            results.
          </p>
          <span className="bg-watermark">team</span>
          <div className="cards">
            {/* Team Member Cards */}
            <div className="card" >
              <img
                src={im1}
                alt="Founder"
              />
              <div className="card-content">
                <h3>Ajay Singh</h3>
                <p>CEO</p>
                <ul>
                  <li>
                    <a href="#">
                      <i className="fa-brands fa-x-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-brands fa-linkedin-in"></i> 
                    </a>
                  </li>
                </ul>
              </div>
            </div>
             <div className="card " >
              <img
                src={im2}
                alt="Sarah Connor"
              />
              <div className="card-content">
                <h3>Dr. Akshita</h3>
                <p>Co-Founder</p>
                <ul>
                  <li>
                    <a href="#">
                      <i className="fa-brands fa-x-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card " >
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Antonia Moore"
              />
              <div className="card-content">
                <h3>antonia moore</h3>
                <p> Manager</p>
                <ul>
                  <li>
                    <a href="#">
                      <i className="fa-brands fa-x-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="card  md:mt-0 mt-4" >
              <img
                src={cto}
                alt="Travis Lynch"
                 className="w-52 h-52 object-cover object-center  mx-auto  scale-125"
                
              />
              <div className="card-content ">
                <h3>Bhawani shankar sharma</h3>
                <p>CTO</p>
                <ul>
                  <li>
                    <a href="#">
                      <i className="fa-brands fa-x-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
           
            {/* Add more team member cards as needed */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;

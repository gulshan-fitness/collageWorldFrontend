import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../../../Context_holder";
import Select from "react-select";
import { IoClose } from "react-icons/io5";
import { FaGraduationCap, FaBookOpen, FaChalkboardTeacher } from "react-icons/fa";
import Loader from "../../components/Loader";

const states = require("../../../../Json_files/States.json");


export default function UserSignUp_Popup() {
  const {
    course_fetch,
    course,
    selected_state,
    setselected_state,
    handlestateInputChange,
    statemenuIsOpen,
    setuser,
    setusertoken,
    userSignUp_popup,
    setuserSignUp_popup,
    notify,
    setuserLogin_popup,
    RefrelUsersFetch,
    user,
  } = useContext(Context);

  const { id } = useParams();
  const [selected_course, setselected_course] = useState(null);
  const LocationPath = window?.location?.pathname?.split("/");

  const [otp, setotp] = useState("");
  const [otpsection, setotpsection] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);
    const [ApiData, setApiData] = useState(null);
 const [Loadershow, setLoadershow] = useState(false);


  useEffect(() => {
    course_fetch();
  }, []);

  const uniqueCourses = course?.filter(
    (course, index, self) =>
      index === self.findIndex((c) => c.courseName === course.courseName)
  );

  useEffect(() => {
    let timer;
    if (isActive && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      setSeconds(60);
    }
    return () => clearInterval(timer);
  }, [isActive, seconds]);

  const startCountdown = () => {
    setIsActive(true);
  };

  const otp_section_handler = (e) => {
    e.preventDefault();
    setLoadershow(true)
    const email =
      LocationPath[1] === "refrel" ? user?.email : e.target?.email?.value;


      
    const name = e.target.name.value;
    const Email = e.target.email.value;
    const contact = e.target.contact.value;
    const state = selected_state?.value;
    const city = e.target.city.value;
    const course = selected_course?.label;



    const data = { name, email:Email, contact, state, city, course };
    if (LocationPath[1] === "refrel" && user) {
      data.referelUser = user?._id;
      data.enquiry = "comes from refrel";
    }
    if (id)data.college_id = id;

      
    

    setApiData(data)


      

    let apiUrl = `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_OTP_URL}send`;
    LocationPath[1] === "refrel"
      ? (apiUrl += "/refrel")
      : (apiUrl += "/signup");

    axios
      .post(apiUrl, { email: email })
      .then((success) => {
        notify(success.data.msg, success.data.status);
        if (success.data.status === 1) {
          setotpsection(true);
          startCountdown();
           setLoadershow(false)
        }
      })
      .catch((error) => {});
  };

  const submit_signup_handler = () => {

if(!ApiData) return
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_USER_URL}/sign_up`,
        ApiData
      )
      .then((success) => {
        notify(success.data.msg, success.data.status);
        if (success.data.status === 1) {
        reset_handler();

          if (LocationPath[1] === "refrel" && user) {
            RefrelUsersFetch(user?._id);
          } 
          else {
            setuser(success.data.user);
            setusertoken(success.data.token);
            localStorage.setItem("user", JSON.stringify(success.data.user));
            localStorage.setItem("usertoken", success.data.token);
          }
          setuserSignUp_popup(false);

        } 
      })
      .catch((error) => {});
  };



  
  const api_handler = () => {


if(!ApiData) return
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_OTP_URL}verify`,
        {
          email: LocationPath[1] === "refrel"
              ? user?.email
              : ApiData?.email,
          otp,
        }
      )
      .then((success) => {
        notify(success.data.msg, success.data.status);
        if (success.data.status === 1) {
          submit_signup_handler();
        }
      })
      .catch((error) => {});
  };

  const reset_handler = () => {
    setIsActive(false);
    setotpsection(false);
    setotp("");
    setSeconds(60);
    setselected_course(null)
    setselected_state(null)
  };

  const sign_in_handler = () => {
    setuserSignUp_popup(false);
    setuserLogin_popup(true);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-full flex items-center justify-center z-50 transition-all duration-500 ease-out ${
        userSignUp_popup ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-95"
      } bg-black bg-opacity-60`}
    >
      <div className={`relative bg-white rounded-2xl shadow-2xl max-w-3xl w-[95%] md:w-[70%] lg:w-[55%] p-6 md:p-10 overflow-y-auto max-h-[90vh] transition-all duration-500 ease-out ${
        userSignUp_popup ? "scale-100 rotate-0" : "scale-90 rotate-1"
      }`}>
        {/* Close button */}
        <button
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 transition-transform duration-200 hover:scale-110"
          onClick={() => setuserSignUp_popup(false)}
        >
          <IoClose className="text-3xl" />
        </button>

        {/* Logo */}
        <div className="text-center mb-6">
          <Link to="/">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-800">
              AAOPADHE
            </h1>
          </Link>
          <p className="text-gray-600 mt-1">Your Gateway to the Best Colleges</p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg shadow-sm">
            <FaGraduationCap className="text-blue-600 text-3xl mb-2" />
            <p className="text-sm font-medium text-gray-800 text-center">
              Access Top Colleges
            </p>
          </div>
          <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg shadow-sm">
            <FaBookOpen className="text-blue-600 text-3xl mb-2" />
            <p className="text-sm font-medium text-gray-800 text-center">
              Free Study Resources
            </p>
          </div>
          <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg shadow-sm">
            <FaChalkboardTeacher className="text-blue-600 text-3xl mb-2" />
            <p className="text-sm font-medium text-gray-800 text-center">
              Expert Guidance
            </p>
          </div>
        </div>

        {/* Form */}
        <form  onSubmit={otp_section_handler}>
          {!otpsection ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-1">
                    Contact Number
                  </label>
                  <input
                    type="number"
                    name="contact"
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-1">
                    State
                  </label>
                  <Select
                    options={states?.map((s) => ({
                      value: s?.name,
                      label: s?.name,
                    }))}
                    value={selected_state}
                    onChange={setselected_state}
                    onInputChange={handlestateInputChange}
                    menuIsOpen={statemenuIsOpen}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">
                    Course
                  </label>
                  <Select
                    options={uniqueCourses?.map((c) => ({
                      value: c?.courseName,
                      label: c?.courseName,
                    }))}
                    value={selected_course}
                    onChange={setselected_course}
                  />
                </div>
              </div>

              {
                Loadershow? (   <Loader color={"border-[blue] mt-1"}/>):(
 <button
                type="submit"
                className="w-full mt-6 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg shadow-md transition"
                
              >
                Get OTP
              </button>
                )
              }
          
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-1">OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setotp(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={api_handler}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
                >
                  Verify OTP
                </button>




                <span className="text-sm text-gray-600">
                  {isActive ? `Resend in ${seconds}s` : (
                    <button type="submit" className="text-blue-600 font-semibold">
                      Resend OTP
                    </button>
                  )}
                </span>
                



                
              </div>
                <button
                  type="button"
                  onClick={()=>setotpsection(false)}
                 
                  className="text-[orange]  mt-3  font-bold "
                >
                 Change Details
                </button>
            </>
          )}
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-700">
            Already have an account?{" "}
            <span
              onClick={sign_in_handler}
              className="text-blue-700 font-semibold cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

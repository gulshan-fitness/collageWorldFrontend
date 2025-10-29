import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../../../../Context_holder";
import { IoClose } from "react-icons/io5";

export default function UserLoginPopup() {
  const { setusertoken, setuser, userLogin_popup, setuserLogin_popup, notify, setuserSignUp_popup } =
    useContext(Context);

  const [email, setemail] = useState("");
  const [otp, setotp] = useState("");
  const [otpsection, setotpsection] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [message, setmessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loader for OTP process

  const submit_login_handler = () => {
    if (email !== "") {
      setLoading(true); // start loading
      axios
        .post(
          process.env.REACT_APP_API_BASE_URL +
            process.env.REACT_APP_OTP_URL +
            "send",
          { email }
        )
        .then((success) => {
          notify(success.data.msg, success.data.status);
          if (success.data.status === 1) {
            setotpsection(true);
            startCountdown();
          }
        })
        .catch(() => {
          notify("Something went wrong, try again!", 0);
        })
        .finally(() => setLoading(false)); // stop loading
    } else {
      setmessage("Please enter the email");
    }
  };

  useEffect(() => {
    let timer;
    if (isActive && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
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

  const OtpConfirm_handler = () => {
    setLoading(true);
    axios
      .post(
        process.env.REACT_APP_API_BASE_URL +
          process.env.REACT_APP_OTP_URL +
          "verify",
        { email, otp }
      )
      .then((success) => {
        notify(success.data.msg, success.data.status);
        if (success.data.status === 1) {
          axios
            .post(
              process.env.REACT_APP_API_BASE_URL +
                process.env.REACT_APP_USER_URL +
                "login",
              { email }
            )
            .then((success) => {
              notify(success.data.msg, success.data.status);
              if (success.data.status === 1) {
                setuserLogin_popup(false);
                setuser(success.data.user);
                setusertoken(success.data.token);
                localStorage.setItem("user", JSON.stringify(success.data.user));
                localStorage.setItem("usertoken", success.data.token);
              } else {
                reset_handler();
                setuserSignUp_popup(true);
                setuserLogin_popup(false);
              }
            });
        }
      })
      .finally(() => setLoading(false));
  };

  const reset_handler = () => {
    setIsActive(false);
    setotpsection(false);
    setemail("");
    setotp("");
    setSeconds(60);
  };

  const sign_up_handler = () => {
    setuserLogin_popup(false);
    setuserSignUp_popup(true);
    setotp("");
  };

  return (
    <div
      className={`h-full flex items-center justify-center py-10 ${
        userLogin_popup ? "top-0" : "top-[-140%]"
      } z-20 duration-300 fixed top-0 left-0 w-full bg-black bg-opacity-80`}
    >
      {/* Close button */}
      <button
        className="absolute right-5 top-4 text-white hover:text-[#fdc800] transition"
        onClick={() => setuserLogin_popup(false)}
      >
        <IoClose className="text-3xl" />
      </button>

      <div className="w-full max-w-md px-4">
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <Link
            to="/"
            onClick={() => setuserLogin_popup(false)}
            className="flex items-center"
          >
            <h1 className="text-[#fdc800] hover:scale-105 duration-300 font-bold text-2xl sm:text-3xl">
              AAOPADHE
            </h1>
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-gradient-to-br from-[#001a33] via-[#002147] to-[#003366] p-8 rounded-2xl shadow-2xl border border-[#fdc800]/60 w-full text-white">
          <div className="flex justify-center">
            <i className="fa-solid fa-user text-6xl text-[#fdc800] mb-3"></i>
          </div>
          <h2 className="text-xl font-semibold mb-6 text-center uppercase tracking-wide">
            User Login
          </h2>

          <button
            className={`text-sm font-semibold text-[#fdc800] mb-6 ${
              !otpsection ? "hidden" : "block"
            }`}
            onClick={reset_handler}
          >
            Change Email
          </button>

          {/* Email Input */}
          <div className={`${otpsection ? "hidden" : "block"} mb-4`}>
            <label
              className="block text-sm font-bold mb-2 text-[#fdc800]"
              htmlFor="email"
            >
              Email
            </label>
            <input
              onChange={(e) => setemail(e.target.value)}
              type="email"
              id="email"
              value={email}
              name="email"
              placeholder="Enter Email"
              required
              className="w-full py-2 px-3 rounded-lg text-black focus:ring-2 focus:ring-[#fdc800] outline-none"
            />
            <span className="text-red-400 text-sm">{message}</span>
          </div>

          {/* OTP Input */}
          <div className={`${!otpsection ? "hidden" : "block"} mb-4`}>
            <label
              className="block text-sm font-bold mb-2 text-[#fdc800]"
              htmlFor="otp"
            >
              OTP
            </label>
            <input
              type="number"
              id="otp"
              value={otp}
              maxLength={6}
              onChange={(e) => setotp(e.target.value)}
              name="otp"
              className="w-full py-2 px-3 rounded-lg text-black focus:ring-2 focus:ring-[#fdc800] outline-none"
            />
          </div>

          {/* Buttons */}
          {!otpsection && (
            <button
              className="bg-[#fdc800] text-black font-bold w-full py-2 rounded-lg hover:bg-white hover:text-[#002147] transition disabled:opacity-50"
              onClick={submit_login_handler}
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Get OTP"}
            </button>
          )}

          {otpsection && (
            <button
              className="bg-[#fdc800] text-black font-bold w-full py-2 rounded-lg hover:bg-white hover:text-[#002147] transition disabled:opacity-50"
              onClick={OtpConfirm_handler}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Confirm OTP"}
            </button>
          )}

          {/* Loader / Countdown */}
          {loading && (
            <div className="flex justify-center mt-4">
              <div className="w-6 h-6 border-4 border-[#fdc800] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <div
            className={`${
              !isActive ? "hidden" : "block"
            } text-gray-300 mt-2 text-sm`}
          >
            You can resend OTP after{" "}
            <span className="text-[#fdc800] font-bold">{seconds}s</span>
          </div>

          <div
            className={`${
              !otpsection || isActive ? "hidden" : "block"
            } text-gray-300 mt-2 text-sm`}
          >
            Didn't receive the OTP?{" "}
            <button
              className="text-[#fdc800] font-bold"
              onClick={submit_login_handler}
            >
              RESEND
            </button>
          </div>

          <div className="mt-6 text-center text-gray-200 text-sm">
            Don’t have an account?{" "}
            <button
              className="text-[#fdc800] font-bold"
              onClick={sign_up_handler}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

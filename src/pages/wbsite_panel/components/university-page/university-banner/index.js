import React, { useContext, useState } from "react";
import { FaWhatsapp, FaPhone, FaGraduationCap, FaAward, FaUsers, FaChartLine, FaArrowRight, FaRegHeart, FaShare } from "react-icons/fa";
import { IoIosCheckmarkCircle, IoIosStar } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import StarRatings from "react-star-ratings";
import { Context } from "../../../../../Context_holder";
import axios from "axios";
import Loader from "../../Loader";

function UniversityBanner({ collegeDetails }) {
  const { setapply_popUpIsOpen, user, setuserSignUp_popup } = useContext(Context);
  const [Loadershow, setLoadershow] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const enquiry_api = () => {
    if (user) {
      const data={college:collegeDetails?._id}
      setLoadershow(true);
      axios
        .patch(
          process.env.REACT_APP_API_BASE_URL +
            process.env.REACT_APP_USER_URL +
            "college_edit/" +
            user?._id,data
            
        )
        .then((success) => {
          if (success?.data?.status === 1) {
            setapply_popUpIsOpen(true);
            setLoadershow(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setuserSignUp_popup(true);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-white via-blue-50 to-purple-50 text-black w-full overflow-hidden">
      {/* Ultra-Light Colorful Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-100/50 to-indigo-100/40 rounded-full animate-float opacity-70"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-r from-indigo-100/45 to-blue-100/35 rounded-full animate-float animation-delay-2000 opacity-60"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-gradient-to-r from-blue-50/40 to-cyan-50/30 rounded-full animate-float animation-delay-4000 opacity-50"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-gradient-to-r from-indigo-50/45 to-purple-50/35 rounded-full animate-pulse opacity-60"></div>
      </div>

      {/* Extremely Subtle Colorful Orbs */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-r from-blue-100/20 to-indigo-100/15 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-r from-indigo-50/15 to-cyan-50/10 rounded-full blur-3xl opacity-35"></div>

      <div className="relative w-[95%] max-w-7xl mx-auto py-3 lg:py-5">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-5">

          {/* Left Content - Modern Light Design */}
          <div className="lg:w-6/12 w-full space-y-3 lg:space-y-4">

            {/* Compact Header Section */}
            <div className="space-y-2">
              <div className="flex flex-col gap-2">
                <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-black leading-tight">
                  {collegeDetails?.college_name}
                </h1>

                {/* Compact Light Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm border border-blue-200/60">
                    <MdLocationOn className="w-3 h-3 text-blue-600" />
                    <span className="text-xs font-medium text-black">Mumbai, India</span>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full px-3 py-1 shadow-sm">
                    <div className="flex items-center gap-1">
                      <FaAward className="w-3 h-3" />
                      <span className="text-xs font-semibold">NAAC A+</span>
                    </div>
                  </div>
                </div>

                {/* Light Approved Section */}
                <div className="flex items-center gap-2 bg-blue-50/80 rounded-lg p-2 border border-blue-200/60">
                  <span className="text-xs font-semibold text-blue-700">Approved By</span>
                  <div className="bg-white rounded-md px-2 py-1 shadow-sm">
                    <span className="text-xs font-bold text-black">
                      {collegeDetails?.affiliatedTo}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Light Colorful Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {[
                { icon: FaGraduationCap, value: "15K+", label: "Courses", color: "from-blue-400 to-indigo-400", bg: "bg-gradient-to-br from-blue-50 to-indigo-50" },
                { icon: FaUsers, value: "50K+", label: "Students", color: "from-emerald-400 to-cyan-400", bg: "bg-gradient-to-br from-emerald-50 to-cyan-50" },
                { icon: FaChartLine, value: "95%", label: "Placement", color: "from-violet-400 to-purple-400", bg: "bg-gradient-to-br from-violet-50 to-purple-50" },
                { icon: FaAward, value: "25+", label: "Years", color: "from-amber-400 to-orange-400", bg: "bg-gradient-to-br from-amber-50 to-orange-50" }
              ].map((item, index) => (
                <div key={index} className={`${item.bg} rounded-lg p-2.5 shadow-sm border border-white/80 backdrop-blur-sm transform hover:scale-105 transition-all duration-300`}>
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-md bg-gradient-to-r ${item.color} text-white shadow-sm`}>
                      <item.icon className="w-3 h-3" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-black">{item.value}</div>
                      <div className="text-[10px] text-gray-700">{item.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Light Features */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-black flex items-center gap-2">
                <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                Why Choose Us
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { text: "Industry Expert Faculty", color: "bg-gradient-to-r from-blue-400 to-indigo-400" },
                  { text: "World-class Infrastructure", color: "bg-gradient-to-r from-emerald-400 to-cyan-400" },
                  { text: "Global Placement Opportunities", color: "bg-gradient-to-r from-violet-400 to-purple-400" },
                  { text: "Research & Innovation Focus", color: "bg-gradient-to-r from-amber-400 to-orange-400" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 group">
                    <div className={`w-5 h-5 rounded-full ${feature.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      <IoIosCheckmarkCircle className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span className="text-[11px] font-medium text-black group-hover:text-blue-700 transition-colors duration-200">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Light CTA Section */}
            <div className="space-y-2 pt-1">
              {/* Light Rating & Apply Row */}
              <div className="flex flex-col sm:flex-row gap-2 items-center justify-between p-2.5 bg-white/90 backdrop-blur-sm rounded-lg border border-blue-200/60 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-yellow-400 rounded-md px-1.5 py-0.5">
                    <IoIosStar className="w-2.5 h-2.5 text-white" />
                    <span className="text-white font-bold text-xs">
                      {collegeDetails?.avgCollegeRating || "4.8"}
                    </span>
                  </div>
                  <div className="text-[10px] text-black">
                    <span className="font-semibold">({collegeDetails?.collegeReviews?.length ?? 0} reviews)</span>
                  </div>
                </div>

                {Loadershow ? (
                  <div className="flex items-center gap-1.5 bg-blue-50 px-2 py-1 rounded-md">
                    <Loader color={"border-blue-500"} />
                    <span className="text-[10px] font-medium text-blue-700">Processing...</span>
                  </div>
                ) : (
                  <button
                    className="group bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-blue-500/25 flex items-center gap-1.5"
                    onClick={enquiry_api}
                  >
                    <span className="text-xs text-white">Apply Now</span>
                    <FaArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                  </button>
                )}
              </div>

              {/* Light Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  className="group flex items-center justify-center gap-1.5 bg-white hover:bg-blue-50 border border-blue-300 hover:border-blue-400 text-black hover:text-blue-700 font-semibold rounded-md px-3 py-2 transition-all duration-300 hover:shadow-sm flex-1 sm:flex-none"
                >
                  <FaPhone className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" />
                  <a
                    href={`tel:+91${collegeDetails?.contactNumber ?? ""}`}
                    className="no-underline text-xs"
                  >
                    Call
                  </a>
                </button>

                <button
                  type="button"
                  className="group flex items-center justify-center gap-1.5 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 text-white font-semibold rounded-md px-3 py-2 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-emerald-500/25 flex-1 sm:flex-none"
                >
                  <FaWhatsapp className="w-3 h-3" />
                  <a
                    href={`https://wa.me/${collegeDetails?.contactNumber ?? ""}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline text-xs"
                  >
                    WhatsApp
                  </a>
                </button>

                {/* Light Social Actions */}
                <div className="flex gap-1.5">
                  <button className="p-2 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-md shadow-sm hover:scale-105 transition-transform duration-300">
                    <FaRegHeart className="w-3 h-3" />
                  </button>
                  <button className="p-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-md shadow-sm hover:scale-105 transition-transform duration-300">
                    <FaShare className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Section - Light Design */}
          <div className="lg:w-6/12 w-full">
            <div className="relative group">
              {/* Main Image Container */}
              <div className="relative bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 rounded-xl shadow-lg overflow-hidden border border-blue-200/50">
                {/* Light Loading Skeleton */}
                {!imageLoaded && (
                  <div className="w-full h-64 sm:h-72 lg:h-80 xl:h-96 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 animate-pulse rounded-xl"></div>
                )}

                <img
                  src={`${process.env.REACT_APP_API_BASE_URL}image/college_logo/${collegeDetails?.university_banner?.[0]}`}
                  alt="University Campus"
                  className={`w-full h-64 sm:h-72 lg:h-80 xl:h-96 object-cover transition-all duration-700 group-hover:scale-105 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />

                {/* Light Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Light Floating Info Cards */}
                <div className="absolute top-2 left-2 transform -translate-y-0.5 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-white rounded-md p-1.5 shadow-md">
                    <div className="text-[10px] font-bold">RANKED #1</div>
                  </div>
                </div>

                <div className="absolute top-2 right-2 transform -translate-y-0.5 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  <div className="bg-gradient-to-r from-blue-400 to-indigo-400 text-white rounded-md p-1.5 shadow-md">
                    <div className="text-[10px] font-bold text-center">EST. 1998</div>
                  </div>
                </div>
              </div>

              {/* Light Accreditation Badges */}
              <div className="absolute -bottom-1.5 -left-1.5 flex gap-1.5">
                <div className="bg-white/98 backdrop-blur-sm rounded-md p-1.5 shadow-md border border-blue-200/70 hover:scale-105 transition-transform duration-300">
                  <div className="text-[10px] font-bold text-blue-600">UGC</div>
                </div>
                <div className="bg-white/98 backdrop-blur-sm rounded-md p-1.5 shadow-md border border-blue-200/70 hover:scale-105 transition-transform duration-300">
                  <div className="text-[10px] font-bold text-emerald-600">AICTE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Light Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(30deg); }
        }
        .animate-float {
          animation: float 12s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}

export default UniversityBanner;
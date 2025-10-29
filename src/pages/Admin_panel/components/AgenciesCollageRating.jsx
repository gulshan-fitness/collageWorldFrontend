import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../Context_holder";
import { ChevronLeftIcon, ChevronRightIcon, TrophyIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { useNavigate } from "react-router-dom";

export default function AgenciesCollageRating() {
  const { AgenciesCollageRating, AgenciesRatingsfetch } = useContext(Context);

  const [selectedAgency, setSelectedAgency] = useState("AAOPADHE");
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigater=useNavigate()
  const agencies = [
    { name: "AAOPADHE", displayName: "AAOPADHE", color: "from-blue-500 to-blue-600" },
    { name: "indiatoday", displayName: "India Today", color: "from-red-500 to-red-600" },
    { name: "the week", displayName: "The Week", color: "from-green-500 to-green-600" },
    { name: "NIRF", displayName: "NIRF", color: "from-purple-500 to-purple-600" },
    { name: "Outlook", displayName: "Outlook", color: "from-orange-500 to-orange-600" },
    { name: "IIRF", displayName: "IIRF", color: "from-teal-500 to-teal-600" },
    { name: "TOI", displayName: "Times of India", color: "from-indigo-500 to-indigo-600" },
    { name: "NIRF Innovation", displayName: "NIRF Innovation", color: "from-pink-500 to-pink-600" },
    { name: "the", displayName: "THE", color: "from-cyan-500 to-cyan-600" },
    { name: "qs", displayName: "QS World", color: "from-emerald-500 to-emerald-600" },
  ];

  useEffect(() => {
    AgenciesRatingsfetch(null, selectedAgency);
  }, [selectedAgency]);

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : agencies.length - 1;
    setCurrentIndex(newIndex);
    setSelectedAgency(agencies[newIndex].name);
  };

  const handleNext = () => {
    const newIndex = currentIndex < agencies.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedAgency(agencies[newIndex].name);
  };

  const handleAgencySelect = (agency, index) => {
    setSelectedAgency(agency.name);
    setCurrentIndex(index);
  };

  const currentAgency = agencies[currentIndex];

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 py-6 md:py-8 px-4 md:px-6 relative overflow-hidden">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-transparent to-purple-500/3"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/8 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-400/8 to-transparent rounded-full blur-2xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Modern Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-xl border border-white/20 backdrop-blur-sm">
            <TrophyIcon className="h-6 w-6 md:h-8 w-8 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight">
            College <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Rankings 2025</span>
          </h1>
          <p className="text-sm md:text-base text-slate-600 font-medium">
            Discover top-rated colleges from leading ranking agencies
          </p>
        </div>

        {/* Agency Navigation with Arrows */}
        <div className="flex items-center justify-center mb-6 md:mb-8">
          {/* Previous Arrow */}
          <button
            onClick={handlePrevious}
            className="group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 mr-4"
          >
            <ChevronLeftIcon className="h-5 w-5 md:h-6 w-6 text-slate-600 group-hover:text-blue-600 transition-colors" />
          </button>

          {/* Current Agency Display */}
          <div className="flex-1 max-w-md">
            <div className={`relative bg-gradient-to-r ${currentAgency.color} rounded-2xl md:rounded-3xl p-4 md:p-6 text-white shadow-xl border border-white/20 backdrop-blur-sm overflow-hidden`}>
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 animate-pulse"></div>
              
              <div className="relative z-10 text-center">
                <h3 className="text-lg md:text-xl font-black mb-1 tracking-tight">{currentAgency.displayName}</h3>
                <p className="text-xs md:text-sm text-white/80 font-medium">
                  Ranking Agency • {currentIndex + 1} of {agencies.length}
                </p>
              </div>
            </div>
          </div>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 ml-4"
          >
            <ChevronRightIcon className="h-5 w-5 md:h-6 w-6 text-slate-600 group-hover:text-blue-600 transition-colors" />
          </button>
        </div>

        {/* Agency Pills */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-8">
          {agencies?.map((agency, index) => (
            <button
              key={agency.name}
              onClick={() => handleAgencySelect(agency, index)}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
                selectedAgency === agency.name
                  ? `bg-gradient-to-r ${agency.color} text-white shadow-lg border border-white/30`
                  : "bg-white/80 text-slate-700 border border-slate-200 hover:bg-white hover:shadow-md backdrop-blur-sm"
              }`}
            >
              {agency.displayName}
            </button>
          ))}
        </div>

        {/* Modern Table */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-xl border border-white/50 overflow-hidden">
          {/* Table Header */}
          <div className={`bg-gradient-to-r ${currentAgency?.color} p-4 md:p-6`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BuildingOfficeIcon className="h-6 w-6 md:h-8 w-8 text-white" />
                <div>
                  <h3 className="text-lg md:text-xl font-black text-white">{currentAgency.displayName} Rankings</h3>
                  <p className="text-xs md:text-sm text-white/80 font-medium">Top colleges and universities</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl md:text-3xl font-black text-white">{AgenciesCollageRating?.length || 0}</div>
                <div className="text-xs md:text-sm text-white/80 font-medium">Colleges Listed</div>
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-slate-50/80 backdrop-blur-sm">
                  <th className="p-3 md:p-4 text-left text-xs md:text-sm font-black text-slate-900 border-b border-slate-200">
                    College Name
                  </th>
                  <th className="p-3 md:p-4 text-center text-xs md:text-sm font-black text-slate-900 border-b border-slate-200">
                    Ranking
                  </th>
                  <th className="p-3 md:p-4 text-left text-xs md:text-sm font-black text-slate-900 border-b border-slate-200">
                    Stream
                  </th>
                </tr>
              </thead>
              <tbody>
                {AgenciesCollageRating?.map((college, index) => (
                  <tr
                    key={index}
                    onClick={()=>{navigater(`/university-page/${college?.collage_id?._id}`)}}
                    className="group hover:bg-blue-50/50 transition-all duration-300 border-b border-slate-100 last:border-b-0 cursor-pointer"
                  >
                    <td className="p-3 md:p-4 text-xs md:text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {college?.college_id?.college_name}
                    </td>
                    <td className="p-3 md:p-4 text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-8 md:w-20 md:h-10 bg-gradient-to-r ${currentAgency.color} rounded-xl text-white font-black text-xs md:text-sm shadow-lg`}>
                        #{college?.Ranking}
                      </div>
                      <div className="text-xs text-slate-500 mt-1 font-medium">
                        of {college?.out_of}
                      </div>
                    </td>
                    <td className="p-3 md:p-4 text-xs md:text-sm font-medium text-slate-700">
                      <div className="inline-flex items-center px-2 py-1 bg-slate-100 rounded-lg">
                        {college?.stream_id?.stream_name}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {(!AgenciesCollageRating || AgenciesCollageRating.length === 0) && (
            <div className="text-center py-12 md:py-16">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BuildingOfficeIcon className="h-8 w-8 md:h-10 w-10 text-slate-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">No Rankings Available</h3>
              <p className="text-sm md:text-base text-slate-600">
                No college rankings found for {currentAgency.displayName}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Stats */}
        <div className="mt-6 md:mt-8 flex justify-center items-center gap-6 md:gap-8">
          <div className="text-center">
            <div className="text-lg md:text-xl font-black text-slate-900">{agencies.length}</div>
            <div className="text-xs md:text-sm text-slate-600 font-medium">Agencies</div>
          </div>
          <div className="w-0.5 h-8 bg-gradient-to-b from-blue-300 to-indigo-300"></div>
          <div className="text-center">
            <div className="text-lg md:text-xl font-black text-slate-900">{AgenciesCollageRating?.length || 0}</div>
            <div className="text-xs md:text-sm text-slate-600 font-medium">Rankings</div>
          </div>
          <div className="w-0.5 h-8 bg-gradient-to-b from-blue-300 to-indigo-300"></div>
          <div className="text-center">
            <div className="text-lg md:text-xl font-black text-slate-900">2025</div>
            <div className="text-xs md:text-sm text-slate-600 font-medium">Latest</div>
          </div>
        </div>
      </div>
    </div>
  );
}

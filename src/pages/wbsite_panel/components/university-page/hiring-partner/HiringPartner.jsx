import React, { useContext, useEffect } from "react";
import Container from "../container/Container";
import InfiAnimation from "../../extra/infiAnimation";
import { Context } from "../../../../../Context_holder";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";

const HiringPartner = ({ id, collegeDetails }) => {

  const { hiring_partners_fetch, hiring_partners } = useContext(Context)
  useEffect(() => {
    hiring_partners_fetch(id,null)
  }, [])

  return (
    <div className="w-full py-8 bg-gradient-to-br from-blue-50 to-white">
      <div className="w-[95%] max-w-4xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center  bg-gradient-to-r from-blue-600 to-indigo-600  mb-3 ">
            <BuildingOfficeIcon className="text-white text-lg" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Top Hiring Partners
          </h2>
          <p className="text-gray-600 text-xs">
            Leading companies that recruit from {collegeDetails?.college_name}
          </p>
        </div>

        {/* Partners Section */}
        <div className="bg-white rounded-xl  border border-gray-200 p-4">
          <InfiAnimation
            hiring_partners={hiring_partners}
            collegeDetails={collegeDetails}
            className="w-full"
          />
        </div>

        {/* Additional Info */}
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-xs">
            Strong industry connections for excellent placement opportunities
          </p>
        </div>

      </div>
    </div>
  );
};

export default HiringPartner;
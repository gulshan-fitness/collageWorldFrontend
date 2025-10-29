import React, { useContext, useEffect } from "react";
import { Context } from "../../../../Context_holder";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const { course_fetch, currenetcourse } = useContext(Context);

  useEffect(() => {
    course_fetch(id);
  }, [id]);

  if (!currenetcourse) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No course data available
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <img
          src={`${process.env.REACT_APP_API_IMAGE_URL}course_image/${currenetcourse?.course_image}`}    
          alt={currenetcourse?.courseName}
          className="w-full md:w-1/3 h-64 object-cover rounded-2xl shadow-lg"
        />
        <div className="flex-1 space-y-3">
          <h1 className="text-3xl font-bold text-blue-900 leading-snug">
            {currenetcourse?.courseName}
          </h1>

          <p className="text-gray-700 font-medium">
            Type:{" "}
            <span className="capitalize text-blue-800 font-semibold">
              {currenetcourse?.courseType}
            </span>
          </p>

          {currenetcourse?.youtubeUrl && (
            <div className="mt-4">
              <div className="aspect-video w-full rounded-xl overflow-hidden shadow-md">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${
                    currenetcourse?.youtubeUrl.split("v=")[1]
                  }`}
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info Sections */}
      <div className="grid sm:grid-cols-2 gap-8 mt-12">
        {/* Program Overview */}
        {currenetcourse?.ProgramOverview && (
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            {currenetcourse?.ProgramOverview_image && (
              <img
                src={`${process.env.REACT_APP_API_IMAGE_URL}ProgramOverview_image/${currenetcourse?.ProgramOverview_image}`}
                alt="Program Overview"
                className="w-full h-52 object-cover rounded-lg"
              />
            )}
            <h2 className="text-xl font-semibold text-blue-900 mt-4">
              Program Overview
            </h2>
            <div className="prose prose-blue max-w-none text-gray-700 mt-3">
              {parse(currenetcourse?.ProgramOverview)}
            </div>
          </div>
        )}

        {/* Key Highlights */}
        {currenetcourse?.keyhighlight && (
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            {currenetcourse?.keyhighlight_image && (
              <img
                src={`${process.env.REACT_APP_API_IMAGE_URL}keyhighlight_image/${currenetcourse?.keyhighlight_image}`}
                alt="Key Highlights"
                className="w-full h-52 object-cover rounded-lg"
              />
            )}
            <h2 className="text-xl font-semibold text-blue-900 mt-4">
              Key Highlights
            </h2>
            <div className="prose prose-blue max-w-none text-gray-700 mt-3">
              {parse(currenetcourse?.keyhighlight)}
            </div>
          </div>
        )}

        {/* Syllabus */}
        {currenetcourse?.syllabus && (
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow sm:col-span-2">
            {currenetcourse?.syllabusImage && (
              <img
                src={`${process.env.REACT_APP_API_IMAGE_URL}syllabusImage/${currenetcourse?.syllabusImage}`}
                alt="Syllabus"
                className="w-full h-56 object-cover rounded-lg"
              />
            )}
            <h2 className="text-xl font-semibold text-blue-900 mt-4">Syllabus</h2>
            <div className="prose prose-blue max-w-none text-gray-700 mt-3">
              {parse(currenetcourse?.syllabus)}
            </div>
          </div>
        )}

        {/* Eligibility & Duration */}
        {currenetcourse?.eligibility_Duration && (
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            {currenetcourse?.eligibility_DurationImage && (
              <img
                src={`${process.env.REACT_APP_API_IMAGE_URL}eligibility_DurationImage/${currenetcourse?.eligibility_DurationImage}`}
                alt="Eligibility & Duration"
                className="w-full h-52 object-cover rounded-lg"
              />
            )}
            <h2 className="text-xl font-semibold text-blue-900 mt-4">
              Eligibility & Duration
            </h2>
            <div className="prose prose-blue max-w-none text-gray-700 mt-3">
              {parse(currenetcourse?.eligibility_Duration)}
            </div>
          </div>
        )}

        {/* Program Fees */}
        {currenetcourse?.programFees && (
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            {currenetcourse?.programFeesImage && (
              <img
                src={`${process.env.REACT_APP_API_IMAGE_URL}programFeesImage/${currenetcourse?.programFeesImage}`}
                alt="Program Fees"
                className="w-full h-52 object-cover rounded-lg"
              />
            )}
            <h2 className="text-xl font-semibold text-blue-900 mt-4">
              Program Fees
            </h2>
            <div className="prose prose-blue max-w-none text-gray-700 mt-3">
              {parse(currenetcourse?.programFees)}
            </div>
          </div>
        )}

        {/* Admission Process */}
        {currenetcourse?.admissionProcess && (
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow sm:col-span-2">
            {currenetcourse?.admissionProcessImage && (
              <img
                src={`${process.env.REACT_APP_API_IMAGE_URL}admissionProcessImage/${currenetcourse?.admissionProcessImage}`}
                alt="Admission Process"
                className="w-full h-56 object-cover rounded-lg"
              />
            )}
            <h2 className="text-xl font-semibold text-blue-900 mt-4">
              Admission Process
            </h2>
            <div className="prose prose-blue max-w-none text-gray-700 mt-3">
              {parse(currenetcourse?.admissionProcess)}
            </div>
          </div>
        )}

        {/* Education Loan */}
        {currenetcourse?.educationLoan && (
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow sm:col-span-2">
            {currenetcourse?.educationLoanImage && (
              <img
                src={`${process.env.REACT_APP_API_IMAGE_URL}educationLoanImage/${currenetcourse?.educationLoanImage}`}
                alt="Education Loan"
                className="w-full h-56 object-cover rounded-lg"
              />
            )}
            <h2 className="text-xl font-semibold text-blue-900 mt-4">
              Education Loan
            </h2>
            <div className="prose prose-blue max-w-none text-gray-700 mt-3">
              {parse(currenetcourse?.educationLoan)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

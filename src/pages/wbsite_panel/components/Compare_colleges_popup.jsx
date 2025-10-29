import React, { useContext, useState } from 'react';
import { FaCirclePlus } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { Context } from '../../../Context_holder';
import { Link } from 'react-router-dom';

const Compaire_colleges = () => {
  const {
    compare_popup,
    setcompare_popup,
    setcompare_colleges_pop_up,
    selectedCompairUniversities,
    setSelectedCompairUniversities,
    rounded_rating,
    course_name,
  } = useContext(Context);

  // Prepare colleges safely
  const [ready_to_compare_colleges, setready_to_compare_colleges] = useState(
    selectedCompairUniversities?.map((data) => {
      const matchedCourse = data?.courses?.find(
        (course) =>
          course?.courseName?.toLowerCase() === course_name?.toLowerCase()
      );

      return {
        _id: data?._id,
        college_name: data?.college_name,
        course_fees: matchedCourse?.fees || "N/A",
        rating: rounded_rating(data?.avgCollegeRating),
        reviews: data?.reviews?.length || 0,
      };
    }) || []
  );

  const [bestcollege, setbestcollege] = useState(null);

  const removeUniversityById = (id) => {
    setSelectedCompairUniversities((prevUniversities) =>
      prevUniversities.filter((uni) => uni._id !== id)
    );
  };

  const calculateScore = (college) => {
    const currentRating = parseFloat(college.rating) || 0;
    const currentReviews = parseInt(college.reviews) || 0;
    const currentFees = parseInt(college.course_fees) || 0;

    // scoring system
    return currentRating * 2 + currentReviews * 1 - currentFees / 100000;
  };

  const best_college_handler = () => {
    if (!ready_to_compare_colleges?.length) return;

    const selectedBestCollege = ready_to_compare_colleges
      .map((college) => ({ ...college, score: calculateScore(college) }))
      .sort((a, b) => b.score - a.score)[0];

    setbestcollege(selectedBestCollege);
  };

  return (
    <div
      className={`bg-blue-600 fixed top-0 left-0 duration-200 z-50 ${
        compare_popup ? "top-0" : "top-[-140%]"
      } w-full`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Close Button */}
        <IoIosClose
          className="text-5xl text-white cursor-pointer absolute top-2 right-3"
          onClick={() => setcompare_popup(false)}
        />

        {/* Info Text */}
        <div className="text-center mb-6">
          <h2 className="text-lg sm:text-xl font-medium capitalize">
            {selectedCompairUniversities?.length !== 3
              ? `You can Select ${
                  3 - (selectedCompairUniversities?.length || 0)
                } more universities to compare`
              : ""}
          </h2>
        </div>

        {/* Colleges Display */}
        <div className="flex justify-center gap-4 flex-wrap">
          {selectedCompairUniversities?.map((uni) => {
            const matchedCourse = uni?.courses?.find(
              (course) =>
                course?.courseName?.toLowerCase() === course_name?.toLowerCase()
            );

            return (
              <div
                key={uni?._id}
                className="flex flex-col items-center border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              >
                {/* Remove Button */}
                <div className="flex justify-between cursor-pointer w-full">
                  <IoIosClose
                    className="text-3xl text-blue-600"
                    onClick={() => removeUniversityById(uni?._id)}
                  />
                </div>

                {/* Logo + Name */}
                <div className="flex flex-col items-center my-4">
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}image/college_logo/${uni?.university_banner?.[0]}`}
                    alt={uni?.college_name}
                    className="w-10 h-10 sm:w-16 sm:h-16 mb-2 object-contain"
                  />
                  <p className="font-semibold text-center text-gray-800 text-xs sm:text-sm md:text-base">
                    {uni?.college_name}
                  </p>
                </div>

                {/* Fees */}
                <p className="font-bold text-center text-gray-900 text-sm sm:text-base md:text-lg">
                  {matchedCourse?.fees || "N/A"} ₹
                </p>

                {/* Rating */}
                <div className="text-center mt-2">
                  <span className="text-yellow-500">&#9733;</span>
                  <span className="text-gray-700 ml-1 text-sm sm:text-base">
                    {rounded_rating(uni?.avgCollegeRating)}
                  </span>
                </div>

                {/* Reviews */}
                <div className="text-red-600 ml-2 text-xs sm:text-sm">
                  reviews ({uni?.reviews?.length || 0})
                </div>
              </div>
            );
          })}

          {/* Add to Compare */}
          {selectedCompairUniversities?.length < 3 && (
            <div
              className="flex items-center cursor-pointer justify-center border border-gray-300 rounded-lg p-4 bg-white shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              onClick={() => setcompare_colleges_pop_up(true)}
            >
              <div className="flex flex-col gap-2 justify-center items-center">
                <FaCirclePlus className="text-2xl" />
                <p className="ml-1 text-[12px] sm:text-base">Add To Compare</p>
              </div>
            </div>
          )}
        </div>

        {/* Best College */}
        {bestcollege && (
          <Link
            to={`university-page/${bestcollege?._id}`}
            className="mt-6 block bg-white text-black p-4 rounded-lg shadow-lg"
          >
            <h3 className="text-lg font-semibold text-blue-600">
              {bestcollege.college_name}
            </h3>
            <p>
              <strong>Course Fees:</strong> ₹{bestcollege.course_fees}
            </p>
            <p>
              <strong>Rating:</strong> {bestcollege.rating} ⭐
            </p>
            <p>
              <strong>Reviews:</strong> {bestcollege.reviews}
            </p>
          </Link>
        )}

        {/* Compare Button */}
        <div className="flex justify-end mt-6">
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg"
            onClick={best_college_handler}
          >
            Compare Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Compaire_colleges;

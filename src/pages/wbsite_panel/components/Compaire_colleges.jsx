import React, { useContext, useEffect, useState } from 'react';
import { IoIosClose } from "react-icons/io";
import { Context } from '../../../Context_holder';

const Compaire_colleges = () => {
  const {
    college_fetch,
    colleges,compare_popup, setcompare_popup
  } = useContext(Context);

  const [selectedColleges, setSelectedColleges] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  // Add college (max 3)
  const handleSelect = (college) => {
    if (selectedColleges.length >= 3) {
      alert("You can compare up to 3 colleges only");
      return;
    }
    if (selectedColleges.find((c) => c._id === college._id)) {
      return; // already selected
    }
    setSelectedColleges([...selectedColleges, college]);
  };

  // Remove college
  const handleRemove = (id) => {
    setSelectedColleges(selectedColleges.filter((c) => c._id !== id));
  };

  useEffect(() => {
    if(!compare_popup)  return
    college_fetch();
  }, [compare_popup]);

  // Find best college
  const bestCollege = selectedColleges.reduce((best, curr) => {
    if (curr.avgCollegeRating > (best?.avgCollegeRating || 0)) {
      return curr;
    }
    if (
      curr.avgCollegeRating === best?.avgCollegeRating &&
      (curr.reviews?.length || 0) > (best.reviews?.length || 0)
    ) {
      return curr;
    }
    return best;
  }, null);

  return (
    <div className={`p-6 w-full mx-auto ${  compare_popup ? "block" : "hidden"} fixed top-0 left-0 bg-white z-50 overflow-y-auto h-screen`}>

      <button  className="absolute top-2 right-2 text-red-500 hover:text-red-700" onClick={()=>setcompare_popup(false)}>

        <IoIosClose size={40}  />
      </button>
      {/* List of colleges */}
      <h2 className="text-xl font-bold mb-4">Select Colleges to Compare</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        { colleges?.map((college) => {
          const isSelected = selectedColleges.find((c) => c._id === college._id);
          return (
            <div
              key={college._id}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition relative"
            >
              {/* Cross button inside card if selected */}
              {isSelected && (
                <button
                  onClick={() => handleRemove(college._id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <IoIosClose size={22} />
                </button>
              )}

              <h3 className="font-semibold text-lg">{college.college_name}</h3>
              <p className="text-sm text-gray-600">
                {college.city}, {college.state}
              </p>
              <p className="text-sm text-gray-600">⭐ {college.avgCollegeRating}</p>

              {!isSelected ? (
                <button
                  onClick={() => handleSelect(college)}
                  className="mt-2 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700"
                >
                  Select
                </button>
              ) : (
                <p className="mt-2 text-green-600 font-medium text-sm">
                  Added to Compare
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected colleges list */}
      {selectedColleges.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Selected Colleges</h3>
          <div className="flex gap-3 flex-wrap">
            {selectedColleges.map((c) => (
              <div
                key={c._id}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
              >
                <span>{c.college_name}</span>
                <button
                  onClick={() => handleRemove(c._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <IoIosClose size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Compare Button */}
      {selectedColleges.length >= 2 && selectedColleges.length <= 3 && !showComparison && (
        <button
          onClick={() => setShowComparison(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Compare Colleges
        </button>
      )}

      {/* Message if only 1 college is selected */}
      {selectedColleges.length === 1 && !showComparison && (
        <p className="text-sm text-red-600 font-medium">
          Please select at least 2 colleges to compare.
        </p>
      )}

      {/* Comparison Table */}
      {showComparison && (
        <div className="overflow-x-auto mt-6">
          <h3 className="text-lg font-bold mb-4">Comparison Result</h3>
          <table className="table-auto border-collapse w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Feature</th>
                {selectedColleges?.map((college) => (
                  <th
                    key={college._id}
                    className={`border px-4 py-2 ${
                      bestCollege?._id === college._id ? "bg-green-200 font-bold" : ""
                    }`}
                  >
                    {college?.college_name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Established</td>
                {selectedColleges?.map((c) => (
                  <td
                    key={c._id}
                    className={`border px-4 py-2 ${
                      bestCollege?._id === c._id ? "bg-green-100" : ""
                    }`}
                  >
                    {c.estdYear}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border px-4 py-2">Location</td>
                {selectedColleges.map((c) => (
                  <td
                    key={c._id}
                    className={`border px-4 py-2 ${
                      bestCollege?._id === c._id ? "bg-green-100" : ""
                    }`}
                  >
                    {c.city}, {c.state}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border px-4 py-2">Average Rating</td>
                {selectedColleges.map((c) => (
                  <td
                    key={c._id}
                    className={`border px-4 py-2 ${
                      bestCollege?._id === c._id ? "bg-green-100 font-bold" : ""
                    }`}
                  >
                    ⭐ {c.avgCollegeRating}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border px-4 py-2">Reviews</td>
                {selectedColleges.map((c) => (
                  <td
                    key={c._id}
                    className={`border px-4 py-2 ${
                      bestCollege?._id === c._id ? "bg-green-100" : ""
                    }`}
                  >
                    {c.reviews?.length || 0}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border px-4 py-2">Website</td>
                {selectedColleges.map((c) => (
                  <td
                    key={c._id}
                    className={`border px-4 py-2 ${
                      bestCollege?._id === c._id ? "bg-green-100" : ""
                    }`}
                  >
                    <a
                      href={`https://${c.officialWebsite}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      Visit
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Compaire_colleges;

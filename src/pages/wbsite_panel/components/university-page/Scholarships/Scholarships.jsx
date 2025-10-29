import React from "react";

function Scholarships({ collegeDetails }) {
  const Headings = [
    "Scholarship Type",
    "Organisation",
    "Application Deadline",
    "No. of Scholarships",
    "Amount",
    "International Students",
    "Scholarship Link"
  ];

  const keysMap = {
    "Scholarship Type": "scholarship_type",
    "Organisation": "organisation",
    "Application Deadline": "application_deadline",
    "No. of Scholarships": "no_of_scholarships",
    "Amount": "amount",
    "International Students": "international_students",
    "Scholarship Link": "scholarship_link"
  };

  const result = Headings.map(heading => {
    const key = keysMap[heading];
    const value = collegeDetails?.scholarships?.[0]?.[key] || "N/A";
    return {
      label: heading,
      value
    };
  });

  // Function to handle link click
  const handleLinkClick = (url) => {
    if (url && url !== "N/A") {
      // Ensure the URL has proper protocol
      const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
      window.open(formattedUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="w-full py-12 bg-gradient-to-br from-blue-50 to-white">
      <div className="w-[95%] max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Scholarships & Financial Aid
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore various scholarship opportunities based on academic performance and merit
          </p>
        </div>

        {/* Scholarship Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold text-sm uppercase tracking-wider">
                    Scholarship Details
                  </th>
                  <th className="px-6 py-4 text-left text-white font-semibold text-sm uppercase tracking-wider">
                    Information
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {result.map((data, index) => (
                  <tr 
                    key={index} 
                    className={`hover:bg-blue-50 transition-colors duration-200 ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-sm font-medium text-gray-900">
                          {data.label}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {data.label === "Scholarship Link" ? (
                        <button
                          onClick={() => handleLinkClick(data.value)}
                          disabled={!data.value || data.value === "N/A"}
                          className={`text-sm font-medium ${
                            data.value && data.value !== "N/A"
                              ? "text-blue-600 hover:text-blue-800 underline cursor-pointer transition-colors duration-200"
                              : "text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {data.value && data.value !== "N/A" ? "Click to Visit" : "N/A"}
                        </button>
                      ) : (
                        <span
                          className={`text-sm ${
                            data.label === "Amount"
                              ? "text-green-600 font-bold"
                              : data.label === "Application Deadline"
                              ? "text-red-600 font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          {data.label === "Application Deadline"
                            ? new Date(data.value).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : data.value}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            * Contact the admission office for detailed scholarship eligibility criteria and application process
          </p>
        </div>
      </div>
    </div>
  );
}

export default Scholarships;
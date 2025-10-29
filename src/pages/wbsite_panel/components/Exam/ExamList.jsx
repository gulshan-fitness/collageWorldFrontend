import React, { useEffect, useContext } from "react";
import { Context } from "../../../../Context_holder"; // Adjust path as needed
import { Link } from "react-router-dom";
import { 
  CalendarIcon, 
  ClockIcon, 
  AcademicCapIcon,
  ArrowRightIcon,
  FireIcon,
  DocumentTextIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

export default function ExamList() {
  const { Examfetch, exam } = useContext(Context);

  useEffect(() => {
    Examfetch();
     window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
 

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric'
      });
    };
  
    const getExamModeIcon = (mode) => {
      return mode === 'online exam' ? <GlobeAltIcon className="w-3 h-3" /> : <DocumentTextIcon className="w-3 h-3" />;
    };
  
    const getExamModeColor = (mode) => {
      return mode === 'online exam' ? 'text-green-600 bg-green-50' : 'text-blue-600 bg-blue-50';
    };


    

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 border-b border-gray-300 pb-2">
        Exams
      </h1>

      {exam?.length === 0 ? (
        <p className="text-center text-gray-500">No exams found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {exam?.map((exam, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group overflow-hidden relative"
          >
            {/* Trending Badge */}
            <div className="absolute top-2 right-2 z-10">
              <div className="bg-orange-500 text-white px-1.5 py-0.5 rounded-full text-xs font-medium flex items-center">
                <FireIcon className="w-2.5 h-2.5 mr-0.5" />
                Hot
              </div>
            </div>

            {/* Exam Header */}
            <div className="p-4 pb-3">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 pr-8">
                  {/* Exam logo or fallback icon */}
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg border border-gray-100 mb-2 flex items-center justify-center overflow-hidden">
                    {exam.logo ? (
                      <img 
                        src={`${process.env.REACT_APP_API_IMAGE_URL}/exam_logo/${exam.logo}`}
                        alt={exam.ShortName}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <AcademicCapIcon className={`w-5 h-5 text-blue-600 ${exam.logo ? 'hidden' : 'block'}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors leading-tight">
                    {exam.ShortName}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {exam.FullName}
                  </p>
                </div>
              </div>
              
              {/* Exam Mode Badge */}
              <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium items-center ${getExamModeColor(exam.Mode)}`}>
                {getExamModeIcon(exam.Mode)}
                <span className="ml-1 capitalize">{exam.Mode.replace(' exam', '')}</span>
              </div>
            </div>

            {/* Exam Details */}
            <div className="px-4 pb-4">
              <div className="space-y-2 mb-3">
                <div className="flex items-center text-xs text-gray-600">
                  <CalendarIcon className="w-3 h-3 mr-1.5 text-gray-400" />
                  <span className="font-medium">Year:</span>
                  <span className="ml-1">{exam.year}</span>
                </div>
                
                {exam.Application_FormDate && exam.Application_FormDate !== "1970-01-01T00:00:00.000Z" && (
                  <div className="flex items-center text-xs text-gray-600">
                    <ClockIcon className="w-3 h-3 mr-1.5 text-gray-400" />
                    <span className="font-medium">Apply:</span>
                    <span className="ml-1">
                      {formatDate(exam.Application_FormDate)}
                    </span>
                  </div>
                )}

                {exam?.Course_id && (
                  <div className="flex items-center text-xs text-gray-600">
                    <AcademicCapIcon className="w-3 h-3 mr-1.5 text-gray-400" />
                    <span className="font-medium">Course:</span>
                    <span className="ml-1">{exam?.Course_id?.courseName}</span>
                  </div>
                )}

                {exam.youtubeLink && (
                  <div className="flex items-center text-xs text-gray-600">
                    <DocumentTextIcon className="w-3 h-3 mr-1.5 text-gray-400" />
                    <span className="font-medium">Video:</span>
                    <Link to={exam?.youtubeLink}
                      className="ml-1 text-blue-600 hover:text-blue-800 underline"
                    >
                      Watch
                    </Link>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Link 
                  to={`/exam/${exam._id}`}
                  className="flex-1 bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-blue-700 transition-colors flex items-center justify-center group"
                >
                  Details
                  <ArrowRightIcon className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                
                {exam.directapplyLink && (
                  <a 
                    href={exam.directapplyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 border border-blue-600 text-blue-600 rounded-md text-xs font-medium hover:bg-blue-50 transition-colors"
                  >
                    Apply
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}

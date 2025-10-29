import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarIcon, 
  ClockIcon, 
  AcademicCapIcon,
  ArrowRightIcon,
  FireIcon,
  DocumentTextIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { Context } from '../../../../../Context_holder';

const TopTrendingExams = () => {
  // Static exam data based on ExamModel.js schema
  const {Examfetch,exam} = useContext(Context);

  useEffect(() => {
    Examfetch(null,"?TopExam=true");
  }, []);

  const staticExams = [
    {
      _id: "1",
      FullName: "Joint Entrance Examination Main",
      ShortName: "JEE Main",
      logo: "jee-main-logo.png",
      Mode: "online exam",
      year: 2024,
      ExamPattern: "MCQ",
      Application_FormDate: {
        from: "2024-01-15",
        to: "2024-02-15"
      },
      Result_Announce_Date: {
        from: "2024-04-15",
        to: "2024-04-20"
      },
      directapplyLink: "https://jeemain.nta.nic.in/",
      topExam: true,
      Course_id: {
        course_name: "Engineering"
      }
    },
    {
      _id: "2",
      FullName: "National Eligibility cum Entrance Test",
      ShortName: "NEET UG",
      logo: "neet-logo.png",
      Mode: "offline exam",
      year: 2024,
      ExamPattern: "MCQ",
      Application_FormDate: {
        from: "2024-02-01",
        to: "2024-03-01"
      },
      Result_Announce_Date: {
        from: "2024-06-10",
        to: "2024-06-15"
      },
      directapplyLink: "https://neet.nta.nic.in/",
      topExam: true,
      Course_id: {
        course_name: "Medical"
      }
    },
    {
      _id: "3",
      FullName: "Common Admission Test",
      ShortName: "CAT",
      logo: "cat-logo.png",
      Mode: "online exam",
      year: 2024,
      ExamPattern: "CBT",
      Application_FormDate: {
        from: "2024-08-01",
        to: "2024-09-15"
      },
      Result_Announce_Date: {
        from: "2024-12-20",
        to: "2024-12-25"
      },
      directapplyLink: "https://iimcat.ac.in/",
      topExam: true,
      Course_id: {
        course_name: "Management"
      }
    },
    {
      _id: "4",
      FullName: "Graduate Aptitude Test in Engineering",
      ShortName: "GATE",
      logo: "gate-logo.png",
      Mode: "online exam",
      year: 2024,
      ExamPattern: "CBT",
      Application_FormDate: {
        from: "2024-08-15",
        to: "2024-09-30"
      },
      Result_Announce_Date: {
        from: "2024-03-15",
        to: "2024-03-20"
      },
      directapplyLink: "https://gate.iisc.ac.in/",
      topExam: true,
      Course_id: {
        course_name: "Engineering"
      }
    },
    {
      _id: "5",
      FullName: "Union Public Service Commission Civil Services",
      ShortName: "UPSC CSE",
      logo: "upsc-logo.png",
      Mode: "offline exam",
      year: 2024,
      ExamPattern: "Descriptive",
      Application_FormDate: {
        from: "2024-02-15",
        to: "2024-03-15"
      },
      Result_Announce_Date: {
        from: "2024-12-01",
        to: "2024-12-10"
      },
      directapplyLink: "https://upsc.gov.in/",
      topExam: true,
      Course_id: {
        course_name: "Civil Services"
      }
    },
    {
      _id: "6",
      FullName: "Staff Selection Commission Combined Graduate Level",
      ShortName: "SSC CGL",
      logo: "ssc-logo.png",
      Mode: "online exam",
      year: 2024,
      ExamPattern: "MCQ",
      Application_FormDate: {
        from: "2024-06-01",
        to: "2024-07-01"
      },
      Result_Announce_Date: {
        from: "2024-11-15",
        to: "2024-11-20"
      },
      directapplyLink: "https://ssc.nic.in/",
      topExam: true,
      Course_id: {
        course_name: "Government Jobs"
      }
    }
  ];

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
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-3">
            <FireIcon className="w-6 h-6 text-orange-500 mr-2" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Top Trending Exams
            </h2>
          </div>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Discover popular competitive exams that can shape your career
          </p>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {exam?.map((exam, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group overflow-hidden relative"
            >
              {/* Trending Badge */}
              <div className="absolute top-2 right-2 z-10">
                <div className="bg-orange-500 text-white px-1.5 py-0.5 rounded-full text-xs font-medium flex items-center">
                  <FireIcon className="w-2.5 h-2.5 mr-0.5" />
                  trending
                </div>
              </div>

              {/* Exam Header */}
              <div className="p-4 pb-3">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 pr-8">
                    {/* Static logo placeholder */}
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg border border-gray-100 mb-2 flex items-center justify-center">
                      <AcademicCapIcon className="w-5 h-5 text-blue-600" />
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
                  
                  {exam.Application_FormDate && (
                    <div className="flex items-center text-xs text-gray-600">
                      <ClockIcon className="w-3 h-3 mr-1.5 text-gray-400" />
                      <span className="font-medium">Apply:</span>
                      <span className="ml-1">
                        {formatDate(exam.Application_FormDate.from)} - {formatDate(exam.Application_FormDate.to)}
                      </span>
                    </div>
                  )}

                  {exam?.Course_id && (
                    <div className="flex items-center text-xs text-gray-600">
                      <AcademicCapIcon className="w-3 h-3 mr-1.5 text-gray-400" />
                      <span className="font-medium">Stream:</span>
                      <span className="ml-1">{exam?.Course_id?.courseName}</span>
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

        {/* View All Button */}
        <div className="text-center">
          <Link 
            to="/examlist"
            className="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors group"
          >
            View All Exams
            <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopTrendingExams;

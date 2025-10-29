import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Context } from '../../../../Context_holder';
import parse from "html-react-parser";
import { 
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  AcademicCapIcon,
  LightBulbIcon,
  TrophyIcon,
  ArrowDownTrayIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  BookOpenIcon,
  PlayIcon,
  ShareIcon,
  BookmarkIcon,
  StarIcon,
  ChevronRightIcon,
  EyeIcon,
  ChartBarIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import { 
  StarIcon as StarIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  PlayIcon as PlayIconSolid
} from '@heroicons/react/24/solid';

export default function Exam() {
  const { Examfetch, current_exam } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState('ExamPattern');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Examfetch(id);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  const sections = [
    { 
      key: "MockTest", 
      label: "Mock Tests",
      icon: <ClipboardDocumentListIcon className="h-5 w-5" />,
      link: current_exam?.MockTestLink,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
      count: "10+ Tests"
    },
    { 
      key: "ExamPattern", 
      label: "Exam Pattern",
      icon: <ChartBarIcon className="h-5 w-5" />,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
      count: "Detailed Analysis"
    },
    { 
      key: "PreviousPapper", 
      label: "Previous Papers",
      icon: <DocumentTextIcon className="h-5 w-5" />,
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-gradient-to-br from-emerald-500/10 to-green-500/10",
      count: "5+ Years"
    },
    { 
      key: "ApplicationProcess", 
      label: "Application Process",
      icon: <AcademicCapIcon className="h-5 w-5" />,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-gradient-to-br from-orange-500/10 to-red-500/10",
      count: "Step-by-Step"
    },
    { 
      key: "PreparationTips", 
      label: "Preparation Tips",
      icon: <LightBulbIcon className="h-5 w-5" />,
      color: "from-amber-500 to-yellow-500",
      bgColor: "bg-gradient-to-br from-amber-500/10 to-yellow-500/10",
      count: "Expert Advice"
    },
    { 
      key: "Result", 
      label: "Results & Cutoffs",
      icon: <TrophyIcon className="h-5 w-5" />,
      color: "from-rose-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-rose-500/10 to-pink-500/10",
      count: "Previous Years"
    },
  ];

  const downloadFile = (fileUrl) => {
    if (!fileUrl) return;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop();
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === "1970-01-01T00:00:00.000Z") return 'Not Announced';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const shareExam = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: current_exam?.ShortName,
          text: current_exam?.FullName,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Sharing cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const selectedSectionData = sections.find(sec => sec.key === selectedSection);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-48 mx-auto mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-32 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header Section */}
      <div className="relative bg-gradient-to-br from-gray-900 via-blue-900/90 to-purple-900/90 text-white py-16 lg:py-20">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Link 
              to="/examlist"
              className="group flex items-center text-blue-200 hover:text-white transition-all duration-300 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20 hover:bg-white/20"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Exams
            </Link>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                {isBookmarked ? (
                  <BookmarkIconSolid className="h-5 w-5 text-yellow-400" />
                ) : (
                  <BookmarkIcon className="h-5 w-5 text-blue-200" />
                )}
              </button>
              <button
                onClick={shareExam}
                className="p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <ShareIcon className="h-5 w-5 text-blue-200" />
              </button>
            </div>
          </div>

          {/* Exam Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-start gap-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-white/20 shadow-2xl">
                    {current_exam?.logo ? (
                      <img 
                        src={`${process.env.REACT_APP_API_IMAGE_URL}exam_image/${current_exam?.logo}`}
                        alt={current_exam?.ShortName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <AcademicCapIcon className="h-10 w-10 text-white" />
                    )}
                  </div>
                  {current_exam?.topExam && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
                      TOP
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      {current_exam?.ShortName}
                    </h1>
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                      <StarIconSolid className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm font-semibold">4.8</span>
                    </div>
                  </div>
                  <p className="text-xl text-blue-200 mb-6 leading-relaxed">
                    {current_exam?.FullName}
                  </p>

                  {/* Quick Stats */}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
                      <CalendarDaysIcon className="h-4 w-4 text-green-400" />
                      <span className="text-sm font-medium">{current_exam?.year || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
                      <MapPinIcon className="h-4 w-4 text-orange-400" />
                      <span className="text-sm font-medium capitalize">{current_exam?.Mode || 'N/A'}</span>
                    </div>
                    {current_exam?.Course_id && (
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
                        <AcademicCapIcon className="h-4 w-4 text-purple-400" />
                        <span className="text-sm font-medium">{current_exam.Course_id.courseName}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="lg:w-80 space-y-4">
              {current_exam?.directapplyLink && (
                <Link 
                  to={current_exam?.directapplyLink}
                 
                  className="block w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 px-6 rounded-2xl font-bold text-center transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/25 hover:scale-105"
                >
                  Apply Now
                </Link>
              )}
              
              {current_exam?.MockTestLink && (
                <Link 

                to={current_exam?.MockTestLink}
                 
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-4 px-6 rounded-2xl font-bold text-center transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <PlayIconSolid className="h-5 w-5" />
                  Take Mock Test
                </Link>
              )}
            </div>
          </div>

          {/* Timeline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {current_exam?.Application_FormDate && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <CalendarDaysIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-blue-200 text-sm">Application Period</div>
                    <div className="text-white font-semibold">Open</div>
                  </div>
                </div>
                <div className="text-xs text-blue-200">
                  {formatDate(current_exam.Application_FormDate.from)} - {formatDate(current_exam.Application_FormDate.to)}
                </div>
              </div>
            )}

            {current_exam?.Result_Announce_Date && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <TrophyIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-blue-200 text-sm">Result Date</div>
                    <div className="text-white font-semibold">Expected</div>
                  </div>
                </div>
                <div className="text-xs text-blue-200">
                  {formatDate(current_exam.Result_Announce_Date.from)}
                </div>
              </div>
            )}

            {current_exam?.youtubeLink && (
              <Link to={current_exam?.youtubeLink} className="bg-white/10 cursor-pointer backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <PlayIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-blue-200 text-sm">Video Guide</div>
                    <div className="text-white font-semibold">Available</div>
                  </div>
                </div>

                
                <Link  
              
                  className="text-xs cursor-pointer text-blue-200 hover:text-white transition-colors"
                >
                  Watch Tutorial
                </Link>
              </Link>
            )}

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                  <EyeIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-blue-200 text-sm">Difficulty</div>
                  <div className="text-white font-semibold">Moderate</div>
                </div>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIconSolid 
                    key={star} 
                    className={`h-3 w-3 ${star <= 3 ? 'text-yellow-400' : 'text-gray-400'}`} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 p-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BookOpenIcon className="h-5 w-5 text-blue-600" />
                Study Resources
              </h3>
              
              <nav className="space-y-3">
                {sections.map((section) => (
                  <button
                    key={section.key}
                    onClick={() => {
                      if (section.key === "MockTest" && current_exam?.MockTestLink) {
                        window.open(current_exam.MockTestLink, "_blank");
                      } else {
                        setSelectedSection(section.key);
                      }
                    }}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-300 group border-2 ${
                      selectedSection === section.key
                        ? `border-transparent bg-gradient-to-r ${section.color} text-white shadow-lg scale-105`
                        : `border-gray-200/50 hover:border-gray-300 bg-white/50 hover:bg-white ${section.bgColor}`
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`flex items-center gap-3 ${
                        selectedSection === section.key ? 'text-white' : 'text-gray-700'
                      }`}>
                        <div className={`p-2 rounded-xl ${
                          selectedSection === section.key 
                            ? 'bg-white/20' 
                            : 'bg-gray-100/50'
                        }`}>
                          {section.icon}
                        </div>
                        <span className="font-semibold text-sm">{section.label}</span>
                      </div>
                      <ChevronRightIcon className={`h-4 w-4 transition-transform ${
                        selectedSection === section.key ? 'rotate-90 text-white' : 'text-gray-400 group-hover:text-gray-600'
                      }`} />
                    </div>
                    <div className={`text-xs ${
                      selectedSection === section.key ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {section.count}
                    </div>
                  </button>
                ))}
              </nav>

            
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Content Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
              
              {/* Content Header */}
              <div className={`bg-gradient-to-r ${selectedSectionData?.color} p-8`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                      {selectedSectionData?.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold">{selectedSectionData?.label}</h2>
                      <p className="text-white/80 text-lg">{selectedSectionData?.count}</p>
                    </div>
                  </div>
                  
                  {selectedSection === "PreviousPapper" && current_exam?.PreviousPapper && (
                    <button
                      onClick={() => downloadFile(`${process.env.REACT_APP_API_IMAGE_URL}/exam_PreviousPapper/${current_exam?.PreviousPapper}`)}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 border border-white/30 flex items-center gap-2"
                    >
                      <ArrowDownTrayIcon className="h-5 w-5" />
                      Download
                    </button>
                  )}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-8">
                {selectedSection === "PreviousPapper" ? (
                  <div className="text-center py-12">
                    {current_exam?.PreviousPapper ? (
                      <div className="max-w-lg mx-auto">
                        <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                          <DocumentTextIcon className="h-12 w-12 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Previous Year Papers</h3>
                        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                          Access previous year question papers to understand the exam pattern, 
                          question types, and difficulty level. Perfect for practice and time management.
                        </p>
                        <button
                          onClick={() => downloadFile(`${process.env.REACT_APP_API_IMAGE_URL}/exam_PreviousPapper/${current_exam?.PreviousPapper}`)}
                          className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/25 hover:scale-105 flex items-center gap-3 mx-auto"
                        >
                          <ArrowDownTrayIcon className="h-6 w-6" />
                          Download Question Paper
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                          <DocumentTextIcon className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">No Papers Available</h3>
                        <p className="text-gray-500 text-lg max-w-md mx-auto">
                          Previous year question papers will be uploaded soon. 
                          Check back later for comprehensive practice material.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700">
                    {current_exam && current_exam[selectedSection] ? (
                      <div className="text-gray-700 leading-relaxed text-lg">
                        {parse(current_exam[selectedSection])}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
                          <QuestionMarkCircleIcon className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Content Coming Soon</h3>
                        <p className="text-gray-500 text-lg">
                          We're working on comprehensive {selectedSectionData?.label.toLowerCase()} content. 
                          Check back soon for detailed information and resources.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Additional Resources */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100/50 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <CheckCircleIcon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Pro Tips</h3>
                </div>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Create a structured study plan with daily targets and weekly revisions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Focus on understanding concepts rather than rote learning</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Practice time management with regular mock tests</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100/50 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <UserGroupIcon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Need Help?</h3>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Get personalized guidance from our expert mentors and join a community of aspirants.
                </p>
                <div className="space-y-3">
                  <Link 
                    to="/contact"
                    className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 px-6 rounded-2xl font-semibold text-center transition-all duration-300 hover:shadow-lg"
                  >
                    Connect with Experts
                  </Link>
                  <Link 
                    to="/examlist"
                    className="block w-full border border-purple-200 text-purple-600 hover:bg-purple-50 py-3 px-6 rounded-2xl font-semibold text-center transition-all duration-300"
                  >
                    Explore More Exams
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect, useContext } from "react";
import LoanFec from "./LoanFec/LoanFec";
import OurFeatures from "./OurFeatures/OurFeatures";
import OurEvent from "./OurEvent/OurEvent";
import OurBlog from "./OurBlog/OurBlog";
import SearchCourses from "./SearchCourses/SearchCourses";
import Testimonals from "./Testimonals/Testimonals";
import Scholarships from "./Scholarships/Scholarships";
import UniversityBanner from "./university-banner";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Courses from "./courses";
import Admission from "./admission/Admission";
import HiringPartner from "./hiring-partner/HiringPartner";
import ConnectWithUs from "./connect-withus";
import OurConnection from "./ourconnection";
import Brands from "./brands";
import NewsSlider from "../../screens/home/newsSlider";
import UniversityFacilities from "./facilities";
import OfficeAddress from "./officeAddress";
import UniFaq from "./uniFaq";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../../../Context_holder";
import { FeesTable } from "./feesTable/feesTable";
import AboutUniversity from "./aboutUniversity/aboutUniversity";
import UniversityFact from "./universityFact/universityFact";
import ReviewSection from "./review/reviewSection";
import PlacementBarChart from "./placementGraph/placementGraph";
import ProfessorsSection from "./professorSection";
import { 
  AcademicCapIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  StarIcon,
  ChevronRightIcon,
  SparklesIcon,
  BookOpenIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  TrophyIcon,
  ChatBubbleLeftRightIcon,
  NewspaperIcon,
  QuestionMarkCircleIcon,
  PhoneIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import axios from "axios";
import Loader from "../Loader";

function UniversityPage() {
  const { 
    college_fetch, 
    
    ScrollComponent,
    top10College_by_city, 
    top10_college_fetch_by_city,
    top10College_by_state,
    top10_college_fetch_by_state, 
    top10_course_fetch_by_city,
    top10Courses_by_city,
    top10_course_fetch_by_state,
    top10Courses_by_state,
    setcourse_name,
    recent_enquiry_by_city,
    user,setapply_popUpIsOpen,setuserSignUp_popup,colleges,recent_enquiry_fetch_city_wise,CurrentPremiumAdd, PremiumAdfetch
  } = useContext(Context);


  

  console.log(CurrentPremiumAdd,"CurrentPremiumAdd");


  
  const [uni, setUni] = useState(null);
  const { id } = useParams();

 
  const [activeSection, setActiveSection] = useState('about');

   const [Loadershow, setLoadershow] = useState(false);
    const [Loaderindex, setLoaderindex] = useState(null);
  
    const enquiry_api = (new_data,index) => {

      if (user&& id) {
           setLoaderindex(index)
        let data={ college: id,}
if(new_data){
  
  data={...data,...new_data}
}


        setLoadershow(true);
        axios
          .patch(
            process.env.REACT_APP_API_BASE_URL +
              process.env.REACT_APP_USER_URL +
              "college_edit/" +
              user?._id ,data
          )
          .then((success) => {
            if (success?.data?.status === 1) {
              setapply_popUpIsOpen(true);
              setLoadershow(false);
              setLoaderindex(null)
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setuserSignUp_popup(true);
      }
    };


   

     const downloadFile = (fileUrl) => {

      console.log(fileUrl);
      
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


  useEffect(() => {

    if(!id) return
    college_fetch(id);
    ScrollComponent();
    PremiumAdfetch(null,id)

  }, [id]);

  useEffect(() => {


    if(colleges?.length === 0) return


    
    

    top10_college_fetch_by_city(colleges?.[0]?.city);

    top10_college_fetch_by_state(colleges?.[0]?.state);
    top10_course_fetch_by_city(colleges?.[0]?.city);
    top10_course_fetch_by_state(colleges?.[0]?.state);
    recent_enquiry_fetch_city_wise(colleges?.[0]?.city);

  }, [colleges]);



  
  

  const navigationSections = [
    { id: 'about', label: 'About', icon: BuildingOfficeIcon },
    { id: 'courses', label: 'Courses', icon: BookOpenIcon },
    { id: 'fees', label: 'Fees', icon: CurrencyDollarIcon },
    { id: 'facilities', label: 'Facilities', icon: SparklesIcon },
    { id: 'placements', label: 'Placements', icon: TrophyIcon },
    { id: 'reviews', label: 'Reviews', icon: ChatBubbleLeftRightIcon },
    { id: 'faq', label: 'FAQ', icon: QuestionMarkCircleIcon }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };



  console.log(colleges[0],"colleges?.[0]");
  

  if (colleges?.length!==0){
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900" id="page_on_the_top">
        
        {/* University Banner */}
        <UniversityBanner id={id} collegeDetails={colleges?.[0]} />
        
        {/* Navigation */}
        <div className="sticky top-[3.5rem] md:top-[5rem] z-10 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between py-3">
              
              {/* Navigation Pills */}
              <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
                {navigationSections?.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`flex items-center px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap transform hover:scale-105 ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50'
                      }`}
                    >
                      <IconComponent className="h-4 w-4 mr-2" />
                      {section.label}
                    </button>
                  );
                })}
              </div>

              {/* Action Button */}
              <div className="flex items-center space-x-3">
                {
                  Loadershow &&  Loaderindex===1 ?(<Loader color={"border-black"}/>):( <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-2 py-2  md:px-6 md:py-2.5 md:rounded-full rounded-[20px] md:text-sm text-[10px] font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg" onClick={()=>enquiry_api(null,1)} >
                  Apply Now
                </button>)
                }
               
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            
            {/* Main Content Area */}
            <div className="xl:col-span-3 space-y-6">
              
              {/* About Section */}
              <div id="about" className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-4 border-b border-gray-200/50 bg-gradient-to-r from-white to-blue-50">
                  <div className="flex items-center text-gray-900">
                    <div className="p-2 bg-white/80 rounded-lg mr-3 shadow-sm">
                      <BuildingOfficeIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-black">About University</h2>
                      <p className="text-gray-600 text-xs">Learn about our institution</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <AboutUniversity collegeDetails={colleges?.[0]} />
                </div>
              </div>

              {/* Courses Section */}
            


              <div id="courses" className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-4 border-b border-gray-200/50 bg-gradient-to-r from-white to-blue-50">
                  <div className="flex items-center text-gray-900">
                    <div className="p-2 bg-white/80 rounded-lg mr-3 shadow-sm">
                      <BookOpenIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-black">Courses Offered</h2>
                      <p className="text-gray-600 text-xs">Explore our academic programs</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <Courses collegeDetails={colleges?.[0]} />
                </div>
              </div>

              {/* Fees Section */}
              <div id="fees" className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-4 border-b border-gray-200/50 bg-gradient-to-r from-white to-blue-50">
                  <div className="flex items-center text-gray-900">
                    <div className="p-2 bg-white/80 rounded-lg mr-3 shadow-sm">
                      <CurrencyDollarIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-black">Fee Structure</h2>
                      <p className="text-gray-600 text-xs">Transparent pricing details</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <FeesTable collegeDetails={colleges?.[0]} />
                </div>
              </div>

              {/* University Facts */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-4 border-b border-gray-200/50 bg-gradient-to-r from-white to-blue-50">
                  <div className="flex items-center text-gray-900">
                    <div className="p-2 bg-white/80 rounded-lg mr-3 shadow-sm">
                      <SparklesIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-black">Quick Facts</h2>
                      <p className="text-gray-600 text-xs">Key information at a glance</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <UniversityFact collegeDetails={colleges?.[0]} />
                </div>
              </div>

              {/* Facilities Section */}
              <div id="facilities" className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-4 border-b border-gray-200/50 bg-gradient-to-r from-white to-blue-50">
                  <div className="flex items-center text-gray-900">
                    <div className="p-2 bg-white/80 rounded-lg mr-3 shadow-sm">
                      <SparklesIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-black">Campus Facilities</h2>
                      <p className="text-gray-600 text-xs">World-class infrastructure</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <UniversityFacilities collegeDetails={colleges?.[0]} />
                </div>
              </div>

              {/* Scholarships */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-4 border-b border-gray-200/50 bg-gradient-to-r from-white to-blue-50">
                  <div className="flex items-center text-gray-900">
                    <div className="p-2 bg-white/80 rounded-lg mr-3 shadow-sm">
                      <TrophyIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-black">Scholarships</h2>
                      <p className="text-gray-600 text-xs">Financial assistance programs</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                <Scholarships collegeDetails={colleges?.[0]} />
                </div>
              </div>

              {/* Events */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-4 border-b border-gray-200/50 bg-gradient-to-r from-white to-blue-50">
                  <div className="flex items-center text-gray-900">
                    <div className="p-2 bg-white/80 rounded-lg mr-3 shadow-sm">
                      <NewspaperIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-black">Events & News</h2>
                      <p className="text-gray-600 text-xs">Latest happenings on campus</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <OurEvent collegeDetails={colleges?.[0]} />
                </div>
              </div>

              {/* Placement Chart */}
              <div id="placements" className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-4 border-b border-gray-200/50 bg-gradient-to-r from-white to-blue-50">
                  <div className="flex items-center text-gray-900">
                    <div className="p-2 bg-white/80 rounded-lg mr-3 shadow-sm">
                      <TrophyIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-black">Placement Statistics</h2>
                      <p className="text-gray-600 text-xs">Career success metrics</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <PlacementBarChart id={id} />
                </div>
              </div>

              {/* Testimonials */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-4 border-b border-gray-200/50 bg-gradient-to-r from-white to-blue-50">
                  <div className="flex items-center text-gray-900">
                    <div className="p-2 bg-white/80 rounded-lg mr-3 shadow-sm">
                      <ChatBubbleLeftRightIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-black">Student Testimonials</h2>
                      <p className="text-gray-600 text-xs">Hear from our graduates</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <Testimonals collegeDetails={colleges?.[0]} />
                </div>
              </div>

              {/* Additional Sections Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Loan Facilities */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="p-3 border-b border-gray-200/50 bg-gradient-to-r from-white to-blue-50">
                    <div className="flex items-center text-gray-900">
                      <div className="p-1.5 bg-white/80 rounded-lg mr-2 shadow-sm">
                        <CurrencyDollarIcon className="h-4 w-4 text-blue-600" />
                      </div>
                      <h3 className="text-base font-bold text-black">Education Loan</h3>
                    </div>
                  </div>
                  <div className="p-3 bg-white">
                    <LoanFec collegeDetails={colleges?.[0]} />
                  </div>
                </div>

                {/* Hiring Partners */}
                <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 overflow-hidden shadow-xs hover:shadow-sm transition-all duration-300">
  <div className="p-2 border-b border-gray-200 bg-gradient-to-r from-white to-blue-50">
    <div className="flex items-center text-gray-900">
      <div className="p-1 bg-white/80 rounded-md mr-2 shadow-xs">
        <UserGroupIcon className="h-3 w-3 text-blue-600" />
      </div>
      <h3 className="text-[20px] font-semibold text-black">Hiring Partners</h3>
    </div>
  </div>
  <div className="p-2 bg-white">
    <HiringPartner id={id}  />
  </div>
</div>
              </div>

              {/* Additional Components */}
              <div className="space-y-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-4 shadow-sm">
                  <div className="p-3 border-b border-gray-200/50 bg-gradient-to-r from-white to-blue-50">
                    <h3 className="text-base font-bold text-black">Office Address</h3>
                  </div>
                  <div className="p-4 bg-white">
                    <OfficeAddress collegeDetails={colleges?.[0]} />
                  </div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-4 shadow-sm">
                  <div className="p-3 border-b border-gray-200/50 bg-gradient-to-r from-white to-blue-50">
                    <h3 className="text-base font-bold text-black">Our Connection</h3>
                  </div>
                  <div className="p-4 bg-white">
                    <OurConnection collegeDetails={colleges?.[0]} />
                  </div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-4 shadow-sm">
                  <div className="p-3 border-b border-gray-200/50 bg-gradient-to-r from-white to-blue-50">
                    <h3 className="text-base font-bold text-black">Search Courses</h3>
                  </div>
                  <div className="p-4 bg-white">
                    <SearchCourses/>
                  </div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-4 shadow-sm">
                  <div className="p-3 border-b border-gray-200/50 bg-gradient-to-r from-white to-blue-50">
                    <h3 className="text-base font-bold text-black">Latest News</h3>
                  </div>
                  <div className="p-4 bg-white">
                    <NewsSlider collegeDetails={colleges[0]} />
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Sidebar */}
            <div className="xl:col-span-1 space-y-4">
              
              {/* Quick Info Card */}
              <div className="bg-white/95 backdrop-blur-lg rounded-xl border border-gray-200/50 p-4 sticky top-28 shadow-lg">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <BuildingOfficeIcon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">Quick Info</h3>
                  <p className="text-xs text-gray-600">Essential details</p>
                </div>
                
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100/50">
                    <span className="text-gray-600 font-medium">Established</span>
                    <span className="font-bold text-gray-900">{colleges?.[0]?.estdYear}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100/50">
                    <span className="text-gray-600 font-medium">Type</span>
                    <span className="font-bold text-gray-900">{colleges?.[0]?.type}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-100/50">
                    <span className="text-gray-600 font-medium">Location</span>
                    <span className="font-bold text-gray-900">{colleges?.[0]?.city}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-100/50">
                    <span className="text-gray-600 font-medium">Affiliated To</span>
                    <span className="font-bold text-blue-600">{colleges?.[0]?.affiliatedTo}</span>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg" onClick={ ()=>downloadFile(`${process.env.REACT_APP_API_BASE_URL}college_pdf/${colleges?.[0]?.pdf}`)}>
                    Download Brochure
                  </button>
                  <button className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-300 transform hover:scale-105 shadow-sm">
                    Virtual Tour
                  </button>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-white/95 backdrop-blur-lg rounded-xl border border-gray-200/50 p-4 shadow-lg">
                <div className="text-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <PhoneIcon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">Contact Info</h3>
                  <p className="text-xs text-gray-600">Get in touch with us</p>
                </div>
                
                <div className="space-y-3 text-xs">
                  <div className="p-2 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-100/50">
                    <div className="flex items-start">
                      <MapPinIcon className="h-3 w-3 text-gray-400 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 leading-relaxed">{colleges?.[0]?.address}</span>
                    </div>
                  </div>
                  
                  {colleges?.[0]?.contactNumber && (
                    <div className="p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100/50">
                      <div className="flex items-center">
                        <PhoneIcon className="h-3 w-3 text-blue-500 mr-2" />
                        <span className="text-gray-700 font-medium">{colleges?.[0]?.contactNumber}</span>
                      </div>
                    </div>
                  )}
                  
                  {colleges?.[0]?.officialWebsite && (
                    <div className="p-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-100/50">
                      <div className="flex items-center">
                        <GlobeAltIcon className="h-3 w-3 text-emerald-500 mr-2" />
                        <a href={colleges?.[0]?.c} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-medium truncate">
                          Visit Website
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Premium Promotional Space */}
              <div className="bg-white/95 backdrop-blur-lg rounded-xl border border-gray-200/50 p-4 shadow-lg">
                <div className="text-center mb-3">
                  <h3 className="text-base font-bold text-gray-900 mb-1">Featured</h3>
                  <p className="text-xs text-gray-600">Sponsored content</p>
                </div>
                
                {/* Premium Ad Space 1 */}
              <div className="mb-3 p-3 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl border border-blue-200/50 shadow-sm">
  <div className="text-center">
    {/* 🖼️ Ad Image Section */}
    <div className="w-full h-28 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg mb-2 flex items-center justify-center border border-blue-200/30 overflow-hidden">
      {CurrentPremiumAdd?.banner ? (
        <img
          src={ `${process.env.REACT_APP_API_IMAGE_URL}PremiumAds/${CurrentPremiumAdd?.banner} `}
          alt="Premium Ad"
          className="object-cover w-full h-full rounded-lg transition-transform duration-300 hover:scale-105"
        />
      ) : (
        <span className="text-blue-600 text-xs font-medium">No Image Available</span>
      )}
    </div>



    {/* 🔘 Button */}
    <button
      
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-1.5 px-2 rounded-lg text-xs font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md"
    >
      Learn More
    </button>
  </div>
</div>


                {/* Premium Ad Space 2 */}
                <div className="mb-3 p-3 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-xl border border-emerald-200/50 shadow-sm">
                  <div className="text-center">
                    <div className="w-full h-20 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg mb-2 flex items-center justify-center border border-emerald-200/30">
                      <span className="text-emerald-600 text-xs font-medium">Study Abroad</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-xs mb-1">Global Education</h4>
                    <p className="text-xs text-gray-600 mb-2">Worldwide opportunities</p>
                    <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-1.5 px-2 rounded-lg text-xs font-medium hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-md">
                      Explore
                    </button>
                  </div>
                </div>

                {/* Premium Ad Space 3 */}
                <div className="p-3 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 rounded-xl border border-amber-200/50 shadow-sm">
                  <div className="text-center">
                    <div className="w-full h-20 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg mb-2 flex items-center justify-center border border-amber-200/30">
                      <span className="text-amber-600 text-xs font-medium">Scholarship</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-xs mb-1">Get Scholarship</h4>
                    <p className="text-xs text-gray-600 mb-2">100% fee waiver</p>
{

  Loadershow && Loaderindex===2 ?(
    <Loader color={"border-[orange]"}/>
  ):(<button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-1.5 px-2 rounded-lg text-xs font-medium hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-md" onClick={()=>enquiry_api({enquiry:`applied for Scholarship`},2)}>
                      Apply Now
                    </button>)
}
                    


                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Bottom Sections */}
        <div className="bg-gradient-to-b from-white to-gray-50">
          
          {/* FAQ Section */}
          <div id="faq" className="bg-gradient-to-r from-slate-50 via-gray-50 to-blue-50 border-t border-gray-200/50">
            <div className="container mx-auto px-4 sm:px-6 py-8">

              <UniFaq collegeDetails={colleges?.[0]} />

            </div>
          </div>

          {/* Blog Section */}
          <div className="bg-gradient-to-r from-white via-slate-50 to-white border-t border-gray-200/50">
            <div className="container mx-auto px-4 sm:px-6 py-8">
              <OurBlog collegeDetails={colleges?.[0]} />
            </div>
          </div>

          {/* Reviews Section */}
          <div id="reviews" className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-t border-gray-200/50">
            <div className="container mx-auto px-4 sm:px-6 py-8">
              <ReviewSection id={id} avgrating={colleges?.[0]&& colleges?.[0]?.avgCollegeRating} />
            </div>
          </div>

          {/* Professors Section */}
          <div className="relative bg-white border-t border-gray-200/60 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white from-emerald-200 to-transparent rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-blue from-blue-200 to-transparent rounded-full blur-3xl transform -translate-x-32 translate-y-32"></div>
            </div>

            <div className="relative container mx-auto px-4 sm:px-6 py-12">
              <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl mb-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    Meet Our Distinguished Faculty
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                    Learn from experienced educators and industry experts who are committed to shaping the leaders of tomorrow
                  </p>
                </div>

                {/* Professors Content */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                  <ProfessorsSection faculties={colleges?.[0]?.faculties} />
                </div>

                {/* Bottom CTA */}
          
              </div>
            </div>
          </div>
        </div>

        {/* Related Colleges Section */}
        <div className="w-[90%] max-w-6xl mx-auto space-y-8">

          {/* Related City Colleges Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-blue-700 rounded-full shadow-sm"></div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Colleges in {top10College_by_city?.[0]?.city}</h3>
                <p className="text-sm text-gray-600 mt-1">Discover top educational institutions in this city</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {top10College_by_city?.map((c) => (
                <article key={c?._id} className="group bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
                        {c?.college_name}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          </div>
                          <span className="text-sm text-gray-600">{c?.city}</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-600">Est. {c.estdYear}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="flex items-center gap-1 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1.5 rounded-full border border-blue-200">
                        <span className="text-sm font-bold text-blue-700">{c?.avgRating?.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {(c?.affiliatedTo || []).slice(0, 2).map((a, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full border border-gray-200 text-gray-700 font-medium">
                          {a.trim()}
                        </span>
                      ))}
                      {(c?.affiliatedTo || []).length > 2 && (
                        <span className="text-xs px-2.5 py-1 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full border border-gray-200 text-gray-500 font-medium">
                          +{(c?.affiliatedTo || []).length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <div className="w-3 h-3 bg-green-100 rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                        </div>
                        {c?.courses?.length || 0} courses available
                      </div>
                      <Link
                        to={`/university-page/${c?._id}`}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md flex items-center gap-1.5"
                      >
                        View More
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Related State Colleges Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-green-600 to-green-700 rounded-full shadow-sm"></div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Colleges in {top10College_by_state?.[0]?.state}</h3>
                <p className="text-sm text-gray-600 mt-1">Explore educational opportunities across the state</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="p-4 text-left text-sm font-semibold text-gray-900">College Name</th>
                      <th className="p-4 text-left text-sm font-semibold text-gray-900">City</th>
                      <th className="p-4 text-left text-sm font-semibold text-gray-900">Established</th>
                      <th className="p-4 text-left text-sm font-semibold text-gray-900">Rating</th>
                      <th className="p-4 text-left text-sm font-semibold text-gray-900">Affiliation</th>
                      <th className="p-4 text-left text-sm font-semibold text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {top10College_by_state?.map((c, i) => (
                      <tr key={c?._id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="p-4 text-sm font-medium text-gray-900 max-w-[200px] truncate">{c?.college_name}</td>
                        <td className="p-4 text-sm text-gray-600">{c?.city}</td>
                        <td className="p-4 text-sm text-gray-600">{c?.estdYear}</td>
                        <td className="p-4">
                          <div className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-50 to-indigo-50 px-2 py-1 rounded-full border border-blue-200">
                            <span className="text-sm font-bold text-blue-700">{c?.avgRating?.toFixed(1) ?? "-"}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1.5">
                            {(c?.affiliatedTo || []).slice(0, 1).map((a, idx) => (
                              <span key={idx} className="text-xs px-2 py-1 bg-gradient-to-r from-gray-50 to-gray-100 rounded border border-gray-200 text-gray-700 font-medium">
                                {a.trim()}
                              </span>
                            ))}
                            {(c?.affiliatedTo || []).length > 1 && (
                              <span className="text-xs px-2 py-1 bg-gradient-to-r from-gray-50 to-gray-100 rounded border border-gray-200 text-gray-500 font-medium">
                                +{(c?.affiliatedTo || []).length - 1}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <Link
                            to={`/university-page/${c?._id}`}
                            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-medium transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md inline-block"
                          >
                            View More
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>



      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading University</h3>
        <p className="text-gray-600 text-sm">Please wait while we fetch the details...</p>
      </div>
    </div>
  );
}

export default UniversityPage;

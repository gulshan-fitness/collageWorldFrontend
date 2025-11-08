import React, { useContext, useEffect } from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";

// admin panel frontend imported files start----------------------------------------

import Admin from "./pages/Admin_panel/components/Admin";
import College_add from "./pages/Admin_panel/components/College/College_add";
import College_view from "./pages/Admin_panel/components/College/College_view";
import Course_add from "./pages/Admin_panel/components/Courses/Course_add";
import Hiring_partners_add from "./pages/Admin_panel/components/Hiring_partners/Hiring_partners_add";
import College_edit from "./pages/Admin_panel/components/College/College_edit";
import Course_view from "./pages/Admin_panel/components/Courses/Course_view";
import Course_edit from "./pages/Admin_panel/components/Courses/Course_edit";
import Hiring_partners_view from "./pages/Admin_panel/components/Hiring_partners/Hiring_partners_view";
import Hiring_partners_edit from "./pages/Admin_panel/components/Hiring_partners/Hiring_partners_edit";
import Scholarship_add from "./pages/Admin_panel/components/Scholarship/Scholarship_add";
import Scholarship_view from "./pages/Admin_panel/components/Scholarship/Scholarship_view";
import Scholarship_edit from "./pages/Admin_panel/components/Scholarship/Scholarship_edit";
import Doubts_add from "./pages/Admin_panel/components/Doubts/Doubts_add";
import Doubts_view from "./pages/Admin_panel/components/Doubts/Doubts_view";
import Doubts_edit from "./pages/Admin_panel/components/Doubts/Doubts_edit";
import Post_add from "./pages/Admin_panel/components/Post/Post_add";
import Post_view from "./pages/Admin_panel/components/Post/Post_view";
import Post_edit from "./pages/Admin_panel/components/Post/Post_edit";
import Placement_add from "./pages/Admin_panel/components/Placement/Placement_add";
import Placemenet_view from "./pages/Admin_panel/components/Placement/Placemenet_view";
import Placement_edit from "./pages/Admin_panel/components/Placement/Placement_edit";
import Rating_add from "./pages/Admin_panel/components/Rating/Rating_add";
import Rating_view from "./pages/Admin_panel/components/Rating/Rating_view";
import Review_add from "./pages/Admin_panel/components/Review/Review_add";
import Review_view from "./pages/Admin_panel/components/Review/Review_view";
import Banner_add from "./pages/Admin_panel/components/Banners/Banner_add";
import Banner_view from "./pages/Admin_panel/components/Banners/Banner_view";
import Story_add from "./pages/Admin_panel/components/Students_stories/Story_add";

import Story_view from "./pages/Admin_panel/components/Students_stories/Story_view";
import Course_rating_add from "./pages/Admin_panel/components/Course_rating/Course_rating_add";
import Course_rating_view from "./pages/Admin_panel/components/Course_rating/Course_rating_view";
import Faculty_add from "./pages/Admin_panel/components/Faculty/Faculty_add";
import Faculty_view from "./pages/Admin_panel/components/Faculty/Faculty_view";
import Agent_add from "./pages/Admin_panel/components/Agent/Agent_add";
import Agent_view from "./pages/Admin_panel/components/Agent/Agent_view";
import Placed_students_add from "./pages/Admin_panel/components/Placed_students/Placed_students_add";
import Placed_students_view from "./pages/Admin_panel/components/Placed_students/Placed_students_view";

import PlacementScore_add from "./pages/Admin_panel/components/PlacementScore/PlacementScore_add";
import PlacementScore_view from "./pages/Admin_panel/components/PlacementScore/PlacementScore_view";
import Admin_login from "./pages/Admin_panel/components/Admin_login";
import Admin_sign_up from "./pages/Admin_panel/components/Admin_sign_up";
import CollageCourseAdd from "./pages/Admin_panel/components/Courses/CollageCourseAdd";
import CollageCourseEdit from "./pages/Admin_panel/components/Courses/CollageCourseEdit";
import CollageCourseView from "./pages/Admin_panel/components/Courses//CollageCourseView";
import { Context } from "./Context_holder";

import Dashboard from "./pages/Admin_panel/components/Dashboard";

// admin panel frontend imported files end----------------------------------------

// frontend imported files start----------------------------------------

import Main from "./Main";
import Home from "./pages/wbsite_panel/screens/home/index";
import About from "./pages/wbsite_panel/screens/about/index";
import Contact from "./pages/wbsite_panel/screens/contact/index";
import UniversityPage from "./pages/wbsite_panel/components/university-page/index";
import AllUniversity from "./pages/wbsite_panel/components/common/allUniversity";
import NotFound from "./pages/wbsite_panel/screens/404/index";
import Stream_add from "./pages/Admin_panel/components/Stream/Stream_add";
import Stream_view from "./pages/Admin_panel/components/Stream/Stream_view";
import Slider_banner_add from "./pages/Admin_panel/components/Slider_banners/Slider_banner_add";
import Slider_banner_view from "./pages/Admin_panel/components/Slider_banners/Slider_banner_view";
import Event_add from "./pages/Admin_panel/components/Event/Event_add";
import Event_view from "./pages/Admin_panel/components/Event/Event_view";
import BlogSection from "./pages/wbsite_panel/screens/blogs/blogmid/blogMid";
import Website_blog_add from "./pages/Admin_panel/components/website_blogs/Website_blog_add";
import Website_blog_view from "./pages/Admin_panel/components/website_blogs/Website_blog_view";
import Website_blog_edit from "./pages/Admin_panel/components/website_blogs/Website_blog_edit";
import BlogPost2 from "./pages/wbsite_panel/components/university-page/universityBlog/universityBlog";
import EnquiriesDetails from "./pages/Admin_panel/components/EnquiriesDetails";
import EventExplore_page from "./pages/wbsite_panel/components/EventExplore_page";
import Website_news_add from "./pages/Admin_panel/components/website_news/Website_news_add";
import Website_news_view from "./pages/Admin_panel/components/website_news/Website_news_view";
import WebsiteStory_add from "./pages/Admin_panel/components/websitestories/WebsiteStory_add";
import WebsiteStory_view from "./pages/Admin_panel/components/websitestories/WebsiteStory_view";
import StudentProfile from "./pages/wbsite_panel/components/StudentProfile/StudentProfile";
import OurCommitment from "./pages/wbsite_panel/screens/extra/ourCommitment";
import WeDiffrent from "./pages/wbsite_panel/screens/extra/weDiffrent";
// import WhatWeOffer from "./pages/wbsite_panel/screens/extra/weOffer";
// import OurExperts from "./pages/wbsite_panel/screens/about/ourexperts";
import AAPDExpert from "./pages/wbsite_panel/screens/extra/ourExpert";
import InviteUniversitySection from "./pages/wbsite_panel/screens/extra/inviteUniversity";
import FakeUniversityList from "./pages/wbsite_panel/screens/extra/fakeUniversity";
import VideoCounselingSection from "./pages/wbsite_panel/screens/extra/videoCounselling";
import ConnectWithStudentsAlumni from "./pages/wbsite_panel/screens/extra/studentAlumini";
import ImportantVideos from "./pages/wbsite_panel/screens/extra/importantVideo";
import SuccessStories from "./pages/wbsite_panel/screens/extra/sucessStory";
import Live_applications from "./pages/wbsite_panel/components/Live_applications";
import CourseDetailsPage from "./pages/Admin_panel/components/Courses/CourseDetailsPage";
import ExamAdd from "./pages/Admin_panel/components/Exam/ExamAdd";
import ExamView from "./pages/Admin_panel/components/Exam/ExamView";
import ExamEdit from "./pages/Admin_panel/components/Exam/ExamEdit";
import ExamList from "./pages/wbsite_panel/components/Exam/ExamList";
import Exam from "./pages/wbsite_panel/components/Exam/Exam";
import AddAgencyCollegeRating from "./pages/Admin_panel/components/AgenciesRating/AddAgencyCollegeRating";

import AgenciesCollageRatingList from "./pages/Admin_panel/components/AgenciesRating/AgenciesCollageRatingList";
import AiSuggestiona from "./pages/wbsite_panel/components/AiSuggestion/AiSuggestion";
import Referl from "./pages/wbsite_panel/components/Referl/Refrel";
import Refrel from "./pages/wbsite_panel/components/Referl/Refrel";
import Resources from "./pages/wbsite_panel/screens/more/resources";
import Careers from "./pages/wbsite_panel/screens/more/careers";
import News from "./pages/wbsite_panel/screens/more/news";
import Events from "./pages/wbsite_panel/screens/more/events";
import AdminProtectedRoutes from "./pages/Admin_panel/components/AdminProtectedRoutes";
import SubAdminSignUp from "./pages/Admin_panel/components/websitestories/SubAdminSignUp";
import AdminApproved from "./pages/Admin_panel/components/AdminApproved";
import SuperAdminProtectedRoute from "./pages/Admin_panel/components/websitestories/SuperAdminProtectedRoute";
import SubAdminPending from "./pages/Admin_panel/components/SubAdminPending";
import EventDetails from "./pages/wbsite_panel/components/university-page/OurEvent/EventDetails";
import LearnMore from "./pages/wbsite_panel/screens/learnMore";
import Apply from "./pages/wbsite_panel/screens/apply";
import CourseType from "./pages/wbsite_panel/screens/home/courseType";
import PremiumadsAdd from "./pages/Admin_panel/components/Premiumad/PremiumadsAdd";
import PremiumADView from "./pages/Admin_panel/components/Premiumad/PremiumADView";
// frontend imported files end----------------------------------------

function App() {
  const {
    setusertoken,
    setuser,
    settoken,
    setcollege_name,
    setcourse_name,
    setstream_name,

    setcollege_type,

    setcollege_state,
    setselectedFeesRange,
    setadmin,

    setcollege_city,

    setcourse_time,

    setduration,

    setspecialisation,
    admin
  } = useContext(Context);

  const stored_token = localStorage.getItem("token");

  const stored_usertoken = localStorage.getItem("usertoken");

  const stored_user = JSON.parse(localStorage.getItem("user"));

  const stored_course_name = localStorage.getItem("course_name");
  const stored_course_time = localStorage.getItem("course_time");
  const stored_stream_name = localStorage.getItem("stream_name");
  const stored_college_name = localStorage.getItem("college_name");
  const stored_college_state = JSON.parse(
    localStorage.getItem("college_state")
  );
  const stored_college_city = JSON.parse(localStorage.getItem("college_city"));
  const stored_college_type = localStorage.getItem("college_type");
  const stored_duration = localStorage.getItem("duration");
  const stored_max_fees = localStorage.getItem("max_fees");
  const stored_min_fees = localStorage.getItem("min_fees");
  const stored_specialisation = localStorage.getItem("specialisation");
  const stored_admin = JSON.parse(localStorage.getItem("admin"));

  useEffect(() => {
    if (stored_admin) {
      setadmin(stored_admin);
    }
    if (stored_user) {
      setuser(stored_user);
    }

    if (stored_token) {
      settoken(stored_token);
    }

    if (stored_usertoken) {
      setusertoken(stored_usertoken);
    }

    if (stored_course_name) {
      setcourse_name(stored_course_name);
    }

    if (stored_course_time) {
      setcourse_time(stored_course_time);
    }

    if (stored_stream_name) {
      setstream_name(stored_stream_name);
    }

    if (stored_college_name) {
      setcollege_name(stored_college_name);
    }

    if (stored_college_state) {
      setcollege_state(stored_college_state);
    }

    if (stored_college_city) {
      setcollege_city(stored_college_city);
    }

    if (stored_college_type) {
      setcollege_type(stored_college_type);
    }

    if (stored_duration) {
      setduration(stored_duration);
    }

    if (stored_max_fees && stored_min_fees) {
      setselectedFeesRange({ max: stored_max_fees, min: stored_min_fees });
    }

    if (stored_specialisation) {
      setspecialisation(stored_specialisation);
    }
  }, []);

  const routes = createBrowserRouter([
    
    {
      path: "",
      element: <Main />,

      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },

        {
          path: "/contact",
          element: <Contact />,
        },

        {
          path: "/allUniversity",
          element: <AllUniversity />,
        },

        {
          path: "/university-page/:id",
          element: <UniversityPage />,
        },

        {
          path: "/blog",
          element: <BlogSection />,
        },

        {
          path: "/college_event/:id",
          element: <EventDetails />,
        },

        {
          path: "/universityblog/:id",
          element: <BlogPost2 />,
        },



        {
          path: "/Live_applications",

          element: <Live_applications />,
        },


        {path:"/coursedetailspage/:id",

        element:<CourseDetailsPage/>

        },

           {path:"/examlist",

        element:<ExamList/>

        },

              {path:"/exam/:id",

        element:<Exam/>

        },
               {path:"/refrel",

        element:<Refrel/>

        },
        {  path:"/learnmore",
        element:<LearnMore/>

      },
      {  path:"/apply",
      element:<Apply/>

    },

      {
      path: "/careers",

      element: <CourseType/>,
    },

        {
      path: "/news",

      element: <News/>,
    },
    {
      path: "/events",

      element: <Events/>,
    },

      {
      path: "/resources",

      element: <Resources/>,
    },
        {
          path: "/ourcommitment",
          element: <OurCommitment />,
        },
        {
          path: "/wediffrent",
          element: <WeDiffrent />,
        },
        {
          path: "/ourexpert",
          element: <AAPDExpert />,
        },
        {
          path: "/inviteuniversity",
          element: <InviteUniversitySection />,
        },

        {
          path: "/fakeuniversity",
          element: <FakeUniversityList />,
        },

        {
          path: "/videoCounselingSection",
          element: <VideoCounselingSection />,
        },
        {
          path: "/ConnectWithStudentsAlumni",
          element: <ConnectWithStudentsAlumni/>,
        },
        {
          path: "/successStories",
          element: <SuccessStories />,
        },
        {
          path: "/importantVideos",
          element: <ImportantVideos />,
        },
          {
      path: "aisuggestion",
      element: <AiSuggestiona />,
    },


        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },

    {
      path: "/admin",
      element:( 

          <AdminProtectedRoutes>

       <Admin />

      </AdminProtectedRoutes>

      ),

      children: [

        {
          path: "",
          element:
             
          admin?.role!=="subadmin" ?   
            (<Dashboard/>):
            (<College_add/>)
          
        },



          {
          path: "adminlist",

          element:(<SuperAdminProtectedRoute>
              
      <AdminApproved/>

        </SuperAdminProtectedRoute>),

        },


        {
          path: "college/add",
          element:<College_add/>,
        },


        {
          path: "college/view",
          element: <College_view />,
        },

        {
          path: "college/edit/:id",
          element: <College_edit />,
        },


        
        {
          path: "course/add",
          element: (
          
          
          <SuperAdminProtectedRoute>
            
       <Course_add />

      </SuperAdminProtectedRoute>
      ),
        },
        {
          path: "course/edit/:id",
          element:(
             <SuperAdminProtectedRoute>
            
       <Course_edit />

      </SuperAdminProtectedRoute>
            
      ),
        },

        {
          path: "course/view",
          element: (
                  <SuperAdminProtectedRoute>
              
        <Course_view />

        </SuperAdminProtectedRoute>
         ),
        },


        {
          path: "college_course/add",
          element: <CollageCourseAdd />,
        },
        {
          path: "college_course/edit/:id",
          element: <CollageCourseEdit />,
        },

        {
          path: "college_course/view",
          element: <CollageCourseView />,
        },
        {
          path: "hiring_partners/add",
          element: <Hiring_partners_add />,
        },

        {
          path: "hiring_partners/view",
          element: <Hiring_partners_view />,
        },

        {
          path: "hiring_partners/edit/:id",
          element: <Hiring_partners_edit />,
        },

        {
          path: "scholarship/add",
          element: <Scholarship_add />,
        },

        {
          path: "scholarship/view",
          element: <Scholarship_view />,
        },

        {
          path: "scholarship/edit/:id",
          element: <Scholarship_edit />,
        },

        {
          path: "doubts/add",
          element: <Doubts_add />,
        },


        {
          path: "doubts/view",
          element: <Doubts_view />,
        },



        {
          path: "doubts/edit/:id",
          element: <Doubts_edit />,
        },





        {
          path: "exam/add",
          element:( <SuperAdminProtectedRoute>
            
       <ExamAdd />

      </SuperAdminProtectedRoute>),
        },

        {
          path: "exam/view",
          element: (
          <SuperAdminProtectedRoute>
            
       <ExamView />

      </SuperAdminProtectedRoute>
         ),
        },

        {
          path: "exam/edit/:id",
          element: (
          <SuperAdminProtectedRoute>
            
       <ExamEdit />

      </SuperAdminProtectedRoute>
         ),
        },




        {
          path: "post/add",
          element: <Post_add />,
        },

        {
          path: "post/view",
          element: <Post_view />,
        },

        {
          path: "post/edit/:id",
          element: <Post_edit />,
        },

        {
          path: "website_blog/add",
          element: (
                       <SuperAdminProtectedRoute>
              
        <Website_blog_add />

        </SuperAdminProtectedRoute>
        ),
        },

        {
          path: "website_blog/view",
          element: (
             <SuperAdminProtectedRoute>
              
      <Website_blog_view />

        </SuperAdminProtectedRoute>
          
          ),
        },

        {
          path: "website_blog/edit/:id",
          element:(
             <SuperAdminProtectedRoute>
              
      <Website_blog_edit />

        </SuperAdminProtectedRoute>
            ),
        },

        {
          path: "website_news/add",
          element: (
          <SuperAdminProtectedRoute>
              
      <Website_news_add />

        </SuperAdminProtectedRoute>
        ),
        },

        {
          path: "website_news/view",
          element:(
            <SuperAdminProtectedRoute>
              
      <Website_news_view />

        </SuperAdminProtectedRoute>
           )
        },

        {
          path: "website_story/add",
          element:(
             <SuperAdminProtectedRoute>
              
      <WebsiteStory_add />

        </SuperAdminProtectedRoute>
           ),
        },

        {
          path: "website_story/view",
          element:(<SuperAdminProtectedRoute>
              
      <WebsiteStory_view />

        </SuperAdminProtectedRoute> ),
        },


        {
          path: "agencies/add",
          element: (
          
              
      <AddAgencyCollegeRating/>

        
        ),
        },

        {
          path: "agencies/view",
          element: (
            
              
      <AgenciesCollageRatingList/>

       
          
         ),
        },

        {
          path: "event/add",
          element: <Event_add />,
        },

        {
          path: "event/view",
          element: <Event_view />,
        },

        {
          path: "placement/add",
          element: <Placement_add />,
        },

        {
          path: "placement/view",
          element: <Placemenet_view />,
        },

        {
          path: "placement/edit/:id",
          element: <Placement_edit />,
        },


        {
          path: "rating/add",
          element:( <SuperAdminProtectedRoute>
              
      <Rating_add/>

        </SuperAdminProtectedRoute> ),
        },


        {
          path: "rating/view",
          element:(
            <SuperAdminProtectedRoute>
              
      <Rating_view/>

        </SuperAdminProtectedRoute>
           ),
        },

        {
          path: "review/add",
          element: ( <SuperAdminProtectedRoute>
              
      <Review_add/>

        </SuperAdminProtectedRoute> ),
        },

        {
          path: "review/view",
          element: (<SuperAdminProtectedRoute>
              
      <Review_view/>

        </SuperAdminProtectedRoute>),
        },

        {
          path: "banner/add",
          element:(<SuperAdminProtectedRoute>
              
      <Banner_add/>

        </SuperAdminProtectedRoute> ),
        },

        {
          path: "banner/view",
          element: (<SuperAdminProtectedRoute>
              
      <Banner_view/>

        </SuperAdminProtectedRoute> ),
        },

        {
          path: "slider_banner/add",
          element: (<SuperAdminProtectedRoute>
              
      <Slider_banner_add/>

        </SuperAdminProtectedRoute> ),
        },

        {
          path: "slider_banner/view",
          element:(
            <SuperAdminProtectedRoute>
              
      <Slider_banner_view/>

        </SuperAdminProtectedRoute>
          ),
        },

        {
          path: "students_stories/add",
          element: <Story_add />,
        },

        {
          path: "students_stories/view",
          element: <Story_view />,
        },

        {
          path: "course_rating/add",
          element: ( <SuperAdminProtectedRoute>
              
      <Course_rating_add/>

        </SuperAdminProtectedRoute> ),
        },

        {
          path: "course_rating/view",
          element:( <SuperAdminProtectedRoute>
              
      <Course_rating_view/>

        </SuperAdminProtectedRoute>  ),
        },

        {
          path: "faculty/add",
          element: <Faculty_add />,
        },

        {
          path: "faculty/view",
          element: <Faculty_view />,
        },

        {
          path: "agent/add",
          element:(<SuperAdminProtectedRoute>
              
      <Agent_add />

        </SuperAdminProtectedRoute> ) ,
        },

        {
          path: "agent/view",
          element: (<SuperAdminProtectedRoute>
              
      <Agent_view />

        </SuperAdminProtectedRoute> ) ,
        },

        {
          path: "placed_students/add",
          element: <Placed_students_add />,
        },

        {
          path: "placed_students/view",
          element: <Placed_students_view />,
        },

        {
          path: "placement_score/add",
          element: <PlacementScore_add />,
        },

        {
          path: "placement_score/view",
          element: <PlacementScore_view />,
        },

        {
          path: "stream/add",
          element: (<SuperAdminProtectedRoute>
              
      <Stream_add/>

        </SuperAdminProtectedRoute> ),
        },

        {
          path: "stream/view",
          element:(<SuperAdminProtectedRoute>
              
      <Stream_view/>

        </SuperAdminProtectedRoute>),
        },


           {
          path: "premiumad/add",
          element: (<SuperAdminProtectedRoute>
              
      <PremiumadsAdd/>

        </SuperAdminProtectedRoute> ),
        },

        {
          path: "premiumad/view",
          element:(<SuperAdminProtectedRoute>
              
      <PremiumADView/>

        </SuperAdminProtectedRoute>),
        },


        {
          path: "enquiries_details",
          element: (<SuperAdminProtectedRoute>
              
      <EnquiriesDetails/>

        </SuperAdminProtectedRoute> ),
        },
      ],
    },


    {
      path: "admin_login/$rj60cc1113$",
      element: <Admin_login />,
    },

    
  



      {
      path: "pendingSubadmin",
      element: <SubAdminPending />,
    },

    {
      
      path: "admin_sign_up/$rj60cc1113$",


      element:(
               <AdminProtectedRoutes>
          <Admin_sign_up />
      </AdminProtectedRoutes>
      ),
    },

        {
      path: "subadmin_sign_up/$rj60cc1113$",

        element:(

          <SubAdminSignUp />
  
      ),
    },

    {
      path: "/student_profile",
      element: <StudentProfile />,
    },

  ,
  



  ]);

  return <RouterProvider router={routes} />;
}

export default App;

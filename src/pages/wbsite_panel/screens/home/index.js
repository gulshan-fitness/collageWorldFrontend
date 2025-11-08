import React, { useContext, useEffect, useState } from "react";
import HomeBanner from "./home-banner";
import NumberReport from "./number-report";
import OverTeamExtra from "./overteam-extra";
// import WhatMakeUs from "./whatmakeus";
// import NewsSlider from "./newsSlider";
import OurTeam from "./our-team";
import Faq from "./faq";
import OneStopSolution from "./oneStopSolution";
import CourseType from "./courseType";
import Top10College from "./top10college/top10college";
import { Context } from "../../../../Context_holder";
import CollegeBanner1st from "../../components/university-page/collegeBanner1st/CollegeBanner1st";
import CollegeBanner2nd from "../../components/university-page/collegeBanner2nd/CollegeBanner2nd";
import CollegeBanner3rd from "../../components/university-page/collegeBanner3rd/CollegeBanner3rd";
import Website_stories from "../Wesite_stories";
import Website_news_Slider from "./Website_news_Slider";

import StudentsPlaced from "./Students_placed/StudentsPlaced";
import WebTestimonial from "./webTestimonial";
import TopStudyPlaces from "./topPlace";
import AdmissionButtons from "./liveAdmission";
import FuturisticCourses from "./futureCourse";
import Why from "./why";
import TopCourses from "./topCourses";
import Approved_colleges from "../../../Admin_panel/components/Approved_colleges";
import CourseSidebar from "./coursesSlide";
import AddAgencyCollegeRating from "../../../Admin_panel/components/AgenciesRating/AddAgencyCollegeRating";
import AgenciesCollageRating from "../../../Admin_panel/components/AgenciesCollageRating";
import TopTrendingExams from "./topTrendingExams";
import CounsellingRoom from "./counsellingRoom";

const Home = () => {





  
  const {
    college_fetch_by_ratings,
    banners_fetch,
    banner,
    websitestory_fetch,
    websitestory,
    website_news_fetch,
    website_news,
    placed_students_fetch,
    placed_students,
    search_query_clear,
  } = useContext(Context);

  useEffect(() => {
    college_fetch_by_ratings();
    banners_fetch();
    websitestory_fetch();
  
    placed_students_fetch();
    search_query_clear();
  }, []);

  console.log(banner,"aa nhi rhe ",websitestory)

  return (
    <div className="text-white">
     

      <HomeBanner />
      {/* < CourseSidebar/> */}

      {/* <NumberReport /> */}
      <CourseType />

    

      <Why />

      <CollegeBanner1st banner={banner[0]?.banner[0]} />

      <AdmissionButtons />

      <Website_stories websitestory={websitestory} />

      <CounsellingRoom />
      <TopStudyPlaces />
      <TopTrendingExams/>

      <OverTeamExtra />

      {/* <StudentsPlaced placed_students={placed_students}/> */}

      {/* <WhatMakeUs /> */}

      <TopCourses />
      <Approved_colleges/>

      <Top10College />
      <AgenciesCollageRating/>

      <Website_news_Slider  />

      <CollegeBanner3rd banner={banner[0]?.banner[2]} />

      <FuturisticCourses />

      <WebTestimonial />

      <OurTeam />
      <CollegeBanner2nd banner={banner[0]?.banner[1]} />
      <Faq />

      <OneStopSolution />
    </div>
  );
};

export default Home;



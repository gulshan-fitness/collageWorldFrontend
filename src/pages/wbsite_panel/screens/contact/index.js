import React from 'react'
import TopBanner from '../../components/common/topBanner'
import Map from './map/page'
import BottomContact from './bottomContact/page'
import  { useContext, useEffect } from "react";
// import MidContact from './midContact/page'
// import FormContact from './formContact/page'
import { Context } from "../../../../Context_holder";
import OurTeam from '../home/our-team'
import Website_news_Slider from "../home/Website_news_Slider";

const Contact = () => {

  const {
    college_fetch_by_ratings,
    banners_fetch,
    banner,
    websitestory_fetch,
    websitestory,
    website_news_fetch,
    website_news,
    placed_students_fetch,
    placed_students
  } = useContext(Context);

  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    college_fetch_by_ratings();

    banners_fetch();
    websitestory_fetch();
   
    placed_students_fetch()
  }, []);
  return (
    <>
     <TopBanner bgBanner="contactBgBanner" title="Contact Us" />
     <OurTeam/>
      <BottomContact />
      
      <Website_news_Slider  />
      <Map />

      {/* <FormContact /> */}
      {/* <MidContact /> */}
    </>
  )
}

export default Contact
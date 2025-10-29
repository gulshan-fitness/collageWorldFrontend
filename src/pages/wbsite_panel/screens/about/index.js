import React from 'react'
import AboutBanner from "./aboutbanner/index"
import TopBanner from "../../components/common/topBanner/index"
import OurExperts from "./ourexperts/index"
import AboutReg from "./aboutregistration/index"
import WhyUs from "./whyus/index"
import OurFacilties from "./ourfacilties/index"
// import AdmissionDiv from "./admissioDiv/index"
// import CollegeSearch from '../../components/funny'
// import BannerImage from "./aboutbanner/image/"

const About = () => {
  return (
    <>
      <TopBanner  title="About Us" />
   
            <AboutBanner />
            <OurExperts />
            <AboutReg/>
            <WhyUs/>
            <OurFacilties/>
            {/* <AdmissionDiv/> */}
    </>
  )
}

export default About;
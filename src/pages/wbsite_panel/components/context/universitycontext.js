import React, { createContext, useState } from "react";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
// quantum university start
import quantumUniversity from "./images/qunatumUniversity/quantumgallery.jpg";
import llb from "./images/courses/llb.jpg";
import btech from "./images/courses/btech.jpg";
import mtech from "./images/courses/mtech.jpg";
import bca from "./images/courses/bca.jpg";
import mca from "./images/courses/mca.jpg";
import uiux from "./images/qunatumUniversity/quantumEvents/uiux.jpg";
import musicteacher from "./images/qunatumUniversity/quantumEvents/musicteacher.jpg";
import education from "./images/qunatumUniversity/quantumEvents/education.jpg";
import discipline from "./images/qunatumUniversity/quantumEvents/discipline.jpg";
import digitalmarketing from "./images/qunatumUniversity/quantumEvents/digitalmarketing.jpg";
import art3d from "./images/qunatumUniversity/quantumEvents/3dArt.jpg";
import qankit from "./images/qunatumUniversity/placedStudent/qankit.png";
import qarchit from "./images/qunatumUniversity/placedStudent/qarchit.png";
import qbhupendra from "./images/qunatumUniversity/placedStudent/qbhupendra.png";
import qdipayan from "./images/qunatumUniversity/placedStudent/qdipayan.png";
import qkartikey from "./images/qunatumUniversity/placedStudent/qkartikey.png";
import qmayank from "./images/qunatumUniversity/placedStudent/qmayank.png";
import qhir1 from "./images/qunatumUniversity/hiringPartner/thumb (1).jpeg";
import qhir2 from "./images/qunatumUniversity/hiringPartner/thumb (2).jpeg";
import qhir3 from "./images/qunatumUniversity/hiringPartner/thumb (3).jpeg";
import qhir4 from "./images/qunatumUniversity/hiringPartner/thumb (4).jpeg";
import qhir5 from "./images/qunatumUniversity/hiringPartner/thumb (5).jpeg";
import qhir6 from "./images/qunatumUniversity/hiringPartner/thumb (6).jpeg";
import qhir7 from "./images/qunatumUniversity/hiringPartner/thumb (7).jpeg";
import qhir8 from "./images/qunatumUniversity/hiringPartner/thumb (8).jpeg";
import qhir9 from "./images/qunatumUniversity/hiringPartner/thumb (9).jpeg";
import qhir10 from "./images/qunatumUniversity/hiringPartner/thumb (10).jpeg";
import qhir11 from "./images/qunatumUniversity/hiringPartner/thumb (11).jpeg";
import qhir12 from "./images/qunatumUniversity/hiringPartner/thumb.jpeg";
import qblog1 from "./images/qunatumUniversity/quantumBlogs/1.jpg";
import qblog2 from "./images/qunatumUniversity/quantumBlogs/2.jpg";
import qblog3 from "./images/qunatumUniversity/quantumBlogs/3.jpg";
// quantum university end
// parul university start
import parulBanner from "./images/parulUniversity/parul.webp";
import gunjanpandya from "./images/parulUniversity/placedStudent/677721gunjan.jpg";
import dhairyakikani from "./images/parulUniversity/placedStudent/551795dhairya.jpg";
import jaivaidya from "./images/parulUniversity/placedStudent/499389jay.jpg";
import hemalikhatri from "./images/parulUniversity/placedStudent/971745Hemali Khatri-min.jpg";
import parulh1 from "./images/parulUniversity/hiringPartner/2713logo 2.png";
import parulh2 from "./images/parulUniversity/hiringPartner/3891Elmex_Logo.png";
import parulh3 from "./images/parulUniversity/hiringPartner/5559Logo 1.png";
import parulh4 from "./images/parulUniversity/hiringPartner/6361r1.png";
import parulh5 from "./images/parulUniversity/hiringPartner/7463logo 8.jpg";
import parulh6 from "./images/parulUniversity/hiringPartner/8195Logo-18.png";
import parulh7 from "./images/parulUniversity/hiringPartner/8831r7.png";
import parulh8 from "./images/parulUniversity/hiringPartner/9517Page-72-Image-544.png";
import parulh9 from "./images/parulUniversity/hiringPartner/9665BYJUS.jpg";
import bcom from "./images/parulUniversity/courses/bcom.jpg";
import mcom from "./images/parulUniversity/courses/mcom.jpg";
import webdev from "./images/parulUniversity/event/webdev.jpg";
import analyis from "./images/parulUniversity/event/analyis.jpg";
import entrepreneur from "./images/parulUniversity/event/entrepreneur.jpg";
// parul university end
// pacific university start
import pacific from "./images/pacificUniversity/pacific.jpg";
import llm from "./images/pacificUniversity/courses/llm.jpg";
import bscnursing from "./images/pacificUniversity/courses/bscnursing.jpg";
import mscnursing from "./images/pacificUniversity/courses/mscnursing.jpg";
import pacifich1 from "./images/pacificUniversity/hiringPartner/1.jpg";
import pacifich2 from "./images/pacificUniversity/hiringPartner/2.jpg";
import pacifich3 from "./images/pacificUniversity/hiringPartner/3.jpg";
import pacifich4 from "./images/pacificUniversity/hiringPartner/4.jpg";
import pacifich5 from "./images/pacificUniversity/hiringPartner/5.jpg";
import pacifich6 from "./images/pacificUniversity/hiringPartner/6.jpg";
import pacifich7 from "./images/pacificUniversity/hiringPartner/7.jpg";
import pacifich8 from "./images/pacificUniversity/hiringPartner/8.jpg";
import pacifich9 from "./images/pacificUniversity/hiringPartner/9.jpg";
import pacifich10 from "./images/pacificUniversity/hiringPartner/10.jpg";
import parmatmasingh from "./images/pacificUniversity/placedStudent/2.png";
import vinaysinghbandral from "./images/pacificUniversity/placedStudent/3.png";
import vikrantbaloria from "./images/pacificUniversity/placedStudent/4.png";
import swapnilsingh from "./images/pacificUniversity/placedStudent/5.png";
// pacific university end
// marwadi university start
import marwadi from "./images/marwadiUniversity/marwadi.jpeg";
import marwadie1 from "./images/marwadiUniversity/event/1 (1).jpg";
import marwadie2 from "./images/marwadiUniversity/event/1 (2).jpg";
import marwadie3 from "./images/marwadiUniversity/event/1 (3).jpg";
import marwadie4 from "./images/marwadiUniversity/event/1 (4).jpg";
import marwadie5 from "./images/marwadiUniversity/event/1 (5).jpg";
import marwadie6 from "./images/marwadiUniversity/event/1 (6).jpg";
import divij from "./images/marwadiUniversity/placedStudent/divijjobanputra.png";
import ghanshyampala from "./images/marwadiUniversity/placedStudent/ghanshyampala.png";
import payalvijay from "./images/marwadiUniversity/placedStudent/payalvijaybharakhda.png";
import pritiben from "./images/marwadiUniversity/placedStudent/pritiben usadadiya.png";
import pritibenusadadiyayash from "./images/marwadiUniversity/placedStudent/pritibenusadadiyayash.png";
import shubhamjoshi from "./images/marwadiUniversity/placedStudent/shubhamjoshi.png";
import yashdoshi from "./images/marwadiUniversity/placedStudent/yashdoshi.png";
import yashketansampat from "./images/marwadiUniversity/placedStudent/yashketansampat.png";
import marwadih1 from "./images/marwadiUniversity/hiringPartner/bajaj.png";
import marwadih2 from "./images/marwadiUniversity/hiringPartner/capgemini.png";
import marwadih3 from "./images/marwadiUniversity/hiringPartner/google.png";
import marwadih4 from "./images/marwadiUniversity/hiringPartner/hdfc-bank.png";
import marwadih6 from "./images/marwadiUniversity/hiringPartner/mahindra.png";
import marwadih5 from "./images/marwadiUniversity/hiringPartner/siemens.png";
// marwadi university end
// karnavati university start
import karnawati from "./images/karnawatiUniversity/karnawati.jpeg";
import bba from "./images/karnawatiUniversity/course/bba.jpg";
import ba from "./images/karnawatiUniversity/course/ba.jpg";
import phd from "./images/karnawatiUniversity/course/phd.jpg";
import karah1 from "./images/karnawatiUniversity/hiringPartner/1.png";
import karah2 from "./images/karnawatiUniversity/hiringPartner/2.png";
import karah3 from "./images/karnawatiUniversity/hiringPartner/3.png";
import karah4 from "./images/karnawatiUniversity/hiringPartner/4.png";
import karah5 from "./images/karnawatiUniversity/hiringPartner/5.png";
import karah6 from "./images/karnawatiUniversity/hiringPartner/6.png";
import karah7 from "./images/karnawatiUniversity/hiringPartner/7.png";
import karah8 from "./images/karnawatiUniversity/hiringPartner/8.png";
import karah9 from "./images/karnawatiUniversity/hiringPartner/9.png";
import karah10 from "./images/karnawatiUniversity/hiringPartner/10.png";
import karah11 from "./images/karnawatiUniversity/hiringPartner/11.png";
import karah12 from "./images/karnawatiUniversity/hiringPartner/12.png";
import ajayshah from "./images/karnawatiUniversity/placedStudent/Ajay-Shah.jpg";
import anushkashah from "./images/karnawatiUniversity/placedStudent/Anushka-Shah.jpg";
import shaishavimetha from "./images/karnawatiUniversity/placedStudent/Shaishavi-Mehta.jpg";
import srinidhi from "./images/karnawatiUniversity/placedStudent/Srinidhi.jpg";
import vanshika from "./images/karnawatiUniversity/placedStudent/Vanshika.jpg";
import vidhijain from "./images/karnawatiUniversity/placedStudent/Vidhi-Jain.jpg";
// karnavati university end
// Rai university ahemdabad start
import raiahemdabad from "./images/raiUniversityAhemdabad/raiuniversityahemdabad.jpeg";
import devanshithakkr from "./images/raiUniversityAhemdabad/placedStudent/Devanshi-Thakkar-150x150.jpg";
import hillaryshah from "./images/raiUniversityAhemdabad/placedStudent/Hillary-Shah-150x150.jpg";
import niralichristian from "./images/raiUniversityAhemdabad/placedStudent/Nirali-Christian-480x480-min-150x150.jpg";
import sarthakpatel from "./images/raiUniversityAhemdabad/placedStudent/Sarthak-Patel-150x150.jpg";
import twinkeldarji from "./images/raiUniversityAhemdabad/placedStudent/Twinkle-Darji-150x150.jpg";
import virajshah from "./images/raiUniversityAhemdabad/placedStudent/Viraj-Shah-480x480-min-150x150.jpg";
import sagarkamani from "./images/raiUniversityAhemdabad/placedStudent/imgpsh_fullsize_anim-150x150.jpg";
import raih1 from "./images/raiUniversityAhemdabad/hiringPartner/Axis-Bank.png";
import raih2 from "./images/raiUniversityAhemdabad/hiringPartner/Canon.png";
import raih3 from "./images/raiUniversityAhemdabad/hiringPartner/Cartrade.png";
import raih4 from "./images/raiUniversityAhemdabad/hiringPartner/Fuji.png";
import raih5 from "./images/raiUniversityAhemdabad/hiringPartner/HDFC-1.png";
import raih6 from "./images/raiUniversityAhemdabad/hiringPartner/Indusland.png";
import raih7 from "./images/raiUniversityAhemdabad/hiringPartner/Kataria.png";
import raih8 from "./images/raiUniversityAhemdabad/hiringPartner/Kotak.png";
import raih9 from "./images/raiUniversityAhemdabad/hiringPartner/MG.png";
import raih10 from "./images/raiUniversityAhemdabad/hiringPartner/SBI-1.png";
import raih11 from "./images/raiUniversityAhemdabad/hiringPartner/Silca.png";
import raih12 from "./images/raiUniversityAhemdabad/hiringPartner/Tata.png";
import raih13 from "./images/raiUniversityAhemdabad/hiringPartner/Tech-Mahindra.png";
import raih14 from "./images/raiUniversityAhemdabad/hiringPartner/institute-of-advance-research-gandhinagar.png";
import raih15 from "./images/raiUniversityAhemdabad/hiringPartner/nepc.png";
// Rai university ahemdabad end
// Rai university benglore start
import raibenglore from "./images/raiUniversityBenglore/raibenglore.jpg";
// Rai university benglore end
// spsu university start
import spsu from "./images/spsuUniversity/spsu.jpg";
import ronakmaniar from "./images/spsuUniversity/placedStudent/person-29.jpg";
import zahrakankroliwala from "./images/spsuUniversity/placedStudent/person-30.jpg";
import arpitmehta from "./images/spsuUniversity/placedStudent/person-31.jpg";
import apoorvupadhyay from "./images/spsuUniversity/placedStudent/person-32.jpg";
import muskanupadhyay from "./images/spsuUniversity/placedStudent/person-33.jpg";
import tapeshsaini from "./images/spsuUniversity/placedStudent/person-34.jpg";
import ankittailor from "./images/spsuUniversity/placedStudent/person-35.jpg";
// spsu university end
// haridwar university start
import haridwar from './images/haridwarUniversity/haridwar.jpg';
import anshubudha from "./images/haridwarUniversity/placedStudent/Anshu Budha.jpg";
import chandansharma from "./images/haridwarUniversity/placedStudent/Chandan Sharma.jpg";
import rachitkaushik from "./images/haridwarUniversity/placedStudent/Rachit Kaushik.jpg";
import sagargautam from "./images/haridwarUniversity/placedStudent/Sagar Gautam.jpg";
import shrutisaloni from "./images/haridwarUniversity/placedStudent/Shruti Saloni.jpg";
import shyamnarayan from "./images/haridwarUniversity/placedStudent/Shyam Narayan.jpg";
// haridwar university end
// kn modi university start
import knmodi from './images/knmodijaipur/1.jpg';
const Context = createContext();
const UniversityContext = (props) => {
  
  const [university, setUniversity] = useState([
    {
      id: "quantum-university",
      university: "Quantum University",
      image: quantumUniversity,
      courses: [
        {
          name: "BBA LLB",
          fee: "₹ 1,20,000/year",
          details: ["5 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Corporate Law",
            "Criminal Law",
            "Constitutional Law",
            "International Law",
            "Family Law",
          ],
          location: "Roorkee Dehra Dun(Uttarakhand)",
          approval: true,
          image: llb, // image source for BBA LLB
          description: "Description for BBA LLB course goes here.",
        },
        {
          name: "B.Tech",
          fee: "₹ 1,00,000/year",
          details: ["4 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Computer Science",
            "Electrical Engineering",
            "Mechanical Engineering",
            "Civil Engineering",
            "Electronics and Communication",
          ],
          location: "Roorkee Dehra Dun(Uttarakhand)",
          approval: true,
          image: btech, // image source for B.Tech
          description: "Description for B.Tech course goes here.",
        },
        {
          name: "M.Tech",
          fee: "₹ 1,20,000/year",
          details: ["2 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Computer Science",
            "Electrical Engineering",
            "Mechanical Engineering",
            "Civil Engineering",
            "Electronics and Communication",
          ],
          location: "Roorkee Dehra Dun(Uttarakhand)",
          approval: true,
          image: mtech, // image source for M.Tech
          description: "Description for M.Tech course goes here.",
        },
        {
          name: "BCA",
          fee: "₹ 80,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.8,
          scholarship: "According to merit and need-based.",
          specialisation: [
            "Computer Applications",
            "Software Development",
            "Web Development",
            "Networking",
            "Database Management",
          ],
          location: "Roorkee Dehra Dun(Uttarakhand)",
          approval: true,
          image: bca, // image source for BCA
          description: "Description for BCA course goes here.",
        },
        {
          name: "MCA",
          fee: "₹ 1,00,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship:
            "According to entrance exam results and academic performance.",
          specialisation: [
            "Software Engineering",
            "Data Science",
            "Information Security",
            "Mobile Applications",
            "Cloud Computing",
          ],
          location: "Roorkee Dehra Dun(Uttarakhand)",
          approval: true,
          image: mca, // image source for MCA
          description: "Description for MCA course goes here.",
        },
      ],
      event: [
        {
          img: uiux,
          data: "18",
          month: "March, 2023",
          hed: " Basic UI & UX Design for new development",
          pre: "Seamlessly visualize quality ellectual capital without superior collaboration and idea tically",
          time: "3:30 pm - 4:30 pm",
          country: "United Kingdome",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: digitalmarketing,
          data: "20",
          month: "March, 2023",
          hed: " Digital Education Market Briefing: Minnesota 2023",
          pre: "Seamlessly visualize quality ellectual capital without superior collaboration and idea tically",
          time: "3:30 pm - 4:30 pm",
          country: "United Kingdome",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: musicteacher,
          data: "22",
          month: "March, 2023",
          hed: " Learning Network Webinars for Music Teachers",
          pre: "Seamlessly visualize quality ellectual capital without superior collaboration and idea tically",
          time: "3:30 pm - 4:30 pm",
          country: "United Kingdome",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: education,
          data: "22",
          month: "March, 2023",
          hed: "  Next-Gen Higher Education Students Have Arrived?",
          pre: "Seamlessly visualize quality ellectual capital without superior collaboration and idea tically",
          time: "3:30 pm - 4:30 pm",
          country: "United Kingdome",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: art3d,
          data: "24",
          month: "March, 2023",
          hed: "  Digital Art & 3D Model – a future for film company",
          pre: "Seamlessly visualize quality ellectual capital without superior collaboration and idea tically",
          time: "3:30 pm - 4:30 pm",
          country: "United Kingdome",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: discipline,
          data: "26",
          month: "March, 2023",
          hed: "   Conscious Discipline Summer Institute",
          pre: "Seamlessly visualize quality ellectual capital without superior collaboration and idea tically",
          time: "3:30 pm - 4:30 pm",
          country: "United Kingdome",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
      ],
      ourPlacedStudent: [
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "I cannot forget my days at Quantum and can’t thank them enough for the wonderful friends that I have made there.",
          perImg: qankit,
          Name: "Ankit",
          work: "Publicis sapient",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Thanks to the technical skills I got at Quantum, I am today working in one of the top IT companies in India.",
          perImg: qarchit,
          Name: "Archit Madan",
          work: "Adobe",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            " Quantum has not only given me education but has also helped me to build my personality, which helped me to shape my career.",
          perImg: qbhupendra,
          Name: "Bhupender Pal ",
          work: "Oracle",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "I number of companies that visit Quantum for placements is simply amazing. All the students get ample chance to get placed.",
          perImg: qdipayan,
          Name: "Dipayan Bhowmik",
          work: "Adobe",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Being at Quantum was one of the greatest experiences of my life. I learnt a lot of new things to grow my career.   ",
          perImg: qkartikey,
          Name: "Karthikey Chauhan",
          work: "Capgemini",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "It was an Overwhelming experience. I still miss the moments I spent at Quantum. I want to study once more at Quantum. ",
          perImg: qmayank,
          Name: "Mayank Tayal",
          work: "NIIT Technologies",
        },
      ],
      applicationDeadline: "20 june",
      noScholarships: "20",
      amount: "variable",
      internationalStudents: "yes",
      scholarshipLink: "www.AAOPADHE.in",
      loanBNK:
        "Quantem HAS COLLABORATED WITH PUNJAB NATIONAL BANK TO FACILITATE ITS STUDENTS WHO ARE INTERESTED IN AVAILING EDUCATION LOAN.",
      email: "quantumncollege@offical.com",
      phone: "7791996354",
      hiringPartner: [
        qhir1,
        qhir2,
        qhir3,
        qhir4,
        qhir5,
        qhir6,
        qhir7,
        qhir8,
        qhir9,
        qhir10,
        qhir11,
        qhir12,
      ],
      studentEnroll: "125,600",
      registeredInstructor: "200",
      successRate: "100",
      address: " Jaysingha, Uttarakhand",
      successStory: [
        "https://www.youtube.com/embed/5DGP_NhSMkM?si=_JQ3p_UBNYHT2I8W",
        "https://www.youtube.com/embed/shu-kJkwKUk?si=LeZ3F-ppgBI8EP3d",
        "https://www.youtube.com/embed/Uquu6fNya9Q?si=2G5SBuASTo_FYxTm",
        "https://www.youtube.com/embed/LKaEQ1-KZ58?si=FiV_gsTmE0pKiu5C",
        "https://www.youtube.com/embed/5DGP_NhSMkM?si=_JQ3p_UBNYHT2I8W",
        "https://www.youtube.com/embed/LKaEQ1-KZ58?si=FiV_gsTmE0pKiu5C",
        "https://www.youtube.com/embed/Uquu6fNya9Q?si=2G5SBuASTo_FYxTm",
        "https://www.youtube.com/embed/5DGP_NhSMkM?si=_JQ3p_UBNYHT2I8W",
      ],
      doubtSection: [
        {
          question: "Is Quantum University good?",
          answer1:
            "It has featured among the top 10 engineering colleges in uttarakhand. Over the past few years, Quantum University has won the title of best placement college in dehradun,",
          answer2:
            "due to its latest and innovative teaching-learning methodology. Several reputed companies visit the campus every year for recruiting Q-mates.",
        },
        {
          question: "Is Quantum University degree valid?",
          answer1:
            "Yes, the degree offered by Quantum University is valid. Quantum University is recognised by the University Grants Commission, which is a statutory body of the Government of India.",
        },
        {
          question: "How old is quantum university?",
          answer1:
            "History. Quantum University Roorkee was founded in 2017 by industrialist Shri Shyam Sunder Goyal. The core programs initially offered by the college were in the disciplines of Engineering and Management. In 2018 the university started programs in Graduate Studies.",
        },
        {
          question: "Is quantum is UGC approved?",
          answer1:
            "Quantum University is a private university in Roorkee, Uttarakhand, India. It was established in 2008 and is approved by the University Grants Commission which is a statutory body of the Government of India. Quantum University has both government recognition and professional accreditation.",
        },
        {
          question: "Is Quantum University good for placement?",
          answer1:
            "Placements: Yes, arrange for placement, and more than 100 students got placed this year alone. A total of 900 students received placement offers from Quantum University in various companies and MNCs.",
        },
      ],
      blogNews: [
        {
          img: qblog1,
          data: "18",
          icon: <FaCalendarAlt />,
          month: "18th january 2024",
          hed: " Placement Drive for Students.",
          pre: "Ingenx Technology Pvt Ltd Placement Drive for Students of Quantum University",
          txt: "Read More",
          country: "United Kingdome",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: qblog2,
          data: "20",
          icon: <FaCalendarAlt />,
          month: "18th january 2024",
          hed: " Placement Drive for B.Tech & MBA Students.",
          pre: "Virohan Placement Drive for B.Tech & MBA Students Offering 5 LPA Salary Package",
          txt: "Read More",
          country: "United Kingdome",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: qblog3,
          data: "22",
          icon: <FaCalendarAlt />,
          month: "15th january 2024",
          hed: "Placements:Congratulations!!!",
          pre: "Placements:Congratulations!!! Q-Mates for your placement at Insplore Consultants Pvt Ltd with 6 LPA",
          txt: "Read More",
          country: "United Kingdome",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
      ],
    },
    {
      id: "parul-university",
      university: "Parul University",
      image: parulBanner,
      courses: [
        {
          name: "B.Tech",
          fee: "₹ 1,00,000/year",
          details: ["4 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Computer Science",
            "Electrical Engineering",
            "Mechanical Engineering",
            "Civil Engineering",
            "Electronics and Communication",
          ],
          location: "Vadodara, Gujarat",
          approval: true,
          image: btech, // image source for B.Tech
          description: "Description for B.Tech course goes here.",
        },
        {
          name: "M.Tech",
          fee: "₹ 1,20,000/year",
          details: ["2 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Computer Science",
            "Electrical Engineering",
            "Mechanical Engineering",
            "Civil Engineering",
            "Electronics and Communication",
          ],
          location: "Vadodara, Gujarat",
          approval: true,
          image: mtech, // image source for M.Tech
          description: "Description for M.Tech course goes here.",
        },
        {
          name: "BCA",
          fee: "₹ 80,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.8,
          scholarship: "According to merit and need-based.",
          specialisation: [
            "Computer Applications",
            "Software Development",
            "Web Development",
            "Networking",
            "Database Management",
          ],
          location: "Vadodara, Gujarat",
          approval: true,
          image: bca, // image source for BCA
          description: "Description for BCA course goes here.",
        },
        {
          name: "MCA",
          fee: "₹ 1,00,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship:
            "According to entrance exam results and academic performance.",
          specialisation: [
            "Software Engineering",
            "Data Science",
            "Information Security",
            "Mobile Applications",
            "Cloud Computing",
          ],
          location: "Vadodara, Gujarat",
          approval: true,
          image: mca, // image source for MCA
          description: "Description for MCA course goes here.",
        },
        {
          name: "M.Com",
          fee: "₹ 55,000/year",
          details: ["2 Year", "On-campus", "Full Time"],
          rating: 4.8,
          scholarship: "Merit-based scholarships available.",
          specialisation: [
            "Advanced Accounting",
            "Business Statistics",
            "Financial Management",
            "Business Law",
            "Economics",
          ],
          location: "Vadodara, Gujarat",
          approval: true,
          image: mcom, // image source for M.Com
          description: "Description for M.Com course goes here.",
        },
        {
          name: "B.Com",
          fee: "₹ 50,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.7,
          scholarship: "Merit-based scholarships available.",
          specialisation: [
            "Accounting",
            "Finance",
            "Taxation",
            "Auditing",
            "Economics",
          ],
          location: "Vadodara, Gujarat",
          approval: true,
          image: bcom, // image source for B.Com
          description: "Description for B.Com course goes here.",
        },
      ],
      event: [
        {
          img: analyis,
          data: "12",
          month: "April, 2023",
          hed: "Advanced Data Analysis Workshop",
          pre: "Unlock insights from your data using advanced analytical techniques",
          time: "9:00 am - 5:00 pm",
          country: "United States",
          alt: "Data Analysis Image",
          arrow: <FaArrowRight />,
        },
        {
          img: digitalmarketing,
          data: "25",
          month: "May, 2023",
          hed: "Digital Marketing Strategies Conference",
          pre: "Discover the latest trends and strategies in digital marketing",
          time: "10:00 am - 6:00 pm",
          country: "Canada",
          alt: "Digital Marketing Image",
          arrow: <FaArrowRight />,
        },
        {
          img: education,
          data: "8",
          month: "June, 2023",
          hed: "Blockchain Technology Summit",
          pre: "Explore the applications and potential of blockchain technology",
          time: "1:00 pm - 7:00 pm",
          country: "Germany",
          alt: "Blockchain Image",
          arrow: <FaArrowRight />,
        },
        {
          img: uiux,
          data: "20",
          month: "July, 2023",
          hed: "Artificial Intelligence Workshop",
          pre: "Learn about the fundamentals and applications of AI",
          time: "2:00 pm - 5:00 pm",
          country: "Australia",
          alt: "AI Workshop Image",
          arrow: <FaArrowRight />,
        },
        {
          img: entrepreneur,
          data: "14",
          month: "August, 2023",
          hed: "Entrepreneurship Bootcamp",
          pre: "Gain valuable insights and skills to start your own business",
          time: "9:30 am - 4:30 pm",
          country: "India",
          alt: "Entrepreneurship Image",
          arrow: <FaArrowRight />,
        },
        {
          img: webdev,
          data: "3",
          month: "September, 2023",
          hed: "Web Development Crash Course",
          pre: "Master the essentials of web development in just one day",
          time: "10:00 am - 3:00 pm",
          country: "France",
          alt: "Web Development Image",
          arrow: <FaArrowRight />,
        },
      ],
      ourPlacedStudent: [
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Parul University provided me with excellent technical education and ample career opportunities, leading to my successful placement in a reputable company.",
          perImg: gunjanpandya,
          Name: "Gunjan Pandya",
          post: "Data Engineer",
          work: "Facebook",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Parul University equipped me with top-notch skills and connections, securing a prestigious placement for me.",
          perImg: dhairyakikani,
          Name: "Dhairya Kikani",
          post: "Former Sr. Supply Chain Manager",
          work: "Google",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Parul University's supportive environment and strong industry ties paved the way for my successful placement.",
          perImg: jaivaidya,
          Name: "Jai Vaidya",
          work: "Amazon",
          post: "Sr. Cloud Technical Manager",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "At Parul University, I received quality education and valuable guidance that led to my placement in a prominent company.",
          perImg: hemalikhatri,
          Name: "Hemali Khatri",
          work: "IBM",
          post: "Former Package Solution Enablement Specialist",
        },
      ],
      applicationDeadline: "13 july",
      noScholarships: "11",
      amount: "variable",
      internationalStudents: "yes",
      scholarshipLink: "www.AAOPADHE.in",
      loanBNK:
        "Parul HAS COLLABORATED WITH STATE BANK OF INDIA TO FACILITATE ITS STUDENTS WHO ARE INTERESTED IN AVAILING EDUCATION LOAN.",
      email: "parul@offical.com",
      phone: "+917791996354",
      address: "Vadodara, Gujarat",
      hiringPartner: [
        parulh1,
        parulh2,
        parulh3,
        parulh4,
        parulh5,
        parulh6,
        parulh7,
        parulh8,
        parulh9,
        parulh4,
        parulh6,
        parulh8,
        parulh5,
        parulh3,
      ],
      studentEnroll: "125,300",
      registeredInstructor: "300",
      successRate: "100",
      successStory: [
        "https://www.youtube.com/embed/Aaye9rvqWxE?si=lBgCfc4j1D9qkA5G",
        "https://www.youtube.com/embed/o2aTxTxVFhk?si=MTFKkrwLrx34L4xZ",
        "https://www.youtube.com/embed/ZCmRYuj3Ln8?si=zzZAJMEPK3fDv4FH",
        "https://www.youtube.com/embed/e7pJ3FQ8w9k?si=xpEZsQR6KX5xkATE",
        "https://www.youtube.com/embed/Aaye9rvqWxE?si=lBgCfc4j1D9qkA5G",
        "https://www.youtube.com/embed/o2aTxTxVFhk?si=MTFKkrwLrx34L4xZ",
        "https://www.youtube.com/embed/ZCmRYuj3Ln8?si=zzZAJMEPK3fDv4FH",
        "https://www.youtube.com/embed/e7pJ3FQ8w9k?si=xpEZsQR6KX5xkATE",
      ],
      doubtSection: [
        {
          question: "Is Parul University good?",
          answer1:
            "It has featured among the top 10 engineering colleges in Uttarakhand. Over the past few years, Parul University has won the title of best placement college in Dehradun, due to its latest and innovative teaching-learning methodology. Several reputed companies visit the campus every year for recruiting Q-mates.",
          answer2: null,
        },
        {
          question: "Is Parul University degree valid?",
          answer1:
            "Yes, the degree offered by Parul University is valid. Parul University is recognized by the University Grants Commission, which is a statutory body of the Government of India.",
          answer2: null,
        },
        {
          question: "How old is Parul University?",
          answer1:
            "History. Parul University Roorkee was founded in 2017 by industrialist Shri Shyam Sunder Goyal. The core programs initially offered by the college were in the disciplines of Engineering and Management. In 2018, the university started programs in Graduate Studies.",
          answer2: null,
        },
        {
          question: "Is Parul University UGC approved?",
          answer1:
            "Parul University is a private university in Roorkee, Uttarakhand, India. It was established in 2008 and is approved by the University Grants Commission, which is a statutory body of the Government of India. Parul University has both government recognition and professional accreditation.",
          answer2: null,
        },
        {
          question: "Is Parul University good for placement?",
          answer1:
            "Placements: Yes, Parul University arranges for placement, and more than 100 students got placed this year alone. A total of 900 students received placement offers from Parul University in various companies and MNCs.",
          answer2: null,
        },
      ],
      blogNews: [
        {
          img: webdev,
          data: "25",
          icon: <FaCalendarAlt />,
          month: "25th February 2024",
          hed: "Job Fair Event.",
          pre: "TechPro Solutions Pvt Ltd Job Fair Event for Students of Parul University",
          txt: "Read More",
          country: "United States",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: analyis,
          data: "12",
          icon: <FaCalendarAlt />,
          month: "12th March 2024",
          hed: "Recruitment Event.",
          pre: "Globex Corporation Recruitment Event for Students of Parul University",
          txt: "Read More",
          country: "Australia",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: entrepreneur,
          data: "7",
          icon: <FaCalendarAlt />,
          month: "7th April 2024",
          hed: "Internship Drive for Students.",
          pre: "Infinity Solutions Internship Drive for Students of Parul University",
          txt: "Read More",
          country: "Canada",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
      ],
    },
    {
      id: "pacific-university",
      university: "Pacific University",
      image: pacific,
      courses: [
        {
          name: "LLM",
          fee: "₹ 1,40,000/year",
          details: ["2 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Corporate Law",
            "Criminal Law",
            "Constitutional Law",
            "International Law",
            "Family Law",
          ],
          location: "Udaipur, Rajasthan",
          approval: true,
          image: llm, // image source for LLM
          description: "Description for LLM course goes here.",
        },
        {
          name: "M.Sc. Nursing",
          fee: "₹ 1,00,000/year",
          details: ["2 Year", "On-campus", "Full Time"],
          rating: 4.8,
          scholarship: "Merit-based scholarships available.",
          specialisation: [
            "Medical-Surgical Nursing",
            "Community Health Nursing",
            "Pediatric Nursing",
            "Psychiatric Nursing",
            "Obstetric Nursing",
          ],
          location: "Udaipur, Rajasthan",
          approval: true,
          image: mscnursing, // image source for M.Sc. Nursing
          description: "Description for M.Sc. Nursing course goes here.",
        },
        {
          name: "B.Sc. Nursing",
          fee: "₹ 80,000/year",
          details: ["4 Year", "On-campus", "Full Time"],
          rating: 4.8,
          scholarship: "Merit-based scholarships available.",
          specialisation: [
            "Medical-Surgical Nursing",
            "Community Health Nursing",
            "Pediatric Nursing",
            "Psychiatric Nursing",
            "Obstetric Nursing",
          ],
          location: "Udaipur, Rajasthan",
          approval: true,
          image: bscnursing, // image source for B.Sc. Nursing
          description: "Description for B.Sc. Nursing course goes here.",
        },
        {
          name: "BBA LLB",
          fee: "₹ 1,20,000/year",
          details: ["5 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Corporate Law",
            "Criminal Law",
            "Constitutional Law",
            "International Law",
            "Family Law",
          ],
          location: "Udaipur, Rajasthan",
          approval: true,
          image: llb, // image source for BBA LLB
          description: "Description for BBA LLB course goes here.",
        },
        {
          name: "B.Tech",
          fee: "₹ 1,00,000/year",
          details: ["4 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Computer Science",
            "Electrical Engineering",
            "Mechanical Engineering",
            "Civil Engineering",
            "Electronics and Communication",
          ],
          location: "Udaipur, Rajasthan",
          approval: true,
          image: btech, // image source for B.Tech
          description: "Description for B.Tech course goes here.",
        },
        {
          name: "M.Tech",
          fee: "₹ 1,20,000/year",
          details: ["2 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Computer Science",
            "Electrical Engineering",
            "Mechanical Engineering",
            "Civil Engineering",
            "Electronics and Communication",
          ],
          location: "Udaipur, Rajasthan",
          approval: true,
          image: mtech, // image source for M.Tech
          description: "Description for M.Tech course goes here.",
        },
        {
          name: "BCA",
          fee: "₹ 80,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.8,
          scholarship: "According to merit and need-based.",
          specialisation: [
            "Computer Applications",
            "Software Development",
            "Web Development",
            "Networking",
            "Database Management",
          ],
          location: "Udaipur, Rajasthan",
          approval: true,
          image: bca, // image source for BCA
          description: "Description for BCA course goes here.",
        },
        {
          name: "MCA",
          fee: "₹ 1,00,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship:
            "According to entrance exam results and academic performance.",
          specialisation: [
            "Software Engineering",
            "Data Science",
            "Information Security",
            "Mobile Applications",
            "Cloud Computing",
          ],
          location: "Udaipur, Rajasthan",
          approval: true,
          image: mca, // image source for MCA
          description: "Description for MCA course goes here.",
        },
      ],
      event: [
        {
          img: uiux,
          data: "22",
          month: "October, 2023",
          hed: "Cybersecurity Conference",
          pre: "Stay updated on the latest trends and threats in cybersecurity",
          time: "11:00 am - 6:00 pm",
          country: "United Kingdom",
          alt: "Cybersecurity Image",
          arrow: <FaArrowRight />,
        },
        {
          img: webdev,
          data: "5",
          month: "November, 2023",
          hed: "Mobile App Development Workshop",
          pre: "Learn to develop mobile apps for iOS and Android platforms",
          time: "1:30 pm - 5:30 pm",
          country: "United States",
          alt: "Mobile App Development Image",
          arrow: <FaArrowRight />,
        },
        {
          img: digitalmarketing,
          data: "18",
          month: "December, 2023",
          hed: "Data Science Symposium",
          pre: "Explore the latest advancements and applications in data science",
          time: "9:00 am - 7:00 pm",
          country: "Canada",
          alt: "Data Science Image",
          arrow: <FaArrowRight />,
        },
        {
          img: entrepreneur,
          data: "7",
          month: "January, 2024",
          hed: "Product Management Workshop",
          pre: "Gain insights into product management strategies and best practices",
          time: "10:00 am - 4:00 pm",
          country: "Australia",
          alt: "Product Management Image",
          arrow: <FaArrowRight />,
        },
        {
          img: analyis,
          data: "14",
          month: "February, 2024",
          hed: "Cloud Computing Summit",
          pre: "Explore the latest trends and innovations in cloud computing",
          time: "8:00 am - 6:00 pm",
          country: "Germany",
          alt: "Cloud Computing Image",
          arrow: <FaArrowRight />,
        },
        {
          img: uiux,
          data: "9",
          month: "March, 2024",
          hed: "UX/UI Design Conference",
          pre: "Discover the principles and best practices of user experience and user interface design",
          time: "10:00 am - 4:00 pm",
          country: "France",
          alt: "UX/UI Design Image",
          arrow: <FaArrowRight />,
        },
      ],
      ourPlacedStudent: [
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Pacific University provided me with excellent technical education and ample career opportunities, leading to my successful placement in a reputable company.",
          perImg: parmatmasingh,
          Name: "Parmatma Singh",
          post: "Data Engineer",
          work: "New Zealand",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Pacific University equipped me with top-notch skills and connections, securing a prestigious placement for me.",
          perImg: vinaysinghbandral,
          Name: "Vinay Singh Bandral",
          post: "Former Sr. Supply Chain Manager",
          work: "New Zealand",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Pacific University's supportive environment and strong industry ties paved the way for my successful placement.",
          perImg: vikrantbaloria,
          Name: "Vikrant Baloria",
          work: "New Zealand",
          post: "Sr. Cloud Technical Manager",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "At Pacific University, I received quality education and valuable guidance that led to my placement in a prominent company.",
          perImg: swapnilsingh,
          Name: "Swapnil Singh",
          work: "New Zealand",
          post: "Former Package Solution Enablement Specialist",
        },
      ],
      applicationDeadline: "1 july",
      noScholarships: "25",
      amount: "variable",
      internationalStudents: "yes",
      scholarshipLink: "www.bhawani.in",
      loanBNK:
        "Pacific University HAS COLLABORATED WITH AXIS BANK TO FACILITATE ITS STUDENTS WHO ARE INTERESTED IN AVAILING EDUCATION LOANS.",
      email: "pacific@offical.com",
      phone: "+917791996354",
      hiringPartner: [
        pacifich1,
        pacifich2,
        pacifich3,
        pacifich4,
        pacifich5,
        pacifich6,
        pacifich7,
        pacifich8,
        pacifich9,
        pacifich10,
        pacifich2,
        pacifich4,
        pacifich4,
        pacifich8,
        pacifich10,
      ],
      studentEnroll: "125,300",
      registeredInstructor: "300",
      successRate: "100",
      address: "Udaipur, Rajasthan",
      successStory: [
        "https://www.youtube.com/embed/YSZw30XpNPw?si=B2qrtRTSFD_jpCWk",
        "https://www.youtube.com/embed/wljUZlQ-O64?si=AFSpSVd8C4HLNSU6",
        "https://www.youtube.com/embed/M3lGdVie-p8?si=M7i-kdjWhElrOPN8",
        "https://www.youtube.com/embed/E9vTz1blw3E?si=_GbmK3r7WDg1HahB",
        "https://www.youtube.com/embed/YSZw30XpNPw?si=B2qrtRTSFD_jpCWk",
        "https://www.youtube.com/embed/wljUZlQ-O64?si=AFSpSVd8C4HLNSU6",
        "https://www.youtube.com/embed/M3lGdVie-p8?si=M7i-kdjWhElrOPN8",
        "https://www.youtube.com/embed/E9vTz1blw3E?si=_GbmK3r7WDg1HahB",
      ],
      doubtSection: [
        {
          question: "Is Pacific University good?",
          answer1:
            "It has featured among the top 10 engineering colleges in Rajasthan. Over the past few years, Pacific University has won the title of best placement college in Dehradun, due to its latest and innovative teaching-learning methodology. Several reputed companies visit the campus every year for recruiting Q-mates.",
          answer2: null,
        },
        {
          question: "Is Pacific University degree valid?",
          answer1:
            "Yes, the degree offered by Pacific University is valid. Pacific University is recognized by the University Grants Commission, which is a statutory body of the Government of India.",
          answer2: null,
        },
        {
          question: "How old is Pacific University?",
          answer1:
            "History. Pacific University Udaipur  was founded in 2017 by industrialist Shri Shyam Sunder Goyal. The core programs initially offered by the college were in the disciplines of Engineering and Management. In 2018, the university started programs in Graduate Studies.",
          answer2: null,
        },
        {
          question: "Is Pacific University UGC approved?",
          answer1:
            "Pacific University is a private university in Udaipur. It was established in 2008 and is approved by the University Grants Commission, which is a statutory body of the Government of India. Pacific University has both government recognition and professional accreditation.",
          answer2: null,
        },
        {
          question: "Is Pacific University good for placement?",
          answer1:
            "Placements: Yes, Pacific University arranges for placement, and more than 100 students got placed this year alone. A total of 900 students received placement offers from Pacific University in various companies and MNCs.",
          answer2: null,
        },
      ],
      blogNews: [
        {
          img: webdev,
          data: "14",
          icon: <FaCalendarAlt />,
          month: "14th May 2024",
          hed: "Career Expo.",
          pre: "TechWise Career Expo for Students of Pacific University",
          txt: "Read More",
          country: "Germany",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: education,
          data: "22",
          icon: <FaCalendarAlt />,
          month: "22nd June 2024",
          hed: "Interview Workshop.",
          pre: "FutureEdge Interview Workshop for Students of Pacific University",
          txt: "Read More",
          country: "France",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: discipline,
          data: "19",
          icon: <FaCalendarAlt />,
          month: "19th July 2024",
          hed: "Job Symposium.",
          pre: "CareerCraft Job Symposium for Students of Pacific University",
          txt: "Read More",
          country: "Spain",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
      ],
    },
    {
      id: "marwadi-university",
      university: "Marwadi University",
      image: marwadi,
      courses: [
        {
          name: "LLM",
          fee: "₹ 1,40,000/year",
          details: ["2 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Corporate Law",
            "Criminal Law",
            "Constitutional Law",
            "International Law",
            "Family Law",
          ],
          location: "Rajkot, Gujarat",
          approval: true,
          image: llm, // image source for LLM
          description: "Description for LLM course goes here.",
        },
        {
          name: "M.Sc. Nursing",
          fee: "₹ 1,00,000/year",
          details: ["2 Year", "On-campus", "Full Time"],
          rating: 4.8,
          scholarship: "Merit-based scholarships available.",
          specialisation: [
            "Medical-Surgical Nursing",
            "Community Health Nursing",
            "Pediatric Nursing",
            "Psychiatric Nursing",
            "Obstetric Nursing",
          ],
          location: "Rajkot, Gujarat",
          approval: true,
          image: mscnursing, // image source for M.Sc. Nursing
          description: "Description for M.Sc. Nursing course goes here.",
        },
        {
          name: "B.Sc. Nursing",
          fee: "₹ 80,000/year",
          details: ["4 Year", "On-campus", "Full Time"],
          rating: 4.8,
          scholarship: "Merit-based scholarships available.",
          specialisation: [
            "Medical-Surgical Nursing",
            "Community Health Nursing",
            "Pediatric Nursing",
            "Psychiatric Nursing",
            "Obstetric Nursing",
          ],
          location: "Rajkot, Gujarat",
          approval: true,
          image: bscnursing, // image source for B.Sc. Nursing
          description: "Description for B.Sc. Nursing course goes here.",
        },
        {
          name: "BBA LLB",
          fee: "₹ 1,20,000/year",
          details: ["5 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Corporate Law",
            "Criminal Law",
            "Constitutional Law",
            "International Law",
            "Family Law",
          ],
          location: "Rajkot, Gujarat",
          approval: true,
          image: llb, // image source for BBA LLB
          description: "Description for BBA LLB course goes here.",
        },
        {
          name: "B.Tech",
          fee: "₹ 1,00,000/year",
          details: ["4 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Computer Science",
            "Electrical Engineering",
            "Mechanical Engineering",
            "Civil Engineering",
            "Electronics and Communication",
          ],
          location: "Rajkot, Gujarat",
          approval: true,
          image: btech, // image source for B.Tech
          description: "Description for B.Tech course goes here.",
        },
        {
          name: "M.Tech",
          fee: "₹ 1,20,000/year",
          details: ["2 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Computer Science",
            "Electrical Engineering",
            "Mechanical Engineering",
            "Civil Engineering",
            "Electronics and Communication",
          ],
          location: "Rajkot, Gujarat",
          approval: true,
          image: mtech, // image source for M.Tech
          description: "Description for M.Tech course goes here.",
        },
        {
          name: "BCA",
          fee: "₹ 80,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.8,
          scholarship: "According to merit and need-based.",
          specialisation: [
            "Computer Applications",
            "Software Development",
            "Web Development",
            "Networking",
            "Database Management",
          ],
          location: "Rajkot, Gujarat",
          approval: true,
          image: bca, // image source for BCA
          description: "Description for BCA course goes here.",
        },
        {
          name: "MCA",
          fee: "₹ 1,00,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship:
            "According to entrance exam results and academic performance.",
          specialisation: [
            "Software Engineering",
            "Data Science",
            "Information Security",
            "Mobile Applications",
            "Cloud Computing",
          ],
          location: "Rajkot, Gujarat",
          approval: true,
          image: mca, // image source for MCA
          description: "Description for MCA course goes here.",
        },
      ],
      event: [
        {
          img: entrepreneur,
          data: "12",
          month: "April, 2024",
          hed: "Virtual Reality Workshop",
          pre: "Dive into the world of virtual reality and learn to create immersive experiences",
          time: "9:00 am - 4:00 pm",
          country: "United States",
          alt: "Virtual Reality Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie1,
          data: "25",
          month: "May, 2024",
          hed: "E-commerce Summit",
          pre: "Explore the latest trends and strategies in e-commerce",
          time: "10:00 am - 6:00 pm",
          country: "Canada",
          alt: "E-commerce Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie2,
          data: "8",
          month: "June, 2024",
          hed: "Machine Learning Bootcamp",
          pre: "Master machine learning algorithms and techniques in this intensive bootcamp",
          time: "1:00 pm - 7:00 pm",
          country: "Germany",
          alt: "Machine Learning Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie3,
          data: "20",
          month: "July, 2024",
          hed: "Graphic Design Workshop",
          pre: "Learn the principles of graphic design and unleash your creativity",
          time: "2:00 pm - 5:00 pm",
          country: "Australia",
          alt: "Graphic Design Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie4,
          data: "14",
          month: "August, 2024",
          hed: "Leadership Seminar",
          pre: "Enhance your leadership skills and inspire your team to greatness",
          time: "9:30 am - 4:30 pm",
          country: "India",
          alt: "Leadership Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie5,
          data: "3",
          month: "September, 2024",
          hed: "IoT Conference",
          pre: "Discover the latest innovations and applications in the Internet of Things",
          time: "10:00 am - 3:00 pm",
          country: "France",
          alt: "IoT Image",
          arrow: <FaArrowRight />,
        },
      ],
      ourPlacedStudent: [
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "I cannot forget my days at Quantum and can’t thank them enough for the wonderful friends that I have made there.",
          perImg: divij,
          Name: "DIVIJ JOBANPUTRA",
          work: "Wipro",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Thanks to the technical skills I got at Marwadi, I am today working in one of the top IT companies in India.",
          perImg: ghanshyampala,
          Name: "GHANSHYAM PALA",
          work: "TSS Cosultancy",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            " Marwadi has not only given me education but has also helped me to build my personality, which helped me to shape my career.",
          perImg: payalvijay,
          Name: "Payal Vijay Bharakhda ",
          work: "Spec India",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "I number of companies that visit Marwadi for placements is simply amazing. All the students get ample chance to get placed.",
          perImg: pritiben,
          Name: "PRITIBEN USADADIYA",
          work: "TSS Consultancy",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Being at Quantum was one of the greatest experiences of my life. I learnt a lot of new things to grow my career.   ",
          perImg: pritibenusadadiyayash,
          Name: "PRITIBEN USADADIYAYASH",
          work: "ADSOM Globaltech Pvt. Ltd.",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "It was an Overwhelming experience. I still miss the moments I spent at Quantum. I want to study once more at Quantum. ",
          perImg: shubhamjoshi,
          Name: "SHUBHAM JOSHI",
          work: "Uno Minda",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Nice Experience, awesome learning and well maintained discipline.",
          perImg: yashdoshi,
          Name: "YASH DOSHI",
          work: "TSS Consultancy",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Nice Experience, awesome learning and well maintained discipline.",
          perImg: yashketansampat,
          Name: "YASH KETAN SAMPAT",
          work: "Epam",
        },
      ],
      applicationDeadline: "1 july",
      noScholarships: "22",
      amount: "variable",
      internationalStudents: "yes",
      scholarshipLink: "www.bhawani.in",
      address: "Rajkot, Gujarat",
      loanBNK:
        "Marwadi University HAS PARTNERED WITH HDFC BANK TO FACILITATE ITS STUDENTS WHO ARE INTERESTED IN AVAILING EDUCATION LOANS.",
      email: "marwadi@offical.com",
      phone: "+917791996354",
      hiringPartner: [
        marwadih1,
        marwadih2,
        marwadih3,
        marwadih4,
        marwadih5,
        marwadih6,
        marwadih1,
        marwadih2,
        marwadih3,
        marwadih4,
        marwadih5,
        marwadih6,
        marwadih1,
        marwadih2,
        marwadih3,
        marwadih4,
        marwadih5,
        marwadih6,
      ],
      studentEnroll: "125,300",
      registeredInstructor: "300",
      successRate: "100",
      successStory: [
        "https://www.youtube.com/embed/XoBusr8KXAc?si=SGHVIpIPSkWbKqKD",
        "https://www.youtube.com/embed/CiYlv3yzhRY?si=x6g8BGEhwlQCsO3s",
        "https://www.youtube.com/embed/KbjTcFrXkL0?si=-zNfLC8Mu4dYFJ2A",
        "https://www.youtube.com/embed/-OIboc0_0hw?si=tQ1sqR7hyZbeAWTD",
        "https://www.youtube.com/embed/XoBusr8KXAc?si=SGHVIpIPSkWbKqKD",
        "https://www.youtube.com/embed/CiYlv3yzhRY?si=x6g8BGEhwlQCsO3s",
        "https://www.youtube.com/embed/KbjTcFrXkL0?si=-zNfLC8Mu4dYFJ2A",
        "https://www.youtube.com/embed/-OIboc0_0hw?si=tQ1sqR7hyZbeAWTD",
      ],
      doubtSection: [
        {
          question: "Is Marwadi University good?",
          answer1:
            "It has featured among the top 10 engineering colleges in Karnataka. Over the past few years, Marwadi University has won the title of best placement college in Bangalore, due to its latest and innovative teaching-learning methodology. Several reputed companies visit the campus every year for recruiting Marwadi University students.",
          answer2: null,
        },
        {
          question: "Is Marwadi University degree valid?",
          answer1:
            "Yes, the degree offered by Marwadi University is valid. Marwadi University is recognized by the University Grants Commission, which is a statutory body of the Government of India.",
          answer2: null,
        },
        {
          question: "How old is Marwadi University?",
          answer1:
            "History. Marwadi University was founded in 1990 by Dr. Chenraj Roychand. The core programs initially offered by the university were in the disciplines of Engineering and Management. Over the years, Marwadi University has expanded its offerings to include a wide range of undergraduate and postgraduate programs.",
          answer2: null,
        },
        {
          question: "Is Marwadi University UGC approved?",
          answer1:
            "Marwadi University is a deemed-to-be university located in Bangalore, Karnataka, India. It was declared a deemed-to-be university under section 3 of the UGC Act, 1956, in 2009. Marwadi University has both government recognition and professional accreditation.",
          answer2: null,
        },
        {
          question: "Is Marwadi University good for placement?",
          answer1:
            "Placements: Yes, Marwadi University arranges for placement, and more than 100 students got placed this year alone. A total of 900 students received placement offers from Marwadi University in various companies and MNCs.",
          answer2: null,
        },
      ],
      blogNews: [
        {
          img: marwadie6,
          data: "9",
          icon: <FaCalendarAlt />,
          month: "9th August 2024",
          hed: "Career Development Seminar.",
          pre: "CareerConnect Career Development Seminar for Students of Marwadi University",
          txt: "Read More",
          country: "Italy",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie1,
          data: "28",
          icon: <FaCalendarAlt />,
          month: "28th September 2024",
          hed: "Employer Networking Event.",
          pre: "JobLink Employer Networking Event for Students of Marwadi University",
          txt: "Read More",
          country: "Switzerland",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie2,
          data: "17",
          icon: <FaCalendarAlt />,
          month: "17th October 2024",
          hed: "Career Fair.",
          pre: "CareerPlus Career Fair for Students of Marwadi University",
          txt: "Read More",
          country: "Netherlands",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
      ],
    },
    {
      id: "karnavati-university",
      university: "Karnavati University",
      image: karnawati,
      courses: [
        {
          name: "BBA",
          fee: "₹ 1,40,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Marketing",
            "Finance",
            "Human Resource Management",
            "Operations Management",
            "Entrepreneurship",
          ],
          location: "Gandhinagar, Gujarat",
          approval: true,
          image: bba, // image source for BBA
          description: "Description for BBA course goes here.",
        },
        {
          name: "Ph.D.",
          fee: "Varies depending on the institution",
          details: ["3-6 Years", "On-campus/Online", "Full Time/Part Time"],
          rating: 4.9,
          scholarship: "Available based on merit and research grants.",
          specialisation: [
            "Business Administration",
            "Economics",
            "Management",
            "Finance",
            "Marketing",
          ],
          location: "Gandhinagar, Gujarat",
          approval: true,
          image: phd, // image source for Ph.D.
          description: "Description for Ph.D. program goes here.",
        },
        {
          name: "LLM",
          fee: "₹ 1,40,000/year",
          details: ["2 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Corporate Law",
            "Criminal Law",
            "Constitutional Law",
            "International Law",
            "Family Law",
          ],
          location: "Gandhinagar, Gujarat",
          approval: true,
          image: llm, // image source for LLM
          description: "Description for LLM course goes here.",
        },
        {
          name: "BA",
          fee: "Varies depending on the institution",
          details: ["3 Years", "On-campus/Online", "Full Time/Part Time"],
          rating: 4.9,
          scholarship: "Available based on merit and financial need.",
          specialisation: [
            "English Literature",
            "History",
            "Psychology",
            "Sociology",
            "Political Science",
          ],
          location: "Gandhinagar, Gujarat",
          approval: true,
          image: ba, // image source for BA
          description: "Description for BA program goes here.",
        },
        {
          name: "LLB",
          fee: "₹ 1,20,000/year",
          details: ["5 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Corporate Law",
            "Criminal Law",
            "Constitutional Law",
            "International Law",
            "Family Law",
          ],
          location: "Gandhinagar, Gujarat",
          approval: true,
          image: llb, // image source for BBA LLB
          description: "Description for BBA LLB course goes here.",
        },
        {
          name: "B.Tech",
          fee: "₹ 1,00,000/year",
          details: ["4 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Computer Science",
            "Electrical Engineering",
            "Mechanical Engineering",
            "Civil Engineering",
            "Electronics and Communication",
          ],
          location: "Gandhinagar, Gujarat",
          approval: true,
          image: btech, // image source for B.Tech
          description: "Description for B.Tech course goes here.",
        },
        {
          name: "M.Tech",
          fee: "₹ 1,20,000/year",
          details: ["2 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Computer Science",
            "Electrical Engineering",
            "Mechanical Engineering",
            "Civil Engineering",
            "Electronics and Communication",
          ],
          location: "Gandhinagar, Gujarat",
          approval: true,
          image: mtech, // image source for M.Tech
          description: "Description for M.Tech course goes here.",
        },
        {
          name: "BCA",
          fee: "₹ 80,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.8,
          scholarship: "According to merit and need-based.",
          specialisation: [
            "Computer Applications",
            "Software Development",
            "Web Development",
            "Networking",
            "Database Management",
          ],
          location: "Gandhinagar, Gujarat",
          approval: true,
          image: bca, // image source for BCA
          description: "Description for BCA course goes here.",
        },
        {
          name: "MCA",
          fee: "₹ 1,00,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship:
            "According to entrance exam results and academic performance.",
          specialisation: [
            "Software Engineering",
            "Data Science",
            "Information Security",
            "Mobile Applications",
            "Cloud Computing",
          ],
          location: "Gandhinagar, Gujarat",
          approval: true,
          image: mca, // image source for MCA
          description: "Description for MCA course goes here.",
        },
      ],
      event: [
        {
          img: marwadie1,
          data: "22",
          month: "October, 2024",
          hed: "Augmented Reality Symposium",
          pre: "Explore the latest advancements and applications in augmented reality technology",
          time: "11:00 am - 6:00 pm",
          country: "United Kingdom",
          alt: "Augmented Reality Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie6,
          data: "5",
          month: "November, 2024",
          hed: "UX Research Workshop",
          pre: "Learn effective methods for conducting user experience research",
          time: "1:30 pm - 5:30 pm",
          country: "United States",
          alt: "UX Research Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie5,
          data: "18",
          month: "December, 2024",
          hed: "Game Development Bootcamp",
          pre: "Develop your own video game from concept to completion in this intensive bootcamp",
          time: "9:00 am - 7:00 pm",
          country: "Canada",
          alt: "Game Development Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie3,
          data: "7",
          month: "January, 2025",
          hed: "Cloud Security Conference",
          pre: "Explore best practices and strategies for securing cloud-based systems",
          time: "10:00 am - 4:00 pm",
          country: "Australia",
          alt: "Cloud Security Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie4,
          data: "14",
          month: "February, 2025",
          hed: "Social Media Marketing Workshop",
          pre: "Learn effective strategies for marketing your business on social media platforms",
          time: "8:00 am - 6:00 pm",
          country: "Germany",
          alt: "Social Media Marketing Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie2,
          data: "9",
          month: "March, 2025",
          hed: "Ethical Hacking Seminar",
          pre: "Learn ethical hacking techniques and how to secure systems against cyber threats",
          time: "10:00 am - 4:00 pm",
          country: "France",
          alt: "Ethical Hacking Image",
          arrow: <FaArrowRight />,
        },
      ],
      ourPlacedStudent: [
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "I cannot forget my days at Quantum and can’t thank them enough for the wonderful friends that I have made there.",
          perImg: ajayshah,
          Name: "Ajay Shah",
          work: "Alumni",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Thanks to the technical skills I got at Quantum, I am today working in one of the top IT companies in India.",
          perImg: anushkashah,
          Name: "Anushka Shah",
          work: "Adobe",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            " Quantum has not only given me education but has also helped me to build my personality, which helped me to shape my career.",
          perImg: shaishavimetha,
          Name: "Shaishavi Metha",
          work: "Oracle",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "I number of companies that visit Quantum for placements is simply amazing. All the students get ample chance to get placed.",
          perImg: srinidhi,
          Name: "Srinidhi",
          work: "Adobe",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Being at Quantum was one of the greatest experiences of my life. I learnt a lot of new things to grow my career.   ",
          perImg: vanshika,
          Name: "Vanshika",
          work: "Capgemini",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "It was an Overwhelming experience. I still miss the moments I spent at Quantum. I want to study once more at Quantum. ",
          perImg: vidhijain,
          Name: "Vidhi Jain",
          work: "NIIT Technologies",
        },
      ],
      applicationDeadline: "1 july",
      noScholarships: "22",
      amount: "variable",
      internationalStudents: "yes",
      scholarshipLink: "www.AAOPADHE.in",
      address: "Gandhinagar, Gujarat",
      loanBNK:
        "Karnavati HAS TEAMED UP WITH ICICI BANK TO FACILITATE ITS STUDENTS WHO ARE INTERESTED IN AVAILING EDUCATION LOANS.",
      email: "karnawati@offical.com",
      phone: "7791996354",
      hiringPartner: [
        karah1,
        karah2,
        karah3,
        karah4,
        karah5,
        karah6,
        karah7,
        karah8,
        karah9,
        karah10,
        karah11,
        karah12,
        karah4,
        karah7,
      ],
      studentEnroll: "125,300",
      registeredInstructor: "300",
      successRate: "100",
      successStory: [
        "https://www.youtube.com/embed/RpcrPeDqJD4?si=kyM0mIqeaN1dvuEV",
        "https://www.youtube.com/embed/Kl8Bb-BEZ8U?si=0VMT8_2oCdsiKGB-",
        "https://www.youtube.com/embed/qcTzS8AfvNU?si=nXDINLnjK8M9YCc8",
        "https://www.youtube.com/embed/9awtmVf2p8A?si=ZwFg0PKwehS_Dbzp",
        "https://www.youtube.com/embed/RpcrPeDqJD4?si=kyM0mIqeaN1dvuEV",
        "https://www.youtube.com/embed/Kl8Bb-BEZ8U?si=0VMT8_2oCdsiKGB-",
        "https://www.youtube.com/embed/qcTzS8AfvNU?si=nXDINLnjK8M9YCc8",
        "https://www.youtube.com/embed/9awtmVf2p8A?si=ZwFg0PKwehS_Dbzp",
      ],
      doubtSection: [
        {
          question: "Is Karnavati University good?",
          answer1:
            "It has featured among the top 10 engineering colleges in Karnataka. Over the past few years, Karnavati University has won the title of best placement college in Bangalore, due to its latest and innovative teaching-learning methodology. Several reputed companies visit the campus every year for recruiting Karnavati University students.",
          answer2: null,
        },
        {
          question: "Is Karnavati University degree valid?",
          answer1:
            "Yes, the degree offered by Karnavati University is valid. Karnavati University is recognized by the University Grants Commission, which is a statutory body of the Government of India.",
          answer2: null,
        },
        {
          question: "How old is Karnavati University?",
          answer1:
            "History. Karnavati University was founded in 1990 by Dr. Chenraj Roychand. The core programs initially offered by the university were in the disciplines of Engineering and Management. Over the years, Karnavati University has expanded its offerings to include a wide range of undergraduate and postgraduate programs.",
          answer2: null,
        },
        {
          question: "Is Karnavati University UGC approved?",
          answer1:
            "Karnavati University is a deemed-to-be university located in Bangalore, Karnataka, India. It was declared a deemed-to-be university under section 3 of the UGC Act, 1956, in 2009. Karnavati University has both government recognition and professional accreditation.",
          answer2: null,
        },
        {
          question: "Is Karnavati University good for placement?",
          answer1:
            "Placements: Yes, Karnavati University arranges for placement, and more than 100 students got placed this year alone. A total of 900 students received placement offers from Karnavati University in various companies and MNCs.",
          answer2: null,
        },
      ],
      blogNews: [
        {
          img: marwadie1,
          data: "6",
          icon: <FaCalendarAlt />,
          month: "6th November 2024",
          hed: "Internship Workshop.",
          pre: "InternEdge Internship Workshop for Students of Karnawati University",
          txt: "Read More",
          country: "Belgium",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie2,
          data: "30",
          icon: <FaCalendarAlt />,
          month: "30th December 2024",
          hed: "Job Fair.",
          pre: "CareerPro Job Fair for Students of Karnawati University",
          txt: "Read More",
          country: "Austria",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie1,
          data: "10",
          icon: <FaCalendarAlt />,
          month: "10th January 2025",
          hed: "Career Development Workshop.",
          pre: "FutureCare Career Development Workshop for Students of Karnawati University",
          txt: "Read More",
          country: "Norway",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
      ],
    },
    {
      id: "rai-university-ahemdabad",
      university: "Rai University",
      image: raiahemdabad,
      courses: [
        {
          name: "B.Tech",
          fee: "₹ 1,00,000/year",
          details: ["4 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Computer Science",
            "Electrical Engineering",
            "Mechanical Engineering",
            "Civil Engineering",
            "Electronics and Communication",
          ],
          location: " Ahmedabad",
          approval: true,
          image: btech, // image source for B.Tech
          description: "Description for B.Tech course goes here.",
        },
        {
          name: "M.Tech",
          fee: "₹ 1,20,000/year",
          details: ["2 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Computer Science",
            "Electrical Engineering",
            "Mechanical Engineering",
            "Civil Engineering",
            "Electronics and Communication",
          ],
          location: " Ahmedabad",
          approval: true,
          image: mtech, // image source for M.Tech
          description: "Description for M.Tech course goes here.",
        },
        {
          name: "BCA",
          fee: "₹ 80,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.8,
          scholarship: "According to merit and need-based.",
          specialisation: [
            "Computer Applications",
            "Software Development",
            "Web Development",
            "Networking",
            "Database Management",
          ],
          location: " Ahmedabad",
          approval: true,
          image: bca, // image source for BCA
          description: "Description for BCA course goes here.",
        },
        {
          name: "MCA",
          fee: "₹ 1,00,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship:
            "According to entrance exam results and academic performance.",
          specialisation: [
            "Software Engineering",
            "Data Science",
            "Information Security",
            "Mobile Applications",
            "Cloud Computing",
          ],
          location: " Ahmedabad",
          approval: true,
          image: mca, // image source for MCA
          description: "Description for MCA course goes here.",
        },
        {
          name: "M.Com",
          fee: "₹ 55,000/year",
          details: ["2 Year", "On-campus", "Full Time"],
          rating: 4.8,
          scholarship: "Merit-based scholarships available.",
          specialisation: [
            "Advanced Accounting",
            "Business Statistics",
            "Financial Management",
            "Business Law",
            "Economics",
          ],
          location: " Ahmedabad",
          approval: true,
          image: mcom, // image source for M.Com
          description: "Description for M.Com course goes here.",
        },
        {
          name: "B.Com",
          fee: "₹ 50,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.7,
          scholarship: "Merit-based scholarships available.",
          specialisation: [
            "Accounting",
            "Finance",
            "Taxation",
            "Auditing",
            "Economics",
          ],
          location: " Ahmedabad",
          approval: true,
          image: bcom, // image source for B.Com
          description: "Description for B.Com course goes here.",
        },
      ],
      event: [
        {
          img: marwadie1,
          data: "12",
          month: "April, 2026",
          hed: "Blockchain Workshop",
          pre: "Learn about blockchain technology and its real-world applications",
          time: "9:00 am - 4:00 pm",
          country: "United States",
          alt: "Blockchain Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie2,
          data: "25",
          month: "May, 2026",
          hed: "Startup Pitch Competition",
          pre: "Showcase your startup idea and compete for funding and resources",
          time: "10:00 am - 6:00 pm",
          country: "Canada",
          alt: "Startup Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie3,
          data: "8",
          month: "June, 2026",
          hed: "Artificial Intelligence Ethics Seminar",
          pre: "Discuss the ethical implications of AI technology and its impact on society",
          time: "1:00 pm - 7:00 pm",
          country: "Germany",
          alt: "AI Ethics Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie4,
          data: "20",
          month: "July, 2026",
          hed: "Product Management Masterclass",
          pre: "Learn advanced techniques and strategies for product management",
          time: "2:00 pm - 5:00 pm",
          country: "Australia",
          alt: "Product Management Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie5,
          data: "14",
          month: "August, 2026",
          hed: "Content Marketing Workshop",
          pre: "Discover how to create compelling content that drives engagement and conversions",
          time: "9:30 am - 4:30 pm",
          country: "India",
          alt: "Content Marketing Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie6,
          data: "3",
          month: "September, 2026",
          hed: "Frontend Development Bootcamp",
          pre: "Master frontend development skills and build responsive web applications",
          time: "10:00 am - 3:00 pm",
          country: "France",
          alt: "Frontend Development Image",
          arrow: <FaArrowRight />,
        },
      ],
      ourPlacedStudent: [
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "I cannot forget my days at Quantum and can’t thank them enough for the wonderful friends that I have made there.",
          perImg: devanshithakkr,
          Name: "Devanshi Thakker",
          work: "GSBM",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Thanks to the technical skills I got at Quantum, I am today working in one of the top IT companies in India.",
          perImg: hillaryshah,
          Name: "Hillary Shah",
          work: "UIC",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            " Quantum has not only given me education but has also helped me to build my personality, which helped me to shape my career.",
          perImg: niralichristian,
          Name: "Nirali Christian",
          work: "Trainee Senior Scientfic Assistance",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "I number of companies that visit Quantum for placements is simply amazing. All the students get ample chance to get placed.",
          perImg: sarthakpatel,
          Name: "Sarthak Patel",
          work: "Executive at Intas Biopharmaceuticals",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Being at Quantum was one of the greatest experiences of my life. I learnt a lot of new things to grow my career.   ",
          perImg: twinkeldarji,
          Name: "Twinkle Darji",
          work: "Pharmacy Technician at Nations first Pharmacy",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "It was an Overwhelming experience. I still miss the moments I spent at Quantum. I want to study once more at Quantum. ",
          perImg: virajshah,
          Name: "Viraj Shah",
          work: "UICMR",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Nice Experience, awesome learning and well maintained discipline.",
          perImg: sagarkamani,
          Name: "Sagar Kamani",
          work: "Researcher at Queensland University of Technology",
        },
      ],
      applicationDeadline: "1 july",
      noScholarships: "22",
      amount: "variable",
      internationalStudents: "yes",
      scholarshipLink: "www.AAOPADHE.in",
      address: "Ahemdabad",
      loanBNK:
        "RAI UNIVERSITY HAS ESTABLISHED A COLLABORATION WITH BANK OF BARODA TO FACILITATE ITS STUDENTS WHO ARE INTERESTED IN AVAILING EDUCATION LOANS.",
      email: "raiuni@offical.com",
      phone: "7791996354",
      hiringPartner: [
        raih1,
        raih2,
        raih3,
        raih4,
        raih5,
        raih6,
        raih7,
        raih8,
        raih9,
        raih10,
        raih11,
        raih12,
        raih13,
        raih14,
        raih15,
      ],
      studentEnroll: "10717",
      registeredInstructor: "400",
      successRate: "100",
      successStory: [
        "https://www.youtube.com/embed/3ZPhFTV03gk?si=BNhCxCfkAmTp0iEx",
        "https://www.youtube.com/embed/N1tF1bpTCms?si=9RTtrQ1SDQyq_wz3",
        "https://www.youtube.com/embed/HMkyIjso6zc?si=IjDPud9Aaonnf4cH",
        "https://www.youtube.com/embed/jySdcGARFPQ?si=xzveaBclqazTUcBr",
        "https://www.youtube.com/embed/3ZPhFTV03gk?si=BNhCxCfkAmTp0iEx",
        "https://www.youtube.com/embed/N1tF1bpTCms?si=9RTtrQ1SDQyq_wz3",
        "https://www.youtube.com/embed/HMkyIjso6zc?si=IjDPud9Aaonnf4cH",
        "https://www.youtube.com/embed/jySdcGARFPQ?si=xzveaBclqazTUcBr",
      ],
      doubtSection: [
        {
          question: "Is Rai University good?",
          answer1:
            "It has featured among the top 10 engineering colleges in Karnataka. Over the past few years, Rai University has won the title of best placement college in Bangalore, due to its latest and innovative teaching-learning methodology. Several reputed companies visit the campus every year for recruiting Rai University students.",
          answer2: null,
        },
        {
          question: "Is Rai University degree valid?",
          answer1:
            "Yes, the degree offered by Rai University is valid. Rai University is recognized by the University Grants Commission, which is a statutory body of the Government of India.",
          answer2: null,
        },
        {
          question: "How old is Rai University?",
          answer1:
            "History. Rai University was founded in 1990 by Dr. Chenraj Roychand. The core programs initially offered by the university were in the disciplines of Engineering and Management. Over the years, Rai University has expanded its offerings to include a wide range of undergraduate and postgraduate programs.",
          answer2: null,
        },
        {
          question: "Is Rai University UGC approved?",
          answer1:
            "Rai University is a deemed-to-be university located in Bangalore, Karnataka, India. It was declared a deemed-to-be university under section 3 of the UGC Act, 1956, in 2009. Rai University has both government recognition and professional accreditation.",
          answer2: null,
        },
        {
          question: "Is Rai University good for placement?",
          answer1:
            "Placements: Yes, Rai University arranges for placement, and more than 100 students got placed this year alone. A total of 900 students received placement offers from Rai University in various companies and MNCs.",
          answer2: null,
        },
      ],
      blogNews: [
        {
          img: marwadie2,
          data: "12",
          icon: <FaCalendarAlt />,
          month: "12th May 2025",
          hed: "Job Recruitment Drive.",
          pre: "RecruitPro Job Recruitment Drive for Students of Rai University",
          txt: "Read More",
          country: "Ireland",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie4,
          data: "21",
          icon: <FaCalendarAlt />,
          month: "21st June 2025",
          hed: "Career Symposium.",
          pre: "CareerForum Career Symposium for Students of Rai University",
          txt: "Read More",
          country: "United Arab Emirates",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie6,
          data: "8",
          icon: <FaCalendarAlt />,
          month: "8th July 2025",
          hed: "Job Fair.",
          pre: "CareerLink Job Fair for Students of Rai University",
          txt: "Read More",
          country: "Qatar",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
      ],
    },
    {
      id: "rai-university-benglore",
      university: "Rai University",
      image: raibenglore,
      courses: [
        {
          name: "B.Tech",
          fee: "₹ 1,00,000/year",
          details: ["4 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Computer Science",
            "Electrical Engineering",
            "Mechanical Engineering",
            "Civil Engineering",
            "Electronics and Communication",
          ],
          location: "Benglore",
          approval: true,
          image: btech, // image source for B.Tech
          description: "Description for B.Tech course goes here.",
        },
        {
          name: "M.Tech",
          fee: "₹ 1,20,000/year",
          details: ["2 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Computer Science",
            "Electrical Engineering",
            "Mechanical Engineering",
            "Civil Engineering",
            "Electronics and Communication",
          ],
          location: "Benglore",
          approval: true,
          image: mtech, // image source for M.Tech
          description: "Description for M.Tech course goes here.",
        },
        {
          name: "BCA",
          fee: "₹ 80,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.8,
          scholarship: "According to merit and need-based.",
          specialisation: [
            "Computer Applications",
            "Software Development",
            "Web Development",
            "Networking",
            "Database Management",
          ],
          location: "Benglore",
          approval: true,
          image: bca, // image source for BCA
          description: "Description for BCA course goes here.",
        },
        {
          name: "MCA",
          fee: "₹ 1,00,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship:
            "According to entrance exam results and academic performance.",
          specialisation: [
            "Software Engineering",
            "Data Science",
            "Information Security",
            "Mobile Applications",
            "Cloud Computing",
          ],
          location: "Benglore",
          approval: true,
          image: mca, // image source for MCA
          description: "Description for MCA course goes here.",
        },
        {
          name: "M.Com",
          fee: "₹ 55,000/year",
          details: ["2 Year", "On-campus", "Full Time"],
          rating: 4.8,
          scholarship: "Merit-based scholarships available.",
          specialisation: [
            "Advanced Accounting",
            "Business Statistics",
            "Financial Management",
            "Business Law",
            "Economics",
          ],
          location: "Benglore",
          approval: true,
          image: mcom, // image source for M.Com
          description: "Description for M.Com course goes here.",
        },
        {
          name: "B.Com",
          fee: "₹ 50,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.7,
          scholarship: "Merit-based scholarships available.",
          specialisation: [
            "Accounting",
            "Finance",
            "Taxation",
            "Auditing",
            "Economics",
          ],
          location: "Benglore",
          approval: true,
          image: bcom, // image source for B.Com
          description: "Description for B.Com course goes here.",
        },
      ],
      event: [
        {
          img: marwadie1,
          data: "12",
          month: "April, 2026",
          hed: "Blockchain Workshop",
          pre: "Learn about blockchain technology and its real-world applications",
          time: "9:00 am - 4:00 pm",
          country: "United States",
          alt: "Blockchain Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie2,
          data: "25",
          month: "May, 2026",
          hed: "Startup Pitch Competition",
          pre: "Showcase your startup idea and compete for funding and resources",
          time: "10:00 am - 6:00 pm",
          country: "Canada",
          alt: "Startup Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie3,
          data: "8",
          month: "June, 2026",
          hed: "Artificial Intelligence Ethics Seminar",
          pre: "Discuss the ethical implications of AI technology and its impact on society",
          time: "1:00 pm - 7:00 pm",
          country: "Germany",
          alt: "AI Ethics Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie4,
          data: "20",
          month: "July, 2026",
          hed: "Product Management Masterclass",
          pre: "Learn advanced techniques and strategies for product management",
          time: "2:00 pm - 5:00 pm",
          country: "Australia",
          alt: "Product Management Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie5,
          data: "14",
          month: "August, 2026",
          hed: "Content Marketing Workshop",
          pre: "Discover how to create compelling content that drives engagement and conversions",
          time: "9:30 am - 4:30 pm",
          country: "India",
          alt: "Content Marketing Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie6,
          data: "3",
          month: "September, 2026",
          hed: "Frontend Development Bootcamp",
          pre: "Master frontend development skills and build responsive web applications",
          time: "10:00 am - 3:00 pm",
          country: "France",
          alt: "Frontend Development Image",
          arrow: <FaArrowRight />,
        },
      ],
      ourPlacedStudent: [
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "I cannot forget my days at Quantum and can’t thank them enough for the wonderful friends that I have made there.",
          perImg: devanshithakkr,
          Name: "Devanshi Thakker",
          work: "GSBM",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Thanks to the technical skills I got at Quantum, I am today working in one of the top IT companies in India.",
          perImg: hillaryshah,
          Name: "Hillary Shah",
          work: "UIC",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            " Quantum has not only given me education but has also helped me to build my personality, which helped me to shape my career.",
          perImg: niralichristian,
          Name: "Nirali Christian",
          work: "Trainee Senior Scientfic Assistance",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "I number of companies that visit Quantum for placements is simply amazing. All the students get ample chance to get placed.",
          perImg: sarthakpatel,
          Name: "Sarthak Patel",
          work: "Executive at Intas Biopharmaceuticals",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Being at Quantum was one of the greatest experiences of my life. I learnt a lot of new things to grow my career.   ",
          perImg: twinkeldarji,
          Name: "Twinkle Darji",
          work: "Pharmacy Technician at Nations first Pharmacy",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "It was an Overwhelming experience. I still miss the moments I spent at Quantum. I want to study once more at Quantum. ",
          perImg: virajshah,
          Name: "Viraj Shah",
          work: "UICMR",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Nice Experience, awesome learning and well maintained discipline.",
          perImg: sagarkamani,
          Name: "Sagar Kamani",
          work: "Researcher at Queensland University of Technology",
        },
      ],
      applicationDeadline: "1 july",
      noScholarships: "22",
      amount: "variable",
      internationalStudents: "yes",
      scholarshipLink: "www.AAOPADHE.in",
      address: "Benglore",
      loanBNK:
        "RAI UNIVERSITY HAS ESTABLISHED A COLLABORATION WITH BANK OF BARODA TO FACILITATE ITS STUDENTS WHO ARE INTERESTED IN AVAILING EDUCATION LOANS.",
      email: "raiuni@offical.com",
      phone: "7791996354",
      hiringPartner: [
        raih1,
        raih2,
        raih3,
        raih4,
        raih5,
        raih6,
        raih7,
        raih8,
        raih9,
        raih10,
        raih11,
        raih12,
        raih13,
        raih14,
        raih15,
      ],
      studentEnroll: "10717",
      registeredInstructor: "400",
      successRate: "100",
      successStory: [
        "https://www.youtube.com/embed/3ZPhFTV03gk?si=BNhCxCfkAmTp0iEx",
        "https://www.youtube.com/embed/N1tF1bpTCms?si=9RTtrQ1SDQyq_wz3",
        "https://www.youtube.com/embed/HMkyIjso6zc?si=IjDPud9Aaonnf4cH",
        "https://www.youtube.com/embed/jySdcGARFPQ?si=xzveaBclqazTUcBr",
        "https://www.youtube.com/embed/3ZPhFTV03gk?si=BNhCxCfkAmTp0iEx",
        "https://www.youtube.com/embed/N1tF1bpTCms?si=9RTtrQ1SDQyq_wz3",
        "https://www.youtube.com/embed/HMkyIjso6zc?si=IjDPud9Aaonnf4cH",
        "https://www.youtube.com/embed/jySdcGARFPQ?si=xzveaBclqazTUcBr",
      ],
      doubtSection: [
        {
          question: "Is Rai University good?",
          answer1:
            "It has featured among the top 10 engineering colleges in Karnataka. Over the past few years, Rai University has won the title of best placement college in Bangalore, due to its latest and innovative teaching-learning methodology. Several reputed companies visit the campus every year for recruiting Rai University students.",
          answer2: null,
        },
        {
          question: "Is Rai University degree valid?",
          answer1:
            "Yes, the degree offered by Rai University is valid. Rai University is recognized by the University Grants Commission, which is a statutory body of the Government of India.",
          answer2: null,
        },
        {
          question: "How old is Rai University?",
          answer1:
            "History. Rai University was founded in 1990 by Dr. Chenraj Roychand. The core programs initially offered by the university were in the disciplines of Engineering and Management. Over the years, Rai University has expanded its offerings to include a wide range of undergraduate and postgraduate programs.",
          answer2: null,
        },
        {
          question: "Is Rai University UGC approved?",
          answer1:
            "Rai University is a deemed-to-be university located in Bangalore, Karnataka, India. It was declared a deemed-to-be university under section 3 of the UGC Act, 1956, in 2009. Rai University has both government recognition and professional accreditation.",
          answer2: null,
        },
        {
          question: "Is Rai University good for placement?",
          answer1:
            "Placements: Yes, Rai University arranges for placement, and more than 100 students got placed this year alone. A total of 900 students received placement offers from Rai University in various companies and MNCs.",
          answer2: null,
        },
      ],
      blogNews: [
        {
          img: marwadie2,
          data: "12",
          icon: <FaCalendarAlt />,
          month: "12th May 2025",
          hed: "Job Recruitment Drive.",
          pre: "RecruitPro Job Recruitment Drive for Students of Rai University",
          txt: "Read More",
          country: "Ireland",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie4,
          data: "21",
          icon: <FaCalendarAlt />,
          month: "21st June 2025",
          hed: "Career Symposium.",
          pre: "CareerForum Career Symposium for Students of Rai University",
          txt: "Read More",
          country: "United Arab Emirates",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie6,
          data: "8",
          icon: <FaCalendarAlt />,
          month: "8th July 2025",
          hed: "Job Fair.",
          pre: "CareerLink Job Fair for Students of Rai University",
          txt: "Read More",
          country: "Qatar",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
      ],
    },
    {
      id: "spsu",
      university: "Sir Padampat Singhania University",
      image: spsu,
      courses: [
        {
          name: "BBA",
          fee: "₹ 1,40,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Marketing",
            "Finance",
            "Human Resource Management",
            "Operations Management",
            "Entrepreneurship",
          ],
          location: "Udaipur , Rajasthan",
          approval: true,
          image: bba, // image source for BBA
          description: "Description for BBA course goes here.",
        },
        {
          name: "Ph.D.",
          fee: "Varies depending on the institution",
          details: ["3-6 Years", "On-campus/Online", "Full Time/Part Time"],
          rating: 4.9,
          scholarship: "Available based on merit and research grants.",
          specialisation: [
            "Business Administration",
            "Economics",
            "Management",
            "Finance",
            "Marketing",
          ],
          location: "Udaipur , Rajasthan",
          approval: true,
          image: phd, // image source for Ph.D.
          description: "Description for Ph.D. program goes here.",
        },
        {
          name: "LLM",
          fee: "₹ 1,40,000/year",
          details: ["2 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Corporate Law",
            "Criminal Law",
            "Constitutional Law",
            "International Law",
            "Family Law",
          ],
          location: "Udaipur , Rajasthan",
          approval: true,
          image: llm, // image source for LLM
          description: "Description for LLM course goes here.",
        },
        {
          name: "BA",
          fee: "Varies depending on the institution",
          details: ["3 Years", "On-campus/Online", "Full Time/Part Time"],
          rating: 4.9,
          scholarship: "Available based on merit and financial need.",
          specialisation: [
            "English Literature",
            "History",
            "Psychology",
            "Sociology",
            "Political Science",
          ],
          location: "Udaipur , Rajasthan",
          approval: true,
          image: ba, // image source for BA
          description: "Description for BA program goes here.",
        },
        {
          name: "LLB",
          fee: "₹ 1,20,000/year",
          details: ["5 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Corporate Law",
            "Criminal Law",
            "Constitutional Law",
            "International Law",
            "Family Law",
          ],
          location: "Udaipur , Rajasthan",
          approval: true,
          image: llb, // image source for BBA LLB
          description: "Description for BBA LLB course goes here.",
        },
        {
          name: "B.Tech",
          fee: "₹ 1,00,000/year",
          details: ["4 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Computer Science",
            "Electrical Engineering",
            "Mechanical Engineering",
            "Civil Engineering",
            "Electronics and Communication",
          ],
          location: "Udaipur , Rajasthan",
          approval: true,
          image: btech, // image source for B.Tech
          description: "Description for B.Tech course goes here.",
        },
        {
          name: "M.Tech",
          fee: "₹ 1,20,000/year",
          details: ["2 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Computer Science",
            "Electrical Engineering",
            "Mechanical Engineering",
            "Civil Engineering",
            "Electronics and Communication",
          ],
          location: "Udaipur , Rajasthan",
          approval: true,
          image: mtech, // image source for M.Tech
          description: "Description for M.Tech course goes here.",
        },
        {
          name: "BCA",
          fee: "₹ 80,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.8,
          scholarship: "According to merit and need-based.",
          specialisation: [
            "Computer Applications",
            "Software Development",
            "Web Development",
            "Networking",
            "Database Management",
          ],
          location: "Udaipur , Rajasthan",
          approval: true,
          image: bca, // image source for BCA
          description: "Description for BCA course goes here.",
        },
        {
          name: "MCA",
          fee: "₹ 1,00,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship:
            "According to entrance exam results and academic performance.",
          specialisation: [
            "Software Engineering",
            "Data Science",
            "Information Security",
            "Mobile Applications",
            "Cloud Computing",
          ],
          location: "Udaipur , Rajasthan",
          approval: true,
          image: mca, // image source for MCA
          description: "Description for MCA course goes here.",
        },
      ],
      event: [
        {
          img: marwadie1,
          data: "22",
          month: "October, 2026",
          hed: "Cloud Computing Workshop",
          pre: "Learn about cloud computing infrastructure and services",
          time: "11:00 am - 6:00 pm",
          country: "United Kingdom",
          alt: "Cloud Computing Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie2,
          data: "5",
          month: "November, 2026",
          hed: "User Experience Design Conference",
          pre: "Explore the latest trends and practices in user experience design",
          time: "1:30 pm - 5:30 pm",
          country: "United States",
          alt: "UX Design Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie3,
          data: "18",
          month: "December, 2026",
          hed: "Data Visualization Seminar",
          pre: "Learn how to effectively present data through visualizations",
          time: "9:00 am - 7:00 pm",
          country: "Canada",
          alt: "Data Visualization Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie4,
          data: "7",
          month: "January, 2027",
          hed: "Machine Learning Applications Workshop",
          pre: "Discover practical applications of machine learning in various industries",
          time: "10:00 am - 4:00 pm",
          country: "Australia",
          alt: "Machine Learning Applications Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie5,
          data: "14",
          month: "February, 2027",
          hed: "Digital Transformation Summit",
          pre: "Explore strategies for driving digital transformation in organizations",
          time: "8:00 am - 6:00 pm",
          country: "Germany",
          alt: "Digital Transformation Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie6,
          data: "9",
          month: "March, 2027",
          hed: "Internet of Things Workshop",
          pre: "Learn about IoT technologies and their applications in everyday life",
          time: "10:00 am - 4:00 pm",
          country: "France",
          alt: "Internet of Things Image",
          arrow: <FaArrowRight />,
        },
      ],
      ourPlacedStudent: [
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "I cannot forget my days at SPSU and can’t thank them enough for the wonderful friends that I have made there.",
          perImg: ronakmaniar,
          Name: "Ronak Maniar",
          work: "Qualcomm, USA",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Thanks to the technical skills I got at SPSU, I am today working in one of the top IT companies in India.",
          perImg: zahrakankroliwala,
          Name: "Zahra Kankroli Wala",
          work: "Global Wireless, USA",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            " SPSU has not only given me education but has also helped me to build my personality, which helped me to shape my career.",
          perImg: arpitmehta,
          Name: "Aprita Mehta",
          work: "Gainwell, India",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "I number of companies that visit SPSU for placements is simply amazing. All the students get ample chance to get placed.",
          perImg: apoorvupadhyay,
          Name: "Apoorv Upadhyay",
          work: "PharmEasy, India",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Being at SPSU was one of the greatest experiences of my life. I learnt a lot of new things to grow my career.   ",
          perImg: muskanupadhyay,
          Name: "Muskan Upadhyay",
          work: "Publicis Sapient, India",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "It was an Overwhelming experience. I still miss the moments I spent at SPSU. I want to study once more at Quantum. ",
          perImg: tapeshsaini,
          Name: "Tapesh Saini",
          work: "Mercedes Benz, India",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Nice Experience, awesome learning and well maintained discipline.",
          perImg: ankittailor,
          Name: "Ankit Tailor",
          work: "Gesat, Germany",
        },
      ],
      applicationDeadline: "1 july",
      noScholarships: "22",
      amount: "variable",
      internationalStudents: "yes",
      scholarshipLink: "www.AAOPADHE.in",
      loanBNK:
        "SPSU HAS JOINED HANDS WITH IDBI BANK TO FACILITATE ITS STUDENTS WHO ARE INTERESTED IN AVAILING EDUCATION LOANS.",
      email: "spsu@offical.com",
      phone: "7791996354",
      hiringPartner: [
        marwadih1,
        marwadih2,
        marwadih3,
        marwadih4,
        marwadih5,
        marwadih6,
        marwadih1,
        marwadih2,
        marwadih3,
        marwadih4,
        marwadih5,
        marwadih6,
        marwadih1,
        marwadih2,
        marwadih3,
        marwadih4,
        marwadih5,
        marwadih6,
      ],
      studentEnroll: "125,300",
      registeredInstructor: "300+",
      successRate: "100%",
      address: "Udaipur, Rajasthan",
      successStory: [
        "https://www.youtube.com/embed/X0gRqjmQ1dg?si=X4pyhWg3KbC82p4J",
        "https://www.youtube.com/embed/SHmK_puxfFs?si=iXEFMdjrBZ5O1_1J",
        "https://www.youtube.com/embed/wRxYo2ZNJFU?si=tKG1fygfmQC2a1Ey",
        "https://www.youtube.com/embed/QYue9pcoNNM?si=XUjOb-kJj2H3M1Nt",
        "https://www.youtube.com/embed/X0gRqjmQ1dg?si=X4pyhWg3KbC82p4J",
        "https://www.youtube.com/embed/SHmK_puxfFs?si=iXEFMdjrBZ5O1_1J",
        "https://www.youtube.com/embed/wRxYo2ZNJFU?si=tKG1fygfmQC2a1Ey",
        "https://www.youtube.com/embed/QYue9pcoNNM?si=XUjOb-kJj2H3M1Nt",
      ],
      doubtSection: [
        {
          question: "Is SPSU good?",
          answer1:
            "It has featured among the top 10 engineering colleges in Karnataka. Over the past few years, SPSU has won the title of best placement college in Bangalore, due to its latest and innovative teaching-learning methodology. Several reputed companies visit the campus every year for recruiting SPSU students.",
          answer2: null,
        },
        {
          question: "Is SPSU degree valid?",
          answer1:
            "Yes, the degree offered by SPSU is valid. SPSU is recognized by the University Grants Commission, which is a statutory body of the Government of India.",
          answer2: null,
        },
        {
          question: "How old is SPSU?",
          answer1:
            "History. SPSU was founded in 1990 by Dr. Chenraj Roychand. The core programs initially offered by the university were in the disciplines of Engineering and Management. Over the years, SPSU has expanded its offerings to include a wide range of undergraduate and postgraduate programs.",
          answer2: null,
        },
        {
          question: "Is SPSU UGC approved?",
          answer1:
            "SPSU is a deemed-to-be university located in Bangalore, Karnataka, India. It was declared a deemed-to-be university under section 3 of the UGC Act, 1956, in 2009. SPSU has both government recognition and professional accreditation.",
          answer2: null,
        },
        {
          question: "Is SPSU good for placement?",
          answer1:
            "Placements: Yes, SPSU arranges for placement, and more than 100 students got placed this year alone. A total of 900 students received placement offers from SPSU in various companies and MNCs.",
          answer2: null,
        },
      ],
      blogNews: [
        {
          img: marwadie2,
          data: "21",
          icon: <FaCalendarAlt />,
          month: "21st June 2025",
          hed: "Career Symposium.",
          pre: "CareerForum Career Symposium for Students of Quantum University",
          txt: "Read More",
          country: "United Arab Emirates",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie6,
          data: "8",
          icon: <FaCalendarAlt />,
          month: "8th July 2025",
          hed: "Job Fair.",
          pre: "CareerLink Job Fair for Students of Quantum University",
          txt: "Read More",
          country: "Qatar",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie1,
          data: "26",
          icon: <FaCalendarAlt />,
          month: "26th August 2025",
          hed: "Career Development Conference.",
          pre: "CareerSummit Career Development Conference for Students of Quantum University",
          txt: "Read More",
          country: "Saudi Arabia",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
      ],
    },
    {
      id: "haridwar-university",
      university: "Haridwar University",
      image:haridwar,
      courses: [
        {
          name: "BBA LLB",
          fee: "₹ 1,20,000/year",
          details: ["5 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Corporate Law",
            "Criminal Law",
            "Constitutional Law",
            "International Law",
            "Family Law",
          ],
          location: "Roorkee Dehra Dun(Uttarakhand)",
          approval: true,
          image: llb, // image source for BBA LLB
          description: "Description for BBA LLB course goes here.",
        },
        {
          name: "B.Tech",
          fee: "₹ 1,00,000/year",
          details: ["4 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Computer Science",
            "Electrical Engineering",
            "Mechanical Engineering",
            "Civil Engineering",
            "Electronics and Communication",
          ],
          location: "Roorkee Dehra Dun(Uttarakhand)",
          approval: true,
          image: btech, // image source for B.Tech
          description: "Description for B.Tech course goes here.",
        },
        {
          name: "M.Tech",
          fee: "₹ 1,20,000/year",
          details: ["2 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Computer Science",
            "Electrical Engineering",
            "Mechanical Engineering",
            "Civil Engineering",
            "Electronics and Communication",
          ],
          location: "Roorkee Dehra Dun(Uttarakhand)",
          approval: true,
          image: mtech, // image source for M.Tech
          description: "Description for M.Tech course goes here.",
        },
        {
          name: "BCA",
          fee: "₹ 80,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.8,
          scholarship: "According to merit and need-based.",
          specialisation: [
            "Computer Applications",
            "Software Development",
            "Web Development",
            "Networking",
            "Database Management",
          ],
          location: "Roorkee Dehra Dun(Uttarakhand)",
          approval: true,
          image: bca, // image source for BCA
          description: "Description for BCA course goes here.",
        },
        {
          name: "MCA",
          fee: "₹ 1,00,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship:
            "According to entrance exam results and academic performance.",
          specialisation: [
            "Software Engineering",
            "Data Science",
            "Information Security",
            "Mobile Applications",
            "Cloud Computing",
          ],
          location: "Roorkee Dehra Dun(Uttarakhand)",
          approval: true,
          image: mca, // image source for MCA
          description: "Description for MCA course goes here.",
        },
      ],
      event: [
        {
          img: uiux,
          data: "18",
          month: "March, 2023",
          hed: " Basic UI & UX Design for new development",
          pre: "Seamlessly visualize quality ellectual capital without superior collaboration and idea tically",
          time: "3:30 pm - 4:30 pm",
          country: "United Kingdome",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: digitalmarketing,
          data: "20",
          month: "March, 2023",
          hed: " Digital Education Market Briefing: Minnesota 2023",
          pre: "Seamlessly visualize quality ellectual capital without superior collaboration and idea tically",
          time: "3:30 pm - 4:30 pm",
          country: "United Kingdome",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: musicteacher,
          data: "22",
          month: "March, 2023",
          hed: " Learning Network Webinars for Music Teachers",
          pre: "Seamlessly visualize quality ellectual capital without superior collaboration and idea tically",
          time: "3:30 pm - 4:30 pm",
          country: "United Kingdome",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: education,
          data: "22",
          month: "March, 2023",
          hed: "  Next-Gen Higher Education Students Have Arrived?",
          pre: "Seamlessly visualize quality ellectual capital without superior collaboration and idea tically",
          time: "3:30 pm - 4:30 pm",
          country: "United Kingdome",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: art3d,
          data: "24",
          month: "March, 2023",
          hed: "  Digital Art & 3D Model – a future for film company",
          pre: "Seamlessly visualize quality ellectual capital without superior collaboration and idea tically",
          time: "3:30 pm - 4:30 pm",
          country: "United Kingdome",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: discipline,
          data: "26",
          month: "March, 2023",
          hed: "   Conscious Discipline Summer Institute",
          pre: "Seamlessly visualize quality ellectual capital without superior collaboration and idea tically",
          time: "3:30 pm - 4:30 pm",
          country: "United Kingdome",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
      ],
      ourPlacedStudent: [
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "I cannot forget my days at Quantum and can’t thank them enough for the wonderful friends that I have made there.",
          perImg: anshubudha,
          Name: "Anshu Budha",
          work: "Infosys",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Thanks to the technical skills I got at Quantum, I am today working in one of the top IT companies in India.",
          perImg: chandansharma,
          Name: "Chandan Sharma",
          work: "Gold Plus",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            " Quantum has not only given me education but has also helped me to build my personality, which helped me to shape my career.",
          perImg: sagargautam,
          Name: "Sagar Gautam",
          work: "HCL",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "I number of companies that visit Quantum for placements is simply amazing. All the students get ample chance to get placed.",
          perImg: shyamnarayan,
          Name: "Shyam Narayan",
          work: "Wippro",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Being at Quantum was one of the greatest experiences of my life. I learnt a lot of new things to grow my career.   ",
          perImg: shrutisaloni,
          Name: "Shruti Shree",
          work: "Capegemini",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "It was an Overwhelming experience. I still miss the moments I spent at Quantum. I want to study once more at Quantum. ",
          perImg: rachitkaushik,
          Name: "Rachit Kaushik",
          work: "ischools Connect",
        },
      ],
      applicationDeadline: "1 july",
      noScholarships: "22",
      amount: "variable",
      internationalStudents: "yes",
      scholarshipLink: "www.AAOPADHE.in",
      loanBNK:
        "Haridwar University HAS COORDINATED WITH PUNJAB & SIND BANK TO FACILITATE ITS STUDENTS WHO ARE INTERESTED IN AVAILING EDUCATION LOANS.",
      email: "hu@offical.com",
      phone: "7791996354",
      hiringPartner: [
        pacifich1,
        pacifich2,
        pacifich3,
        pacifich4,
        pacifich5,
        pacifich6,
        pacifich7,
        pacifich8,
        pacifich9,
        pacifich10,
        pacifich2,
        pacifich4,
        pacifich4,
        pacifich8,
        pacifich10,
      ],
      studentEnroll: "125,300",
      registeredInstructor: "300",
      successRate: "100",
      address:"Roorkee, Uttarakhand",
      successStory: [
        "https://www.youtube.com/embed/mhZmP5GDiOk?si=vPp0GiiVcxNGE510",
        "https://www.youtube.com/embed/D4-SEOt7xCo?si=jx4H26JLdc6F0TxQ",
        "https://www.youtube.com/embed/I7DbmdOQt6o?si=3A12yB1lPkEyZrMn",
        "https://www.youtube.com/embed/QjHqeQOHM4I?si=f9uyIg2Fj68n-tAC",
        "https://www.youtube.com/embed/mhZmP5GDiOk?si=vPp0GiiVcxNGE510",
        "https://www.youtube.com/embed/D4-SEOt7xCo?si=jx4H26JLdc6F0TxQ",
        "https://www.youtube.com/embed/I7DbmdOQt6o?si=3A12yB1lPkEyZrMn",
        "https://www.youtube.com/embed/QjHqeQOHM4I?si=f9uyIg2Fj68n-tAC",
      ],
      doubtSection: [
        {
          question: "Is Haridwar University good?",
          answer1:
            "It has featured among the top 10 engineering colleges in Karnataka. Over the past few years, Haridwar University has won the title of best placement college in Bangalore, due to its latest and innovative teaching-learning methodology. Several reputed companies visit the campus every year for recruiting Haridwar University students.",
          answer2: null,
        },
        {
          question: "Is Haridwar University degree valid?",
          answer1:
            "Yes, the degree offered by Haridwar University is valid. Haridwar University is recognized by the University Grants Commission, which is a statutory body of the Government of India.",
          answer2: null,
        },
        {
          question: "How old is Haridwar University?",
          answer1:
            "History. Haridwar University was founded in 1990 by Dr. Chenraj Roychand. The core programs initially offered by the university were in the disciplines of Engineering and Management. Over the years, Haridwar University has expanded its offerings to include a wide range of undergraduate and postgraduate programs.",
          answer2: null,
        },
        {
          question: "Is Haridwar University UGC approved?",
          answer1:
            "Haridwar University is a deemed-to-be university located in Bangalore, Karnataka, India. It was declared a deemed-to-be university under section 3 of the UGC Act, 1956, in 2009. Haridwar University has both government recognition and professional accreditation.",
          answer2: null,
        },
        {
          question: "Is Haridwar University good for placement?",
          answer1:
            "Placements: Yes, Haridwar University arranges for placement, and more than 100 students got placed this year alone. A total of 900 students received placement offers from Haridwar University in various companies and MNCs.",
          answer2: null,
        },
      ],
      blogNews: [
        {
          img: marwadie1,
          data: "5",
          icon: <FaCalendarAlt />,
          month: "5th March 2025",
          hed: "Industry Networking Event.",
          pre: "IndustryConnect Industry Networking Event for Students of Quantum University",
          txt: "Read More",
          country: "Denmark",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie3,
          data: "23",
          icon: <FaCalendarAlt />,
          month: "23rd April 2025",
          hed: "Career Expo.",
          pre: "CareerEdge Career Expo for Students of Quantum University",
          txt: "Read More",
          country: "Finland",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie5,
          data: "12",
          icon: <FaCalendarAlt />,
          month: "12th May 2025",
          hed: "Job Recruitment Drive.",
          pre: "RecruitPro Job Recruitment Drive for Students of Quantum University",
          txt: "Read More",
          country: "Ireland",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
      ],
    },
    {
      id: "knmodi-university",
      university: "Dr. K.N. Modi University",
      image : knmodi,
      courses: [
        {
          name: "BBA",
          fee: "₹ 1,40,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Marketing",
            "Finance",
            "Human Resource Management",
            "Operations Management",
            "Entrepreneurship",
          ],
          location: "Newai, Jaipur",
          approval: true,
          image: bba, // image source for BBA
          description: "Description for BBA course goes here.",
        },
        {
          name: "Ph.D.",
          fee: "Varies depending on the institution",
          details: ["3-6 Years", "On-campus/Online", "Full Time/Part Time"],
          rating: 4.9,
          scholarship: "Available based on merit and research grants.",
          specialisation: [
            "Business Administration",
            "Economics",
            "Management",
            "Finance",
            "Marketing",
          ],
          location: "Newai, Jaipur",
          approval: true,
          image: phd, // image source for Ph.D.
          description: "Description for Ph.D. program goes here.",
        },
        {
          name: "LLM",
          fee: "₹ 1,40,000/year",
          details: ["2 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Corporate Law",
            "Criminal Law",
            "Constitutional Law",
            "International Law",
            "Family Law",
          ],
          location: "Newai, Jaipur",
          approval: true,
          image: llm, // image source for LLM
          description: "Description for LLM course goes here.",
        },
        {
          name: "BA",
          fee: "Varies depending on the institution",
          details: ["3 Years", "On-campus/Online", "Full Time/Part Time"],
          rating: 4.9,
          scholarship: "Available based on merit and financial need.",
          specialisation: [
            "English Literature",
            "History",
            "Psychology",
            "Sociology",
            "Political Science",
          ],
          location: "Newai, Jaipur",
          approval: true,
          image: ba, // image source for BA
          description: "Description for BA program goes here.",
        },
        {
          name: "LLB",
          fee: "₹ 1,20,000/year",
          details: ["5 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Corporate Law",
            "Criminal Law",
            "Constitutional Law",
            "International Law",
            "Family Law",
          ],
          location: "Newai, Jaipur",
          approval: true,
          image: llb, // image source for BBA LLB
          description: "Description for BBA LLB course goes here.",
        },
        {
          name: "B.Tech",
          fee: "₹ 1,00,000/year",
          details: ["4 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Computer Science",
            "Electrical Engineering",
            "Mechanical Engineering",
            "Civil Engineering",
            "Electronics and Communication",
          ],
          location: "Newai, Jaipur",
          approval: true,
          image: btech, // image source for B.Tech
          description: "Description for B.Tech course goes here.",
        },
        {
          name: "M.Tech",
          fee: "₹ 1,20,000/year",
          details: ["2 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship: "According to entrance exam results.",
          specialisation: [
            "Computer Science",
            "Electrical Engineering",
            "Mechanical Engineering",
            "Civil Engineering",
            "Electronics and Communication",
          ],
          location: "Newai, Jaipur",
          approval: true,
          image: mtech, // image source for M.Tech
          description: "Description for M.Tech course goes here.",
        },
        {
          name: "BCA",
          fee: "₹ 80,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.8,
          scholarship: "According to merit and need-based.",
          specialisation: [
            "Computer Applications",
            "Software Development",
            "Web Development",
            "Networking",
            "Database Management",
          ],
          location: "Newai, Jaipur",
          approval: true,
          image: bca, // image source for BCA
          description: "Description for BCA course goes here.",
        },
        {
          name: "MCA",
          fee: "₹ 1,00,000/year",
          details: ["3 Year", "On-campus", "Full Time"],
          rating: 4.9,
          scholarship:
            "According to entrance exam results and academic performance.",
          specialisation: [
            "Software Engineering",
            "Data Science",
            "Information Security",
            "Mobile Applications",
            "Cloud Computing",
          ],
          location: "Newai, Jaipur",
          approval: true,
          image: mca, // image source for MCA
          description: "Description for MCA course goes here.",
        },
      ],
      event: [
        {
          img: marwadie1,
          data: "22",
          month: "October, 2027",
          hed: "Robotics Conference",
          pre: "Explore the latest advancements and applications in robotics technology",
          time: "11:00 am - 6:00 pm",
          country: "United Kingdom",
          alt: "Robotics Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie2,
          data: "5",
          month: "November, 2027",
          hed: "Augmented Reality Workshop",
          pre: "Learn how to develop augmented reality experiences for various platforms",
          time: "1:30 pm - 5:30 pm",
          country: "United States",
          alt: "Augmented Reality Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie3,
          data: "18",
          month: "December, 2027",
          hed: "Cryptocurrency Summit",
          pre: "Discover the latest trends and innovations in the world of cryptocurrency",
          time: "9:00 am - 7:00 pm",
          country: "Canada",
          alt: "Cryptocurrency Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie4,
          data: "7",
          month: "January, 2028",
          hed: "Machine Learning for Healthcare Workshop",
          pre: "Explore how machine learning is transforming healthcare and medical research",
          time: "10:00 am - 4:00 pm",
          country: "Australia",
          alt: "Healthcare Machine Learning Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie5,
          data: "14",
          month: "February, 2028",
          hed: "Digital Art Masterclass",
          pre: "Learn digital art techniques and create stunning digital artworks",
          time: "8:00 am - 6:00 pm",
          country: "Germany",
          alt: "Digital Art Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie6,
          data: "9",
          month: "March, 2028",
          hed: "Agile Project Management Workshop",
          pre: "Master agile project management methodologies for efficient project delivery",
          time: "10:00 am - 4:00 pm",
          country: "France",
          alt: "Agile Project Management Image",
          arrow: <FaArrowRight />,
        },
      ],
      
      ourPlacedStudent: [
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "I cannot forget my days at K.N. Modi and can’t thank them enough for the wonderful friends that I have made there.",
          perImg: anshubudha,
          Name: "Anshu Budha",
          work: "Infosys",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Thanks to the technical skills I got at K.N. Modi, I am today working in one of the top IT companies in India.",
          perImg: chandansharma,
          Name: "Chandan Sharma",
          work: "Gold Plus",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            " K.N. Modi has not only given me education but has also helped me to build my personality, which helped me to shape my career.",
          perImg: sagargautam,
          Name: "Sagar Gautam",
          work: "HCL",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "I number of companies that visit K.N. Modi for placements is simply amazing. All the students get ample chance to get placed.",
          perImg: shyamnarayan,
          Name: "Shyam Narayan",
          work: "Wippro",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "Being at K.N. Modi was one of the greatest experiences of my life. I learnt a lot of new things to grow my career.   ",
          perImg: shrutisaloni,
          Name: "Shruti Shree",
          work: "Capegemini",
        },
        {
          Topimg:
            "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
          Review:
            "It was an Overwhelming experience. I still miss the moments I spent at K.N. Modi. I want to study once more at K.N. Modi. ",
          perImg: rachitkaushik,
          Name: "Rachit Kaushik",
          work: "ischools Connect",
        },
      ],
      applicationDeadline: "1 july",
      noScholarships: "22",
      amount: "variable",
      internationalStudents: "yes",
      scholarshipLink: "www.AAOPADHE.in",
      loanBNK:
        " K.N. MODI UNIVERSITY HAS LINKED UP WITH CANARA BANK TO FACILITATE ITS STUDENTS WHO ARE INTERESTED IN AVAILING EDUCATION LOANS.",
      email: "cu@offical.com",
      phone: "7791996354",
      hiringPartner: [],
      address:"Niwai, Jaipur",
      studentEnroll: "200,300",
      registeredInstructor: "300",
      successRate: "100",
      successStory:[
        "https://www.youtube.com/embed/cROSaIlS5AY?si=cXJ7znTQBoA2T7En",
        "https://www.youtube.com/embed/D-46QE-j3c8?si=dvAMGWQOslRng8is",
        "https://www.youtube.com/embed/eoQHB4Jjj90?si=LCd4occge-I8UGkO",
        "https://www.youtube.com/embed/4GpQ3hPW9Ro?si=QsKd-i1apsN6GLAO",
        "https://www.youtube.com/embed/cROSaIlS5AY?si=cXJ7znTQBoA2T7En",
        "https://www.youtube.com/embed/D-46QE-j3c8?si=dvAMGWQOslRng8is",
        "https://www.youtube.com/embed/eoQHB4Jjj90?si=LCd4occge-I8UGkO",
        "https://www.youtube.com/embed/4GpQ3hPW9Ro?si=QsKd-i1apsN6GLAO",
      ],
      doubtSection: [
        {
          question: "Is  K.N. Modi University good?",
          answer1:
            "It has featured among the top 10 engineering colleges in Karnataka. Over the past few years,  K.N. Modi University has won the title of best placement college in Bangalore, due to its latest and innovative teaching-learning methodology. Several reputed companies visit the campus every year for recruiting  K.N. Modi University students.",
          answer2: null,
        },
        {
          question: "Is  K.N. Modi University degree valid?",
          answer1:
            "Yes, the degree offered by  K.N. Modi University is valid.  K.N. Modi University is recognized by the University Grants Commission, which is a statutory body of the Government of India.",
          answer2: null,
        },
        {
          question: "How old is  K.N. Modi University?",
          answer1:
            "History.  K.N. Modi University was founded in 1990 by Dr. Chenraj Roychand. The core programs initially offered by the university were in the disciplines of Engineering and Management. Over the years,  K.N. Modi University has expanded its offerings to include a wide range of undergraduate and postgraduate programs.",
          answer2: null,
        },
        {
          question: "Is  K.N. Modi University UGC approved?",
          answer1:
            " K.N. Modi University is a deemed-to-be university located in Bangalore, Karnataka, India. It was declared a deemed-to-be university under section 3 of the UGC Act, 1956, in 2009.  K.N. Modi University has both government recognition and professional accreditation.",
          answer2: null,
        },
        {
          question: "Is  K.N. Modi University good for placement?",
          answer1:
            "Placements: Yes,  K.N. Modi University arranges for placement, and more than 100 students got placed this year alone. A total of 900 students received placement offers from  K.N. Modi University in various companies and MNCs.",
          answer2: null,
        },
      ],
      blogNews: [
        {
          img: marwadie1,
          data: "30",
          icon: <FaCalendarAlt />,
          month: "30th December 2024",
          hed: "Job Fair.",
          pre: "CareerPro Job Fair for Students of Quantum University",
          txt: "Read More",
          country: "Austria",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie2,
          data: "10",
          icon: <FaCalendarAlt />,
          month: "10th January 2025",
          hed: "Career Development Workshop.",
          pre: "FutureCare Career Development Workshop for Students of Quantum University",
          txt: "Read More",
          country: "Norway",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
        {
          img: marwadie3,
          data: "18",
          icon: <FaCalendarAlt />,
          month: "18th February 2025",
          hed: "Employment Seminar.",
          pre: "JobWise Employment Seminar for Students of Quantum University",
          txt: "Read More",
          country: "Sweden",
          alt: "Student Image",
          arrow: <FaArrowRight />,
        },
      ],
    },
    // {
    //   id: "icon-indore",
    //   university: "BIMTECH",
    //   courses: [],
    //   event: [
    //     {
    //       img: "event62",
    //       data: "12",
    //       month: "April, 2028",
    //       hed: "Quantum Cryptography Workshop",
    //       pre: "Explore the principles and applications of quantum cryptography",
    //       time: "9:00 am - 4:00 pm",
    //       country: "United States",
    //       alt: "Quantum Cryptography Image",
    //       arrow: <FaArrowRight />,
    //     },
    //     {
    //       img: "event63",
    //       data: "25",
    //       month: "May, 2028",
    //       hed: "Virtual Reality Gaming Summit",
    //       pre: "Discover the latest developments and trends in virtual reality gaming",
    //       time: "10:00 am - 6:00 pm",
    //       country: "Canada",
    //       alt: "Virtual Reality Gaming Image",
    //       arrow: <FaArrowRight />,
    //     },
    //     {
    //       img: "event64",
    //       data: "8",
    //       month: "June, 2028",
    //       hed: "Artificial Intelligence for Business Seminar",
    //       pre: "Learn how AI technologies can drive innovation and efficiency in business",
    //       time: "1:00 pm - 7:00 pm",
    //       country: "Germany",
    //       alt: "AI for Business Image",
    //       arrow: <FaArrowRight />,
    //     },
    //     {
    //       img: "event65",
    //       data: "20",
    //       month: "July, 2028",
    //       hed: "Digital Transformation Workshop",
    //       pre: "Discover strategies for successfully navigating digital transformation in organizations",
    //       time: "2:00 pm - 5:00 pm",
    //       country: "Australia",
    //       alt: "Digital Transformation Image",
    //       arrow: <FaArrowRight />,
    //     },
    //     {
    //       img: "event66",
    //       data: "14",
    //       month: "August, 2028",
    //       hed: "Cloud Security Summit",
    //       pre: "Explore best practices and solutions for securing cloud-based systems",
    //       time: "9:30 am - 4:30 pm",
    //       country: "India",
    //       alt: "Cloud Security Image",
    //       arrow: <FaArrowRight />,
    //     },
    //     {
    //       img: "event67",
    //       data: "3",
    //       month: "September, 2028",
    //       hed: "Blockchain Applications Conference",
    //       pre: "Learn about real-world applications of blockchain technology across industries",
    //       time: "10:00 am - 3:00 pm",
    //       country: "France",
    //       alt: "Blockchain Applications Image",
    //       arrow: <FaArrowRight />,
    //     },
    //   ],
    //   ourPlacedStudent: [
    //     {
    //       Topimg:
    //         "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
    //       Review:
    //         "I cannot forget my days at Quantum and can’t thank them enough for the wonderful friends that I have made there.",
    //       perImg: "abhishek",
    //       Name: "Abhishek saini",
    //       work: "IBM",
    //     },
    //     {
    //       Topimg:
    //         "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
    //       Review:
    //         "Thanks to the technical skills I got at Quantum, I am today working in one of the top IT companies in India.",
    //       perImg: "mohit",
    //       Name: "Mohit mittal",
    //       work: "IBM",
    //     },
    //     {
    //       Topimg:
    //         "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
    //       Review:
    //         " Quantum has not only given me education but has also helped me to build my personality, which helped me to shape my career.",
    //       perImg: "aditya",
    //       Name: "aditya sahu ",
    //       work: "Reliance industries",
    //     },
    //     {
    //       Topimg:
    //         "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
    //       Review:
    //         "I number of companies that visit Quantum for placements is simply amazing. All the students get ample chance to get placed.",
    //       perImg: "zubair",
    //       Name: "zubair",
    //       work: "Goldman sacs",
    //     },
    //     {
    //       Topimg:
    //         "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
    //       Review:
    //         "Being at Quantum was one of the greatest experiences of my life. I learnt a lot of new things to grow my career.   ",
    //       perImg: "vidushi",
    //       Name: "Vidushi Nautyial",
    //       work: "Hcl Technologies",
    //     },
    //     {
    //       Topimg:
    //         "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
    //       Review:
    //         "It was an Overwhelming experience. I still miss the moments I spent at Quantum. I want to study once more at Quantum. ",
    //       perImg: "vaishali",
    //       Name: "Vaishali Tyagi",
    //       work: "NIIT Technologies",
    //     },
    //     {
    //       Topimg:
    //         "http://htmldemo.zcubethemes.com/qeducato/img/testimonial/qt-icon.png",
    //       Review:
    //         "Nice Experience, awesome learning and well maintained discipline.",
    //       perImg: "aditi",
    //       Name: "Arpit Diwedi",
    //       work: "Infosys",
    //     },
    //   ],
    //   applicationDeadline: "1 july",
    //   noScholarships: "22",
    //   amount: "variable",
    //   internationalStudents: "yes",
    //   scholarshipLink: "www.AAOPADHE.in",
    //   loanBNK:
    //     "BIMTECH HAS ALIGNED WITH FEDERAL BANK TO FACILITATE ITS STUDENTS WHO ARE INTERESTED IN AVAILING EDUCATION LOANS.",
    //   email: "bimtech@offical.com",
    //   phone: "7791996354",
    //   hiringPartner: [{ imgurl: "imageurl" }],
    //   studentEnroll: "125,300",
    //   registeredInstructor: "300+",
    //   successRate: "100%",
    //   doubtSection: [
    //     {
    //       question: "Is BIMTECH good?",
    //       answer1:
    //         "It has featured among the top 10 engineering colleges in Karnataka. Over the past few years, BIMTECH has won the title of best placement college in Bangalore, due to its latest and innovative teaching-learning methodology. Several reputed companies visit the campus every year for recruiting BIMTECH students.",
    //       answer2: null,
    //     },
    //     {
    //       question: "Is BIMTECH degree valid?",
    //       answer1:
    //         "Yes, the degree offered by BIMTECH is valid. BIMTECH is recognized by the University Grants Commission, which is a statutory body of the Government of India.",
    //       answer2: null,
    //     },
    //     {
    //       question: "How old is BIMTECH?",
    //       answer1:
    //         "History. BIMTECH was founded in 1990 by Dr. Chenraj Roychand. The core programs initially offered by the university were in the disciplines of Engineering and Management. Over the years, BIMTECH has expanded its offerings to include a wide range of undergraduate and postgraduate programs.",
    //       answer2: null,
    //     },
    //     {
    //       question: "Is BIMTECH UGC approved?",
    //       answer1:
    //         "BIMTECH is a deemed-to-be university located in Bangalore, Karnataka, India. It was declared a deemed-to-be university under section 3 of the UGC Act, 1956, in 2009. BIMTECH has both government recognition and professional accreditation.",
    //       answer2: null,
    //     },
    //     {
    //       question: "Is BIMTECH good for placement?",
    //       answer1:
    //         "Placements: Yes, BIMTECH arranges for placement, and more than 100 students got placed this year alone. A total of 900 students received placement offers from BIMTECH in various companies and MNCs.",
    //       answer2: null,
    //     },
    //   ],
    //   blogNews: [
    //     {
    //       img: "image9",
    //       data: "28",
    //       icon: <FaCalendarAlt />,
    //       month: "28th September 2024",
    //       hed: "Employer Networking Event.",
    //       pre: "JobLink Employer Networking Event for Students of Quantum University",
    //       txt: "Read More",
    //       country: "Switzerland",
    //       alt: "Student Image",
    //       arrow: <FaArrowRight />,
    //     },
    //     {
    //       img: "image10",
    //       data: "17",
    //       icon: <FaCalendarAlt />,
    //       month: "17th October 2024",
    //       hed: "Career Fair.",
    //       pre: "CareerPlus Career Fair for Students of Quantum University",
    //       txt: "Read More",
    //       country: "Netherlands",
    //       alt: "Student Image",
    //       arrow: <FaArrowRight />,
    //     },
    //     {
    //       img: "image11",
    //       data: "6",
    //       icon: <FaCalendarAlt />,
    //       month: "6th November 2024",
    //       hed: "Internship Workshop.",
    //       pre: "InternEdge Internship Workshop for Students of Quantum University",
    //       txt: "Read More",
    //       country: "Belgium",
    //       alt: "Student Image",
    //       arrow: <FaArrowRight />,
    //     },
    //   ],
    // },
  ]);

  return (
    <Context.Provider value={university}>{props.children}</Context.Provider>
  );
};

export default UniversityContext;
export { Context };

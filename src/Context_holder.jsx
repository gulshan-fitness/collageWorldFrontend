import axios from "axios";
import React, { createContext, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Context = createContext();

export default function Context_holder(props) {


  const [selected_college, setselected_college] = useState(null);
  const [selected_stream, setselected_stream] = useState(null);
  const [colleges, setcolleges] = useState([]);

  const [course, setcourse] = useState([]);

  const [exam, setexam] = useState([]);

  const [current_exam, setcurrent_exam] = useState([]);

  const [Collage_course, setCollage_course] = useState([]);

  const [CurrentCollage_course, setCurrentCollage_course] = useState([]);

   const [PremiumAdd, setPremiumAdd] = useState([]);

  const [CurrentPremiumAdd, setCurrentPremiumAdd] = useState(null);

  const [hiring_partners, sethiring_partners] = useState([]);

  const [scholarship, setscholarship] = useState([]);
  const [doubts, setdoubts] = useState([]);
  const [post, setpost] = useState([]);
  const [event, setevent] = useState([]);
  const [placemenet, setplacemenet] = useState([]);
  const [rating, setrating] = useState([]);
  const [courserating, setcourserating] = useState([]);
  const [review, setreview] = useState([]);
  const [banner, setbanner] = useState([]);
  const [slider_banner, setslider_banner] = useState([]);
  const [story, setstory] = useState([]);
  const [faculty, setfaculty] = useState([]);
  const [agent, setagent] = useState([]);
  const [placed_students, setplaced_students] = useState([]);
  const [stream, setstream] = useState([]);
  const [currentstream, setcurrentstream] = useState([]);
  const [allusers, setallusers] = useState([]);

  const [current_user, setcurrent_user] = useState(null);

  const [current_placement, setcurrent_placement] = useState(null);
  const [currenetcolleges, setcurrenetcolleges] = useState(null);
  const [currenetcourse, setcurrenetcourse] = useState(null);
  const [current_hiring_partners, setcurrent_hiring_partners] = useState(null);
  const [current_scholarship, setcurrent_scholarship] = useState(null);
  const [current_doubt, setcurrent_doubt] = useState(null);
  const [current_post, setcurrent_post] = useState(null);

  const [current_event, setcurrent_event] = useState(null);

  const [selected_state, setselected_state] = useState(null);
  const [selected_city, setselected_city] = useState(null);
  const [statemenuIsOpen, setstateMenuIsOpen] = useState(false);
  const [citymenuIsOpen, setcityMenuIsOpen] = useState(false);
  const [search_cities, setsearch_cities] = useState([]);
  const [quill_value, setquill_value] = useState("");
  const [fact_value, setfact_value] = useState("");
  const [professor, setprofessor] = useState("");
  const [admin, setadmin] = useState(null);
  const [token, settoken] = useState(null);
  const [usertoken, setusertoken] = useState(null);
  const [user, setuser] = useState(null);

  const [college_name, setcollege_name] = useState("");
  const [course_name, setcourse_name] = useState("");
  const [stream_name, setstream_name] = useState("");
  const [college_type, setcollege_type] = useState("");
  const [college_state, setcollege_state] = useState("");
  const [college_city, setcollege_city] = useState("");
  const [course_time, setcourse_time] = useState("");
  const [duration, setduration] = useState(null);
  const [refrelUsers,setrefrelUsers]=useState([])

  const [selectedFeesRange, setselectedFeesRange] = useState({
    max: null,
    min: null,
  });

  const [specialisation, setspecialisation] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [college_searched_name, setcollege_searched_name] = useState(null);
  const [searchbar, setsearchbar] = useState(false);
  const [top10College, settop10College] = useState([]);

  const [perticulerCollegereviews, setperticulerCollegereviews] = useState([]);
  const [perticularCollegerating, setperticularCollegerating] = useState([]);

  const [placementscore, setplacementscore] = useState([]);
  const [website_blog, setwebsite_blog] = useState([]);
  const [website_news, setwebsite_news] = useState([]);
  const [currentwebsite_blog, setcurrentwebsite_blog] = useState(null);

  const [currentwebsite_news, setcurrentwebsite_news] = useState(null);

  const [userLogin_popup, setuserLogin_popup] = useState(false);
  const [userSignUp_popup, setuserSignUp_popup] = useState(false);
  const [topCourses, settopCourses] = useState([]);

  const [enquiry_value, setenquiry_value] = useState("");
  const [websitestory, setwebsitestory] = useState([]);
  const [monthly_users, setmonthly_users] = useState([]);

  const [college_enquiry_users, setcollege_enquiry_users] = useState([]);
  const [course_enquiry_users, setcourse_enquiry_users] = useState([]);
  const [city_enquiry_users, setcity_enquiry_users] = useState([]);
  const [mobilnav, setMobilnav] = useState(false);

  const [apply_popUpisOpen, setapply_popUpIsOpen] = useState(false);

  const [stream_with_colleges, setstream_with_colleges] = useState([]);
  const [state_wise_colleges, setstate_wise_colleges] = useState([]);
  const [top10College_by_city, settop10College_by_city] = useState([]);
  const [top10College_by_state, settop10College_by_state] = useState([]);

  const [top10Courses_by_state, settop10Courses_by_state] = useState([]);

  const [top10Courses_by_city, settop10Courses_by_city] = useState([]);

  const [recent_enquiry_by_city, setrecent_enquiry_by_city] = useState([]);
  const [filterHeading, setfilterHeading] = useState("");
  const [compare_popup, setcompare_popup] = useState(false);



  
  const [compare_colleges_pop_up, setcompare_colleges_pop_up] = useState(true);
  

  const [selectedCompairUniversities, setSelectedCompairUniversities] =
    useState([]);

     const [AgenciesCollageRating, setAgenciesCollageRating] = useState([]);

  const handlestateInputChange = (inputValue) => {
    setstateMenuIsOpen(!!inputValue);
  };

  const handlecityInputChange = (inputValue) => {
    setcityMenuIsOpen(!!inputValue);
  };

  const college_fetch = (id, query) => {
    let api_url = `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_COLLEGE_URL}read`;

    if (id) {
      api_url += `/${id}`;
    }
    if (query) {
      api_url += query;
    }

    axios
      .get(api_url)
      .then((success) => {
        console.log(success,"college");

        if (success.data.status === 1){

          //   if(id) {
          //   setcurrenetcolleges(success?.data?.college?.college); // Corrected the typo
          // }
         
          setcolleges(success?.data?.college?.college);
    
          
        
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const state_wise_colleges_fetch = () => {
    let api_url = `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_COLLEGE_URL}state_wise_colleges`;

    axios
      .get(api_url)
      .then((success) => {
        console.log(success);

        if (success.data.status === 1) {
          setstate_wise_colleges(success.data.state_wise_colleges);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const college_fetch_by_name = (name) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_COLLEGE_URL +
      "read_name/" +
      name;

    axios
      .get(api_url)

      .then((success) => {
        console.log(success);

        if (success.data.status === 1) {
          if (success.data.college) {
            setcollege_searched_name(success.data.college);
          }
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const college_fetch_by_ratings = () => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_COLLEGE_URL +
      "read_by_rating/";

    axios
      .get(api_url)

      .then((success) => {
        console.log(success);

        if (success.data.status === 1) {
          if (success.data.topColleges) {
            settop10College(success.data.topColleges);
          }
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const top10_college_fetch_by_city = (city) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_COLLEGE_URL +
      "top10_colleges_by_city/" +
      city;

    axios
      .get(api_url)

      .then((success) => {
        console.log(success);

        if (success.data.status === 1) {
          settop10College_by_city(success.data.topColleges);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const top10_college_fetch_by_state = (state) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_COLLEGE_URL +
      "top10_colleges_by_state/" +
      state;

    axios
      .get(api_url)

      .then((success) => {
        console.log(success,"topColleges");

        if (success.data.status === 1) {
          settop10College_by_state(success.data.topColleges);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const top10_course_fetch_by_city = (city) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_COURSE_URL +
      "top10course_by_city/" +
      city;

    axios
      .get(api_url)

      .then((success) => {
        console.log(success);

        if (success.data.status === 1) {
          settop10Courses_by_city(success.data.topCourses);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const top10_course_fetch_by_state = (state) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_COURSE_URL +
      "top10course_by_state/" +
      state;

    axios
      .get(api_url)

      .then((success) => {
        console.log(success);

        if (success.data.status === 1) {
          settop10Courses_by_state(success.data.topCourses);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const recent_enquiry_fetch_city_wise = (city) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_USER_URL +
      "get_users_recent_enquiry_city_wise/" +
      city;

    axios
      .get(api_url)

      .then((success) => {
        console.log(success);

        if (success.data.status === 1) {
          setrecent_enquiry_by_city(success.data.colleges.usersWithColleges);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const course_fetch = (id, query) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_COURSE_URL +
      "read";

    if (id) {
      api_url += "/" + id;
    }

    if (query) {
      api_url += query;
    }

    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {
          if (success.data.course) {
            setcourse(success.data.course);
          }

          if (success.data.perticuler_course) {
            setcurrenetcourse(success.data.perticuler_course);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Examfetch = (id, query) => {

    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_EXAM_URL +
      "read";

    if (id) {
      api_url += "/" + id;
    }

    if (query) {

      api_url += query;

    }

    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {



          if (!id) {
            setexam(success.data.exams);
          }

           

          else  setcurrent_exam(success.data.perticuler_exam);


          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const RefrelUsersFetch=(id)=> { 

    console.log(id,"sbdhsbdh");
    
    axios.get(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_USER_URL}get_RefrelUsers/${id}`)

    .then((response)=>{
       console.log(response);

        if (response.data.status===1) {
setrefrelUsers(response.data.RefrelUsers)
        }

      })
      .catch((error) => {
         
  
        
        })}

  const collage_course_fetch = (id,collage_id, query) => {


    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_COLLAGECOURSE_URL +
      "read";

    
      api_url += "/" + id + "/" + collage_id;
    
     
 
    

    

    if (query) {
      api_url += query;
    }

    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {
         

          if (id) {

            setCurrentCollage_course(success.data.perticuler_course);

          }




          else setCollage_course(success.data.courses);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const top10course_fetch = () => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_COLLAGECOURSE_URL +
      "read_top10course";

    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {
          settopCourses(success.data.topCourses);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const hiring_partners_fetch = (id,collage_id) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_HIRING_PARTNERS_URL +
      "read";

 
      api_url += "/" + id + "/" + collage_id;
    
   

    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {
          if (!id) {
            sethiring_partners(success.data.hiring_partners);
          }

     
           else setcurrent_hiring_partners(success.data.current_hiring_partners);
        
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const scholarship_fetch = (id,collage_id) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_SCHOLARSHIP_URL +
      "read";

    
      api_url += "/" + id +"/"+collage_id;
  

    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {
          if (!id) {
            setscholarship(success.data.scholarship);
          } else {
            setcurrent_scholarship(success.data.scholarship);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const doubts_fetch = (id,collage_id) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_DOUBTS_URL +
      "read";

   
      api_url += "/" + id +"/"+collage_id;
  

    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {
          if (!id) {
            setdoubts(success.data.doubts);
          }
          
          else  setcurrent_doubt(success.data.current_doubts);
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const posts_fetch = (id,collage_id) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_POST_URL +
      "read";

 
      api_url += "/" + id +"/"+collage_id;
    

    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {
          if (!id) {
            setpost(success.data.post);
          }
          if (success.data.current_post) {
            setcurrent_post(success.data.current_post);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const website_blog_fetch = (id, query) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_WEBSITE_BLOG_URL +
      "read";

    if (id) {
      api_url += "/" + id;
    }
    if (query) {
      api_url += query;
    }

    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {
          if (Array.isArray(success.data.post)) {
            setwebsite_blog(success.data.post);
          } else {
            setcurrentwebsite_blog(success.data.post);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


   const AgenciesRatingsfetch = (id, agencyname) => {

    let api_url =

      process.env.REACT_APP_API_BASE_URL+
      process.env.REACT_APP_AGENCIES_URL+
      "read";
      
    if (id) {
      api_url += "/" + id;
    }

    if (agencyname) {
      api_url += "/"+agencyname;
    }


    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {
        
          setAgenciesCollageRating(success.data.AgenciesCollageRating)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const website_news_fetch = (id, query) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_WEBSITE_NEWS_URL +
      "read";

    if (id) {
      api_url += "/" + id;
    }
    if (query) {
      api_url += query;
    }

    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {
          if (Array.isArray(success.data.news)) {
            setwebsite_news(success.data.news);
          } else {
            setcurrentwebsite_news(success.data.news);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const event_fetch = (id,collage_id, query) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_EVENT_URL +
      "read";

 
      api_url += "/"+id+"/"+collage_id   ;
    

    if (query) {
      api_url += query;
    }

    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {
          if (!id) {
            setevent(success.data.event);
          }
          if (success.data.current_event) {
            setcurrent_event(success.data.current_event);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const placement_fetch = (id,collage_id) => {

    let api_url =process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_PLACEMENT_URL +
      "read";

   
      api_url += "/"+id+"/"+collage_id;
    

    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {
          if (!id) {
            setplacemenet(success.data.placement);
          } 
          else {
            setcurrent_placement(success.data.placement);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rating_fetch = (id) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_RATING_URL +
      "read";

    if (id) {
      api_url += "/" + id;
    }

    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {
          if (success.data.rating) {
            setrating(success.data.rating);
          }

          if (success.data.perticularCollegerating) {
            setperticularCollegerating(success.data.perticularCollegerating);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const review_fetch = (id) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_REVIEW_URL +
      "read";

    if (id) {
      api_url += "/" + id;
    }

    axios
      .get(api_url)
      .then((success) => {
        if (success.data.status === 1) {
          if (success.data.review) {
            setreview(success.data.review);
          }

          if (success.data.perticulerCollegesreview) {
            setperticulerCollegereviews(success.data.perticulerCollegesreview);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const banners_fetch = (id) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_BANNER_URL +
      "read";

    if (id) {
      api_url += "/" + id;
    }

    axios
      .get(api_url)
      .then((success) => {
        if (success.data.status === 1) {
          setbanner(success.data.banner);

          console.log(success.data.banner);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const slider_banners_fetch = (id) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_SLIDER_BANNER_URL +
      "read";

    if (id) {
      api_url += "/" + id;
    }

    axios
      .get(api_url)

      .then((success) => {
        if (success.data.status === 1) {
          setslider_banner(success.data.banner);
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const story_fetch = (id,college) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_STORY_URL +
      "read";

   
      api_url += "/" + id+"/"+college;
  

    axios
      .get(api_url)
      .then((success) => {
        if (success.data.status === 1) {
          setstory(success.data.story);
        }
      })

      .catch((error) => {
        console.log(error);
      });

  };

  const websitestory_fetch = (id) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_WEBSITE_STORIES_URL +
      "read";

    if (id) {
      api_url += "/" + id;
    }

    axios
      .get(api_url)
      .then((success) => {
        if (success.data.status === 1) {
          setwebsitestory(success.data.websitestory);
        }
      })
      .catch((error) => {});
  };

  const course_rating_fetch = (id) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_COURSE_RATING_URL +
      "read";

    if (id) {
      api_url += "/" + id;
    }

    axios
      .get(api_url)

      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {
          setcourserating(success.data.rating);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const faculty_fetch = (id,college_id) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_FACULTY_URL +
      "read";

   
      api_url += "/" + id+ "/"+college_id;
  

    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {
          setfaculty(success.data.faculty);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const agent_fetch = (id,college_id,query) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_AGENT_URL +
      "read";


      api_url += "/" + id+"/" + college_id;


    if (query) {
      api_url += "?" + query;
    }

    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {
          setagent(success.data.agent);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const placed_students_fetch = (id,college_id) => {

    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_PLACED_STUDENTS_URL +
      "read";


      api_url += "/" + id+"/"+college_id;
  

    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {
          setplaced_students(success.data.placed_students);
        }

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const users_fetch = (id, query) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_USER_URL +
      "read";

    if (id) {
      api_url += "/" + id;
    }

    if (query) {
      api_url += query;
    }

    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {
          if (Array.isArray(success.data.all_users.users)) {
            setallusers(success.data.all_users);
          } else {
            setcurrent_user(success.data.all_users);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const monthly_users_fetch = () => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_USER_URL +
      "read_monthly_users";

    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {
          setmonthly_users(success.data.monthly_users);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const college_enquiry_users_fetch = () => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_USER_URL +
      "get_users_by_colleges_enquiry";

    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {

          setcollege_enquiry_users(success.data.collegeUserCounts);
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const course_enquiry_users_fetch = () => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_USER_URL +
      "user_by_course_enquiry";

    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {
          setcourse_enquiry_users(success.data.courseUserCounts);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const city_enquiry_users_fetch = () => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_USER_URL +
      "user_by_city_enquiry";

    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {
          setcity_enquiry_users(success.data.cityUserCounts);
        }

      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const stream_fetch = (id) => {
  //   let api_url =
  //     process.env.REACT_APP_API_BAS +
  //     process.env.REACT_APP_STREAM_URL +
  //     "read";

  //   if (id) {
  //     api_url += "/" + id;
  //   }

  //   axios
  //     .get(api_url)
  //     .then((success) => {
  //       console.log("success:", success);

  //       if (success.data.status === 1) {
  //         if (success.data.stream) {
  //           setstream(success.data.stream);
  //         }

  //         if (success.data.current_stream) {
  //           setcurrentstream(success.data.current_stream[0]);
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const stream_fetch = (id) => {

    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_STREAM_URL +
      "read";

    if (id) {
      api_url += "/" + id;
    }

    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {
          if (success.data.stream) {
            setstream(success.data.stream);
          }

          if (success.data.current_stream) {
            setcurrentstream(success.data.current_stream[0]);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


   const PremiumAdfetch = (id,collage_id) => {

    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_PREMIUMAD_URL + "read";


      api_url += "/"+id+"/"+collage_id;
    

    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {

        if (!id&&!collage_id) {

            setPremiumAdd(success.data.premiumAD);

          } 
          else {
            console.log("CurrentPremiumAdd ho gaya");
            

            setCurrentPremiumAdd(success.data.premiumAD);

          }

        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
 
  const stream_with_colleges_fetch = (id) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_STREAM_URL +
      "state_wise_stream";

    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {
          if (success.data.stream_colleges) {
            setstream_with_colleges(success.data.stream_colleges);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const placement_score_fetch = (id,college_id) => {
    let api_url =
      process.env.REACT_APP_API_BASE_URL +
      process.env.REACT_APP_PLACEMENT_SCORE_URL +
      "read";

  
      api_url += "/" + id+"/"+college_id  ;
  

    axios
      .get(api_url)
      .then((success) => {
        console.log("success:", success);

        if (success.data.status === 1) {
          setplacementscore(success.data.placementscore);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };




    const  verifyAdmin= async (id, token) => {
      if(!id || !token) return
   


    await  axios.get(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_ADMIN_URL}AdminVerify/${id}`,
      {headers:{Authorization: token}}
   )
        .then((response) => {
          

          
          if (response.data.status === 1) {

          
          
            setadmin(response.data.admin)
            settoken(response.data.token)

            localStorage.setItem("admin",JSON.stringify(response.data.admin))
            localStorage.setItem("token",response.data.token)
          }
       
        })
        .catch((error) => {
          console.error(error)
        })


    }

  let menu_links = [

  

    {
      name: "College",
      url: "",

      subitems: [

     { name: "Add", url: "college/add" },

        { name: "View", url: "college/view"},

      ],
    },


    {
      name: "College Course",
      url: "",

      subitems: [
        ,
        { name: "Add", url: "college_course/add" },
        { name: "View", url: "college_course/view" },
      ],
    },




    

    {
      name: "Hiring Partners",
      url: "",

      subitems: [
        { name: "Add", url: "hiring_partners/add" },
        { name: "View", url: "hiring_partners/view" },
      ],
    },

    {
      name: "Scholarship",
      url: "",

      subitems: [
        { name: "Add", url: "scholarship/add" },
        { name: "View", url: "scholarship/view" },
      ],
    },

    {
      name: "FAQ",
      url: "",

      subitems: [
        { name: "Add", url: "Doubts/add" },
        { name: "View", url: "Doubts/view" },
      ],
    },

    {
      name: "Post",
      url: "",

      subitems: [
        { name: "Add", url: "post/add" },
        { name: "View", url: "post/view" },
      ],
    },


    {
      name: "Event",
      url: "",
      subitems: [
        { name: "Add", url: "event/add" },
        { name: "View", url: "event/view" },
      ],
    },

    {
      name: "Placement paragraph",
      url: "",

      subitems: [
        { name: "Add", url: "placement/add" },
        { name: "View", url: "placement/view" },
      ],
    },

  

 

  

   

    {
      name: "Students Stories",
      url: "",

      subitems: [
        { name: "Add", url: "students_stories/add" },
        { name: "View", url: "students_stories/view" },
      ],
    },

 
    {
      name: "Faculty",
      url: "",

      subitems: [
        { name: "Add", url: "faculty/add" },
        { name: "View", url: "faculty/view" },
      ],
    },

   

    {
      name: "Placed Students",
      url: "",

      subitems: [
        { name: "Add", url: "placed_students/add" },
        { name: "View", url: "placed_students/view" },
      ],
    },




   

    {
      name: "Placement Score ",
      url: "",

      subitems: [
        { name: "Add", url: "placement_score/add" },
        { name: "View", url: "placement_score/view" },
      ],
    },
  ];

  if(admin?.role!=="subadmin"){

    menu_links.unshift({
      name: "Dashboard",
      url: "/admin",
    }, )

    menu_links=[   ...menu_links,
         {
      name: "PremiumADS",
      url: "",

      subitems: [
        ,
        { name: "Add", url: "premiumad/add" },
        { name: "View", url: "premiumad/view" },
      ],
    },

   

    {
      name: "Stream",
      url: "",

      subitems: [
        ,
        { name: "Add", url: "stream/add" },
        { name: "View", url: "stream/view" },
      ],
    },


  



    
    {
      name: "Course",
      url: "",

      subitems: [
        ,
        { name: "Add", url: "course/add" },
        { name: "View", url: "course/view" },
      ],
    },   {
      name: "Exams ",
      url: "",

      subitems: [
        ,
        { name: "Add", url: "exam/add" },
        { name: "View", url: "exam/view" },
      ],
    },
      {
      name: "College Rating",
      url: "",

      subitems: [
        { name: "Add", url: "rating/add" },
        { name: "View", url: "rating/view" },
      ],
    },   {
      name: "Review",
      url: "",

      subitems: [
        { name: "Add", url: "review/add" },
        { name: "View", url: "review/view" },
      ],
    }, 
          {
      name: "Agencies Rating",
      url: "",

      subitems: [
        { name: "Add", url: "agencies/add" },
        { name: "View", url: "agencies/view" },
      ],
    },

     {
      name: "Agent",
      url: "",

      subitems: [
        { name: "Add", url: "agent/add" },
        { name: "View", url: "agent/view" },
      ],
    },

     {
      name: "Banners",
      url: "",
      subitems: [
        { name: "Add", url: "banner/add" },
        { name: "View", url: "banner/view" },
      ],
    },

    {
      name: "Slider Banners",
      url: "",
      subitems: [
        { name: "Add", url: "slider_banner/add" },
        { name: "View", url: "slider_banner/view" },
      ],

    },
       {
      name: "Course Rating",
      url: "",

      subitems: [
        { name: "Add", url: "course_rating/add" },
        { name: "View", url: "course_rating/view" },
      ],
    },
     {
      name: "Website Story",
      url: "",

      subitems: [
        { name: "Add", url: "website_story/add" },
        { name: "View", url: "website_story/view" },
      ],
    },

    
    {
      name: "website Blog",
      url: "",

      subitems: [
        { name: "Add", url: "website_blog/add" },
        { name: "View", url: "website_blog/view" },
      ],
    },

    {
      name: "website News",
      url: "",

      subitems: [
        { name: "Add", url: "website_news/add" },
        { name: "View", url: "website_news/view" },
      ],
    },
   ]


  
   
  
 
  }


  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"];

  const search_query_clear = () => {
    localStorage.removeItem("course_name");
    localStorage.removeItem("course_time");
    localStorage.removeItem("stream_name");
    localStorage.removeItem("college_name");
    localStorage.removeItem("college_state");
    localStorage.removeItem("college_city");
    localStorage.removeItem("college_type");
    localStorage.removeItem("duration");
    localStorage.removeItem("selectedFeesRange");

    localStorage.removeItem("specialisation");

    localStorage.removeItem("min_fees");
    localStorage.removeItem("max_fees");

    setcollege_name("");
    setcourse_name("");
    setstream_name("");
    setcollege_type("");
    setcollege_state("");
    setcollege_city("");
    setcourse_time("");
    setduration(null);

    setselectedFeesRange({
      max: null,
      min: null,
    });
    setspecialisation("");
  };

  const rounded_rating = (number) => {
    if (number === undefined || number === null || isNaN(number)) {
      return 0;
    }

    let decimalPart = number % 1; // Get the decimal part of the number
    let integerPart = Math.floor(number); // Get the integer part of the number

    if (decimalPart === 0.5) {
      return number; // Return the number as it is if decimal part is exactly 0.5
    } else if (decimalPart > 0.5) {
      return Math.ceil(number); // Round up if decimal part is greater than 0.5
    } else {
      return integerPart; // Remove the decimal part if it is less than 0.5
    }
  };

  const userlogout_handler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("usertoken");

    setuser(null);
    setusertoken(null);
  };

  const notify = (msg, status) => {
    toast(msg, {
      position: "top-right",
      type: status === 1 ? "success" : "error",
    });
  };

  const best_colleges_in_cities_array = [
    "Jaipur",
    "Bhopal",
    "Vadodra",
    "Indore",
    "PaniPath",
    "Chandigarh",
    "Mumbai",
    "Delhi",
    "Muradabad",
    "Haldwani",
    "Hisar",
  ];

  const best_colleges_in_courses_array = [
    "BCA",
    "BBA",
    "B.Com",
    "B.Tech",
    "BA",
    "B.Sc",
    "BBA Dual",
    "B.Com Honours",
    "B.Pharma",
  ];

  const best_colleges_in_pg_courses_array = [
    "MBA",
    "MCA",
    "M.Tech",
    "M.Com",
    "MA",
    "PG Diploma",
    "LLM",
    "MBBS",
    "LLB",
    "PhD",
    "HM",
  ];

  const ScrollComponent = () => {
    document.getElementById("page_on_the_top").scrollIntoView({
      behavior: "auto", // Change 'smooth' to 'auto' for instant scroll
      block: "start",
    });
  };

  return (
    <Context.Provider
      value={{
        college_fetch,
        colleges,
        setcolleges,
        selected_college,
        setselected_college,
        selected_state,
        setselected_state,
        selected_city,
        setselected_city,
        statemenuIsOpen,
        setstateMenuIsOpen,
        citymenuIsOpen,
        setcityMenuIsOpen,
        search_cities,
        setsearch_cities,
        handlestateInputChange,
        handlecityInputChange,
        currenetcolleges,
        setcurrenetcolleges,
        course_fetch,
        course,
        currenetcourse,
        Collage_course, setCollage_course,CurrentCollage_course, setCurrentCollage_course,collage_course_fetch,
       current_hiring_partners,
        hiring_partners_fetch,
        hiring_partners,
        scholarship_fetch,
        current_scholarship,
        scholarship,
        doubts_fetch,
        quill_value,
        setquill_value,
        current_doubt,
        doubts,
        posts_fetch,
        current_post,
        post,
        event_fetch,
        current_event,
        event,
        fact_value,
        setfact_value,
        professor,
        setprofessor,
        placement_fetch,
        placemenet,
        current_placement,
        rating_fetch,
        rating,
        review_fetch,
        review,
        banners_fetch,
        banner,
        story_fetch,
        story,
        course_rating_fetch,
        courserating,
        faculty_fetch,
        faculty,
        agent_fetch,
        agent,
        placed_students_fetch,
        placed_students,
        admin,
        setadmin,
        menu_links,
        token,
        settoken,
        user,
        setuser,
        usertoken,
        setusertoken,
        users_fetch,
        monthly_users_fetch,
        monthly_users,
        stream_fetch,
        stream,
        currentstream,
        selected_stream,
        setselected_stream,
        slider_banners_fetch,
        slider_banner,
        monthNames,
        college_name,
        setcollege_name,
        course_name,
        setcourse_name,
        stream_name,
        setstream_name,
        college_type,
        setcollege_type,
        college_state,
        setcollege_state,
        college_city,
        setcollege_city,
        course_time,
        setcourse_time,
        duration,
        setduration,
        selectedFeesRange,
        setselectedFeesRange,
        specialisation,
        setspecialisation,
        search_query_clear,
        collegeName,
        setCollegeName,
        courseName,
        setCourseName,
        college_searched_name,
        setcollege_searched_name,
        college_fetch_by_name,
        searchbar,
        setsearchbar,
        top10College,
        college_fetch_by_ratings,
        perticulerCollegereviews,
        perticularCollegerating,
        rounded_rating,
        placement_score_fetch,
        placementscore,
        website_blog_fetch,
        currentwebsite_blog,
        website_blog,
        notify,
        userSignUp_popup,
        setuserSignUp_popup,
        userLogin_popup,
        setuserLogin_popup,
        top10course_fetch,
        topCourses,
        enquiry_value,
        setenquiry_value,
        allusers,
        currentwebsite_news,
        website_news,
        website_news_fetch,
        websitestory,
        websitestory_fetch,
        userlogout_handler,
        college_enquiry_users_fetch,
        college_enquiry_users,
        course_enquiry_users,
        course_enquiry_users_fetch,
        city_enquiry_users_fetch,
        city_enquiry_users,
        mobilnav,
        setMobilnav,
        apply_popUpisOpen,
        setapply_popUpIsOpen,
        best_colleges_in_cities_array,
        best_colleges_in_courses_array,
        best_colleges_in_pg_courses_array,
        stream_with_colleges,
        setstream_with_colleges,
        stream_with_colleges_fetch,
        state_wise_colleges_fetch,
        state_wise_colleges,
        ScrollComponent,
        top10College_by_city,
        top10_college_fetch_by_city,
        top10College_by_state,
        top10_college_fetch_by_state,

        top10_course_fetch_by_city,
        top10Courses_by_city,
        top10_course_fetch_by_state,
        top10Courses_by_state,
        recent_enquiry_by_city,
        recent_enquiry_fetch_city_wise,
        filterHeading,
        setfilterHeading,
        compare_popup,
        setcompare_popup,
        compare_colleges_pop_up,
        setcompare_colleges_pop_up,
        selectedCompairUniversities,
        setSelectedCompairUniversities,Examfetch,exam,current_exam,AgenciesCollageRating, setAgenciesCollageRating,AgenciesRatingsfetch,refrelUsers,setrefrelUsers,RefrelUsersFetch,verifyAdmin,CurrentPremiumAdd,setCurrentPremiumAdd,PremiumAdd,setPremiumAdd,PremiumAdfetch
      }}
    >
      {props.children}

      <ToastContainer />
    </Context.Provider>
  );
}

export { Context };

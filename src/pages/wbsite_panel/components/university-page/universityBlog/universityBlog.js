import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../../../Context_holder';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
// import { format } from 'date-fns';

const BlogPost2 = () => {
const {id}=useParams()
    const{ posts_fetch,current_post}=useContext(Context)
    

    const [ current_data,setcurrent_data]=useState(null)
    useEffect(
        ()=>{

            posts_fetch(null,id)


        },[id]
    )
    useEffect(
        ()=>{

            setcurrent_data(current_post)
        },[current_post]
    )
    
    const date=new Date(current_data?.createdAt)




    const day = String(date.getDate()).padStart(2, '0');       // "17"
    const month = String(date.getMonth() + 1).padStart(2, '0'); // "08"
    const year = date.getFullYear();      
   
   console.log( day,month,year);
   

 
   
 

  return (
    <div className='w-[100%] flex justify-center'>
    <div className="bg-white-100 p-6 rounded-lg shadow-2xl w-[87%] my-12 ">
      <h1 className="text-2xl font-bold mb-8 mt-4 text-center ">{current_data?.heading}</h1>
      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Author:{current_data?.author} </span>
        <span className="text-gray-600">Date:{`${day}-${month}-${year}`}</span>
      </div>
      <p className="text-gray-800 mb-4 mt-2">
        <strong className='preview'>{ current_data?.post&& parse(current_data?.post)}</strong>
      </p>
      {/* <div className="blog-content">
        <h2 className="font-bold mt-4">Why Choose  Dr. K.N. Modi University ?</h2>
        <p>
           Dr. K.N. Modi University  is renowned for its commitment to academic excellence, innovative programs, and holistic development of students. Here are some compelling reasons why  Dr. K.N. Modi University  is the top choice for future leaders:
        </p>
        <h3 className='text-md font-bold mt-4'>1. Academic Excellence</h3>
        <p>
          Our faculty comprises experienced professionals and scholars who impart quality education and mentor students to achieve their full potential.
        </p>
        <h3 className='text-md font-bold mt-4'>2. Innovative Programs</h3>
        <p>
          We offer cutting-edge programs in emerging fields such as artificial intelligence, data science, digital marketing, and more, ensuring that our graduates are industry-ready.
        </p>
        <h3 className='text-md font-bold mt-4'>3. Holistic Development</h3>
        <p>
          At  Dr. K.N. Modi University , we focus on nurturing not just academic prowess but also critical thinking, leadership skills, and ethical values, preparing students for global challenges.
        </p>
        <h3 className='text-md font-bold mt-4'>4. Industry Partnerships</h3>
        <p>
          Our strong collaborations with leading industry players provide students with internship opportunities, industry projects, and networking avenues, enhancing their employability.
        </p>
        <h3 className='text-md font-bold mt-4'>5. Global Exposure</h3>
        <p>
          Through international exchange programs, study tours, and cultural events, students gain exposure to diverse cultures, perspectives, and global best practices.
        </p>
        <h3 className='text-md font-bold mt-4'>6. Career Support</h3>
        <p>
          Our career development services assist students in securing internships, placements, and entrepreneurial opportunities, paving the way for successful careers.
        </p>
        <h2 className="font-bold mt-4">Join  Dr. K.N. Modi University  Today!</h2>
        <p>
          Experience a transformative learning journey at  Dr. K.N. Modi University  and unlock your potential to lead, innovate, and thrive in the dynamic world of tomorrow.
        </p>
      </div> */}
      {/* SEO meta tags */}

{/* 
      <meta name="description" content={Read the blog post "${title}" by ${author}.} />
      <meta name="keywords" content=" Dr. K.N. Modi University , future leaders, academic excellence, innovative programs" />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" /> */}

    </div>
    </div>
  );
};

export default BlogPost2;
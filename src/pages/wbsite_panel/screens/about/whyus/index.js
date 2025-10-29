import React from 'react';
import { AiFillCheckCircle } from "react-icons/ai";
import { SiBookstack } from "react-icons/si";
import { BsTrophyFill } from 'react-icons/bs';
import { CiDeliveryTruck } from 'react-icons/ci';

const WhyUs = () => {
    return (
        <div className="w-full flex justify-center px-4 lg:px-0 bg-gradient-to-b from-[#18092f] via-purple-900 to-[#18092f] ">
            <div className='w-[90%] flex py-12 justify-around flex-wrap'>
                <div className='w-full lg:w-[45%]'>
                    <h3 className='text-4xl mb-4  font-semibold shadow-xl  bg-white rounded'>Why Choose Us</h3>
                    <div className='text-[16px] text-[white] '>
                        At AAOPADHE.com, we empower students by connecting them with the best colleges and courses, 
                        all based on genuine student ratings and feedback. Our mission is to provide transparent 
                        and comprehensive information to help you make informed decisions about your education. 
                        Discover the campuses, meet the professors, and see the success stories of students 
                        who have secured placements through our recommendations.
                    </div>
                    <div className='py-3'>
                        <div className='flex py-2 items-center'>
                            <AiFillCheckCircle className='text-[30px] text-[pink] mr-1' />
                            <div className='text-[16px] text-[green]'>Expert College Recommendations</div>
                        </div>
                        <div className='flex items-center'>
                            <AiFillCheckCircle className='text-[30px] text-[pink] mr-1' />
                            <div className='text-[16px] text-[green]'>Detailed Course Insights</div>
                        </div>
                        <div className='flex py-2 items-center'>
                            <AiFillCheckCircle className='text-[30px] text-[pink] mr-1' />
                            <div className='text-[16px] text-[green]'>Comprehensive Campus Reviews</div>
                        </div>
                    </div>
                </div>
                <div className='w-full lg:w-[45%] p-5  bg-[white]  text-black rounded-xl'>
                    <div className='flex items-center mt-1'>
                        <SiBookstack className='text-[50px] mr-4'/>
                        <div className='relative'>
                            <div className='text-[40px] font-bold ' >1000<span style={{ fontSize:"20px" ,position :'absolute' }}>+</span></div>
                            <div className='text-[16px] '>Colleges Recommended</div>
                        </div>
                    </div>
                    <div className='flex items-center mt-3'>
                        <CiDeliveryTruck className='text-[40px]  mr-4' />
                        <div>
                            <div className='text-[40px] font-bold '>500<span style={{ fontSize: "20px", position: 'absolute' }}>+</span></div>
                            <div className='text-[16px] '>Courses Offered</div>
                        </div>
                    </div>
                    <div className='flex items-center mt-3'>
                        <BsTrophyFill className='text-[40px] mr-4' />
                        <div>
                            <div className='text-[40px] font-bold '>300<span style={{ fontSize: "20px", position: 'absolute' }}>+</span></div>
                            <div className='text-[16px] '>Success Stories</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhyUs;

import React, { useState, useRef } from 'react';
import { FaUserGraduate, FaUserTie } from 'react-icons/fa';
import { GiFlowerEmblem } from 'react-icons/gi';
import { BsFillTrophyFill } from 'react-icons/bs';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';

const OurFacilities = () => {
    const [count, setCount] = useState(false);
    const triggerRef = useRef(null);

    return (
        <div ref={triggerRef} className='bg-gradient-to-b from-[#18092f] via-purple-900 to-[#18092f] '>
            <ScrollTrigger onEnter={() => setCount(true)} onExit={() => setCount(false)}>
                <div className="py-10">
                    <div className="md:flex justify-around">
                        <div className='flex md:w-[23%] w-[90%] mx-auto border-gray-100 md:border-b-0 md:border-r justify-center py-5 gap-4 items-center flex-col bg-[#f7b156] rounded-lg shadow-lg mt-2'>
                            <div className='flex border-2 w-[50px] justify-center rounded-full items-center border-[red] h-[50px]'>
                                <FaUserGraduate className='text-[30px] text-[red]' />
                            </div>
                            <div className='text-[40px] font-bold text-[red]'>
                                {count && <CountUp start={0} end={550} duration={3} delay={0} />}+
                            </div>
                            <div className='text-[black] text-center text-lg'>
                                **Enrolled Students**<br />
                                Join a dynamic community of over 550 aspiring professionals dedicated to personal and academic growth.
                            </div>
                        </div>
                        <div className='flex md:w-[23%] w-[90%] mx-auto border-gray-100 md:border-b-0 md:border-r justify-center bg-[#00c9a7] py-5 gap-4 items-center flex-col rounded-lg shadow-lg mt-2'>
                            <div className='flex border-2 w-[50px] justify-center rounded-full items-center border-[#f2cd32] h-[50px]'>
                                <FaUserTie className='text-[30px] text-[#f2cd32]' />
                            </div>
                            <div className='text-[40px] font-bold text-[#f2cd32]'>
                                {count && <CountUp start={0} end={75} duration={3} delay={0} />}+
                            </div>
                            <div className='text-[#fff] text-center text-lg'>
                                **Expert Instructors**<br />
                                Learn from over 75 dedicated instructors, passionate about nurturing the next generation of leaders and innovators.
                            </div>
                        </div>
                        <div className='flex md:w-[23%] w-[90%] mx-auto border-gray-100 md:border-b-0 md:border-r justify-center py-5 gap-4 items-center flex-col bg-[#fbeaff] rounded-lg shadow-lg mt-2'>
                            <div className='flex border-2 w-[50px] justify-center rounded-full items-center border-[#f2cd32] h-[50px]'>
                                <GiFlowerEmblem className='text-[30px] text-[#f2cd32]' />
                            </div>
                            <div className='text-[40px] font-bold text-[#f2cd32]'>
                                {count && <CountUp start={0} end={100} duration={3} delay={0} />}+
                            </div>
                            <div className='text-black text-center text-lg px-1'>
                                **Certified Courses**<br />
                                Explore a diverse selection of over 100 certified courses designed to empower you with essential skills for the future.
                            </div>
                        </div>
                        <div className='flex md:w-[23%] w-[90%] mx-auto justify-center py-5 gap-4 items-center flex-col bg-[#a24156] rounded-lg shadow-lg mt-2'>
                            <div className='flex border-2 w-[50px] justify-center rounded-full items-center border-[#f2cd32] h-[50px]'>
                                <BsFillTrophyFill className='text-[30px] text-[#f2cd32]' />
                            </div>
                            <div className='text-[40px] font-bold text-[#f2cd32]'>
                                {count && <CountUp start={0} end={10} duration={3} delay={0} />}+
                            </div>
                            <div className='text-[#fff] text-center text-lg px-1'>
                                **Education Awards**<br />
                                Recognized with 10 prestigious awards for our commitment to educational excellence and innovation in teaching.
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollTrigger>
        </div>
    );
}

export default OurFacilities;



// import React, { useState } from 'react';
// import { FaUserGraduate, FaUserTie } from 'react-icons/fa';
// import { GiFlowerEmblem } from 'react-icons/gi';
// import { BsFillTrophyFill } from 'react-icons/bs';
// import CountUp from 'react-countup';
// import ScrollTrigger from 'react-scroll-trigger';

// const OurFacilities = () => {
//     const [count, setCount] = useState(false);

//     return (
//         <ScrollTrigger onEnter={() => setCount(true)} onExit={() => setCount(false)}>
//             <div className="py-10 ">
//                 <div className="md:flex justify-around">
//                     <div className='flex md:w-[23%] w-[90%] mx-auto border-gray-100 md:border-b-0 md:border-r justify-center py-5 gap-4 items-center flex-col bg-[#f7b156] rounded-lg shadow-lg'>
//                         <div className='flex border-2 w-[50px] justify-center rounded-full items-center border-[red] h-[50px]'>
//                             <FaUserGraduate className='text-[30px] text-[red]' />
//                         </div>
//                         <div className='text-[40px] font-bold text-[red]'>
//                             {count && <CountUp start={0} end={550} duration={3} delay={0} />}+
//                         </div>
//                         <div className='text-[black]  text-center text-lg'>
//                             **Enrolled Students**<br />
//                             Join a dynamic community of over 550 aspiring professionals dedicated to personal and academic growth.
//                         </div>
//                     </div>
//                     <div className='flex md:w-[23%] w-[90%] mx-auto border-gray-100 md:border-b-0 md:border-r justify-center bg-[#00c9a7]  py-5 gap-4 items-center flex-col bg-[#003366] rounded-lg shadow-lg'>
//                         <div className='flex border-2 w-[50px] justify-center rounded-full items-center border-[#f2cd32] h-[50px]'>
//                             <FaUserTie className='text-[30px] text-[#f2cd32]' />
//                         </div>
//                         <div className='text-[40px] font-bold text-[#f2cd32]'>
//                             {count && <CountUp start={0} end={75} duration={3} delay={0} />}+
//                         </div>
//                         <div className='text-[#fff] text-center text-lg '>
//                             **Expert Instructors**<br />
//                             Learn from over 75 dedicated instructors, passionate about nurturing the next generation of leaders and innovators.
//                         </div>
//                     </div>
//                     <div className='flex md:w-[23%] w-[90%] mx-auto border-gray-100 md:border-b-0 md:border-r justify-center py-5 gap-4 items-center flex-col bg-[#fbeaff]  rounded-lg shadow-lg'>
//                         <div className='flex border-2 w-[50px] justify-center rounded-full items-center border-[#f2cd32] h-[50px]'>
//                             <GiFlowerEmblem className='text-[30px] text-[#f2cd32]' />
//                         </div>
//                         <div className='text-[40px] font-bold text-[#f2cd32]'>
//                             {count && <CountUp start={0} end={100} duration={3} delay={0} />}+
//                         </div>
//                         <div className='text-black text-center text-lg px-1'>
//                             **Certified Courses**<br />
//                             Explore a diverse selection of over 100 certified courses designed to empower you with essential skills for the future.
//                         </div>
//                     </div>
//                     <div className=' flex md:w-[23%] w-[90%] mx-auto justify-center py-5 gap-4 items-center flex-col bg-[#a24156] rounded-lg shadow-lg'>
//                         <div className='flex border-2 w-[50px] justify-center rounded-full items-center border-[#f2cd32] h-[50px]'>
//                             <BsFillTrophyFill className='text-[30px] text-[#f2cd32]' />
//                         </div>
//                         <div className='text-[40px] font-bold text-[#f2cd32]'>
//                             {count && <CountUp start={0} end={10} duration={3} delay={0} />}+
//                         </div>
//                         <div className='text-[#fff] text-center text-lg px-1'>
//                             **Education Awards**<br />
//                             Recognized with 10 prestigious awards for our commitment to educational excellence and innovation in teaching.
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </ScrollTrigger>
//     );
// }

// export default OurFacilities;

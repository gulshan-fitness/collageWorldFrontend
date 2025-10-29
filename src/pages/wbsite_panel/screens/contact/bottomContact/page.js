
import React from 'react';
import { BiMap } from 'react-icons/bi';
import { BsArrow90DegRight } from 'react-icons/bs';
import BottomImage from "./image/pic1.webp"


const BottomContact = () => {
    return (
        <div className='bg-banner w-full py-10'>
            <div className='lg:flex w-[100%] sm:w-[90%] px-4 sm:px-0 mx-auto justify-between  py-10'>
                <div className='lg:w-[40%] w-full lg:py-6 flex lg:block justify-center items-center flex-col'>
                    <h1 className='xl:text-[55px] md:text-[40px] mb-4  text-[22px] leading-[60px] text-[pink]'>Call doesn't feel 
                        enough <span className='text-[#fdc800]'>Visit Us</span></h1>
                    <p className=' py-2 md:text-[16px] text-center lg:text-left text-[14px] text-[green] font-semibold'>Lorem ipsum dolor, sit amet 
                    consectetur adipisicing elit. Ab expedita aliquam odio libero, atque corrupti facilis aut rem
                     nostrum ducimus voluptas officia quaerat sints.</p>
                    <button className='bg-[#fdc800] duration-300 outline-none border-none rounded-2xl mt-3 py-2 px-3 font-[700] hover:bg-[#002147] hover:text-white text-black'>Call Now</button>
                <div className='flex items-center gap-2 mt-3 text-[18px]'>
                        <BiMap className='text-[red]'/>
                        <p className='text-white'>Visit Us : <span className='text-[#fdc800] cursor-pointer'>(10 AM to 7 PM)</span> </p>
                </div>
                    <div className='flex items-center gap-2 mt-3  text-[16px]'>
                        <BsArrow90DegRight className='font-[800] text-[red]'/>
                        <p className='font-bold text-white'>B-136, B Block, Sector 2, Noida, Uttar Pradesh 201301</p>
                </div>
                </div>
                <div className='lg:w-[55%] w-[100%] overflow-hidden mt-10 lg:mt-0 z-0 flex rounded-2xl lg:justify-end justify-center items-center'>
                    <img src={BottomImage}
                        alt="img not Found"
                        className='xl:h-[400px] xl:scale-[1] xl:hover:scale-[1.1] lg:h-[340px] w-[100%]  duration-700 cursor-pointer '
                        width={10}
                        height={10}
                        sizes='80vw'
                    />
                </div>
            </div>
        </div>
    );
}

export default BottomContact;

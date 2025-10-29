import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { LuContact } from 'react-icons/lu';
import { FaMapSigns } from 'react-icons/fa';


const MidContact = () => {
    return (
        <div fluid className='py-10 w-full'>
            <div className='flex justify-between w-[100%] text-[#fdc800] mx-auto flex-wrap py-[40px]'>
                <div className=' rounded-lg w-[80%] mx-auto lg:w-[25%] my-3 bg-[#002147] py-3'>
                    <div className='text-center md:text-[24px] text-[20px] lg:text-[28px] font-[700] '>General</div>
                    <div className='flex p-4 md:ms-10  lg:ms-4  gap-4 '>
                        <AiOutlineMail className='text-[40px] text-matching' />
                        <div className='text-[12px] md:text-[16px]'>
                            <div className='p-1 font-[700]'>Email Address</div>
                            <div className='font-[700] hover:text-[#fdc800] duration-300 cursor-pointer text-white'>info@educavo.com</div>
                        </div>
                    </div>
                    <div className='flex p-4 md:ms-10 lg:ms-4  gap-4 '>
                        <LuContact className='text-[40px] text-matching' />
                        <div className='text-[12px] md:text-[16px]'>
                            <div className='p-1 font-[700]'>Phone Number</div>
                            <div className='font-[700] hover:text-[#fdc800] duration-300 cursor-pointer text-white'>(+088)589-8745</div>
                        </div>
                    </div>
                    <div className='flex p-4 md:ms-10 lg:ms-4  gap-4 '>
                        <FaMapSigns className='text-[40px] text-matching' />
                        <div className='text-[12px] md:text-[16px]'>
                            <div className='p-1 font-[700]'>Address</div>
                            <div className='font-[700] hover:text-[#fdc800] cursor-pointer duration-300 text-white'>New Jesrsy, 1201, USA</div>
                        </div>
                    </div>
                </div>
                <div className=' rounded-lg w-[80%] mx-auto lg:w-[25%] my-3 bg-[#002147] py-3'>
                    <h1 className='text-center md:text-[24px] text-[20px] lg:text-[28px] font-[700] '>Admission</h1>
                    <div className='flex p-4 md:ms-10 lg:ms-4  gap-4 '>
                        <AiOutlineMail className='text-[40px] text-matching' />
                        <div className='text-[12px] md:text-[16px]'>
                            <p className='p-1 font-[700]'>Email Address</p>
                            <p className='font-[700] hover:text-[#fdc800] duration-300 cursor-pointer text-white'>info@educavo.com</p>
                        </div>
                    </div>
                    <div className='flex p-4 md:ms-10 lg:ms-4  gap-4 '>
                        <LuContact className='text-[40px] text-matching' />
                        <div className='text-[12px] md:text-[16px]'>
                            <p className='p-1 font-[700]'>Phone Number 1</p>
                            <p className='font-[700] hover:text-[#fdc800] duration-300 cursor-pointer text-white'>(+088)589-8745</p>
                        </div>
                    </div>
                    <div className='flex p-4 md:ms-10 lg:ms-4  gap-4 '>
                        <LuContact className='text-[40px] text-matching' />
                        <div className='text-[12px] md:text-[16px]'>
                            <p className='p-1 font-[700]'>Phone Numbe 2</p>
                            <p className='font-[700] hover:text-[#fdc800] duration-300 cursor-pointer text-white'>(+088)589-8745</p>
                        </div>
                    </div>
                </div>
                <div className=' rounded-lg w-[80%] mx-auto lg:w-[25%] my-3 bg-[#002147] py-3'>
                    <h1 className='text-center md:text-[24px] text-[20px] lg:text-[28px] font-[700] '>Admission</h1>
                    <div className='flex p-4 md:ms-10 lg:ms-4  gap-4 '>
                        <AiOutlineMail className='text-[40px] text-matching' />
                        <div className='text-[12px] md:text-[16px]'>
                            <p className='p-1 font-[700]'>Emergency</p>
                            <p className='font-[700] hover:text-[#fdc800] duration-300 cursor-pointer text-white'>info@educavo.com</p>
                        </div>
                    </div>
                    <div className='flex p-4 md:ms-10 lg:ms-4  gap-4 '>
                        <LuContact className='text-[40px] text-matching' />
                        <div className='text-[12px] md:text-[16px]'>
                            <p className='p-1 font-[700]'>Phone Number 1</p>
                            <p className='font-[700] hover:text-[#fdc800] duration-300 cursor-pointer text-white'>(+088)589-8745</p>
                        </div>
                    </div>
                    <div className='flex p-4 md:ms-10 lg:ms-4  gap-4 '>
                        <LuContact className='text-[40px] text-matching' />
                        <div className='text-[12px] md:text-[16px]'>
                            <p className='p-1 font-[700]'>Phone Numbe 2</p>
                            <p className='font-[700] hover:text-[#fdc800] duration-300 cursor-pointer text-white'>(+088)589-8745</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MidContact;

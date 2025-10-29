import React from 'react';
import { AiFillApple, AiFillLock, AiOutlineClose, AiOutlineMail } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

const MainPopup = ({ onClose }) => {
    return (
        <>
            <div className="sm:w-[500px] w-[90%]  bg-white rounded-xl flex relative items-center flex-col border-2">
                <AiOutlineClose className="absolute cursor-pointer right-4 top-3 text-[20px]" onClick={onClose} />
                <div className="py-2 font-semibold my-2 text-[18px]">Sig in to get started</div>
                <div className='w-[90%] py-5'>
                    New to AAOPADHE? <a href="" className='text-blue-600 cursor-pointer'>Sign Up</a>
                </div>
                <div className='w-[90%] mt-2 flex'>
                    <div className='w-[12%] border-2 py-2 text-center cursor-pointer rounded-s-md'> + 91 </div>
                    <input type="text" placeholder='Enter your phone number' className='font-[600] rounded-e-md  border-4 px-2 w-[85%]  outline-none' />
                </div>
                <div className=" w-[90%] hidden mb-2 text-red-600 text-[14px]">
                    Invalid Number
                </div>
                <div className='w-[90%] cursor-pointer my-4 py-3 rounded-md text-white font-[600] text-center bg-blue-700'>
                    Get OTP
                </div>
                <div className='w-[68%] mb-4 px-2 cursor-pointer bg-blue-200 text-[14px] rounded-xl flex items-center gap-2 border'>
                    <AiFillLock/>
                    <div className='py-1'>Your personal information is secure with us</div>
                </div>
            </div>
        </>
    );
}

export default MainPopup;

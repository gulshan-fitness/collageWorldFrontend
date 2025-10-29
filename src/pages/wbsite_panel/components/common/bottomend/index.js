import React, { useState } from 'react'
import { FaQuestionCircle } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";

function BottomEnd() {
   
    
    return (
        <>
          <div className='w-full bg-red-500 py-2'>
            <div className='container mx-auto'>
                <div className='flex justify-center gap-5'>
                    <p className='flex items-center gap-1  h-full px-2'> <span><FaQuestionCircle/></span> <a>Enquiry</a></p>
                    <p className='flex items-center gap-1  h-full px-2'> <span><TfiWrite/></span> <a>Apply</a></p>
                    <p className='flex items-center gap-1  h-full px-2'> <span><CgProfile/></span> <a>Speak To Counselor</a></p>
                    
                </div>
            </div>
          </div>
        </>
    )
}

export default BottomEnd;
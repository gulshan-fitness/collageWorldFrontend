import React from 'react';
import { Link } from 'react-router-dom';

const AdmissionDiv = () => {
    return (
        <div className='w-full bg-[#002147] px-4 md:px-0'>
            <div className='container mx-auto rounded-lg  py-10 '>
                <h2 className='text-white font-bold text-3xl'>Apply for Admission</h2>
                <div className='flex items-center justify-between py-2 flex-wrap'>
                    <h2 className='text-white font-thin text-xl w-full md:w-[60%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur totam odio, minima similique veniam nihil !</h2>
                    <button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 my-2 md:my-0 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"><Link to='/contact'>Apply Now</Link></button>
                </div>
            </div>
        </div>
    );
}

export default AdmissionDiv;

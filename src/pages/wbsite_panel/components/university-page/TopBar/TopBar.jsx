import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaPhoneAlt, FaMailBulk} from "react-icons/fa";

function TopBar() {

  return (
    <div className='w-full bg-[#125875] py-2 relative z-0 hidden lg:block md:flex justify-center'>

       <div className='topbarcut flex justify-center'>
            <div className='container mx-auto'>
                <div className='flex items-center justify-between'>
                    <div className='w-1/3'>
                        <ul className='flex items-center text-white gap-3 mb-0 '>
                            <li>Follow us:-</li>
                            
                            <li><FaFacebookF /></li>
                            <li><FaInstagram /></li>
                            <li><FaTwitter/></li>
                            <li><FaYoutube /></li>
                        </ul>
                    </div>
                    <div className='flex flex-grow items-center justify-end'>
                       <div className='flex items-center border-r-[1px] border-stone-50 pr-[10px]'>
                        <p className='text-orange-600 text-2xl mb-0'><FaPhoneAlt /></p>
                        <ul className='text-white px-3 mb-0'>
                            <li className='text-sm'>
                                Call Now !
                            </li>
                            <li className='text-sm'>
                              <a href="+91-1234567890" className='text-white no-underline'>7791996354</a>
                            </li>
                        </ul>
                       </div>
                       <div className='flex pl-[10px] items-center'>
                        <p className='text-orange-600 text-2xl mb-0'><FaMailBulk /></p>
                        <ul className='text-white px-3 mb-0'>
                            <li className='text-sm'>
                                Email Now
                            </li>
                            <li className='text-sm'>
                                <a href="#" className='text-white no-underline' >bhawani@gmail.com</a>
                            </li>
                        </ul>
                       </div>
                    </div>
                    
                </div>
            </div>
       </div>
    </div>
  )
}

export default TopBar

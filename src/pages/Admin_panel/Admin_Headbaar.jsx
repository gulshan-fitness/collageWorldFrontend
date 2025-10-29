import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../Context_holder';
import { FaUserCircle } from 'react-icons/fa';
import { TiArrowBack } from "react-icons/ti";
export default function Admin_Headbaar() {

  const { setadmin, admin, menu_links,settoken } = useContext(Context);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlight, sethighlight] = useState("");
  const navigator = useNavigate();

  const logout_handler = () => {
    setadmin(null);
    settoken(null)
    setIsDropdownOpen(false);
    setadmin(null)

    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    navigator("/");
  }

  const page_jump_handler = (data) => {
    sethighlight(data.name);
    setIsDropdownOpen(false);
  }

  return (
    <header className="bg-gradient-to-r from-[#002147] to-slate-800 text-white py-4 px-8 flex justify-between items-center shadow-md sticky top-0 left-0 z-10">
    <div className="text-lg font-bold">Admin</div>
  
    <div className={`md:flex md:space-x-4 md:w-auto w-full md:h-auto h-full md:py-0 ${isDropdownOpen ? "left-0" : "left-[-100%]"} md:px-0 py-4 px-9 duration-300 bg-[#002147] md:bg-transparent fixed md:relative top-0 right-0 overflow-y-auto md:overflow-visible`}>
      <div className=" gap-2 flex  items-center justify-between mb-4">

<div className='focus:outline-none md:hidden gap-2 flex  capitalize items-center'>
  <FaUserCircle className="text-3xl text-[#fdc800]" />
        <div className="text-lg font-semibold">{admin?.name}</div>

</div>

 <button
            onClick={() =>  setIsDropdownOpen(false)}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors shadow-sm"
          >
          <TiArrowBack  className=' font-bold text-black text-xl' />
          </button>


      
      </div>
  
      <div className={`relative items-center md:hidden py-2.5 px-4 mb-1 rounded transition duration-200 hover:bg-[#001b36] hover:text-[#fdc800] gap-2 group`}>
        <Link to={"/"} className="block group-hover:translate-x-2 duration-300 font-semibold text-lg">
          Home
        </Link>
      </div>
  
      {menu_links.map((data, index) => (
        <div key={index} className={`relative items-center md:hidden py-2.5 px-4 mb-1 rounded transition duration-200 hover:bg-[#001b36] ${highlight === data.name ? "text-[#fdc800] bg-[#001b36]" : "text-white bg-none"} hover:text-[#fdc800] gap-2 group`}>
          <Link to={data.url} className="block group-hover:translate-x-2 duration-300 font-semibold text-lg" onClick={() => page_jump_handler(data)}>
            {data.name}
          </Link>
          <div className='gap-2 group-hover:flex hidden py-2 px-2 rounded-e-md'>

          {data?.subitems?.map((subitem, subIndex) => (
                  <Link
                    key={subIndex}
                    to={subitem.url}
                    className="hover:text-[#002147] hover:bg-[#fdc800] px-3 py-1 rounded-md text-white border border-[#fdc800] shadow-sm hover:shadow-none shadow-[#fdc800] bg-[#001b36]"
                    onClick={() => page_jump_handler(data)}
                  >
                    {subitem.name}
                  </Link>
                ))}


          
          </div>
        </div>
      ))}
  
      <div className={`md:hidden ${admin ? "block" : "hidden"}  py-4 md:mb-0 mb-4`}>
        <Link to="" className={`text-[#002147] text-lg font-semibold hover:bg-[#fdc800] py-2 px-4 rounded-md hover:text-[#002147] bg-white`} onClick={logout_handler}>
          Logout
        </Link>
      </div>
  
      <i className="fa-solid fa-xmark absolute top-5 right-5 text-2xl md:hidden" onClick={() => setIsDropdownOpen(false)}></i>
    </div>
  
    <div>
      <Link className="md:flex gap-2 hidden relative group capitalize items-center">
        <FaUserCircle className="text-3xl text-[#fdc800]" />
        <div className='text-lg font-semibold'>{admin?.name}</div>
        <div className={`absolute group-hover:rotate-x-0 ${admin ? "block" : "hidden"} duration-200 w-full text-center text-lg font-semibold bg-[#fdc800] py-2 text-[#002147] origin-top rotate-x-90 rounded-md top-9 hover:shadow-sm shadow-[#fdc800] hover:bg-[#002147] hover:text-white`} onClick={logout_handler}>
          Logout
        </div>
      </Link>
      <button className="focus:outline-none md:hidden text-[#fdc800]" onClick={() => setIsDropdownOpen(true)}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h18M3 10h18M3 15h18M3 20h18"></path>
        </svg>
      </button>
    </div>
  </header>
  
  );
}

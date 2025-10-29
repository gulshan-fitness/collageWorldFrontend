import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../../Context_holder';
import colors from "../../wbsite_panel/utils/colour";

export default function Side_bar() {
  const { menu_links,admin} = useContext(Context);
  const [highlight, sethighlight] = useState("");

  

  return (
   

    <div className="md:flex h-screen hidden sticky top-0 w-full">
    <div className="w-full bg-[#002147] text-white flex flex-col">

      <div className="flex items-center justify-center py-4 px-3 text-lg font-bold border-[#002147] border-[1px] bg-[#fdc800] border-e-[#fdc800] border-b-[#fdc800]">


      <Link to="/" className="flex py-2 rounded-lg items-center border-[1px] px-2 shadow-md shadow-[#002147]  border-[#002147]">
    <h1
      className="bg-transparent   font-bold text-[20px] lg:text-[28px]"
      style={{ color: colors.theme }}
    >
      AAOPADHE
    </h1>
  </Link>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hidden border-[#fdc800]  border-e-[1px]">
        <ul className="py-4">
          {menu_links.map((data, index) => (
            <div
              key={index}
              className={`relative items-center py-2.5 px-4 mb-1 rounded transition duration-200 ${
                highlight === data.name
                  ? "text-[#fdc800] bg-[#001b36]"
                  : "text-white bg-none"
              } hover:bg-[#001b36] hover:text-[#fdc800] gap-2 group`}
            >
              <Link
                to={data.url}
                className="gap-2 flex group-hover:translate-x-2 duration-300 font-semibold text-lg"
              >
                <div>{data.name}</div>
              </Link>
  
              <div className="gap-2 group-hover:flex hidden py-2 px-2 rounded-e-md">
                {data?.subitems?.map((subitem, subIndex) => (
                  <Link
                    key={subIndex}
                    to={subitem.url}
                    className="hover:text-[#002147] hover:bg-[#fdc800] px-3 py-1 rounded-md text-white border border-[#fdc800] shadow-sm hover:shadow-none shadow-[#fdc800] bg-[#001b36]"
                    onClick={()=>sethighlight(data.name)}
                  >
                    {subitem.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  </div>
  
  );
}

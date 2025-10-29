<div className="border border-gray-300 rounded-md shadow-md w-full ">
      <div className="bg-blue-700 text-white px-4 py-2">
        <h2 className="text-lg font-semibold">Other Top Colleges in {current_data?.city}</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {top10College_by_city?.map((data, index) =>(

          <Link to={`/university-page/${data?._id}`} key={index} className="flex items-center cursor-pointer space-x-2 px-4 py-2 hover:bg-gray-100">
            <div className="text-yellow-500 flex justify-center items-center bg-blue-800 border w-5 h-5 rounded-full"><span><FaCaretRight /></span> </div>
            <span className="text-blue-800 font-medium">{data?.college_name}</span>
          </Link>
        ))}
      </ul>
    </div>

    {/* top 10 college state wise */}
<div className="border border-gray-300 rounded-md shadow-md w-full ">
      <div className="bg-blue-700 text-white px-4 py-2">
        <h2 className="text-lg font-semibold">Other Top Colleges in {current_data?.state}</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {top10College_by_state?.map((data, index) =>(
          
          <Link to={`/university-page/${data?._id}`} key={index} className="flex items-center cursor-pointer space-x-2 px-4 py-2 hover:bg-gray-100">
            <div className="text-yellow-500 flex justify-center items-center bg-blue-800 border w-5 h-5 rounded-full"><span><FaCaretRight /></span> </div>
            <span className="text-blue-800 font-medium">{data?.college_name}</span>
          </Link>
        ))}
      </ul>
    </div>


{/* top 10 courses city wise */}
<div className="border border-gray-300 rounded-md shadow-md w-full ">
      <div className="bg-blue-700 text-white px-4 py-2">
        <h2 className="text-lg font-semibold"> Top Courses in {current_data?.city}</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {top10Courses_by_city?.map((data, index) =>(

          <Link onClick={()=> setcourse_name(data?.courseName)} to={`/allUniversity`} key={index} className="flex items-center cursor-pointer space-x-2 px-4 py-2 hover:bg-gray-100">
            <div className="text-yellow-500 flex justify-center items-center bg-blue-800 border w-5 h-5 rounded-full"><span><FaCaretRight /></span> </div>
            <span className="text-blue-800 font-medium">{data?.courseName}</span>
          </Link>
        ))}
      </ul>
    </div>

    {/* top 10 course state wise */}
<div className="border border-gray-300 rounded-md shadow-md w-full ">
      <div className="bg-blue-700 text-white px-4 py-2">
        <h2 className="text-lg font-semibold"> Top Courses in {current_data?.state}</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {top10Courses_by_state?.map((data, index) =>(
          
          <Link onClick={()=>setcourse_name(data?.courseName)} to={`/allUniversity`} key={index} className="flex items-center cursor-pointer space-x-2 px-4 py-2 hover:bg-gray-100">
            <div className="text-yellow-500 flex justify-center items-center bg-blue-800 border w-5 h-5 rounded-full"><span><FaCaretRight /></span> </div>
            <span className="text-blue-800 font-medium">{data?.courseName}</span>
          </Link>
        ))}
      </ul>
    </div>



     {/* studenets visited recently */}

<div className="border border-gray-300 rounded-md shadow-md w-full ">
      <div className="bg-blue-700 text-white px-4 py-2">
        <h2 className="text-lg font-semibold"> recently Students visited</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {recent_enquiry_by_city?.map((data, index) =>(
          
          <Link  to={`/university-page/${data.college?.college_id}`} key={index} className="flex items-center cursor-pointer space-x-2 px-4 py-2 hover:bg-gray-100">
            <div className="text-yellow-500 flex justify-center items-center bg-blue-800 border w-5 h-5 rounded-full"><span><FaCaretRight /></span> </div>
            <span className="text-blue-800 font-medium">{data?.college?.college_name}</span>
          </Link>
        ))}
      </ul>
    </div>
import React from 'react'

export default function CollegeBanner2nd({banner}) {
  console.log(banner,"33333")
  return (
    <div className="w-full h-16 flex items-center justify-center overflow-hidden">
      <img 
        src={`${process.env.REACT_APP_API_IMAGE_URL}college_banners/${banner}`} 
        loading="lazy"
        alt="image load..." 
        className="w-full h-full object-cover"
      />
    </div>
  )
}

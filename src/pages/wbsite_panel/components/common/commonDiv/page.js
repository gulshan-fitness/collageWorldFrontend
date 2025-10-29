import React from 'react'

const CommonDiv = ({brand,img}) => {
  return (
    <div className='  rounded-xl bg-white flex  flex-col    text-black w-[60%]' >
      <div className='w-[80%] h-[8rem] shadow-2xl'>
        <img
                className=" w-full h-full bg-white mt-2 "
                src={img}
                alt="image not found"
                height={0}
                width={0}
                sizes="100vw"
        />
              </div>
       {brand}
    </div>
  )
}

export default CommonDiv;
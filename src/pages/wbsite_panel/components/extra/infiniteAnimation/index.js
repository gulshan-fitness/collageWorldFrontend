import React from 'react';
import "./index.css"
import wipro  from "./image/wipro.jpg"
import hcl from "./image/hcl.jpg"

const InfiniteAnimation = () => {
  return (
    <div className="app w-full">
      
      <div className="tag-list border-2">
        {/* loop-slider 1 */}
        <div className="loop-slider" style={{ '--duration': '15951ms', '--direction': 'normal' }}>
          <div className="inner">
            {/* tags */}
            
              <div  className="tag overflow-hidden">
                <img src={wipro} alt="image not" className='h-[6rem] w-[8rem]'></img>
             
               
              </div>
              <div  className="tag overflow-hidden">
               
                <img src={hcl} alt="image not" className='h-[6rem] w-[8rem]'></img>
               
              </div>
              <div  className="tag overflow-hidden">
               
               <img src={hcl} alt="image not" className='h-[6rem] w-[8rem]'></img>
              
             </div> 
             <div  className="tag overflow-hidden">
               
               <img src={hcl} alt="image not" className='h-[6rem] w-[8rem]'></img>
              
             </div>
             <div  className="tag overflow-hidden">
               
               <img src={hcl} alt="image not" className='h-[6rem] w-[8rem]'></img>
              
             </div>
          
          </div>
        </div>
        {/* loop-slider 2 */}
        <div className="loop-slider" style={{ '--duration': '19260ms', '--direction': 'reverse' }}>
          <div className="inner">
            {/* tags */}
            {[...Array(5)].map((_, index) => (
              <div key={index} className="tag">
                <span>#</span> webdev
              </div>
            ))}
          </div>
        </div>
        {/* loop-slider 3 */}
        <div className="loop-slider" style={{ '--duration': '10449ms', '--direction': 'normal' }}>
          <div className="inner">
            {/* tags */}
            {[...Array(5)].map((_, index) => (
              <div key={index} className="tag">
                <span>#</span> animation
              </div>
            ))}
          </div>
        </div>
        {/* loop-slider 4 */}
        <div className="loop-slider" style={{ '--duration': '16638ms', '--direction': 'reverse' }}>
          <div className="inner">
            {/* tags */}
            {[...Array(5)].map((_, index) => (
              <div key={index} className="tag">
                <span>#</span> Gatsby
              </div>
            ))}
          </div>
        </div>
        {/* loop-slider 5 */}
        <div className="loop-slider" style={{ '--duration': '15936ms', '--direction': 'normal' }}>
          <div className="inner">
            {/* tags */}
            {[...Array(5)].map((_, index) => (
              <div key={index} className="tag">
                <span>#</span> Next.js
              </div>
            ))}
          </div>
        </div>
        <div className="fade"></div>
      </div>
    </div>
  );
};

export default InfiniteAnimation;

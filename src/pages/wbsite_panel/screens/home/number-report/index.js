import React, { useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const NumberReport = () => {
  const [count, setCount] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1, // Adjust as needed
    triggerOnce: true, // Counts up only once when in view
  });

  React.useEffect(() => {
    if (inView) {
      setCount(true);
    }
  }, [inView]);

  return (
    <div className='w-full flex justify-center'>
      <div className='w-[85%] bg-[#d1d1d3] mt-6 md:mt-12 mb-4 py-4 rounded-sm'>
        <div className='text-center font-bold md:text-[2rem] text-[1rem] mb-8 text-white text-[#FFFD37]'>
          Your Path to Success with
        </div>
        <div ref={ref} className='py-2 md:px-4 text-[15px] text-black flex w-full justify-evenly gap-4 font-bold bg-white'>
          <div className='flex flex-col items-center  px-4 py-2 rounded-xl w-[40%]   sm:w-[40%]'>
            {count ? (
              <div className='text-sm md:text-3xl text-center'>
                <CountUp start={0} end={89000} duration={2} delay={0} />+
              </div>
            ) : (
              <div className='text-sm md:text-3xl text-center'>89000+</div>
            )}
            <div className='text-[#F2994A] text-[12px] sm:text-[16px] text-center'>
              Trusted by Students
            </div>
          </div>
          <div className='flex flex-col items-center  px-4 py-2 rounded-xl w-[40%] sm:w-[40%]'>
            {count ? (
              <div className='text-sm md:text-3xl text-center'>
                <CountUp start={0} end={500} duration={2} delay={0} />+
              </div>
            ) : (
              <div className='text-sm md:text-3xl text-center text-black'>500+</div>
            )}
            <div className='text-[blue] text-[12px] sm:text-[16px] text-center'>
              Expert Mentors
            </div>
          </div>
          <div className='flex flex-col items-center  px-4 py-2 rounded-xl w-[40%] sm:w-[40%]'>
            {count ? (
              <div className='text-sm md:text-3xl text-center'>
                4.9 / <CountUp start={0} end={537} duration={2} delay={0} />
              </div>
            ) : (
              <div className='text-sm md:text-3xl text-center'>4.9 / (537)</div>
            )}
            <div className='text-[#F2994A] text-[12px] sm:text-[16px] text-center'>
              Google Rating
            </div>
          </div>
          {/* <div className='flex flex-col items-center px-4 py-2 rounded-xl w-[40%] sm:w-[40%]'>
            {count ? (
              <div className='text-sm md:text-3xl text-center'>
                8/<CountUp start={0} end={10} duration={2} delay={0} />
              </div>
            ) : (
              <div className='text-sm md:text-3xl text-center'>8/(10)</div>
            )}
            <div className='text-[blue] text-[12px] sm:text-[16px] text-center'>
              Ranking
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default NumberReport;


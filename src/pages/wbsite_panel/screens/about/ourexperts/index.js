import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import expertImg1 from "./image/expert1.jpg";
import expertImg2 from "./image/expert2.jpg";
import './index.css';

const OurExperts = () => {
    const [contentVisible, setContentVisible] = useState(false);
    
    useEffect(() => {
        setContentVisible(true);
    }, []);

    const data = {
      
        labels: ['Enrolled Students', 'Courses Offered'],
        datasets: [
            {
                label: 'Metrics',
                data: [5000, 1080], // Example data
                backgroundColor: ['blue', 'red', '#FFFF00'],
                borderColor: 'yellow', // Set the border color to yellow
                borderWidth: 2, // Optional: Set border width
                
            },
        ],
        scales: {
            x: {
                grid: { color: 'white' }, // Change the grid color to white
                ticks: { color: 'white' }, // Change tick color to white
            },
            y: {
                grid: { color: 'white' }, // Change the grid color to white
                ticks: { color: 'white' }, // Change tick color to white
            },
        },
    };
    

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="py-10 w-full mx-auto xl:flex items-center justify-between bg-gradient-to-b from-[#18092f] via-purple-900 to-[#18092f] ">
            <div className={`xl:w-[90%] w-11/12 mx-auto flex flex-col py-6 ${contentVisible ? 'slide-in' : 'slide-out'}  rounded-lg p-8 shadow-lg transition-all duration-300`}>
                <div className='text-blue-400 font-bold text-lg'>About Us</div>
                <h1 className='xl:text-5xl text-4xl font-bold text-white mt-2'>Empowering Your Educational Journey</h1>
                <h2 className='xl:text-5xl text-4xl font-bold text-blue-400 mt-2'>with AAOPADHE.com</h2>
                <p className='py-2 text-lg xl:text-xl font-semibold text-white mt-4'>
                    At AAOPADHE.com, we connect students with the best universities and courses based on real student ratings.
                </p>
                <p className='text-sm xl:text-base font-normal text-gray-300 mt-2'>
                    Our platform offers tailored suggestions by location and course, ensuring that you find the right path for your future.
                </p>
                <p className='py-4 text-lg xl:text-xl text-white font-medium mt-4'>
                    Our commitment to quality education is reflected in our highly qualified team of experts.
                </p>
                <div className='md:flex py-3 justify-between'>
                    <Bar data={data} options={options}  />
                </div>
            </div>
        </div>
    );
};

export default OurExperts;

import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const AboutReg = () => {
    const text = "At AAOPADHE.com, we are committed to guiding you through the process of finding the right college and course based on genuine student ratings. Discover comprehensive insights about campuses, faculty, and success stories that will help you make informed decisions for your future.";
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const loopCount = useRef(0);
    const containerRef = useRef(null);

    const startTyping = () => {
        setIsTyping(true);
        loopCount.current = 0; // Reset loop count
    };

    const stopTyping = () => {
        setIsTyping(false);
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startTyping();
                } else {
                    stopTyping();
                }
            });
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const typingSpeed = isDeleting ? 50 : 100;

        if (isTyping) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => 
                    isDeleting 
                    ? text.slice(0, prev.length - 1) 
                    : text.slice(0, prev.length + 1)
                );

                if (!isDeleting && displayedText.length === text.length) {
                    setIsDeleting(true);
                } else if (isDeleting && displayedText.length === 0) {
                    setIsDeleting(false);
                    loopCount.current += 1;
                    if (loopCount.current >= 3) { // Change this for more loops
                        stopTyping();
                    }
                }
            }, typingSpeed);

            return () => clearTimeout(timeout);
        }
    }, [displayedText, isDeleting, isTyping]);

    return (
        <div className='w-full flex justify-center  bg-gradient-to-b from-[#18092f] via-purple-900 to-[#18092f] '>
            <div className='w-[90%] rounded-lg shadow-2xl py-10 ' ref={containerRef}>
                <h6 className='py-2 text-2xl  text-[#002147] text-white'>Learn by Connecting Practice</h6>
                <div className='flex items-center justify-between flex-wrap'>
                    <h2 className='w-full md:w-[60%] text-2xl md:text-4xl font-thin text-white'>
                        Your Path to the Best Colleges and Courses Awaits
                    </h2>
                    <button
                        type="button"
                        className="focus:outline-none text-white bg-[blue]  hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 my-2 md:my-0 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                    >
                        <Link to='/contact'>Get Started</Link>
                    </button>
                </div>
                <div className='mt-5'>
                    <p className={`text-[yellow] text-[16px] leading-relaxed font-serif typewriter`}>
                        {displayedText}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutReg;

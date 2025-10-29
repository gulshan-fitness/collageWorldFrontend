import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedText = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const words = textRef.current.querySelectorAll('.word');
          gsap.from(words, {
            y: -50, // Start position (above the view)
            opacity: 0,
            stagger: 0.2, // Delay between each word
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
              gsap.to(words, {
                y: 0, // Align to original position
                opacity: 1,
                duration: 0.5,
                stagger: 0.1, // Optional stagger for smooth appearance
              });
            },
          });
          observer.disconnect(); // Stop observing after animation
        }
      });
    }, {
      threshold: 0.1 // Adjust threshold as needed
    });

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      observer.disconnect(); // Cleanup observer on unmount
    };
  }, []);

  return (
    <div className="flex justify-center" ref={textRef}>
      <p className="font-bold text-sm md:text-2xl lg:text-3xl cursor-pointer text-black px-1">
        {["Stream ", "Choice", "Hai Important,", "Career", "Mein", "Lakhon", "  Ka", "Investment","Hai!" ].map((word, index) => (
          <span key={index} className="word">{word} </span>
        ))}
           
      </p>
    </div>
  );
};

export default AnimatedText;


// PageTransition.js
import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const PageTransition = ({ children }) => {
  useEffect(() => {
    const tl = gsap.timeline();

    // Animate the entrance of the new page
    tl.fromTo(
      '.transition',
      { y: '100%', opacity: 0 }, // Start position
      { y: '0%', opacity: 1, duration: 0.5, ease: 'power2.out' } // End position
    );

    return () => {
      // Animate the exit of the current page
      tl.to('.transition', { y: '-100%', opacity: 0, duration: 0.5, ease: 'power2.in' });
    };
  }, []);

  return (
    <div className="transition">
      {children}
    </div>
  );
};

export default PageTransition;



import { useContext, useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Context } from '../../../../Context_holder';


const Apply_popup = () => {
    

    const{apply_popUpisOpen, setapply_popUpIsOpen}=useContext(Context)

    const [isVisible, setIsVisible] = useState(false); // Controls animation

    useEffect(() => {
        if (apply_popUpisOpen) {
          setTimeout(() => setIsVisible(true), 100); // Delay for smooth opening animation
        }
      }, [apply_popUpisOpen]);
    
      const closePopup = () => {
        setIsVisible(false);
        setTimeout(() => setapply_popUpIsOpen(false), 300); // Close popup after animation finishes
      };



  return (
    <>
      {apply_popUpisOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-60 transition-opacity duration-500 ease-in-out"></div>
          
          {/* Popup container */}
          <div className={`relative bg-white w-96 p-8 rounded-2xl shadow-lg transform transition-all duration-500 ease-in-out ${isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
            {/* Checkmark icon with bounce animation */}
            <div className="flex items-center justify-center mb-4">
              <FaCheckCircle className="text-[#fdc800] text-6xl animate-bounce" />
            </div>
            {/* Title */}
            <h2 className="text-3xl font-extrabold text-center text-[#002147] mb-4">Success!</h2>
            {/* Description */}
            <p className="text-center text-gray-700 mb-6">
              Your application has been successfully submitted! We will review it and get back to you soon.
            </p>
            {/* Close button with hover effect */}
            <button
              className="w-full py-3 px-5 bg-[#002147] text-[#fdc800] font-semibold rounded-lg shadow-md hover:bg-[#fdc800] hover:text-[#002147] transition-colors duration-300"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Apply_popup;


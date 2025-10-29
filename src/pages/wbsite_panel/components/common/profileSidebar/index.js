// src/components/Sidebar.js
import React, { useState } from 'react';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-gray-800 text-white transition-transform transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } w-64 z-50`}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-3xl"
      >
        &times;
      </button>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img
            src="profile-pic.jpg" // Replace with actual profile picture
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <div className="ml-4">
            <p className="text-lg">Username</p>
          </div>
        </div>
        <a href="#" className="block px-4 py-2 hover:bg-gray-700">Profile</a>
        <a href="#" className="block px-4 py-2 hover:bg-gray-700">Settings</a>
        <a href="#" className="block px-4 py-2 hover:bg-gray-700">Logout</a>
      </div>
    </div>
  );
};

export default Sidebar;

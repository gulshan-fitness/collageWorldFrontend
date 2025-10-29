// CollegeGallery.js
import React from 'react';

const galleryImages = ['/image1.png', '/image2.png', '/image3.png', '/image4.png'];
const links = [
  { label: "Fees Structure", url: "/fees-structure" },
  { label: "Placements", url: "/placements" },
  { label: "Hostel Fees", url: "/hostel-fees" },
  { label: "Campus", url: "/campus" },
  { label: "Reviews", url: "/reviews" },
];

const CollegeGallery = () => {
  return (
    <div className="p-4 bg-white rounded-lg mt-6">
      <h3 className="text-xl font-bold mb-4">Image Gallery</h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {galleryImages.map((img, index) => (
          <img key={index} src={img} alt={`Gallery ${index}`} className="w-full rounded-lg" />
        ))}
      </div>
      <h3 className="text-xl font-bold mb-4">More About Andhra Loyola College</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url} className="text-blue-600 hover:underline">{link.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollegeGallery;

import React from "react";



const InfiAnimation = ({ partners }) => {
  // Duplicate for seamless loop (at least 2x)
  const loopCount = Math.max(3, Math.ceil(6 / partners.length));
  const extended = Array(loopCount).fill(partners).flat();

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-indigo-50/50 via-white to-purple-50/50 rounded-3xl p-6 md:p-8 shadow-inner">
      <div className="absolute inset-0 bg-white/40 backdrop-blur-xl -z-10"></div>

      <div className="overflow-hidden">
        <div
          className="flex animate-marquee gap-8 md:gap-12"
          style={{ animationDuration: `${Math.max(15, partners.length * 2)}s` }}
        >
          {extended.map((partner, i) => (
            <div
              key={`${partner._id}-${i}`}
              className="flex-shrink-0 group"
              style={{ width: "clamp(140px, 20vw, 220px)" }}
            >
              <div className="relative bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/30 overflow-hidden transform transition-all duration-500 group-hover:scale-105 group-hover:-rotate-1">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                {/* Logo */}
                <div className="relative z-10 flex justify-center mb-4 h-20 md:h-24">
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}image/hiring_partners_logo/${partner.logo}`}
                    alt={partner.companyName}
                    className="max-w-full max-h-full object-contain filter drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Name */}
                <h3 className="relative z-10 text-center text-sm md:text-base font-bold text-gray-800 line-clamp-2">
                  {partner.companyName}
                </h3>

                {/* Optional Website */}
                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 block mt-2 text-xs text-indigo-600 hover:text-indigo-800 text-center underline-offset-2 hover:underline transition-colors"
                  >
                    Visit Site
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfiAnimation;
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {


    
    extend: {

      animation: {
        marquee: 'marquee 10s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      
      rotate: {
        'x-0': '0deg',
        'x-90': '90deg',
      },
      
        fontFamily: {
          'playpen': ['Playpen Sans', 'cursive'],
          'sofadi': ['Sofadi One', 'system-ui'],
        },
      
  
        
      

      rotate: {
        'y-0': '0deg',
        'y-90': '90deg',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.rotate-x-0': {
          transform: 'rotateX(0deg)',
        },
        '.rotate-x-90': {
          transform: 'rotateX(90deg)',
        },
        '.rotate-y-180': {
          transform: 'rotateY(180deg)',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover', 'group-hover']);
    }
  ],
}
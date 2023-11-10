/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
                'montserrat': ['Montserrat'],
                'lato': ['Lato'],
                'garamond': ['Garamond']
            },
      keyframes: {
        nilemation: {
          '0%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
          '38%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'ease-out',
            opacity: '1',
          },
          '50%': {
            transform: 'translateY(500px)',
            opacity: '0',
          },
          '55%': {
            transform: 'translateY(-700px)',
            animationTimingFunction: 'ease-in',
          },
          '72%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'ease-out',
          },
          '81%': {
            transform: 'translateY(-32px)',
            animationTimingFunction: 'ease-in',
          },
          '90%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'ease-out',
          },
          '95%': {
            transform: 'translateY(-12px)',
            animationTimingFunction: 'ease-in',
          },
          '100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'ease-out',
          },
      }
    },
    animation: {
      nilemation1: 'nilemation 2s ease-in-out',
      nilemation2: 'nilemation 2s 0.2s ease-in-out',
      nilemation3: 'nilemation 2s 0.3s ease-in-out',
      nilemation4: 'nilemation 2s 0.1s ease-in-out'
    }
  },
},
  plugins: [],
};

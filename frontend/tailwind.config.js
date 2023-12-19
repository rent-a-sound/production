/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    screens: {
      ...defaultTheme.screens,
      xs: "475px",
    },
    extend: {
      fontFamily: {
        montserrat: ["Montserrat"],
        lato: ["Lato"],
        garamond: ["Garamond"],
      },
      keyframes: {
        nilemation: {
          "0%": {
            transform: "translateY(0)",
            opacity: "1",
          },
          "45%": {
            transform: "translateY(500px)",
            opacity: "0",
          },
          "55%": {
            transform: "translateY(-700px)",
            animationTimingFunction: "ease-in",
          },
          "72%": {
            transform: "translateY(0)",
            animationTimingFunction: "ease-out",
          },
          "81%": {
            transform: "translateY(-32px)",
            animationTimingFunction: "ease-in",
          },
          "90%": {
            transform: "translateY(0)",
            animationTimingFunction: "ease-out",
          },
          "95%": {
            transform: "translateY(-12px)",
            animationTimingFunction: "ease-in",
          },
          "100%": {
            transform: "translateY(0)",
            animationTimingFunction: "ease-out",
          },
        },
        spinle: {
          "0%": { transform: "rotateY(360deg)" },
          "25%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(0deg)" },
        },
      },
      animation: {
        nilemation1: "nilemation 2s ease-in-out",
        nilemation2: "nilemation 2s 0.2s ease-in-out",
        nilemation3: "nilemation 2s 0.3s ease-in-out",
        nilemation4: "nilemation 2s 0.1s ease-in-out",
        spinle1: "spinle 6s 1.5s linear infinite",
        spinle2: "spinle 6s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};

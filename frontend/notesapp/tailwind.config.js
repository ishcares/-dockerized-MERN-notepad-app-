/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      //colors used in the project
        colors: {
              primary : "#d762a2ff",
              secondary : "#1a1d1fff",
        }, 
  
    },
  },
  plugins: [],
}


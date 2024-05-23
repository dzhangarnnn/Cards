/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-rgba": "rgba(0, 0, 0, 0.4)"
      },
      width: {
        "half-screen": "50vw",
        "0.75-screen": "75vw",
        "0.33-screen": "33vw"
      },
      screens: {
        xs: "380px",
        s: "450px"
      },
      top: {
        "-0.33-screen": "-33vh"
      }
    }
  },
  plugins: []
};

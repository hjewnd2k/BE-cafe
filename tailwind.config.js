/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#353535",
        f5: "#f5f5f5",
      },
      backgroundColor: {
        primary: "#353535",
        f5: "#f5f5f5",
      },
      height: {
        15: "60px",
      },
      margin: {
        15: "60px",
      },
      aspectRatio: {
        "4/3": "4 / 3",
      },
    },
  },
  plugins: [],
};

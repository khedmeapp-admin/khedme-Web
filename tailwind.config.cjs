/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF6B00", // vibrant orange
          light: "#FFB266", // soft orange
          dark: "#CC5500", // deep burnt orange
        },
        secondary: {
          DEFAULT: "#1E1E1E", // rich black
          light: "#2E2E2E", // lighter black / grayish
          dark: "#000000", // true black
        },
        background: {
          DEFAULT: "#FFF9F5", // warm off-white background
        },
        text: {
          DEFAULT: "#1A1A1A", // near-black for readability
          light: "#4B4B4B", // muted gray for secondary text
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // toggle dark mode with class on <html> or <body>

  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#ffffff",
          dark: "#0f0f0f",
          subtle: "#f9fafb", // light gray for sections
          muted: "#1a1a1a", // dark gray variant for dark mode
        },
        text: {
          DEFAULT: "#1f2937", // gray-800
          light: "#f9fafb",   // near-white
          muted: "#6b7280",   // gray-500 for secondary text
        },
        brand: {
          orange: "#f97316",      // Tailwind orange-500
          orangeDark: "#ea580c",  // Tailwind orange-600
          accent: "#ff7a1a",      // extra shade for hover/focus
        },
        border: {
          DEFAULT: "#e5e7eb", // gray-200
          dark: "#2d2d2d",
        },
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "Inter", "system-ui", "sans-serif"],
      },

      boxShadow: {
        soft: "0 2px 6px rgba(0,0,0,0.05)",
        card: "0 4px 12px rgba(0,0,0,0.08)",
      },

      transitionTimingFunction: {
        "in-out-soft": "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },

  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};

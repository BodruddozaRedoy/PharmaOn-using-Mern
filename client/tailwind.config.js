/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["Lexend", "serif"],
        playfair: ["Playfair Display"]
      },
      colors: {
        primary: "#0f7986",
        bannerText: '#41543e',
        content: "#9ca3af",
        secondary: "#055862",
        accent: "#f0f0d7",
        neutral: "#111827",
        "base-100": "#ffeff7",
        info: "#00a3ff",
        success: "#5cb338",
        warning: "#ffc145",
        error: "#fb4141",
      },
    },
  },
  plugins: [require("daisyui")],
  future: {
    // Disable experimental features
    hoverOnlyWhenSupported: false,
  },
  experimental: {
    optimizeUniversalDefaults: false,
  },
};

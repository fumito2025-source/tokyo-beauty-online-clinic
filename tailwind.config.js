/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Noto Sans JP", "sans-serif"],
        serif: ["var(--font-serif)", "Noto Serif JP", "serif"],
      },
      colors: {
        clinic: {
          black: "#0A0A0A",
          gold: "#C9A84C",
          "gold-light": "#E0C87A",
          "gold-dark": "#A07830",
          offwhite: "#F5F0E8",
          "gray-dark": "#1A1A1A",
          "gray-mid": "#2A2A2A",
          "gray-light": "#3A3A3A",
        },
      },
    },
  },
  plugins: [],
}

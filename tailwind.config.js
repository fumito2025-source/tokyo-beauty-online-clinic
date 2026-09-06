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
          // cream-based luxury palette
          black:      "#EDE8DC", // main background (cream)
          "gray-dark":"#E5DFD1", // surface / card bg
          "gray-mid": "#FAFAF8", // lighter surface (near white)
          "gray-light":"#D8D2C4", // borders
          offwhite:   "#2A2520", // main text (deep charcoal)
          gold:       "#B89050", // accent gold
          "gold-light":"#C9A870",
          "gold-dark": "#8A6A30",
        },
      },
    },
  },
  plugins: [],
}

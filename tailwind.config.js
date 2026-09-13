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
          black:       "#FAF7F2", // main background (warm off-white)
          "gray-dark": "#F3EEE6", // surface / card bg
          "gray-mid":  "#FFFFFF", // lighter surface (pure white)
          "gray-light":"#E0D9CE", // borders
          offwhite:    "#1A1510", // main text (deep charcoal)
          gold:        "#B89050", // accent gold
          "gold-light":"#C9A870",
          "gold-dark": "#8A6A30",
        },
      },
    },
  },
  plugins: [],
}

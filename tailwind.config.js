/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#151515", panel: "#1e1d1b", line: "#3a352b",
        gold: "#c9a24b", "gold-hi": "#e6cb82", ivory: "#f3ebdd", muted: "#b9af9d"
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Instrument Sans", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin"
import preset from "./tailwind-preset"

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    spacing: {
      px: "1px",
      0: "0",
      0.5: "2px",
      1: "4px",
      1.5: "6px",
      2: "8px",
      2.5: "10px",
      3: "12px",
      3.5: "14px",
      4: "16px",
      5: "20px",
      6: "24px",
      7: "28px",
      8: "32px",
      9: "36px",
      10: "40px",
    },
    extend: {},
  },
  corePlugins: {
    preflight: true,
  },
  presets: [preset],
  plugins: [
    plugin(function ({ addBase }) {
      addBase({})
    }),
  ],
  import: "#root",
}

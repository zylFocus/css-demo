import colors from "tailwindcss/colors"

export default {
  theme: {
    colors: {
      ...colors,
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
    },
    extend: {
      flexGrow: {
        2: "2",
        3: "3",
      },
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
      
    },
  },
  plugins: [],
}

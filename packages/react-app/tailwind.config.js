module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    backgroundColor: theme => ({
      primary: "#380000",
      footer: "#000000",
    }),
    backgroundImage: {
      test: "url('https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F610198efb83a552a703080b3%2FCoca-Cola-s-first-series-of-NFTs-includes-this-digital-bubble-jacket-%2F960x0.jpg%3Ffit%3Dscale')",
    },
    textColor: {
      primary: "#ff0000",
    },
    variants: {
      extend: {},
    },
    plugins: [],
  },
};

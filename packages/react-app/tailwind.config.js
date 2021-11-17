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
      test: "url('https://i.shgcdn.com/07f41899-180a-4c3a-abe5-5161f62d860c/-/format/auto/-/preview/3000x3000/-/quality/lighter/')",
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

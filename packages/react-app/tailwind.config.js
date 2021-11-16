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
    textColor: {
      primary: "#ff0000",
    },
    variants: {
      extend: {},
    },
    plugins: [],
  },
};

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
      h1: ["'Press Start 2P'", "cursive"],
      body:["'Be Vietnam Pro'", "cursive"]
    },
    backgroundColor: theme => ({
      primary: "#380000",
      footer: "#000000",
      red: "#ff0000",
    }),
    backgroundImage: {
      test: "url('https://www.dropbox.com/s/qer6f9c2n9zzjb2/token%2325-extended.gif?raw=1')",
    },
    textColor: {
      primary: "#ff0000",
      neon: "#39FF14",
      neonRed: "#ff1818",
      neonPink: "#de00ff",
      neonYellow: "#f6fe00",
      neonBlue: "#00e4ff"
    },
    variants: {
      extend: {},
    },
    plugins: [],
  },
};

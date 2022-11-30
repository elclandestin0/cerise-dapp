module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
      h1: ["'Press Start 2P'", "cursive"],
      body: ["'Be Vietnam Pro'", "cursive"],
    },
    backgroundColor: theme => ({
      primary: "#380000",
      footer: "#000000",
      red: "#ff0000",
    }),
    backgroundImage: {
      test: "url('https://previews.dropbox.com/p/thumb/ABsGUBEeSafoEM44WDqbQ5w8Esh6kUGcCCtNDZkHr7104Dhahw5t4bEV0UBlS3sfTBQApCkZghEZW845M4Gzui8lztKkTqnudenAPswAKQdADqsuE9whOAIG6YA_tDH91om0IgSpfK18RppZ8He5qOVdOoLT_RD-9n80xq57HZZ4WcyLEYsmA7BaUZvSi55IinVTSx2X9IrDcgOPmFE-S2gncK7UeMsHrpdTgrm2BSz5wDwXmgqaiFIZhH2s_uhfLnh8T03zEXTgGAnihfq462Z0GMy4MqKubgLWrE5Qj9nLq3hdTx6sR10RswC9yXy4moTA-kCdyH307GljnUC1424M9I6Q-ZZSTLr8xeWVfs_jqQtQ8ovvFey-zrbxGKDfCgeFvxKLsAmN6jvQ_0a3egfl/p.gif')",
      burn: "url('https://c.tenor.com/WhD4AWN30YkAAAAC/clouds-moving.gif')",
    },
    textColor: {
      primary: "#ff0000",
      neon: "#39FF14",
      neonRed: "#ff1818",
      neonPink: "#de00ff",
      neonYellow: "#f6fe00",
      neonBlue: "#00e4ff",
      neonGreen: "#39FF14",
    },
    variants: {
      extend: {},
    },
    plugins: [],
  },
};

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
      test: "url('https://previews.dropbox.com/p/thumb/ABznqFDKqkihpGkQONQrDx8xdQHW5Jer138LKGcchG6mKUaoIYZrpo3cNg8wmlmpwFNBGLmYhAerDgKE98ZQIEvBb2kn0vVZ49WsuJsYylkNrqNObAJ_ALE1SX9KNAHSi07VlwAmMTnidATfwag_iyxGtxoDkJC5uaXJKZoJi7IxRsKv6zPT895362dbCPHXqU4VLf3UrRRvLvB1s_RmTQa8dAQPdCNN5qzRZx3HYz1ZDf5y95ENMyYDsfwgSjlMkrbh4EI90T_flY07FfKGnq19CFz404VLTPVr8PeO3Q83a-unnCFh8o-4xpBjAFNK3o4moDEg4otbl0qONbIiqOPRBHn0iB_X3VKCf5CepcgaUGcqbZstOraHWby5_myPxjo6jofZaetUIu9ExTwIpprqTvFsop4Q39xT1JXqy1VAyvDZYMpyfyh1jdiS1XjEENc/p.gif')",
      burn: "url('https://c.tenor.com/WhD4AWN30YkAAAAC/clouds-moving.gif')",
    },
    colors: {
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

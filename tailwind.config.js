module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        glowRed: {
          "0%,100%": {
            boxShadow: "0px 0px 0px 2px rgba(207,33,33,0)",
          },
          "50%": {
            boxShadow: "0px 0px 99px 12px rgba(207,33,33,0.75)",
          },
        },
      },
      animation: {
        glowRed: "glowRed 1s linear infinite",
      },
    },
  },
  plugins: [],
};

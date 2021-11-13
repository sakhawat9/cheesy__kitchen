module.exports = {
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'className'
  theme: {
    container: {
      center: true,
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1024px",
        xl: "1280px",
      },
    },
    fontFamily: {
      roboto: ["Roboto"],
      lora: ["Lora"],
    },
    extend: {
      colors: {
        "saffron": {
          DEFAULT: "#f4c340",
          50: "#fefcf5",
          100: "#fef9ec",
          200: "#fcf0cf",
          300: "#fbe7b3",
          400: "#f7d579",
          500: "#f4c340",
          600: "#dcb03a",
          700: "#b79230",
          800: "#927526",
          900: "#78601f",
        },
        "amazon": {
          DEFAULT: "#347758",
          50: "#f5f8f7",
          100: "#ebf1ee",
          200: "#ccddd5",
          300: "#aec9bc",
          400: "#71a08a",
          500: "#347758",
          600: "#2f6b4f",
          700: "#275942",
          800: "#1f4735",
          900: "#193a2b",
        },
        "theme-yellow": "#ffc727",
        "theme-yellow-dark": "#e6b323",
        "theme-dark": "#37474f",
      },

      height: {
        "screen-75": "80vh",
        "screen-50": "50vh",
      },
    },
  },

  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms", "@tailwindcss/aspect-ratio")],
};

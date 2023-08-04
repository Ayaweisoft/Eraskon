module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D73728",
        blue: "#090f3b",
        "blue-dark": "#0a1439",
        "blue-light": '#1a1f5c',
        gold: "#ffcb04",
        "gold-2": "#fed701"
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        argentinum: ["Argentum Sans", "sans-serif"],
      },
      keyframes: {
        around: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        animate: 'animate-left 2s ease-in-out once',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        asap: ['Asap', 'sans-serif'],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require("daisyui"),
    require("prettier-plugin-tailwindcss")
  ],
};

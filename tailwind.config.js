/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#333333",
        secondary: "#4F4F4F",
        accent: "#BDBDBD",
        btnPrimary: "#3DB46D",
        btnSecondary: "#EB5757",
      },
    },
  },
  plugins: [],
};

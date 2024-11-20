/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],

  content: [
    // Ensure this points to your source code...
    "./{app,components,functions}/**/*.{js,tsx,ts,jsx}",
    // If you use a `src` folder, add: './src/**/*.{js,tsx,ts,jsx}'
    // Do the same with `components`, `hooks`, `styles`, or any other top-level folders...
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

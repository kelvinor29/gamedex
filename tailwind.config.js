const colors = require('./theme/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        tertiary: colors.tertiary,
      },
      fontFamily: {
        satisfy: ['Satisfy_400Regular', 'sans-serif'],
        quicksand: ['Quicksand_700Bold', 'sans-serif'],
        inter: ['Inter_400Regular', 'sans-serif'],
      },
      fontSize: {
        'display-lg': 48,
        'headline-lg': 24,
        'body-lg': 16,
      },
    },
  },
  plugins: [],
};
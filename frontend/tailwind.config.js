/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '1/10': '12%',
      },
      fontFamily: {
        cursive: ['cursive'],
      },
      width: {
        '3/10': '30%',
      },
      colors: {
        'regal-blue': '#f9f9fd',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        'second-color': 'var(--second-color)',
        'third-color': 'var(--third-color)',
        customGray: '#c9c9c8',
      },
      inset: {
        '1/10': '8%',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight:true, // This disables the base styles (reset)
  }
};

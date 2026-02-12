/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#020617', // slate-950 equivalent for deep navy
        },
        cyan: {
          400: '#22d3ee', // default cyan-400
        }
      },
    },
  },
  plugins: [],
}


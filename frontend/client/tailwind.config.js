/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'phone': '428px', // Define a custom breakpoint
        'tablet': '768px', // Define a custom breakpoint  
        'custom': '980px', // Define a custom breakpoint
        'custom1': '1024px', // Define a custom breakpoint
      },
    },
  },
  plugins: [],
}
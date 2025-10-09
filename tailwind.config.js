/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#38a169", // Vibrant Green
        "secondary": "#a0522d", // Soil Brown
        "accent": "#f59e0b", // Terracotta
        "background-light": "#f0fdf4",
        "background-dark": "#1a202c",
        "text-light": "#1a202c",
        "text-dark": "#f7fafc"
      },
      fontFamily: {
        "sans": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

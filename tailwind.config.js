/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Bhutan-inspired soft palette
        brand: {
          gold: "#c8a45d",
          goldDark: "#a8893f",
          green: "#3f6b4e",
          greenDark: "#2c4f39",
          beige: "#f6f1e7",
          cream: "#fbf8f1",
          ink: "#1f2a24"
        }
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"]
      },
      maxWidth: {
        wrap: "1200px"
      }
    }
  },
  plugins: []
};

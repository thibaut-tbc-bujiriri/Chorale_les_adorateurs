/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f1f8f4",
          100: "#dcefe3",
          200: "#badfc8",
          300: "#90caa7",
          400: "#63ac83",
          500: "#458f67",
          600: "#357352",
          700: "#2b5b42",
          800: "#264937",
          900: "#223d31"
        },
        accent: {
          100: "#fff4df",
          300: "#ffd79d",
          500: "#f4b860",
          700: "#bb812e"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(34, 61, 49, 0.12)",
      },
      backgroundImage: {
        halo: "radial-gradient(circle at 20% 20%, rgba(98, 172, 131, 0.2), transparent 35%), radial-gradient(circle at 80% 0%, rgba(244, 184, 96, 0.2), transparent 30%)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

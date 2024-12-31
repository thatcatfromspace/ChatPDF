const flowbite = require("flowbite-react/tailwind");

/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        chat: "#E4E8EE",
        primary: "#0FA958",
      },
    },
  },
  plugins: [flowbite.plugin()],
};

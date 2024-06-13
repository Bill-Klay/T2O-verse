import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primaryDark: "#1d3557",
        primary: "#457b9d",
        secondary: "#a8dadc",
        "normal-1": "#ebf2fa",
        "normal-2": "#fffbff",
        speciale: "#e63946",
      },
      transitionProperty: {
        duration: "500ms",
      },
    },
  },
  plugins: [],
};
export default config;

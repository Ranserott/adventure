import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#022601", // Deep Forest - backgrounds, brand elements
        secondary: "#7DBF73", // Cactus Leaf - accents, stock badges, secondary buttons
        accent: "#A67246", // Earth/Coffee - primary action buttons
        neutral: "#D9D9D9", // Mist - secondary text, borders, light backgrounds
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;

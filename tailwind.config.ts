import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        soluna: {
          white: "#fffdfb",
          blush: "#f9e8ec",
          rose: "#e9b8c5",
          gold: "#c9a24d",
          silver: "#b9bdc5",
          ink: "#161313",
          graphite: "#403b3b",
        },
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 60px rgba(22, 19, 19, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;

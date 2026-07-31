import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        "surface-muted": "hsl(var(--surface-muted))",
        primary: "hsl(var(--primary))",
        "primary-hover": "hsl(var(--primary-hover))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "accent-gold": "hsl(var(--accent-gold))",
        "accent-silver": "hsl(var(--accent-silver))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        destructive: "hsl(var(--destructive))",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(3.5rem, 9vw, 7.5rem)", { lineHeight: "0.9" }],
        h1: ["clamp(2.75rem, 7vw, 5.75rem)", { lineHeight: "0.95" }],
        h2: ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1" }],
        h3: ["1.5rem", { lineHeight: "1.2" }],
        body: ["1rem", { lineHeight: "1.75" }],
        small: ["0.875rem", { lineHeight: "1.55" }],
        label: ["0.8125rem", { lineHeight: "1.3" }],
        eyebrow: ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.08em" }],
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        lift: "var(--shadow-lift)",
        card: "var(--shadow-card)",
      },
      borderRadius: {
        "soluna-sm": "var(--radius-sm)",
        soluna: "var(--radius-md)",
        "soluna-lg": "var(--radius-lg)",
      },
      transitionDuration: {
        fast: "var(--duration-fast)",
        standard: "var(--duration-standard)",
        slow: "var(--duration-slow)",
      },
      transitionTimingFunction: {
        soluna: "var(--ease-soluna)",
      },
    },
  },
  plugins: [],
};

export default config;

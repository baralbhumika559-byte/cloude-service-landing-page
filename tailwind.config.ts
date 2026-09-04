import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#2954E0",
          "primary-dark": "#1F3FB0",
          "primary-soft": "#E7ECFC",
          secondary: "#16B364",
          "secondary-soft": "#DEFBEA",
          bg: "#F8F9FC",
          "bg-raised": "#FFFFFF",
          ink: "#101828",
          "ink-soft": "#4B5565",
          "ink-faint": "#8891A0",
          line: "#E3E7F0",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        premium: "0 1px 2px rgba(16, 24, 40, 0.04), 0 12px 32px -8px rgba(41, 84, 224, 0.16)",
        card: "0 1px 2px rgba(16, 24, 40, 0.04), 0 4px 12px -4px rgba(16, 24, 40, 0.08)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(60% 50% at 50% 0%, rgba(41,84,224,0.14) 0%, rgba(41,84,224,0) 70%)",
        "soft-grid":
          "linear-gradient(rgba(16,24,40,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(16,24,40,0.035) 1px, transparent 1px)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;

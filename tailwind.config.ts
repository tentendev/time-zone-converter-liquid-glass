import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Inter",
          "sans-serif",
        ],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
        "2xl": "40px",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      const glassmorphismUtilities = {
        ".glass": {
          background: "rgba(255, 255, 255, 0.1)",
          "backdrop-filter": "blur(20px)",
          "border": "1px solid rgba(255, 255, 255, 0.2)",
        },
        ".glass-dark": {
          background: "rgba(0, 0, 0, 0.2)",
          "backdrop-filter": "blur(20px)",
          "border": "1px solid rgba(255, 255, 255, 0.1)",
        },
        ".glass-card": {
          background: "rgba(255, 255, 255, 0.05)",
          "backdrop-filter": "blur(16px)",
          "border": "1px solid rgba(255, 255, 255, 0.15)",
          "box-shadow": "0 8px 32px rgba(0, 0, 0, 0.1)",
        },
        ".glass-button": {
          background: "rgba(255, 255, 255, 0.15)",
          "backdrop-filter": "blur(12px)",
          "border": "1px solid rgba(255, 255, 255, 0.2)",
          transition: "all 0.2s ease-in-out",
        },
        ".glass-button:hover": {
          background: "rgba(255, 255, 255, 0.25)",
          transform: "translateY(-1px)",
        },
      };
      addUtilities(glassmorphismUtilities);
    },
  ],
};

export default config;
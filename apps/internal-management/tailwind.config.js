/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/shared/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Marcellus", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "oklch(0.46 0.11 160)",
          foreground: "oklch(0.985 0.01 106)",
          soft: "oklch(0.94 0.03 160)",
        },
        gold: {
          DEFAULT: "oklch(0.74 0.12 85)",
          foreground: "oklch(0.25 0.05 85)",
          soft: "oklch(0.95 0.045 88)",
        },
        success: {
          DEFAULT: "oklch(0.62 0.14 155)",
          foreground: "oklch(0.99 0.01 155)",
        },
        warning: {
          DEFAULT: "oklch(0.78 0.14 75)",
          foreground: "oklch(0.28 0.06 75)",
        },
        info: {
          DEFAULT: "oklch(0.6 0.1 235)",
          foreground: "oklch(0.99 0.01 235)",
        },
        destructive: {
          DEFAULT: "oklch(0.58 0.2 25)",
          foreground: "oklch(0.99 0.01 25)",
        },
        sidebar: {
          DEFAULT: "oklch(0.28 0.05 162)",
          foreground: "oklch(0.93 0.02 140)",
          primary: "oklch(0.74 0.12 85)",
          "primary-foreground": "oklch(0.22 0.04 85)",
          accent: "oklch(0.34 0.055 162)",
          "accent-foreground": "oklch(0.97 0.015 100)",
          border: "oklch(0.36 0.05 162)",
          ring: "oklch(0.74 0.12 85)",
        },
        border: "oklch(0.9 0.015 140)",
        input: "oklch(0.9 0.015 140)",
        ring: "oklch(0.46 0.11 160)",
        background: "oklch(0.985 0.008 106)",
        foreground: "oklch(0.22 0.03 160)",
        muted: {
          DEFAULT: "oklch(0.958 0.01 120)",
          foreground: "oklch(0.52 0.02 150)",
        },
        accent: {
          DEFAULT: "oklch(0.94 0.05 90)",
          foreground: "oklch(0.32 0.06 90)",
        },
        card: {
          DEFAULT: "oklch(1 0 0)",
          foreground: "oklch(0.22 0.03 160)",
        },
        popover: {
          DEFAULT: "oklch(1 0 0)",
          foreground: "oklch(0.22 0.03 160)",
        },
        secondary: {
          DEFAULT: "oklch(0.955 0.015 140)",
          foreground: "oklch(0.32 0.06 160)",
        },
        chart: {
          1: "oklch(0.46 0.11 160)",
          2: "oklch(0.74 0.12 85)",
          3: "oklch(0.62 0.09 200)",
          4: "oklch(0.68 0.12 135)",
          5: "oklch(0.55 0.1 300)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

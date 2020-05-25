module.exports = {
  purge: [],
  theme: {
    screens: {
      sm: { min: "640px", max: "767px" },
      md: { min: "768px", max: "1023px" },
      lg: { min: "1024px", max: "1279px" },
      xl: { min: "1280px" },
    },
    spacing: {
      "1": "8px",
      "2": "12px",
      "3": "16px",
      "4": "24px",
      "5": "32px",
      "6": "48px",
      sm: "8px",
      md: "12px",
      lg: "16px",
      xl: "24px",
    },
    textColor: {
      primary: "var(--color-text-primary)",
      secondary: "var(--color-text-secondary)",
      default: "var(--color-text-default)",
      "default-soft": "var(--color-text-default-soft)",
      inverse: "var(--color-text-inverse)",
      "inverse-soft": "var(--color-text-inverse-soft)",
    },
    backgroundColor: {
      primary: "var(--color-bg-primary)",
      secondary: "var(--color-bg-secondary)",
      default: "var(--color-bg-default)",
      inverse: "var(--color-bg-inverse)",
    },
    fontFamily: {
      display: "var(--font-display)",
      body: "var(--font-body)",
    },
    fontWeights: {
      normal: "var(--font-weight-normal)",
      display: "var(--font-weight-display)",
      btn: "var(--font-weight-btn)",
    },
    borderRadius: {
      none: "0",
      btn: "var(--rounded-btn)",
    },
  },
  variants: {
    appearance: ["responsive"],
    borderColor: ["responsive", "hover", "focus"],
    outline: ["responsive", "focus"],
    zIndex: ["responsive"],
  },
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("tailwindcss-theming"),
  ],
}

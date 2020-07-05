// tailwind.config.js

module.exports = {
  important: true,
  theme: {
    colors: {
      black: "#212121",
      white: "#FFFFFF",
      light: "#EEEEEE",
      dark: "#979797",
      red: "#AE3A34",
      green: "#2F6C30",
      orange: "#F29441",
      yellow: "#F2C85B",
      violet: "#A13670",
      purple: "#3A0751",
    },
    fontFamily: {
      sans: ["Avenir", "Varela", "Arial", "sans-serif"],
      serif: ["Kepler", "Varela", "serif"],
      mono: ["Menlo", '"Liberation Mono"', '"Courier New"', "monospace"],
      display: ["Kepler", "Varela", "serif"],
      body: ["Avenir", "Varela", "Arial", "sans-serif"],
    },
    fontSize: {
      "2xs": "0.5rem",
      xs: "0.64rem",
      sm: "0.8rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      "6xl": "3.815rem",
    },
    borderWidth: {
      default: "1px",
      "0": "0",
      "1": "1px",
      "2": "2px",
      "3": "3px",
      "4": "4px",
    },
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      default: "0.375rem",
      md: "0.375rem",
      lg: "0.75rem",
      full: "9999px",
    },
    extend: {
      colors: {
        cyan: "#9cdbfe",
      },
      margin: {
        "96": "24rem",
        "128": "32rem",
      },
    },
  },
  variants: {
    opacity: ["responsive", "hover"],
    backgroundColor: ["responsive", "hover", "focus"],
    fontFamily: ["responsive", "hover", "focus"],
    fontSize: ["responsive"],
  },
}

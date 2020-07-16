//postcss.config.js
const tailwindcss = require("tailwindcss")
module.exports = {
  plugins: [
    tailwindcss("./src/assets/tailwind/tailwind.js"),
    require("autoprefixer"),
  ],
}

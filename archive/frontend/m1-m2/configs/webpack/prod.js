// production config
const merge = require("webpack-merge")
const { resolve } = require("path")
const commonConfig = require("./common")
const SentryWebpackPlugin = require("@sentry/webpack-plugin")

module.exports = merge(commonConfig, {
  mode: "production",
  entry: "./index.tsx",
  output: {
    filename: "js/bundle.[hash].min.js",
    path: resolve(__dirname, "../../dist"),
    publicPath: "/",
  },
  devtool: "source-map",
  plugins: [
    new SentryWebpackPlugin({
      include: ".",
      ignoreFile: ".sentrycliignore",
      ignore: ["node_modules", "webpack.config.js"],
      configFile: "sentry.properties",
      release: process.env.SENTRY_RELEASE,
    }),
  ],
})

// Deprecated, not working, using lessc command instead
const path = require("path")

const merge = require("webpack-merge")
const multipleThemesCompile = require("webpack-multiple-themes-compile")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const webpackConfigs = {
  mode: "none",
  output: {
    path: path.join(__dirname, "../../dist/rsuite"),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.[name].css",
    }),
  ],
}

module.exports = merge(
  webpackConfigs,
  multipleThemesCompile({
    styleLoaders: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      { loader: "css-loader" },
      {
        loader: "less-loader",
        options: { lessOptions: { javascriptEnabled: true } },
      },
    ],
    themesConfig: {
      default: {
        color: "#999",
      },
      dark: {
        import: [
          path.join(__dirname, "../../src/assets/rsuite/rsuite-dark.less"),
        ],
        color: "#333",
      },
      light: {
        color: "#eee",
      },
    },
    lessContent: "body{color:@color}",
  })
)

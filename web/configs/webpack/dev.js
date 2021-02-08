// development config
const merge = require("webpack-merge")
const webpack = require("webpack")
const commonConfig = require("./common")
const { resolve } = require("path")

module.exports = merge(commonConfig, {
  mode: "development",
  entry: [
    "react-hot-loader/patch", // activate HMR for React
    "webpack-dev-server/client?https://samantha.chentingdong.net:2000", // bundle the client for webpack-dev-server and connect to the provided endpoint
    "webpack/hot/only-dev-server", // bundle the client for hot reloading, only- means to only hot reload for successful updates
    "./index.tsx", // the entry point of our app
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: resolve("dist"),
    // enable HMR on the server
    hot: true,
    https: true,
  },
  output: {
    publicPath: "/",
  },
  devtool: "source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
  ],
})

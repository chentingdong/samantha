const path = require("path");
const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  context: __dirname,
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  entry: slsw.lib.entries,
  devtool: slsw.lib.webpack.isLocal
    ? "cheap-module-eval-source-map"
    : "source-map",
  resolve: {
    extensions: [".mjs", ".json", ".ts", ".tsx", ".js", ".jsx", ".pem"],
    symlinks: false,
    cacheWithContext: false,
  },
  output: {
    libraryTarget: "commonjs2",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js",
  },
  watch: false,
  target: "node",
	node: {
		__dirname: false,
		__filename: false,
	},
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  node: true,
                },
              },
            ],
            "@babel/typescript",
          ],
        },
        include: [__dirname],
        exclude: /node_modules/,
      },
      {
        test: /\.pem$/i,
        use: [
          {
            loader: "raw-loader",
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    // new ForkTsCheckerWebpackPlugin({
    //   eslint: true,
    //   eslintOptions: {
    //     cache: true
    //   }
    // })
  ],
};

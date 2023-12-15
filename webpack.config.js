const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isDevelopment = argv.mode == "development" ? true : false;

  return {
    entry: "./src/index.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "docs"),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.html$/i,
          use: ["html-loader"],
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    mode: isDevelopment ? "development" : "production",
    devServer: {
      static: path.join(__dirname, "docs"),
      open: isDevelopment,
    },
    resolve: {
      fallback: {
        fs: false,
        https: false,
        http: false,
        path: false,
        querystring: false,
        url: false,
        util: false,
        vm: false,
        os: false,
        child_process: false,
      },
    },
  };
};

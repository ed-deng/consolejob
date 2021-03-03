const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // webpack will take the files from ./client/index
  entry: "./client/index.js",
  mode: process.env.NODE_ENV,
  // and output it into /dist as bundle.js
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
    publicPath: "/dist/",
  },
  resolve: {
    modules: [path.join(__dirname, "node_modules")],
  },
  // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
  module: {
    rules: [
      // we use babel-loader to load our jsx and tsx files
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      // sass-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{ loader: "file-loader" }],
      },
    ],
  },
  devServer: {
    host: "localhost",
    port: 8080,
    // "Content not from Webpack is served from...":
    contentBase: path.join(__dirname, "/"),
    // enable HMR on the devServer
    hot: true,
    // fallback to root for other urls
    historyApiFallback: true,
    inline: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    proxy: {
      "/": {
        target: "http://localhost:3000/",
        secure: false,
      },
      "/login": {
        target: "http://localhost:3000/",
        secure: false,
      },
      "/auth/github": {
        target: "http://localhost:3000/",
        secure: false,
      },
      "/auth/github/callback/*": {
        target: "http://localhost:3000/",
        secure: false,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/index.html",
      filename: "index.html",
      inject: "body",
    }),
  ],
};

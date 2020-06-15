const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    Actor: "./src/Pages/Actor.js",
    Favorite: "./src/Pages/Favorite.js",
    Home: "./src/Pages/Home.js",
    Info: "./src/Pages/Info.js",
    Search: "./src/Pages/Search.js",
    ShowInfo: "./src/Pages/ShowInfo.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "assets", "scripts"),
    publicPath: "assets/scripts/",
  },

  devtool: "cheap-module-eval-source-map",

  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};

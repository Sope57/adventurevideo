var debug = process.env.NODE_ENV !== "production";
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var precss = require('precss');
var webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/client.js",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        }
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass-loader")
      }
    ]
  },
  output: {
    path: __dirname + "/src/",
    filename: "client.min.js"
  },
  plugins: debug ? [
    new ExtractTextPlugin('styles.css'),
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new ExtractTextPlugin('styles.css')
  ],
};
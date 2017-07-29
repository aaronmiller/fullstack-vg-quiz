const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = {
  entry: [
    './src/js/index.js',
    './src/less/index.less'
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'js/bundle.js'
  },

  module: {
    rules: [
      // JavaScript Rules
      {
        test: /.js?$/,
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loader: 'babel-loader',
        options: {
          presets: 'es2015'
        }
      },
      // CSS Rules
      {
        test: /\.css?$/,
        use: ExtractTextPlugin.extract(['css-loader?sourceMap', 'postcss-loader?sourceMap'])
      },
      // Less Rules
      {
        test: /\.less?$/,
        use: ExtractTextPlugin.extract(['css-loader?sourceMap','less-loader?sourceMap'])
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('css/bundle.css')
  ],
};

module.exports = config;

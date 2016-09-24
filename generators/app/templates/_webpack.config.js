const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PostcssImport = require('postcss-easy-import');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

const APP = __dirname + '/app';
const BUILD = __dirname + '/build';
const STYLE = __dirname + '/app/style.css';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const TEMPLATE = __dirname + '/app/templates/index_default.html';

module.exports = {
  entry: {
    app: APP,
    style: STYLE
  },
  output: {
    path: BUILD,
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: APP
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss'],
        include: APP
      }
    ]
  },
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    stats: 'errors-only',
    host: HOST,
    port: PORT,
    outputPath: BUILD
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: TEMPLATE,
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  postcss: function() {
    return [
      PostcssImport ({
        addDependencyTo: webpack,
        prefix: '_'
      }),
      precss,
      autoprefixer({ browsers: ['last 2 versions'] })
    ];
  }
};

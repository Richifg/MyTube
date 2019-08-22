const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractplugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/ts/index.tsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  resolve: { extensions: ['.ts', '.tsx', '.js'] },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: '/node_modules/',
        use: 'ts-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractplugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractplugin(),
  ],
};

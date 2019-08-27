const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractplugin = require('mini-css-extract-plugin');

const errorMsg = `
No API key provided!!
  Try running the following commands: 
    npm start "REPLACE_THIS_WITH_API_KEY"
      or
    yarn start "REPLACE_THIS_WITH_API_KEY"
`;

module.exports = env => {
  // env is only passed when running start script
  let definePluginOptions = {};
  if (env) {
    if (typeof env.apikey !== 'boolean') {
      definePluginOptions['process.env.APIKEY'] = JSON.stringify(env.apikey);
      // prints in green
      console.log('\x1b[32m',`An API key was provided: ${env.apikey}`,'\x1b[0m');
    } else {
      // prints in red
      console.log('\x1b[31m', errorMsg,'\x1b[0m');
    }
  } else {
    definePluginOptions['process.env.APIKEY'] = JSON.stringify(process.env.APIKEY);
  }

  return {
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
      new HtmlWebpackPlugin({ template: './src/index.html' }),
      new MiniCssExtractplugin(),
      new webpack.DefinePlugin(definePluginOptions),
    ],
  };
}

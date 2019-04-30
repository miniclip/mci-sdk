const webpack = require('webpack');
const path = require('path');

const packageConfig = require(path.resolve(__dirname, "package.json"))

module.exports = {
  mode: 'production',
  entry: { 
    'mcinstant': './src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'MCInstant',
    umdNamedDefine: true
  }, 
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'source-map',
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
              loader: 'ts-loader',
              options: {
                transpileOnly: true
              }
          }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(packageConfig.version)
    })
  ]
}
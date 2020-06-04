const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const filename = ext => isProduction ? `bundle.[hash].${ext}` : `bundle.${ext}`
const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  ]

  if (!isProduction) loaders.push('eslint-loader')

  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core')
    }
  },
  devtool: isProduction && 'source-map',
  devServer: {
    port: 4200,
    hot: !isProduction
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: isProduction
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/favicon.ico'), to: 'dist' }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js/i,
        exclude: '/node-modules/',
        use: jsLoaders()
      },
      {
        test: /\.s[ac]ss/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !isProduction,
              reloadAll: true
            }
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}

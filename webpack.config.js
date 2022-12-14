const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: [
    'whatwg-fetch',
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'dist'),
      publicPath: '/dist',
    },
    proxy: {
      '/**': {
        target: 'http://localhost:3000/',
        secure: false,
        changeOrigin: true,
      },
      '/assets/**': {
        target: 'http://localhost:3000/',
        secure: false,
        changeOrigin: true,
      },
      '/home?code=**': {
        target: 'http://localhost:3000/',
        secure: false,
        changeOrigin: true,
      },
      '/signedin': {
        target: 'http://localhost:3000/',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new Dotenv(),
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
            plugins: ['@babel/plugin-syntax-jsx', "@babel/plugin-transform-react-jsx"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
}
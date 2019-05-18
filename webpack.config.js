const path = require('path')
const webpack = require('webpack')

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')

module.exports = {
  mode: 'development',
  entry: {
    app: './src/js/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      }],
    },
    // {
    //   test: /\.html$/,
    //   use: ['html-loader'],
    // },
    {
      test: /\.(mp4|webm)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'video/[name].[ext]',
        },
      }],
    },
    {
      test: /\.(OTF|otf)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      }],
    },
    {
      test: /\.(gif|png|jpe?g)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
        },
        // include: path.join(__dirname, 'src')
      },
      {
        loader: 'image-webpack-loader',
        options: {
          bypassOnDebug: true,
          mozjpeg: {
            progressive: true,
            quality: 65,
          },
          // optipng.enabled: false will disable optipng
          optipng: {
            enabled: false,
          },
          pngquant: {
            quality: '65-90',
            speed: 4,
          },
          gifsicle: {
            interlaced: false,
          },
        },
      },
      ],
    },
    {
      test: /\.svg$/,
      loader: 'svg-inline-loader',
    },
    {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'sass-loader',
      },
      ],
    },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Webpack template',
      myPageHeader: 'Hello World',
      template: './src/index.html',
      filename: 'index.html', // relative to root of the application
      showErrors: true,
      env: 'dev',
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new DashboardPlugin({
      host: '127.0.0.1',
    }),
  ],
}

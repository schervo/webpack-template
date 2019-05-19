/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const webpack = require('webpack')
const glob = require('glob-all')

const fs = require('fs')


// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const OfflinePlugin = require('offline-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')


const PUBLIC_PATH = '' // webpack needs the trailing slash for output.publicPath

const getFilesToCopy = () => {
  const files = [
    // {
    //   from: './src/images/logo.png',
    //   to: './images',
    // },
  ]

  // if (process.env.NODE_ENV !== 'firebase') {
  //   files.push(
  //     {
  //       from: './src/PHPMailer-master',
  //       to: './PHPMailer-master',
  //       toType: 'dir',
  //     },
  //     {
  //       from: './src/process.php',
  //       to: './',
  //     },
  //   )
  // }

  return files
}


const getComponents = () => {
  const content = fs.readFileSync('./src/js/app.js', 'utf8')

  const arrayOfLines = content.match(/[^\r\n]+/g)

  const components = arrayOfLines.slice(arrayOfLines.indexOf('// <components>') + 1, arrayOfLines.indexOf('// </components>'))

  const paths = components.reduce((accum, component) => {
    accum.push(path.join(__dirname, `node_modules/${component.match(/'(.*)'/).pop()}.js`))
    return accum
  }, [])

  return paths
}
module.exports = {
  mode: 'production',
  entry: {
    app: ['./src/js/app.js', 'jquery'],
  },
  output: {
    // path: path.resolve(__dirname, 'dist'),
    // filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[hash].js',
    publicPath: PUBLIC_PATH,
    // publicPath: '/assets/',
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
      test: /\.mp4$/,
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
      use: [
        // {
        //   loader: 'file-loader',
        //   options: {
        //     name: 'images/[name].[ext]',
        //   },
        // // include: path.join(__dirname, 'src')
        // },
        // {
        //   loader: 'image-webpack-loader',
        //   options: {
        //     bypassOnDebug: true,
        //     mozjpeg: {
        //       progressive: true,
        //       quality: 65,
        //     },
        //     optipng: {
        //       optimizationLevel: 7,
        //     },
        //     pngquant: {
        //       quality: '65-90',
        //       speed: 1,
        //     },
        //     gifsicle: {
        //       interlaced: false,
        //     },
        //   },
        // },
        {
          loader: 'responsive-loader',
          options: {
            sizes: [300, 600, 1200, 2000],
            placeholder: true,
            placeholderSize: 50,
            outputPath: 'images/',
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
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader',
      ],
    },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /jquery/, // you may add "vendor.js" here if you want to
          name: 'vendor',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Webpack template',
      myPageHeader: 'Hello World',
      template: './src/index.html',
      filename: 'index.html', // relative to root of the application
      env: 'prod',
      minify: {
        removeComments: true,
        collapseWhitespace: false,
      },
    }),
    new ScriptExtHtmlWebpackPlugin({
      defer: ['app', 'vendor'],
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      // chunkFilename: '[id].css',
    }),
    new PurifyCSSPlugin({
      paths: glob.sync([
        path.join(__dirname, 'src/*.html'),
        path.join(__dirname, 'src/js/app.js'),
        ...getComponents(),
      ]),
      minimize: true,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlCriticalWebpackPlugin({
      base: path.resolve(__dirname, 'dist'),
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      extract: true,
      width: 375,
      height: 565,
      penthouse: {
        blockJSRequests: false,
      },
    }),
    new CopyWebpackPlugin(getFilesToCopy()),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif)$/i,
    }),
    new OfflinePlugin(),
    new SWPrecacheWebpackPlugin({
      cacheId: 'webpack-temp',
      filename: 'webpack-tem-service-worker.js',
      staticFileGlobs: [
        'dist/**.*',
      ],
      stripPrefix: 'dist/', // stripPrefixMulti is also supported
      mergeStaticsConfig: true,
      staticFileGlobsIgnorePatterns: [/\.map$/], // use this to ignore sourcemap files
    }),
    // new BundleAnalyzerPlugin(),
  ],
}

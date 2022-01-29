const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');


// TODO: Add and configure workbox plugins for a service worker and manifest file.


module.exports = {

  mode: 'production',
  // devtool: 'eval-source-map',
  entry: {
    main: './src/js/index.js',
    install: './src/js/install.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Webpack Plugin',
      favicon: './favicon.ico'
    }),
    new MiniCssExtractPlugin(),
    new GenerateSW({
      additionalManifestEntries: [
        { url: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/codemirror.min.css',  revision: null} ,
        { url: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/codemirror.min.js', revision: null },
        { url: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/mode/javascript/javascript.min.js', revision: null },
        { url: 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/monokai.min.css', revision: null }
      ],
      runtimeCaching: [
        {
          urlPattern: /\.(?:json)$/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'manifest'
          }
        },
        {
        // Match any request that ends with .png, .jpg, .jpeg or .svg.
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

        // Apply a cache-first strategy.
        handler: 'CacheFirst',

        options: {
          // Use a custom cache name.
          cacheName: 'images',

          // Only cache 10 images.
          expiration: {
            maxEntries: 10,
          },
        },
      }],
    }),
    new WebpackPwaManifest({
      fingerprints: false,
      inject: true,
      name: 'Just Another Text Editor',
      short_name: 'JATE',
      description: 'Takes notes with JavaScript syntax highlighting!',
      background_color: '#225ca3',
      theme_color: '#225ca3',
      start_url: '/',
      publicPath: '/',
      icons: [
        {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        // We use babel-loader in order to use ES6.
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
          },
        },
      },
    ],
  },
};


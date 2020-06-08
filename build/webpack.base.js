const path = require('path');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const webpack = require('webpack');
const pkg = require('../package.json');

module.exports = {
  entry: {
    Previewer: './src/ts/index.ts',
  },

  resolve: {
    extensions: ['.ts', '.js', '.scss', '.json'],
  },

  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'index.js',
    library: '[name]',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    publicPath: '/',
  },

  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer, cssnano],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      __VERSION: `"${pkg.version}"`,
    }),
  ],
};

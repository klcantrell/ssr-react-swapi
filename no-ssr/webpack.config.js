const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const setupAPI = () => {
  switch(process.env.NODE_ENV) {
    case 'development':
      return '"http://localhost:3000"';
    case 'production':
      return '"https://acbg7strld.execute-api.us-east-2.amazonaws.com/dev"';
  }
};

const browserConfig = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, 
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __API_BASE__: setupAPI(),
    }),
  ]
};

const htmlWebpackPlugin = process.env.NODE_ENV === 'production' ?
  new HtmlWebpackPlugin({
    template: path.join('src/index.html'),
    inject: false,
    minify: {
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      html5: true,
      minifyCSS: true,
      removeComments: true,
      removeEmptyAttributes: true
    }
  }) :
  new HtmlWebpackPlugin({
    template: path.join('src/index.html'),
    inject: false,
  });

if (process.env.NODE_ENV === 'production') {
  browserConfig.plugins.push(
    htmlWebpackPlugin,
    new MinifyPlugin({}, {
      exclude: /node_modules/
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$/,
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: true,
    }),
  );
}

module.exports = browserConfig;
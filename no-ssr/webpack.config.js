const path = require('path');
const webpack = require('webpack');

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
    // new CompressionPlugin({
    //   asset: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: /\.(ttf|woff)$/,
    //   threshold: 10240,
    //   minRatio: 0.8,
    //   deleteOriginalAssets: true,
    // }),
  ]
};

module.exports = browserConfig;
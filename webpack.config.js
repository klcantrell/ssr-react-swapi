const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CompressionPlugin = require('compression-webpack-plugin');

const setupAPI = () => {
  switch(process.env.NODE_ENV) {
    case 'development':
      return '"http://localhost:3000"';
    case 'production':
      return '"https://acbg7strld.execute-api.us-east-2.amazonaws.com/dev/"';
  }
};

const setupServerPublicPath = () => {
  switch(process.env.NODE_ENV) {
    case 'development':
      return '/';
    case 'production':
      return 'https://s3.us-east-2.amazonaws.com/kals-portfolio-assets/ssr-react-swapi/';
  }
};

const setupStaticUrl = () => {
  switch(process.env.NODE_ENV) {
    case 'development':
      return '"/"';
    case 'production':
      return '"https://s3.us-east-2.amazonaws.com/kals-portfolio-assets/ssr-react-swapi/"';
  }
};

const serverPublicPath = setupServerPublicPath();

const browserConfig = {
  entry: './src/browser/index.js',
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
    })
  ]
};

const serverConfig = {
  entry: './src/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: serverPublicPath,
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      { 
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader' 
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'responsive-loader',
          options: {
            sizes: [240, 150],
            placeholder: true,
            placeholderSize: 50,
            name: '[name]-[width].[ext]',
          }
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'public/',
            publicPath: serverPublicPath,
            // publicPath: 'https://s3.us-east-2.amazonaws.com/kals-portfolio-assets/fonts/',
          },
        },
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __STATIC_URL__: setupStaticUrl(),
    })
    // new CompressionPlugin({
    //   asset: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: /\.(ttf|woff)$/,
    //   threshold: 10240,
    //   minRatio: 0.8,
    //   deleteOriginalAssets: true,
    // }),
  ],
};

module.exports = [browserConfig, serverConfig]
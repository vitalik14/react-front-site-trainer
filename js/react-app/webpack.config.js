const path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');

const resolve = filePath => path.join(__dirname, filePath);

module.exports = {
  entry: resolve('src/index.js'),
  output: {
    path: resolve('/dist/'),
    filename: '[name].js',
    publicPath: '/purlife/assets/js/react-app/dist/',
  },
  plugins: [
    new LiveReloadPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-transform-react-jsx',
            '@babel/plugin-proposal-class-properties',
          ],
        },
      },
      {
        test: /\.(scss|css)$/,
        exclude: [resolve('src/assets/styles')],
        loaders: [
          'style-loader?sourceMap',
          'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'resolve-url-loader',
          'sass-loader?sourceMap',
        ],
      },
      {
        test: /\.(scss|css)$/,
        include: [resolve('src/assets/styles')],
        loaders: [
          'style-loader?sourceMap',
          'css-loader',
          'resolve-url-loader',
          'sass-loader?sourceMap',
        ],
      },
      {
        test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(png|gif)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
    ],
  },
};

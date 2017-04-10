const path = require('path');

module.exports = {
  entry: './src/js/entry.js',
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: (process.env.NODE_ENV === 'production') ? 'bundle.min.js' : 'bundle.dev.js',
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.jsx?$/,
        exclude: /node_modules/,
      },
    ],
  },
  devtool: (process.env.NODE_ENV === 'production') ? false : 'source-map',
};

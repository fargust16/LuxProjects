var webpack = require('webpack');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/public/build/",
    publicPath: "build/",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader'
        ]
      },
      { 
        test: /\.(js|jsx)$/,
        use:  [
           { loader: 'babel-loader', options: { presets: ['es2015', 'react'] } }
        ],
        exclude: /node_modules/, 
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.svg/,
        use: "url-loader?limit=26000&mimetype=image/svg+xml"
      }
    ]
  }
}
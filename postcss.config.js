module.exports = {
  map: false,
  from: './src.css',
  to: './public/css/dest.css',
  plugins: {
    'postcss-import': {},
    'postcss-nested': {},
    'autoprefixer': {}
  }
}
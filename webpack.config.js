const path = require('path');

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

module.exports = {
  entry: {
    content: path.join(src, 'content'),
    background: path.join(src, 'background'),
  },

  output: {
    path: dist,
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.js'],
  },
};

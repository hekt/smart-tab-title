const path = require('path');

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'extension/dist');

module.exports = {
  entry: {
    content: path.join(src, 'script/content.js'),
    background: path.join(src, 'script/background.js'),
  },

  output: {
    path: dist,
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.js'],
  },
};

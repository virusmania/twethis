const path = require('path');

module.exports = {
  entry: {
    content: path.join(__dirname, "src/content_main.js"),
    background: path.join(__dirname, "src/background.js")
  },
  output: {
    path: path.join(__dirname, "src/"),
    filename: "[name]_output.js",
  },
  resolve: {
    fallback:{
        path: require.resolve("path-browserify")
    }
  },
};
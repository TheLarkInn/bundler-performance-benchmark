module.exports = {
  entry: "./src",
  output: {
    filename: "dist/webpack-bundle.js"
  },
  module: {
    rules: [
      {
        test: /lodash-es/,
        sideEffects: false
      }
    ]
  }
};

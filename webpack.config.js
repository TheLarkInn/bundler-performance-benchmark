const path = require("path");

module.exports = env => ({
  entry: `./examples/${env.example}/src`,
  output: {
    path: path.join(__dirname, "examples", `${env.example}`, "dist-webpack"),
    filename: "build.webpack.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: "babel-loader"
      },
      {
        test: /lodash-es/,
        sideEffects: false
      }
    ]
  }
});

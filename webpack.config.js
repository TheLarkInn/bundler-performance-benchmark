const path = require("path");

module.exports = (env) => ({
  entry: `./examples/${env.example}/src`,
  output: {
    path: path.join(__dirname, "examples", `${env.example}`, "dist"),
    filename: "build.webpack.js"
  },
  module: {
    rules: [
      {
        test: /lodash-es/,
        sideEffects: false
      }
    ]
  }
});

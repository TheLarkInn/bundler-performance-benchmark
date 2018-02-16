const path = require("path");

module.exports = dir => ({
  entry: `./${dir}/src`,
  output: {
    path: path.join(__dirname, dir, "dist", "webpack"),
    filename: "index.js"
  },
});

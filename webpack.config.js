const path = require("path");

module.exports = {
  entry: `./todomvc/src`,
  output: {
    path: path.join(__dirname, "todomvc", "dist", "webpack"),
    filename: "index.js"
  },
};

const Bundler = require("parcel-bundler");
const webpack = require("webpack");
const path = require("path");
const Benchmark = require("benchmark");

const exampleName = path.basename(__dirname);

const defaultConfig = require("../../webpack.config")({ example: exampleName });
const index = path.join(__dirname, "src", "index.js");
const suite = new Benchmark.Suite();
let output = [];
suite
  .add(
    "parcel",
    deferred => {
      const bundler = new Bundler(index, {
        outDir: path.join(__dirname, "dist-parcel"),
        cache: false,
        logLevel: 0
      });
      console.log("Starting");
      bundler.bundle().then(_ => {
        console.log("Succeded");
        deferred.resolve();
      });
    },
    {
      defer: true
    }
  )
  .add(
    "webpack",
    deferred => {
      webpack(defaultConfig, (err, stats) => {
        deferred.resolve();
      });
    },
    {
      defer: true
    }
  )
  .on("cycle", function(event) {
    output.push(String(event.target));
  })
  .on("complete", function() {
    output.forEach(element => {
      console.log(element);
    });
    console.log("Fastest is " + this.filter("fastest").map("name"));
    process.exit(0);
  })
  .run({ async: true });

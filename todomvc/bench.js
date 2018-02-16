const Bundler = require("parcel-bundler");
const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const Benchmark = require("benchmark");
const { humanifyCycleStats } = require("../util");

const defaultConfig = require("../webpack.config");
const index = path.join(__dirname, "src", "index.js");
const suite = new Benchmark.Suite();
let output = [];
suite
  .add(
    "parcel",
    deferred => {
      const bundler = new Bundler(index, {
        outDir: path.join(__dirname, "dist", "parcel"),
        cache: false,
        logLevel: 0
      });
      bundler.bundle().then(_ => {
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
    output.push(humanifyCycleStats(__dirname, event));
  })
  .on("complete", function() {
    output.forEach(entry => {
      console.log(`${entry.bundler}: ${entry.buildTime} | ${entry.buildSize}`);
    });
    console.log(`Fastest is ${this.filter("fastest").map("name")}.`);
    process.exit(0);
  })
  .run({ async: true });
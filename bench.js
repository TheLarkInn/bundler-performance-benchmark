const chalk = require('chalk');
const Bundler = require("parcel-bundler");
const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const Benchmark = require("benchmark");
const { humanifyCycleStats } = require("./util");

const suites = process.argv.slice(2);

suites.forEach(dir => {
    const defaultConfig = require("./webpack.config")(dir);
    const index = path.join(dir, "src", "index.js");

    const suite = new Benchmark.Suite(dir);
    let output = [];
    suite
      .add(
        "parcel",
        deferred => {
          const bundler = new Bundler(index, {
            outDir: path.join(dir, "dist", "parcel"),
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
        output.push(humanifyCycleStats(dir, event));
      })
      .on("complete", function() {
        console.log(chalk.bold(`\n${dir}\n${dir.replace(/./g, '-')}\n`));
        output.forEach(entry => {
          console.log(`${entry.bundler}: ${entry.buildTime} | ${entry.buildSize}`);
        });
        console.log(chalk.green(`Fastest is ${this.filter("fastest").map("name")}.\n`));
        process.exit(0);
      })
      .run({ async: true });
});

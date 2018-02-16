const chalk = require('chalk');
const Table = require('cli-table');
const Bundler = require("parcel-bundler");
const { version: parcelVersion } = require('parcel-bundler/package.json');
const webpack = require("webpack");
const { version: webpackVersion } = require('webpack/package.json');
const fs = require("fs");
const path = require("path");
const Benchmark = require("benchmark");
const { orderBy } = require('lodash');
const { humanifyCycleStats } = require("./util");

const suites = process.argv.slice(2);

suites.forEach(dir => {
    const defaultConfig = require("./webpack.config")(dir);
    const index = path.join(dir, "src", "index.js");

    const suite = new Benchmark.Suite(dir);
    let output = [];
    suite
      .add(
        `parcel@${parcelVersion}`,
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
        `webpack@${webpackVersion}`,
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

        var table = new Table({
            head: ['bundler', 'time', 'output size'].map(x => chalk.green(x)),
        });

        orderBy(output, 'buildTime').forEach(entry => {
          table.push([
            `${entry.bundler}@${entry.bundlerVersion}`,
            entry.buildTime,
            entry.buildSize,
          ])
        });

        console.log(chalk.bold(`\n> ${dir}\n`));
        console.log(table.toString());
        console.log(`\n`)

        process.exit(0);
      })
      .run({ async: true });
});

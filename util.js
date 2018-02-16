const fs = require("fs");
const path = require("path");
const filesize = require("file-size");

function getFolderSize(dir) {
  const files = fs.readdirSync(dir);

  let totalSize = 0;
  for (let i = 0; i < files.length; i++) {
    const stats = fs.statSync(path.join(dir, files[i]));
    if (stats.isFile()) {
      totalSize += stats.size;
    }
  }
  return totalSize;
}

function humanifyCycleStats(sampleDirectory, event) {
  const [name, version] = event.target.name.split('@');
  const stats = event.target.stats;
  let mean = stats.mean;
  let unit = "s";
  if (mean < 1) {
    mean = mean * 1000;
    unit = "ms";
  }
  mean = mean.toFixed(2);
  const distDir = path.join(sampleDirectory, "dist", name);
  const dirSize = getFolderSize(distDir);
  return {
    bundler: name,
    bundlerVersion: version,
    buildTime: `${mean}${unit}`,
    buildSize: filesize(dirSize).human(),
  };
}
module.exports = {
  getFolderSize,
  humanifyCycleStats
};

# bundler-performance-benchmark

## Why

Showing numbers means nothing if you can't back it up. This is a joint effort between all bundlers involved to create a fair and unbiased set of benchmarks for build and size performance.

## How to Run

* Clone repo
* run `yarn`
* run `yarn bench`

### TodoMVC

```
┌───────────────────────┬─────────┬─────────────┐
│ bundler               │ time    │ output size │
├───────────────────────┼─────────┼─────────────┤
│ webpack@4.0.0-alpha.1 │ 23.07ms │ 23.12 KiB   │
├───────────────────────┼─────────┼─────────────┤
│ parcel@1.2.1          │ 66.58ms │ 23.56 KiB   │
└───────────────────────┴─────────┴─────────────┘
```

## Adding more projects

1. Create a folder for it, mirroring the general structure of todomvc (src/index.js as the entry, dist as output)
1. Add the folder to the "workspaces" key in the root `package.json`
1. Add the directory name to the "bench" script target in the root `package.json`
1. Each bundler will emit to its own directory inside the project's `dist` folder

## Help Wanted

Need help organizing and setting up multiple real world scenarios for all bundlers to run.

Feel free to checkout existing example or optimize the workflow via PR.

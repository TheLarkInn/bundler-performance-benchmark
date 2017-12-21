# bundler-performance-benchmark

## Why
Showing numbers means nothing if you can't back it up. This is a joint effort between all bundlers involved to create a fair and unbiased set of benchmarks for build and size performance. 

## How to Run
* Clone repo
* run `yarn`
* run `yarn build:webpack && yarn build:parcel`
* Run again for cache times

### Single Entry, Production, Medium Graph, JS Only

|     bundler    | version              | build time | build time w/ cache | bundle size | config LOC |
|:--------------:|----------------------|------------|---------------------|-------------|------------|
| webpack        | webpack/webpack#next |    340ms   |         184ms       |    5.72kb   |      15    |
| parcel-bundler | 1.2.1                |    1.78s   |         473ms       |  21.094kb   |      0     |
|                |                      |            |                     |             |            |

## Help Wanted
Need help organizing and setting up multiple real world scenarios for all bundlers to run. 

Feel free to checkout existing example or optimize the workflow via PR. 

### [Parcel Recipies (Preact)](https://parceljs.org/recipes.html#preact)

|     bundler    | version              | build time | build time w/ cache | bundle size | config LOC  |
|:--------------:|----------------------|------------|---------------------|-------------|-------------|
| webpack        | webpack/webpack#next |    1172ms  |         700ms       |    9.69k    |      20     |
| parcel-bundler | 1.2.1                |    1270ms  |         266ms       |  11.560kb   |      5      |
|                |                      |            |                     |             |             |
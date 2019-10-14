# Possible Bug

Repo example for issue [#8419](https://github.com/webpack/webpack/issues/8419).

As stated in the issue, it happens that the `contenthash` changes while the file content stay fixed between builds.
Here below is the result of running several times consecutively until get the error, 7 buids in around 20 seconds without any change to the source code shows the file changing from `trial.main.7373d414d17dcd91e77f.js` to `trial.main.90f6742c6e777575c140.js`.
Notice that the number of runs to find the error is kind of `random`, might be 2 or 3 like more than 10.

I reduced to what it seems to be the simplest case to reproduce it, where it contains a package in `node_modules` (simulated with a `"utils": "file:./utils"`) while if the content is inside a folder in `src`, I can not reproduce the error.

**Note 1**: I tried also with a JS version of the same example, and I can not reproduce the error. Then, I guess it is related somehow to `ts-loader`.

**Note 2**: I have compared the files generated with several tools (e.g., `diff`, `cmp`, `stat`, `checksum`, `BOM existence`) finding no difference at all.
I stored these 2 files in the `example` folder, for further investigation.

## How to reproduce

```sh
# to install the depedencies
yarn

# execute several times until see a different `contenthash`
yarn build
```

**Note 3**: There is no cleanup between builds, the results are collected in `tmp` folder.

## Execution results

```text
~/webpack-bug >$ yarn build
yarn run v1.17.3
$ webpack --mode=production
Hash: cee9fd2c2419387e124e
Version: webpack 4.41.1
Time: 1139ms
Built at: 10/14/2019 10:29:23 PM
                             Asset      Size  Chunks                         Chunk Names
trial.main.7373d414d17dcd91e77f.js  1.16 KiB       0  [emitted] [immutable]  trial
Entrypoint trial = trial.main.7373d414d17dcd91e77f.js
[0] multi ./src/foo.ts ./src/bar.ts 40 bytes {0} [built]
[UO9Q] ./src/foo.ts + 2 modules 227 bytes {0} [built]
    | ./src/foo.ts 29 bytes [built]
    |     + 2 hidden modules
[j5Z2] ./src/bar.ts 23 bytes {0} [built]
✨  Done in 2.10s.
```

```text
~/webpack-bug >$ yarn build
yarn run v1.17.3
$ webpack --mode=production
Hash: cee9fd2c2419387e124e
Version: webpack 4.41.1
Time: 1124ms
Built at: 10/14/2019 10:29:27 PM
                             Asset      Size  Chunks                         Chunk Names
trial.main.7373d414d17dcd91e77f.js  1.16 KiB       0  [emitted] [immutable]  trial
Entrypoint trial = trial.main.7373d414d17dcd91e77f.js
[0] multi ./src/foo.ts ./src/bar.ts 40 bytes {0} [built]
[UO9Q] ./src/foo.ts + 2 modules 227 bytes {0} [built]
    | ./src/foo.ts 29 bytes [built]
    |     + 2 hidden modules
[j5Z2] ./src/bar.ts 23 bytes {0} [built]
✨  Done in 2.10s.
```

```text
~/webpack-bug >$ yarn build
yarn run v1.17.3
$ webpack --mode=production
Hash: cee9fd2c2419387e124e
Version: webpack 4.41.1
Time: 1142ms
Built at: 10/14/2019 10:29:29 PM
                             Asset      Size  Chunks                         Chunk Names
trial.main.7373d414d17dcd91e77f.js  1.16 KiB       0  [emitted] [immutable]  trial
Entrypoint trial = trial.main.7373d414d17dcd91e77f.js
[0] multi ./src/foo.ts ./src/bar.ts 40 bytes {0} [built]
[UO9Q] ./src/foo.ts + 2 modules 227 bytes {0} [built]
    | ./src/foo.ts 29 bytes [built]
    |     + 2 hidden modules
[j5Z2] ./src/bar.ts 23 bytes {0} [built]
✨  Done in 2.10s.
```

```text
~/webpack-bug >$ yarn build
yarn run v1.17.3
$ webpack --mode=production
Hash: cee9fd2c2419387e124e
Version: webpack 4.41.1
Time: 1403ms
Built at: 10/14/2019 10:29:33 PM
                             Asset      Size  Chunks                         Chunk Names
trial.main.7373d414d17dcd91e77f.js  1.16 KiB       0  [emitted] [immutable]  trial
Entrypoint trial = trial.main.7373d414d17dcd91e77f.js
[0] multi ./src/foo.ts ./src/bar.ts 40 bytes {0} [built]
[UO9Q] ./src/foo.ts + 2 modules 227 bytes {0} [built]
    | ./src/foo.ts 29 bytes [built]
    |     + 2 hidden modules
[j5Z2] ./src/bar.ts 23 bytes {0} [built]
✨  Done in 2.40s.
```

```text
~/webpack-bug >$ yarn build
yarn run v1.17.3
$ webpack --mode=production
Hash: cee9fd2c2419387e124e
Version: webpack 4.41.1
Time: 1149ms
Built at: 10/14/2019 10:29:37 PM
                             Asset      Size  Chunks                         Chunk Names
trial.main.7373d414d17dcd91e77f.js  1.16 KiB       0  [emitted] [immutable]  trial
Entrypoint trial = trial.main.7373d414d17dcd91e77f.js
[0] multi ./src/foo.ts ./src/bar.ts 40 bytes {0} [built]
[UO9Q] ./src/foo.ts + 2 modules 227 bytes {0} [built]
    | ./src/foo.ts 29 bytes [built]
    |     + 2 hidden modules
[j5Z2] ./src/bar.ts 23 bytes {0} [built]
✨  Done in 2.50s.
```

```text
~/webpack-bug >$ yarn build
yarn run v1.17.3
$ webpack --mode=production
Hash: cee9fd2c2419387e124e
Version: webpack 4.41.1
Time: 1159ms
Built at: 10/14/2019 10:29:40 PM
                             Asset      Size  Chunks                         Chunk Names
trial.main.7373d414d17dcd91e77f.js  1.16 KiB       0  [emitted] [immutable]  trial
Entrypoint trial = trial.main.7373d414d17dcd91e77f.js
[0] multi ./src/foo.ts ./src/bar.ts 40 bytes {0} [built]
[UO9Q] ./src/foo.ts + 2 modules 227 bytes {0} [built]
    | ./src/foo.ts 29 bytes [built]
    |     + 2 hidden modules
[j5Z2] ./src/bar.ts 23 bytes {0} [built]
✨  Done in 2.13s.
```

```text
~/webpack-bug >$ yarn build
yarn run v1.17.3
$ webpack --mode=production
Hash: 700d95a36a172d8b1fed
Version: webpack 4.41.1
Time: 1134ms
Built at: 10/14/2019 10:29:42 PM
                             Asset      Size  Chunks                         Chunk Names
trial.main.90f6742c6e777575c140.js  1.16 KiB       0  [emitted] [immutable]  trial
Entrypoint trial = trial.main.90f6742c6e777575c140.js
[0] multi ./src/foo.ts ./src/bar.ts 40 bytes {0} [built]
[UO9Q] ./src/foo.ts + 2 modules 227 bytes {0} [built]
    | ./src/foo.ts 29 bytes [built]
    |     + 2 hidden modules
[j5Z2] ./src/bar.ts 23 bytes {0} [built]
✨  Done in 2.10s.
```

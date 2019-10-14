'use strict';

module.exports = function(api) {
  api.assertVersion('^7.0.0');
  api.cache(false);

  return {
    sourceType: 'unambiguous',
    ignore: [
      (filename, context) =>
        /(core-js|(@babel(?:\/|\\{1,2})runtime))/.test(filename),
    ],
    presets: [
      [
        // Latest stable ECMAScript features.
        '@babel/env',
        {
          useBuiltIns: false,
          modules: false,
        },
      ],
      [
        '@babel/react',
        {
          development: false,
        },
      ],
    ],
    plugins: [
      [
        '@babel/proposal-class-properties',
        {
          loose: true,
        },
      ],
      [
        '@babel/transform-runtime',
        {
          corejs: false,
          helpers: true,
          regenerator: true,
          useESmodules: true,
          absoluteRuntime: true,
        },
      ],
    ],
    babelrc: false,
    compact: false,
    highlightCode: true,
  };
};

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = function override(config, env) {

  // fixes dependency source maps
  const babelLoader = config.module.rules[2].oneOf[2] // hardcoded indices according to ejected webpack.config.js

  babelLoader.options.sourceMaps = shouldUseSourceMap
  babelLoader.options.inputSourceMap = shouldUseSourceMap

  return config;
};

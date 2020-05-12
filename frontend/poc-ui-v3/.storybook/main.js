module.exports = {
  stories: ['../src/**/*.stories.(js|tsx)'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
      },
    })
    config.module.rules.push({
      test: /\.(scss|sass)$/,
      loaders: [
        'style-loader',
        { loader: 'css-loader', options: { importLoaders: 1 } },
        'sass-loader',
      ],
    })
    config.resolve.extensions.push('.ts', '.tsx')
    return config
  },
}

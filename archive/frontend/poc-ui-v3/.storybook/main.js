module.exports = {
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-storysource',
    '@storybook/addon-viewport/register',
    '@storybook/addon-notes/register',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      },
    },
  ],
  stories: ['../src/**/*.stories.(js|tsx|mdx)'],
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

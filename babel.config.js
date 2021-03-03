const plugins = [
  '@emotion',
  [
    '@babel/plugin-proposal-decorators',
    {
      legacy: true,
    },
  ],
  [
    '@babel/plugin-proposal-class-properties',
    {
      loose: true,
    },
  ],
  [
    'import',
    {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    },
  ],
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-transform-object-assign',
  'react-hot-loader/babel',
];

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins,
  env: {
    production: {
      plugins: ['@emotion', 'transform-remove-console'],
    },
  },
};

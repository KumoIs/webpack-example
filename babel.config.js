const plugins = [
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
  'babel-plugin-styled-components',
];

if (process.env.NODE_ENV === 'production') {
  plugins.push('transform-remove-console');
}
console.log(process.env.NODE_ENV === 'production');
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins,
};

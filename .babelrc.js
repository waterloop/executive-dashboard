const rootImportOpts = {
  root: __dirname,
  rootPathSuffix: 'src',
};

module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [['babel-plugin-root-import', rootImportOpts]],
};

module.exports = {
  presets: ['@vue/app'],
  // plugins: ['dynamic-import-node'],
  plugins: [
    [
      'import',
      {
        libraryName: 'mand-mobile',
        libraryDirectory: 'lib',
      },
    ],
  ],
};

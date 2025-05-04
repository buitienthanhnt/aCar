module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
        root: ['.'],
        alias: {
          '@': './src',
          '@api': './src/api',
          '@assets': './src/assets',
          '@components': './src/components',
          '@scenes': './src/scenes',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@elements': './src/elements',
          '@type': './src/type',
          '@data': './src/data',
          '@styles': './src/styles',
        },
      },
    ],
  ],
};

module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
   [
     'module-resolver',
     {
       "root": ["./src"],
       alias: {
         '@': './src',
         '@api': './src/api',
         '@assets': './src/assets',
         '@components': './src/components',
         '@utils': './src/utils',
       },
     },
   ],
  'react-native-reanimated/plugin',
  ],
};

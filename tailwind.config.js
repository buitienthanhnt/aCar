const plugin = require('tailwindcss/plugin');
const {safeArea} = require('nativewind/dist/tailwind/safe-area');

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset'), {plugins: [safeArea]}],
  theme: {
    extend: {
      fontFamily: {
        Bold: 'SFProText-Bold',
        Medium: 'SFProText-Medium',
        Regular: 'SFProText-Regular',
        Semibold: 'SFProText-Semibold',
      },
      colors: {
        brandA: '#2196F3',
        brandB: '#F06292',
        primaryA700: '#0288D1',
        primaryA500: '#2196F3',
        primaryA200: '#90CAF9',
        primaryA100: '#BBDEFB',
        primaryA50: '#E1F5FE',
        primaryB500: '#E91E63',
        primaryB300: '#F06292',
        primaryB200: '#F48FB1',
        primaryB100: '#F8BBD0',
        primaryB50: '#FCE4EC',
        ink900: '#1F2128',
        ink800: '#22252D',
        ink700: '#31343F',
        ink600: '#494E5B',
        ink500: '#7F8596',
        ink400: '#E4E7EE',
        ink300: '#EFEFEF',
        ink200: '#F4F4F4',
        ink100: '#FFFFFF',
        black900: '#212121',
        black600: '#424242',
        black400: '#BDBDBD',
        black200: '#EEEEEE',
        black50: '#FAFAFA',
        white500: '#FFFFFF',
        white400: '#FFFFFFB2',
        white300: '#FFFFFF66',
        white200: '#FFFFFF4C',
        white100: '#FFFFFF19',
        green900: '#30b28c',
        green800: '#45ba98',
        green700: '#59c1a3',
        green600: '#6ec9af',
        green500: '#83d1ba',
        green400: '#98d9c6',
        green300: '#ace0d1',
        green200: '#c1e8dd',
        green100: '#d6f0e8',
        green50: '#F5FDF7',
        orange500: '#FF5722',
        orange400: '#FF7043',
        orange300: '#FFAB91',
        orange200: '#FFCCBC',
        orange50: '#FBE9E7',
        red900: '#e45f35',
        red800: '#e76f49',
        red700: '#e97f5d',
        red600: '#ec8f72',
        red500: '#ef9f86',
        red400: '#f2af9a',
        red300: '#f4bfae',
        red200: '#f7cfc2',
        red100: '#fadfd7',
        red50: '#fcefeb',
        backgroundDark: '#F4F4F4',
        backgroundLight: '#F6FBFF',
        placeholder: '#E0E0E0',
      },
      lineHeight: {
        h10: '10px',
        h12: '12px',
        h13: '13px',
        h14: '14px',
        h15: '15px',
        h16: '16px',
        h17: '17px',
        h18: '18px',
        h20: '20px',
        h22: '22px',
        h24: '24px',
        h26: '26px',
        h28: '28px',
        h30: '30px',
        h32: '32px',
      },
      fontSize: {
        f8: 8,
        f10: 10,
        f12: 12,
        f13: 13,
        f14: 14,
        f15: 15,
        f16: 16,
        f18: 18,
        f20: 20,
        f22: 22,
        f24: 24,
      },
    },
  },
  plugins: [
    plugin(function ({addComponents, theme}) {
      const typographies = {
        '.ts-24b': {
          fontSize: theme('fontSize.f24'),
          lineHeight: theme('lineHeight.h32'),
          fontFamily: theme('fontFamily.Bold'),
        },
        '.ts-24m': {
          fontSize: theme('fontSize.f24'),
          lineHeight: theme('lineHeight.h32'),
          fontFamily: theme('fontFamily.Medium'),
        },
        '.ts-24r': {
          fontSize: theme('fontSize.f24'),
          lineHeight: theme('lineHeight.h32'),
          fontFamily: theme('fontFamily.Regular'),
        },
        '.ts-24s': {
          fontSize: theme('fontSize.f24'),
          lineHeight: theme('lineHeight.h32'),
          fontFamily: theme('fontFamily.Semibold'),
        },

        '.ts-22b': {
          fontSize: theme('fontSize.f22'),
          lineHeight: theme('lineHeight.h28'),
          fontFamily: theme('fontFamily.Bold'),
        },
        '.ts-22m': {
          fontSize: theme('fontSize.f22'),
          lineHeight: theme('lineHeight.h28'),
          fontFamily: theme('fontFamily.Medium'),
        },
        '.ts-22r': {
          fontSize: theme('fontSize.f22'),
          lineHeight: theme('lineHeight.h28'),
          fontFamily: theme('fontFamily.Regular'),
        },
        '.ts-22s': {
          fontSize: theme('fontSize.f22'),
          lineHeight: theme('lineHeight.h28'),
          fontFamily: theme('fontFamily.Semibold'),
        },

        '.ts-20b': {
          fontSize: theme('fontSize.f20'),
          lineHeight: theme('lineHeight.h28'),
          fontFamily: theme('fontFamily.Bold'),
        },
        '.ts-20m': {
          fontSize: theme('fontSize.f20'),
          lineHeight: theme('lineHeight.h28'),
          fontFamily: theme('fontFamily.Medium'),
        },
        '.ts-20r': {
          fontSize: theme('fontSize.f20'),
          lineHeight: theme('lineHeight.h28'),
          fontFamily: theme('fontFamily.Regular'),
        },
        '.ts-20s': {
          fontSize: theme('fontSize.f20'),
          lineHeight: theme('lineHeight.h28'),
          fontFamily: theme('fontFamily.Semibold'),
        },

        '.ts-18b': {
          fontSize: theme('fontSize.f18'),
          lineHeight: theme('lineHeight.h28'),
          fontFamily: theme('fontFamily.Bold'),
        },
        '.ts-18m': {
          fontSize: theme('fontSize.f18'),
          lineHeight: theme('lineHeight.h28'),
          fontFamily: theme('fontFamily.Medium'),
        },
        '.ts-18r': {
          fontSize: theme('fontSize.f18'),
          lineHeight: theme('lineHeight.h28'),
          fontFamily: theme('fontFamily.Regular'),
        },
        '.ts-18s': {
          fontSize: theme('fontSize.f18'),
          lineHeight: theme('lineHeight.h28'),
          fontFamily: theme('fontFamily.Semibold'),
        },

        '.ts-16b': {
          fontSize: theme('fontSize.f16'),
          lineHeight: theme('lineHeight.h24'),
          fontFamily: theme('fontFamily.Bold'),
        },
        '.ts-16m': {
          fontSize: theme('fontSize.f16'),
          lineHeight: theme('lineHeight.h24'),
          fontFamily: theme('fontFamily.Medium'),
        },
        '.ts-16r': {
          fontSize: theme('fontSize.f16'),
          lineHeight: theme('lineHeight.h24'),
          fontFamily: theme('fontFamily.Regular'),
        },

        '.ts-16s': {
          fontSize: theme('fontSize.f16'),
          lineHeight: theme('lineHeight.h24'),
          fontFamily: theme('fontFamily.Semibold'),
        },
        '.ts-15b': {
          fontSize: theme('fontSize.f15'),
          lineHeight: theme('lineHeight.h22'),
          fontFamily: theme('fontFamily.Bold'),
        },
        '.ts-15m': {
          fontSize: theme('fontSize.f15'),
          lineHeight: theme('lineHeight.h22'),
          fontFamily: theme('fontFamily.Medium'),
        },
        '.ts-15r': {
          fontSize: theme('fontSize.f15'),
          lineHeight: theme('lineHeight.h22'),
          fontFamily: theme('fontFamily.Regular'),
        },
        '.ts-15s': {
          fontSize: theme('fontSize.f15'),
          lineHeight: theme('lineHeight.h22'),
          fontFamily: theme('fontFamily.Semibold'),
        },

        '.ts-14b': {
          fontSize: theme('fontSize.f14'),
          lineHeight: theme('lineHeight.h20'),
          fontFamily: theme('fontFamily.Bold'),
        },
        '.ts-14m': {
          fontSize: theme('fontSize.f14'),
          lineHeight: theme('lineHeight.h20'),
          fontFamily: theme('fontFamily.Medium'),
        },
        '.ts-14r': {
          fontSize: theme('fontSize.f14'),
          lineHeight: theme('lineHeight.h20'),
          fontFamily: theme('fontFamily.Regular'),
        },
        '.ts-14s': {
          fontSize: theme('fontSize.f14'),
          lineHeight: theme('lineHeight.h20'),
          fontFamily: theme('fontFamily.Semibold'),
        },

        '.ts-13b': {
          fontSize: theme('fontSize.f13'),
          lineHeight: theme('lineHeight.h17'),
          fontFamily: theme('fontFamily.Bold'),
        },
        '.ts-13m': {
          fontSize: theme('fontSize.f13'),
          lineHeight: theme('lineHeight.h17'),
          fontFamily: theme('fontFamily.Medium'),
        },
        '.ts-13r': {
          fontSize: theme('fontSize.f13'),
          lineHeight: theme('lineHeight.h17'),
          fontFamily: theme('fontFamily.Regular'),
        },
        '.ts-13s': {
          fontSize: theme('fontSize.f13'),
          lineHeight: theme('lineHeight.h17'),
          fontFamily: theme('fontFamily.Semibold'),
        },

        '.ts-12b': {
          fontSize: theme('fontSize.f12'),
          lineHeight: theme('lineHeight.h16'),
          fontFamily: theme('fontFamily.Bold'),
        },
        '.ts-12m': {
          fontSize: theme('fontSize.f12'),
          lineHeight: theme('lineHeight.h16'),
          fontFamily: theme('fontFamily.Medium'),
        },
        '.ts-12r': {
          fontSize: theme('fontSize.f12'),
          lineHeight: theme('lineHeight.h16'),
          fontFamily: theme('fontFamily.Regular'),
        },
        '.ts-12s': {
          fontSize: theme('fontSize.f12'),
          lineHeight: theme('lineHeight.h16'),
          fontFamily: theme('fontFamily.Semibold'),
        },

        '.ts-10b': {
          fontSize: theme('fontSize.f10'),
          lineHeight: theme('lineHeight.h12'),
          fontFamily: theme('fontFamily.Bold'),
        },
        '.ts-10m': {
          fontSize: theme('fontSize.f10'),
          lineHeight: theme('lineHeight.h12'),
          fontFamily: theme('fontFamily.Medium'),
        },
        '.ts-10r': {
          fontSize: theme('fontSize.f10'),
          lineHeight: theme('lineHeight.h12'),
          fontFamily: theme('fontFamily.Regular'),
        },
        '.ts-10s': {
          fontSize: theme('fontSize.f10'),
          lineHeight: theme('lineHeight.h12'),
          fontFamily: theme('fontFamily.Semibold'),
        },

        '.ts-8b': {
          fontSize: theme('fontSize.f8'),
          lineHeight: theme('lineHeight.h10'),
          fontFamily: theme('fontFamily.Bold'),
        },
        '.ts-8m': {
          fontSize: theme('fontSize.f8'),
          lineHeight: theme('lineHeight.h10'),
          fontFamily: theme('fontFamily.Medium'),
        },
        '.ts-8r': {
          fontSize: theme('fontSize.f8'),
          /*lineHeight: theme('lineHeight.h10'),*/
          fontFamily: theme('fontFamily.Regular'),
        },
        '.ts-8s': {
          fontSize: theme('fontSize.f8'),
          lineHeight: theme('lineHeight.h10'),
          fontFamily: theme('fontFamily.Semibold'),
        },
      };
      addComponents(typographies);
    }),
  ],
};

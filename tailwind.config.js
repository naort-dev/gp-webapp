module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#13161A',
        darkPurple: '#250018',
        'gp-yellow': '#FFE600',
        slate: {
          50: '#EEF3F7',
          100: '#EBF0F5',
          200: '#E4EBF2',
          300: '#DAE3ED',
          400: '#CFDBE8',
          500: '#C5D3E3',
          600: '#BBCBDE',
          700: '#B0C2D9',
          800: '#A6BAD4',
          900: '#9CB1CF',
          950: '#97ADCD',
        },
        gray: {
          DEFAULT: '#F6F7F9',
          50: '#F9FAFB',
          100: '#F6F7F9',
          200: '#EAECF1',
          300: '#DEE1E9',
          400: '#D1D6E1',
          500: '#C5CBD8',
          600: '#B9C1D0',
          700: '#ADB6C8',
          800: '#A0ABC0',
          900: '#94A0B8',
          950: '#8E9BB4',
        },
        indigo: {
          DEFAULT: '#13161A',
          50: '#77879C',
          100: '#6E7F95',
          200: '#617084',
          300: '#546172',
          400: '#475261',
          500: '#3A434F',
          600: '#2D343D',
          700: '#20252C',
          800: '#13161A',
          900: '#0F1114',
          950: '#0D0F11',
        },
        yellow: {
          DEFAULT: '#EFF265',
          50: '#FAFBCF',
          100: '#F9FAC3',
          200: '#F6F8AC',
          300: '#F4F694',
          400: '#F1F47D',
          500: '#EFF265',
          600: '#EBEF3F',
          700: '#E7EC1A',
          800: '#C7CB11',
          900: '#A3A60E',
          950: '#90930C',
        },
        lime: {
          DEFAULT: '#DFF265',
          50: '#F5FBCF',
          100: '#F3FAC3',
          200: '#EEF8AC',
          300: '#E9F694',
          400: '#E4F47D',
          500: '#DFF265',
          600: '#D7EF3F',
          700: '#CFEC1A',
          800: '#B2CB11',
          900: '#91A60E',
          950: '#81930C',
        },
        amber: {
          DEFAULT: '#FFE600',
          50: '#FFF8B8',
          100: '#FFF6A3',
          200: '#FFF27A',
          300: '#FFEE52',
          400: '#FFEA29',
          500: '#FFE600',
          600: '#D6C100',
          700: '#AD9C00',
          800: '#857800',
          900: '#5C5300',
          950: '#474000',
        },
        red: {
          DEFAULT: '#F32245',
          50: '#FCD0D8',
          100: '#FBBDC7',
          200: '#F996A7',
          300: '#F76F86',
          400: '#F54966',
          500: '#F32245',
          600: '#E00C30',
          700: '#B90A27',
          800: '#93081F',
          900: '#6C0617',
          950: '#590513',
        },
        blue: {
          DEFAULT: '#BBB5FF',
          50: '#E5E3FF',
          100: '#D7D4FF',
          200: '#BBB5FF',
          300: '#968CFF',
          400: '#7063FF',
          500: '#4B3BFF',
          600: '#2512FF',
          700: '#1300E8',
          800: '#1000BF',
          900: '#0C0096',
          950: '#0B0082',
        },
        purple: {
          DEFAULT: '#642EFF',
          50: '#ECE6FF',
          100: '#DDD1FF',
          200: '#BFA8FF',
          300: '#A180FF',
          400: '#8257FF',
          500: '#642EFF',
          600: '#3F00F5',
          700: '#3100BD',
          800: '#220085',
          900: '#14004D',
          950: '#0D0031',
        },
      },
      green: {
        DEFAULT: '#0EB66F',
        50: '#C6FBE4',
        100: '#ACF9D8',
        200: '#78F5C0',
        300: '#44F1A7',
        400: '#12EA8F',
        500: '#0EB66F',
        600: '#0B9058',
        700: '#086A41',
        800: '#05442A',
        900: '#021E13',
        950: '#010C07',
      },
      orange: {
        DEFAULT: '#F3D8AE',
        50: '#FDF8F1',
        100: '#FBF2E3',
        200: '#F7E5C9',
        300: '#F3D8AE',
        400: '#EEC78A',
        500: '#E8B667',
        600: '#E3A543',
        700: '#DD9321',
        800: '#BA7C1B',
        900: '#966416',
        950: '#845814',
      },
      cyan: {
        DEFAULT: '#CCF2FA',
        50: '#EFFBFD',
        100: '#E3F8FC',
        200: '#CCF2FA',
        300: '#9EE6F5',
        400: '#6FDAF1',
        500: '#41CEEC',
        600: '#16C0E4',
        700: '#1299B5',
        800: '#0D7287',
        900: '#094A58',
        950: '#063741',
      },
    },
  },
  plugins: [],
};

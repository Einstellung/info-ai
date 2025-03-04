import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00968F',
          50: '#E6F7F6',
          100: '#CCF0ED',
          200: '#99E0DB',
          300: '#66D1C9',
          400: '#33C1B7',
          500: '#00968F',
          600: '#007872',
          700: '#005A56',
          800: '#003C39',
          900: '#001E1D',
        },
      },
    },
  },
  plugins: [],
};

export default config; 
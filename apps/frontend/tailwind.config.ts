import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0B1220',
        card: '#121A2B',
        accent: '#5B8CFF',
      },
    },
  },
  plugins: [],
};

export default config;

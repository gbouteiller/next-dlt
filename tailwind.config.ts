import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';
import type {Config} from 'tailwindcss';

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {},
  plugins: [typography, daisyui],
};
export default config;

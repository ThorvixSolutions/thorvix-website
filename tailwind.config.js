/** @type {import('tailwindcss').Config */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-2': 'var(--bg2)',
        'bg-3': 'var(--bg3)',
        border: 'var(--border)',
        'border-bright': 'var(--border-bright)',
        accent: 'var(--accent)',
        'accent-dim': 'var(--accent-dim)',
        muted: 'var(--muted)',
        'muted-2': 'var(--muted2)',
        'muted-3': 'var(--muted3)',
        'th-red': 'var(--red)',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        heading: ['"Barlow Condensed"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
        body: ['"Barlow"', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
};

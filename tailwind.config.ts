import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0B0D12',
        surface: '#141821',
        border: '#232937',
        'text-primary': '#E8EBF2',
        'text-muted': '#8A93A6',
        accent: '#6366F1',
        success: '#22C55E',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '8': '8px',
      },
      borderRadius: {
        card: '12px',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
      },
    },
  },
  plugins: [],
};

export default config;
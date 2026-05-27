import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // terracotta accent matching #BE5C33
        accent: {
          50:  '#fdf3ee',
          100: '#fae4d5',
          200: '#f5c5a5',
          300: '#eda070',
          400: '#e47a45',
          500: '#be5c33',
          600: '#a04828',
          700: '#7e3820',
          800: '#612c1b',
          900: '#4e2318',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', '"Instrument Serif"', 'serif'],
        body:    ['var(--font-body)',    'Inter', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)',    '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease-out forwards',
        'fade-in':    'fadeIn 0.6s ease-out forwards',
        'pulse-slow': 'pulse 2.4s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config

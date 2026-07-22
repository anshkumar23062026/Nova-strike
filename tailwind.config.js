/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyan: '#5df6ff',
        pink: '#ff4ecb',
        navy: '#030713',
        'navy-light': '#0a0e1f',
        muted: '#9fb6d0',
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(93, 246, 255, 0.5)',
        'glow-pink': '0 0 20px rgba(255, 78, 203, 0.5)',
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { 
            textShadow: '0 0 10px rgba(93, 246, 255, 0.5), 0 0 20px rgba(93, 246, 255, 0.3)',
            opacity: '1'
          },
          '50%': { 
            textShadow: '0 0 20px rgba(93, 246, 255, 0.8), 0 0 30px rgba(93, 246, 255, 0.6)',
            opacity: '0.8'
          },
        },
      },
    },
  },
  plugins: [],
};

module.exports = config;
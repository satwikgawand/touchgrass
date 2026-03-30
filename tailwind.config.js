/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', '"Cascadia Code"', 'monospace'],
      },
      colors: {
        terminal: {
          green: '#00ff41',
          amber: '#ffb300',
          red: '#ff4444',
          bg: '#0d0d0d',
          surface: '#1a1a1a',
          border: '#2a2a2a',
        },
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        fadeSlideIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 1px)' },
          '40%': { transform: 'translate(2px, -1px)' },
          '60%': { transform: 'translate(-1px, 2px)' },
          '80%': { transform: 'translate(1px, -2px)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        fadeSlideIn: 'fadeSlideIn 0.4s ease-out',
        glitch: 'glitch 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
}

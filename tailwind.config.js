/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'serif-display': ['Playfair Display', 'serif'],
        'serif-body': ['Lora', 'serif'],
        'sans': ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        'luxury': {
          'dark': '#5a1515',
          'red': '#7a1c1c',
          'light': '#9d3f3f',
          'accent': '#d14b4b',
        },
        'cream': {
          '50': '#faf9f7',
          '100': '#f5f3f0',
          '200': '#ede8e3',
          '300': '#e5dfd7',
        },
        'slate': {
          'dark': '#1a1a1a',
          'light': '#f8f8f7',
        }
      },
      backgroundColor: {
        'gradient-editorial': 'linear-gradient(135deg, #faf9f7 0%, #f0ebe5 50%, #faf9f7 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.33, 0.66, 0.66, 1) forwards',
        'slide-left': 'slideLeft 0.8s cubic-bezier(0.33, 0.66, 0.66, 1) forwards',
        'slide-right': 'slideRight 0.8s cubic-bezier(0.33, 0.66, 0.66, 1) forwards',
        'scale-in': 'scaleIn 0.8s cubic-bezier(0.33, 0.66, 0.66, 1) forwards',
        'clip-reveal': 'clipReveal 0.8s cubic-bezier(0.33, 0.66, 0.66, 1) forwards',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        clipReveal: {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
      },
    },
  },
  plugins: [],
};


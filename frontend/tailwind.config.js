/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'primary-purple': '#9832f5',
        'primary-hover': '#8732d8',
        'secondary-purple': '#5d56a8',
        'dark-bg': '#121212',
        'dark-card': '#1e1e1e',
        'light-bg': '#f9fafb',
        'light-card': '#ffffff',
        'card-bg': '#2a2438',
        'accent': '#9832f5',
        'success': '#10b981',
        'error': '#ef4444'
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #c084fc, #8b5cf6)',
      },
      boxShadow: {
        'custom': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      minHeight: {
        'screen-minus-nav': 'calc(100vh - 60px)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}


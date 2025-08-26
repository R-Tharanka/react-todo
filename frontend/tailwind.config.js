/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-purple': '#8b5cf6',
        'primary-hover': '#7c3aed',
        'secondary-purple': '#6d28d9',
        'dark-bg': '#121212',
        'dark-card': '#1e1e1e',
        'light-bg': '#f9fafb',
        'light-card': '#ffffff',
        'card-bg': '#312e81',
        'accent': '#c084fc',
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
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-primary', 'bg-primary/90', 'hover:bg-primary/90', 'text-primary',
    'bg-secondary', 'bg-secondary/90', 'hover:bg-secondary/90',
    'bg-success', 'bg-success/90', 'hover:bg-success/90', 'text-success',
    'bg-danger', 'bg-danger/90', 'hover:bg-danger/90', 'text-danger',
    'bg-warning', 'bg-warning/90', 'hover:bg-warning/90', 'text-warning',
    'bg-info', 'bg-info/90', 'hover:bg-info/90', 'text-info',

    'ring-primary'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#64748b',
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
        info: '#06b6d4'
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        agri: {
          950: '#0B1E16',
          900: '#0F291E',
          800: '#1B4332',
          700: '#2D6A4F',
          600: '#40916C',
          500: '#52B788',
          400: '#74C69D',
          300: '#95D5B2',
          200: '#B7E4C7',
          100: '#D8F3DC',
          50: '#EBF7EE',
        },
        olive: {
          900: '#3D4925',
          800: '#4F5D2F',
          700: '#5F7038',
          600: '#6B7F4A',
          500: '#8A9A5B',
          400: '#A4B478',
          100: '#EDF1E4',
          50: '#F6F8F1',
        },
        parchment: {
          50: '#FCFCFA',
          100: '#F6F6F0',
          200: '#ECECE2',
          300: '#DFDFD1',
          800: '#1B241E',
          900: '#121A15',
        }
      },
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(27, 67, 50, 0.08)',
        'soft-lg': '0 10px 25px -3px rgba(27, 67, 50, 0.12)',
        'glow': '0 0 15px rgba(82, 183, 136, 0.35)'
      }
    },
  },
  plugins: [],
}

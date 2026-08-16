/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: { DEFAULT: '#1E2A47', deep: '#14213A' },
                brass: '#A9793D',
                cloud: '#F4F6F9',
                paper: '#FFFFFF',
                mist: '#DFE3EA',
                slate: '#5B6478',
                ink: '#1B2233',
                success: { DEFAULT: '#237A50', soft: '#E6F4EC', text: '#1D5C3E' },
                warning: { soft: '#FBEEDB', text: '#8A5313' },
                danger: { DEFAULT: '#A23131', soft: '#FBEAEA', text: '#7E2727' },
                info: { DEFAULT: '#275E82', soft: '#E7F1F7', text: '#1F4C67' },
            },
            fontFamily: {
                display: ['"IBM Plex Serif"', 'serif'],
                sans: ['"IBM Plex Sans"', 'sans-serif'],
                mono: ['"IBM Plex Mono"', 'monospace'],
            },
        },
    },
    plugins: [],
}

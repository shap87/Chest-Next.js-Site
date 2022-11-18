/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        container: {
            padding: '1rem',
            center: true,
        },
        extend: {
            colors: {
                primary: '#475467',
                second: '#344054',
            }
        },
    },
    plugins: [],
}
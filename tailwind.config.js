/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // modo oscuro controlado con clase
    content: ["./src/**/*.{js,ts,jsx,tsx,astro}"],
    theme: {
        extend: {
            colors: {
                background: "#f3f4f6",
                darkBackground: "#1f2937",
                text: "#1f2937",
                darkText: "#f9fafb",
            },
        },
    },
    plugins: [],
}

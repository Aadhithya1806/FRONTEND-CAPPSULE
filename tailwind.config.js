/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontFamily: {
            sans: ["Poppins", "sans-serif"],
        },
        boxShadow: {
            "custom-shadow": "0 0 0 30px rgba(0, 0, 0, 0.1)",
            buttonShadow: "0 0 7px 2px #00C5A166",
        },

        extend: {
            backgroundImage: {
                "custom-gradient":
                    "linear-gradient(to right, #FFFFFF,#FFFFFF,#FFFFFF, #D5E7E6 )",
            },

            colors: {
                grey: "#d6d6d6",
                white: "#ffffff",
                searchBoxText: "#b6bfc0",
                darkBlue: "#112d31",
                textDarkBlue: "#2A527A",
                black: "#252525",
                darkBlueFrom80: "#1a3539",
                borderNotSelected: "#ABABAB",
                textNotSelected: "#555555",
                salt: "#222222",
                greenBg: "#D5E7E6",
            },
        },
    },
    plugins: [],
};

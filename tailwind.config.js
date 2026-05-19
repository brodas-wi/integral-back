import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
    ],

    theme: {
        extend: {
            colors: {
                primary: "#f0872a",
                secondary: "#0d3f6a",
                light: "#f4f4f4",
                gray: {
                    DEFAULT: "#8f8f8f",
                    50: "#fafafa",
                    100: "#f4f4f4",
                    200: "#e5e5e5",
                    300: "#d4d4d4",
                    400: "#a3a3a3",
                    500: "#8f8f8f",
                    600: "#737373",
                    700: "#525252",
                    800: "#404040",
                    900: "#262626",
                },
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
        },
    },

    safelist: [
        "rounded-none","rounded-sm","rounded","rounded-md",
        "rounded-lg","rounded-xl","rounded-2xl","rounded-3xl","rounded-full",
        "text-xs","text-sm","text-base","text-lg","text-xl",
        "text-2xl","text-3xl","text-4xl","text-5xl","text-6xl",
        "text-7xl","text-8xl","text-9xl",
        "font-thin","font-extralight","font-light","font-normal",
        "font-medium","font-semibold","font-bold","font-extrabold","font-black",
    ],

    plugins: [forms],
};

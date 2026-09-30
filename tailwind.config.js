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
                primary: {
                    DEFAULT: "#f0872a",
                    dark: "#d97821",
                },
                secondary: "#0d3f6a",
                light: "#f4f4f4",
                brand: {
                    blue: "#003B71",
                    navy: "#002a52",
                    orange: "#E97300",
                    "orange-light": "#F07C28",
                    "orange-dark": "#c96200",
                    sky: "#dce8f5",
                },
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
        "rounded-none", "rounded-sm", "rounded", "rounded-md",
        "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-3xl", "rounded-full",
        "text-xs", "text-sm", "text-base", "text-lg", "text-xl",
        "text-2xl", "text-3xl", "text-4xl", "text-5xl", "text-6xl",
        "text-7xl", "text-8xl", "text-9xl",
        "font-thin", "font-extralight", "font-light", "font-normal",
        "font-medium", "font-semibold", "font-bold", "font-extrabold", "font-black",

        {
            pattern:
                /^(bg|text|border|ring|fill|stroke|outline|decoration)-brand-(blue|navy|orange|orange-light|orange-dark|sky)$/,
            variants: [
                "hover",
                "focus",
                "focus-visible",
                "active",
                "group-hover",
                "group-focus",
                "group-focus-visible",
                "peer-hover",
            ],
        },
        {
            pattern: /^-translate-(x|y)-(0\.5|1|1\.5|2|3|4|5|6)$/,
            variants: ["hover", "group-hover", "focus-visible", "group-focus-visible"],
        },
        {
            pattern: /^scale-(90|95|100|105|110|125)$/,
            variants: ["hover", "group-hover", "active", "focus-visible", "group-focus-visible"],
        },
        {
            pattern:
                /^(bg|text|border|ring|fill|stroke|outline|decoration)-(primary|primary-dark|secondary|light)$/,
            variants: [
                "hover",
                "focus",
                "focus-visible",
                "active",
                "group-hover",
                "group-focus",
                "group-focus-visible",
                "peer-hover",
            ],
        },
        {
            pattern: /^(bg|text|border)-(primary|secondary)\/(5|10|20|30|40|50|60|70|80|90)$/,
            variants: ["hover", "group-hover"],
        },
        "bg-[#f0872a]",
        "text-[#f0872a]",
        "border-[#f0872a]",
        "hover:bg-[#f0872a]",
        "hover:text-[#f0872a]",
        "bg-[#0d3f6a]",
        "text-[#0d3f6a]",
        "border-[#0d3f6a]",
        "hover:bg-[#0d3f6a]",
        "hover:text-[#0d3f6a]",
        "bg-[#f4f4f4]",
        "text-[#f4f4f4]",
        "border-[#f4f4f4]",
        "text-[#003B71]",
        "text-[#E97300]",
        "group-hover:text-[#E97300]",
        "group-focus-visible:text-[#E97300]",
        "motion-reduce:transition-none",
        "motion-reduce:transform-none",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-brand-orange",
        "focus-visible:ring-offset-2",
        "transition-transform",
        "transition-colors",
        "transition-all",
        "duration-200",
        "duration-300",
        "ease-out",
    ],

    plugins: [forms],
};

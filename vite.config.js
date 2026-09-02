import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import { glob } from "glob";

const viewJs = glob.sync("resources/js/views/**/*.js");
const viewCss = glob.sync("resources/css/views/**/*.css");

export default defineConfig({
    build: {
        manifest: "manifest.json",
        outDir: "public/build",
    },
    server: {
        host: "127.0.0.1",
        port: 5173,
    },
    plugins: [
        laravel({
            input: [
                "resources/css/app.css",
                "resources/css/fonts/poppins.css",
                "resources/css/notifications.css",
                "resources/css/editor.css",
                "resources/css/editor-canvas.css",
                "resources/js/app.js",
                "resources/js/layouts/admin-layout.js",
                "resources/css/preview.css",
                "resources/js/pages-editor.js",
                "resources/js/navbar-editor.js",
                "resources/js/footer-editor.js",
                "node_modules/remixicon/fonts/remixicon.css",
                "node_modules/grapesjs/dist/css/grapes.min.css",
                "node_modules/tinymce/skins/ui/oxide/skin.min.css",
                "node_modules/tinymce/skins/ui/oxide/content.min.css",
                "node_modules/tinymce/skins/content/default/content.min.css",
                ...viewJs,
                ...viewCss,
            ],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            "@": "/resources/js",
        },
    },
});
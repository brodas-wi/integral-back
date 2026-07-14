import tinymce from "tinymce/tinymce";
import "tinymce/models/dom";
import "tinymce/themes/silver";
import "tinymce/icons/default";
import "tinymce/plugins/lists";
import "tinymce/plugins/link";
import "tinymce/plugins/autolink";
import "tinymce/plugins/wordcount";
import "tinymce/skins/ui/oxide/skin.js";
import "tinymce/skins/content/default/content.js";

import { initMediaPicker } from "@/utils/media-picker.js";

function initTinyMCE() {
    const textarea = document.getElementById("news-content");
    if (!textarea) return;

    tinymce.init({
        selector: "#news-content",
        license_key: "gpl",
        height: 380,
        menubar: false,
        plugins: "lists link autolink wordcount",
        toolbar:
            "undo redo | blocks | bold italic underline | bullist numlist | link | removeformat",
        block_formats: "Párrafo=p; Título 2=h2; Título 3=h3",
        branding: false,
        promotion: false,
        skin: false,
        content_css: false,
        setup(editor) {
            editor.on("change keyup", () => {
                editor.save();
            });
        },
    });
}

function initFeaturedImagePicker() {
    const btn = document.getElementById("news-featured-image-pick");
    if (!btn) return;

    const input = document.getElementById("news-featured-image-input");
    const preview = document.getElementById("news-featured-image-preview");
    const placeholder = document.getElementById(
        "news-featured-image-placeholder",
    );

    btn.addEventListener("click", () => {
        initMediaPicker({
            type: "image",
            title: "Seleccionar imagen destacada",
            onSelect: (url) => {
                input.value = url;
                preview.src = url;
                preview.classList.remove("hidden");
                if (placeholder) placeholder.classList.add("hidden");
            },
        });
    });
}

function initStatusToggle() {
    const statusSelect = document.getElementById("news-status");
    const scheduledWrap = document.getElementById("news-scheduled-at-wrapper");
    if (!statusSelect || !scheduledWrap) return;

    const syncVisibility = () => {
        scheduledWrap.classList.toggle(
            "hidden",
            statusSelect.value !== "scheduled",
        );
    };

    statusSelect.addEventListener("change", syncVisibility);
    syncVisibility();
}

document.addEventListener("DOMContentLoaded", () => {
    initTinyMCE();
    initFeaturedImagePicker();
    initStatusToggle();
});

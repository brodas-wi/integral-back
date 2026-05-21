import { MediaModal } from "../components/media-modal";
import { IconPickerModal } from "./components/icon-picker-modal";
import {
    ColorPickerModal,
    isExcludedFromColorPicker,
    applyColorToComponent,
} from "./components/color-picker-modal";

export function setupEditorCommands(editor) {
    let mediaModal = null;
    let iconPickerModal = null;
    let colorPickerModal = null;

    editor.Commands.add("open-color-picker", {
        noStop: true,
        run(ed, sender, options = {}) {
            if (!ed._colorPickerModal) {
                ed._colorPickerModal = new ColorPickerModal();
            }

            const modal  = ed._colorPickerModal;
            const target = options.target || ed.getSelected();
            if (!target) return;

            if (modal.isOpen) {
                modal.close();
            }

            modal.open(target, (changes) => {
                applyColorToComponent(ed, target, changes);
            });
        },
        stop(ed) {
            if (ed._colorPickerModal && ed._colorPickerModal.isOpen) {
                ed._colorPickerModal.close();
            }
        },
    });

    editor.Commands.add("open-icon-picker", {
        noStop: true,
        run(editor, sender, options = {}) {
            if (!iconPickerModal) {
                iconPickerModal = new IconPickerModal();
            }

            const target = options.target || editor.getSelected();
            if (!target) return;

            iconPickerModal.open((selectedIcon) => {
                const el = target.getEl();
                if (!el) return;

                const currentClasses = Array.from(el.classList).filter(
                    (cls) => !cls.startsWith("ri-"),
                );

                target.setClass([...currentClasses, selectedIcon]);

                editor.trigger("component:update", target);

                if (typeof window.showNotification === "function") {
                    window.showNotification(
                        "Ícono actualizado correctamente",
                        "success",
                    );
                }
            });
        },
        stop() {
            if (iconPickerModal && iconPickerModal.isOpen) {
                iconPickerModal.close();
            }
        },
    });

    editor.Commands.add("open-assets", {
        run(editor, sender, options = {}) {
            if (!mediaModal) {
                mediaModal = new MediaModal();
            }

            const target = options.target || editor.getSelected();

            const openModal = () => {
                mediaModal.open(
                    (selectedMedia) => {
                        handleMediaSelection(editor, selectedMedia, target);
                    },
                    { filters: { type: "image" } },
                );
            };

            if (mediaModal.isOpen) {
                mediaModal.close();
                setTimeout(openModal, 200);
            } else {
                openModal();
            }
        },
    });

    editor.Commands.add("select-media", {
        run(editor, sender, options = {}) {
            if (!mediaModal) {
                mediaModal = new MediaModal();
            }

            const target = options.target || editor.getSelected();
            const mediaType = options.type || "";

            mediaModal.open(
                (selectedMedia) => {
                    if (options.onSelect) {
                        options.onSelect(selectedMedia);
                    } else {
                        handleMediaSelection(editor, selectedMedia, target);
                    }
                },
                {
                    filters: {
                        type: mediaType,
                    },
                },
            );
        },

        stop(editor) {
            if (mediaModal && mediaModal.isOpen) {
                mediaModal.close();
            }
        },
    });

    editor.on("destroy", () => {
        if (mediaModal) {
            mediaModal.destroy();
            mediaModal = null;
        }
        if (iconPickerModal) {
            iconPickerModal.destroy();
            iconPickerModal = null;
        }
        if (colorPickerModal) {
            colorPickerModal.destroy();
            colorPickerModal = null;
        }
    });
}

function handleMediaSelection(editor, media, target) {
    if (!media || !target) return;

    const el = target.getEl();
    const isImg =
        target.is("image") ||
        target.get("tagName") === "img" ||
        el?.tagName?.toLowerCase() === "img";

    if (isImg) {
        target.set("src", media.url);
        target.addAttributes({
            src: media.url,
            alt: media.alt || media.filename,
        });

        const view = target.getView();
        if (view?.el) {
            view.el.setAttribute("src", media.url);
            view.el.setAttribute("alt", media.alt || media.filename);
        }

        editor.trigger("component:update", target);

        if (typeof window.showNotification === "function") {
            window.showNotification(
                "Imagen actualizada correctamente",
                "success",
            );
        }
    } else {
        if (typeof window.showNotification === "function") {
            window.showNotification(
                "Selecciona una imagen para reemplazarla",
                "error",
            );
        }
    }

    editor.trigger("change:canvasOffset");
}

export function setupImageDoubleClick(editor) {
    editor.on("component:dblclick", (component) => {
        if (component.is("image")) {
            editor.runCommand("open-assets", { target: component });
        }
    });
}

export function addColorToolbarButton(editor) {
    editor.on("component:selected", (component) => {
        if (isExcludedFromColorPicker(component)) return;

        const toolbar = component.get("toolbar");
        const already = toolbar.some(
            (btn) => btn.attributes?.title === "Color"
        );
        if (already) return;

        toolbar.unshift({
            label: `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34a1 1 0 00-1.41 0L9 12.25 11.75 15l8.96-8.96a1 1 0 000-1.41z"/>
            </svg>`,
            command(ed) {
                ed.runCommand("open-color-picker", { target: component });
            },
            attributes: {
                title: "Color",
                class: "gjs-toolbar-item",
            },
        });

        component.set("toolbar", [...toolbar]);
    });
}

export function addIconToolbarButton(editor) {
    editor.on("component:selected", (component) => {
        const el = component.getEl();
        const isIcon =
            el?.tagName?.toLowerCase() === "i" ||
            component.get("tagName") === "i";

        if (!isIcon) return;

        const toolbar = component.get("toolbar");
        const already = toolbar.some(
            (btn) => btn.attributes?.title === "Cambiar ícono",
        );
        if (already) return;

        toolbar.unshift({
            label: `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>`,
            command(ed) {
                const selected = ed.getSelected();
                ed.runCommand("open-icon-picker", { target: selected });
            },
            attributes: {
                title: "Cambiar ícono",
                class: "gjs-toolbar-item",
            },
        });

        component.set("toolbar", [...toolbar]);
    });
}

export function addImageToolbarButton(editor) {
    editor.on("component:selected", (component) => {
        if (!component.is("image")) return;

        const toolbar = component.get("toolbar");
        const already = toolbar.some(
            (btn) => btn.attributes?.title === "Cambiar imagen",
        );
        if (already) return;

        toolbar.unshift({
            label: `<svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>`,
            command(ed) {
                const selected = ed.getSelected();
                ed.runCommand("open-assets", { target: selected });
            },
            attributes: {
                title: "Cambiar imagen",
                class: "gjs-toolbar-item",
            },
        });

        component.set("toolbar", [...toolbar]);
    });
}

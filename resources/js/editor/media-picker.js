import { MediaModal } from "../components/media-modal";

let instance = null;

const getInstance = () => {
    if (!instance) instance = new MediaModal();
    return instance;
};

export function openMediaPicker({
    type = "image",
    title,
    onSelect,
    fullMedia = false,
} = {}) {
    getInstance().open(
        (media) => {
            if (typeof onSelect === "function") {
                onSelect(fullMedia ? media : media.url);
            }
        },
        { filters: { type }, title },
    );
}

export function closeMediaPicker() {
    instance?.close();
}

export function destroyMediaPicker() {
    instance?.destroy();
    instance = null;
}
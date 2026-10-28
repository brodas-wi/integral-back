export const HERO_VIDEO_SCRIPT = `
var root = this;
if (root.__hvReady) return;
var button = root.querySelector("[data-hv-mute]");
var video = root.querySelector(".hv-video");
if (!button || !video) return;
root.__hvReady = true;
var icon = button.querySelector("i");

function sync() {
    var muted = video.muted;
    button.setAttribute("aria-label", muted ? "Activar sonido" : "Silenciar");
    if (icon) icon.className = muted ? "ri-volume-mute-line" : "ri-volume-up-line";
}

button.addEventListener("click", function () {
    video.muted = !video.muted;
    if (!video.muted && video.paused) {
        var played = video.play();
        if (played && played.catch) played.catch(function () {});
    }
    sync();
});

sync();
`;
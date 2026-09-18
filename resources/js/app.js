import "./bootstrap";
import axios from "axios";

window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

import { registerGlobalFunctions } from "./utils/global-functions.js";
registerGlobalFunctions();

import { toggleDropdown } from "./modules/dropdowns.js";
import { confirmToggleStatus, confirmDeleteUser } from "./modules/users.js";
import {
    confirmDeleteRole,
    selectAllManagePermissions,
    deselectAllPermissions,
    initPermissionCheckboxes,
} from "./modules/roles.js";
import { initProfileEdit } from "./modules/profile.js";
import Swiper from "swiper";
import "swiper/css";

function initHeroVideoMuteButtons() {
    document.querySelectorAll("[data-hv-mute-btn]").forEach((btn) => {
        if (btn.dataset.bound) return;
        btn.dataset.bound = "true";

        const videoId = btn.dataset.hvTarget;
        const video = videoId ? document.getElementById(videoId) : null;
        if (!video) return;

        const syncIcon = () => {
            const muted = video.muted;
            btn.dataset.muted = muted ? "true" : "false";
            btn.setAttribute(
                "aria-label",
                muted ? "Activar sonido" : "Silenciar video",
            );
            btn.innerHTML = muted
                ? '<i class="ri-volume-mute-line"></i>'
                : '<i class="ri-volume-up-line"></i>';
        };

        btn.addEventListener("click", () => {
            video.muted = !video.muted;
            if (!video.muted) {
                video.play().catch(() => { });
            }
            syncIcon();
        });

        video.addEventListener("volumechange", syncIcon);
        syncIcon();
    });
}

window.toggleDropdown = toggleDropdown;

window.confirmToggleStatus = confirmToggleStatus;
window.confirmDeleteUser = confirmDeleteUser;

window.confirmDeleteRole = confirmDeleteRole;
window.selectAllManagePermissions = selectAllManagePermissions;
window.deselectAllPermissions = deselectAllPermissions;

window.initProfileEdit = initProfileEdit;

document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector(".permission-checkbox")) {
        initPermissionCheckboxes();
    }

    if (document.getElementById("toggleEditMode")) {
        initProfileEdit();
    }

    const path = window.location.pathname;

    const isAdminRoute =
        path.startsWith("/dashboard") ||
        path.startsWith("/users") ||
        path.startsWith("/roles") ||
        path.startsWith("/pages") ||
        path.startsWith("/media") ||
        path.startsWith("/agencies") ||
        path.startsWith("/payment-points") ||
        path.startsWith("/announcements") ||
        path.startsWith("/banners") ||
        path.startsWith("/navbars") ||
        path.startsWith("/footers") ||
        path.startsWith("/scripts") ||
        path.startsWith("/profile");

    const isAuthRoute =
        path.startsWith("/login") ||
        path.startsWith("/register") ||
        path.startsWith("/password") ||
        path.startsWith("/forgot-password") ||
        path.startsWith("/reset-password") ||
        path.startsWith("/verify-email");

    const isPublicPreviewRoute = path.startsWith("/p/");

    if (isPublicPreviewRoute && !isAdminRoute && !isAuthRoute) {
        import("./components/announcement-modal.js").then(({ initAnnouncementModal }) => {
            initAnnouncementModal();
        });
    }

    initHeroVideoMuteButtons();

    document.querySelectorAll(".swiper").forEach((el) => {
        if (el.swiper) return;
        const scope = el.closest("[class*='-carousel']") || el.parentElement;
        const shouldFill = el.hasAttribute("data-swiper-fill");
        const minSlideWidth =
            parseInt(el.dataset.swiperMinSlideWidth, 10) || 260;
        const gap = 24;

        const computeSlidesPerView = () => {
            if (!shouldFill) return "auto";
            const width = el.clientWidth || 1;
            const fit = Math.floor((width + gap) / (minSlideWidth + gap));
            return Math.max(1, fit);
        };

        new Swiper(el, {
            slidesPerView: computeSlidesPerView(),
            spaceBetween: gap,
            navigation: {
                nextEl: scope?.querySelector("[data-swiper-next]"),
                prevEl: scope?.querySelector("[data-swiper-prev]"),
                disabledClass: "swiper-nav-disabled-state",
            },
            pagination: {
                el: scope?.querySelector("[data-swiper-pagination]"),
                bulletActiveClass: "active",
                clickable: true,
            },
            watchOverflow: true,
            on: shouldFill
                ? {
                    resize(swiper) {
                        swiper.params.slidesPerView = computeSlidesPerView();
                        swiper.update();
                    },
                }
                : {},
        });
    });
});
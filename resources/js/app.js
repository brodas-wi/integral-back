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
});
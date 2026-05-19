import "./bootstrap";
import "remixicon/fonts/remixicon.css";
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
import {
    togglePublishStatus,
    confirmDeletePage,
    deletePage,
} from "./modules/pages.js";
import {
    confirmDeleteMedia,
    deleteMedia,
    initMediaUpload,
    removeMediaFile,
    copyMediaUrl,
    confirmDeleteMediaShow,
} from "./modules/media.js";
import { initProfileEdit } from "./modules/profile.js";
import {
    filterDepartmentsByZone as agencyFilterDepartments,
    loadMunicipalities as agencyLoadMunicipalities,
    addPhone,
    removePhone,
    geocodeAddress as agencyGeocodeAddress,
    confirmDeleteAgency,
    deleteAgency,
    confirmDeleteAgencyShow,
} from "./modules/agencies.js";
import { initAgencyImport } from "./modules/agency-import.js";
import { initAgencyBulkGeocode } from "./modules/agency-bulk-geocode.js";
import {
    filterDepartmentsByZone as paymentPointFilterDepartments,
    loadMunicipalities as paymentPointLoadMunicipalities,
    geocodeAddress as paymentPointGeocodeAddress,
    confirmDeletePaymentPoint,
    deletePaymentPoint,
} from "./modules/payment-points.js";
import { initAgencyMap } from "./modules/agency-map.js";
import { initAgencyFormMap } from "./modules/agency-form-map.js";
import { initPaymentPointImport } from "./modules/payment-point-import.js";
import { initBulkGeocode } from "./modules/payment-point-bulk-geocode.js";
import { initAnnouncementModal } from "./components/announcement-modal.js";

window.toggleDropdown = toggleDropdown;

window.confirmToggleStatus = confirmToggleStatus;
window.confirmDeleteUser = confirmDeleteUser;

window.confirmDeleteRole = confirmDeleteRole;
window.selectAllManagePermissions = selectAllManagePermissions;
window.deselectAllPermissions = deselectAllPermissions;

window.togglePublishStatus = togglePublishStatus;
window.confirmDeletePage = confirmDeletePage;
window.deletePage = deletePage;

window.confirmDeleteMedia = confirmDeleteMedia;
window.deleteMedia = deleteMedia;
window.removeMediaFile = removeMediaFile;
window.copyMediaUrl = copyMediaUrl;
window.confirmDeleteMediaShow = confirmDeleteMediaShow;

window.initProfileEdit = initProfileEdit;

window.addPhone = addPhone;
window.removePhone = removePhone;

function isAgencyPage() {
    return window.location.pathname.includes("/agencies");
}

function isPaymentPointPage() {
    return window.location.pathname.includes("/payment-points");
}

if (isAgencyPage()) {
    window.filterDepartmentsByZone = agencyFilterDepartments;
    window.loadMunicipalities = agencyLoadMunicipalities;
    window.geocodeAddress = agencyGeocodeAddress;
    window.confirmDeleteAgency = confirmDeleteAgency;
    window.confirmDelete = confirmDeleteAgency;
    window.deleteAgency = deleteAgency;
    window.confirmDeleteAgencyShow = confirmDeleteAgencyShow;
} else if (isPaymentPointPage()) {
    window.filterDepartmentsByZone = paymentPointFilterDepartments;
    window.loadMunicipalities = paymentPointLoadMunicipalities;
    window.geocodeAddress = paymentPointGeocodeAddress;
    window.confirmDelete = confirmDeletePaymentPoint;
    window.confirmDeletePaymentPoint = confirmDeletePaymentPoint;
    window.deletePaymentPoint = deletePaymentPoint;
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector(".permission-checkbox")) {
        initPermissionCheckboxes();
    }

    if (document.getElementById("drop-zone")) {
        initMediaUpload();
    }

    if (document.getElementById("toggleEditMode")) {
        initProfileEdit();
    }

    if (document.getElementById("agency-map")) {
        initAgencyMap();
    }

    if (document.getElementById("agency-form-map")) {
        initAgencyFormMap();
    }

    if (document.getElementById("import-form")) {
        initPaymentPointImport();
    }

    if (document.getElementById("bulk-actions-bar")) {
        initBulkGeocode();
    }

    if (document.getElementById("import-form")) {
        initAgencyImport();
    }

    if (document.getElementById("bulk-actions-bar")) {
        initAgencyBulkGeocode();
    }

    // Solo inicializar el modal de avisos en páginas públicas (preview)
    // NO en páginas de admin ni en páginas de autenticación
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
        initAnnouncementModal();
    }
});

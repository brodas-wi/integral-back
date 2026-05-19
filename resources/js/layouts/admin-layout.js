/**
 * Admin layout initialization
 */
import { initSidebar } from "../modules/sidebar.js";
import { initSessionNotifications } from "../modules/notifications-handler.js";
import { initDropdowns } from "../modules/dropdowns.js";

export function initAdminLayout() {
    // Initialize sidebar
    initSidebar();

    // Initialize dropdowns
    initDropdowns();

    // Handle session notifications
    initSessionNotifications();
}

// Auto-initialize on DOM ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAdminLayout);
} else {
    initAdminLayout();
}

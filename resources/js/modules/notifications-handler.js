import { showNotification } from "../utils/notifications.js";

/**
 * Handle Laravel session flash messages and display notifications
 */
export function initSessionNotifications() {
    const sessionMessages = window.__sessionMessages || {};

    if (sessionMessages.success) {
        showNotification(sessionMessages.success, "success");
    }

    if (sessionMessages.error) {
        showNotification(sessionMessages.error, "error");
    }

    if (sessionMessages.warning) {
        showNotification(sessionMessages.warning, "warning");
    }

    if (sessionMessages.info) {
        showNotification(sessionMessages.info, "info");
    }

    // Clean up
    delete window.__sessionMessages;
}
